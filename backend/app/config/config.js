const dotenv = require('dotenv');
// use config data.
dotenv.config();

const config = {
    // basic settings
    baseUrl: process.env.URL + process.env.PORT,
    frontUrl: process.env.URL + process.env.FRONT_PORT,
    rootUrl:process.env.URL,

    // database settings
    port: process.env.PORT,
    db_host: process.env.MONGO_URL,
    authKey: process.env.JWT,
    passwordKey: 'password',
    img_url:process.env.URL + process.env.PORT,
    pass_sec: 'mohitskskdmishrakdfjalf',

    // cokie setting
    cokieSec: 'msskkkdmakdfjdk',
    cokieExpiry: process.env.expiry,

    // eamil settings
    emailHost: process.env.EMAIL_HOST,
    emailPort: process.env.EMAIL_PORT,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    emailFrom: process.env.EMAIL_FROM,

    // cloude file upload setting
    cloud_name:     process.env.CLOUDINARY_CLOUD_NAME,
    cloud_api:      process.env.CLOUDINARY_API_KEY,
    cloud_secret:   process.env.CLOUDINARY_API_SECRET,

    // facebook credentials
    faceId:process.env.FACE_ID,
    faceKey: process.env.FACE_SECRET_KEY,
    
    // google credentials
    googleId:process.env.GOOGLE_ID,
    googleKey: process.env.GOOGLE_SECRET_KEY,
    
    // github credentials
    githubId:process.env.GIT_ID,
    githubKey: process.env.GIT_SECRET_KEY,
}

module.exports = config;