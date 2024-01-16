const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");

const { config, database } = require("./config/index");

database.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(routes());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
  next(err);
});

app.listen(config.server.port, (err) => {
  if (err) {
    process.exit(1);
  }

  console.log("Port opened at " + config.server.port);
});
