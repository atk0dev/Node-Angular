var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');

var app = express();

var User = require('./models/User');
var Post = require('./models/Post');

var auth = require('./auth');

mongoose.Promise = Promise;


app.use(cors());
app.use(bodyParser.json());


app.get('/posts/:id', async(req, res) => {
    var author = req.params.id;
    var posts = await Post.find({ author });
    res.send(posts);
});

app.post('/post', auth.checkAuthhenticated, (req, res) => {
    console.log('server is going to save message: ');

    var postData = req.body;
    postData.author = req.userId;
    console.log('here is post data for message: ');
    console.log(postData);

    var post = new Post(postData);
    post.save((err, result) => {
        if (err) {
            console.error('error saving post error');
            return res.status(500).send({ message: 'error saving post message' });
        }

        console.log('New post has been saved.');
        res.status(200).send({ newPost: post._id });
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

app.use('/auth', auth.router);

app.listen(process.env.PORT || 3000, () => {
    console.log('app started');
});