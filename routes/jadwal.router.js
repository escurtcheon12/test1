const jadwalController = require("../controllers/jadwal.controller");

module.exports = (router) => {
  router.group("/jadwal", (router) => {
    router.post("/create", jadwalController.create);
    router.get("/get", jadwalController.get);
  });
};
