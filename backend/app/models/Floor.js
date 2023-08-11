const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Block = require('./Zone');
const Account = require('./Account');

let Floor = MySequelize.define('floor', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    block_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Block,
            key: 'id'
        }
    },
    number_of_high_area: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    public_area: {
        type: Sequelize.FLOAT(3),
        allowNull: false
    },
    total_area: {
        type: Sequelize.FLOAT(3),
        allowNull: false
    },
    progress: {
        type: Sequelize.TINYINT(4),
        allowNull: true,
        default: 0
    },
    desc: {
        type: Sequelize.STRING(256),
        allowNull: true
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
    tableName: 'tbl_floor'
});

module.exports = Floor;