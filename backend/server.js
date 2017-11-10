var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

var User = require('./models/User');

var posts = [{ message: 'hello' }, { message: 'world' }];

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/register', (req, res) => {
    var userData = req.body;

    var user = new User(userData);
    user.save((err, result) => {
        if (err) {
            console.log('saving user error');
        }

        res.sendStatus(200);
    });
});


mongoose.connect('mongodb://test:test@ds157185.mlab.com:57185/demo123', { useMongoClient: true }, (err) => {
    if (!err) {
        console.log('Connected to database');
    }
});
app.listen(3000);