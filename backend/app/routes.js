/**
 * Created by s3lab. on 1/13/2017.
 */
module.exports = function (app) {
  require("./route/account")(app);
  require("./route/profile")(app);
  require("./route/projectAccount")(app);
  require("./route/project")(app);
  require("./route/zone")(app);
  require("./route/block")(app);
  require("./route/floor")(app);
  require("./route/highArea")(app);
  require("./route/landArea")(app);
  require("./route/message")(app);
  require("./route/whileBoard")(app);

  require("./route/paymentMethod")(app);
  require("./route/paymentMethodProcess")(app);

  require("./route/highSaleList")(app);
  require("./route/highListOwner")(app);
  require("./route/highPaymentProcess")(app);
  require("./route/highBooking")(app);

  require("./route/landSaleList")(app);
  require("./route/landListOwner")(app);
  require("./route/landPaymentProcess")(app);
  require("./route/landBooking")(app);

  require("./route/dashboard")(app);
  require("./route/customer")(app);
};
