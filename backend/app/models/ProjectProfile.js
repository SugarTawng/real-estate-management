const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Account = require('./Account');
const Project = require('./Project');
const Profile = require('./Profile');

let ProfileProject = MySequelize.define('profileProject', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    project_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        }
    },
    profile_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Profile,
            key: 'id'
        }
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
    tableName: 'tbl_profile_project'
});

module.exports = ProfileProject;