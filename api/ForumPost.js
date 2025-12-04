const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true,
    maxlength: 2000
  },
  votes: {
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
  },
  userVotes: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    voteType: { type: String, enum: ['upvote', 'downvote'] }
  }],
  isEdited: { type: Boolean, default: false },
  editedAt: Date,
  parentReply: { type: mongoose.Schema.Types.ObjectId, ref: 'Reply' },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
}, { 
  timestamps: true 
});

const forumPostSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  title: {
    type: String,
    maxlength: 200
  },
  content: { 
    type: String, 
    required: true,
    maxlength: 5000
  },
  category: {
    type: String,
    enum: ['general', 'policy', 'elections', 'governance', 'international'],
    default: 'general'
  },
  tags: [String],
  newsArticleId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'News' 
  },
  votes: {
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
  },
  userVotes: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    voteType: { type: String, enum: ['upvote', 'downvote'] }
  }],
  replies: [replySchema],
  replyCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  isEdited: { type: Boolean, default: false },
  editedAt: Date,
  isPinned: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { 
  timestamps: true 
});

// Indexes for performance
forumPostSchema.index({ createdAt: -1 });
forumPostSchema.index({ category: 1, createdAt: -1 });
forumPostSchema.index({ newsArticleId: 1 });
forumPostSchema.index({ userId: 1 });
forumPostSchema.index({ isPinned: -1, createdAt: -1 });

// Virtual for net votes
forumPostSchema.virtual('netVotes').get(function() {
  return this.votes.upvotes - this.votes.downvotes;
});

// Method to add reply
forumPostSchema.methods.addReply = function(userId, username, content, parentReplyId = null) {
  const reply = {
    userId,
    username,
    content,
    parentReply: parentReplyId
  };

  this.replies.push(reply);
  this.replyCount = this.replies.length;
  return this.save();
};

// Method to vote on post
forumPostSchema.methods.vote = function(userId, voteType) {
  // Remove existing vote if any
  this.userVotes = this.userVotes.filter(vote => !vote.userId.equals(userId));

  // Add new vote
  this.userVotes.push({ userId, voteType });

  // Recalculate vote counts
  this.votes.upvotes = this.userVotes.filter(vote => vote.voteType === 'upvote').length;
  this.votes.downvotes = this.userVotes.filter(vote => vote.voteType === 'downvote').length;

  return this.save();
};

module.exports = mongoose.model('ForumPost', forumPostSchema);