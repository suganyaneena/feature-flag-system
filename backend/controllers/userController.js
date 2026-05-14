const db = require("../config/db");

exports.checkFeature = (
  req,
  res
) => {
  const {
    feature_key,
    organization_id,
  } = req.body;

  db.query(
    `SELECT * FROM feature_flags
    WHERE feature_key=?
    AND organization_id=?`,
    [feature_key, organization_id],
    (err, result) => {
      if (result.length === 0) {
        return res.json({
          enabled: false,
        });
      }

      res.json({
        enabled: result[0].enabled,
      });
    }
  );
};