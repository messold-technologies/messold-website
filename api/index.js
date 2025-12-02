var express  = require('express');
var app      = express();
var fs = require('fs');
var bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', __dirname + '/../views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nallow: /");
});

require('../app/routes.js')(app,fs);

// Export the app for Vercel serverless functions
module.exports = app;

