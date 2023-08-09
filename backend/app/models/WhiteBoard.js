const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Account = require('./Account');
const Project = require('./Project');

let WhiteBoard = MySequelize.define('WhiteBoard', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    content: {
        type: Sequelize.STRING(4068),
        allowNull: false
    },
    keyword: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    public:{
        type: Sequelize.STRING(5),
        allowNull: false
    },
    project_id:{
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        }
    },
    priority:{
        type: Sequelize.STRING(6),
        allowNull: false,
        defaultValue: 'low'
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
    tableName: 'tbl_whiteboard'
});

module.exports = WhiteBoard;