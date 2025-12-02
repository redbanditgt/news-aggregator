const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    maxlength: 200
  },
  description: { 
    type: String, 
    required: true,
    maxlength: 1000
  },
  content: {
    type: String,
    maxlength: 5000
  },
  url: { 
    type: String, 
    required: true, 
    unique: true 
  },
  source: { 
    type: String, 
    required: true 
  },
  author: String,
  category: {
    type: String,
    enum: ['national', 'international', 'elections', 'policy', 'governance', 'general'],
    default: 'general'
  },
  tags: [String],
  image: String,
  publishedAt: { 
    type: Date, 
    required: true 
  },
  scrapedAt: {
    type: Date,
    default: Date.now
  },
  reactions: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    love: { type: Number, default: 0 },
    angry: { type: Number, default: 0 },
    surprise: { type: Number, default: 0 }
  },
  userReactions: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reaction: { 
      type: String, 
      enum: ['like', 'dislike', 'love', 'angry', 'surprise'] 
    }
  }],
  discussionCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  trending: { type: Boolean, default: false },
  trendingScore: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

// Indexes for performance
newsSchema.index({ publishedAt: -1 });
newsSchema.index({ category: 1, publishedAt: -1 });
newsSchema.index({ trending: -1, trendingScore: -1 });
newsSchema.index({ url: 1 }, { unique: true });
newsSchema.index({ title: 'text', description: 'text' });

// Virtual for calculating engagement score
newsSchema.virtual('engagementScore').get(function() {
  const totalReactions = Object.values(this.reactions).reduce((sum, count) => sum + count, 0);
  return totalReactions + (this.discussionCount * 2) + (this.viewCount * 0.1);
});

// Method to update trending status
newsSchema.methods.updateTrendingStatus = function() {
  const hoursSincePublished = (Date.now() - this.publishedAt.getTime()) / (1000 * 60 * 60);
  const engagementScore = this.engagementScore;

  // Trending algorithm: recent articles with high engagement
  this.trendingScore = engagementScore / (hoursSincePublished + 1);
  this.trending = this.trendingScore > 10 && hoursSincePublished < 24;

  return this.save();
};

module.exports = mongoose.model('News', newsSchema);