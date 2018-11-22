
// Express and middleware
const express = require('express');
const cors = require('cors');
const {json, urlencoded} = require('body-parser');

const env = require("./config/api.json");
const jwt = require('./utils/jwt');
const isAuthenticated = require('./utils/isAuthenticated');
const { errorHandler } = require('./utils/errorHandling');


let app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({extended: false}));


// Include endpoints
const auth = require('./endpoints/auth');
const users = require('./endpoints/users');

//API
let api = express();


/*

    API endpoints

*/

// Signup and login
api.post('/auth/:route', auth.post);

// Get and update user info
api.get('/users/:userId', isAuthenticated, users.get);
api.put('/users/:userId', isAuthenticated, users.put);



api.get('/', (req, res) => res.send({version: env.apiVersion}));

// Set API Namespace
app.use('/v1', api);
app.get('/', (req, res) => res.send({name: env.apiName, description: env.apiDescription}));



//APP (Catch-all with JSON responses)
app.post('*', (req, res, next) => next({status: 404}));


// Set Error Handler
app.use(errorHandler);

// Listen to Express API
if(env.PORT) app.listen(env.PORT, () => { 
    console.log(`CORS-enabled API...listening on port ${env.PORT}:`) });
else throw(new Error(`Please define PORT: ${env.PORT} in config file.`));
