const express = require("express");
const multer = require("multer");
const AuthController = require("../controller/AuthController.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const filename =
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      ".jpg";
    req.body.profile_picture_path = filename;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/register", upload.single("image"), AuthController.register);
router.post("/login", AuthController.login);
router.get("/", AuthController.allUsers);
router.delete("/deleteAll", AuthController.DeleteAll);

module.exports = router;
