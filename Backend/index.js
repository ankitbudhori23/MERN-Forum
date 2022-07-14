const express = require("express");
const cors = require("cors");

const route = require("./routes/ind");
require("./db");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", route);
// For Home Page
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(5000, () => {
  console.log("Db started at port 5000");
});
