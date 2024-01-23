const Message = require('../controllers/MessageCtrl');
module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/message Create One
     * @apiVersion 1.0.0
     * @apiName Create Message By Admin
     * @apiGroup Message
     * @apiPermission Administrator
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Create a message by Admin. Contains public notice information
     *
     * @apiParam {string} Title the name of message (with 6 <= length <= 256)
     * @apiParam {string} Content the content of message (with 6 <= length <= 4068)
     * @apiParam {string} Keyword the keyword of the message (with 6 <= length <= 256)
     *
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/message
     *
     * @apiSuccess {String} id the ID of created message
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
    app.post('/v1/auth/message', Message.create);
    /**
     * @api {GET} /v1/auth/message Get List
     * @apiVersion 1.0.0
     * @apiName Get All Message
     * @apiGroup Message
     * @apiPermission Super Admin, Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get all message by Super Admin, Admin and Normal User
     *
     * @apiParam {Number} page page which we want to get (N/A)
     * @apiParam {Number} items item per page (N/A)
     * @apiParam {String} sort sort option the list by a field (N/A)
     * @apiParam {String} filter the properties of object {id, name, v.v} filter the query data (N/A)
     * @apiParam {String} q text filter for data (N/A)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/message
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
    app.get('/v1/auth/message', Message.getAll);
    app.get('/v1/auth/customerMessage/:id', Message.getCustomerMessage);
    /**
     * @api {GET} /v1/auth/message/:id Get One
     * @apiVersion 1.0.0
     * @apiName Get One Message
     * @apiGroup Message
     * @apiPermission Every type of user role, guest.
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one message
     *
     * @apiParam {string} id ID of message, on params
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/message/2
     *
     * @apiSuccess {String} id the ID of message
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
    app.get('/v1/auth/message/:id', Message.getOne);
    /**
     * @api {PUT} /v1/auth/message/:id Update One
     * @apiVersion 1.0.0
     * @apiName Update Message
     * @apiGroup Message
     * @apiPermission Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Update message information by normal user (staff) and admin (manager). . Contains public notice information
     *
     * @apiParam {string} Title the name of message (with 6 <= length <= 256)
     * @apiParam {string} Content the content of message (with 6 <= length <= 4068)
     * @apiParam {string} Keyword the keyword of the message (with 6 <= length <= 256)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/message/2
     *
     * @apiSuccess {String} id the ID of updated message
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
    app.put('/v1/auth/message/:id', Message.update);
    /**
     * @api {DELETE} /v1/auth/message/:id Delete One
     * @apiVersion 1.0.0
     * @apiName Delete A Message
     * @apiGroup Message
     * @apiPermission Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Delete message information by admin (manager). Contains public notice information
     *
     * @apiParam {String} id ID of an message
     *
     * @apiExample Example usage:
     * curl -i  https://localhost:3001/v1/auth/message/2
     *
     * @apiSuccess {String} id ID of a deleted message
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
    app.delete('/v1/auth/message/:id', Message.delete);
}