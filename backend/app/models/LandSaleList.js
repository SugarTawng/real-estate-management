const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Account = require('./Account');

let LandSaleList = MySequelize.define('landSaleList', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sale_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    manager_sale_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    land_area_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('enable', 'disable'),
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING(256),
        allowNull: false
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
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Account,
            key: 'id'
        }
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
    }
}, {
    underscored: true,
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'tbl_land_sale_list'
});

module.exports = LandSaleList;