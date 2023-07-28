module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/account Create One
     * @apiVersion 1.0.0
     * @apiName Create Account By Admin
     * @apiGroup Account
     * @apiPermission  Administrator
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Create an account of user by Admin
     *
     * @apiParam {string} phone phone of user account (unique string with 10 <= length <= 12)
     * @apiParam {string} loginName loginName of user account (unique string with 6 <= length <= 256)
     * @apiParam {string} password  password of user account (with 6 <= length <= 128)
     * @apiParam {string} firstName firstName of user account (with 6 <= length <= 128)
     * @apiParam {string} lastName lastName of user account  (with 6 <= length <= 128)
     * @apiParam {string} displayName displayName of user account (with 6 <= length <= 128)
     * @apiParam {string} email  email of user account (unique string with format email)
     * @apiParam {enum} type type of user account (with value {anonymous, admin, superadmin, normal user})
     * @apiParam {binary} employee employee of user account (with value 0 or 1)
     * @apiParam {string} phoneVerified phoneVerified of user account (unique string with 10 <= length <= 12)
     * @apiParam {string} emailVerified emailVerified of user account (unique string with format email)
     *
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/account
     *
     * @apiSuccess {String} id the ID of created account
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
    app.post('/v1/auth/account', oUserCtrl.createByAdmin);
    /**
     * @api {PUT} /v1/auth/account/:id Update One
     * @apiVersion 1.0.0
     * @apiName Update Account
     * @apiGroup Account
     * @apiPermission Admin, Normal User, Greater Rights
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Update account information by normal user (staff) and admin (manager)
     *
     * @apiParam {string} phone phone of user account (unique string with 10 <= length <= 12)
     * @apiParam {string} loginName loginName of user account (unique string with 6 <= length <= 256)
     * @apiParam {string} password  password of user account (with 6 <= length <= 128)
     * @apiParam {string} firstName firstName of user account (with 6 <= length <= 128)
     * @apiParam {string} lastName lastName of user account  (with 6 <= length <= 128)
     * @apiParam {string} displayName displayName of user account (with 6 <= length <= 128)
     * @apiParam {string} email  email of user account (unique string with format email)
     * @apiParam {enum} type type of user account (with value {anonymous, admin, superadmin, normal user})
     * @apiParam {binary} employee employee of user account (with value 0 or 1)
     * @apiParam {string} phoneVerified phoneVerified of user account (unique string with 10 <= length <= 12)
     * @apiParam {string} emailVerified emailVerified of user account (unique string with format email)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/account/2
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
    app.put('/v1/auth/account/:id', oUserCtrl.update);
    /**
     * @api {DELETE} /v1/auth/account/:id Delete One
     * @apiVersion 1.0.0
     * @apiName Delete An Account
     * @apiGroup Account
     * @apiPermission Admin, Normal User, Greater Rights
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Delete account information by normal user (staff) and admin (manager)
     *
     * @apiParam {String} id ID of an account
     *
     * @apiExample Example usage:
     * curl -i  https://localhost:3001/v1/auth/account/2
     *
     * @apiSuccess {String} id ID of a deleted account
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
    app.delete('/v1/auth/account/:id', oUserCtrl.delete);
}