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
    .then(blogpost => {
      blogpost.comments.push(commentData)
      return blogpost.save()
    })
    .then(blogpost => res.status(201).json({ blogpost }))
    .catch(next)
})

// Index comment
router.get('/blogposts/:id/viewcomments', (req, res, next) => {
  const postId = req.params.id
  BlogPost.findById(postId)
    .then(handle404)
    // .then(comments => {
    //   return comments.map(comment => comment.toObject())
    // })
    .then(blogpost => res.status(200).json({ comments: blogpost.comments.toObject() }))
    .catch(next)
})

module.exports = router
