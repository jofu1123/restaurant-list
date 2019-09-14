const express = require('express')
const router = express.Router()
const Restaurant = require('../models/list')
const userForSort = require('../public/javascripts/userForSort')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const sortName = userForSort(req.query).sortName
  const sort = userForSort(req.query).sort

  Restaurant.find({ userId: req.user._id }, (err, list) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: list, sortName, sort })
  })

})

router.get('/restaurants', (req, res) => {
  res.redirect('/')
})

module.exports = router