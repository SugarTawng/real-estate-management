const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const {NULL} = require("mysql/lib/protocol/constants/types");

let Device = MySequelize.define('project', {
    Id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    address: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    openAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(16),
        allowNull: true,
        default: "ACTIVATED"
    },
    activated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    status: {
        type: Sequelize.STRING(16),
        allowNull: true,
        default: "ACTIVATED"
    },
    projectProgress: {
        type: Sequelize.TINYINT(4),
        allowNull: true,
        default: NULL
    },
    desc: {
        type: Sequelize.STRING(256),
        allowNull: true,
        default: NULL
    },

    startedDay: {
        type: Sequelize.DATE,
        allowNull: false
    },

    createdBy: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    updatedBy: {
        type: Sequelize.BIGINT(10),
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
    },

}, {
    underscored: true,
    paranoid: false,
    timestamps: true,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    freezeTableName: true,
    tableName: 'device'
});

module.exports = Device;