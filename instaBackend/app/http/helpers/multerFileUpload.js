const multer = require('multer');

// upload functioon
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/temp/my-uploads')
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + '_' + Math.round(Math.round() * 1E9)
        // cb(null, file.fieldname + '_' + uniqueSuffix);
        cb(null, file.originalname);
    }
});

module.exports = multer({storage});