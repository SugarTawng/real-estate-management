const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Account = require('./Account');

let HighPaymentProcess = MySequelize.define('highPaymentProcess', {
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
    payment_time: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    amount_of_money: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    amount_of_debt: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    submitter: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('indebted', 'done'),
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
    },
    deleted: {
        type: Sequelize.STRING(5),
        allowNull: false,
        defaultValue: "false",
      },
}, {
    underscored: true,
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'tbl_high_payment_process'
});

module.exports = HighPaymentProcess;