const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

router.get('/posts', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.find({}).populate('user')
  res.json(posts)
})

router.post('/posts', passport.authenticate('jwt'), async function (req, res) {
  const post = await Post.create({ ...req.body, user: req.user._id })
  await User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
  res.json(post)
})

module.exports = router
