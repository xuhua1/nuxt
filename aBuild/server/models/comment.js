const mongoose = require('../db')
const Schema = mongoose.Schema

let CommentSchema = new Schema({
  //必须
  nickname: { type: String, required: true },
  routePath: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: String, default: Date.now() }
})

module.exports = mongoose.model('Comment', CommentSchema)
