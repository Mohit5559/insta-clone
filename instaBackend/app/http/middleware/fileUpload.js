const multer = require('multer');
const path = require('path');

// file upload on server
const Storage = multer.diskStorage({
    // destination : './public/upload/profileImg',
    destination:function(req, file, cb){
        if(file.mimetype === 'video/mp4'){
            cb(null, path.join(__dirname, '../../../public/upload/userPost'));
        }else{
            cb(null, path.join(__dirname, '../../../public/upload/profileImg'));
        }
    },
    filename(req, file, callBack){
        return callBack(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        // return callBack(null, `${Date.now()}_${file.originalname}`)
    }
});

// file filter accourding to extenstion
const fileFilter = (req, file, cb)=>{
    try {
        const imgType = ['.jpg', '.jpeg', '.png', '.svg', '.mp4'];
        if (!imgType.includes(path.extname(file.originalname))) {
            cb(null, false);
            return;
        }else{
            cb(null, true);
            return;
        }
    } catch (error) {
        console.log('err', error);
    }
}
const upload = multer({
    storage:Storage,
    limits:{fileSize:180000000},
    fileFilter:fileFilter
}).single('userFile');

module.exports = {upload}