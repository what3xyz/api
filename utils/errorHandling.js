const env = require("../config/api.json");

/* 

    errorHandler()
    This is to send a clean JSON error to the end user so they
    know what went wrong with their request.


*/

function errorHandler(err, req, res, next) {

    let { status, message } = err;
    status = status || 400;
    let key = status.toString();

    let messages = {
        "400": "Bad Request. " + (message || env.apiBadRequest),
        "401": "Unauthorized. " + (message || env.apiUnauthorized),
        "404": "Not Found. " + (message || env.apiNotFound),
        "500": "Internal Server Error. " + (message || env.apiInternalError)
    };
    message = messages[key] ? messages[key] : env.apiBadRequest;

    res.status(status).send({status, error: message});
}

module.exports = { errorHandler };