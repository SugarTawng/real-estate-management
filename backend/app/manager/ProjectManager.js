/**
 * Created by bioz on 1/13/2017.
 */
// third party components
const Validator = require("validator");
const JsonWebToken = require("jsonwebtoken");

// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");
const Models = require("../models");
const Project = Models.Project;

exports.create = function (
  accessUserId,
  accessUserRight,
  accessUserName,
  data,
  callback
) {
  try {
    if (
      !Pieces.VariableBaseTypeChecking(data.name, "string") ||
      !Validator.isLength(data.name, { min: 0, max: 128 })
    ) {
      return callback(
        2,
        "invalid_project_name",
        400,
        "name is not alphanumeric and 4 - 128 characters",
        null
      );
    }

    if (
      !Pieces.VariableBaseTypeChecking(data.address, "string") ||
      !Validator.isLength(data.address, { min: 0, max: 256 })
    ) {
      return callback(
        2,
        "invalid_project_name",
        400,
        "address is not alphanumeric and 4 - 128 characters",
        null
      );
    }

    if (
      !Pieces.VariableBaseTypeChecking(data.phone, "string") ||
      !Validator.isAlphanumeric(data.phone) ||
      !Validator.isLength(data.phone, { min: 0, max: 12 })
    ) {
      return callback(
        2,
        "invalid_project_name",
        400,
        "name is not alphanumeric and 4 - 128 characters",
        null
      );
    }

    if (
      !Pieces.VariableBaseTypeChecking(data.email, "string") ||
      !Validator.isEmail(data.email)
    ) {
      return callback(
        1,
        "invalid_user_email",
        400,
        "email is incorrect format",
        null
      );
    }
    const project_progress = parseInt(data.project_progress);

    if (
      !Pieces.VariableBaseTypeChecking(project_progress, "number") ||
      !(project_progress >= 0 && project_progress <= 100)
    ) {
      return callback(
        1,
        "invalid_project_progress_email",
        400,
        "project progress is incorrect format",
        null
      );
    }

    let queryObj = {};
    queryObj.name = data.name;
    queryObj.address = data.address;
    queryObj.phone = data.phone;
    queryObj.email = data.email;
    queryObj.project_progress = data.project_progress;
    queryObj.budget = data.budget;
    queryObj.status = data.status;

    if (
      data.activated === Constant.ACTIVATED.YES ||
      data.activated === Constant.ACTIVATED.NO
    ) {
      queryObj.activated = data.activated;
    } else {
      queryObj.activated = Constant.ACTIVATED.YES;
    }

    queryObj.created_by = accessUserId;
    queryObj.updated_by = accessUserId;

    Project.create(queryObj)
      .then((Project) => {
        "use strict";
        return callback(null, null, 200, null, Project);
      })
      .catch(function (error) {
        "use strict";
        console.log("HIHIHI TUI DA O DAY", error);
        return callback(2, "create_Project_fail", 400, error, null);
      });
  } catch (error) {
    return callback(2, "create_Project_fail", 400, error, null);
  }
};



exports.getOne = function (accessUserId, accessUserType, id, callback) {
  try {
    // console.log('hi, tui da o day :=', id);
    if (
      !(Pieces.VariableBaseTypeChecking(id, "string") && Validator.isInt(id)) &&
      !Pieces.VariableBaseTypeChecking(id, "number")
    ) {
      return callback(1, "invalid_user_id", 400, "user id is incorrect", null);
    }

    // if ( (accessUserId !== id) && (accessUserType < Constant.USER_TYPE.MODERATOR) ) {
    //     return callback(1, 'invalid_user_type', 403, null, null);
    // }

    let where = {};
    let attributes = [
      "id",
      "name",
      "address",
      "phone",
      "email",
      "open_at",
      "activated",
      "project_progress",
      "desc",
      "budget",
      "status",
      "started_day",
      "created_by",
      "updated_by",
      "created_at",
      "updated_at",
    ];

    where = { id: id };

    // if(accessUserId !== parseInt(id)) {
    //     where = {id: id, type: { $lt: accessUserType} };
    // }else{
    //     where = {id: id};
    // }

    console.log("where is this ", where);

    Project.findOne({
      where: where,
      attributes: attributes,
    }).then((result) => {
      "use strict";
      if (result) {
        return callback(null, null, 200, null, result);
      } else {
        return callback(1, "invalid_account", 403, null, null);
      }
    });
  } catch (error) {
    return callback(1, "get_one_account_fail", 400, error, null);
  }
};

exports.getAll = function (
  accessUserId,
  accessUserType,
  accessUserName,
  queryContent,
  callback
) {
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
    if (Pieces.VariableBaseTypeChecking(queryContent.q, "string")) {
      where.name = { [Sequelize.Op.like]: queryContent.q };
    }

    if (
      (Pieces.VariableBaseTypeChecking(queryContent["page"], "string") &&
        Validator.isInt(queryContent["page"])) ||
      Pieces.VariableBaseTypeChecking(queryContent["page"], "number")
    ) {
      page = parseInt(queryContent["page"]);
      if (page === 0) {
        page = 1;
      }
    }

    if (
      (Pieces.VariableBaseTypeChecking(queryContent["perPage"], "string") &&
        Validator.isInt(queryContent["perPage"])) ||
      Pieces.VariableBaseTypeChecking(queryContent["perPage"], "number")
    ) {
      perPage = parseInt(queryContent["perPage"]);
      if (perPage <= 0) {
        perPage = Constant.DEFAULT_PAGING_SIZE;
      }
    }

    Pieces.splitAndAssignValueForSort(sort, queryContent["sort"]);
    if (sort.length <= 0) {
      sort.push(["updated_at", "DESC"]);
    }

    let offset = perPage * (page - 1);
    Project.findAndCountAll({
      where: where,
      //attributes: ['id', 'first_name', 'last_name', 'date_of_birth'],
      limit: perPage,
      offset: offset,
      order: sort,
    })
      .then((data) => {
        let pages = Math.ceil(data.count / perPage);
        let Projects = data.rows;
        let output = {
          data: Projects,
          pages: {
            current: page,
            prev: page - 1,
            hasPrev: false,
            next: page + 1 > pages ? 0 : page + 1,
            hasNext: false,
            total: pages,
          },
          items: {
            begin: page * perPage - perPage + 1,
            end: page * perPage,
            total: data.count,
          },
        };
        output.pages.hasNext = output.pages.next !== 0;
        output.pages.hasPrev = output.pages.prev !== 0;
        return callback(null, null, 200, null, output);
      })
      .catch(function (error) {
        return callback(2, "find_count_all_Project_fail", 400, error, null);
      });
  } catch (error) {
    console.log("this is the error", error);
    return callback(2, "get_all_Project_fail", 400, error, null);
  }
  // try {
  //     if ( (Constant.USER_TYPE.indexOf(accessUserType) <= 1) ) {
  //         return callback(8, 'invalid_right', 400, null, null);
  //     }
  //
  //     let condition = {};
  //     let userRightIdx = Constant.USER_TYPE.indexOf(accessUserType);
  //     let lowerUserRightList=[];
  //     if(userRightIdx > 0){
  //         lowerUserRightList = Constant.USER_TYPE.slice(0, userRightIdx);
  //     }
  //
  //     // let statusWithoutDel = Constant.STATUS_ENUM.slice(0, Constant.STATUS_ENUM.length);
  //     // statusWithoutDel.splice(2,1);
  //
  //     condition.userRight = {$in: lowerUserRightList };
  //
  //     this.parseFilter(accessUserId, accessUserType, condition, queryContent.filter);
  //     if( Pieces.VariableBaseTypeChecking(queryContent.q, 'string') ){
  //         condition['$text'] = {$search: queryContent.q};
  //     }
  //
  //     let options = {};
  //     options.criteria = condition;
  //     options.keys = {'password': 0, 'resetPasswordToken': 0};
  //
  //     Project.pagedFind(options, queryContent, function (error, results) {
  //         if (error) {
  //             return callback(8, 'finds_fail', 420, error, null);
  //         }
  //         return callback(null, null, 200, null, results);
  //     });
  // }catch(error){
  //     return callback(8, 'gets_fail', 400, error, null);
  // }
};

exports.update = function (
  accessUserId,
  accessUserType,
  accessLoginName,
  projectId,
  updateData,
  callback
) {
  try {
    let queryObj = {};
    let where = {};

    console.log("update data project: ", updateData);

    if (
      !(
        Pieces.VariableBaseTypeChecking(projectId, "string") &&
        Validator.isInt(projectId)
      ) &&
      !Pieces.VariableBaseTypeChecking(projectId, "number")
    ) {
      return callback(1, "invalid_user_id", 400, "user id is incorrect", null);
    }

    // nếu mà người dùng không phải là chủ tài khoảng và người dùng cũng không phải là admin thì không cho vào
    // if ( accessUserId !== parseInt(userId) && accessUserType < Constant.USER_TYPE.MODERATOR ) {
    //     return callback(1, 'invalid_user_right', 403, null, null);
    // }

    queryObj.updater = accessUserId;

    where.id = projectId;

    if (
      Pieces.VariableBaseTypeChecking(updateData.name, "string") &&
      Validator.isLength(updateData.name, { min: 0, max: 128 })
    ) {
      queryObj.name = updateData.name;
    }

    if (
      Pieces.VariableBaseTypeChecking(updateData.address, "string") &&
      Validator.isLength(updateData.address, { min: 0, max: 256 })
    ) {
      queryObj.address = updateData.address;
    }

    if (
      Pieces.VariableBaseTypeChecking(updateData.phone, "string") &&
      Validator.isAlphanumeric(updateData.phone) &&
      Validator.isLength(updateData.phone, { min: 0, max: 12 })
    ) {
      queryObj.phone = updateData.phone;
    }

    if (
      Pieces.VariableBaseTypeChecking(updateData.email, "string") &&
      Validator.isEmail(updateData.email)
    ) {
      queryObj.email = updateData.email;
    }

    if (
      Pieces.VariableBaseTypeChecking(
        parseInt(updateData.project_progress),
        "number"
      ) &&
      parseInt(updateData.project_progress) >= 0 &&
      parseInt(updateData.project_progress) <= 100
    ) {
      queryObj.project_progress = updateData.project_progress;
    }

    if(!parseInt(updateData.budget)>=0 || Number.isNaN(parseInt(updateData.budget))){
      queryObj.budget = updateData.budget;
    }

    if (
      Pieces.VariableBaseTypeChecking(updateData.type, "string") &&
      Validator.isLength(updateData.type, { min: 0, max: 6 })
    ) {
      queryObj.type = updateData.type;
    }

    

    if (
      Pieces.VariableBaseTypeChecking(updateData.open_at, "string") 
    ) {
      queryObj.open_at = updateData.open_at;
    }

    if (
      Pieces.VariableBaseTypeChecking(updateData.started_day, "string")
    ) {
      queryObj.started_day = updateData.started_day;
    }

    queryObj.updated_at = new Date();

    console.log('queryObj: ', queryObj);

    Project.update(queryObj, { where: where })
      .then((result) => {
        "use strict";
        if (result !== null && result.length > 0 && result[0] > 0) {
          return callback(null, null, 200, null, projectId);
        } else {
          return callback(1, "update_user_fail", 400, "", null);
        }
      })
      .catch(function (error) {
        "use strict";
        return callback(1, "update_user_fail", 420, error, null);
      });
  } catch (error) {
    return callback(1, "update_user_fail", 400, error, null);
  }
};

/*

exports.update = function (accessUserId, accessUserType, ProjectId, ProjectData, callback) {
    try {
        let queryObj = {};
        let where = {};

        if ( !( Pieces.VariableBaseTypeChecking(ProjectId,'string')
                && Validator.isInt(ProjectId) )
            && !Pieces.VariableBaseTypeChecking(ProjectId,'number') ){
            return callback(2, 'invalid_Project_id', 400, 'Project id is incorrect', null);
        }

        if ( !ProjectData ) {
            return callback(2, 'invalid_Project_data', 400, null);
        }

        if (accessUserType < Constant.USER_TYPE.MODERATOR){
            where.createdBy = accessUserId;
            where.deleted = { $ne: Constant.DELETED.YES };
        }

        where.id = ProjectId;

        queryObj.updater=accessUserId;
        queryObj.updatedAt = new Date();

        if ( ProjectData.deleted === Constant.DELETED.YES ||  ProjectData.deleted === Constant.DELETED.NO ) {
            queryObj.deleted = ProjectData.deleted;
        }

        if ( Pieces.VariableBaseTypeChecking(ProjectData.code, 'string') ) {
            queryObj.code = ProjectData.code;
        }

        if( Pieces.VariableBaseTypeChecking(ProjectData.name, 'string')
            && Validator.isLength(ProjectData.name, {min: 4, max: 128}) ){
            queryObj.name = ProjectData.name;
        }

        if (Pieces.VariableBaseTypeChecking(ProjectData.desc,'string') ) {
            queryObj.desc = ProjectData.desc;
        }

        // config.general
        if (Pieces.VariableBaseTypeChecking(ProjectData.adminPassword, 'string')) {
            queryObj.adminPassword = ProjectData.adminPassword;
        }
        if (( Pieces.VariableBaseTypeChecking(ProjectData.isFullscreen, 'string') && Validator.isBoolean(ProjectData.isFullscreen))
            || Pieces.VariableBaseTypeChecking(ProjectData.isFullscreen, 'boolean')) {
            queryObj.isFullscreen = ProjectData.isFullscreen;
        }
        // config.general.extCode
        if (Pieces.VariableBaseTypeChecking(ProjectData.companyCode, 'string')) {
            queryObj.companyCode = ProjectData.companyCode;
        }
        if (Pieces.VariableBaseTypeChecking(ProjectData.siteCode, 'string')) {
            queryObj.siteCode = ProjectData.siteCode;
        }
        // config.general.timer
        if (Pieces.VariableBaseTypeChecking(ProjectData.autoShutdownTime, 'number')) {
            queryObj.autoShutdownTime = ProjectData.autoShutdownTime;
        }
        if (Pieces.VariableBaseTypeChecking(ProjectData.autoShutdownTimeMode, 'number')) {
            queryObj.autoShutdownTimeMode = ProjectData.autoShutdownTimeMode;
        }
        if (Pieces.VariableBaseTypeChecking(ProjectData.productModeTime, 'number')) {
            queryObj.productModeTime = ProjectData.productModeTime;
        }
        if (Pieces.VariableBaseTypeChecking(ProjectData.previewTime, 'number')) {
            queryObj.previewTime = ProjectData.previewTime;
        }

        // config.mirror
        if (Pieces.VariableBaseTypeChecking(ProjectData.countdownTime, 'number')) {
            queryObj.countdownTime = ProjectData.countdownTime;
        }
        if (( Pieces.VariableBaseTypeChecking(ProjectData.isNeedOpenHelp, 'string') && Validator.isBoolean(ProjectData.isNeedOpenHelp))
            || Pieces.VariableBaseTypeChecking(ProjectData.isNeedOpenHelp, 'boolean')) {
            queryObj.isNeedOpenHelp = ProjectData.isNeedOpenHelp;
        }

        // config.Project.sensor
        if (Pieces.VariableBaseTypeChecking(ProjectData.comName, 'string')) {
            queryObj.comName = ProjectData.comName;
        }
        if (( Pieces.VariableBaseTypeChecking(ProjectData.isMovementEnable, 'string') && Validator.isBoolean(ProjectData.isMovementEnable))
            || Pieces.VariableBaseTypeChecking(ProjectData.isMovementEnable, 'boolean')) {
            queryObj.isMovementEnable = ProjectData.isMovementEnable;
        }
        if (( Pieces.VariableBaseTypeChecking(ProjectData.isIrEnable, 'string') && Validator.isBoolean(ProjectData.isIrEnable))
            || Pieces.VariableBaseTypeChecking(ProjectData.isIrEnable, 'boolean')) {
            queryObj.isIrEnable = ProjectData.isIrEnable;
        }

        // config.Project.camera
        if (Pieces.VariableBaseTypeChecking(ProjectData.resolution, 'string')) {
            queryObj.resolution = ProjectData.resolution;
        }
        if (Pieces.VariableBaseTypeChecking(ProjectData.camera, 'string')) {
            queryObj.camera = ProjectData.camera;
        }
        if (Pieces.VariableBaseTypeChecking(ProjectData.rotate, 'number')) {
            queryObj.rotate = ProjectData.rotate;
        }

        // config.development
        if (( Pieces.VariableBaseTypeChecking(ProjectData.isDebugToolOpened, 'string') && Validator.isBoolean(ProjectData.isDebugToolOpened))
            || Pieces.VariableBaseTypeChecking(ProjectData.isDebugToolOpened, 'boolean')) {
            queryObj.isDebugToolOpened = ProjectData.isDebugToolOpened;
        }
        if (( Pieces.VariableBaseTypeChecking(ProjectData.isCamInfoDisplayed, 'string') && Validator.isBoolean(ProjectData.isCamInfoDisplayed))
            || Pieces.VariableBaseTypeChecking(ProjectData.isCamInfoDisplayed, 'boolean')) {
            queryObj.isCamInfoDisplayed = ProjectData.isCamInfoDisplayed;
        }

        Project.findOne({where: where}).then(Project=>{
            "use strict";
            if(Project){
                Project.update(
                    queryObj,
                    {where: where}).then(result=>{
                    if(result !== null && result.length > 0 && result[0] > 0){
                        if(Pieces.VariableBaseTypeChecking(Project.socketIO,  'string')){
                            let data = {};
                            if(queryObj.name && queryObj.name !== Project.name){
                                data.name = queryObj.name;
                            }
                            if(queryObj.desc && queryObj.desc !== Project.desc){
                                data.desc = queryObj.desc;
                            }
                            data.config = {};
                            data.config.general = {};
                            // config.general
                            if(queryObj.adminPassword && queryObj.adminPassword !== Project.adminPassword){
                                data.config.general.adminPassword = queryObj.adminPassword;
                            }
                            if(queryObj.isFullscreen !== null && queryObj.isFullscreen !== Project.isFullscreen){
                                data.config.general.isAppFullscreen = queryObj.isFullscreen;
                            }
                            data.config.general.extCode = {};
                            if(queryObj.companyCode && queryObj.companyCode !== Project.companyCode){
                                data.config.general.extCode.company = queryObj.companyCode;
                            }
                            if(queryObj.siteCode !== null && queryObj.siteCode !== Project.siteCode){
                                data.config.general.extCode.site = queryObj.siteCode;
                            }
                            data.config.general.timer = {};
                            if(queryObj.autoShutdownTime && queryObj.autoShutdownTime !== Project.autoShutdownTime){
                                data.config.general.timer.endTime = queryObj.autoShutdownTime;
                            }
                            if(queryObj.autoShutdownTimeMode && queryObj.autoShutdownTimeMode !== Project.autoShutdownTimeMode){
                                data.config.general.timer.modeTime = queryObj.autoShutdownTimeMode;
                            }
                            if(queryObj.productModeTime && queryObj.productModeTime !== Project.productModeTime){
                                data.config.general.timer.barcodeTime = queryObj.productModeTime;
                            }
                            if(queryObj.previewTime && queryObj.previewTime !== Project.previewTime){
                                data.config.general.timer.previewTime = queryObj.previewTime;
                            }

                            data.config.mirror = {};
                            if(queryObj.countdownTime && queryObj.countdownTime !== Project.countdownTime){
                                data.config.mirror.countDownTime = queryObj.countdownTime;
                            }
                            if(queryObj.isNeedOpenHelp && queryObj.isNeedOpenHelp !== Project.isNeedOpenHelp){
                                data.config.mirror.isNeedOpenHelp = queryObj.isNeedOpenHelp;
                            }

                            data.config.development = {};
                            if(queryObj.isDebugToolOpened && queryObj.isDebugToolOpened !== Project.isDebugToolOpened){
                                data.config.development.isDebugToolOpened = queryObj.isDebugToolOpened;
                            }
                            if(queryObj.isCamInfoDisplayed && queryObj.isCamInfoDisplayed !== Project.isCamInfoDisplayed){
                                data.config.development.isCamInfoDisplayed = queryObj.isCamInfoDisplayed;
                            }

                            data.config.Project = {};
                            data.config.Project.camera = {};
                            if(queryObj.resolution && queryObj.resolution !== Project.resolution){
                                data.config.Project.camera.resolution = queryObj.resolution;
                            }
                            if(queryObj.camera && queryObj.camera !== Project.camera){
                                data.config.Project.camera.Project = queryObj.camera;
                            }
                            if(queryObj.rotate && queryObj.rotate !== Project.rotate){
                                data.config.Project.camera.rotate = queryObj.rotate;
                            }

                            data.config.Project.sensor = {};
                            if(queryObj.comName && queryObj.comName !== Project.comName){
                                data.config.Project.sensor.port = queryObj.comName;
                            }
                            if(queryObj.isMovementEnabled && queryObj.isMovementEnabled !== Project.isMovementEnabled){
                                data.config.Project.sensor.isMovementEnabled = queryObj.isMovementEnabled;
                            }
                            if(queryObj.isIrEnabled && queryObj.isIrEnabled !== Project.isIrEnabled){
                                data.config.Project.sensor.isIrEnabled = queryObj.isIrEnabled;
                            }

                            SocketManager.sendCmd(Project.socketIO, 'updateSetting', data);
                        }
                        return callback(null, null, 200, null, ProjectId);
                    }else{
                        return callback(2, 'invalid_Project', 400, null, null);
                    }
                }).catch(function(error){
                    "use strict";
                    return callback(2, 'update_Project_fail', 400, error, null);
                });
            }else{
                return callback(2, 'invalid_Project', 400, null, null);
            }
        }).catch(function(error){
            "use strict";
            return callback(2, 'find_one_Project_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'update_Project_fail', 400, error);
    }
};

// support SocketIO disconnect or connect
exports.updateLiveStatus = function (socketId, isAlive, callback) {
    try {
        let where = { socketIO:  socketId};
        let queryObj = {};
        queryObj.isAlive = isAlive;

        if(isAlive === true){
            queryObj.socketIO = socketId;
        }else{
            queryObj.socketIO = '';
        }

        Project.update(queryObj, {
            where:where
        }).then(Project=>{
            "use strict";
            if(Project && Project[0] > 0){
                return callback(null);
            }else{
                return callback("unavailable_Project");
            }
        }).catch(function(error){
            "use strict";
            return callback('update_Project_fail');
        });
    }catch(error){
        return callback(error);
    }
};


exports.updateWithoutAuth = function (ProjectData, socketIO, callback) {
    try {
        if ( !ProjectData ) {
            return callback( 2, 'invalid_Project_data', 400, 'Project data is empty', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(ProjectData,'string')
            || !Validator.isJSON(ProjectData) ) {
            return callback( 2, 'invalid_Project_data', 400, 'Project data is empty', null);
        }

        let oProjectData = Pieces.safelyParseJSON1(ProjectData);

        if ( !Pieces.VariableBaseTypeChecking(oProjectData.code, 'string') ) {
            return callback( 2, 'invalid_Project_code', 400, 'code is not a string', null);
        }

        let queryObj = {};

        if( Pieces.VariableBaseTypeChecking(oProjectData.name, 'string')
            && Validator.isLength(oProjectData.name, {min: 4, max: 128}) ){
            queryObj.name = oProjectData.name;
        }

        if (Pieces.VariableBaseTypeChecking(oProjectData.desc,'string') ) {
            queryObj.desc = oProjectData.desc;
        }

        // config
        if(oProjectData.config) {
            // config.general
            if(oProjectData.config.general){
                if (Pieces.VariableBaseTypeChecking(oProjectData.config.general.adminPassword, 'string')) {
                    queryObj.adminPassword = oProjectData.config.general.adminPassword;
                }
                if (( Pieces.VariableBaseTypeChecking(oProjectData.config.general.isAppFullscreen, 'string') && Validator.isBoolean(oProjectData.config.general.isAppFullscreen))
                    || Pieces.VariableBaseTypeChecking(oProjectData.config.general.isAppFullscreen, 'boolean')) {
                    queryObj.isFullscreen = oProjectData.config.general.isAppFullscreen;
                }

                if(oProjectData.config.general.extCode){
                    if (Pieces.VariableBaseTypeChecking(oProjectData.config.general.extCode.company, 'string')) {
                        queryObj.companyCode = oProjectData.config.general.extCode.company;
                    }
                    if (Pieces.VariableBaseTypeChecking(oProjectData.config.general.extCode.site, 'string')) {
                        queryObj.siteCode = oProjectData.config.general.extCode.site;
                    }
                }

                if(oProjectData.config.general.timer){
                    if (Pieces.VariableBaseTypeChecking(oProjectData.config.general.timer.endTime, 'number')) {
                        queryObj.autoShutdownTime = oProjectData.config.general.timer.endTime;
                    }
                    if (Pieces.VariableBaseTypeChecking(oProjectData.config.general.timer.modeTime, 'number')) {
                        queryObj.autoShutdownTimeMode = oProjectData.config.general.timer.modeTime;
                    }
                    if (Pieces.VariableBaseTypeChecking(oProjectData.config.general.timer.barcodeTime, 'number')) {
                        queryObj.productModeTime = oProjectData.config.general.timer.barcodeTime;
                    }
                    if (Pieces.VariableBaseTypeChecking(oProjectData.config.general.timer.previewTime, 'number')) {
                        queryObj.previewTime = oProjectData.config.general.timer.previewTime;
                    }
                }
            }

            if(oProjectData.config.development){
                if (( Pieces.VariableBaseTypeChecking(oProjectData.config.development.isDebugToolOpened, 'string') && Validator.isBoolean(oProjectData.config.development.isDebugToolOpened))
                    || Pieces.VariableBaseTypeChecking(oProjectData.config.development.isDebugToolOpened, 'boolean')) {
                    queryObj.isDebugToolOpened = oProjectData.config.development.isDebugToolOpened;
                }

                if (( Pieces.VariableBaseTypeChecking(oProjectData.config.development.isCamInfoDisplayed, 'string') && Validator.isBoolean(oProjectData.config.development.isCamInfoDisplayed))
                    || Pieces.VariableBaseTypeChecking(oProjectData.config.development.isCamInfoDisplayed, 'boolean')) {
                    queryObj.isCamInfoDisplayed = oProjectData.config.development.isCamInfoDisplayed;
                }
            }

            if(oProjectData.config.mirror){
                if (Pieces.VariableBaseTypeChecking(oProjectData.config.mirror.countDownTime, 'number')) {
                    queryObj.countdownTime = oProjectData.config.mirror.countDownTime;
                }
                if (( Pieces.VariableBaseTypeChecking(oProjectData.config.mirror.isNeedOpenHelp, 'string') && Validator.isBoolean(oProjectData.config.mirror.isNeedOpenHelp))
                    || Pieces.VariableBaseTypeChecking(oProjectData.config.mirror.isNeedOpenHelp, 'boolean')) {
                    queryObj.isNeedOpenHelp = oProjectData.config.mirror.isNeedOpenHelp;
                }
            }

            if(oProjectData.config.Project){
                if(oProjectData.config.Project.camera){
                    if (Pieces.VariableBaseTypeChecking(oProjectData.config.Project.camera.resolution, 'string')) {
                        queryObj.resolution = oProjectData.config.Project.camera.resolution;
                    }
                    if (Pieces.VariableBaseTypeChecking(oProjectData.config.Project.camera.Project, 'string')) {
                        queryObj.camera = oProjectData.config.Project.camera.Project;
                    }
                    if (Pieces.VariableBaseTypeChecking(oProjectData.config.Project.camera.rotate, 'number')) {
                        queryObj.rotate = oProjectData.config.Project.camera.rotate;
                    }
                }
                if(oProjectData.config.Project.sensor){
                    if (Pieces.VariableBaseTypeChecking(oProjectData.config.Project.sensor.port, 'string')) {
                        queryObj.comName = oProjectData.config.Project.sensor.port;
                    }
                    if (( Pieces.VariableBaseTypeChecking(oProjectData.config.Project.sensor.isMovementEnabled, 'string') && Validator.isBoolean(oProjectData.config.Project.sensor.isMovementEnabled))
                        || Pieces.VariableBaseTypeChecking(oProjectData.config.Project.sensor.isMovementEnabled, 'boolean')) {
                        queryObj.isMovementEnable = oProjectData.config.Project.sensor.isMovementEnabled;
                    }
                    if (( Pieces.VariableBaseTypeChecking(oProjectData.config.Project.sensor.isIrEnabled, 'string') && Validator.isBoolean(oProjectData.config.Project.sensor.isIrEnabled))
                        || Pieces.VariableBaseTypeChecking(oProjectData.config.Project.sensor.isIrEnabled, 'boolean')) {
                        queryObj.isIrEnable = oProjectData.config.Project.sensor.isIrEnabled;
                    }
                }
            }
        }

        // configOptions
        if(oProjectData.configOptions) {
            if ( oProjectData.configOptions.sensors ) {
                queryObj.sensors = JSON.stringify(oProjectData.configOptions.sensors);
            }

            if ( oProjectData.configOptions.webcams ) {
                queryObj.webcams = JSON.stringify(oProjectData.configOptions.webcams);
            }
        }

        if(Pieces.VariableBaseTypeChecking(socketIO, 'string')){
            queryObj.socketIO = socketIO;
            queryObj.isAlive = true;
        }

        queryObj.updatedAt = new Date();
        queryObj.code = oProjectData.code;


        let where = { code:  oProjectData.code};
        Project.findOne({
            where:where
        }).then(Project=>{
            if(Project){
                Project.update(queryObj).then(record=>{
                    User.findOne({
                        where: {id: Project.createdBy}
                    }).then(account=>{
                        "use strict";
                        if(account){
                            JsonWebToken.sign({ id: account.id, username: account.username, displayName: account.displayName, type: account.type, applyFor: 'Project' }, Config.jwtAuthKey, {}, function(error, token) {
                                if(error)
                                {
                                    return callback(2, 'create_token_fail', 400, error, null);
                                }else{
                                    Project.accessToken = token;
                                    return callback( null, null, 200, null, Project);
                                }
                            });
                        }else{
                            return callback(2, 'invalid_account', 403, null, null);
                        }
                    }).catch(function(error){
                        "use strict";
                        return callback(2, 'find_one_account_fail', 403, error, null);
                    });
                }).catch(function(error){
                    "use strict";
                    console.log(error);
                    return callback(2, 'update_Project_fail', 403, error, null);
                })
            }
            else{
                queryObj.creator = 1;
                queryObj.updater = 1;
                queryObj.activated = Constant.ACTIVATED.YES;
                Project.create(queryObj).then((Project) => {
                    User.findOne({
                        where: {id: 1}
                    }).then(account=>{
                        "use strict";
                        if(account){
                            JsonWebToken.sign({ id: account.id, username: account.username, displayName: account.displayName, type: account.type, applyFor: 'Project' }, Config.jwtAuthKey, {}, function(error, token) {
                                if(error)
                                {
                                    return callback(2, 'create_token_fail', 500, error, null);
                                }else{
                                    Project.accessToken = token;
                                    return callback( null, null, 200, null, Project);
                                }
                            });
                        }else{
                            return callback(2, 'invalid_account', 403, null, null);
                        }
                    }).catch(function(error){
                        "use strict";
                        return callback(2, 'find_one_account_fail', 403, error, null);
                    });
                }).catch(function(error){
                    "use strict";
                    return callback(2, 'create_Project_fail', 403, error, null);
                })
            }
        }).catch(function(error){
            "use strict";
            return callback(2, 'find_one_Project_fail', 403, error, null);
        });
    }catch(error){
        return callback(2, 'update_without_auth_Project_fail', 400, error, null);
    }
};




/////// DELETE

exports.delete = function (accessUserId, accessUserRight, ProjectId, callback) {
    try {
        let queryObj = {};
        let where = {};

        if ( !( Pieces.VariableBaseTypeChecking(ProjectId,'string')
                && Validator.isInt(ProjectId) )
            && !Pieces.VariableBaseTypeChecking(ProjectId,'number') ){
            return callback(2, 'invalid_Project_id', 400, 'Project id is incorrect', null);
        }

        if( accessUserRight <= Constant.USER_TYPE.MODERATOR ){
            where.createdBy = accessUserId;
        }
        where = { id: ProjectId };
        queryObj = { deleted: Constant.DELETED.YES };

        Project.findOne({where:where}).then(Project=>{
            "use strict";
            if ( Project && Project.deleted === Constant.DELETED.YES ){
                Project.destroy({where: where}).then(result => {
                    return callback(null, null, 200, null);
                }).catch(function(error){
                    return callback(2, 'remove_Project_fail', 420, error);
                });
            }else {
                Project.update(queryObj, {where: where}).then(result=>{
                    "use strict";
                    return callback(null, null, 200, null);
                }).catch(function(error){
                    return callback(2, 'update_Project_fail', 420, error);
                })
            }
        }).catch(function(error){
            "use strict";
            return callback(2, 'find_one_Project_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'delete_Project_fail', 400, error);
    }
};

exports.deletes = function (accessUserId, accessUserRight, idList, callback) {
    try {
        let where = {};
        let queryObj = {};

        if ( !Pieces.VariableBaseTypeChecking(idList,'string')
            || !Validator.isJSON(idList) ) {
            return callback(2, 'invalid_Project_ids', 400, 'Project id list is not a json array string');
        }
        if(accessUserRight <= Constant.USER_TYPE.MODERATOR){
            where.createdBy = accessUserId;
        }

        let idLists = Pieces.safelyParseJSON(idList);
        where.id = {$in: idLists};
        queryObj.deleted = Constant.DELETED.YES;

        Project.update(queryObj, {where: where}).then(result=>{
            "use strict";
            if ( result && (result.length > 0) && result[0] > 0 ) {
                return callback(null, null, 200, null);
            } else {
                return callback(2, 'invalid_Project', 404, null);
            }
        }).catch(function(error){
            "use strict";
            return callback(2, 'update_Project_fail', 420, error);
        });
    }catch(error){
        return callback(2, 'deletes_Project_fail', 400, error);
    }
};

 */

exports.delete = function (accessUserId, accessUserType, id, callback) {
  try {
    let queryObj = {};
    let where = {};

    if (
      !(Pieces.VariableBaseTypeChecking(id, "string") && Validator.isInt(id)) &&
      !Pieces.VariableBaseTypeChecking(id, "number")
    ) {
      return callback(1, "invalid_user_id", 400, "user id is incorrect", null);
    }

    // if ( accessUserType < Constant.USER_TYPE.MODERATOR ) {
    //     return callback(1, 'invalid_user_right', 403, null);
    // }

    where = { id: id }; // , type:{$lt: accessUserType}, system: Constant.SYSTEM.NO
    queryObj = { deleted: Constant.DELETED.YES };

    Project.findOne({ where: where })
      .then((account) => {
        "use strict";
        if (account && account.deleted === Constant.DELETED.YES) {
          Project.destroy({ where: where })
            .then((result) => {
              return callback(null, null, 200, null);
            })
            .catch(function (error) {
              return callback(1, "remove_account_fail", 420, error);
            });
        } else {
          Project.update(queryObj, { where: where })
            .then((result) => {
              "use strict";
              return callback(null, null, 200, null);
            })
            .catch(function (error) {
              return callback(1, "update_account_fail", 420, error);
            });
        }
      })
      .catch(function (error) {
        "use strict";
        return callback(1, "find_one_account_fail", 400, error, null);
      });
  } catch (error) {
    return callback(1, "delete_account_fail", 400, error);
  }
};

// --------- others ----------
exports.parseFilter = function (
  accessUserId,
  accessUserRight,
  condition,
  filters
) {
  try {
    if (
      !Pieces.VariableBaseTypeChecking(filters, "string") ||
      !Validator.isJSON(filters)
    ) {
      return false;
    }

    let aDataFilter = Pieces.safelyParseJSON1(filters);
    if (aDataFilter && aDataFilter.length > 0) {
      for (let i = 0; i < aDataFilter.length; i++) {
        if (
          !Pieces.VariableBaseTypeChecking(aDataFilter[i].key, "string") ||
          !Pieces.VariableBaseTypeChecking(aDataFilter[i].operator, "string") ||
          aDataFilter[i].value === null ||
          aDataFilter[i].value === undefined
        ) {
          continue;
        }

        if (
          aDataFilter[i].key === "deleted" &&
          (aDataFilter[i].operator === "=" ||
            aDataFilter[i].operator === "!=") &&
          (aDataFilter[i].value === Constant.DELETED.YES ||
            aDataFilter[i].value === Constant.DELETED.NO)
        ) {
          switch (aDataFilter[i].operator) {
            case "=":
              condition[aDataFilter[i].key] = aDataFilter[i].value;
              break;
            case "!=":
              condition[aDataFilter[i].key] = { $ne: aDataFilter[i].value };
              break;
          }
          continue;
        }

        if (
          aDataFilter[i].key === "owner" &&
          aDataFilter[i].operator === "=" &&
          aDataFilter[i].value === "mine"
        ) {
          condition["createdBy"] = accessUserId;
          continue;
        }

        if (
          aDataFilter[i].key === "createdAt" &&
          (aDataFilter[i].operator === "=" ||
            aDataFilter[i].operator === "!=" ||
            aDataFilter[i].operator === "<" ||
            aDataFilter[i].operator === ">" ||
            aDataFilter[i].operator === "<=" ||
            aDataFilter[i].operator === ">=" ||
            aDataFilter[i].operator === "in")
        ) {
          if (
            aDataFilter[i].operator !== "in" &&
            Pieces.VariableBaseTypeChecking(aDataFilter[i].value, "string") &&
            Validator.isISO8601(aDataFilter[i].value)
          ) {
            switch (aDataFilter[i].operator) {
              case "=":
                condition[aDataFilter[i].key] = { $eq: aDataFilter[i].value };
                break;
              case "!=":
                condition[aDataFilter[i].key] = { $ne: aDataFilter[i].value };
                break;
              case ">":
                condition[aDataFilter[i].key] = { $gt: aDataFilter[i].value };
                break;
              case ">=":
                condition[aDataFilter[i].key] = { $gte: aDataFilter[i].value };
                break;
              case "<":
                condition[aDataFilter[i].key] = { $lt: aDataFilter[i].value };
                break;
              case "<=":
                condition[aDataFilter[i].key] = { $lte: aDataFilter[i].value };
                break;
            }
          } else if (aDataFilter[i].operator === "in") {
            if (
              aDataFilter[i].value.length === 2 &&
              Pieces.VariableBaseTypeChecking(
                aDataFilter[i].value[0],
                "string"
              ) &&
              Pieces.VariableBaseTypeChecking(
                aDataFilter[i].value[1],
                "string"
              ) &&
              Validator.isISO8601(aDataFilter[i].value[0]) &&
              Validator.isISO8601(aDataFilter[i].value[1])
            ) {
              condition[aDataFilter[i].key] = {
                $gte: aDataFilter[i].value[0],
                $lte: aDataFilter[i].value[1],
              };
            }
          }
          continue;
        }

        if (
          aDataFilter[i].key === "updated_at" &&
          (aDataFilter[i].operator === "=" ||
            aDataFilter[i].operator === "!=" ||
            aDataFilter[i].operator === "<" ||
            aDataFilter[i].operator === ">" ||
            aDataFilter[i].operator === "<=" ||
            aDataFilter[i].operator === ">=" ||
            aDataFilter[i].operator === "in")
        ) {
          if (
            aDataFilter[i].operator !== "in" &&
            Pieces.VariableBaseTypeChecking(aDataFilter[i].value, "string") &&
            Validator.isISO8601(aDataFilter[i].value)
          ) {
            switch (aDataFilter[i].operator) {
              case "=":
                condition[aDataFilter[i].key] = { $eq: aDataFilter[i].value };
                break;
              case "!=":
                condition[aDataFilter[i].key] = { $ne: aDataFilter[i].value };
                break;
              case ">":
                condition[aDataFilter[i].key] = { $gt: aDataFilter[i].value };
                break;
              case ">=":
                condition[aDataFilter[i].key] = { $gte: aDataFilter[i].value };
                break;
              case "<":
                condition[aDataFilter[i].key] = { $lt: aDataFilter[i].value };
                break;
              case "<=":
                condition[aDataFilter[i].key] = { $lte: aDataFilter[i].value };
                break;
            }
          } else if (aDataFilter[i].operator === "in") {
            if (
              aDataFilter[i].value.length === 2 &&
              Pieces.VariableBaseTypeChecking(
                aDataFilter[i].value[0],
                "string"
              ) &&
              Pieces.VariableBaseTypeChecking(
                aDataFilter[i].value[1],
                "string"
              ) &&
              Validator.isISO8601(aDataFilter[i].value[0]) &&
              Validator.isISO8601(aDataFilter[i].value[1])
            ) {
              condition[aDataFilter[i].key] = {
                $gte: aDataFilter[i].value[0],
                $lte: aDataFilter[i].value[1],
              };
            }
          }
        }
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
