const express = require('express')
const router = express.Router()
const Restaurant = require('../models/list')

// routes setting search function 
router.get('/', (req, res) => {
  const sort = req.query.sort || 'asc'
  const sortName = req.query.sortName || 'name'
  const sortObject = {}
  sortObject[sortName] = sort

  Restaurant.find()
    .sort(sortObject)
    .exec((err, allRestaurantList) => {
      const keyword = req.query.keyword.toLowerCase()
      const restaurants = allRestaurantList.filter(({ name, category }) => {
        return name.toLowerCase().includes(keyword) ||
          category.toLowerCase().includes(keyword)
      })
      if (err) return console.error(err)
      return res.render('index', { restaurants, sortName, sort, keyword })
    })
})
module.exports = router