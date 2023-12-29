const sequelize = require("../utils/Sequelize");
const {Profile, Project, HighPaymentProcess, LandPaymentProcess} = require('../models');

exports.getStatistic =  async function (callback) {
    try {
      const [results, metadata] = await sequelize.query(
        "CALL GetDashboardStatistics()"
      );
      return callback(null, null, 200, null, results);
    } catch (error) {
      console.log("error: ", error);
      return callback(1, "have an error", 400, "invalid api", null);
    }
  }

  exports.getProfileProject = async function (callback){
    try {
      const projects = await Project.findAll({
        attributes: ["id", "name", "budget", "project_progress", "img"], // Chọn các thuộc tính bạn
  
        include: [
          {
            model: Profile,
            attributes: ["img", "account_id"],
            through: {
              attributes: [],
            },
          },
        ],
      });
  
      return callback(null, null, 200, null, projects);
    } catch (error) {
      console.error("Error retrieving projects:", error);
      return callback(1, "have an error", 400, "invalid api", null);
    }
  }

  exports.getProcessPayment = async function(callback){
    try{
      const highProcessData = await HighPaymentProcess.findAll();
      const landProcessData = await LandPaymentProcess.findAll();
      const combinedData = highProcessData.concat(landProcessData);
      callback(null, null, 200, null, combinedData);
    } catch(error){
      console.log("Error in server api process payment dashboard", error);
      return callback(1, "have an error", 400, "invalid api", null);
    }
  }