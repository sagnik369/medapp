//------IMPORT DEPENDENCIES------

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

//------INITIALIZE OBJECTS------

const app = express();

//------SET VIEW ENGINE------

app.set('view engine', 'pug');

//---SET BODY-PARSER------

app.use(bodyParser.urlencoded({ extended: false }));

//------HOME PAGE------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
});

//------Form to insert values in the tabel------

app.get('/form', (req, res) => {
    res.render('form.pug');
});

//------Posting form data------

app.post('/added', (req, res) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '369369',
        database: 'medapp'
    });
    
    connection.connect();
    let query = `INSERT INTO inventory(NAME, COUNT, BRAND) VALUES("${req.body.name}", ${req.body.count}, "${req.body.brand}");`;
    connection.query(query);
    let query1 = 'SELECT * FROM inventory';
    connection.query(query1, (err, rows) => {
        res.render('inventory.pug', {
            items: rows
        })
    });
    connection.end();
});

//------Inventory to view medicines------

app.get('/inventory', (req, res) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '369369',
        database: 'medapp'
    });
    
    connection.connect();
     let query = 'SELECT * FROM inventory;';
     connection.query(query, (err, rows) => {
         res.render('inventory.pug', {
            items: rows
         })
    });
    connection.end();
});

//------DELETE FROM TABLE------

app.get('/delete/:mid', (req, res) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '369369',
        database: 'medapp'
    });
    
    connection.connect();
     let query = `DELETE FROM inventory WHERE MID = ${req.params.mid};`;
     connection.query(query);
    connection.end();
});



app.listen(3000, () => console.log('Listening on port 3000...'));