const DBQuery = require('../../models/query/query');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const path = require('path');
const con = require('../../models/query/query');
const transporter = require('../../../config/sendEmail');
const config = require('../../../config/config');
const cryptoJs = require('crypto-js');

class AccountClass{
    login(req, res){
        // define fields accouding to input
        let fieldName = (req.body.username.search('@') === -1) ? 'mobile' : 'email';
        try {
            // call query class for insert data with callback function which will get error/data after query excution will success.
            DBQuery.findOne('users', fieldName, `'${req.body.username}'`, async function(err,user){
                if (err) {
                    res.json({ 'code':409, 'status':'fail', 'msg': 'Something went wrong', 'error':err.sqlMessage, 'data':null});
                    return;
                } else {
                    if (user >= 0){
                        res.json({ 'code':404, 'status':'fail', 'msg': 'User doesn\'t exists.', 'error':null, 'data':null});
                        return;
                    }

                    // compare password
                    const dbPassword = await bcrypt.compare(req.body.password, user[0].password);

                    if(dbPassword === false){
                        res.json({ 'code':401, 'status':'fail', 'msg':'User unauthorized', 'error': null, 'data':null});
                        return;
                    } 

                    // create token
                    const accessToken = jwt.sign({ id: user[0].id }, config.authKey, {expiresIn:'1D'} );

                    // privent password from user
                    const {password, ...others} = user[0];
                    res.json({ 'code':200, 'status':'success', 'msg':'Login successfully', 'error': null, 'data':{'user': others, 'token':accessToken}});
                    return;
                }
            });            
        } catch (error) {
            res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': error, 'data':null});
            return;
        }
        return;
    }

    async register(req, res){
        // UPDATE `users` SET `id`= 1;
        // define fields accouding to input
        let fieldName = (req.body.email.search('@') === -1) 
            ? "(firstname, lastname, mobile, username, password)"
            : "(firstname, lastname, email, username, password)";
        
        const data = [
            `'${req.body.firstName}'`,
            `'${req.body.lastName}'`,
            `'${req.body.email}'`,
            `'${req.body.username}'`,
            `'${await bcrypt.hash(req.body.password, 8)}'`
        ];      

        // call query class for insert data with callback function which will get error/data after query excution will success.
        DBQuery.create('users', fieldName, data, function(err,result){
            if (err) {
                console.log(err.sqlMessage);
                // error handling code goes here.
                res.json({ 'code':409, 'status':'fail', 'msg':'User exists', 'error':err.sqlMessage, 'data':null});
                return;
            } else {            
                // code to execute on data retrieval.
                res.json({ 'code':201, 'status':'success', 'msg':'New user created', 'error':null, 'data':result});
                return;
            }    
        });
        return;
    }

    // reset password
    async forgotPassword(req, res){
        try {
            // call query class for insert data with callback function which will get error/data after query excution will success.
            DBQuery.findOne('users', 'email', `'${req.body.email}'`, async function(err,user){
                if (err) {
                    res.json({ 'code':409, 'status':'fail', 'msg':'Something went wrong', 'error':err.sqlMessage, 'data':null});
                    return;
                } else {
                    if (user >= 0){
                        res.json({ 'code':404, 'status':'fail', 'msg':'User doesn\'t exists.', 'error':null, 'data':null});
                        return;
                    }
                    
                    // only name takes from email.
                    let email = req.body.email;
                    let space = email.replace("@", " ");
                    let length = space.indexOf(" ");
                    let name = email.substring(0, length);

                    // encrypt email.
                    let encryptEmail = jwt.sign({ email: req.body.email }, config.authKey, {expiresIn:'1D'});

                    ejs.renderFile(path.join(__dirname, '../../views/resetLink.ejs'), { name, encryptEmail }, 
                        (err, htmlPage) => {
                            if (err){
                                console.log(err);
                                
                                res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': err, 'data':null});
                                return;
                            }
                            // send email
                            transporter.sendMail({
                                    from:config.emailFrom,
                                    to: req.body.email,
                                    subject: 'password reset link',
                                    html:htmlPage
                                },
                                (error, info) => {
                                    if(error){
                                        res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': error, 'data':null});
                                        return;
                                    }
                                    console.log('Message sent: %s', info.messageId);
                                    res.json({ 'code':200, 'status':'success', 'msg':'Email sent successfully', 'error':null, 'data':email});
                                    return;
                                }
                            );
                        }
                    );
                    return;
                }
            });            
        } catch (error) {
            res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': error, 'data':null});
        }
        return;       
    }
    
    // password change
    async changePassword(req, res){
        try {
            // decrypt email.
            let plaintext = jwt.decode(req.body.email);

            const data = [
                `password = '${await bcrypt.hash(req.body.password, 8)}'`,
            ];

            DBQuery.findAndUpdate('users', `email='${plaintext.email}'`, data, function(err,result){
                if (err) {
                    // error handling code goes here.
                    res.json({ 'code':304, 'status':'fail', 'msg':'Not modified', 'error': err.sqlMessage, 'data':null});
                    return;
                } else {
                    // code to execute on data retrieval.
                    res.json({ 'code':200, 'status':'success', 'msg':'Password change successfull.', 'error':null, 'data': result});
                    return;
                }
            });
        } catch (error) {
            console.log(error);
            
            res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': error, 'data':null});
        }
    }

    // token validation change
    async tokenCheck(req, res){
        try {
            if(!req.body) return false;
            
            DBQuery.findOne('users', 'id', `${jwt.decode(req.body.token?.token)?.id}`, function(err,result){
                if (err) {
                    // error handling code goes here.
                    res.json({ 'code':404, 'status':'fail', 'msg':'User doesn\'t exists', 'error': err.sqlMessage, 'data':false});
                    return;
                } else {
                    // code to execute on data retrieval.
                    res.json({ 'code':200, 'status':'success', 'msg':'Valide user', 'error':null, 'data': true});
                    return;
                }
            });
        } catch (error) {
            console.log(error);
            res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': error, 'data':null});
        }
    }
}

let Account = new AccountClass();
module.exports = Account;
