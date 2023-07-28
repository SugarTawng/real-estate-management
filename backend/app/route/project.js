module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/project Create One
     * @apiVersion 1.0.0
     * @apiName Create Project By Admin
     * @apiGroup Project
     * @apiPermission  Administrator
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Create a project by Admin
     *
     * @apiParam {string} name name of project (with 6 <= length <= 128)
     * @apiParam {string} address address of project (with 6 <= length <= 256)
     * @apiParam {string} phone phone of project  (with 11 <= length <= 12)
     * @apiParam {string} email email is provided for one project (unique string with format email)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/project
     *
     * @apiSuccess {String} id the ID of created project
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
    app.post('/v1/auth/project', oUserCtrl.createByAdmin);

    app.post('/v1/login', oUserCtrl.login);

    app.get('/v1/auth/users/:id', oUserCtrl.getOne);

    app.get('/v1/auth/users', oUserCtrl.getAll);
    /**
     * @api {PUT} /v1/auth/project/:id Update One
     * @apiVersion 1.0.0
     * @apiName Update Project
     * @apiGroup Project
     * @apiPermission Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Update project information by normal user (staff) and admin (manager)
     *
     * @apiParam {string} name name of project (with 6 <= length <= 128)
     * @apiParam {string} address address of project (with 6 <= length <= 256)
     * @apiParam {string} phone phone of project  (with 11 <= length <= 12)
     * @apiParam {string} email email is provided for one project (unique string with format email)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/project/2
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
    app.put('/v1/auth/project/:id', oUserCtrl.update);
    /**
     * @api {DELETE} /v1/auth/project/:id Delete One
     * @apiVersion 1.0.0
     * @apiName Delete An Project
     * @apiGroup Project
     * @apiPermission Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Delete a project information by admin (manager)
     *
     * @apiParam {String} id ID of an Project
     *
     * @apiExample Example usage:
     * curl -i  https://localhost:3001/v1/auth/project/2
     *
     * @apiSuccess {String} id ID of a deleted project
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
    app.delete('/v1/auth/project/:id', oUserCtrl.delete);
}