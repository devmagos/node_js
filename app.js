const path = require("path");
const express = require("express");
const bodyparser = require('body-parser');
const { TodoRouter } = require('./routes/todo');
const { App } = require('./config');

const app = express();

//  GET - Request resources from server
//  POST - Send data to the server general purpose
//  PUT - Send data to the server at a particular location
//  PATCH - Send data to update something on the server
//  OPTIONS -
//  HEAD -

app.use('/assets', express.static(path.join(__dirname, './assets')));

app.set('view engine', 'ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {
        title: App.NAME,
        baseUrl: App.BASE_URL
    });
});

app.get('/login', (req, res) => {
    res.send('Hello World from my login page');
});

app.use('/todo', TodoRouter);

module.exports = {
    app
}