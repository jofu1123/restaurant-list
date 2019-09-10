const express = require('express')
const router = express.Router()
const Restaurant = require('../models/list')
const userForSort = require('../public/javascripts/userForSort')

router.get('/', (req, res) => {
  const sortName = userForSort(req.query).sortName
  const sort = userForSort(req.query).sort

  Restaurant.find((err, list) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: list, sortName, sort })
  })

})

router.get('/restaurants', (req, res) => {
  res.redirect('/')
})

module.exports = router