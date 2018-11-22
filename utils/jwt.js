const env = require('../config/api');
const jwt = require('jsonwebtoken');

if(!env.jwtExpires) throw(new Error('Add jwtExpires to your config file (i.e. "1hr")'));

module.exports = {

    sign: async (body, expires) => {

        expires = expires ? expires : env.jwtExpires;

        return await jwt.sign(body, env.jwtSecret, {expiresIn: expires});

    },

    verify: (token) => {

        return new Promise(resolve => {

            jwt.verify(token, env.jwtSecret, (err, decodedToken) => {
                if(err || !decodedToken) resolve({error: err});
                else resolve(decodedToken);
            })

        });

    }


};