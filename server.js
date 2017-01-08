const express = require('express');

const app = express();
const Yelp = require('yelp');
const jsonp = require('node-jsonp');
require('dotenv').config();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const apiV1Base = '/api/v1/';

app.get(`${apiV1Base}darkSky`, (req, res) => {
  const { lat, lon } = req.query;
  const SECRET_KEY = process.env.DARK_SKY_SECRET;
  jsonp(`https://api.darksky.net/forecast/${SECRET_KEY}/${lat},${lon}`, data => res.json(data));
});

app.get(`${apiV1Base}dankFood`, (req, res) => {
  const yelp = new Yelp({
    consumer_key: process.env.YELP_CONSUMER_KEY,
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET,
  });

  const { term, location } = req.query;

  yelp.search({ term, location })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.use((req, res, next) =>
  res.render('404', { status: 404, url: req.url }),
);

app.use((err, req, res, next) => {
  res.render('500', {
    status: err.status || 500,
    error: err,
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
