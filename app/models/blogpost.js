const mongoose = require('mongoose')
const commentSchema = require('./comments')

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [commentSchema],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('BlogPost', blogPostSchema)
