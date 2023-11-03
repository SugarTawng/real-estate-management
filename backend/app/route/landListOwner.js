const LandListOwnerCtrl = require('../controllers/LandListOwnerCtrl');
module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/account Create One
     * @apiVersion 1.0.0
     * @apiName Create Account By Super Admin and Admin
     * @apiGroup Account
     * @apiPermission  Super Admin, Admin, Superior
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
    app.post('/v1/auth/landListOwner', LandListOwnerCtrl.createByAdmin);
    /**
     * @api {GET} /v1/auth/account Get List
     * @apiVersion 1.0.0
     * @apiName Get All Account
     * @apiGroup Account
     * @apiPermission Super Admin, Admin and Normal User
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get all account by Super Admin, Admin and Normal User
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} items Item per page (N/A)
     * @apiParam {String} sort Sort option the list by a field (N/A)
     * @apiParam {String} filter filter the query data (N/A)
     * @apiParam {String} q Text filter for data (N/A)
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/account
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
    app.get('/v1/auth/landListOwner', LandListOwnerCtrl.getAll);
    /**
     * @api {GET} /v1/auth/users/:id Get One
     * @apiVersion 1.0.0
     * @apiName Get One Account
     * @apiGroup Account
     * @apiPermission Super Admin, Admin, Normal User, Guest
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one account
     *
     * @apiParam {string} id ID of account, on params
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/auth/account/2
     *
     * @apiSuccess {String} id the ID of account
     * @apiSuccess {String} loginName login name of user
     * @apiSuccess {String} displayName display name of user
     * @apiSuccess {String} email email of user
     * @apiSuccess {String} firstName first name of user
     * @apiSuccess {String} lastName last name of user
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
    app.get('/v1/auth/landListOwner/:id', LandListOwnerCtrl.getOne);
    /**
     * @api {PUT} /v1/auth/account/:id Update One
     * @apiVersion 1.0.0
     * @apiName Update Account
     * @apiGroup Account
     * @apiPermission Super Admin, Admin, Update Yourself (Normal User), Greater Rights
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Update account information by super admin (head of department), admin (manager) and normal user (update yourself of staff)
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
    app.put('/v1/auth/landListOwner/:id', LandListOwnerCtrl.update);
    /**
     * @api {DELETE} /v1/auth/account/:id Delete One
     * @apiVersion 1.0.0
     * @apiName Delete An Account
     * @apiGroup Account
     * @apiPermission Super Admin, Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Delete account information by Super Admin (head of apartment) and Admin (manager)
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
    app.delete('/v1/auth/landListOwner/:id', LandListOwnerCtrl.delete);
    /**
     * @api {POST} /v1/login Login
     * @apiVersion 1.0.0
     * @apiName login
     * @apiGroup Account
     * @apiPermission Every one
     *
     * @apiDescription login and get access token
     *
     * @apiParam {string} loginName a int with length <= 10
     * @apiParam {String} passWord a string with 4 < length < 64
     *
     * @apiExample Example usage:
     * curl -i https://localhost:3001/v1/login
     *
     * @apiSuccess {object} data the user data with token
     * @apiSuccess {String} result ok or fail
     * @apiSuccess {String} message something from server
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data":{
     *          "token": "abc",
     *          "id":2,
     *          "loginName": "bioz",
     *          "displayName": "bioz",
     *          "email": ilovebioz@gmail.com
     *       },
     *       "result": "ok",
     *       "message":""
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "fail",
     *       "message": "invalid input"
     *     }
     */
}