const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');

let Account = MySequelize.define('account', {
    Id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    socialId: {
        type: Sequelize.STRING(256),
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    loginName: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    displayName: {
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
    phoneVerified: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    emailVerified: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    socialVerified: {
        type: Sequelize.STRING(256),
        allowNull: true
    },
    activated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    createdBy: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: this.Account,
            key: 'Id'
        }
    },
    updatedBy: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: this.Account,
            key: 'Id'
        }
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    underscored: true,
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'account'
});

module.exports = Account;