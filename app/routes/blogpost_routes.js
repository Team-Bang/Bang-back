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
  // set author of new example to be current user
  console.log('The user object:', req.user)
  console.log('The incoming event data:', req.body)
  const postData = req.body.blogpost
  postData.author = req.user._id
  postData.username = req.user.username

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

// Show
// Get
router.get('/blogposts/:id', (req, res, next) => {
  BlogPost.findById(req.params.id)
    .then(handle404)
    .then(blogpost => res.status(200).json({ blogpost: blogpost.toObject() }))
    .catch(next)
})
// INDEX
// GET
router.get('/blogposts', (req, res, next) => {
  BlogPost.find()
    .then(blogposts => {
      return blogposts.map(blogpost => blogpost.toObject())
    })
    // respond with status 200 and JSON of the blogposts
    .then(blogposts => res.status(200).json({ blogposts: blogposts }))
    // if an error occurs, pass it to the handler

    .catch(next)
})
// UPDATE
// PATCH
router.patch('/blogposts/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.blogpost.author
  BlogPost.findById(req.params.id)
    .then(handle404)
    .then(blogpost => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, blogpost)
      // pass the result of Mongoose's `.update` to the next `.then`
      return blogpost.updateOne(req.body.blogpost)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /blogposts/5a7db6c74d55bc51bdf39793
router.delete('/blogposts/:id', requireToken, (req, res, next) => {
  BlogPost.findById(req.params.id)
    .then(handle404)
    .then(blogpost => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, blogpost)
      // delete the example ONLY IF the above didn't throw
      blogpost.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
