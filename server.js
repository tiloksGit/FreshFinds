require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/dbconfig");
const express = require("express");
const verifyLogin = require("./middleware/authenticateMiddleware");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(
  cors({
    origin: "*",
  })
);

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
app.use("/api/v0/authenticate", require("./Routes/authenticateRoute"));
app.use("/api/v0/protected", verifyLogin, require("./Routes/protectedRoute"));
app.use("/api/v0/open", require("./Routes/openRoute"));
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
});
