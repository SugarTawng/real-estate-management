const WhiteBoard = require('../controllers/WhiteBoardCtrl');
module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/whiteBoard Create One
     * @apiVersion 1.0.0
     * @apiName Create White Board By Admin
     * @apiGroup whiteBoard
     * @apiPermission Administrator
     * @apiHeader {string} access_token json web token to access to data
     *
     * @apiDescription Create a white board by Admin. Contains internal notice information
     *
     * @apiParam {string} Title the name of message (with 6 <= length <= 256)
     * @apiParam {string} Content the content of message (with 6 <= length <= 4068)
     * @apiParam {string} Keyword the keyword of the message (with 6 <= length <= 256)
     * @apiParam {binary} Public variable check privacy of message (value: 0 or 1, default 1: is private)
     * @apiParam {bigint} projectID ID of project relate to internal message
     *
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/whiteBoard
     *
     * @apiSuccess {String} id the ID of created whiteBoard
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
    app.post('/v1/auth/whiteBoard', WhiteBoard.create);
    /**
     * @api {GET} /v1/auth/whiteBoard Get List
     * @apiVersion 1.0.0
     * @apiName Get All White Board
     * @apiGroup whiteBoard
     * @apiPermission Super Admin, Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get all white board by Super Admin, Admin and Normal User
     *
     * @apiParam {Number} page page which we want to get (N/A)
     * @apiParam {Number} items item per page (N/A)
     * @apiParam {String} sort sort option the list by a field (N/A)
     * @apiParam {String} filter the properties of object {id, name, v.v} filter the query data (N/A)
     * @apiParam {String} q text filter for data (N/A)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/whiteBoard
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
    app.get('/v1/auth/whiteBoard', WhiteBoard.getAll);
    /**
     * @api {GET} /v1/auth/whiteBoard/:id Get One
     * @apiVersion 1.0.0
     * @apiName Get White Board
     * @apiGroup whiteBoard
     * @apiPermission Every type of user role, guest.
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one white board
     *
     * @apiParam {string} id ID of white board, on params
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/whiteBoard/2
     *
     * @apiSuccess {String} id the ID of white board
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
    app.get('/v1/auth/whiteBoard/:id', WhiteBoard.getOne);
    /**
     * @api {PUT} /v1/auth/whiteBoard/:id Update One
     * @apiVersion 1.0.0
     * @apiName Update White Board
     * @apiGroup whiteBoard
     * @apiPermission Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Update white board information by normal user (staff) and admin (manager)
     *
     * @apiParam {string} Title the name of message (with 6 <= length <= 256)
     * @apiParam {string} Content the content of message (with 6 <= length <= 4068)
     * @apiParam {string} Keyword the keyword of the message (with 6 <= length <= 256)
     * @apiParam {binary} Public variable check privacy of message (value: 0 or 1, default 1: is private)
     * @apiParam {bigint} projectID ID of project relate to internal message
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/whiteBoard/2
     *
     * @apiSuccess {String} id the ID of updated white board
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
    app.put('/v1/auth/whiteBoard/:id', WhiteBoard.update);
    /**
     * @api {DELETE} /v1/auth/whiteBoard/:id Delete One
     * @apiVersion 1.0.0
     * @apiName Delete A White Board
     * @apiGroup whiteBoard
     * @apiPermission Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Delete white board information by admin (manager). Contains internal notice information
     *
     * @apiParam {String} id ID of an white board
     *
     * @apiExample Example usage:
     * curl -i  https://localhost:3001/v1/auth/whiteBoard/2
     *
     * @apiSuccess {String} id ID of a deleted white board
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
    app.delete('/v1/auth/whiteBoard/:id', WhiteBoard.delete);
}