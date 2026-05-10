        
const Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('./dbconfig');

const express = require('express');
const router = express.Router();

// Rota para cadastro
router.post('/', (req, res) => {
    const { email, senha } = req.body;

    var connection = new Connection(config);
        connection.on('connect', function(err) {
            if (err) {
                console.log('Connection failed', err);
            } else {
                console.log('Connected with Windows authentication');
                conferirLogin(email, senha);
            }
        });

    function conferirLogin(email, senha) {
        const request = new Request(
            `SELECT username FROM usuario WHERE email = '${email}' AND senha = '${senha}'`,
            function(err, rowCount) {
                if (err) {
                    console.log('Error querying data', err);        
                } else if (rowCount > 0) {
                    res.json({ message: 'Login realizado com sucesso!', validade: true, nome: tempNome});
                } else {
                    res.json({ message: 'Email ou senha incorretos!', validade: false, nome: null });
                }
            }
        )

        request.on('row', function(columns) {
            columns.forEach(function(column) {
                tempNome = column.value;
            })
        });


        connection.execSql(request);
    }
    
    
    connection.connect();
    connection.close();
});


module.exports = router



        
/*const Connection = require('tedious').Connection;
var Request = require('tedious').Request;
const config = require('./dbconfig');

const express = require('express');
const router = express.Router();

// Rota para cadastro
router.post('/', (req, res) => {
    const { email, senha } = req.body;

    var connection = new Connection(config);
        connection.on('connect', function(err) {
            if (err) {
                console.log('Connection failed', err);
            } else {
                console.log('Connected with Windows authentication');
                conferirLogin(email, senha);
            }
        });

    function conferirLogin(email, senha) {
        const request = new Request(
            `SELECT (nome, email) FROM usuario WHERE email = '${email}' AND senha = '${senha}'`,
            function(err, rowCount) {
                if (err) {
                    console.log('Error querying data', err);        
                } else if (rowCount > 0) {
                    res.json({ message: 'Login realizado com sucesso!', validade: true });
                } else {
                    res.json({ message: 'Email ou senha incorretos!', validade: false });
                }
            }
        );
        connection.execSql(request);
    }
    
    connection.connect();
    connection.close();
});


module.exports = router*/
