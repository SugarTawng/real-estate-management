/**
 * Created by bioz on 1/13/2017.
 */
// third party components

// our components
const ProjectManager = require('../manager/ProjectManager');
const Rest = require('../utils/Restware');

module.exports = {

    //////// POST

    create: function (req, res) {
        const accessUserId = req.body.accessUserId || '';
        const accessUserType = req.body.accessUserType || '';
        const accessLoginName = req.body.accessLoginName || '';

        console.log('toi da o day')

        let data = req.body || '';

        ProjectManager.create(accessUserId, accessUserType, accessLoginName, data, function (errorCode, errorMessage, httpCode, errorDescription, project) {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            } else {
                let resData = {};
                resData.id = project.id;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }
        });
    },


    // notifySync:function (req, res) {
    //     const accessUserId = req.body.accessUserId || '';
    //     const accessUserType = req.body.accessUserType || '';
    //
    //     const siteCode = req.body.siteCode || '';
    //     const companyCode = req.body.companyCode || '';
    //     const type = req.body.type || '';
    //
    //     ProjectManager.notifySync(accessUserId, accessUserType, siteCode, companyCode, type, function (errorCode, errorMessage, httpCode, errorDescription, result) {
    //         if (errorCode) {
    //             return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
    //         } else {
    //             return Rest.sendSuccessOne(res, result, httpCode);
    //         }
    //     });
    // },
    //
    // notifyUpgrade:function (req, res) {
    //     const accessUserId = req.body.accessUserId || '';
    //     const accessUserType = req.body.accessUserType || '';
    //
    //     const id = req.body.id || '';
    //
    //     ProjectManager.notifyUpgrade(accessUserId, accessUserType, id, function (errorCode, errorMessage, httpCode, errorDescription, result) {
    //         if (errorCode) {
    //             return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
    //         } else {
    //             return Rest.sendSuccessOne(res, result, httpCode);
    //         }
    //     });
    // },
    //
    // update: function (req, res) {
    //     const accessUserId = req.body.accessUserId || '';
    //     const accessUserType = req.body.accessUserType || '';
    //
    //     let id = req.params.id || '';
    //
    //     if(id === 'deletes'){
    //         let idList = req.body.ids || '';
    //         ProjectManager.deletes(accessUserId, accessUserType, idList, function (errorCode, errorMessage, httpCode, errorDescription) {
    //             if (errorCode) {
    //                 return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
    //             }
    //             return Rest.sendSuccessOne(res, null, httpCode);
    //         });
    //     }else {
    //         let updateData = req.body || '';
    //         ProjectManager.update(accessUserId, accessUserType, id, updateData, function (errorCode, errorMessage, httpCode, errorDescription) {
    //             if (errorCode) {
    //                 return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
    //             }
    //             let resData = {};
    //             resData.id = id;
    //             return Rest.sendSuccessOne(res, resData, httpCode);
    //         });
    //     }
    // },
    //


    getAll: function (req, res) {
        let accessUserId = req.query.accessUserId || '';
        let accessUserType = req.query.accessUserType || '';
        let accessLoginName = req.query.accessLoginName || '';

        let queryContent = req.query || '';

        ProjectManager.getAll(accessUserId, accessUserType, accessLoginName, queryContent, function (errorCode, errorMessage, httpCode, errorDescription, results) {
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
            ProjectManager.getStatistic(accessUserId, accessUserType, function (errorCode, errorMessage, httpCode, errorDescription, result) {
                if (errorCode) {
                    return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
                }
                return Rest.sendSuccessOne(res, result, httpCode);
            })
        }else{
            ProjectManager.getOne(accessUserId, accessUserType, id, function (errorCode, errorMessage, httpCode, errorDescription, result) {
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
            ProjectManager.deletes(accessUserId, accessUserType, ids, function (errorCode, errorMessage, httpCode, errorDescription) {
                if (errorCode) {
                    return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
                }
                return Rest.sendSuccessOne(res, null, httpCode);
            });
        }else {
            let accessLoginName = req.body.accessLoginName || '';
            let data = req.body || '';
            ProjectManager.update( accessUserId, accessUserType, accessLoginName, id, data, function (errorCode, errorMessage, httpCode, errorDescription, result) {
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

        ProjectManager.delete( accessUserId, accessUserType, id, function (errorCode, errorMessage, httpCode, errorDescription) {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.id = id;
            return Rest.sendSuccessOne(res, resData, httpCode);
        });
    },

    //////// DELETE

    // delete: function (req, res) {
    //     let accessUserId = req.body.accessUserId || '';
    //     let accessUserType = req.body.accessUserType || '';
    //     let id = req.params.id || '';
    //
    //     ProjectManager.delete(accessUserId, accessUserType, id, function (errorCode, errorMessage, httpCode, errorDescription) {
    //         if (errorCode) {
    //             return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
    //         }
    //         let resData = {};
    //         resData.id = id;
    //         return Rest.sendSuccessOne(res, resData, httpCode);
    //     });
    // }
};