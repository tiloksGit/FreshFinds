require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/dbconfig");
const express = require("express");
const verifyLogin = require("./middleware/authenticateMiddleware");
const app = express();
const cors = require("cors");
const PORT = 3002;

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
  res.status(200).send(`
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Fresh Finds Api</title>
        <style>
          /* Reset some default styling */
          body, h1 {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }

          /* Style for the overall body */
          body {
            background-color: #3498db; /* A calming blue */
            color: #ffffff; /* White text for contrast */
            text-align: center;
            padding: 50px;
          }

          /* Style for the heading */
          h1 {
            font-size: 3em;
            font-weight: bold;
            color: #ffffff;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Soft shadow for depth */
            margin: 20px 0;
          }

          /* Responsive design */
          @media (max-width: 768px) {
            body {
              padding: 30px;
            }
            h1 {
              font-size: 2.5em;
            }
          }
        </style>
      </head>
      <body>
        <!-- Main Content -->
        <h1>FreshFinds API Server is Up and Running!</h1>
        <p>Welcome to the FreshFinds API! Our service is up and ready to provide the freshest finds. You can access the API for various resources.</p>
        <p>Keep exploring and happy coding!</p>
      </body>
    </html>
  `);
});

app.use("/api/v0", require("./Routes/registerRoute"));
app.use("/api/v0/authenticate", require("./Routes/authenticateRoute"));
app.use("/api/v0/protected", verifyLogin, require("./Routes/protectedRoute"));
app.use("/api/v0/open", require("./Routes/openRoute"));
// mongoose.connection.once("open", () => {
//   console.log("Connected to mongoDB");
//   app.listen(PORT, () => {
//     console.log(`server listening on port ${PORT}`);
//   });
// });
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});