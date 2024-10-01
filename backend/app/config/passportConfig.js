// const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const DBQuery = require('../http/models/query/query');
const config = require('./config');

// Facebook
exports.facebookAuthentincation = (passport) => { passport.use(
    new FacebookStrategy(
        {
            clientID: config.faceId,
            clientSecret: config.faceKey,
            callbackURL: config.frontUrl + '/auth/facebook/callback',
        },
        
        function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ facebookId: profile.id }, function (err, user) {
              return cb(err, user);
            });
        }
    )
);

// when login in facebook serialize user.
passport.serializeUser(function(user, cb){ cb(null, user)});
passport.deserializeUser(function(user, cb){ cb(null, user)});
}

// Google
exports.googleAuthentication = (passport) => { passport.use(
    new GoogleStrategy(
        {
            clientID: config.googleId,
            clientSecret: config.googleKey,
            callbackURL: '/auth/google/callback',
			scope: ["profile", "email"],
        },
        
        // google will send back the tokens and profile
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            done(null, profile);
        }
        
        // google will send back the tokens and profile and if we save this data in db so use cb->callback argument otherwise use done method.
        // function (accessToken, refreshToken, profile, cb) {
        //     User.findOrCreate({googleId:profile.id}, function(err, user){ return cb(err, user)});
        // }
    )
);

// when login in facebook serialize user.
passport.serializeUser(function(user, cb){ cb(null, user)});
passport.deserializeUser(function(user, cb){ cb(null, user)});
};

// local authentication.
// exports.localAuthentincation = (passport) => { passport.use(
//     new LocalStrategy({usernameField:'email', passwordField: 'password'},(username, password, done) => {
//         try {
//             // call query class for insert data with callback function which will get error/data after query excution will success.
//             DBQuery.findOne('users', 'email', username, function(err,user){
//                 if (err) {
//                     return done(err, false);
//                 } else {
//                     if (user > 0) return done('user doesn\'t exists.', false);
//                     if(user[0]['password'] !== password) return done('password did not match', false);

//                     return done(null, user);
//                 }

//             });
//         } catch (error) {
//             console.log(error);
//         }
//     })
// )

// // when login in facebook serialize user.
// passport.serializeUser((user, done) => {
//     if(user > 0) return done(null, user[0].id);
//     return done('user doensn\'t exists', false);
// });

// passport.deserializeUser((id, done) => {
//     // call query class for insert data with callback function which will get error/data after query excution will success.
//     DBQuery.findOne('users', 'id', id, function(err,user){
//         if (err) {
//             return done(err, false);
//         } else {
//             if (user >= 0) return done('user doesn\'t exists.', false);
//             if(user[0]['password'] !== password) return done('password did not match', false);

//             return done(null, user);
//         }

//     });
//     });
// };

