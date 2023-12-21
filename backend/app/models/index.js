// exports.User = require('./User');
// exports.Device = require('./Device');
exports.Account = require('./Account');
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
const Profile = require('./Profile');
const ProfileProject = require('./ProfileProject');
// Thiết lập mối quan hệ nhiều-nhiều giữa Project và Profile thông qua bảng ProfileProject
Project.belongsToMany(Profile, {
 through: ProfileProject,
 foreignKey: "project_id", // Đặt tên foreignKey chính xác
});
Profile.belongsToMany(Project, {
 through: ProfileProject,
 foreignKey: "profile_id", // Đặt tên foreignKey chính xác
});

exports.Project = Project;
exports.Profile = Profile;
exports.ProfileProject = ProfileProject;
exports.WhiteBoard = require('./WhiteBoard');
exports.Zone = require('./Zone');