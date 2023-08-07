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
const LandArea = require('../models/LandArea');
const {NULL} = require("mysql/lib/protocol/constants/types");

exports.create = function (accessUserId, accessUserRight, accessUserName, data, callback) {
    try {

        if (parseInt(data.project_id) <= 0
            || Number.isNaN(parseInt(data.project_id))) {
            return callback(1, 'invalid_project_id', 400, 'project id is incorrect format', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.name,'string')
            || !Validator.isAlphanumeric(data.name)
            || !Validator.isLength(data.name, {min: 1, max: 128})) {
            return callback(2, 'invalid_project_name', 400, 'name is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.desc,'string') && data.desc === NULL
            || !Validator.isLength(data.desc, {min: 0, max: 256})) {
            return callback(2, 'invalid_desc', 400, 'desc is not 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.construction_area,'string')
            || !Validator.isAlphanumeric(data.construction_area)
            || !Validator.isLength(data.construction_area, {min: 1, max: 128})
            || !parseFloat(data.construction_area)>0) {
            return callback(2, 'invalid_construction_area', 400, 'construction area not numerical and greater than 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.total_area,'string')
            || !Validator.isAlphanumeric(data.total_area)
            || !Validator.isLength(data.total_area, {min: 1, max: 128})
            || !parseFloat(data.total_area)>0) {
            return callback(2, 'invalid_total_area', 400, 'total area is not numerical and greater than 0', null);
        }

        console.log('chet tiec', );

        if ( !Pieces.VariableBaseTypeChecking(data.number_of_block,'string')
            || !Validator.isAlphanumeric(data.number_of_block)
            || !Validator.isLength(data.number_of_block, {min: 1, max: 128})
            || parseInt(data.number_of_block) < 0 || Number.isNaN(parseInt(data.number_of_block))) {
            return callback(2, 'invalid_number_of_block', 400, 'number of block is not numerical and greater than or equal 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.number_of_unit_land,'string')
            || !Validator.isAlphanumeric(data.number_of_unit_land)
            || !Validator.isLength(data.number_of_unit_land, {min: 1, max: 128})
            || parseInt(data.number_of_unit_land) < 0 || Number.isNaN(parseInt(data.number_of_unit_land))) {
            return callback(2, 'invalid_number_of_unit_land', 400, 'number of unit land is not numerical and greater than or equal 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(parseInt(data.progress), 'number')
            || !(parseInt(data.progress) >=0 && parseInt(data.progress) <=100)) {
            return callback(1, 'invalid_progress', 400, 'progress is incorrect format', null);
        }



        let queryObj = {};
        queryObj.project_id = data.project_id;
        queryObj.name = data.name;
        queryObj.desc = data.desc;
        queryObj.construction_area = data.construction_area;
        queryObj.total_area = data.total_area;
        queryObj.number_of_block = data.number_of_block;
        queryObj.number_of_unit_land = data.number_of_unit_land;
        queryObj.progress = data.progress;
        queryObj.created_by = accessUserId;
        queryObj.updated_by = accessUserId;

        LandArea.create(queryObj).then(Project=>{
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