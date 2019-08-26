/****************************
      setting and require
****************************/
// require express
const express = require('express')
const app = express()

// port
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')

// setting static file
app.use(express.static('public'))

// setting express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// require path of restaurant.json
const restaurantList = require('./restaurant.json')


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