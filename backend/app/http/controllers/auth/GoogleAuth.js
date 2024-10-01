
class GoogleAuth{
    // login success full
    loginSuccess(req, res){
        console.log("req.user");
        // if(req.user){
        //     console.log(req.user);
        //     res.status(200).json({ 'status':200, 'msg':'Ok', 'success': 'Successful logged in', 'data':req.user});
        // }else{res.status(401).json({'status':401, 'msg':'Unauthorized', 'error':'You are unauthorized', 'data':null });}
    }

    loginFailed(req, res){
        res.status(500).json({'status':500, 'msg':'Internal Server Error', 'error':'Server error', 'data':null });
    }
}

let google = new GoogleAuth();
module.exports = google;