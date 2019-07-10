const mongoose = require('../db')
const Schema = mongoose.Schema

let ArticleSchema = new Schema({
  //必须
  article: { type: String, required: true },
  title: { type: String, required: true },
  index: { type: Number, default: 0 },
  type: { type: String, required: true },
  author: { type: String, default: 'admin' },
  createdAt: { type: String, default: Date.now() }
})

module.exports = mongoose.model('Article', ArticleSchema)
