exports.handler = (event, context, callback) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: process.env.rds_host,
        user: process.env.rds_username,
        password: process.env.rds_password,
        database: process.env.db_name,
    });


    new Promise(function (resolve, reject) {
        connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject(err);
            };

            var sql = 'INSERT INTO customers (name, value) values (?,?);';
            var object = JSON.parse(event.body)
            connection.query(sql, [object.name, object.value], function (error, results, fields) {
                connection.destroy();
                if(error){
                    reject(error);
                }else{
                    resolve(results);
                }
            });

        });
    }).then(() => {
        var response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify('Success for Days')
        }
        callback(null, response);
    }).catch((error) => {
        var response = {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify('Failure for Days')
        }
        callback(null, response);
    })

};
