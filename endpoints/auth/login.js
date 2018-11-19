const env = require('../../config/api');
const db = require('../../utils/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*

        /auth/login

*/

module.exports = async (req, res, next) => {

    try {
        let { email, password } = req.body;

        if(!email || !password) return next({message: 'Please pass in email and password.'});

        let result = await db.query(`
            SELECT password, id, username, email, name, avatar, created, modified
            FROM users
            WHERE active=true AND email=$1`,
            [ email ]
        );
    
        // See if a record with that email exists
        if (result.rowCount !== 1) return next({status: 401, message: 'Please check your email and password.'});
    
        let row = result.rows[0];
        let hash = row.password;

        // Strip password from object so it's not returned to the user
        delete row.password;

        // See if hashes match
        const match = await bcrypt.compare(password, hash);
        if (!match) return next({status: 401, message: 'Please check your email and password.'});

        row.token = await jwt.sign({uid: row.id}, env.jwtSecret, {expiresIn: env.JwtExpires});

        res.send(row);
        
    } catch(e) {
        return next({status: 500, trace: e});
    }

};
