module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/whiteBoard Create One
     * @apiVersion 1.0.0
     * @apiName Create White Board By Admin
     * @apiGroup whiteBoard
     * @apiPermission Administrator
     * @apiHeader {string} access_token json web token to access to data
     *
     * @apiDescription Create a whiteBoard by Admin. Contains internal notice information
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
    app.post('/v1/auth/whiteBoard', oUserCtrl.createByAdmin);
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
    app.put('/v1/auth/whiteBoard/:id', oUserCtrl.update);
}