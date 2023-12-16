const sequelize = require("../utils/Sequelize");
module.exports = {
  getStatictis: async function (callback) {
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
  },
};
