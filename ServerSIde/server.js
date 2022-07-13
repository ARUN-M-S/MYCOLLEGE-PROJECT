const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || process.env.PORT_API;

const app = express();

app.use(express.json());
app.use(cors());

//register the route
app.use("/api/auth/", authRoutes);
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server Listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DataBase connection Failed, Server is not started");
    console.log(err);
  });
