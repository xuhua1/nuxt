const mongoose = require('../db')
const Schema = mongoose.Schema

let BookSchema = new Schema({
  //必须
  urlkey: { type: String, required: true },
  title: { type: String },
  bookinfo: {
    author: { type: String, default: 'admin' },
    edition: { type: String },
    brief: { type: String },
    publisher: { type: String },
    remarks: { type: String }
  },
  searchinfo: { type: String },
  size: { type: Number, required: true },
  author: { type: String, default: 'admin' },
  downloadnum: { type: Number, default: 0 },
  createdAt: { type: String, default: Date.now() }
})

module.exports = mongoose.model('Book', BookSchema)
