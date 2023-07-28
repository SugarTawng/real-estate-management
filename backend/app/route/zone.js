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
    app.post('/v1/auth/zone', oUserCtrl.createByAdmin);
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
    app.put('/v1/auth/zone/:id', oUserCtrl.update);
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
    app.delete('/v1/auth/zone/:id', oUserCtrl.delete);
}