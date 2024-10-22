express = require("express");
app = express();

app.get("/", (req, res) => {
  res.send("hey I am up ");
});
app.listen(8080, () => {
  console.log("hey i'm listening");
});
