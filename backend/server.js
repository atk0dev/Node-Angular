var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');


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


app.post('/login', (req, res) => {
    var userData = req.body;

    var user = User.findOne({ email: userData.email }, (err, user) => {
        console.log(user);

        if (!user) {
            return res.status(401).send({ message: 'Email or Password invalid' });
        }

        if (userData.password != user.password) {
            return res.status(401).send({ message: 'Email or Password invalid' });
        }

        var payload = {};

        // need to get secret from config file
        var token = jwt.encode(payload, '123');

        res.status(200).send({ token });
    });



});

app.get('/users', (req, res) => {
    User.find({}, "-password -__v", (err, users) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.send(users);
    });

});



mongoose.connect('mongodb://test:test@ds157185.mlab.com:57185/demo123', { useMongoClient: true }, (err) => {
    if (!err) {
        console.log('Connected to database');
    }
});
app.listen(3000);