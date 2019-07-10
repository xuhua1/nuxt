const mongoose = require('../db')
const Schema = mongoose.Schema
const crypto = require('crypto')

let UserSchema = new Schema({
  //必须
  email: { type: String, required: true },
  hashed_password: { type: String },
  nickname: { type: String, default: '未命名' },
  salt: { type: String, default: '' },
  createdAt: { type: String, default: Date.now() }
})

UserSchema.virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this.hashed_password
  })

UserSchema.path('email').validate(function(email) {
  return new Promise(resolve => {
    const User = mongoose.model('User')
    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
      User.find({ email }).exec((err, users) => resolve(!err && !users.length))
    } else resolve(true)
  })
}, '邮件 `{VALUE}` 已经存在')

UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.createdAt = Date.now()
  }
  next()
})

UserSchema.methods = {
  /**
   * 设置密钥
   */
  makeSalt() {
    return Math.round(new Date().valueOf() * Math.random()) + ''
  },

  /**
   * md5 加密密码
   */
  encryptPassword(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (error) {
      return ''
    }
  },

  /**
   * 检查密码是否正确的方法
   */
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  }
}

module.exports = mongoose.model('User', UserSchema)
