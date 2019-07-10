const router = require('express').Router()
const co = require('co')
const Article = require('../models/article')
router.post(
  '/article/addpaper',
  co.wrap(function*(req, res) {
    try {
      const type = req.body.type
      const num = yield Article.find({ type })
        .countDocuments()
        .exec()
      let article = req.body
      article['index'] = num + 1
      article = new Article(article)
      const data = yield article.save()
      return res.send({
        success: true,
        article: data
      })
    } catch (error) {
      return res.send(error)
    }
  })
)
router.post(
  '/article/updatepaper',
  co.wrap(function*(req, res) {
    try {
      const id = req.body.id
      const result = yield Article.findByIdAndUpdate(id, req.body.updata).exec()

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
  '/article/gettitle',
  co.wrap(function*(req, res) {
    try {
      const { type, number, skip } = req.query
      const titleArr = yield Article.find({ type })
        .select('title author index createdAt')
        .skip(skip)
        .limit(number)
        .exec()
      const total = yield Article.find({ type }).countDocuments()
      console.log(total)
      return res.send({
        success: true,
        title: titleArr,
        total
      })
    } catch (error) {
      return res.send(error)
    }
  })
)
router.get(
  '/article/getbyid',
  co.wrap(function*(req, res) {
    try {
      const id = req.query.id
      const result = yield Article.findById(id)
        .select('article title author createdAt')
        .exec()
      return res.send({
        success: true,
        article: result
      })
    } catch (error) {
      return res.send(error)
    }
  })
)
module.exports = router
