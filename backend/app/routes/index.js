const express = require('express');
const router = express.Router();
const passport = require('passport');
// const passport = require('../config/passportConfig');
const config = require('../config/config');
const facebook = require('../http/controllers/auth/FacebookAuth');
const google = require('../http/controllers/auth/GoogleAuth');
const { register, login, password, email, image } = require('../http/middleware/validation');
const { verify } = require('../http/middleware/auth');
const { upload } = require('../http/middleware/fileUpload');

const Acconunt = require('../http/controllers/auth/AccountController');
const Home = require('../http/controllers/home/HomeController');
const UploadController = require('../http/controllers/fileUpload/UploadController');
const PostUpload = require('../http/controllers/fileUpload/PostUploadController');
const Profile = require('../http/controllers/profile/index');
const Reels = require('../http/controllers/reels/ReelsController');
const Comments = require('../http/controllers/comments/CommentsController');
const Likes = require('../http/controllers/likes/LikesController');
const Follow = require('../http/controllers/follows/FollowsController');

// Dashboard
router.get('/home', verify, Home.allRecords);
router.post('/upload', upload, image, UploadController.uploadFile);
router.post('/post/upload', upload, image, PostUpload.uploadPost);
router.post('/profile/details', verify, Profile.getProfileById);
router.post('/userPost', verify, Reels.getReels);
router.post('/userComment',verify, Comments.comments);
router.post('/userLike', verify, Likes.like);
router.post('/userFollow', verify, Follow.follow);

// local authentication
router.post('/account/login', login, Acconunt.login);
router.post('/account/register', register, Acconunt.register);
router.post('/account/forgot', email, Acconunt.forgotPassword);
router.post('/account/reset', password, Acconunt.changePassword);
router.post('/account/token', Acconunt.tokenCheck);

// Facebook
router.get('/auth/facebook', passport.authenticate("facebook", { scope: ['public_profile', 'email'] }));
router.get('/auth/facebook/callback', passport.authenticate(
    'facebook', 
    {
        successRedirect: '/facebook/login/success',
        failureRedirect:'/facebook/login/failed'
    }
    ));

// facebook login
router.get('/facebook/login/success', facebook.loginSuccess);
router.get('/facebook/login/failed', facebook.loginFailed);
router.get('/facebook/logout', (req,res) => { console.log('hello'); req.logout(); res.redirect(config.frontUrl)});

// Google
router.get('/auth/google', passport.authenticate("google", { scope: ['profile'] }));
router.get('/auth/google/callback', passport.authenticate(
    'google', 
    {
        successRedirect: '/google/login/success',
        failureRedirect:'/google/login/failed'
    }
    ));

// google login
router.get('/google/login/success', google.loginSuccess);
router.get('/google/login/failed', google.loginFailed);
router.get('/google/logout', (req,res) => { console.log('hello'); req.logout(); res.redirect(config.frontUrl)});


module.exports = router;