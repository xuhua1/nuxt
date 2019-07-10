const router = require('express').Router()
const co = require('co')
const Book = require('../models/book')
router.post(
  '/book/postbook',
  co.wrap(function*(req, res) {
    try {
      let bookList = req.body.bookList
      const books = yield Book.find()
        .select('urlkey')
        .exec()
      const yseBooks = books.map(element => {
        return element.urlkey
      })
      bookList = bookList.filter(item => yseBooks.indexOf(item.urlkey) < 0)
      for (let i = 0; i < bookList.length; i++) {
        bookList[i]['searchinfo'] = JSON.stringify(bookList[i]).toLowerCase()
        const addOne = new Book(bookList[i])
        yield addOne.save()
      }
      return res.send({
        success: true
      })
    } catch (error) {
      return res.send(error)
    }
  })
)
router.post(
  '/book/setting',
  co.wrap(function*(req, res) {
    try {
      let { id, bookinfo } = req.body
      const result = Book.findByIdAndUpdate(id, { bookinfo }).exec()
      return res.send({
        result
      })
    } catch (error) {
      return res.send(error)
    }
  })
)
router.get(
  '/book/getbooktitle',
  co.wrap(function*(req, res) {
    try {
      const { skip, number } = req.query
      let bookTitle = yield Book.find()
        .skip(skip)
        .limit(number)
        .select('urlkey title size author downloadnum createdAt')
        .exec()
      bookTitle = bookTitle.map(item => ({
        id: item._id,
        urlkey: item.urlkey,
        title: item.title,
        createdAt: item.createdAt,
        size: item.size,
        downloadnum: item.downloadnum,
        author: item.author
      }))
      let total = yield Book.countDocuments().exec()
      return res.send({
        total,
        bookTitle
      })
    } catch (error) {
      res.send(error)
    }
  })
)
router.get(
  '/book/search',
  co.wrap(function*(req, res) {
    try {
      let args = req.query.args
      let bookTitle = yield Book.find({ searchinfo: new RegExp(args) })
        .select('urlkey title size author downloadnum createdAt')
        .exec()
      bookTitle = bookTitle.map(item => ({
        id: item._id,
        urlkey: item.urlkey,
        title: item.title,
        createdAt: item.createdAt,
        size: item.size,
        downloadnum: item.downloadnum,
        author: item.author
      }))
      return res.send({
        bookTitle
      })
    } catch (error) {
      res.send(error)
    }
  })
)

router.get(
  '/book/getbookbyid',
  co.wrap(function*(req, res) {
    try {
      const id = req.query.id
      let result = yield Book.findById(id)
        .select('urlkey bookinfo title size author downloadnum createdAt')
        .exec()

      return res.send({
        success: true,
        data: result
      })
    } catch (error) {
      return res.send(error)
    }
  })
)
module.exports = router
