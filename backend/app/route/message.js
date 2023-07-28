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
    app.post('/v1/auth/message', oUserCtrl.createByAdmin);
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
    app.put('/v1/auth/message/:id', oUserCtrl.update);
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
    app.delete('/v1/auth/message/:id', oUserCtrl.delete);
}