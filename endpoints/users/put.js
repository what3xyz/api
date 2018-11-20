const db = require('../../utils/db');
const isEmail = require('isemail').validate;

/*

    /users


*/

module.exports = async (req, res, next) => {

    try {

        let uid = req.headers.uid;
        let body = req.body;
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

        let fields = Object.keys(body);
        fields.forEach(field => {
            if (!acceptableFields[field]) return next({status: 400, message: `Cannot update a field named ${field}.`});
            if (typeof body[field] !== acceptableFields[field]) return next({status: 400, message: `Field (${field}) is not of valid type.`});
        });


    } catch(e) {
        return next({status: 500, trace: e});
    }

}