const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');


let Account = MySequelize.define('account', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    social_id: {
        type: Sequelize.STRING(256),
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    login_name: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    display_name: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    language: {
        type: Sequelize.CHAR(2),
        allowNull: true
    },
    type: {
        type: Sequelize.ENUM('anonymous', 'admin', 'super admin', 'normal user'),
        allowNull: false
    },
    phone_verified: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    email_verified: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    social_verified: {
        type: Sequelize.STRING(256),
        allowNull: true
    },
    activated: {
        type: Sequelize.STRING(5),
        allowNull: false,
        default: false
    },
    deleted: {
        type: Sequelize.STRING(5),
        allowNull: false,
        default: false
    },
    created_by: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: this.Account,
            key: 'Id'
        }
    },
    updated_by: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: this.Account,
            key: 'Id'
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
    tableName: 'tbl_account'
});

module.exports = Account;