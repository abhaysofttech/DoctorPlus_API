require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const passport = require('passport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// const options = {
//     origin: true,
//   "Access-Control-Allow-Credentials": true,

//   "Access-Control-Allow-Origin": true,
//   "Access-Control-Allow-Headers": true,
//   "Access-Control-Expose-Headers": true
//   };
//   app.use(cors(options));
  //app.options('*', cors(issue2options));
// use JWT auth to secure the api
app.use(jwt());
app.use(passport.initialize());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/hospital', require('./hospital/hospital.controller'));
app.use('/state', require('./state/state.controller'));
app.use('/city', require('./city/city.controller'));

app.use(function(req, res, next) {
    console.log(req,res);
      // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
