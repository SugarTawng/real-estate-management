const FloorCtrl = require('../controllers/FloorCtrl');
module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/floor Create One
     * @apiVersion 1.0.0
     * @apiName Create floor in block (apartment building) By Admin
     * @apiGroup Floor
     * @apiPermission Administrator
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Create a floor in block (building apartment) by Admin
     *
     * @apiParam {bigint} BlockID block ID (building apartment) of the floor (unique integer)
     * @apiParam {int} numberOfHighArea the number of area units in the floor
     * @apiParam {float} publicArea public area of floor
     * @apiParam {float} totalArea total area of floor
     *
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/floor
     *
     * @apiSuccess {String} id the ID of created floor
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
    app.post('/v1/auth/floor', FloorCtrl.create);
    /**
     * @api {GET} /v1/auth/floor Get List
     * @apiVersion 1.0.0
     * @apiName Get All Floor In Block (Apartment Building)
     * @apiGroup Floor
     * @apiPermission Super Admin, Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get all floor in block (apartment building) by Super Admin, Admin and Normal User
     *
     * @apiParam {Number} page page which we want to get (N/A)
     * @apiParam {Number} items item per page (N/A)
     * @apiParam {String} sort sort option the list by a field (N/A)
     * @apiParam {String} filter the properties of object {id, name, v.v} filter the query data (N/A)
     * @apiParam {String} q text filter for data (N/A)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/floor
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
    app.get('/v1/auth/floor', FloorCtrl.getAll);
    /**
     * @api {GET} /v1/auth/floor/:id Get One
     * @apiVersion 1.0.0
     * @apiName Get One Floor In Block (Apartment Building)
     * @apiGroup Floor
     * @apiPermission Every type of user role, guest.
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one floor in block (apartment building)
     *
     * @apiParam {string} id ID of floor in block (apartment building), on params
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/floor/2
     *
     * @apiSuccess {String} id the ID of floor in block (apartment building)
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
    app.get('/v1/auth/floor/:id', FloorCtrl.getOne);
    /**
     * @api {PUT} /v1/auth/floor/:id Update One
     * @apiVersion 1.0.0
     * @apiName Update Floor In Block (Apartment Building)
     * @apiGroup Floor
     * @apiPermission Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Update floor in block (apartment building) information by normal user (staff) and admin (manager)
     *
     * @apiParam {bigint} BlockID block ID (building apartment) of the floor (unique integer)
     * @apiParam {int} numberOfHighArea the number of area units in the floor
     * @apiParam {float} publicArea public area of floor
     * @apiParam {float} totalArea total area of floor
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/floor/2
     *
     * @apiSuccess {String} id the ID of updated floor in block (apartment building)
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
    app.put('/v1/auth/floor/:id', FloorCtrl.update);
    /**
     * @api {DELETE} /v1/auth/floor/:id Delete One
     * @apiVersion 1.0.0
     * @apiName Delete A Floor In Block (Apartment Building)
     * @apiGroup Floor
     * @apiPermission Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Delete floor in block (apartment building) information by admin (manager)
     *
     * @apiParam {String} id ID of a floor in block (apartment building)
     *
     * @apiExample Example usage:
     * curl -i  https://localhost:3001/v1/auth/floor/2
     *
     * @apiSuccess {String} id ID of a deleted floor in block (apartment building)
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
    app.delete('/v1/auth/floor/:id', FloorCtrl.delete);
}