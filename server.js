require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/dbconfig");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("hey I am up ");
});

app.use("/api/v0", require("./Routes/registerRoute"));

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(3000, () => {
    console.log(`server listening on port ${3000}`);
  });
});
