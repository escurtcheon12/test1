const { BadRequestException } = require("../helpers/errors");
const { dokterModel } = require("../models");

const dokterController = {
  create: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) throw new BadRequestException("Nama dokter harus di isi");

      const result = await dokterModel.create({ name });

      return res.json({
        status: "berhasil",
        data: result,
      });
    } catch (err) {
      return res.status(err.status || 500).json({
        status: "gagal",
        message: err.message,
      });
    }
  },
};

module.exports = dokterController;
