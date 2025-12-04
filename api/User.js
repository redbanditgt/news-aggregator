const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  username: {
    type: String,
    maxlength: [50, 'Username cannot exceed 50 characters']
  },
  verified: { 
    type: Boolean, 
    default: false 
  },
  otp: { 
    type: String, 
    sparse: true 
  },
  otpExpires: { 
    type: Date, 
    sparse: true 
  },
  lastLogin: Date,
  profilePicture: String,
  reputation: {
    type: Number,
    default: 0
  },
  preferences: {
    categories: {
      type: [String],
      enum: ['national', 'international', 'elections', 'policy', 'governance'],
      default: ['national', 'international', 'policy']
    },
    emailNotifications: {
      type: Boolean,
      default: true
    }
  },
  roles: [{
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for user's full profile
userSchema.virtual('profile').get(function() {
  return {
    id: this._id,
    email: this.email,
    username: this.username || this.email.split('@')[0],
    reputation: this.reputation,
    verified: this.verified,
    lastLogin: this.lastLogin,
    profilePicture: this.profilePicture
  };
});

// Remove sensitive data from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.otp;
  delete user.otpExpires;
  return user;
};

module.exports = mongoose.model('User', userSchema);