exports.handler = (event, context, callback) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "<rds_endpoint>",
        user: "<rds_username>",
        password: "<rds_password>",
        database: "<db_name>",
    });
    console.log(connection);
};