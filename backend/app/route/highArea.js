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
    app.post('/v1/auth/highArea', oUserCtrl.createByAdmin);
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
    app.put('/v1/auth/highArea/:id', oUserCtrl.update);
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
    app.delete('/v1/auth/highArea/:id', oUserCtrl.delete);
}