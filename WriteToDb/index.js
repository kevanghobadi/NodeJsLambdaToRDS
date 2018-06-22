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
  var response = {
      statusCode: 200,
       headers: {
                'Content-Type': 'application/json'
              },
        body: JSON.stringify('Success for Days')
  }
  //var sql = 'INSERT INTO customers (name, value) values (?,?);';
  var sql ='select * FROM customers;';
  //var sql ='delete FROM customers'
  var object = JSON.parse(event.body)
    connection.query(sql, [object.name, object.value], function (error, results, fields) {
        console.log('e', error);
        console.log('r', results);
        callback(null, response);
        connection.destroy();
        });
    
    }); 
};