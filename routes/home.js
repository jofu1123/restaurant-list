const express = require('express')
const router = express.Router()
const Restaurant = require('../models/list')

router.get('/', (req, res) => {
  const sort = req.query.sort || 'asc'
  const sortName = req.query.sortName || 'name'
  const sortObject = {}
  sortObject[sortName] = sort

  Restaurant.find((err, list) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: list, sortName, sort })
  })

})

router.get('/restaurants', (req, res) => {
  res.redirect('/')
})

module.exports = router