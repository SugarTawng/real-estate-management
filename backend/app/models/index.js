exports.Account = require('./Account');
exports.Customer = require('./Customer');
exports.Block = require('./Block');
exports.Floor = require('./Floor')
exports.HighArea = require('./HighArea');
exports.HighBooking = require('./HighBooking');
exports.HighListOwner = require('./HighListOwner');
exports.HighPaymentProcess = require('./HighPaymentProcess');
exports.HighSaleList = require('./HighSaleList');

exports.LandArea = require('./LandArea');
exports.LandBooking = require('./LandBooking');
exports.LandListOwner = require('./LandListOwner');
exports.LandPaymentProcess = require('./LandPaymentProcess');
exports.LandSaleList = require('./LandSaleList');

exports.Message = require('./Message');
exports.PaymentMethod = require('./PaymentMethod');
exports.PaymentMethodProcess = require('./PaymentMethodProcess');

// exports.Project = require('./Project');
// exports.Profile = require('./Profile');
// exports.ProjectProfile = require('./ProjectProfile');
const Project = require('./Project');
const Account = require('./Account');
const ProjectAccount = require('./ProjectAccount');
// Thiết lập mối quan hệ nhiều-nhiều giữa Project và Profile thông qua bảng ProfileProject
Project.belongsToMany(Account, {
 through: ProjectAccount,
 foreignKey: "project_id", // Đặt tên foreignKey chính xác
});
Account.belongsToMany(Project, {
 through: ProjectAccount,
 foreignKey: "account_id", // Đặt tên foreignKey chính xác
});

exports.Project = Project;
exports.ProjectAccount = ProjectAccount;
exports.WhiteBoard = require('./WhiteBoard');
exports.Zone = require('./Zone');