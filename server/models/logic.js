const mongoose = require('../db')
const Schema = mongoose.Schema

let LogicSchema = new Schema({
  //必须
  title: { type: String, required: true },
  index: { type: Number },
  question: { type: String, required: true },
  tip: { type: String },
  answer: { type: String },
  searchinfo: { type: String },
  likeNum: { type: Number, default: 0 },
  createdAt: { type: String, default: Date.now() }
})

module.exports = mongoose.model('Logic', LogicSchema)
