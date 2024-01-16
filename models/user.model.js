const { database } = require("../config");

const userModel = {
  create: (data) => {
    const { username, password } = data;
    const query = "INSERT INTO user (username, password) VALUES (?, ?)";

    return new Promise((resolve, reject) => {
      database.query(query, [username, password], (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  getByUsernameAndPassword: (username, password) => {
    const query = "SELECT * FROM user WHERE username = ? AND password = ?";

    return new Promise((resolve, reject) => {
      database.query(query, [username, password], (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
};

module.exports = userModel;
