// Bcakend server setup using Express.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// importing routes
const superAdminRoutes = require("./routes/superAdminRoutes");
const adminRoutes = require("./routes/adminRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const featureRoutes = require("./routes/featureRoutes");
const userRoutes = require("./routes/userRoutes");

//Routes Connections
app.use("/super-admin", superAdminRoutes);
app.use("/admin", adminRoutes);
app.use("/organization",organizationRoutes);
app.use("/feature", featureRoutes);
app.use("/user", userRoutes);

// starting the server
app.listen(5000, () => {
  console.log("Server running on port 50001");
});