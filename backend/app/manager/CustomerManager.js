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
const Customer = Models.Customer;

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
        "social_id",
        "phone",
        "first_name",
        "last_name",
        "contacted",
        "potential",
        "activated",
        "deleted",
        "email",
        "project_id",
        "display_name",
        "created_at",
        "updated_at",
        "created_by",
        "updated_by",
      ];

      where = { id: id };

      console.log('where: ', where);

      // if(accessUserId !== parseInt(id)) {
      //     where = {id: id, type: { $lt: accessUserType} };
      // }else{
      //     where = {id: id};
      // }

      Customer.findOne({
        where: where,
        attributes: attributes,
      }).then((result) => {
        "use strict";
        if (result) {
          return callback(null, null, 200, null, result);
        } else {
          return callback(1, "invalid_Customer", 403, null, null);
        }
      });
    } catch (error) {
      return callback(1, "get_one_Customer_fail", 400, error, null);
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
      Customer.findAndCountAll({
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

      if (
        !(
          Pieces.VariableBaseTypeChecking(userId, "string") &&
          Validator.isInt(userId)
        ) &&
        !Pieces.VariableBaseTypeChecking(userId, "number")
      ) {
        return callback(
          1,
          "invalid_user_id",
          400,
          "user id is incorrect",
          null
        );
      }

      if (
        !(
          Pieces.VariableBaseTypeChecking(updateData.project_id, "string") &&
          Validator.isInt(updateData.project_id)
        ) &&
        !Pieces.VariableBaseTypeChecking(updateData.project_id, "number")
      ) {
        return callback(
          1,
          "invalid_project_id",
          400,
          "project id is incorrect",
          null
        );
      }


      // nếu mà người dùng không phải là chủ tài khoảng và người dùng cũng không phải là admin thì không cho vào
      // if ( accessUserId !== parseInt(userId) && accessUserType < Constant.USER_TYPE.MODERATOR ) {
      //     return callback(1, 'invalid_user_right', 403, null, null);
      // }

      queryObj.updater = accessUserId;
      queryObj.project_id = updateData.project_id;

      where.id = userId;

      if (accessUserId === parseInt(userId)) {
        where.activated = Constant.ACTIVATED.YES;
        where.deleted = Constant.DELETED.NO;
      } else {
        // where.type = accessUserType; accessUserType phải lớn hơn type.
      }
        if (
          Pieces.VariableBaseTypeChecking(updateData.email, "string") &&
          Validator.isEmail(updateData.email)
        ) {
          queryObj.email = updateData.email;
        }

        if (
          Pieces.VariableBaseTypeChecking(updateData.phone, "string") &&
          Validator.isLength(updateData.phone, { min: 4, max: 12 })
        ) {
          queryObj.phone = updateData.phone;
        }

        if (Pieces.ValidObjectEnum(updateData.activated, Constant.ACTIVATED)) {
          queryObj.activated = updateData.activated;
        }

        if (Pieces.ValidObjectEnum(updateData.potential, Constant.POTENTIAL)) {
          queryObj.potential = updateData.potential;
        }

        if (Pieces.ValidObjectEnum(updateData.contacted, Constant.CONTACTED)) {
          queryObj.contacted = updateData.contacted;
        }

        // console.log("query Object update", queryObj.)
      

      if (
        Pieces.VariableBaseTypeChecking(updateData.first_name, "string") &&
        Validator.isAlphanumeric(updateData.first_name) &&
        Validator.isLength(updateData.first_name, { min: 2, max: 64 })
      ) {
        queryObj.first_name = updateData.first_name;
      }

      if (
        Pieces.VariableBaseTypeChecking(updateData.last_name, "string") &&
        Validator.isAlphanumeric(updateData.last_name) &&
        Validator.isLength(updateData.last_name, { min: 2, max: 64 })
      ) {
        queryObj.last_name = updateData.last_name;
      }

      

      if (
        Pieces.VariableBaseTypeChecking(updateData.display_name, "string") &&
        Validator.isLength(updateData.display_name, { min: 1, max: 128 })
      ) {
        queryObj.display_name = updateData.display_name;
      }

      if (
        Pieces.VariableBaseTypeChecking(updateData.password, "string") &&
        Validator.isLength(updateData.password, { min: 4, max: 64 })
      ) {
        queryObj.password = BCrypt.hashSync(updateData.password, 10);
      }

      queryObj.updated_at = new Date();

      Customer.update(queryObj, { where: where })
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

      Customer.findOne({ where: where })
        .then((customer) => {
          "use strict";
          if (customer && customer.deleted === Constant.DELETED.YES) {
            Customer.destroy({ where: where })
              .then((result) => {
                return callback(null, null, 200, null);
              })
              .catch(function (error) {
                return callback(1, "remove_customer_fail", 420, error);
              });
          } else {
            Customer.update(queryObj, { where: where })
              .then((result) => {
                "use strict";
                return callback(null, null, 200, null);
              })
              .catch(function (error) {
                return callback(1, "update_customer_fail", 420, error);
              });
          }
        })
        .catch(function (error) {
          "use strict";
          return callback(1, "find_one_customer_fail", 400, error, null);
        });
    } catch (error) {
      return callback(1, "delete_customer_fail", 400, error);
    }
  },

  createByAdmin: function (
    accessUserId,
    accessUserType,
    accessLoginName,
    userData,
    callback
  ) {
    try {

      if (
        !Pieces.VariableBaseTypeChecking(userData.first_name, "string") ||
        !Validator.isAlphanumeric(userData.first_name) ||
        !Validator.isLength(userData.first_name, { min: 2, max: 64 })
      ) {
        return callback(
          1,
          "invalid_user_first_name",
          400,
          "first name should be alphanumeric, lowercase and length 2-64",
          null
        );
      }

      if (
        !Pieces.VariableBaseTypeChecking(userData.last_name, "string") ||
        !Validator.isAlphanumeric(userData.last_name) ||
        !Validator.isLength(userData.last_name, { min: 2, max: 64 })
      ) {
        return callback(
          1,
          "invalid_user_last_name",
          400,
          "last name should be alphanumeric, lowercase and length 2-64",
          null
        );
      }

      if (
        !Pieces.VariableBaseTypeChecking(userData.email, "string") ||
        !Validator.isEmail(userData.email)
      ) {
        return callback(
          1,
          "invalid_user_email",
          400,
          "email is incorrect format",
          null
        );
      }

      if (
        !Pieces.VariableBaseTypeChecking(userData.phone, "string") ||
        !Validator.isLength(userData.phone, { min: 4, max: 12 })
      ) {
        return callback(
          1,
          "invalid_user_phone",
          400,
          "phone number should be alphanumeric and length 4-12",
          null
        );
      }

      if (parseInt(userData.project_id) <= 0
            || Number.isNaN(parseInt(userData.project_id))) {
            return callback(1, 'invalid_project_id', 400, 'project id is incorrect format', null);
        }

      if(Pieces.VariableBaseTypeChecking(userData.social_id, "string")){
       queryObj.social_id = userData.social_id;
      }


      let queryObj = {};

      queryObj.email = userData.email;
      queryObj.phone = userData.phone;
      queryObj.first_name = userData.first_name;
      queryObj.last_name = userData.last_name;
      queryObj.project_id = userData.project_id;

      if (
        userData.activated === Constant.ACTIVATED.YES ||
        userData.activated === Constant.ACTIVATED.NO
      ) {
        queryObj.activated = userData.activated;
      } else {
        queryObj.activated = Constant.ACTIVATED.YES;
      }

      if (
        userData.deleted === Constant.DELETED.YES ||
        userData.deleted === Constant.DELETED.NO
      ) {
        queryObj.deleted = userData.deleted;
      } else {
        queryObj.deleted = Constant.DELETED.NO;
      }

      if (
       userData.contacted === Constant.CONTACTED.YES ||
       userData.contacted === Constant.CONTACTED.NO
     ) {
       queryObj.contacted = userData.contacted;
     } else {
       queryObj.contacted = Constant.CONTACTED.NO;
     }

     if (
      userData.potential === Constant.POTENTIAL.YES ||
      userData.potential === Constant.POTENTIAL.NO
    ) {
      queryObj.potential = userData.potential;
    } else {
      queryObj.potential = Constant.POTENTIAL.YES;
    }

      if (Pieces.VariableBaseTypeChecking(userData.display_name, "string")) {
        queryObj.display_name = userData.display_name;
      } else {
        queryObj.display_name = userData.last_name;
      }

      queryObj.created_by = accessUserId;
      queryObj.updated_by = accessUserId;
      

      Customer.create(queryObj)
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
