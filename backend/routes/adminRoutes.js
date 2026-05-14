const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  getEnduserCount,
} = require("../controllers/adminController");

router.post("/signup", signup);

router.post("/login", login);

router.get("/enduser-count", getEnduserCount);

module.exports = router;