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

// intialize passport and session.
app.use(passport.initialize());
app.use(passport.session());

// convert data to express json.
express.json();
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(bodyParser.json());
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// remove crosssite reposatory error.
// app.use(cors({ origin: config.frontUrl, methods: "GET, POST, PATCH, PUT, DELETE", credentials:true }));

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
        preflightContinue: false 
    })
);

// call api route.
app.use('/api', route);

app.listen(config.port, ()=>{console.log(`server start on port ${config.port}`);});