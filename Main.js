const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const Router = require("./Router");

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//DataBases
const db = mysql.createConnection({
    host: 'localhost:8080',
    user: 'root',
    password: 'root',
    database: 'my-project'
});

db.connect(function(err) {
    if (console.error()){
        console.log('DB error');
        throw err;
        return false;
    }
});

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000),
    endConnectionOnClose: false
}, db);

app.use(session({
    key:'4289thgkdgskgsk434lklnvdnf',
    secret:'fksdnfdsnfsdfhsdfhlkw',
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}));

new Router(app, db);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build')) 
});

app.listen(3000);