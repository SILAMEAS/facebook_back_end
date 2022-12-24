const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.URL_DB,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("DB connected")
);
