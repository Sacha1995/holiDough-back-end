const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();
const {
  getTripsFromIdUser,
  getExpensesFromIdTrip,
  getSplitsFromIdTrip,
} = require("../mySQL/queries");

// get trip info
router.get("/", async (req, res) => {
  //get the trips info from the user_id
  let trips;
  try {
    trips = await query(getTripsFromIdUser(1));
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      status: 0,
      message: e,
    });
  }

  // get the expenses per trip from the trips_id
  const tripsWithExpenses = await Promise.all(
    trips.map(async (trip) => {
      try {
        const expenses = await query(getExpensesFromIdTrip(trip.id));
        if (!expenses) {
          return { ...trip, expenses: [] };
        }
        return { ...trip, expenses };
      } catch (e) {
        console.log(e);
        return res.status(400).send({
          status: 0,
          message: "something went wrong with retrieving the expenses",
        });
      }
    })
  );

  //get splits per trip from the trips_id
  const tripsWithsplits = await Promise.all(
    tripsWithExpenses.map(async (trip) => {
      try {
        const splits = await query(getSplitsFromIdTrip(trip.id));
        if (!splits) {
          return { ...trip, splits: [] };
        }
        return { ...trip, splits };
      } catch (e) {
        console.log(e);
        return res.status(400).send({
          status: 0,
          message: "something went wrong with retrieving the splits",
        });
      }
    })
  );

  res.send(tripsWithsplits);
});

module.exports = router;
