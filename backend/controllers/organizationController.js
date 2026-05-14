const db = require("../config/db");

exports.createOrganization = (req, res) => {
  console.log("Received organization data:", req.body);

  const { name, email, phone_no } = req.body;

  console.log("Received organization data:", req.body);
  db.query(
    "INSERT INTO organizations(name, email, phone_no) VALUES(?,?,?)",
    [name, email, phone_no],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Organization created",
      });
    }
  );
};

// Update ORANIZATIONS
exports.updateOrganztions = (req, res) => {
  const { name, email, phone_no } = req.body;

   db.query(
    "UPDATE SET organizations(name, email, phone_no) VALUES(?,?,?)",
    [name, email, phone_no],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Organization updated.",
      });
    }
  );
}

// GET ORGANIZATIONS
exports.getOrganizations = (
  req,
  res
) => {
  db.query(
    "SELECT * FROM organizations",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

// Get ORGANIZATIONS Count
exports.getOrganizationCount = (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total FROM organizations",
    (err, result) => {
      if (err) {
        console.log("Organization count error:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      res.status(200).json({
        success: true,
        total: result[0].total,
      });
    }
  );
};
