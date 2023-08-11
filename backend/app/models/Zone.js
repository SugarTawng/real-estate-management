const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const {NULL} = require("mysql/lib/protocol/constants/types");
const Project = require('./Project');
const Account = require('./Account');

let Zone = MySequelize.define('zone', {
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
    name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING(256),
        allowNull: true
    },
    construction_area: {
        type: Sequelize.FLOAT(3),
        allowNull: false
    },
    total_area: {
        type: Sequelize.FLOAT(3),
        allowNull: false
    },
    number_of_block: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    number_of_unit_land:{
      type: Sequelize.TINYINT,
      allowNull: false
    },
    progress: {
        type: Sequelize.TINYINT(4),
        allowNull: true,
        default: 0
    },
    started_day: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
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
    tableName: 'tbl_zone'
});

module.exports = Zone;