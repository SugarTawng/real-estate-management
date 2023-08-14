const LandArea = require('../controllers/LandAreaCtrl');
module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/landArea Create One
     * @apiVersion 1.0.0
     * @apiName Create Land Area By Admin
     * @apiGroup landArea
     * @apiPermission  Administrator
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Create a land area of zone by Admin
     *
     * @apiParam {bigint} zoneID zone ID of land area
     * @apiParam {string} landDirection land direction of land area
     * @apiParam {string} isFront  variable check the facade of the land area (value: {FRONT, LEFT, RIGHT, BEHIND, NONE})
     * @apiParam {float} lat lat of land area
     * @apiParam {float} long long of land area
     * @apiParam {float} buildingArea construction area of the land lot
     * @apiParam {float} totalArea total area of the land
     * @apiParam {int} numberOfRoom number of room in building of land area
     * @apiParam {int} numberOfFloor number of floor in building of land area
     * @apiParam {int} numberOfWc number of WC in building of land area
     * @apiParam {double} price total price of land area
     * @apiParam {bigint} owner ID of user account who own area land (unique in, default: null)
     * @apiParam {enum} buyStatus buy status of land area (with value {block, deal, not block})
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/landArea
     *
     * @apiSuccess {String} id the ID of created land area
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
    app.post('/v1/auth/landArea', LandArea.create);
    /**
     * @api {GET} /v1/auth/landArea Get List
     * @apiVersion 1.0.0
     * @apiName Get All Land Area
     * @apiGroup landArea
     * @apiPermission Super Admin, Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get all land area by Super Admin, Admin and Normal User
     *
     * @apiParam {Number} page page which we want to get (N/A)
     * @apiParam {Number} items item per page (N/A)
     * @apiParam {String} sort sort option the list by a field (N/A)
     * @apiParam {String} filter the properties of object {id, name, v.v} filter the query data (N/A)
     * @apiParam {String} q text filter for data (N/A)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/landArea
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
    app.get('/v1/auth/landArea', LandArea.getAll);
    /**
     * @api {GET} /v1/auth/landArea/:id Get One
     * @apiVersion 1.0.0
     * @apiName Get One Land Area
     * @apiGroup landArea
     * @apiPermission Every type of user role, guest.
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one land area
     *
     * @apiParam {string} id ID of land area, on params
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/landArea/2
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
    app.get('/v1/auth/landArea/:id', LandArea.getOne);
    /**
     * @api {PUT} /v1/auth/landArea/:id Update One
     * @apiVersion 1.0.0
     * @apiName Update Land Area Unit
     * @apiGroup landArea
     * @apiPermission Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Update land area unit information by normal user (staff) and admin (manager)
     *
     * @apiParam {bigint} zoneID zone ID of land area
     * @apiParam {string} landDirection land direction of land area
     * @apiParam {string} isFront  variable check the facade of the land area (value: {FRONT, LEFT, RIGHT, BEHIND, NONE})
     * @apiParam {float} lat lat of land area
     * @apiParam {float} long long of land area
     * @apiParam {float} buildingArea construction area of the land lot
     * @apiParam {float} totalArea total area of the land
     * @apiParam {int} numberOfRoom number of room in building of land area
     * @apiParam {int} numberOfFloor number of floor in building of land area
     * @apiParam {int} numberOfWc number of WC in building of land area
     * @apiParam {double} price total price of land area
     * @apiParam {bigint} owner ID of user account who own area land (unique in, default: null)
     * @apiParam {enum} buyStatus buy status of land area (with value {block, deal, not block})
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/landArea/2
     *
     * @apiSuccess {String} id the ID of updated land area
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
    app.put('/v1/auth/landArea/:id', LandArea.update);
    /**
     * @api {DELETE} /v1/auth/landArea/:id Delete One
     * @apiVersion 1.0.0
     * @apiName Delete An Land Area Unit
     * @apiGroup landArea
     * @apiPermission Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Delete a land area unit information by admin (manager)
     *
     * @apiParam {String} id ID of a land area unit
     *
     * @apiExample Example usage:
     * curl -i  https://localhost:3001/v1/auth/landArea/2
     *
     * @apiSuccess {String} id ID of a deleted land area unit
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
    app.delete('/v1/auth/landArea/:id', LandArea.delete);
}