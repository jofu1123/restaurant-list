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
const methodOverride = require('method-override')
const app = express()

// port
const port = 3000

// setting static file
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// setting use method-override
app.use(methodOverride('_method'))

// connect mongodb
mongoose.connect("mongodb://127.0.0.1/restaurant", { useNewUrlParser: true })
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
  Restaurant.find((err, list) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: list })
  })
})

app.get('/restaurants', (req, res) => {
  res.redirect('/')
})

// routes setting show detail page
app.get('/restaurants/:id/detail', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant })
  })
})

// routes Create
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// routes Update
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant })
  })
})

// route Update data
app.put('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save((err) => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}/detail`)
    })
  })
})

// routes Delete
app.delete('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
  // restaurant = req.body
})

// routes setting search function 
app.get('/search', (req, res) => {
  Restaurant.find((err, allRestaurantList) => {
    const keyword = req.query.keyword.toLowerCase()
    const restaurants = allRestaurantList.filter(({ name, category }) => {
      return name.toLowerCase().includes(keyword) || category.toLowerCase().includes(keyword)
    })
    res.render('index', { restaurants, keyword })
  })

})


/****************************
        listen server
****************************/

// start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})