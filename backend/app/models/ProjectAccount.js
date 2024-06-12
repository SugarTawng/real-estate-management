const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Account = require('./Account');
const Project = require('./Project');

let ProjectAccount = MySequelize.define('profileProject', {
    project_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        },
        primaryKey: true
    },
    account_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Account,
            key: 'id'
        },
        primaryKey: true
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
    tableName: 'tbl_project_account'
});

module.exports = ProjectAccount;