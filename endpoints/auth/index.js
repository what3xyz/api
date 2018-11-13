const signup = require('./signup');

/*

        /auth

*/

module.exports = {

    post: async (req, res, next) => {

        try {

            switch(req.params.route) {

                case 'signup':
                    signup(req, res, next);
                    break;

                case 'login':
                    login(req, res, next);
                    break;

                default:
                    return next({status: 404});

            }
        
        } catch(e) {
            return next({status: 500, trace: e});
        }
    }
};