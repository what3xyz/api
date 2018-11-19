const db = require('../../utils/db');

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
    
    } catch(e) {
        return next({status: 500, trace: e});
    }

};