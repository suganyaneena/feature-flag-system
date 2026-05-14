const express = require("express");

const router = express.Router();

const auth =
require("../middleware/auth");

const {
  createFeature,
  getFeatures,
  updateFeature,
  deleteFeature,
  toggleFeatureStatus,
  // getFeatureCount
} = require(
  "../controllers/featureController"
);

router.post(
  "/create",
  auth,
  createFeature
);

router.get(
  "/list",
  auth,
  getFeatures
);

router.put(
  "/update/:id",
  auth,
  updateFeature
);

router.put(
  "/toggle/:id",
  auth,
  toggleFeatureStatus
);

router.delete(
  "/delete/:id",
  auth,
  deleteFeature
);

// router.get(
//   "/count",
//   getFeatureCount
// );

module.exports = router;