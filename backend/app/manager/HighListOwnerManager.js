/**
 * Created by bioz on 1/13/2017.
 */
// third party components
const BCrypt = require("bcryptjs");
const Validator = require("validator");
const Sequelize = require("sequelize");

// our components
const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");
const Models = require("../models");
const HighListOwner = Models.HighListOwner;

module.exports = {
  getOne: function (accessUserId, accessUserType, id, callback) {
    try {
      if (
        !(
          Pieces.VariableBaseTypeChecking(id, "string") && Validator.isInt(id)
        ) &&
        !Pieces.VariableBaseTypeChecking(id, "number")
      ) {
        return callback(
          1,
          "invalid_user_id",
          400,
          "user id is incorrect",
          null
        );
      }

      // if ( (accessUserId !== id) && (accessUserType < Constant.USER_TYPE.MODERATOR) ) {
      //     return callback(1, 'invalid_user_type', 403, null, null);
      // }

      let where = {};
      let attributes = [
        "id",
        "login_name",
        "email",
        "type",
        "display_name",
        "created_at",
        "updated_at",
        "created_by",
        "updated_by",
      ];

      console.log(attributes);

      where = { id: id };

      // if(accessUserId !== parseInt(id)) {
      //     where = {id: id, type: { $lt: accessUserType} };
      // }else{
      //     where = {id: id};
      // }

      console.log("where is this ", where);

      HighListOwner.findOne({
        where: where,
        attributes: attributes,
      }).then((result) => {
        "use strict";
        if (result) {
          return callback(null, null, 200, null, result);
        } else {
          return callback(1, "invalid_HighListOwner", 403, null, null);
        }
      });
    } catch (error) {
      return callback(1, "get_one_HighListOwner_fail", 400, error, null);
    }
  },

  getStatistic: function (accessUserId, accessUserType, callback) {
    try {
      let final = {};
      final = { activated: 0, total: 0 };
      if (accessUserType < Constant.USER_TYPE.MODERATOR) {
        return callback(null, null, 200, null, final);
      }

      HighListOwner.count({
        where: {},
      })
        .then(function (total) {
          "use strict";
          final.total = total;
          HighListOwner.count({
            where: { activated: 1 },
          })
            .then(function (activated) {
              final.activated = activated;
              return callback(null, null, 200, null, final);
            })
            .catch(function (error) {
              "use strict";
              return callback(1, "count_user_fail", 400, error, null);
            });
        })
        .catch(function (error) {
          "use strict";
          return callback(1, "count_user_fail", 400, error, null);
        });
    } catch (error) {
      return callback(1, "statistic_user_fail", 400, error, null);
    }
  },
  getAll: function (
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

      this.parseFilter(
        accessUserId,
        accessUserType,
        where,
        queryContent.filter
      );
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
      HighListOwner.findAndCountAll({
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
          console.log("this is the error", error);
          return callback(2, "find_count_all_Project_fail", 400, error, null);
        });
    } catch (error) {
      console.log("this is the error", error);
      return callback(2, "get_all_Project_fail", 400, error, null);
    }
  },

  // getAll: function(accessUserId, accessUserType, query, callback){
  //     try {
  //         // if ( accessUserType < Constant.USER_TYPE.MODERATOR ) {
  //         //     return callback(1, 'invalid_user_type', 400, null, null);
  //         // }
  //
  //         let where;
  //         let cond1 = {};
  //         let page = 1;
  //         let perPage = Constant.DEFAULT_PAGING_SIZE;
  //         let sort = [];
  //         let attributes = [];
  //
  //
  //         cond1.type = {$lt: accessUserType};
  //
  //         this.parseFilter(accessUserId, accessUserType, cond1, query.filter);
  //         if( Pieces.VariableBaseTypeChecking(query.q, 'string') ){
  //             cond1.displayName = {[Sequelize.Op.like]: query.q};
  //         }
  //
  //         where = {$or:[{id: accessUserId} ,cond1] };
  //
  //         if( (Pieces.VariableBaseTypeChecking(query['page'], 'string') && Validator.isInt(query['page']))
  //             || (Pieces.VariableBaseTypeChecking(query['page'], 'number')) ){
  //             page = parseInt(query['page']);
  //             if(page === 0){
  //                 page = 1;
  //             }
  //         }
  //
  //         if( (Pieces.VariableBaseTypeChecking(query['perPage'], 'string') && Validator.isInt(query['perPage']))
  //             || (Pieces.VariableBaseTypeChecking(query['perPage'], 'number')) ){
  //             perPage = parseInt(query['perPage']);
  //             if(perPage <= 0){
  //                 perPage = Constant.DEFAULT_PAGING_SIZE;
  //             }
  //         }
  //
  //         Pieces.splitAndAssignValueForSort(sort, query['sort']);
  //         if(sort.length <= 0){
  //             sort.push(['updatedAt', 'DESC']);
  //         }
  //
  //         let offset = perPage * (page - 1);
  //         HighListOwner.findAndCountAll({
  //             where: where,
  //             limit: perPage,
  //             offset: offset,
  //             order: sort
  //         })
  //             .then((data) => {
  //                 let pages = Math.ceil(data.count / perPage);
  //                 let HighListOwners = data.rows;
  //                 let output = {
  //                     data: HighListOwners,
  //                     pages: {
  //                         current: page,
  //                         prev: page - 1,
  //                         hasPrev: false,
  //                         next: (page + 1) > pages ? 0 : (page + 1),
  //                         hasNext: false,
  //                         total: pages
  //                     },
  //                     items: {
  //                         begin: ((page * perPage) - perPage) + 1,
  //                         end: page * perPage,
  //                         total: data.count
  //                     }
  //                 };
  //                 output.pages.hasNext = (output.pages.next !== 0);
  //                 output.pages.hasPrev = (output.pages.prev !== 0);
  //                 return callback(null, null, 200, null, output);
  //             }).catch(function (error) {
  //                 console.log('this is the error  ',error)
  //             return callback(1, 'find_and_count_all_user_fail', 420, error, null);
  //         });
  //     }catch(error){
  //         return callback(1, 'get_all_user_fail', 400, error, null);
  //     }
  // },
  //

  update: function (
    accessUserId,
    accessUserType,
    accessLoginName,
    userId,
    updateData,
    callback
  ) {
    try {
      let queryObj = {};
      let where = {};

      // if (
      //   !(
      //     Pieces.VariableBaseTypeChecking(userId, "string") &&
      //     Validator.isInt(userId)
      //   ) &&
      //   !Pieces.VariableBaseTypeChecking(userId, "number")
      // ) {
      //   return callback(
      //     1,
      //     "invalid_user_id",
      //     400,
      //     "user id is incorrect",
      //     null
      //   );
      // }

      // nếu mà người dùng không phải là chủ tài khoảng và người dùng cũng không phải là admin thì không cho vào
      // if ( accessUserId !== parseInt(userId) && accessUserType < Constant.USER_TYPE.MODERATOR ) {
      //     return callback(1, 'invalid_user_right', 403, null, null);
      // }

      queryObj.updater = accessUserId;

      where.id = userId;

      // if (accessUserId === parseInt(userId)) {
      //   where.activated = Constant.ACTIVATED.YES;
      //   where.deleted = Constant.DELETED.NO;
      // } else {
      //   // where.type = accessUserType; accessUserType phải lớn hơn type.
      //   if (
      //     Pieces.VariableBaseTypeChecking(updateData.login_name, "string") &&
      //     Validator.isAlphanumeric(updateData.login_name) &&
      //     Validator.isLowercase(updateData.login_name) &&
      //     Validator.isLength(updateData.login_name, { min: 4, max: 128 })
      //   ) {
      //     queryObj.login_name = updateData.login_name;
      //   }

      //   if (
      //     Pieces.VariableBaseTypeChecking(updateData.email, "string") &&
      //     !Validator.isEmail(updateData.email)
      //   ) {
      //     queryObj.email = updateData.email;
      //   }

      //   if (
      //     Pieces.VariableBaseTypeChecking(updateData.phone, "string") &&
      //     Validator.isLength(updateData.phone, { min: 4, max: 12 })
      //   ) {
      //     queryObj.phone = updateData.phone;
      //   }

      //   if (Pieces.ValidObjectEnum(updateData.activated, Constant.ACTIVATED)) {
      //     queryObj.activated = updateData.activated;
      //   }

      //   if (Pieces.ValidObjectEnum(updateData.type, Constant.USER_TYPE)) {
      //     queryObj.type = updateData.type;
      //   }
      // }

      // if (
      //   Pieces.VariableBaseTypeChecking(updateData.first_name, "string") &&
      //   Validator.isAlphanumeric(updateData.first_name) &&
      //   Validator.isLength(updateData.first_name, { min: 2, max: 64 })
      // ) {
      //   queryObj.first_name = updateData.first_name;
      // }

      // if (
      //   Pieces.VariableBaseTypeChecking(updateData.last_name, "string") &&
      //   Validator.isAlphanumeric(updateData.last_name) &&
      //   Validator.isLength(updateData.last_name, { min: 2, max: 64 })
      // ) {
      //   queryObj.last_name = updateData.last_name;
      // }

      // if (
      //   Pieces.VariableBaseTypeChecking(updateData.email_verified, "string") &&
      //   Validator.isEmail(updateData.email_verified) &&
      //   updateData.email === updateData.email_verified
      // ) {
      //   queryObj.email_verified = updateData.email_verified;
      // }

      // if (
      //   Pieces.VariableBaseTypeChecking(updateData.phone_verified, "string") &&
      //   Validator.isLength(updateData.phone_verified, { min: 4, max: 12 }) &&
      //   updateData.phone === updateData.phone_verified
      // ) {
      //   queryObj.phone_verified = updateData.phone_verified;
      // }

      // if (
      //   Pieces.VariableBaseTypeChecking(updateData.display_name, "string") &&
      //   Validator.isLength(updateData.display_name, { min: 1, max: 128 })
      // ) {
      //   queryObj.display_name = updateData.display_name;
      // }

      // if (
      //   Pieces.VariableBaseTypeChecking(updateData.password, "string") &&
      //   Validator.isLength(updateData.password, { min: 4, max: 64 })
      // ) {
      //   queryObj.password = BCrypt.hashSync(updateData.password, 10);
      // }

      queryObj.owner_id = updateData.owner_id;
      queryObj.high_area_id = updateData.high_area_id;
      queryObj.desc = updateData.desc;
      queryObj.owned_at = updateData.owned_at;
      queryObj.project_id = updateData.project_id;

      queryObj.updated_at = new Date();

      HighListOwner.update(queryObj, { where: where })
        .then((result) => {
          "use strict";
          if (result !== null && result.length > 0 && result[0] > 0) {
            return callback(null, null, 200, null, userId);
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
  },

  delete: function (accessUserId, accessUserType, id, callback) {
    try {
      let queryObj = {};
      let where = {};

      if (
        !(
          Pieces.VariableBaseTypeChecking(id, "string") && Validator.isInt(id)
        ) &&
        !Pieces.VariableBaseTypeChecking(id, "number")
      ) {
        return callback(
          1,
          "invalid_user_id",
          400,
          "user id is incorrect",
          null
        );
      }

      // if ( accessUserType < Constant.USER_TYPE.MODERATOR ) {
      //     return callback(1, 'invalid_user_right', 403, null);
      // }

      where = { id: id }; // , type:{$lt: accessUserType}, system: Constant.SYSTEM.NO
      queryObj = { deleted: Constant.DELETED.YES };

      HighListOwner.findOne({ where: where })
        .then((HighListOwner) => {
          "use strict";
          if (HighListOwner && HighListOwner.deleted === Constant.DELETED.YES) {
            HighListOwner.destroy({ where: where })
              .then((result) => {
                return callback(null, null, 200, null);
              })
              .catch(function (error) {
                return callback(1, "remove_HighListOwner_fail", 420, error);
              });
          } else {
            HighListOwner.update(queryObj, { where: where })
              .then((result) => {
                "use strict";
                return callback(null, null, 200, null);
              })
              .catch(function (error) {
                return callback(1, "update_HighListOwner_fail", 420, error);
              });
          }
        })
        .catch(function (error) {
          "use strict";
          return callback(1, "find_one_HighListOwner_fail", 400, error, null);
        });
    } catch (error) {
      return callback(1, "delete_HighListOwner_fail", 400, error);
    }
  },
  createByAdmin: function (accessUserId, accessUserType, accessLoginName, userData, callback) {
    try {
      // if (
      //   !Pieces.VariableBaseTypeChecking(userData.loginName, "string") ||
      //   !Validator.isAlphanumeric(userData.loginName) ||
      //   !Validator.isLowercase(userData.loginName) ||
      //   !Validator.isLength(userData.loginName, { min: 4, max: 128 })
      // ) {
      //   return callback(
      //     1,
      //     "invalid_user_login_name",
      //     400,
      //     "login name should be alphanumeric, lowercase and length 4-128",
      //     null
      //   );
      // }

      // if (
      //   !Pieces.VariableBaseTypeChecking(userData.firstName, "string") ||
      //   !Validator.isAlphanumeric(userData.firstName) ||
      //   !Validator.isLength(userData.firstName, { min: 2, max: 64 })
      // ) {
      //   return callback(
      //     1,
      //     "invalid_user_first_name",
      //     400,
      //     "first name should be alphanumeric, lowercase and length 2-64",
      //     null
      //   );
      // }

      // if (
      //   !Pieces.VariableBaseTypeChecking(userData.lastName, "string") ||
      //   !Validator.isAlphanumeric(userData.lastName) ||
      //   !Validator.isLength(userData.lastName, { min: 2, max: 64 })
      // ) {
      //   return callback(
      //     1,
      //     "invalid_user_last_name",
      //     400,
      //     "last name should be alphanumeric, lowercase and length 2-64",
      //     null
      //   );
      // }

      // if (!Pieces.VariableBaseTypeChecking(userData.password, "string")) {
      //   return callback(
      //     1,
      //     "invalid_user_password",
      //     400,
      //     "password is not a string",
      //     null
      //   );
      // }

      // if (
      //   !Pieces.VariableBaseTypeChecking(userData.email, "string") ||
      //   !Validator.isEmail(userData.email)
      // ) {
      //   return callback(
      //     1,
      //     "invalid_user_email",
      //     400,
      //     "email is incorrect format",
      //     null
      //   );
      // }

      // if (
      //   !Pieces.VariableBaseTypeChecking(userData.emailVerified, "string") ||
      //   !Validator.isEmail(userData.emailVerified) ||
      //   userData.email === userData.emailVerified
      // ) {
      //   return callback(
      //     1,
      //     "invalid_user_email_verified",
      //     400,
      //     "email verified is incorrect format or email matches verified email",
      //     null
      //   );
      // }

      // if (
      //   !Pieces.VariableBaseTypeChecking(userData.phone, "string") ||
      //   !Validator.isLength(userData.phone, { min: 4, max: 12 })
      // ) {
      //   return callback(
      //     1,
      //     "invalid_user_phone",
      //     400,
      //     "phone number should be alphanumeric and length 4-12",
      //     null
      //   );
      // }

      // if (
      //   !Pieces.VariableBaseTypeChecking(userData.phoneVerified, "string") ||
      //   !Validator.isLength(userData.phoneVerified, { min: 4, max: 12 }) ||
      //   userData.phone === userData.phoneVerified
      // ) {
      //   return callback(
      //     1,
      //     "invalid_user_phone_verified",
      //     400,
      //     "phone verified number should be alphanumeric and length 4-12 or phone matches verified phone",
      //     null
      //   );
      // }

      let queryObj = {};

      queryObj.owner_id = userData.owner_id;
      queryObj.high_area_id = userData.high_area_id;
      queryObj.desc = userData.desc;
      queryObj.owned_at = userData.owned_at;
      queryObj.project_id = userData.project_id;


      // if (
      //   userData.activated === Constant.ACTIVATED.YES ||
      //   userData.activated === Constant.ACTIVATED.NO
      // ) {
      //   queryObj.activated = userData.activated;
      // } else {
      //   queryObj.activated = Constant.ACTIVATED.YES;
      // }

      // if (
      //   userData.deleted === Constant.DELETED.YES ||
      //   userData.deleted === Constant.DELETED.NO
      // ) {
      //   queryObj.deleted = userData.deleted;
      // } else {
      //   queryObj.deleted = Constant.DELETED.NO;
      // }

      // if (Pieces.ValidObjectEnum(userData.type, Constant.USER_TYPE)) {
      //   if (
      //     Constant.USER_TYPE.indexOf(accessUserType) <=
      //     Constant.USER_TYPE.indexOf(userData.type)
      //   ) {
      //     return callback(
      //       1,
      //       "invalid_user_right",
      //       403,
      //       "you have no right to do this",
      //       null
      //     );
      //   }
      //   queryObj.type = userData.type;
      // } else {
      //   return callback(
      //     1,
      //     "invalid_user_type",
      //     400,
      //     "user type should be string enum {super_admin, admin, normal_user, anonymous}",
      //     null
      //   );
      // }

      // if (Pieces.VariableBaseTypeChecking(userData.displayName, "string")) {
      //   queryObj.display_name = userData.displayName;
      // } else {
      //   queryObj.display_name = userData.loginName;
      // }

      queryObj.created_by = accessUserId;
      queryObj.updated_by = accessUserId;
      

      HighListOwner.create(queryObj)
        .then((result) => {
          "use strict";
          return callback(null, null, 200, null, result);
        })
        .catch(function (error) {
          console.log("error ", error);
          ("use strict");
          return callback(1, "create_user_fail", 420, error, null);
        });
    } catch (error) {
      return callback(1, "create_by_admin_user_fail", 400, error, null);
    }
  },

  // --------- others ----------
  parseFilter: function (accessUserId, accessUserType, condition, filters) {
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
            !Pieces.VariableBaseTypeChecking(
              aDataFilter[i].operator,
              "string"
            ) ||
            aDataFilter[i].value === null ||
            aDataFilter[i].value === undefined
          ) {
            continue;
          }

          if (
            aDataFilter[i].key === "activated" &&
            (aDataFilter[i].operator === "=" ||
              aDataFilter[i].operator === "!=") &&
            (aDataFilter[i].value === Constant.ACTIVATED.YES ||
              aDataFilter[i].value === Constant.ACTIVATED.NO)
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
            aDataFilter[i].key === "type" &&
            (aDataFilter[i].operator === "=" ||
              aDataFilter[i].operator === "!=") &&
            Pieces.ValidObjectEnum(aDataFilter[i].value, Constant.USER_TYPE)
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
                  condition[aDataFilter[i].key] = {
                    $gte: aDataFilter[i].value,
                  };
                  break;
                case "<":
                  condition[aDataFilter[i].key] = { $lt: aDataFilter[i].value };
                  break;
                case "<=":
                  condition[aDataFilter[i].key] = {
                    $lte: aDataFilter[i].value,
                  };
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
            aDataFilter[i].key === "updatedAt" &&
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
                  condition[aDataFilter[i].key] = {
                    $gte: aDataFilter[i].value,
                  };
                  break;
                case "<":
                  condition[aDataFilter[i].key] = { $lt: aDataFilter[i].value };
                  break;
                case "<=":
                  condition[aDataFilter[i].key] = {
                    $lte: aDataFilter[i].value,
                  };
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
  },
};
