const db = require('../../utils/db');

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

        
    } catch(e) {
        return next({status: 500, trace: e});
    }

}