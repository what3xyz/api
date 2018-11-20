const db = require('../../utils/db');

/*

    /users


*/

async function get(req, res, next) {
    try {

        let { userId } = req.params;
        let { uid } = req.headers;

        let result = await db.query(`
            SELECT id, username, email, name, avatar, created, modified
            FROM users
            WHERE active=true AND id=$1`,
            [ userId ]
        );

    }
}

module.exports = get;