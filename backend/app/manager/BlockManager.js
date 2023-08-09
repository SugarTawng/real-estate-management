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
const Block = require('../models/Block');
const {NULL} = require("mysql/lib/protocol/constants/types");

exports.create = function (accessUserId, accessUserRight, accessUserName, data, callback) {
    try {

        if (parseInt(data.zone_id) <= 0
            || Number.isNaN(parseInt(data.zone_id))) {
            return callback(1, 'invalid_zone_id', 400, 'zone id is incorrect format', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.number_of_floor,'string')
            || !Validator.isAlphanumeric(data.number_of_floor)
            || !Validator.isLength(data.number_of_floor, {min: 1, max: 128})
            || !parseInt(data.number_of_floor)>0) {
            return callback(2, 'invalid_number_of_floor', 400, 'number of floor is not numerical and greater than 0', null);
        }

        console.log('lat ',Number.isNaN(parseFloat(data.lat)))

        if ( !Pieces.VariableBaseTypeChecking(data.lat,'string')
            || !Validator.isLength(data.lat, {min: 1, max: 128})
            || !(parseFloat(data.lat)>=-90 && parseFloat(data.lat)<=90)
            || Number.isNaN(parseFloat(data.lat))){
            return callback(2, 'invalid_lat', 400, 'lat is not numerical and greater than 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.long,'string')
            || !Validator.isLength(data.long, {min: 1, max: 128})
            || !(parseFloat(data.long)>=-180 && parseFloat(data.long)<=180)
            || Number.isNaN(parseFloat(data.long))){
            return callback(2, 'invalid_long', 400, 'long is not numerical and greater than 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.desc,'string')
            || !Validator.isLength(data.desc, {min: 1, max: 256})) {
            return callback(2, 'invalid_desc', 400, 'desc is not 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(parseInt(data.progress), 'number')
            || !(parseInt(data.progress) >=0 && parseInt(data.progress) <=100)) {
            return callback(1, 'invalid_progress', 400, 'progress is incorrect format', null);
        }

        let queryObj = {};
        queryObj.zone_id = data.zone_id;
        queryObj.number_of_floor = data.number_of_floor;
        queryObj.lat = data.lat;
        queryObj.long = data.long;
        queryObj.desc = data.desc;
        queryObj.progress = data.progress;

        if(data.type === Constant.BLOCK_TYPE.NORMAL || data.type === Constant.BLOCK_TYPE.LUXURY){
            queryObj.type = data.type;
        }else{
            queryObj.type = Constant.BLOCK_TYPE.NORMAL;
        }

        if(data.is_service === Constant.ACTIVATED.YES || data.is_service === Constant.ACTIVATED.NO){
            queryObj.is_service = data.is_service;
        }else{
            queryObj.is_service = Constant.ACTIVATED.YES;
        }

        queryObj.created_by = accessUserId;
        queryObj.updated_by = accessUserId;

        Block.create(queryObj).then(Project=>{
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