const dotenv = require('dotenv');
// use config data.
dotenv.config();

const config = {
    // basic settings
    baseUrl: process.env.URL + process.env.PORT,
    frontUrl: process.env.URL + process.env.FRONT_PORT,
    rootUrl:process.env.URL,
   
    // cokie setting
    cokieSec: 'msskkkdmakdfjdk',
    cokieExpiry: process.env.expiry,

    // eamil settings
    emailHost: process.env.EMAIL_HOST,
    emailPort: process.env.EMAIL_PORT,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    emailFrom: process.env.EMAIL_FROM,

    // database settings
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPwd: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,

    // facebook credentials
    faceId:process.env.FACE_ID,
    faceKey: process.env.FACE_SECRET_KEY,
    
    // google credentials
    googleId:process.env.GOOGLE_ID,
    googleKey: process.env.GOOGLE_SECRET_KEY,
}

module.exports = config;