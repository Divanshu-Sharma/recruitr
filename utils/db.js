const mysql = require('mysql');

var db  = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b445d306c92e8b',
    password: '525e94d5',
    database: 'heroku_3132cb9e9fa32e0'
});

/*
db.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});
*/
  
module.exports = db;