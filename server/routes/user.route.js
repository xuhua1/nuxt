const router = require('express').Router()
const co = require('co')
const User = require('../models/user')
router.post(
  '/register',
  co.wrap(function*(req, res) {
    try {
      const user = new User(req.body)
      const data = yield user.save()
      return res.send({
        success: true,
        user: data
      })
    } catch (error) {
      return res.send({
        success: false
      })
    }
  })
)
router.post(
  '/login',
  co.wrap(function*(req, res) {
    try {
      const { password, email } = req.body
      const user = yield User.find({ email }).exec()
      if (user[0].authenticate(password)) {
        return res.send({
          type: 'yes'
        })
      }
      return res.send({
        type: 'err'
      })
    } catch (error) {
      return res.send({
        type: 'no'
      })
    }
  })
)
module.exports = router
