// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const BlogPost = require('../models/blogpost')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// CREATE
// POST
router.post('/blogposts', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  console.log('The user object:', req.user)
  console.log('The incoming event data:', req.body)
  const postData = req.body.blogpost
  postData.author = req.user._id

  BlogPost.create(postData)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(blogpost => {
      res.status(201).json({ blogpost })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// INDEX
// GET
router.get('/blogposts', (req, res, next) => {
  BlogPost.find()
    .then(blogposts => {
      return blogposts.map(blogpost => blogpost.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(blogposts => res.status(200).json({ blogposts: blogposts }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
