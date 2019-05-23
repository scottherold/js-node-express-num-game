// <---------- Server setup ---------->
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

// <---------- Dependencies ---------->
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'greatnumgamesesh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// <---------- Routing ---------->
// Root
app.get('/', function(req, res) {
    // Math randomizer
    if (!req.session.num > 0 ) {
        req.session.num = Math.floor(Math.random() * Math.floor(100));
    }
    console.log(req.session);
    res.render('index', {title: "great number game", sesh: req.session});
})

// New
app.post('/new', function(req, res) {
    req.session.guess = parseInt(req.body.guess);
    res.redirect('/');
})

// Delete
app.post('/delete', function(req, res) {
    req.session.guess = null;
    req.session.num = null;
    res.redirect('/');
})

// <---------- Port listening ---------->
app.listen(8000, function() {
    console.log('listening on port 8000...')
})