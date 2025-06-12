const dotenv = require('dotenv');
// use config data.
dotenv.config();

const config = {
    // basic settings
    baseUrl: "http://localhost:3002",
    frontUrl: "http://localhost:4200",
    rootUrl: "http://localhost:4200",
    
    // database settings
    port: process.env.PORT,
    db_host: process.env.MONGO_URL,
    authKey: "mdkskafdjdljflsjdfldjl",
    passwordKey: 'password',
    img_url:this.baseUrl,
    pass_sec: 'mohitskskdmishrakdfjalf',

    // cokie setting
    cokieSec: 'msskkkdmakdfjdk',
    cokieExpiry: 24 * 60 * 60 * 100,

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