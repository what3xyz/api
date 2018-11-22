const jwt = require('./jwt');

/*

    authenticated()

*/

module.exports = async (req, res, next) => {

    try {
        let { authorization, uid } = req.headers;

        let token = authorization ? authorization.split(' ') : null;

        if (!authorization || !uid || token[0] !== "Bearer" || !token[1])
            return next({status: 400, message: 'Please send proper Authorization headers.'});


    } catch(e) {
        return next({status: 401, trace: e});
    }
}