const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const Floor = require('./Floor');
const Account = require('./Account');

let HighArea = MySequelize.define('highArea', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    floor_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Floor,
            key: 'id'
        }
    },
    high_area_direction: {
        type: Sequelize.STRING(256),
        allowNull: true
    },
    lat: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    long: {
        type: Sequelize.FLOAT,
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
    number_of_wc: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    number_of_room: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE(3),
        allowNull: false
    },
    owner: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: Account,
            key: 'id'
        }
    },
    buy_status: {
        type: Sequelize.STRING(9),
        allowNull: false
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
        type: Sequelize.BIGINT(20),
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
    tableName: 'tbl_high_area'
});

module.exports = HighArea;