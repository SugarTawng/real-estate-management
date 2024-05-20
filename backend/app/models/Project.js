const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const { NULL } = require("mysql/lib/protocol/constants/types");
const Account = require("./Account");

let Project = MySequelize.define(
  "project",
  {
    id: {
      type: Sequelize.BIGINT(20),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    open_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    activated: {
      type: Sequelize.STRING(5),
      allowNull: false,
      default: false,
    },
    project_progress: {
      type: Sequelize.TINYINT(4),
      allowNull: true,
      default: 0,
    },
    desc: {
      type: Sequelize.STRING(256),
      allowNull: true,
      default: NULL,
    },
    deleted: {
      type: Sequelize.STRING(5),
      allowNull: false,
      defaultValue: "false",
    },
    started_day: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
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
      type: Sequelize.BIGINT(10),
      allowNull: false,
      references: {
        model: Account,
        key: "id",
      },
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    budget: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      defaultValue: 1000,
    },
    status: {
      type: Sequelize.ENUM("working", "done"),
      allowNull: false,
      defaultValue: "working",
    },
    type: {
      type: Sequelize.STRING(256),
      allowNull: true,
      default: NULL,
    },
  },
  {
    underscored: true,
    paranoid: false,
    timestamps: true,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    freezeTableName: true,
    tableName: "tbl_project",
  }
);

module.exports = Project;
