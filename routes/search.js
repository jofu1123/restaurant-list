const express = require('express')
const router = express.Router()
const Restaurant = require('../models/list')

// routes setting search function 
router.get('/', (req, res) => {
  Restaurant.find((err, allRestaurantList) => {
    const keyword = req.query.keyword.toLowerCase()
    const restaurants = allRestaurantList.filter(({ name, category }) => {
      return name.toLowerCase().includes(keyword) || category.toLowerCase().includes(keyword)
    })
    res.render('index', { restaurants, keyword })
  })
})

module.exports = router