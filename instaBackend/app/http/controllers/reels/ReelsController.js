const DBQuery = require('../../models/query/query');
const con = require('../../../config/connectionMysql');
const config = require('../../../config/config');

class ReelsController{
    async getReels(req, res){
        try {
            let data = [];
            // let sql = `
            //         select up.userId, up.video, up.id, u.picture, u.username, uf.follow, uf.followedBy followId, uf.followedTo
            //         from userposts up
            //         left join users u on u.id = up.userId
            //         left join userfollows uf on u.id = uf.followedBy
            //     `;
            let sql = `
                    select up.userId, up.video, up.id, u.picture, u.username
                    from userposts up
                    left join users u on u.id = up.userId
                `;
            con.query(sql, async function (err, posts) {
                // after execute query if error come so return error otherwise return data.
                if (err) {
                    // error handling code goes here.
                    await res.json({ 'code':404, 'status':'fail', 'msg':'No record Found yet', 'error': err.sqlMessage, 'data':false});
                    return;
                }else {
                    let count = posts.length;
                    posts.map((post, index) => {
                        // comments data get.
                        let commentSql = `
                            select uc.id, uc.postId, uc.userId, uc.thought, u.picture, u.username
                            from usercomments uc
                            left join users u on u.id = uc.userId
                            where postId = ${post.id}
                        `;
                        
                        con.query(commentSql, async function(err, comments){
                            if(err){
                                // error handling code goes here.
                                res.json({ 'code':404, 'status':'fail', 'msg':'No record Found yet', 'error': err.sqlMessage, 'data':false});
                                return;
                            }else{
                                // post.push({"comments":comments});
                                post["comments"] = comments;
                            }
                        });
                        
                        let likeSql = `
                            select id, postId, userId, likes
                            from userlikes
                            where postId = ${post.id}
                            AND
                            likes = 1
                        `;

                        con.query(likeSql, async function(err, likes){
                            if(err){
                                // error handling code goes here.
                                res.json({ 'code':404, 'status':'fail', 'msg':'No record Found yet', 'error': err.sqlMessage, 'data':false});
                                return;
                            }else{
                                post["likes"] = likes;
                                data.push(post);
                                setTimeout(() => {
                                    if(index === count-1){
                                        res.json({ 'code':200, 'status':'success', 'msg':'Data found successfully', 'error':null, 'data': data});
                                        return;
                                    }                                
                                }, 100);
                            }
                        });
                    });
                }
            });
        } catch (error) {
            console.log(error);
            res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': error, 'data':null});
            return
        }
    }
}

let Reels = new ReelsController();
module.exports = Reels;
