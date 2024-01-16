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
};

module.exports = dokterModel;
