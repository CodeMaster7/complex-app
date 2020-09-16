require('dotenv').config();
const mongodb = require('mongodb')

const {
    CONNECTION_STRING,
    SERVER_PORT
} = process.env;

//add this change for heroku and change port in the app.listen inside the mongodb.connect
let port = process.env.PORT
if (port == null || port == '') {
    port = SERVER_PORT
}

// connect to the database
mongodb.connect(CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
    console.log('connected to database');
    module.exports = client
    const app = require('./app')
    app.listen(port)
})
