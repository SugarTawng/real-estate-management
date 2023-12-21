const sequelize = require("../utils/Sequelize");
const {Profile, Project} = require('../models');
exports.getStatistic =  async function (callback) {
    try {
      const [results, metadata] = await sequelize.query(
        "CALL GetDashboardStatistics()"
      );
      // results chứa kết quả từ stored procedure
      console.log(results);
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
      return callback(1, "have and error", 400, "invalid api", null);
    }
  }