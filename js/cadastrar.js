        
const Connection = require('tedious').Connection;
var Request = require('tedious').Request;
const config = require('./dbconfig');

const express = require('express');
const router = express.Router();

// Rota para cadastro
router.post('/', (req, res) => {
    const { nome, email, senha } = req.body;
    console.log(`Novo cadastro: Nome: ${nome}, Email: ${email}, Senha: ${senha}`);

    var connection = new Connection(config);
        connection.on('connect', function(err) {
            if (err) {
                console.log('Connection failed', err);
            } else {
                console.log('Connected with Windows authentication');
                conferirCadastro(nome, email);
            }
        });


    function realizarCadastro(nome, email, senha) {
        res.json({ message: 'Cadastro recebido com sucesso!' });
        const request = new Request(
            `INSERT INTO usuario (username, email, senha) VALUES ('${nome}', '${email}', '${senha}')`,
            function(err) {
                if (err) {
                    console.log('Error inserting data', err);
                }
            }
        );
        connection.execSql(request);
    }

    function conferirCadastro(nome, email) {
        const request = new Request(
            `SELECT * FROM usuario WHERE username = '${nome}' OR email = '${email}'`,  
            function(err, rowCount) {
                if (err) {
                    console.log('Error querying data', err);        
                } else if (rowCount > 0) {
                    res.json({ message: 'Cadastro já presente no sistema!', validade: false});
                } else {
                    realizarCadastro(nome, email, senha);
                }
            }
        );
        connection.execSql(request);
    }
    connection.connect();
    connection.close();
});


module.exports = router



