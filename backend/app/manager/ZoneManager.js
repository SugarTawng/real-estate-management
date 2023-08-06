/**
 * Created by bioz on 1/13/2017.
 */
// third party components
const Validator = require('validator');
const JsonWebToken = require('jsonwebtoken');

// our components
const Constant = require('../utils/Constant');
// const Project = require('../models/Project');
const Pieces = require('../utils/Pieces');
const Config = require('../config/Global');
const Zone = require('../models/Zone');

exports.create = function (accessUserId, accessUserRight, accessUserName, data, callback) {
    try {
        if ( !Pieces.VariableBaseTypeChecking(data.name,'string')
            || !Validator.isAlphanumeric(data.name)
            || !Validator.isLength(data.name, {min: 0, max: 128})) {
            return callback(2, 'invalid_project_name', 400, 'name is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.address,'string')
            || !Validator.isAlphanumeric(data.address)
            || !Validator.isLength(data.address, {min: 0, max: 256})) {
            return callback(2, 'invalid_project_name', 400, 'address is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.phone,'string')
            || !Validator.isAlphanumeric(data.phone)
            || !Validator.isLength(data.phone, {min: 0, max: 12})) {
            return callback(2, 'invalid_project_name', 400, 'name is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.email, 'string')
            || !Validator.isEmail(data.email) ) {
            return callback(1, 'invalid_user_email', 400, 'email is incorrect format', null);
        }
        const project_progress = parseInt(data.project_progress);
        // console.log('validator abc  ',!Validator.isLength(project_progress, {min: 0, max: 3}));
        // console.log('hihihi', !Pieces.VariableBaseTypeChecking(project_progress, 'Number'));

        if ( !Pieces.VariableBaseTypeChecking(project_progress, 'number')
            || !(project_progress >=0 && project_progress <=100)) {
            return callback(1, 'invalid_project_progress_email', 400, 'project progress is incorrect format', null);
        }

        let queryObj = {};
        queryObj.name = data.name;
        queryObj.address = data.address;
        queryObj.phone = data.phone;
        queryObj.email = data.email;
        queryObj.project_progress = data.project_progress;

        if(data.activated === Constant.ACTIVATED.YES || data.activated === Constant.ACTIVATED.NO){
            queryObj.activated = data.activated;
        }else{
            queryObj.activated = Constant.ACTIVATED.YES;
        }

        queryObj.created_by = accessUserId;
        queryObj.updated_by = accessUserId;


        Zone.create(queryObj).then(Project=>{
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