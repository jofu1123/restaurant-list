const express = require('express')
const router = express.Router()
const Restaurant = require('../models/list')

router.get('/', (req, res) => {
  Restaurant.find((err, list) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: list })
  })
})

router.get('/restaurants', (req, res) => {
  res.redirect('/')
})

module.exports = router