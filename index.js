'use strict'

const path = require('path');
const express = require('express');

const app = express();

//  GET - Request resources from server
//  POST - Send data to the server general purpose
//  PUT - Send data to the server at a particular location
//  PATCH - Send data to update something on the server
//  OPTIONS -
//  HEAD -

app.use('/assets',express.static(path.join(__dirname, './assets')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Todo Application - Changed'
    });
});

app.get('/login', (req, res) => {
    res.send('Hello World from my login page');
});

app.listen(3030, () => {
    console.log('Listening on port 3030');
});