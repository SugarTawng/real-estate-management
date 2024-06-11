const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Account = require("./Account");
const Project = require("./Project");

let Customer = MySequelize.define('customer', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    social_id: {
        type: Sequelize.STRING(256),
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    display_name: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    contacted: {
        type: Sequelize.ENUM('true','false'),
        allowNull: false
    },
    potential: {
     type: Sequelize.ENUM('true','false'),
     allowNull: false
    },
    activated: {
        type: Sequelize.STRING(5),
        allowNull: false,
        default: false
    },
    deleted: {
        type: Sequelize.STRING(5),
        allowNull: false,
        default: false
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
        allowNull: true,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    },
    project_id: {
     type: Sequelize.BIGINT(20),
     allowNull: false,
     references: {
       model: Project,
       key: "id",
     },
   },
}, {
    underscored: true,
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'tbl_customer'
});

module.exports = Customer;