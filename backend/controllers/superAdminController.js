const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (
    email === "admin@gmail.com" &&
    password === "123456"
  ) {
    const token = jwt.sign(
      { role: "SUPER_ADMIN" },
      "secretkey",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login success",
      token,
    });
  }

  res.status(401).json({
    message: "Invalid credentials",
  });
};
// GET total feature flag count
exports.getFeatureCount = (
  req,
  res
) => {
  //const organization_id = req.user.organization_id;

  db.query(
    `SELECT COUNT(*) AS total FROM feature_flags`,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        success: true,
        total: result[0].total,
      });
    }
  );
};
