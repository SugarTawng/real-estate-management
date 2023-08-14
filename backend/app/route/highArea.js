const HighArea = require('../controllers/HighAreaCtrl');
module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/highArea Create One
     * @apiVersion 1.0.0
     * @apiName Create High Area By Admin
     * @apiGroup highArea
     * @apiPermission  Administrator
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Create a high area of a floor by Admin
     *
     * @apiParam {bigint} floorID the floor ID of the high area unit (unique integer)
     * @apiParam {string} highAreaDirection high area direction (with 6 <= length <= 256)
     * @apiParam {float} totalArea total area of the high area unit
     * @apiParam {float} numberOfWc number of WC in the high area unit
     * @apiParam {int} numberOfRoom number of Room in the high area unit
     * @apiParam {int} price the price of the high area unit
     * @apiParam {int} owner ID of user account who own high area unit (unique in, default: null)
     * @apiParam {enum} buyStatus buy status of high area unit (with value {block, deal, not block})
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/highArea
     *
     * @apiSuccess {String} id the ID of created highArea unit
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
    app.post('/v1/auth/highArea', HighArea.create);
    /**
     * @api {GET} /v1/auth/highArea Get List
     * @apiVersion 1.0.0
     * @apiName Get All High Area
     * @apiGroup highArea
     * @apiPermission Super Admin, Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get all high area by Super Admin, Admin and Normal User
     *
     * @apiParam {Number} page page which we want to get (N/A)
     * @apiParam {Number} items item per page (N/A)
     * @apiParam {String} sort sort option the list by a field (N/A)
     * @apiParam {String} filter the properties of object {id, name, v.v} filter the query data (N/A)
     * @apiParam {String} q text filter for data (N/A)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/highArea
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
    app.get('/v1/auth/highArea', HighArea.getAll);
    /**
     * @api {GET} /v1/auth/highArea/:id Get One
     * @apiVersion 1.0.0
     * @apiName Get One High Area
     * @apiGroup highArea
     * @apiPermission Every type of user role, guest.
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one high area
     *
     * @apiParam {string} id ID of project, on params
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/highArea/2
     *
     * @apiSuccess {String} id the ID of high area
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
    app.get('/v1/auth/highArea/:id', HighArea.getOne);
    /**
     * @api {PUT} /v1/auth/highArea/:id Update One
     * @apiVersion 1.0.0
     * @apiName Update High Area
     * @apiGroup highArea
     * @apiPermission Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Update high area of a floor information by normal user (staff) and admin (manager)
     *
     * @apiParam {bigint} floorID the floor ID of the high area unit (unique integer)
     * @apiParam {string} highAreaDirection high area direction (with 6 <= length <= 256)
     * @apiParam {float} totalArea total area of the high area unit
     * @apiParam {float} numberOfWc number of WC in the high area unit
     * @apiParam {int} numberOfRoom number of Room in the high area unit
     * @apiParam {int} price the price of the high area unit
     * @apiParam {int} owner ID of user account who own high area unit (unique in, default: null)
     * @apiParam {enum} buyStatus buy status of high area unit (with value {block, deal, not block})
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/highArea/2
     *
     * @apiSuccess {String} id the ID of updated high area of a floor
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
    app.put('/v1/auth/highArea/:id', HighArea.update);
    /**
     * @api {DELETE} /v1/auth/highArea/:id Delete One
     * @apiVersion 1.0.0
     * @apiName Delete A High Area
     * @apiGroup highArea
     * @apiPermission Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Delete high area of a floor information by admin (manager)
     *
     * @apiParam {String} id ID of an high area of a floor
     *
     * @apiExample Example usage:
     * curl -i  https://localhost:3001/v1/auth/highArea/2
     *
     * @apiSuccess {String} id ID of a deleted high area of a floor
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
    app.delete('/v1/auth/highArea/:id', HighArea.delete);
}