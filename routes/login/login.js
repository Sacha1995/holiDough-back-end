const express = require("express");
const query = require("../../mySQL/connection");
const router = express.Router();

router.get("/", async (req, res) => {
  const results = await query(`SHOW TABLES;`);
  console.log(results);
  res.send(results);
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const results = await query(
    `INSERT INTO users (email, hashed_password) VALUES ('${email}', '${password}')`
  );
  res.send({ results, status: 1 });
});

module.exports = router;
