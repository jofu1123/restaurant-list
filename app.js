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
// routes setting
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/search', require('./routes/search'))


/****************************
        listen server
****************************/

// start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})