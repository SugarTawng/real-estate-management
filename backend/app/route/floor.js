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
    app.post('/v1/auth/floor', oUserCtrl.createByAdmin);
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
    app.put('/v1/auth/floor/:id', oUserCtrl.update);
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
    app.delete('/v1/auth/floor/:id', oUserCtrl.delete);
}