
// app.all('*', function(req, res, next){
//   if (!req.get('Origin')) return next();
//   // use "*" here to accept any origin
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Access-Control-Allow-Methods', 'PUT');
//   res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
//   // res.set('Access-Control-Allow-Max-Age', 3600);
//   if ('OPTIONS' == req.method) return res.send(200);
//   next();
// });

//NEW

// Start up the server
var express = require('express');
var alexa = require('../index.js');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.port || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine','ejs');

var alexaApp = new alexa.app('test');
alexaApp.launch(function(request,response) {
	response.say("You launched the app!");
});
alexaApp.dictionary = {"names":["matt","joe","bob","bill","mary","jane","dawn"]};
alexaApp.intent("nameIntent",
	{
		"slots":{"NAME":"LITERAL"}
		,"utterances": [
			"my {name is|name's} {names|NAME}"
			,"set my name to {names|NAME}"
		]
	},
	function(request,response) {
		response.say("Success!");
	}
);
alexaApp.express(app, "/echo/");

// Launch /echo/test in your browser with a GET request!

app.listen(PORT);
console.log("Listening on port "+PORT);

