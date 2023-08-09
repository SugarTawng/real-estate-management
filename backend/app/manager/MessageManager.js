/**
 * Created by bioz on 1/13/2017.
 */
// third party components
const Validator = require('validator');
const JsonWebToken = require('jsonwebtoken');

// our components
const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');
const Config = require('../config/Global');
const Message = require('../models/Message');
const {NULL} = require("mysql/lib/protocol/constants/types");

exports.create = function (accessUserId, accessUserRight, accessUserName, data, callback) {
    try {

        if ( !Pieces.VariableBaseTypeChecking(data.title,'string')
            || !Validator.isLength(data.title, {min: 1, max: 256})) {
            return callback(2, 'invalid_title', 400, 'title is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.content,'string')
            || !Validator.isLength(data.content, {min: 1, max: 4068})) {
            return callback(2, 'invalid_content', 400, 'content is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.keyword,'string')
            || !Validator.isLength(data.keyword, {min: 1, max: 256})) {
            return callback(2, 'invalid_keyword', 400, 'keyword is not alphanumeric and 4 - 128 characters', null);
        }



        let queryObj = {};
        queryObj.title = data.title;
        queryObj.content = data.content;
        queryObj.keyword = data.keyword;
        queryObj.created_by = accessUserId;
        queryObj.updated_by = accessUserId;

        Message.create(queryObj).then(Project=>{
            "use strict";
            return callback(null, null, 200, null, Project);
        }).catch(function(error){
            "use strict";
            console.log('HIHIHI TUI DA O DAY', error)
            return callback(2, 'create_Project_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'create_Project_fail', 400, error, null);
    }
};