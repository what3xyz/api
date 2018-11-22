const jwt = require('./jwt');

/*

    authenticated()
    checks if the jwt token passed in has not expired,
    and matches the uid header which is also required.

*/

module.exports = async (req, res, next) => {

    try {
        let { authorization, uid } = req.headers;

        let token = authorization ? authorization.split(' ') : null;

        if (!authorization || !uid || token[0] !== "Bearer" || !token[1])
            return next({status: 400, message: 'Please send proper Authorization headers.'});

        let decodedToken = await jwt.verify(token[1]);
        if(!decodedToken || decodedToken.error || !decodedToken.uid || decodedToken.uid !== uid)
            return next({status: 401, message: 'Authorization headers invalid or expired.'});

        return next();

    } catch(e) {
        return next({status: 401, trace: e});
    }
}