/**
 * Created by bioz on 1/13/2017.
 */
// third party components
const Validator = require('validator');
const JsonWebToken = require('jsonwebtoken');

// our components
const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');
const Models = require("../models");
const HighArea = Models.HighArea;



exports.create = function (accessUserId, accessUserRight, accessUserName, data, callback) {
    try {
        if (parseInt(data.floor_id) <= 0
            || Number.isNaN(parseInt(data.floor_id))) {
            return callback(1, 'invalid_floor_id', 400, 'floor id is incorrect format', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.high_area_direction,'string')
            || !Validator.isLength(data.high_area_direction, {min: 1, max: 128})) {
            return callback(2, 'invalid_high_area_direction', 400, 'high area direction is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !(parseFloat(data.lat)>=-90 && parseFloat(data.lat)<=90)
            || Number.isNaN(parseFloat(data.lat))){
            return callback(2, 'invalid_lat', 400, 'lat is not numerical and greater than 0', null);
        }

        if ( !(parseFloat(data.long)>=-180 && parseFloat(data.long)<=180)
            || Number.isNaN(parseFloat(data.long))){
            return callback(2, 'invalid_long', 400, 'long is not numerical and greater than 0', null);
        }

        if ( !parseFloat(data.total_area)>0
            || Number.isNaN(parseFloat(data.total_area))){
            return callback(2, 'invalid_total_area', 400, 'total area is not numerical and greater than 0', null);
        }

        if ( !(parseInt(data.progress) >=0 && parseInt(data.progress) <=100)) {
            return callback(1, 'invalid_progress', 400, 'progress is incorrect format', null);
        }

        if ( parseInt(data.number_of_wc) < 0 || Number.isNaN(parseInt(data.number_of_wc))) {
            return callback(2, 'invalid_number_of_wc', 400, 'number of wc is not numerical and greater than or equal 0', null);
        }

        if ( parseInt(data.number_of_room) < 0 || Number.isNaN(parseInt(data.number_of_room))) {
            return callback(2, 'invalid_number_of_room', 400, 'number of room is not numerical and greater than or equal 0', null);
        }

        if ( parseFloat(data.price) < 0 || Number.isNaN(parseInt(data.price))) {
            return callback(2, 'invalid_price', 400, 'price is not numerical and greater than or equal 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.desc,'string')
            || !Validator.isLength(data.desc, {min: 1, max: 256})) {
            return callback(2, 'invalid_desc', 400, 'desc is not 4 - 128 characters', null);
        }

        let queryObj = {};
        queryObj.floor_id = data.floor_id;
        queryObj.high_area_direction = data.high_area_direction;
        queryObj.lat = data.lat;
        queryObj.long = data.long;
        queryObj.total_area = data.total_area;
        queryObj.progress = data.progress;
        queryObj.number_of_wc = data.number_of_wc;
        queryObj.number_of_room = data.number_of_room;
        queryObj.price = data.price;
        queryObj.desc = data.desc;

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

        queryObj.created_by = accessUserId;
        queryObj.updated_by = accessUserId;

        HighArea.create(queryObj).then(Project=>{
            "use strict";
            return callback(null, null, 200, null, Project);
        }).catch(function(error){
            "use strict";
            return callback(2, 'create_Project_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'create_Project_fail', 400, error, null);
    }
};

exports.getOne = function(accessUserId, accessUserType, id, callback) {
    try {
        // console.log('hi, tui da o day :=', id);
        if ( !( Pieces.VariableBaseTypeChecking(id,'string') && Validator.isInt(id) )
            && !Pieces.VariableBaseTypeChecking(id,'number') ){
            return callback(1, 'invalid_user_id', 400, 'user id is incorrect', null);
        }

        // if ( (accessUserId !== id) && (accessUserType < Constant.USER_TYPE.MODERATOR) ) {
        //     return callback(1, 'invalid_user_type', 403, null, null);
        // }


        let where = {};
        let attributes = ['id', 'floor_id','lat','long', 'high_area_direction', 'total_area', 'progress', 'number_of_wc', 'number_of_room', 'price', 'owner', 'buy_status', 'desc', 'created_by', 'updated_by', 'created_at', 'updated_at'];

        where = {id: id};

        // if(accessUserId !== parseInt(id)) {
        //     where = {id: id, type: { $lt: accessUserType} };
        // }else{
        //     where = {id: id};
        // }

        console.log('where is this ', where);

        HighArea.findOne({
            where: where,
            attributes: attributes
        }).then(result=>{
            "use strict";
            if(result){
                return callback(null, null, 200, null, result);
            }else{
                return callback(1, 'invalid_account', 403, null, null);
            }
        });
    }catch(error){
        return callback(1, 'get_one_account_fail', 400, error, null);
    }
}

exports.getAll = function (accessUserId, accessUserType, accessUserName, queryContent, callback) {
    try {
        let where = {};
        let page = 1;
        let perPage = Constant.DEFAULT_PAGING_SIZE;
        let sort = [];
        //let attributes = [];


        // if(accessUserType <= Constant.USER_TYPE.){
        //     where.createdBy = accessUserId;
        //     where.deleted = { $ne: Constant.DELETED.YES };
        // }

        this.parseFilter(accessUserId, accessUserType, where, queryContent.filter);
        if (Pieces.VariableBaseTypeChecking(queryContent.q, 'string')) {
            where.name = {[Sequelize.Op.like]: queryContent.q};
        }

        if ((Pieces.VariableBaseTypeChecking(queryContent['page'], 'string') && Validator.isInt(queryContent['page']))
            || (Pieces.VariableBaseTypeChecking(queryContent['page'], 'number'))) {
            page = parseInt(queryContent['page']);
            if (page === 0) {
                page = 1;
            }
        }

        if ((Pieces.VariableBaseTypeChecking(queryContent['perPage'], 'string') && Validator.isInt(queryContent['perPage']))
            || (Pieces.VariableBaseTypeChecking(queryContent['perPage'], 'number'))) {
            perPage = parseInt(queryContent['perPage']);
            if (perPage <= 0) {
                perPage = Constant.DEFAULT_PAGING_SIZE;
            }
        }

        Pieces.splitAndAssignValueForSort(sort, queryContent['sort']);
        if (sort.length <= 0) {
            sort.push(['updated_at', 'DESC']);
        }

        let offset = perPage * (page - 1);
        HighArea.findAndCountAll({
            where: where,
            //attributes: ['id', 'first_name', 'last_name', 'date_of_birth'],
            limit: perPage,
            offset: offset,
            order: sort
        }).then((data) => {
            let pages = Math.ceil(data.count / perPage);
            let Projects = data.rows;
            let output = {
                data: Projects,
                pages: {
                    current: page,
                    prev: page - 1,
                    hasPrev: false,
                    next: (page + 1) > pages ? 0 : (page + 1),
                    hasNext: false,
                    total: pages
                },
                items: {
                    begin: ((page * perPage) - perPage) + 1,
                    end: page * perPage,
                    total: data.count
                }
            };
            output.pages.hasNext = (output.pages.next !== 0);
            output.pages.hasPrev = (output.pages.prev !== 0);
            return callback(null, null, 200, null, output);
        }).catch(function (error) {
            return callback(2, 'find_count_all_Project_fail', 400, error, null);
        });
    } catch (error) {
        console.log('this is the error', error);
        return callback(2, 'get_all_Project_fail', 400, error, null);
    }
};


exports.update = function (accessUserId, accessUserType, accessLoginName, highAreaId, updateData, callback) {
    try {
        let queryObj = {};
        let where = {};

        if ( !( Pieces.VariableBaseTypeChecking(highAreaId,'string')
                && Validator.isInt(highAreaId) )
            && !Pieces.VariableBaseTypeChecking(highAreaId,'number') ){
            return callback(1, 'invalid_user_id', 400, 'user id is incorrect', null);
        }

        // nếu mà người dùng không phải là chủ tài khoảng và người dùng cũng không phải là admin thì không cho vào
        // if ( accessUserId !== parseInt(userId) && accessUserType < Constant.USER_TYPE.MODERATOR ) {
        //     return callback(1, 'invalid_user_right', 403, null, null);
        // }

        queryObj.updater = accessUserId;

        where.id = highAreaId;

        if (!parseInt(updateData.floor_id) <= 0
            && !Number.isNaN(parseInt(updateData.floor_id))) {
            queryObj.floor_id = updateData.floor_id;
        }

        if (!parseInt(updateData.payment_method_id) <= 0
            && !Number.isNaN(parseInt(updateData.payment_method_id))) {
            queryObj.payment_method_id = updateData.payment_method_id;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.high_area_direction,'string')
            && Validator.isAlphanumeric(updateData.high_area_direction)
            && Validator.isLength(updateData.high_area_direction, {min: 1, max: 128})) {
            queryObj.high_area_direction = updateData.high_area_direction;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.lat,'string')
            && Validator.isLength(updateData.lat, {min: 1, max: 128})
            && (parseFloat(updateData.lat)>=-90 && parseFloat(updateData.lat)<=90)
            &&  Number.isNaN(parseFloat(updateData.lat))){
            queryObj.lat = updateData.lat;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.long,'string')
            && Validator.isLength(updateData.long, {min: 1, max: 128})
            && (parseFloat(updateData.long)>=-180 && parseFloat(updateData.long)<=180)
            && Number.isNaN(parseFloat(updateData.long))){
            queryObj.long = updateData.long;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.total_area,'string')
            && Validator.isAlphanumeric(updateData.total_area)
            && Validator.isLength(updateData.total_area, {min: 1, max: 128})
            && parseFloat(updateData.total_area)>0) {
            queryObj.total_area = updateData.total_area;
        }

        if ( Pieces.VariableBaseTypeChecking(parseInt(updateData.progress), 'number')
            && (parseInt(updateData.progress) >=0 && parseInt(updateData.progress) <=100)) {
            queryObj.progress = updateData.progress;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.number_of_wc,'string')
            && Validator.isAlphanumeric(updateData.number_of_wc)
            && Validator.isLength(updateData.number_of_wc, {min: 1, max: 128})
            && !parseInt(updateData.number_of_wc) < 0 && !Number.isNaN(parseInt(updateData.number_of_wc))) {
            queryObj.number_of_wc = updateData.number_of_wc;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.number_of_room,'string')
            && Validator.isAlphanumeric(updateData.number_of_room)
            && Validator.isLength(updateData.number_of_room, {min: 1, max: 128})
            && !parseInt(updateData.number_of_room) < 0 && !Number.isNaN(parseInt(updateData.number_of_room))) {
            queryObj.number_of_room = updateData.number_of_room;
        }

        if (!Number.isNaN(parseInt(updateData.price))) {
            queryObj.price = updateData.price;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.desc,'string')
            && Validator.isLength(updateData.desc, {min: 1, max: 256})) {
            queryObj.desc = updateData.desc;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.buy_status,'string')
            && Validator.isLength(updateData.buy_status, {min: 1, max: 256})) {
            queryObj.buy_status = updateData.buy_status;
        }
        // chua set cac thuoc tinh mac dinh

        queryObj.updated_at = new Date();

        HighArea.update(
            queryObj,
            {where: where}).then(result=>{
            "use strict";
            if( (result !== null) && (result.length > 0) && (result[0] > 0) ){
                return callback(null, null, 200, null, highAreaId);
            }else{
                return callback(1, 'update_user_fail', 400, '', null);
            }
        }).catch(function(error){
            "use strict";
            return callback(1, 'update_user_fail', 420, error, null);
        });
    }catch(error){
        return callback(1, 'update_user_fail', 400, error, null);
    }
}



exports.delete = function(accessUserId, accessUserType, id, callback) {
    try {
        let queryObj = {};
        let where = {};

        if ( !( Pieces.VariableBaseTypeChecking(id,'string') && Validator.isInt(id) )
            && !Pieces.VariableBaseTypeChecking(id,'number') ){
            return callback(1, 'invalid_user_id', 400, 'user id is incorrect', null);
        }

        // if ( accessUserType < Constant.USER_TYPE.MODERATOR ) {
        //     return callback(1, 'invalid_user_right', 403, null);
        // }

        where = { id: id}; // , type:{$lt: accessUserType}, system: Constant.SYSTEM.NO
        queryObj = { deleted: Constant.DELETED.YES };

        HighArea.findOne({where:where}).then(account=>{
            "use strict";
            if ( account && account.deleted === Constant.DELETED.YES ){
                HighArea.destroy({where: where}).then(result => {
                    return callback(null, null, 200, null);
                }).catch(function(error){
                    return callback(1, 'remove_account_fail', 420, error);
                });
            }else {
                HighArea.update(queryObj, {where: where}).then(result=>{
                    "use strict";
                    return callback(null, null, 200, null);
                }).catch(function(error){
                    return callback(1, 'update_account_fail', 420, error);
                })
            }
        }).catch(function(error){
            "use strict";
            return callback(1, 'find_one_account_fail', 400, error, null);
        });
    }catch(error){
        return callback(1, 'delete_account_fail', 400, error);
    }
}

// --------- others ----------
exports.parseFilter = function (accessUserId, accessUserRight, condition, filters) {
    try {
        if ( !Pieces.VariableBaseTypeChecking(filters,'string')
            || !Validator.isJSON(filters) ) {
            return false;
        }

        let aDataFilter = Pieces.safelyParseJSON1(filters);
        if( aDataFilter && (aDataFilter.length > 0) ){
            for(let i = 0; i < aDataFilter.length; i++ ){
                if ( !Pieces.VariableBaseTypeChecking(aDataFilter[i].key, 'string')
                    || !Pieces.VariableBaseTypeChecking(aDataFilter[i].operator, 'string')
                    || aDataFilter[i].value === null
                    || aDataFilter[i].value === undefined ){
                    continue;
                }

                if ( aDataFilter[i].key === 'deleted'
                    && ( (aDataFilter[i].operator === '=') || (aDataFilter[i].operator === '!=') )
                    && (aDataFilter[i].value === Constant.DELETED.YES || aDataFilter[i].value === Constant.DELETED.NO) ) {
                    switch(aDataFilter[i].operator){
                        case '=':
                            condition[aDataFilter[i].key] = aDataFilter[i].value;
                            break;
                        case '!=':
                            condition[aDataFilter[i].key] = {$ne: aDataFilter[i].value};
                            break;
                    }
                    continue;
                }

                if ( aDataFilter[i].key === 'owner'
                    && aDataFilter[i].operator === '='
                    && aDataFilter[i].value === 'mine' ){
                    condition['createdBy'] = accessUserId;
                    continue;
                }

                if ( aDataFilter[i].key === 'createdAt'
                    && ( (aDataFilter[i].operator === '=') || (aDataFilter[i].operator === '!=')
                        || (aDataFilter[i].operator === '<') || (aDataFilter[i].operator === '>')
                        || (aDataFilter[i].operator === '<=') || (aDataFilter[i].operator === '>=')
                        || (aDataFilter[i].operator === 'in'))
                ) {
                    if( aDataFilter[i].operator !== 'in'
                        && Pieces.VariableBaseTypeChecking(aDataFilter[i].value, 'string')
                        && Validator.isISO8601(aDataFilter[i].value) ){
                        switch(aDataFilter[i].operator){
                            case '=':
                                condition[aDataFilter[i].key] = {$eq: aDataFilter[i].value};
                                break;
                            case '!=':
                                condition[aDataFilter[i].key] = {$ne: aDataFilter[i].value};
                                break;
                            case '>':
                                condition[aDataFilter[i].key] = {$gt: aDataFilter[i].value};
                                break;
                            case '>=':
                                condition[aDataFilter[i].key] = {$gte: aDataFilter[i].value};
                                break;
                            case '<':
                                condition[aDataFilter[i].key] = {$lt: aDataFilter[i].value};
                                break;
                            case '<=':
                                condition[aDataFilter[i].key] = {$lte: aDataFilter[i].value};
                                break;
                        }
                    }else if(aDataFilter[i].operator === 'in'){
                        if(aDataFilter[i].value.length === 2
                            && Pieces.VariableBaseTypeChecking(aDataFilter[i].value[0], 'string')
                            && Pieces.VariableBaseTypeChecking(aDataFilter[i].value[1], 'string')
                            && Validator.isISO8601(aDataFilter[i].value[0])
                            && Validator.isISO8601(aDataFilter[i].value[1]) ){
                            condition[aDataFilter[i].key] = { $gte: aDataFilter[i].value[0], $lte: aDataFilter[i].value[1] };
                        }
                    }
                    continue;
                }

                if ( aDataFilter[i].key === 'updated_at'
                    && ( (aDataFilter[i].operator === '=') || (aDataFilter[i].operator === '!=')
                        || (aDataFilter[i].operator === '<') || (aDataFilter[i].operator === '>')
                        || (aDataFilter[i].operator === '<=') || (aDataFilter[i].operator === '>=')
                        || (aDataFilter[i].operator === 'in') )
                ) {
                    if( aDataFilter[i].operator !== 'in'
                        && Pieces.VariableBaseTypeChecking(aDataFilter[i].value, 'string')
                        && Validator.isISO8601(aDataFilter[i].value) ){
                        switch(aDataFilter[i].operator){
                            case '=':
                                condition[aDataFilter[i].key] = {$eq: aDataFilter[i].value};
                                break;
                            case '!=':
                                condition[aDataFilter[i].key] = {$ne: aDataFilter[i].value};
                                break;
                            case '>':
                                condition[aDataFilter[i].key] = {$gt: aDataFilter[i].value};
                                break;
                            case '>=':
                                condition[aDataFilter[i].key] = {$gte: aDataFilter[i].value};
                                break;
                            case '<':
                                condition[aDataFilter[i].key] = {$lt: aDataFilter[i].value};
                                break;
                            case '<=':
                                condition[aDataFilter[i].key] = {$lte: aDataFilter[i].value};
                                break;
                        }
                    }else if(aDataFilter[i].operator === 'in'){
                        if(aDataFilter[i].value.length === 2
                            && Pieces.VariableBaseTypeChecking(aDataFilter[i].value[0], 'string')
                            && Pieces.VariableBaseTypeChecking(aDataFilter[i].value[1], 'string')
                            && Validator.isISO8601(aDataFilter[i].value[0])
                            && Validator.isISO8601(aDataFilter[i].value[1]) ){
                            condition[aDataFilter[i].key] = { $gte: aDataFilter[i].value[0], $lte: aDataFilter[i].value[1] };
                        }
                    }
                }
            }
        }else{
            return false;
        }
    }catch (error){
        return false;
    }
};
