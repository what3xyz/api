const db = require('../../utils/db');

/*

    /users


*/

async function get(req, res, next) {
    try {

        let { userId } = req.params;
        let { uid } = req.headers;

        if (userId !== uid) return next({status:401});

        let result = await db.query(`
            SELECT id, username, email, name, avatar, created, modified
            FROM users
            WHERE active=true AND id=$1`,
            [ userId ]
        );

        if(result.error || result.rowCount !== 1)
            return next({status: 500, message: 'Error retrieving user.'});

        res.send(result.rows[0]);

    } catch(e) {
        return next({status: 500, trace: e});
    }
}

module.exports = get;