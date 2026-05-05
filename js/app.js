const Connection = require('tedious').Connection;
var Request = require('tedious').Request;

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
connection.close();



function CadastroUsuario(nome, email, senha){
    var request = new Request(
    `INSERT INTO dbo.usuario(username, email, senha) VALUES ('${nome}', '${email}', '${senha}')`,
        function(err) {
            if (err) {
                console.log('Erro ao cadastrar usuário', err);
            } else {
                console.log('Usuário cadastrado com sucesso');
            }
        }
    );
    connection.execSql(request);
}
