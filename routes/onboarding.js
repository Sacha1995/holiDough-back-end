const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();
const { addTrip } = require("../mySQL/onboardingQueries");

router.post("/", async (req, res) => {
  const results = await query(`SHOW TABLES;`);
  const trip = req._onboardingDetails; //figure out how to access this
  if (!trip) {
    res.status(400).send("No trip received");
    return;
  }
  try {
    const result = query(addTrip(trip));
    if (!result.length) {
      throw new Error("failed to send data to store");
    } else {
      res.status(200).send("trip added successfully");
      return;
    }
  } catch (e) {
    res.status(400).send("Could not send trip to db", e);
    return;
  }
});

module.exports = router;
