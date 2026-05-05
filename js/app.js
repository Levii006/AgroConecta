const Connection = require('tedious').Connection;
var Request = require('tedious').Request;

const { connect } = require('tedious');
const config = require('./dbconfig');

var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) {
            console.log('Connection failed', err);
        } else {
            console.log('Connected with Windows authentication');
            CadastroUsuario();
        }
    });
connection.connect();



function CadastroUsuario(){
    var request = new Request(
        `select * from usuarios`,
        function(err) {
            if (err) {
                console.log('Error inserting user', err);
            } else {
                console.log('User inserted successfully');
            }
        }
    );
    connection.execSql(request);
}
