const { database: mysql } = require("../config");

const jadwalModel = {
  create: (data) => {
    const { dokter_id, day, time_start, time_finish } = data;
    const query =
      "INSERT INTO jadwal (dokter_id, day, time_start, time_finish) VALUES (?, ?, ?, ?)";

    return new Promise((resolve, reject) => {
      mysql.query(
        query,
        [dokter_id, day, time_start, time_finish],
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
      "SELECT j.*, d.name, dj.* FROM jadwal as j INNER JOIN dokter as d ON j.dokter_id = d.id INNER JOIN detail_jadwal as dj ON j.id = dj.jadwal_id";

    return new Promise((resolve, reject) => {
      mysql.query(query, (err, rows, fields) => {
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
