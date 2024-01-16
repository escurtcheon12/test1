const { BadRequestException } = require("../helpers/errors");
const { jadwalModel, dokterModel, detailJadwalModel } = require("../models");

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
        "minggu",
        "senin",
        "selasa",
        "rabu",
        "kamis",
        "jumat",
        "sabtu",
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
          "Dokter id, hari, waktu awal, waktu akhir, kouta, status, tanggal awal, dan tanggal akhir harus diisi semua"
        );
      }

      if (!urutanHari.includes(day.toLowerCase())) {
        throw new BadRequestException(
          "Hari harus salah satu dari: senin, selasa, rabu, kamis, jumat, sabtu, dan minggu"
        );
      }

      if (time_start == time_finish)
        throw new BadRequestException("Waktu awal dan waktu akhir jangan sama");

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
      const currentDate = new Date(currentTime);

      const startDateTime = new Date(date_start);
      const endDateTime = new Date(date_end);

      currentDate.setHours(0, 0, 0, 0);
      startDateTime.setHours(0, 0, 0, 0);
      endDateTime.setHours(0, 0, 0, 0);

      if (
        startDateTime.getTime() < currentDate.getTime() ||
        endDateTime.getTime() < currentDate.getTime()
      ) {
        throw new BadRequestException(
          "Tanggal awal dan tanggal akhir harus pada waktu yang akan datang dari tanggal saat ini"
        );
      }

      const findDayIndex = urutanHari.indexOf(day.toLowerCase());
      let dataDayInRange = [];
      for (
        let startDate = new Date(startDateTime);
        startDate <= endDateTime;
        startDate.setDate(startDate.getDate() + 1)
      ) {
        if (startDate.getDay() == findDayIndex) {
          dataDayInRange.push(new Date(startDate));
        }
      }

      if (dataDayInRange.length == 0)
        throw new BadRequestException(
          "Tidak ada hari " +
            day +
            " dari range " +
            date_start +
            " sampai " +
            date_end
        );

      const getByNameAndDate = await dokterModel.getByIdAndDate(
        dokterId,
        dataDayInRange
      );

      if (getByNameAndDate.length > 0)
        throw new BadRequestException(
          "Jadwal dokter setiap hari " +
            day +
            " dari tanggal " +
            date_start +
            " sampai tanggal " +
            date_end +
            " sudah terisi"
        );

      const createJadwal = await jadwalModel.create({
        dokter_id,
        day,
        time_start,
        time_finish,
      });

      for (const itemDate of dataDayInRange) {
        await detailJadwalModel.create({
          jadwal_id: createJadwal.insertId,
          quota,
          status,
          created_at: itemDate,
        });
      }

      return res.json({
        status: "berhasil",
        data: createJadwal,
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
