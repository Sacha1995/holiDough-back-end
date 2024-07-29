const express = require("express");
const router = express.Router();
const { getHomeCurrencyFromTripId } = require("../mySQL/queries");
const query = require("../mySQL/connection");
const { withinThreeHours } = require("../utils");

let cache = { USD: { timestamp: 12345, data: {} } };

// get conversion rates for currencies
router.get("/:tripId", async (req, res) => {
  const tripId = req.params.tripId;

  //do checks for trip ID
  if (!tripId) {
    return res.status(400).send({
      status: 0,
      message: "no trip id input",
    });
  }

  // if (typeof tripId !== "number") {
  //   return res.status(400).send({
  //     status: 0,
  //     message: "trip id must be a number",
  //   });
  // }

  //get the homecurrency
  let homeCurrency;
  try {
    result = await query(getHomeCurrencyFromTripId(), [tripId]);
    homeCurrency = result[0].home_currency;
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      status: 0,
      message: "Could not get homeCurrency",
    });
  }

  //check if the data is in the cache and less than 3 hours old
  if (cache[homeCurrency] && withinThreeHours(cache[homeCurrency].timestamp)) {
    console.log("Serving from cache");
    res.send(cache[homeCurrency].data);
    return;
  }

  //get the conversion rates
  let newData;
  try {
    newData = require(`../fakeCurrencies.json`);
    // const {data} = await query(`URLHERE${homecurrency}`);
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      status: 0,
      message: "error getting the conversion rates",
    });
  }

  cache[homeCurrency] = { timestamp: Date.now(), data: newData };

  res.send({ status: 1, data: newData });
});

module.exports = router;
