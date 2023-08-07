const WhiteBoard = require('../manager/WhiteBoardManager');
const Rest = require('../utils/Restware');

module.exports = {

    create: function (req, res) {
        const accessUserId = req.body.accessUserId || '';
        const accessUserType = req.body.accessUserType || '';
        const accessLoginName = req.body.accessLoginName || '';

        console.log('toi da o day')

        let data = req.body || '';

        WhiteBoard.create(accessUserId, accessUserType, accessLoginName, data, function (errorCode, errorMessage, httpCode, errorDescription, whiteBoard) {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            } else {
                let resData = {};
                resData.id = whiteBoard.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        });
    }
}