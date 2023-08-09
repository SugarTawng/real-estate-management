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
const Floor = require('../models/Floor');
const {NULL} = require("mysql/lib/protocol/constants/types");

exports.create = function (accessUserId, accessUserRight, accessUserName, data, callback) {
    try {

        if (parseInt(data.block_id) <= 0
            || Number.isNaN(parseInt(data.block_id))) {
            return callback(1, 'invalid_block_id', 400, 'block id is incorrect format', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.number_of_high_area,'string')
            || !Validator.isAlphanumeric(data.number_of_high_area)
            || !Validator.isLength(data.number_of_high_area, {min: 1, max: 128})
            || !parseInt(data.number_of_high_area)>0) {
            return callback(2, 'invalid_number_of_room', 400, 'number of room is not numerical and greater than 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.public_area,'string')
            || !Validator.isAlphanumeric(data.public_area)
            || !Validator.isLength(data.public_area, {min: 1, max: 128})
            || !parseFloat(data.public_area)>0) {
            return callback(2, 'invalid_public_area', 400, 'public area not numerical and greater than 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.total_area,'string')
            || !Validator.isAlphanumeric(data.total_area)
            || !Validator.isLength(data.total_area, {min: 1, max: 128})
            || !parseFloat(data.total_area)>0) {
            return callback(2, 'invalid_total_area', 400, 'total area not numerical and greater than 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(parseInt(data.progress), 'number')
            || !(parseInt(data.progress) >=0 && parseInt(data.progress) <=100)) {
            return callback(1, 'invalid_progress', 400, 'progress is incorrect format', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.desc,'string')
            || !Validator.isLength(data.desc, {min: 1, max: 256})) {
            return callback(2, 'invalid_desc', 400, 'desc is not 4 - 128 characters', null);
        }

        let queryObj = {};
        queryObj.block_id = data.block_id;
        queryObj.number_of_high_area = data.number_of_high_area;
        queryObj.public_area = data.public_area;
        queryObj.total_area = data.total_area;
        queryObj.desc = data.desc;
        queryObj.progress = data.progress;
        queryObj.created_by = accessUserId;
        queryObj.updated_by = accessUserId;

        Floor.create(queryObj).then(Project=>{
            "use strict";
            return callback(null, null, 200, null, Project);
        }).catch(function(error){
            "use strict";

            return callback(2, 'create_Project_fail', 400, error, null);
        });
    }catch(error){
        console.log('HIHIHI TUI DA O DAY', error)
        return callback(1, 'create_Project_fail', 400, error, null);

    }
};