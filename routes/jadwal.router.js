const jadwalController = require("../controllers/jadwal.controller");
const library = require("../libraries/middleware.library");

module.exports = (router) => {
  router.group("/jadwal", library.jwt_verify, (router) => {
    router.post("/create", jadwalController.create);
    router.get("/get", jadwalController.get);
  });
};
