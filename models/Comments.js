const { Schema, model } = require('mongoose')

const Comments = new Schema({
  body:{
    type: String,
    required: true 
  },
  user: {
    type: Schema.Types.ObejectId, 
    ref: 'user',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId
    ref: 'post'
  }
}) ({timestamps:true})

module.exports = model('comments', Comments)
