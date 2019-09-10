const express = require('express')
const router = express.Router()
const Restaurant = require('../models/list')
const userForSort = require('../public/javascripts/userForSort')

// routes setting search function 
router.get('/', (req, res) => {
  let sortObject = userForSort(req.query)

  Restaurant.find()
    .sort(sortObject)
    .exec((err, allRestaurantList) => {
      const keyword = req.query.keyword.toLowerCase()
      const restaurants = allRestaurantList.filter(({ name, category }) => {
        return name.toLowerCase().includes(keyword) ||
          category.toLowerCase().includes(keyword)
      })
      if (err) return console.error(err)
      return res.render('index', { restaurants, sortName: Object.keys(sortObject), sort: Object.values(sortObject), keyword })
    })
})
module.exports = router