//IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const bindRoutes = require('./routes/index');
const { port } = require('./config/index');
const connect = require('./db/index');
const cors = require('cors');

const app = express();

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//BIND ROUTES
bindRoutes(app);

//DB CONNECTION
connect();

//START_LISTEN
app.listen(port || 3000);