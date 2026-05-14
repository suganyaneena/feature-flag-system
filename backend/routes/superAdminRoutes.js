const express = require("express");
const router = express.Router();

const {
  login,
  getFeatureCount
} = require("../controllers/superAdminController");

router.post("/login", login);
router.get("/count", getFeatureCount);

module.exports = router;