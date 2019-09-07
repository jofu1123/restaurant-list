/****************************
      setting and require
****************************/
// require
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/list')
const app = express()

// port
const port = 3000

// setting static file
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// connect mongodb
mongoose.connect("mongodb://127.0.0.1/restauralt", { useNewUrlParser: true })
const db = mongoose.connection

// setting express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//// connect db
// connect error
db.on('error', () => {
  console.log('mongodb error')
})

// connected
db.once('open', () => {
  console.log('mongodb connected')
})


/****************************
             routes
****************************/
// routes setting index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// routes setting show detail page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant })
})

// routes setting search function 
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurants = restaurantList.results.filter(({ name, category }) => {
    return name.toLowerCase().includes(keyword) || category.toLowerCase().includes(keyword)
  })

  res.render('index', { restaurants, keyword })
})


/****************************
        listen server
****************************/

// start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})