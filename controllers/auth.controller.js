const { BadRequestException } = require("../helpers/errors");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models");

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        throw new BadRequestException("Username dan password harus di isi");

      const result = await userModel.getByUsernameAndPassword(
        username,
        password
      );

      if (result.length == 0)
        throw new BadRequestException("Username dan password salah");

      const token = jwt.sign({ id: result.id || "" }, "id");

      return res.json({
        status: "berhasil",
        token,
        data: result,
      });
    } catch (err) {
      return res.status(err.status || 500).json({
        status: "gagal",
        message: err.message,
      });
    }
  },
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        throw new BadRequestException("Username dan password harus di isi");

      const result = await userModel.create({ username, password });

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

module.exports = authController;
