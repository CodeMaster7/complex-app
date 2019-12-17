require('dotenv').config();
const mongodb = require('mongodb')

const {
    CONNECTION_STRING,
    SERVER_PORT
} = process.env;

// connect to the database
const connectionString = CONNECTION_STRING

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
    console.log('connected to database');
    module.exports = client.db()
    const app = require('./app')
    app.listen(SERVER_PORT)
})
