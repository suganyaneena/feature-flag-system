const express = require("express");

const router = express.Router();

const {
  checkFeature,
} = require(
  "../controllers/userController"
);

router.post(
  "/check",
  checkFeature
);

module.exports = router;