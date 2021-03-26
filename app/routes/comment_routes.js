const express = require('express')
const router = express.Router()
const BlogPost = require('../models/blogpost')
const { handle404 } = require('./../../lib/custom_errors')
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// Create comment
router.post('/blogposts/:id/comments', requireToken, (req, res, next) => {
  const commentData = req.body.comment
  const postId = req.params.id
  BlogPost.findById(postId)
    .then(handle404)
    .then(trip => {
      trip.comments.push(commentData)
      return trip.save()
    })
    .then(trip => res.status(201).json({ trip }))
    .catch(next)
})

module.exports = router
