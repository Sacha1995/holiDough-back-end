const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();
const { addTrip } = require("../mySQL/onboardingQueries");

router.post("/", async (req, res) => {
  const results = await query(`SHOW TABLES;`);
  const trip = req.body._onboardingDetails.details;

  if (!trip) {
    res.status(400).send("No trip received");
    return;
  }
  try {
    const result = await query(addTrip(trip));
    console.log(addTrip(trip))
    console.log(result);
    if (!result.affectedRows) {
      throw new Error("failed to send data to store");
    } else {
      res.status(200).send("trip added successfully");
      return;
    }
  } catch (e) {
    // console.log(e)
    res.status(400).send("Could not send trip to db");
    return;
  }
});

module.exports = router;
