const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();
const { addTrip } = require("../mySQL/queries");
const { tripSchema } = require("../validation/joi");
const joi = require("joi");

router.post("/", async (req, res) => {
  const trip = req.body._onboardingDetails.details;
  const tripId = req.body._onboardingDetails.tripId;

  if (!trip) {
    res.status(400).send("No trip received");
    return;
  }
  const validateTrip = tripSchema.validate(trip, { abortEarly: false });

  if (validateTrip.error) {
    res.send("Trip does not match the expected format.");
    return;
  }

  const {
    budgetTotal,
    budgetHotel,
    budgetFood,
    budgetTransport,
    budgetActivities,
    budgetOther,
    homeCurrency,
    destination,
    destinationCurrency,
    dates: { startDate, endDate, startDateIncluded, endDateIncluded },
  } = trip;

  const params = [
    req.userId,
    tripId,
    budgetTotal,
    budgetHotel,
    budgetFood,
    budgetTransport,
    budgetActivities,
    budgetOther,
    homeCurrency,
    destination,
    destinationCurrency,
    startDate,
    endDate,
    startDateIncluded,
    endDateIncluded,
  ];

  try {
    const result = await query(addTrip(), params);

    if (!result.affectedRows) {
      throw new Error("failed to send data to store");
    } else {
      res.status(200).send("trip added successfully");
      return;
    }
  } catch (e) {
    // console.log(e);
    res.status(400).send("Could not send trip to db");
    return;
  }
});

module.exports = router;
