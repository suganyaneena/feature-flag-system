const db = require("../config/db");

// CREATE FEATURE
exports.createFeature = (
  req,
  res
) => {
  const { feature_key, enabled } =
    req.body;

console.log('missing req',req.body);

    console.log(
      feature_key,
      enabled,
    );

  const organization_id =
    req.user.organization_id;

  db.query(
    `INSERT INTO feature_flags
    (feature_key,enabled,organization_id)
    VALUES(?,?,?)`,
    [
      feature_key,
      enabled,
      organization_id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Feature created",
      });
    }
  );
};

// GET FEATURES
exports.getFeatures = (
  req,
  res
) => {
  const organization_id =
    req.user.organization_id;

  db.query(
    `SELECT * FROM feature_flags
    WHERE organization_id=?`,
    [organization_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

// UPDATE FEATURE
exports.updateFeature = (
  req,
  res
) => {
  const { id } = req.params;

  const {
    feature_key,
    enabled,
  } = req.body;

  db.query(
    `UPDATE feature_flags
    SET feature_key=?,
    enabled=?
    WHERE id=?`,
    [
      feature_key,
      enabled,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message:
          "Feature updated",
      });
    }
  );
};

// DELETE FEATURE
exports.deleteFeature = (
  req,
  res
) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM feature_flags WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message:
          "Feature deleted",
      });
    }
  );
};

// TOGGLE STATUS ONLY
exports.toggleFeatureStatus = (
  req,
  res
) => {
  const { id } = req.params;
  const { enabled } = req.body;

  db.query(
    `UPDATE feature_flags
     SET enabled=?
     WHERE id=?`,
    [enabled, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "Status updated",
      });
    }
  );
};

