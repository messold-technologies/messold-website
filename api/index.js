var express  = require('express');
var app      = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

console.log('Starting Express app...');
console.log('__dirname:', __dirname);

// Load environment variables
try {
    require('dotenv').config();
    console.log('Environment variables loaded');
} catch (e) {
    console.log('dotenv not available or no .env file:', e.message);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, '..', 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain');
    res.send("User-agent: *\nallow: /");
});

try {
    console.log('Loading routes...');
    require('../app/routes.js')(app, fs);
    console.log('Routes loaded successfully');
} catch (error) {
    console.error('Error loading routes:', error);
    console.error('Error stack:', error.stack);
    // Add a catch-all route if routes fail to load
    app.get('*', (req, res) => {
        res.status(500).send('Routes failed to load. Check server logs.');
    });
}

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

// Export the handler for Vercel serverless functions
console.log('Exporting app...');
module.exports = app;

