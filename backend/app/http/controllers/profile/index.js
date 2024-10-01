const DBQuery = require('../../models/query/query');
const con = require('../../models/query/query');
const config = require('../../../config/config');
const jwt = require('jsonwebtoken');

class ProfileController{
    async getProfileById(req, res){
        try {
            if(!req.body) return false;
            
            DBQuery.findOne('users', 'id', `${jwt.decode(req.body.token)?.id}`, function(err,result){
                if (err) {
                    // error handling code goes here.
                    res.json({ 'code':404, 'status':'fail', 'msg':'User doesn\'t exists', 'error': err.sqlMessage, 'data':false});
                    return;
                } else {
                    let data = {
                        'img': config.baseUrl + '/profileImg/' + result[0].picture,
                        'details':result
                    }
                    // code to execute on data retrieval.
                    res.json({ 'code':200, 'status':'success', 'msg':'Valide user', 'error':null, 'data': data});
                    return;
                }
            });
        } catch (error) {
            res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': error, 'data':null});
        }
    }
}

let profile = new ProfileController();
module.exports = profile;
