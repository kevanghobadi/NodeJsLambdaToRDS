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
  
  
    //connection.query('SELECT * FROM customers;', function (error, results, fields) {
    connection.query('INSERT INTO customers (name, value) values ("testName", "testValue");', function (error, results, fields) {
        console.log('e', error);
        console.log('r', results);
        callback(null, {});
        connection.destroy();
        });
    
    }); 
};