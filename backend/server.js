var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');

var app = express();

var User = require('./models/User');
mongoose.Promise = Promise;

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

app.get('/users', (req, res) => {
    User.find({}, "-password -__v", (err, users) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.send(users);
    });

});

// app.get('/profile/:id', (req, res) => {
//     User.findById(req.params.id, "-password -__v", (err, user) => {
//         if (err) {
//             console.log(err);
//             res.sendStatus(500);
//         }

//         res.send(user);
//     });

// });

app.get('/profile/:id', async(req, res) => {
    try {
        var user = await User.findById(req.params.id, '-password -__v');
        res.send(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});



mongoose.connect('mongodb://test:test@ds157185.mlab.com:57185/demo123', { useMongoClient: true }, (err) => {
    if (!err) {
        console.log('Connected to database');
    }
});
app.listen(3000, () => {
    console.log('started on port ' + 3000);
});