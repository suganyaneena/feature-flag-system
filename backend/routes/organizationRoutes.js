const express = require("express");
const router = express.Router();

const {
  createOrganization,  getOrganizations, getOrganizationCount

} = require("../controllers/organizationController");

router.post("/create", createOrganization);
router.get("/list", getOrganizations);
router.get("/count", getOrganizationCount);

module.exports = router;