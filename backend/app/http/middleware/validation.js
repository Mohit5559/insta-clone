const { body, check, validationResult} = require('express-validator');
const path = require('path');

const register = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name field is required.'),
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name field is required.'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email field is required.'),
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username field is required.'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password field is required.')
        .isLength({ min:8 })
        .withMessage('Password should be at least 8 charectors.'),
        (req, res, next) => {
            const result = validationResult(req);
            if(!result.isEmpty()){
                let errors=[];
                // create error array with obj.
                result.errors.map((er, index) => {
                    let objMsg = {};
                    objMsg['msg'] = er.msg;
                    errors.push(objMsg)
                });
                res.status(422).json({'error':errors});
                return;
            }
        next();
    }
];

const login = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username should not be empty.'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password should not be empty.'),
        (req, res, next) => {
            const result = validationResult(req);
            if(!result.isEmpty()){
                let errors=[];
                // create error array with obj.
                result.errors.map((er, index) => {
                    let objMsg = {};
                    objMsg['msg'] = er.msg;
                    errors.push(objMsg)
                });
                res.status(422).json({'error':errors});
                return;
            }
        next();
        return;
    },
];

const email = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('This fields is required.'),
        (req, res, next) => {
            const result = validationResult(req);
            if(!result.isEmpty()){
                let errors=[];
                // create error array with obj.
                result.errors.map((er, index) => {
                    let objMsg = {};
                    objMsg['msg'] = er.msg;
                    errors.push(objMsg)
                });
                res.status(422).json({'error':errors});
                return;
            }
        next();
    },
];

const password = [
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password should not be empty.')
        .isLength({ min:8 })
        .withMessage('Password should be at least 8 character or more.'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('This fields is required.'),
        (req, res, next) => {
            const result = validationResult(req);
            if(!result.isEmpty()){
                let errors=[];
                // create error array with obj.
                result.errors.map((er, index) => {
                    let objMsg = {};
                    objMsg['msg'] = er.msg;
                    errors.push(objMsg)
                });
                res.status(422).json({'error':errors});
                return;
            }
        next();
    },
];

// image validation using check method because its not body its file.
const image = [
    // check('userFile').custom((value, {req}) =>{
    //     const imgType = ['.jpg', '.jpeg', '.png', '.svg', '.mp4'];
    //     return (imgType.includes(path.extname(req.file.originalname))) 
    //     ? true : false;        
    // }).withMessage('Only jpg, jpeg, png and svg allowed')
    check('userFile').custom((value, {req}) =>{
        const imgType = ['.jpg', '.jpeg', '.png', '.svg', '.mp4'];
        return (imgType.includes(path.extname(req.file.originalname))) 
        ? true : false;        
    })
];

module.exports = {login, register, email, password, image};