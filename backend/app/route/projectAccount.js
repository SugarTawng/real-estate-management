const ProjectAccountCtrl = require('../controllers/ProjectAccountCtrl');
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
    app.post('/v1/auth/projectAccount', ProjectAccountCtrl.create);
    /**
     * @api {GET} /v1/auth/project Get List
     * @apiVersion 1.0.0
     * @apiName Get All Project
     * @apiGroup Project
     * @apiPermission Super Admin, Admin, Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get all project by Super Admin, Admin and Normal User
     *
     * @apiParam {Number} page page which we want to get (N/A)
     * @apiParam {Number} items item per page (N/A)
     * @apiParam {String} sort sort option the list by a field (N/A)
     * @apiParam {String} filter the properties of object {id, name, v.v} filter the query data (N/A)
     * @apiParam {String} q text filter for data (N/A)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/project
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
    app.get('/v1/auth/projectAccount', ProjectAccountCtrl.getAll);
    /**
     * @api {GET} /v1/auth/project/:id Get One
     * @apiVersion 1.0.0
     * @apiName Get One Project
     * @apiGroup Project
     * @apiPermission Every type of user role, guest.
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one project
     *
     * @apiParam {string} id ID of project, on params
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/project/2
     *
     * @apiSuccess {String} id the ID of project
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
    app.get('/v1/auth/projectAccount/:id', ProjectAccountCtrl.getOne);
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
    // app.put('/v1/auth/project/:id', ProjectAccountCtrl.update);
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
    app.delete('/v1/auth/projectAccount/:id', ProjectAccountCtrl.delete);
}