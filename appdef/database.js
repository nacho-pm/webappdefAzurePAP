const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'serverofdbnachomike.mysql.database.azure.com',
    user: 'Admin1',
    password: 'root$123',
    database: 'databasepap',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = database;