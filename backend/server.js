/**
 * Created by s3lab. on 1/13/2017.
 */
// third party components
const Express = require("express");
const BodyParser = require("body-parser");
const MethodOverride = require("method-override");
const Morgan = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");
// our components
const Config = require("./app/config/Global");
const LandPaymentProcess = require('./app/models').LandPaymentProcess;
const HighPaymentProcess = require('./app/models').HighPaymentProcess;

let App = Express();

App.use(cors());

// Create app
let server = require("http").createServer(App);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  LandPaymentProcess.afterCreate((item) => {
    socket.emit('newItem', item);
  });

  HighPaymentProcess.afterCreate((item) => {
    socket.emit('newItem', item);
  });
});

// log by using morgan
App.use(Morgan("combined"));

// get all data/stuff of the body (POST) parameters
// parse application/json
App.use(
  BodyParser.json({
    limit: "5mb",
  })
);

// parse application/vnd.api+json as json
App.use(
  BodyParser.json({
    type: "application/vnd.api+json",
  })
);

// parse application/x-www-form-urlencoded
App.use(
  BodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
App.use(MethodOverride("X-HTTP-Method-Override"));



// Public Location
// App.use(Express.static(global.CLOUD_API.rootPath + Config.paths.public));

// Auth Middleware - This will check if the token is valid
App.all("/v1/auth/*", [require("./app/middlewares/ValidateRequest")]);

// Routes for API
require("./app/routes")(App); // configure our routes

// Start App: http://IP_Address:port
const Port = process.env.PORT || 3003;

server.listen(Port, function () {
  console.log("API started to listening on port %d", Port);
});

// expose app
module.exports = App;
