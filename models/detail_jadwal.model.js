const { database: mysql } = require("../config");

const detailJadwalModel = {
  create: (data) => {
    const { jadwal_id, quota, status, created_at } = data;

    const query =
      "INSERT INTO detail_jadwal (jadwal_id, quota, status, created_at) VALUES (?,?,?,?)";

    return new Promise((resolve, reject) => {
      mysql.query(
        query,
        [jadwal_id, quota, status, created_at],
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
};

module.exports = detailJadwalModel;
