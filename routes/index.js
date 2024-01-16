const express = require("express");
const app = express();
const Router = require("express-group-router");
let router = new Router();

const middleware = require("../libraries/middleware.library");

module.exports = () => {
  router.group("/api", (auth_router) => {
    require("./auth.router")(auth_router);
  });

  router.group("/api/core", middleware.auth, (core_router) => {
    require("./dokter.router")(core_router);
    require("./jadwal.router")(core_router);
  });

  let listRoutes = router.init();
  app.use(listRoutes);
  return app;
};
