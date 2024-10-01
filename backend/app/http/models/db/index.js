const db = require('./createDatabase');
const userTable = require('./userTable');
const postsTable = require('./postTable');
const commentTable = require('./commentTable');
const likeTable = require('./likeTable');
const userFollows = require('./userFollows');

exports = { db, userTable, postsTable, commentTable, likeTable, userFollows }