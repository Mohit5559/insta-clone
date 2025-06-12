const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');

const DBQuery = require('../http/models/query/query');
const jwt = require('jsonwebtoken');

// Facebook
exports.facebookAuthentincation = (passport) => { passport.use(
        new FacebookStrategy(
            {
                clientID: config.faceId,
                clientSecret: config.faceKey,
                callbackURL: `${config.baseUrl}/api/auth/facebook/callback`,
                profileFields: ['id', 'displayName', 'photos', 'email'] // optional
            },
            
            function(accessToken, refreshToken, profile, done) {
                try {
                    // call query class for insert data with callback function which will get error/data after query excution will success.
                    DBQuery.findOne('users', 'socialId', `'${profile.id}'`, async function(err, user){
                        if (err) {
                            console.log(err);                    
                            return;
                        } else {                    
                            if (user.length == 0){
                                let fieldName = "(socialId, email, username, displayName, givenname, familyname, provider, gender, picture)";
        
                                const data = [
                                    `'${profile.id}'`,
                                    `'${profile.emails[0].value}'`,
                                    `'${(profile.username === undefined) ? "" : profile.username}'`,
                                    `'${profile.displayName}'`,
                                    `'${(profile.name.givenName === undefined) ? "" : profile.name.givenName}'`,
                                    `'${(profile.name.familyName === undefined) ? "" : profile.name.familyName}'`,
                                    `'${profile.provider}'`,
                                    `'${profile.gender}'`,
                                    `'${profile.photos[0].value}'`,
                                ];      
                        
                                // call query class for insert data with callback function which will get error/data after query excution will success.
                                DBQuery.create('users', fieldName, data, async function(err,result){
                                    if (err) {
                                        console.log(err.sqlMessage);
                                        return;
                                    } else {
                                        // After creating the user get data again.
                                        DBQuery.findAbsolute('users', [`socialId='${profile.id}'`], async function(err, result){
                                            if(err){
                                                console.log(err.sqlMessage);
                                                return;                                                
                                            }else{                                                            
                                                // privent password from user
                                                const {password, picture, ...others} = result[0];

                                                // create token
                                                const accessToken = jwt.sign({ id: result[0].id }, config.authKey, {expiresIn:'1D'} );
                                                return done(null, { "data" : {"user": others, "token":accessToken}})                                    
                                            }
                                        })
                                    }    
                                });
                                return;
                            }
                            // privent password from user
                            const {password, picture, ...others} = user[0];

                            // create token
                            const accessToken = jwt.sign({ id: user[0].id }, config.authKey, {expiresIn:'1D'} );
                            return done(null, { "data" : {"user": others, "token":accessToken}})
                        }
                    });            
                } catch (error) {
                    console.log(error)
                    return;
                }
                return;
            }
        )
    );

    // when login in facebook serialize user.
    passport.serializeUser((user, done) => { done(null, user)});
    passport.deserializeUser((user, done) => { done(null, user)});
}

// Google
exports.googleAuthentication = (passport) => { passport.use(
        new GoogleStrategy(
                {
                    clientID: config.googleId,
                    clientSecret: config.googleKey,
                    callbackURL: `${config.baseUrl}/api/auth/google/callback`,
                    scope: ["profile", "email"],
                },
                
                // google will send back the tokens and profile and if we save this data in db so use cb->callback argument otherwise use done method.
                // google will send back the tokens and profile
                function (accessToken, refreshToken, profile, done) {
                    try {
                        // call query class for insert data with callback function which will get error/data after query excution will success.
                        DBQuery.findOne('users', 'socialId', `'${profile.id}'`, async function(err, user){
                            if (err) {
                                console.log(err);                    
                                return;
                            } else {                    
                                if (user.length == 0){
                                    let fieldName = "(socialId, email, displayName, givenname, familyname, provider, email_verified, picture)";
            
                                    const data = [
                                        `'${profile.id}'`,
                                        `'${profile.emails[0].value}'`,
                                        `'${profile.displayName}'`,
                                        `'${profile.name.givenName}'`,
                                        `'${profile.name.familyName}'`,
                                        `'${profile.provider}'`,
                                        `'${profile.emails[0].verified}'`,
                                        `'${profile.photos[0].value}'`,
                                    ];      
                            
                                    // call query class for insert data with callback function which will get error/data after query excution will success.
                                    DBQuery.create('users', fieldName, data, function(err,result){
                                        if (err) {
                                            console.log(err.sqlMessage);
                                            return;
                                        } else {
                                            // After creating the user get data again.
                                            DBQuery.findAbsolute('users', [`socialId='${profile.id}'`], async function(err, result){
                                                if(err){
                                                    console.log(err.sqlMessage);
                                                    return;                                                
                                                }else{                             
                                                    // privent password from user
                                                    const {password, ...others} = result[0];

                                                    // create token
                                                    const accessToken = jwt.sign({ id: result[0].id }, config.authKey, {expiresIn:'1D'} );
                                                    return done(null, { "data" : {"user": others, "token":accessToken}})                                    
                                                }
                                            })
                                        }    
                                    });
                                    return;
                                }
                                
                                // privent password from user
                                const {password, ...others} = user[0];

                                // create token
                                const accessToken = jwt.sign({ id: user[0].id }, config.authKey, {expiresIn:'1D'} );
                                return done(null, { "data" : {"user": others, "token":accessToken}})
                            }
                        });            
                    } catch (error) {
                        console.log(error)
                        return;
                    }
                    return;
                }
            )
        );

    // when login in google serialize user.
    passport.serializeUser((user, done) => { done(null, user)});
    passport.deserializeUser((user, done) => { done(null, user)});
};
