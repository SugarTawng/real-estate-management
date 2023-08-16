const ZoneCtrl = require('../controllers/ZoneCtrl');
module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/zone Create One
     * @apiVersion 1.0.0
     * @apiName Create Zone By Admin
     * @apiGroup Zone
     * @apiPermission  Administrator
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Create a zone of project by Admin
     *
     * @apiParam {bigint} projectID project ID of Zone (unique integer)
     * @apiParam {string} zoneName name of a zone (with 6 <= length <= 128)
     * @apiParam {float} constructionArea  construction area of a zone
     * @apiParam {float} totalArea total area of a zone
     * @apiParam {int} numberOfBlock number of block in zone
     * @apiParam {int} numberOfUnitLand number of unit land area of zone
     *
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/zone
     *
     * @apiSuccess {String} id the ID of created zone
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data":{
     *           "id": "abc"
     *       },
     *       "result": "ok",
     *       "message": "",
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "",
     *     }
     */
    app.post('/v1/auth/zone', ZoneCtrl.create);
    /**
     * @api {GET} /v1/auth/zone Get List
     * @apiVersion 1.0.0
     * @apiName Get All Zone
     * @apiGroup Zone
     * @apiPermission Super Admin, Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get all zone by Super Admin, Admin and Normal User
     *
     * @apiParam {Number} page page which we want to get (N/A)
     * @apiParam {Number} items item per page (N/A)
     * @apiParam {String} sort sort option the list by a field (N/A)
     * @apiParam {String} filter the properties of object {id, name, v.v} filter the query data (N/A)
     * @apiParam {String} q text filter for data (N/A)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/zone
     *
     * @apiSuccess {Object[]} data the list of data
     * @apiSuccess {Object} items {begin, end, total}
     * @apiSuccess {Object} pages {current, prev, hasPrev, next, hasNext, total}
     * @apiSuccess {String} result ok or fail
     * @apiSuccess {String} message something from server
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data": [...],
     *       "items": {"begin": 1, "end": 3, "total": 5},
     *       "pages": {"current": 1, "prev": 3, "hasPrev": true, "next": 5, "hasNext": true, "total": 56},
     *       "result": "ok",
     *       "message": ""
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "invalid input"
     *     }
     */
    app.get('/v1/auth/zone', ZoneCtrl.getAll);
    /**
     * @api {GET} /v1/auth/project/:id Get One
     * @apiVersion 1.0.0
     * @apiName Get One Zone
     * @apiGroup Zone
     * @apiPermission Every type of user role, guest.
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one zone
     *
     * @apiParam {string} id ID of project, on params
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/zone/2
     *
     * @apiSuccess {String} id the ID of project
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data":{
     *              "id": "2",
     *              "loginName": "bioz",
     *              "email": "ilovebioz@gmail.com",
     *              "activated": "1",
     *              ...
     *          },
     *          "result": "ok",
     *          "message" ""
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "invalid input"
     *     }
     */
    app.get('/v1/auth/zone/:id', ZoneCtrl.getOne);
    /**
     * @api {PUT} /v1/auth/zone/:id Update One
     * @apiVersion 1.0.0
     * @apiName Update Zone
     * @apiGroup Zone
     * @apiPermission Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Update zone of project information by normal user (staff) and admin (manager)
     *
     * @apiParam {bigint} projectID project ID of Zone (unique integer)
     * @apiParam {string} zoneName name of a zone (with 6 <= length <= 128)
     * @apiParam {float} constructionArea  construction area of a zone
     * @apiParam {float} totalArea total area of a zone
     * @apiParam {int} numberOfBlock number of block in zone
     * @apiParam {int} numberOfUnitLand number of unit land area of zone
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/zone/2
     *
     * @apiSuccess {String} id the ID of updated project
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data":{
     *              "id": "2"
     *          },
     *          "result":"ok",
     *          "message":""
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     */
    app.put('/v1/auth/zone/:id', ZoneCtrl.update);
    /**
     * @api {DELETE} /v1/auth/zone/:id Delete One
     * @apiVersion 1.0.0
     * @apiName Delete An Zone
     * @apiGroup Zone
     * @apiPermission Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Delete a zone information by admin (manager)
     *
     * @apiParam {String} id ID of a Zone
     *
     * @apiExample Example usage:
     * curl -i  https://localhost:3001/v1/auth/zone/2
     *
     * @apiSuccess {String} id ID of a deleted zone
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data":{
     *              "id": "2"
     *          },
     *          "result":"ok",
     *          "message":""
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     */
    app.delete('/v1/auth/zone/:id', ZoneCtrl.delete);
}