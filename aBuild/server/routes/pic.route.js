const router = require('express').Router()
//const co = require('co')
//const User = require('../models/user')
router.get('/getPic', function(req, res) {
  try {
    const data = [
      ' https://zuoyecloud.com/robat.jpg',
      ' https://zuoyecloud.com/person.png',
      ' https://zuoyecloud.com/motain.jpg',
      ' https://zuoyecloud.com/lol2.png',
      ' https://zuoyecloud.com/lol.jpg',
      ' https://zuoyecloud.com/dongman.jpg',
      ' https://zuoyecloud.com/animal.jpg',
      ' https://zuoyecloud.com/airplane.jpg'
    ]
    return res.send({
      success: true,
      data
    })
  } catch (error) {
    return res.send({
      success: false
    })
  }
})
module.exports = router
