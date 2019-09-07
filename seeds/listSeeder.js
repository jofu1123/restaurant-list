// require
const mongoose = require('mongoose')
const Restaurant = require('../models/list')
const restaurantList = require('../restaurant').results

// db connect
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')

  for (item in restaurantList) {
    Restaurant.create(restaurantList[item])
  }

  console.log('done')
})

