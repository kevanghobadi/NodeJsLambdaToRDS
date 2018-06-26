exports.handler = (event, context, callback) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: process.env.rds_host,
        user: process.env.rds_username,
        password: process.env.rds_password,
        database: process.env.db_name,
    });



    var sql = 'select * FROM customers where customers.name = (?);';

    var name = event.queryStringParameters.name;

    const promise = new Promise(function(resolve, reject) {
        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject(err);
            };
            connection.query(sql, [name], function(error, results, fields) {
                connection.destroy();
                if(error){
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })
    });
    promise.then((results) => {
        console.log(results);
        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(results)
        };
        callback(null, response);
   }).catch((error) => {
    console.log(error);
    const response = {
        statusCode: 500,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify("An error has occured")
    };
    callback(null, response);
   });
}