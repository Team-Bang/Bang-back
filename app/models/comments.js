const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  reply: {
    type: String
  },
  username: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = commentSchema
