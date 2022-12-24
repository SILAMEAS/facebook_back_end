const express = require("express");
const cors = require("cors");
const path = require("path");
const env = require("dotenv").config();
const AuthRoute = require("./routes/authRoute.js");
const app = express();
require("./db.js");
//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../uploads")));
//auth
app.use("/auth", AuthRoute);
app.get("/", (req, res) => {
  res.json({ massage: "hello" });
});

app.listen(process.env.PORT, () => {
  console.log("server running on port " + process.env.PORT);
});
