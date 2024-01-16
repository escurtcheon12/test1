const { database } = require("../config");

const jadwalModel = {
  create: (data) => {
    const {
      dokter_id,
      day,
      time_start,
      time_finish,
      quota,
      status,
      date_start,
      date_end,
    } = data;
    const query =
      "INSERT INTO jadwal (dokter_id, day, time_start, time_finish, quota, status, date_start, date_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    return new Promise((resolve, reject) => {
      database.query(
        query,
        [
          dokter_id,
          day,
          time_start,
          time_finish,
          quota,
          status,
          date_start,
          date_end,
        ],
        (err, rows, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  },
  get: () => {
    const query =
      "SELECT j.*, d.name FROM jadwal as j INNER JOIN dokter as d ON j.dokter_id = d.id";

    return new Promise((resolve, reject) => {
      database.query(query, (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
};

module.exports = jadwalModel;
