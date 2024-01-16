const dokterController = require("../controllers/dokter.controller");

module.exports = (router) => {
  router.group("/dokter", (router) => {
    router.post("/create", dokterController.create);
  });
};
