require("dotenv").config();
const mongoose = require("mongoose");

//función para conectar a atlas
const dbConnect = () => {
  const DB_URI = process.env.DB_URI;  
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log("*****CONEXION SUCCESFULLY*****");
      } else {
        console.log("*****CONEXION ERROR*****");
      }
    }
  );
};

module.exports = dbConnect;