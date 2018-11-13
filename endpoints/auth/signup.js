const isemail = require('isemail');

/*

        /auth/signup

*/

module.exports = async (req, res, next) => {

    try {

        let {email, password, username} = req.body;

        if (!email || !isemail.validate(email))
            return next({message: 'Please pass in a valid email address.'});

        if (!password || password.length < 8)
            return next({message: 'Please enter a valid password of 8 characters or more.'});


    } catch(e) {
        return next({status: 500, trace: e});
    }
    
};