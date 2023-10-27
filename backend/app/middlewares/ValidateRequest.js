/**
 * Created by bioz on 1/13/2017.
 */
// third party components
const JsonWebToken = require('jsonwebtoken');


// our components
const Config = require('../config/Global');
const UserManager = require('../manager/AccountManager');
const Rest = require('../utils/Restware');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
    let token = (req.body && req.body.access_token) || req.headers['access_token'] || (req.query && req.query.access_token);

    if (token) {
        try {
            console.log('token', token);
            JsonWebToken.verify(token, Config.jwtAuthKey, function(error, decoded) {
                if(error) {
                    return Rest.sendError(res, 70, 'verify_token_fail', 400, error);
                }

                console.log('decoded new',decoded);

                UserManager.verifyUser(decoded.id, decoded.type, decoded.login_name, function (errorCode, errorMessage, httpCode, errorDescription) {
                    if (errorCode) {
                        return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
                    }
                    if (req.method === 'GET') {
                        req.query.accessUserId = decoded.id;
                        req.query.accessUserType = decoded.type;
                        req.query.accessLoginName = decoded.login_name;
                    } else {
                        req.body.accessUserId = decoded.id;
                        req.body.accessUserType = decoded.type;
                        req.body.accessLoginName = decoded.login_name;
                    }
                    next();
                });
            });
        } catch (error) {
            return Rest.sendError(res, 4170, "system", 400, error);
        }
    } else {
        return Rest.sendError(res, 4178, "invalid_token", 400, null);
    }
};
