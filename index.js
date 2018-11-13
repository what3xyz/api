const env = require("./config/api.json");

// Express and middleware
const express = require('express');
const cors = require('cors');
const {json, urlencoded} = require('body-parser');
const jwt = require('jsonwebtoken');

// Listen to Express API
if(env.PORT) app.listen(env.PORT, () => { console.log(`CORS-enabled API...listening on port ${env.PORT}:`) });
else throw(new Error(`Please define PORT: ${env.PORT} in config file.`));
