exports.handler = (event, context, callback) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: process.env.rds_host,
        user: process.env.rds_username,
        password: process.env.rds_password,
        database: process.env.db_name,
    });
    
    connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };
  
  var sql = 'INSERT INTO customers (name, value) values (?,?);';
  //var sql ='SELECT * FROM customers;';
    connection.query(sql, [event.name, event.value], function (error, results, fields) {
        console.log('e', error);
        console.log('r', results);
        callback(null, {});
        connection.destroy();
        });
    
    }); 
};