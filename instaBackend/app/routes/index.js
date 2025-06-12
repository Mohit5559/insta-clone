const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passportConfig');
const config = require('../config/config');

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
router.post('/home', verify, Home.allRecords);
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
            session:false,      // When we use JWT and Passport so its mandatory to do sesson false other wise we got error req.session.regenerate is not a function
            failureRedirect:`${config.frontUrl}`
        }
    ),
    (req, res) => {     
        token = JSON.stringify(req.user.data)
        res.redirect(`${config.frontUrl}/account/auth/callback?user=${token}`)
    }
);

// This urls sent us to Google authentication page.
router.get('/auth/google', 
    passport.authenticate('google', { session:false,      // When we use JWT and Passport so its mandatory to do sesson false other wise we got error req.session.regenerate is not a function
        scope: ['profile', 'email']
        }
    )
);

// When we done all process after that this page come back with the success or fail response.
router.get('/auth/google/callback', passport.authenticate(
        'google', 
        {
            session:false,      // When we use JWT and Passport so its mandatory to do sesson false other wise we got error req.session.regenerate is not a function
            failureRedirect:`${config.frontUrl}`          
        }
    ),
    (req, res) => {
        token = JSON.stringify(req.user.data)
        res.redirect(`${config.frontUrl}/account/auth/callback?user=${token}`)
    }
);

// google login
router.get('/logout', (req,res) => { req.logout(); res.redirect(config.frontUrl)});

module.exports = router;