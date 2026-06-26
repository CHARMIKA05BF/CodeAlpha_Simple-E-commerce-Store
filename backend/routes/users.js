const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/users.json");

router.post("/register", (req, res) => {
  const users = JSON.parse(
    fs.readFileSync(filePath)
  );

  users.push(req.body);

  fs.writeFileSync(
    filePath,
    JSON.stringify(users, null, 2)
  );

  res.json({
    message: "User Registered"
  });
});

router.post("/login", (req, res) => {
  const users = JSON.parse(
    fs.readFileSync(filePath)
  );

  const user = users.find(
    u =>
      u.email === req.body.email &&
      u.password === req.body.password
  );

  if (user)
    res.json({
      success: true,
      user
    });
  else
    res.json({
      success: false
    });
});

module.exports = router;