// Start up the server
var express = require('express');
var alexa = require('alexa-app');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.port || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Pull in all the Alexa apps
require('require-dir')('./apps');

app.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

// Attach all the Alex apps to express
alexa.bootstrap(app,'/');

// index page 
app.get('/', function(req, res) {
    res.render('test');
});

app.listen(PORT);
console.log("Listening on port "+PORT);