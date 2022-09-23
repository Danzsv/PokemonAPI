require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo.js");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env;

app.use("/api", require("./routes"));

app.listen(PORT, () => {
  console.log(`API Pokemon PI is ready in port ${PORT}`);
});

dbConnect();
