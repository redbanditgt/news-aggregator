const Parser = require('rss-parser');
const cron = require('node-cron');
const axios = require('axios');
const News = require('../models/News');

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: false }],
      ['pubDate', 'publishedAt'],
      ['dc:creator', 'author']
    ]
  }
});

class GoogleNewsAggregator {
  constructor() {
    this.feeds = {
      'national': {
        url: 'https://news.google.com/rss/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNREZqY0hsNUVnVnBiaUlCQWlnQVAB?hl=en-IN&gl=IN&ceid=IN:en',
        category: 'national',
        name: 'India National News'
      },
      'international': {
        url: 'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRE5nYXpWUkVnVnBiaUlCQWlnQVAB?hl=en-IN&gl=IN&ceid=IN:en',
        category: 'international',
        name: 'International Relations'
      },
      'elections': {
        url: 'https://news.google.com/rss/search?q=india+elections+modi+parliament+bjp+congress&hl=en-IN&gl=IN&ceid=IN:en',
        category: 'elections',
        name: 'Indian Elections'
      },
      'policy': {
        url: 'https://news.google.com/rss/search?q=india+policy+government+law+bill+parliament&hl=en-IN&gl=IN&ceid=IN:en',
        category: 'policy',
        name: 'Policy & Governance'
      },
      'governance': {
        url: 'https://news.google.com/rss/search?q=india+governance+constitution+democracy+institutions&hl=en-IN&gl=IN&ceid=IN:en',
        category: 'governance',
        name: 'Democratic Governance'
      }
    };

    // Additional Indian news sources
    this.additionalFeeds = [
      {
        url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
        source: 'Times of India',
        category: 'general'
      },
      {
        url: 'https://www.hindustantimes.com/feeds/rss/india-news/index.xml',
        source: 'Hindustan Times',
        category: 'national'
      },
      {
        url: 'https://feeds.feedburner.com/ndtvnews-india-news',
        source: 'NDTV',
        category: 'national'
      }
    ];

    this.isRunning = false;
  }

  async fetchGoogleNews(feedConfig) {
    try {
      console.log(`Fetching news from: ${feedConfig.name}`);
      const feed = await parser.parseURL(feedConfig.url);

      const articles = feed.items.map(item => ({
        title: this.cleanTitle(item.title),
        description: this.cleanDescription(item.contentSnippet || item.summary || ''),
        content: item.content || item.description || '',
        url: this.cleanUrl(item.link),
        publishedAt: new Date(item.pubDate || item.isoDate),
        source: this.extractSource(item.title) || feedConfig.name,
        author: item.author || undefined,
        category: feedConfig.category,
        image: this.extractImage(item),
        tags: this.extractTags(item.title, item.contentSnippet)
      }));

      return articles.filter(article => this.isValidArticle(article));
    } catch (error) {
      console.error(`Error fetching news from ${feedConfig.name}:`, error.message);
      return [];
    }
  }

  async fetchAdditionalFeeds() {
    const allArticles = [];

    for (const feedConfig of this.additionalFeeds) {
      try {
        const feed = await parser.parseURL(feedConfig.url);

        const articles = feed.items.map(item => ({
          title: this.cleanTitle(item.title),
          description: this.cleanDescription(item.contentSnippet || item.summary || ''),
          content: item.content || item.description || '',
          url: this.cleanUrl(item.link),
          publishedAt: new Date(item.pubDate || item.isoDate),
          source: feedConfig.source,
          author: item.author || undefined,
          category: feedConfig.category,
          image: this.extractImage(item),
          tags: this.extractTags(item.title, item.contentSnippet)
        }));

        allArticles.push(...articles.filter(article => this.isValidArticle(article)));
      } catch (error) {
        console.error(`Error fetching from ${feedConfig.source}:`, error.message);
      }
    }

    return allArticles;
  }

  cleanTitle(title) {
    if (!title) return 'Untitled';

    // Remove source attribution from Google News titles
    const sourceMatch = title.match(/^(.*?) - ([^-]+)$/);
    if (sourceMatch) {
      return sourceMatch[1].trim();
    }

    return title.replace(/\u[\dA-F]{4}/gi, '').trim();
  }

  cleanDescription(description) {
    if (!description) return '';

    return description
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\u[\dA-F]{4}/gi, '') // Remove unicode escapes
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
  }

  cleanUrl(url) {
    if (!url) return '';

    // Clean Google News redirect URLs
    if (url.includes('news.google.com/articles/')) {
      return url;
    }

    // Extract actual URL from Google News wrapper
    const match = url.match(/url=([^&]+)/);
    if (match) {
      return decodeURIComponent(match[1]);
    }

    return url;
  }

  extractSource(title) {
    if (!title) return null;

    const sourceMatch = title.match(/- ([^-]+)$/);
    return sourceMatch ? sourceMatch[1].trim() : null;
  }

  extractImage(item) {
    if (item.mediaContent && item.mediaContent.$) {
      return item.mediaContent.$.url;
    }

    if (item.enclosure && item.enclosure.url) {
      return item.enclosure.url;
    }

    // Extract from content
    const content = item.content || item.description || '';
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch) {
      return imgMatch[1];
    }

    return null;
  }

  extractTags(title, description) {
    const text = `${title} ${description}`.toLowerCase();
    const tags = [];

    // Political keywords
    const keywords = [
      'modi', 'bjp', 'congress', 'parliament', 'election', 'policy',
      'government', 'democracy', 'constitution', 'supreme court',
      'economic', 'budget', 'taxation', 'foreign policy', 'china',
      'pakistan', 'usa', 'diplomacy', 'trade', 'defense'
    ];

    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        tags.push(keyword);
      }
    });

    return tags;
  }

  isValidArticle(article) {
    return article.title && 
           article.title.length > 10 && 
           article.url && 
           article.publishedAt &&
           !article.title.toLowerCase().includes('advertisement');
  }

  async saveArticles(articles) {
    let savedCount = 0;
    let duplicateCount = 0;

    for (const articleData of articles) {
      try {
        // Check if article already exists
        const existing = await News.findOne({ url: articleData.url });
        if (existing) {
          duplicateCount++;
          continue;
        }

        // Create new article
        const article = new News(articleData);
        await article.save();
        savedCount++;

      } catch (error) {
        if (error.code === 11000) { // Duplicate key error
          duplicateCount++;
        } else {
          console.error('Error saving article:', error.message);
        }
      }
    }

    console.log(`✅ Saved ${savedCount} new articles, skipped ${duplicateCount} duplicates`);
    return { saved: savedCount, duplicates: duplicateCount };
  }

  async aggregateAllNews() {
    if (this.isRunning) {
      console.log('News aggregation already in progress...');
      return;
    }

    this.isRunning = true;
    console.log('🔄 Starting news aggregation...');

    try {
      let allArticles = [];

      // Fetch from Google News feeds
      for (const [key, feedConfig] of Object.entries(this.feeds)) {
        const articles = await this.fetchGoogleNews(feedConfig);
        allArticles.push(...articles);

        // Add delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Fetch from additional Indian news sources
      const additionalArticles = await this.fetchAdditionalFeeds();
      allArticles.push(...additionalArticles);

      // Remove duplicates based on URL
      const uniqueArticles = allArticles.filter((article, index, self) => 
        index === self.findIndex(a => a.url === article.url)
      );

      // Save to database
      const result = await this.saveArticles(uniqueArticles);

      // Update trending articles
      await this.updateTrendingArticles();

      // Clean old articles (optional)
      await this.cleanOldArticles();

      console.log(`✅ News aggregation completed: ${result.saved} new articles added`);

    } catch (error) {
      console.error('❌ News aggregation failed:', error.message);
    } finally {
      this.isRunning = false;
    }
  }

  async updateTrendingArticles() {
    try {
      const recentArticles = await News.find({
        publishedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }).limit(100);

      for (const article of recentArticles) {
        await article.updateTrendingStatus();
      }

      console.log(`Updated trending status for ${recentArticles.length} articles`);
    } catch (error) {
      console.error('Error updating trending articles:', error.message);
    }
  }

  async cleanOldArticles() {
    try {
      const maxArticles = process.env.MAX_NEWS_ARTICLES || 1000;
      const totalArticles = await News.countDocuments();

      if (totalArticles > maxArticles) {
        const articlesToDelete = totalArticles - maxArticles;
        const oldArticles = await News.find()
          .sort({ publishedAt: 1 })
          .limit(articlesToDelete)
          .select('_id');

        await News.deleteMany({
          _id: { $in: oldArticles.map(a => a._id) }
        });

        console.log(`Cleaned ${articlesToDelete} old articles`);
      }
    } catch (error) {
      console.error('Error cleaning old articles:', error.message);
    }
  }

  startAggregation() {
    // Run immediately on start
    setTimeout(() => this.aggregateAllNews(), 5000);

    // Schedule regular aggregation
    const interval = process.env.NEWS_AGGREGATION_INTERVAL || 30;
    cron.schedule(`*/${interval} * * * *`, () => {
      this.aggregateAllNews();
    });

    console.log(`📰 News aggregation scheduled every ${interval} minutes`);
  }

  stopAggregation() {
    this.isRunning = false;
    console.log('News aggregation stopped');
  }
}

module.exports = GoogleNewsAggregator;