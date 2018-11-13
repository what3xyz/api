const env = require('../../config/api');
const db = require('../../utils/db');
const isemail = require('isemail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

if (!Number.isInteger(env.saltRounds)) throw(new Error(`Please add saltRounds as an INT to your config.`));

/*

        /auth/signup

*/

module.exports = async (req, res, next) => {

    try {

        let {email, password, username} = req.body;

        if (!email || !isemail.validate(email))
            return next({message: 'Please pass in a valid email address.'});

        if (!password || password.length < 8)
            return next({message: 'Please enter a valid password of 8 characters or more.'});

        let hash = await bcrypt.hash(password, env.saltRounds);

        let result = await db.query(`
            INSERT INTO users (password, email, username) 
            VALUES ($1,$2,$3)
            RETURNING id, username, email, name, avatar, created, modified`,
            [hash, email, email]
        );

        if (result.rowCount !== 1) next({status: 500, message: 'Error creating new user.'});

        let row = result.rows[0];
        row.token = await jwt.sign({uid: row.id}, env.jwtSecret, {expiresIn: env.jwtExpires});
        
        res.send(row);

    } catch(e) {
        return next({status: 500, trace: e});
    }
    
};