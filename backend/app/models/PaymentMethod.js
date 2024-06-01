const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Account = require("./Account");

let PaymentMethod = MySequelize.define(
  "paymentMethod",
  {
    id: {
      type: Sequelize.BIGINT(20),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    project_id: {
      type: Sequelize.BIGINT(256),
      allowNull: false,
    },
    total_of_payment_time: {
      type: Sequelize.TINYINT,
      allowNull: false,
    },
    method_name: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    percent_discount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    vat: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    maintenance_fee: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    created_by: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      references: {
        model: Account,
        key: "id",
      },
    },
    updated_by: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      references: {
        model: Account,
        key: "id",
      },
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    desc: {
      type: Sequelize.STRING(4068),
      allowNull: true,
    },
  },
  {
    underscored: true,
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    paranoid: true,
    freezeTableName: true,
    tableName: "tbl_payment_method",
  }
);

module.exports = PaymentMethod;
