const router = require('express').Router()
const { Post, User, Comments } = require('../models')
const passport = require('passport')

router.get('/comments', passport.authenticate('jwt'), async function (req, res) {
  const comments = await Comments.find({}).populate('comments')
  res.json(comments)
})

// post comment

router.post('/comments', passport.authenticate('jwt'), async function (req, res) {
  const comment = await Comments.create({ ...req.body, user: req.user._id })
  await User.findByIdAndUpdate(req.user._id, { $push: { comments: comment._id } })
  res.json(comment)
})
