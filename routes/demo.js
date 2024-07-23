const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();

router.get("/", async (req, res) => {
  const results = await query(`SHOW TABLES;`);
});

module.exports = router;
