require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Database = require("./app/config/db");

require("./app/model/index.model");

const router = require("./app/router/index");
app.use("/api", router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Running At ${port}`);
});
