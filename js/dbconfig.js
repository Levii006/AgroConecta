const config = {
    server: 'WHATSAPPTURBO',
    authentication:{
        type: 'default',
        options: {
            userName: 'AdminAC',
            password: 'abc123'
        },
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,
        database: 'AgroConectaDB',
        port: 1433
    }
}

module.exports = config;