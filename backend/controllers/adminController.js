const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
  const {
    name,
    email,
    password,
    organization_id,
  } = req.body;

  const hashedPassword =
    await bcrypt.hash(password, 10);
  db.query(
    `INSERT INTO users
    (name,email,password,role,organization_id)
    VALUES(?,?,?,?,?)`,
    [
      name,
      email,
      hashedPassword,
      "ORG_ADMIN",
      organization_id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Signup success",
      });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    // "SELECT * FROM users WHERE email=?",
    "SELECT users.*, organizations.name as org_name FROM users LEFT JOIN organizations ON users.organization_id = organizations.id WHERE users.email = ?",
    [email],
    async (err, result) => {
      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      console.log('User Details', user);

      const valid =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!valid) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          organization_id:
            user.organization_id,
          organization_name: user.org_name,
        },
        "secretkey",
        { expiresIn: "1d" }
      );

      res.json({
        token,
        user,
      });
    }
  );
};

// Get End user Count
exports.getEnduserCount = (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total FROM users",
    (err, result) => {
      if (err) {
        console.log("End user count error:", err);
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