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
        if (parseInt(data.zone_id) <= 0
            || Number.isNaN(parseInt(data.zone_id))) {
            return callback(1, 'invalid_zone_id', 400, 'zone id is incorrect format', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.land_direction,'string')
            || !Validator.isAlphanumeric(data.land_direction)
            || !Validator.isLength(data.land_direction, {min: 1, max: 128})) {
            return callback(2, 'invalid_land_direction', 400, 'land area direction is not alphanumeric and 4 - 128 characters', null);
        }

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

        if ( !Pieces.VariableBaseTypeChecking(data.building_area,'string')
            || !Validator.isAlphanumeric(data.building_area)
            || !Validator.isLength(data.building_area, {min: 1, max: 128})
            || parseFloat(data.building_area) < 0 || Number.isNaN(parseFloat(data.building_area))) {
            return callback(2, 'invalid_building_area', 400, 'building area is not numerical and greater than or equal 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.total_area,'string')
            || !Validator.isAlphanumeric(data.total_area)
            || !Validator.isLength(data.total_area, {min: 1, max: 128})
            || !parseFloat(data.total_area)>0) {
            return callback(2, 'invalid_total_area', 400, 'total area is not numerical and greater than 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(parseInt(data.progress), 'number')
            || !(parseInt(data.progress) >=0 && parseInt(data.progress) <=100)) {
            return callback(1, 'invalid_progress', 400, 'progress is incorrect format', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.number_of_wc,'string')
            || !Validator.isAlphanumeric(data.number_of_wc)
            || !Validator.isLength(data.number_of_wc, {min: 1, max: 128})
            || parseInt(data.number_of_wc) < 0 || Number.isNaN(parseInt(data.number_of_wc))) {
            return callback(2, 'invalid_number_of_wc', 400, 'number of wc is not numerical and greater than or equal 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.number_of_room,'string')
            || !Validator.isAlphanumeric(data.number_of_room)
            || !Validator.isLength(data.number_of_room, {min: 1, max: 128})
            || parseInt(data.number_of_room) < 0 || Number.isNaN(parseInt(data.number_of_room))) {
            return callback(2, 'invalid_number_of_room', 400, 'number of room is not numerical and greater than or equal 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.number_of_floor,'string')
            || !Validator.isAlphanumeric(data.number_of_floor)
            || !Validator.isLength(data.number_of_floor, {min: 1, max: 128})
            || parseInt(data.number_of_floor) < 0 || Number.isNaN(parseInt(data.number_of_room))) {
            return callback(2, 'invalid_number_of_floor', 400, 'number of floor is not numerical and greater than or equal 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.price,'string')
            || !Validator.isAlphanumeric(data.price)
            || !Validator.isLength(data.price, {min: 1, max: 128})
            || parseFloat(data.price) < 0 || Number.isNaN(parseInt(data.price))) {
            return callback(2, 'invalid_price', 400, 'price is not numerical and greater than or equal 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.desc,'string')
            || !Validator.isLength(data.desc, {min: 1, max: 256})) {
            return callback(2, 'invalid_desc', 400, 'desc is not 4 - 128 characters', null);
        }

        let queryObj = {};
        queryObj.zone_id = data.zone_id;
        queryObj.land_direction = data.land_direction;
        queryObj.lat = data.lat;
        queryObj.long = data.long;
        queryObj.building_area = data.building_area;
        queryObj.total_area = data.total_area;
        queryObj.progress = data.progress;
        queryObj.number_of_wc = data.number_of_wc;
        queryObj.number_of_room = data.number_of_room;
        queryObj.number_of_floor = data.number_of_floor;
        queryObj.price = data.price;
        queryObj.desc = queryObj.desc;

        if(data.buy_status === Constant.BUY_STATUS.NOT_BLOCK || data.buy_status === Constant.BUY_STATUS.DEAL || data.buy_status === Constant.BUY_STATUS.BLOCK) {
            queryObj.buy_status = data.buy_status;
        }else{
            queryObj.buy_status = Constant.BUY_STATUS.NOT_BLOCK;
        }

        if(data.owner === null || data.owner === undefined) {
            queryObj.owner = accessUserId;
        }else{
            queryObj.owner = data.owner;
        }

        if(data.is_front === Constant.IS_FRONT.YES || data.is_front === Constant.IS_FRONT.NO) {
            queryObj.is_front = data.is_front;
        }else{
            queryObj.is_front = Constant.IS_FRONT.NO;
        }

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