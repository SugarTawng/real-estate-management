module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/block Create One
     * @apiVersion 1.0.0
     * @apiName Create block (building apartment) By Admin
     * @apiGroup Block
     * @apiPermission Administrator
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Create a block (building apartment) of zone by Admin
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
    app.post('/v1/auth/block', oUserCtrl.createByAdmin);
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
    app.put('/v1/auth/block/:id', oUserCtrl.update);
    /**
     * @api {DELETE} /v1/auth/block/:id Delete One
     * @apiVersion 1.0.0
     * @apiName Delete A Block
     * @apiGroup Block
     * @apiPermission Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Delete block information by admin (manager)
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
    app.delete('/v1/auth/block/:id', oUserCtrl.delete);
}