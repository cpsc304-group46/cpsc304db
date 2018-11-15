// server side

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

// Calling function from routes/<file>.js file
const {getMainPage, getMainDate, getMainPrice} = require('./routes/index');
const {getLogin} = require('./routes/login');
const {getUsers} = require('./routes/users');
const {addPostPage, getAddPostPage} = require('./routes/addpost');
const {getPostPage} = require('./routes/products.js');
const {getPriceRange, getPriceTable} = require('./routes/popq')

// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 5000;

// create connection to database
// mysql.createConnection takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'nickjon20',
    database: 'MarketDB'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MarketDB!');
});
global.db = db;

app.set('port', process.env.port || port); // express will use specified port
app.set('views', __dirname + '/views'); // express will look at /views folder to render view
app.set('view engine', 'ejs') // configure template engine
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))) // conf express to use the public folder
app.use(fileUpload()); // configure fileUpload

// routes for the app

app.get('/', getMainPage);
app.get('/date', getMainDate);
app.get('/price', getMainPrice);
app.get('/login', getLogin);
app.get('/users', getUsers);
app.get('/see_post', getPostPage);
app.post('/add_post', addPostPage);
app.get('/add_post', getAddPostPage
app.get('/productpost/edit:uid', editPostPage);
app.get('/productpost/delete:uid', deletePostPage);
app.post('/add_user', addUser);    //require users.js
app.post('/add_seller', addSeller);    //require users.js?
*/

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
