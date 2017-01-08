Yelp with Weather

[app link](https://yelp-with-weather.herokuapp.com)

A full-stack web application where users can search for businesses near them along with the weather associated with the results. JavaScript (ES6), React, Express, HTML, CSS, Materialize, Animate.css, WOW.js, Lodash, Yelp, Dark Sky, & Google Geolocation’s APIs, Heroku

* Implemented client-side caching to prevent spammy, duplicate inputs, and improved the cache mechanism such that the application drastically reduces the number of wasteful API calls for search queries that yield the same Yelp results
  * ie: “Garden Grove” vs “Garden&nbsp;&nbsp;&nbsp;&nbsp;Grove”, “garden grove” vs “Garden Grove”
* Added web application interactivity by implementing dynamic backgrounds based on weathers, adding loading indicators, and using Materialize components and JS-based animations