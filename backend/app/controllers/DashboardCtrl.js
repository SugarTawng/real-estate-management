const Rest = require("../utils/Restware");
const DashboardManager = require("../manager/DashboardManager.js");

module.exports = {
  getStatistic: function (req, res) {
    let accessUserId = req.body.accessUserId || "";
    let accessUserType = req.body.accessUserType || "";
    let accessLoginName = req.body.accessLoginName || "";

    let data = req.body || "";

    DashboardManager.getStatictis(function (
      errorCode,
      errorMessage,
      httpCode,
      errorDescription,
      data
    ) {
      if (errorCode) {
        return Rest.sendError(
          res,
          errorCode,
          errorMessage,
          httpCode,
          errorDescription
        );
      }           
      // resData.id = user.id;
      return Rest.sendSuccessOne(res, data, httpCode);
    });
  },
};
