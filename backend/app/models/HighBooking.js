const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Account = require('./Account');
const HighArea = require('./HighArea');
const Zone = require('./Zone');

let HighBooking = MySequelize.define('highBooking', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    high_area_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        references: {
            model: HighArea,
            key: 'id'
        }
    },
    zone_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Zone,
            key: 'id'
        }
    },
    booking_fee: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    sale_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    buyer_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    payment_method_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        
    },
    project_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('enable', 'disable', 'canceled'),
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('booking', 'deposit'),
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