const { database: mysql } = require("../config");

const dokterModel = {
  create: (data) => {
    const { name } = data;
    const query = "INSERT INTO dokter (name) VALUES (?)";

    return new Promise((resolve, reject) => {
      mysql.query(query, [name], (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  getById: (id) => {
    const query = "SELECT * FROM dokter WHERE id = ?";

    return new Promise((resolve, reject) => {
      mysql.query(query, [id], (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  getByIdAndDate: (id, date) => {
    const query =
      "SELECT d.* FROM dokter AS d INNER JOIN jadwal AS j ON j.dokter_id = d.id INNER JOIN detail_jadwal AS dj ON dj.jadwal_id = j.id WHERE d.id = ? AND dj.created_at IN (?)";

    return new Promise((resolve, reject) => {
      mysql.query(query, [id, date], (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
};

module.exports = dokterModel;
