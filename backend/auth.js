var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var express = require('express');
var router = express.Router();

var User = require('./models/User');


router.post('/register', (req, res) => {
    var userData = req.body;

    var user = new User(userData);
    user.save((err, result) => {
        if (err) {
            console.log('saving user error');
        }

        res.sendStatus(200);
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

            var payload = {};
            // need to get secret from config file
            var token = jwt.encode(payload, '123');
            res.status(200).send({ token });
        });

    });
});

module.exports = router;