const mongoose = require('../db')
const Schema = mongoose.Schema

let SudoSchema = new Schema({
  //必须
  index: { type: Number },
  type: { type: Number },
  sudo: { trpe: String },
  answer: { type: String },
  createdAt: { type: String, default: Date.now() }
})

module.exports = mongoose.model('Sudo', SudoSchema)
