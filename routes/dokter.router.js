const dokterController = require("../controllers/dokter.controller");
const library = require("../libraries/middleware.library");

module.exports = (router) => {
  router.group("/dokter", library.jwt_verify, (router) => {
    router.post("/create", dokterController.create);
  });
};
