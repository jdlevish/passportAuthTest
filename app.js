const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport")
require('dotenv').config();
const cookieParser = require("cookie-parser");
const errorHandler = require('errorhandler');



//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
// const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(cookieParser());
app.use(require('morgan')('dev'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', resave: false, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());




// if (!isProduction) {
//     app.use(errorHandler());
// }

//Configure Mongoose
mongoose.connect('mongodb://localhost/passport-tutorial');
mongoose.set('debug', true);

// models and routes
require('./models/User.js');
require('./config/passport');
app.use(require('./routes'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/signUp.home.html"));
})
app.get('/login', (req, res) => {

    res.sendFile(path.join(__dirname, "/public/html/login.html"));
})



// Error handlers & middlewares
// if (!isProduction) {
//     app.use((err, req, res) => {
//         res.status(err.status || 500);

//         res.json({
//             errors: {
//                 message: err.message,
//                 error: err,
//             },
//         });
//     });
// }

// app.use((err, req, res) => {
//     res.status(err.status || 500);

//     res.json({
//         errors: {
//             message: err.message,
//             error: {},
//         },
//     });
// });

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));
