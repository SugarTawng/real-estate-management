const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const {NULL} = require("mysql/lib/protocol/constants/types");
const Account = require('./Account');

let Profile = MySequelize.define('profile', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    address: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    account_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Account,
            key: 'id'
        }
    },
    role_job: {
        type: Sequelize.STRING(256),
        allowNull: false,
        defaultValue: 'sale'
    },
    position_job: {
        type: Sequelize.STRING(256),
        allowNull: false,
        defaultValue: 'staff'
    },
    experience_year: {
        type: Sequelize.TINYINT(4),
        allowNull: true,
        default: 0
    },
    previous_position: {
        type: Sequelize.STRING(256),
        allowNull: true,
        default: NULL
    },
    working_time: {
        type: Sequelize.TINYINT(4),
        allowNull: false,
    },
    salary: {
        type: Sequelize.FLOAT(3),
        allowNull: false,
        defaultValue: 0
    },
    deleted:{
        type: Sequelize.STRING(5),
        allowNull: false,
        defaultValue: 'false'
    },
    created_by: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Account,
            key: 'id'
        }
    },
    updated_by: {
        type: Sequelize.BIGINT(10),
        allowNull: false,
        references: {
            model: Account,
            key: 'id'
        }
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },

}, {
    underscored: true,
    paranoid: false,
    timestamps: true,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    freezeTableName: true,
    tableName: 'tbl_profile'
});

module.exports = Profile;