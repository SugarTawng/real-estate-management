const Sequelize = require("sequelize");
const MySequelize = require("../utils/Sequelize");
const Account = require("./Account");
const Project = require("./Project");

let Message = MySequelize.define(
  "message",
  {
    id: {
      type: Sequelize.BIGINT(20),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(4068),
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    deleted: {
      type: Sequelize.STRING(5),
      allowNull: false,
      defaultValue: "false",
    },
    project_id: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
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
  },
  {
    underscored: true,
    paranoid: false,
    timestamps: true,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    freezeTableName: true,
    tableName: "tbl_message",
  }
);

module.exports = Message;
