const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Account = require('./Account');

let LandListOwner = MySequelize.define('landListOwner', {
    owner_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        primaryKey: true
     },
    land_area_id: {
     type: Sequelize.BIGINT(20),
     allowNull: false,
     primaryKey: true
    },
    desc: {
        type: Sequelize.STRING(256),
        allowNull: true
    },
    owned_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
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
    tableName: 'tbl_land_list_owner'
});

module.exports = LandListOwner;