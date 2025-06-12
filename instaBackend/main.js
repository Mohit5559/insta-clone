const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const config = require('./app/config/config');

const route = require('./app/routes/index');
const {googleAuthentication, facebookAuthentincation} = require('./app/config/passportConfig');

const passport = require('passport');
const cors = require('cors');

const cookieSession = require('cookie-session');
const {userTable, db} = require('./app/http/models/db/index');

// const session = require('express-session');

// call the passport authentication.
googleAuthentication(passport);
facebookAuthentincation(passport);

// set image path
app.use("/profileImg", express.static('public/upload/profileImg'));
app.use("/userPost", express.static('public/upload/userPost'));

// create session.
app.use(
    cookieSession({ name: 'session', keys: [config.cokieSec], maxAge: config.cokieExpiry })
);


// app.use(session({
//     secret: config.cokieSec,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//  }));

// intialize passport and session.
app.use(passport.initialize());
// when we use passport strategy for authorization so its mandatory to use  passport.session but when we use jwt token that time
// we can't use possport.session other wise we will get an error.
// app.use(passport.session());

// convert data to express json.
express.json();

app.use(bodyParser.json());

// remove crosssite reposatory error.
app.use(
    cors({ 
        origin: config.frontUrl,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Origin',
            'x-access-token',
            'XSRF-TOKEN'
        ], 
        preflightContinue: false,
        credentials:true
    })
);

// call api route.
app.use('/api', route);

app.listen(config.port, ()=>{console.log(`server start on port ${config.port}`);});