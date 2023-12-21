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
const Profile = Models.Profile;


exports.create = function (accessUserId, accessUserRight, accessUserName, data, callback) {
    try {

        if (parseInt(data.account_id) <= 0
            || Number.isNaN(parseInt(data.account_id))) {
            return callback(1, 'invalid_account_id', 400, 'account id is incorrect format', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.address,'string')
            || !Validator.isAlphanumeric(data.address)
            || !Validator.isLength(data.address, {min: 1, max: 128})) {
            return callback(2, 'invalid_address', 400, 'address is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.experience_year,'string')
            || !Validator.isAlphanumeric(data.experience_year)
            || !Validator.isLength(data.experience_year, {min: 1, max: 128})
            || parseInt(data.experience_year) < 0 || Number.isNaN(parseInt(data.experience_year))) {
            return callback(2, 'invalid_experience_year', 400, 'experience year is not numerical and greater than or equal 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.previous_position,'string')
            || !Validator.isAlphanumeric(data.previous_position)
            || !Validator.isLength(data.previous_position, {min: 0, max: 128})) {
            return callback(2, 'invalid_previous_position', 400, 'previous position is not alphanumeric and 4 - 128 characters', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.working_time,'string')
            || !Validator.isAlphanumeric(data.working_time)
            || !Validator.isLength(data.working_time, {min: 1, max: 128})
            || !parseInt(data.working_time)>0) {
            return callback(2, 'invalid_working_time', 400, 'working time is not numerical and greater than 0', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(data.salary,'string')
            || !Validator.isAlphanumeric(data.salary)
            || !Validator.isLength(data.salary, {min: 1, max: 128})
            || parseFloat(data.salary) < 0 || Number.isNaN(parseFloat(data.salary))) {
            return callback(2, 'invalid_salary', 400, 'salary is not numerical and greater than or equal 0', null);
        }




        let queryObj = {};
        queryObj.account_id = data.account_id;
        queryObj.address = data.address;
        queryObj.experience_year = data.experience_year;
        queryObj.previous_position = data.previous_position;
        queryObj.working_time = data.working_time;
        queryObj.salary = data.salary;

        if(data.role_job === Constant.PROFILE_ROLE_JOB.SALE ||data.role_job === Constant.PROFILE_ROLE_JOB.ANOTHER) {
            queryObj.role_job = data.role_job;
        }else{
            queryObj.role_job = Constant.PROFILE_ROLE_JOB.SALE;
        }

        if(data.position_job === Constant.PROFILE_POSITION_JOB.STAFF || data.position_job === Constant.PROFILE_POSITION_JOB.LEADER || data.position_job === Constant.PROFILE_POSITION_JOB.MANAGER) {
            queryObj.position_job = data.position_job;
        }else{
            queryObj.position_job = Constant.PROFILE_POSITION_JOB.STAFF;
        }

        queryObj.created_by = accessUserId;
        queryObj.updated_by = accessUserId;

        Profile.create(queryObj).then(Project=>{
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
        let attributes = ['id', 'account_id','address','role_job', 'position_job', 'experience_year', 'previous_position', 'working_time', 'salary', 'created_by', 'updated_by', 'created_at', 'updated_at'];

        where = {id: id};

        // if(accessUserId !== parseInt(id)) {
        //     where = {id: id, type: { $lt: accessUserType} };
        // }else{
        //     where = {id: id};
        // }

        console.log('where is this ', where);

        Profile.findOne({
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
        Profile.findAndCountAll({
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


exports.update = function (accessUserId, accessUserType, accessLoginName, profileId, updateData, callback) {
    try {
        let queryObj = {};
        let where = {};

        if ( !( Pieces.VariableBaseTypeChecking(profileId,'string')
                && Validator.isInt(profileId) )
            && !Pieces.VariableBaseTypeChecking(profileId,'number') ){
            return callback(1, 'invalid_user_id', 400, 'user id is incorrect', null);
        }

        // nếu mà người dùng không phải là chủ tài khoảng và người dùng cũng không phải là admin thì không cho vào
        // if ( accessUserId !== parseInt(userId) && accessUserType < Constant.USER_TYPE.MODERATOR ) {
        //     return callback(1, 'invalid_user_right', 403, null, null);
        // }

        queryObj.updater = accessUserId;

        where.id = profileId;

        if (!parseInt(updateData.account_id) <= 0
            && !Number.isNaN(parseInt(updateData.account_id))) {
            queryObj.account_id = updateData.account_id;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.address,'string')
            && Validator.isAlphanumeric(updateData.address)
            && Validator.isLength(updateData.address, {min: 1, max: 128})) {
            queryObj.address = updateData.address;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.experience_year,'string')
            && Validator.isAlphanumeric(updateData.experience_year)
            && Validator.isLength(updateData.experience_year, {min: 1, max: 128})
            && !parseInt(updateData.experience_year) < 0 && !Number.isNaN(parseInt(updateData.experience_year))) {
            queryObj.experience_year = updateData.experience_year;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.previous_position,'string')
            && Validator.isAlphanumeric(updateData.previous_position)
            && Validator.isLength(updateData.previous_position, {min: 0, max: 128})) {
            queryObj.previous_position = updateData.previous_position;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.working_time,'string')
            && Validator.isAlphanumeric(updateData.working_time)
            && Validator.isLength(updateData.working_time, {min: 1, max: 128})
            && parseInt(updateData.working_time)>0) {
            queryObj.working_time = updateData.working_time;
        }

        if ( Pieces.VariableBaseTypeChecking(updateData.salary,'string')
            && Validator.isAlphanumeric(updateData.salary)
            && Validator.isLength(updateData.salary, {min: 1, max: 128})
            && !parseFloat(updateData.salary) < 0 && !Number.isNaN(parseFloat(updateData.salary))) {
            queryObj.salary = updateData.salary;
        }

        queryObj.updated_at = new Date();

        Profile.update(
            queryObj,
            {where: where}).then(result=>{
            "use strict";
            if( (result !== null) && (result.length > 0) && (result[0] > 0) ){
                return callback(null, null, 200, null, profileId);
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

        Profile.findOne({where:where}).then(account=>{
            "use strict";
            if ( account && account.deleted === Constant.DELETED.YES ){
                Profile.destroy({where: where}).then(result => {
                    return callback(null, null, 200, null);
                }).catch(function(error){
                    return callback(1, 'remove_account_fail', 420, error);
                });
            }else {
                Profile.update(queryObj, {where: where}).then(result=>{
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
