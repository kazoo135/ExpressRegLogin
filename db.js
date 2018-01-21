var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '23.229.238.197',
    port: '3306',
    user: 'mcaruso',
    password: 'Chinaweb1',
    database: 'muzic_user'
})

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//   });

module.exports = connection; 