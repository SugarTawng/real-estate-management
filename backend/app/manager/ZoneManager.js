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
const {NULL} = require("mysql/lib/protocol/constants/types");

exports.create = function (accessUserId, accessUserRight, accessUserName, data, callback) {
    try {
        const project_id = parseInt(data.project_id);

        if ( !Pieces.VariableBaseTypeChecking(project_id, 'number')
            || project_id < 0) {
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

        const construction_area = parseFloat(data.construction_area);
        const total_area = parseFloat(data.total_area);
        const number_of_block = parseInt(data.number_of_block);
        const number_of_unit_land = parseInt(data.number_of_unit_land);
        const progress = parseInt(data.progress);

        console.log('abc',typeof (parseFloat('a')));

        if ( !Pieces.VariableBaseTypeChecking(data.construction_area,'string')
            || !Validator.isAlphanumeric(data.construction_area)
            || !Validator.isLength(data.construction_area, {min: 1, max: 128})
            || !parseFloat(data.construction_area)>0) {
            return callback(2, 'invalid_construction_area', 400, 'total area is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(parseFloat(total_area),'string')
            || !Validator.isAlphanumeric(data.total_area)
            || !Validator.isLength(data.total_area, {min: 1, max: 128})) {
            return callback(2, 'invalid_total_area', 400, 'total area is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(parseInt(data.number_of_block),'number')
            || !Validator.isAlphanumeric(data.number_of_block)
            || !Validator.isLength(data.number_of_block, {min: 1, max: 128})) {
            return callback(2, 'invalid_number_of_block', 400, 'number of block is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(parseInt(data.number_of_unit_land),'number')
            || !Validator.isAlphanumeric(data.number_of_unit_land)
            || !Validator.isLength(data.number_of_unit_land, {min: 1, max: 128})) {
            return callback(2, 'invalid_number_of_unit_land', 400, 'number of unit land is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(progress, 'number')
            || !(progress >=0 && progress <=100)) {
            return callback(1, 'invalid_progress', 400, 'progress is incorrect format', null);
        }



        let queryObj = {};
        queryObj.project_id = project_id;
        queryObj.name = data.name;
        queryObj.desc = data.desc;
        queryObj.construction_area = construction_area;
        queryObj.total_area = total_area;
        queryObj.number_of_block = number_of_block;
        queryObj.number_of_unit_land = number_of_unit_land;
        queryObj.progress = progress;
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