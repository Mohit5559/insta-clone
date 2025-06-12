// const {v2 as cloudinary} = require('cloudinary');
const fs = require('fs');
const config = require('../../config/config');

coudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.cloud_api,
    api_secret: config.cloud_secret
});

const cloudinaryFileUpload = async (filePath) => {
    try {
        if(!filePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(filePath, { resource_type: "auto"});
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary ", response.url);
        return response;
    } catch (error) {
        // remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(filePath);
        return null;
    }
}

module.exports = {cloudinaryFileUpload}