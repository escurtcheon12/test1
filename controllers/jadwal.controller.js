const { BadRequestException } = require("../helpers/errors");
const { jadwalModel, dokterModel } = require("../models");

const jadwalController = {
  create: async (req, res) => {
    try {
      const {
        dokter_id,
        day,
        time_start,
        time_finish,
        quota,
        status,
        date_start,
        date_end,
      } = req.body;

      const urutanHari = [
        "senin",
        "selasa",
        "rabu",
        "kamis",
        "jumat",
        "sabtu",
        "minggu",
      ];

      if (
        !dokter_id ||
        !day ||
        !time_start ||
        !time_finish ||
        !quota ||
        !status ||
        !date_start ||
        !date_end
      ) {
        throw new BadRequestException(
          "Dokter id, hari, waktu awal, waktu akhir, kouta, status, date_start, dan date_end harus diisi semua"
        );
      }

      if (!urutanHari.includes(day.toLowerCase())) {
        throw new BadRequestException(
          "Hari harus salah satu dari: senin, selasa, rabu, kamis, jumat, sabtu, dan minggu"
        );
      }

      if (status != 1 && status != 0) {
        throw new BadRequestException(
          "Status harus mengandung 0 = false atau 1 = true"
        );
      }

      const dokterId = Number(dokter_id);
      if (!Number.isInteger(dokterId)) {
        throw new BadRequestException("Dokter id harus tipe data integer");
      }

      const getDokterById = await dokterModel.getById(dokterId);
      if (getDokterById.length == 0)
        throw new BadRequestException(
          "Data dokter tidak ada menggunakan id = " + dokterId
        );

      const startTime = Date.parse(date_start);
      const endTime = Date.parse(date_end);
      if (startTime > endTime) {
        throw new BadRequestException(
          "Tanggal awal harus lebih kecil daripada tanggal akhir"
        );
      }

      const currentTime = Date.now();
      if (startTime < currentTime || endTime < currentTime) {
        throw new BadRequestException(
          "Tanggal awal dan tanggal akhir harus pada waktu yang akan datang"
        );
      }

      const result = await jadwalModel.create({
        dokter_id,
        day,
        time_start,
        time_finish,
        quota,
        status,
        date_start,
        date_end,
      });

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
  get: async (req, res) => {
    try {
      const result = await jadwalModel.get();

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

module.exports = jadwalController;
