const nodemailer = require('nodemailer');
const dotenv = require('dotenv') ;
const config = require('./config');

// use config data
dotenv.config();

// config settings for email
let transporter = nodemailer.createTransport({
    host: config.emailHost,
    // port: config.emailPort,
    port: 465,
    secure:true,
    requireTLS:true,
    auth:{
        user:config.emailUser,
        pass:config.emailPass,
    }
});

module.exports = transporter;