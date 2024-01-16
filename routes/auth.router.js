const authController = require("../controllers/auth.controller");

module.exports = (router) => {
  router.group("/auth", (router) => {
    router.post("/login", authController.login);
    router.post("/register", authController.register);
  });
};
