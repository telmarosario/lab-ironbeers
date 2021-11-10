const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

//* Iteration 3 - Beers page
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersArray => {
      //console.log(beersArray);  Array of objects. Each object is a beer with an id, name, tagline, image_url...
      res.render('beers', { beersKey: beersArray }); // We need to call render here because the promise gets resolved here, if we call it outside it is a pending promise.
    })
    .catch(err => console.log(err));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(oneBeerArray => {
      res.render('random-beer', { aBeerKey: oneBeerArray });
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
