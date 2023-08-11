const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Zone = require('./Zone');
const Account = require('./Account');

let Block = MySequelize.define('block', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    zone_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Zone,
            key: 'id'
        }
    },
    number_of_floor: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    lat: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    long: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_service: {
        type: Sequelize.STRING(5),
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING(256),
        allowNull: true
    },
    type: {
        type: Sequelize.STRING(6),
        allowNull: true
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
    tableName: 'tbl_block'
});

module.exports = Block;