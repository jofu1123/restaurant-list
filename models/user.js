const mongoose = require('mongoose')
const Sechma = mongoose.Schema

const restaurantSchema = new Sechma({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', restaurantSchema)