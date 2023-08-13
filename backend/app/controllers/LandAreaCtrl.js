const LandAreaManager = require('../manager/LandAreaManager');
const Rest = require('../utils/Restware');

module.exports = {

    create: function (req, res) {
        const accessUserId = req.body.accessUserId || '';
        const accessUserType = req.body.accessUserType || '';
        const accessLoginName = req.body.accessLoginName || '';

        console.log('toi da o day')

        let data = req.body || '';

        LandAreaManager.create(accessUserId, accessUserType, accessLoginName, data, function (errorCode, errorMessage, httpCode, errorDescription, landArea) {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            } else {
                let resData = {};
                resData.id = landArea.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        });
    },
    getAll: function (req, res) {
        let accessUserId = req.query.accessUserId || '';
        let accessUserType = req.query.accessUserType || '';
        let accessLoginName = req.query.accessLoginName || '';

        let queryContent = req.query || '';

        LandAreaManager.getAll(accessUserId, accessUserType, accessLoginName, queryContent, function (errorCode, errorMessage, httpCode, errorDescription, results) {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            } else {
                return Rest.sendSuccessOne(res, results, httpCode);
            }
        });
    },
    getOne: function (req, res) {
        let accessUserId = req.query.accessUserId || '';
        let accessUserType = req.query.accessUserType || '';

        let id = req.params.id || '';

        if(id === 'statistic'){
            LandAreaManager.getStatistic(accessUserId, accessUserType, function (errorCode, errorMessage, httpCode, errorDescription, result) {
                if (errorCode) {
                    return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
                }
                return Rest.sendSuccessOne(res, result, httpCode);
            })
        }else{
            LandAreaManager.getOne(accessUserId, accessUserType, id, function (errorCode, errorMessage, httpCode, errorDescription, result) {
                if (errorCode) {
                    return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
                }
                return Rest.sendSuccessOne(res, result, httpCode);
            })
        }
    },

    update: function (req, res) {
        let accessUserId = req.body.accessUserId || '';
        let accessUserType = req.body.accessUserType || '';

        let id = req.params.id || '';

        if( id === 'deletes' ){
            let ids = req.body.ids || '';
            LandAreaManager.deletes(accessUserId, accessUserType, ids, function (errorCode, errorMessage, httpCode, errorDescription) {
                if (errorCode) {
                    return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
                }
                return Rest.sendSuccessOne(res, null, httpCode);
            });
        }else {
            let accessLoginName = req.body.accessLoginName || '';
            let data = req.body || '';
            LandAreaManager.update( accessUserId, accessUserType, accessLoginName, id, data, function (errorCode, errorMessage, httpCode, errorDescription, result) {
                if (errorCode) {
                    return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
                }
                let resData = {};
                resData.id = result;
                return Rest.sendSuccessOne(res, resData, httpCode);
            });
        }
    },

    delete: function (req, res) {
        let accessUserId = req.body.accessUserId || '';
        let accessUserType = req.body.accessUserType || '';
        let id = req.params.id || '';

        LandAreaManager.delete( accessUserId, accessUserType, id, function (errorCode, errorMessage, httpCode, errorDescription) {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.id = id;
            return Rest.sendSuccessOne(res, resData, httpCode);
        });
    },
}