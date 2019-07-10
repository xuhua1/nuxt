const getData = require('../js/sdoku')
const router = require('express').Router()
router.get('/sdoku/getsudo', (req, res) => {
  try {
    const sdoku = getData(15)
    return res.send({
      sdoku
    })
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
