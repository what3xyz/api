const db = require('../../utils/db');
const isEmail = require('isemail').validate;

/*

    /users


*/

module.exports = async (req, res, next) => {

    try {

        let { uid } = req.headers;
        let { body } = req;
        let { userId } = req.params;

        // Make sure a password is never sent by accident.
        delete body.password;

        // Only user can edit their own record
        if (userId !== uid) return next({status: 403, message: 'You can only edit your own user record.'});

        // User can change ONLY (name, email, avatar) NOT (id, etc.)
        let acceptableFields = {
            email: 'string',
            username: 'string',
            name: 'string',
            avatar: 'string'
        };
        
        // Validate Fields
        if (body.email && !isEmail(body.email)) return next({status: 400, message: `Email address (${body.email}) is not a valid email.`});

        let keys = Object.keys(body);
        keys.forEach(key => {
            if (!acceptableFields[key]) return next({status: 400, message: `Cannot update a field named ${key}.`});
            if (typeof body[key] !== acceptableFields[key]) return next({status: 400, message: `Field (${key}) is not of valid type.`});
        });

        /* 
            Query Builder
        */

       let field = '', 
       params = [ new Date(), userId ];

       //  forEach loop here ..


       // Query
       let query =`
            UPDATE users SET ${field}, modified=$1
            WHERE active=true AND id=$2
            RETURNING id, username, email, name, avatar, created, modified
       `

       let result = await db.query(query, params);

       res.send(result.rows[0]);


    } catch(e) {
        return next({status: 500, trace: e});
    }

};