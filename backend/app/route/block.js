const BlockCtrl = require('../controllers/BlockCtrl');
module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/block Create One
     * @apiVersion 1.0.0
     * @apiName Create Block (Building Apartment) By Admin
     * @apiGroup Block
     * @apiPermission Super Admin, Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Create a block (building apartment) of zone by Super Admin and Admin
     *
     * @apiParam {bigint} ZoneID Zone ID of block (building apartment) (unique integer)
     * @apiParam {int} numberOfFloor number of floor of block (building apartment)
     * @apiParam {float} lat lat of block (building apartment)
     * @apiParam {float} long long of block (building apartment)
     * @apiParam {enum} type the type of block (with value {normal, luxury})
     *
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/block
     *
     * @apiSuccess {String} id the ID of created block
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
    app.post('/v1/auth/block', BlockCtrl.create);
    /**
     * @api {GET} /v1/auth/account Get List
     * @apiVersion 1.0.0
     * @apiName Get All Block (Building Apartment)
     * @apiGroup Block
     * @apiPermission Super Admin, Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get all block (building apartment) by Super Admin, Admin and Normal User
     *
     * @apiParam {Number} page page which we want to get (N/A)
     * @apiParam {Number} items item per page (N/A)
     * @apiParam {String} sort sort option the list by a field (N/A)
     * @apiParam {String} filter the properties of object {id, name, v.v} filter the query data (N/A)
     * @apiParam {String} q text filter for data (N/A)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/block
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
    app.get('/v1/auth/block', BlockCtrl.getAll);
    /**
     * @api {GET} /v1/auth/block/:id Get One
     * @apiVersion 1.0.0
     * @apiName Get One Block (Building Apartment)
     * @apiGroup Block
     * @apiPermission Super Admin, Admin, Normal User, Guest.
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one block (building apartment) by Super Admin, Admin, Normal User, Guest.
     *
     * @apiParam {string} id ID of block (building apartment), on params
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/block/2
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
    app.get('/v1/auth/block/:id', BlockCtrl.getOne);
    /**
     * @api {PUT} /v1/auth/block/:id Update One
     * @apiVersion 1.0.0
     * @apiName Update Block
     * @apiGroup Block
     * @apiPermission Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Update block information by normal user (staff) and admin (manager)
     *
     * @apiParam {bigint} ZoneID Zone ID of block (building apartment) (unique integer)
     * @apiParam {int} numberOfFloor number of floor of block (building apartment)
     * @apiParam {float} lat lat of block (building apartment)
     * @apiParam {float} long long of block (building apartment)
     * @apiParam {enum} type the type of block (with value {normal, luxury})
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/block/2
     *
     * @apiSuccess {String} id the ID of updated block
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
    app.put('/v1/auth/block/:id', BlockCtrl.update);
    /**
     * @api {DELETE} /v1/auth/block/:id Delete One
     * @apiVersion 1.0.0
     * @apiName Delete A Block
     * @apiGroup Block
     * @apiPermission Super Admin, Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Delete block information by super admin (head of department) and admin (manager)
     *
     * @apiParam {String} id ID of an block
     *
     * @apiExample Example usage:
     * curl -i  https://localhost:3001/v1/auth/block/2
     *
     * @apiSuccess {String} id ID of a deleted block
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
    app.delete('/v1/auth/block/:id', BlockCtrl.delete);
}