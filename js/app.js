const Connection = require('tedious').Connection;
var Request = require('tedious').Request;

const config = require('./dbconfig');

var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) {
            console.log('Connection failed', err);
        } else {
            console.log('Connected with Windows authentication');
        }
    });
connection.connect();


