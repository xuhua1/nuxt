const router = require('express').Router()
const co = require('co')
const Comment = require('../models/comment')
router.post(
  '/comment/postCm',
  co.wrap(function*(req, res) {
    try {
      console.log(req.body)
      const comment = new Comment(req.body)
      const result = yield comment.save()
      return res.send({
        success: true,
        result
      })
    } catch (error) {
      return res.send(error)
    }
  })
)
router.get(
  '/comment/getbyroute',
  co.wrap(function*(req, res) {
    try {
      let { routePath } = req.query
      let commentList = yield Comment.find({ routePath })
        .select('nickname routePath content createdAt')
        .sort({ createdAt: -1 })
        .exec()
      return res.send({
        commentList
      })
    } catch (error) {
      res.send(error)
    }
  })
)

module.exports = router
