const router = require('express').Router()
const co = require('co')
const Logic = require('../models/logic')
router.post(
  '/logic/postlogic',
  co.wrap(function*(req, res) {
    try {
      let logic = req.body
      logic['searchinfo'] = JSON.stringify(logic)
      const number = yield Logic.countDocuments().exec()
      logic['index'] = number + 1
      const addOne = new Logic(logic)
      const logicInfo = yield addOne.save()
      return res.send(logicInfo)
    } catch (errors) {
      return res.send(errors)
    }
  })
)
router.post(
  '/logic/updatelogic',
  co.wrap(function*(req, res) {
    try {
      const id = req.body.id
      const logicInfo = Logic.findByIdAndUpdate(id, req.body.updata).exec()
      return res.send(logicInfo)
    } catch (errors) {
      return res.send(errors)
    }
  })
)
router.get(
  '/logic/getlogictitle',
  co.wrap(function*(req, res) {
    try {
      const { skip, number } = req.query
      let logicTitle = yield Logic.find()
        .skip(skip)
        .limit(number)
        .select('title index createdAt')
        .exec()
      let total = yield Logic.countDocuments().exec()
      return res.send({
        total,
        logicTitle
      })
    } catch (error) {
      res.send(error)
    }
  })
)
router.get(
  '/logic/search',
  co.wrap(function*(req, res) {
    try {
      let args = req.query.args
      let logicTitle = yield Logic.find({ searchinfo: new RegExp(args) })
        .select('title index')
        .exec()
      logicTitle = logicTitle.map(item => ({
        id: item._id,
        title: item.title,
        index: item.index
      }))
      return res.send({
        logicTitle
      })
    } catch (error) {
      res.send(error)
    }
  })
)
router.get(
  '/logic/getlogicbyarg',
  co.wrap(function*(req, res) {
    try {
      let index = req.query.index
      let logic = yield Logic.findOne({ index: Number.parseInt(index) })
        .select('')
        .exec()
      logic = {
        id: logic._id
      }
      return res.send({
        logic
      })
    } catch (error) {
      res.send(error)
    }
  })
)
router.get(
  '/logic/getlogicbyid',
  co.wrap(function*(req, res) {
    try {
      let id = req.query.id
      let logic = yield Logic.findById(id)
        .select('title index question tip answer')
        .exec()
      return res.send({
        logic
      })
    } catch (error) {
      res.send(error)
    }
  })
)
module.exports = router
