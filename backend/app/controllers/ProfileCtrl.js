const Profile = require('../manager/ProfileManager');
const Rest = require('../utils/Restware');
const Message = require("../manager/MessageManager");

module.exports = {

    create: function (req, res) {
        const accessUserId = req.body.accessUserId || '';
        const accessUserType = req.body.accessUserType || '';
        const accessLoginName = req.body.accessLoginName || '';

        let data = req.body || '';

        Profile.create(accessUserId, accessUserType, accessLoginName, data, function (errorCode, errorMessage, httpCode, errorDescription, profile) {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            } else {
                let resData = {};
                resData.id = profile.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        });
    },
    getAll: function (req, res) {
        let accessUserId = req.query.accessUserId || '';
        let accessUserType = req.query.accessUserType || '';
        let accessLoginName = req.query.accessLoginName || '';

        let queryContent = req.query || '';

        Profile.getAll(accessUserId, accessUserType, accessLoginName, queryContent, function (errorCode, errorMessage, httpCode, errorDescription, results) {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            } else {
                return Rest.sendSuccessOne(res, results, httpCode);
            }
        });
    },
}