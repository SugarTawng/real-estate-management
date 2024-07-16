const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Account = require('./Account');

let HighBooking = MySequelize.define('highBooking', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    high_area_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true
    },
    zone_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    booking_fee: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    sale_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    buyer_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    payment_method_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true
    },
    project_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('enable', 'disable', 'canceled'),
        allowNull: false
    },
    begin_payment: {
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
    tableName: 'tbl_high_booking'
});

module.exports = HighBooking;