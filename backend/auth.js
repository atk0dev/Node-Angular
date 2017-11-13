var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var express = require('express');
var router = express.Router();

var User = require('./models/User');


router.post('/register', (req, res) => {
    var userData = req.body;

    var user = new User(userData);
    user.save((err, newUser) => {
        if (err) {
            return res.status(500).send({ message: 'Error saving user' });
        }

        createSendToken(res, newUser);
    });
});

router.post('/login', (req, res) => {
    var loginData = req.body;

    var user = User.findOne({ email: loginData.email }, (err, user) => {
        console.log(user);

        if (!user) {
            return res.status(401).send({ message: 'Email or Password invalid' });
        }

        bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(401).send({ message: 'Email or Password invalid' });
            }

            createSendToken(res, user);

        });

    });
});

function checkAuthhenticated(req, res, next) {
    console.log('checking if authenticated...');
    if (!req.header('authorization')) {
        return res.status(401).send({ message: 'Unauthorized. Missing Auth Header' });
    }

    var token = req.header('authorization').split(' ')[1];

    if (token == null || token == 'null') {
        return res.status(401).send({ message: 'Unauthorized. Token in Auth Header is empty' });
    }

    console.log('decoding token: ' + token);

    var payload = jwt.decode(token, '123');

    if (!payload) {
        return res.status(401).send({ message: 'Unauthorized. Auth Header Invalid' });
    }

    req.userId = payload.sub;
    console.log('all ok. can continue sending message.');
    next();
}

var auth = { router, checkAuthhenticated };

function createSendToken(res, user) {
    var payload = { sub: user._id };

    // need to get secret from config file
    var token = jwt.encode(payload, '123');
    res.status(200).send({ token });
}

module.exports = auth;