const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Account = require('./Account');

let PaymentMethodProcess = MySequelize.define('paymentMethodProcess', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    payment_method_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    payment_time_example: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    flag_time: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    include_vat: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    total_percent_payment: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING(256),
        allowNull: true
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
    tableName: 'tbl_payment_method_process'
});

module.exports = PaymentMethodProcess;