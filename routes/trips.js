const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();
const {
  getTripsFromIdUser,
  getExpensesFromIdTrip,
  getSplitsFromIdExpenses,
} = require("../mySQL/queries");

// get trip info
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  //do checks for user ID
  if (!id) {
    return res.status(400).send({
      status: 0,
      message: "no user id input",
    });
  }

  if (typeof id !== "number") {
    return res.status(400).send({
      status: 0,
      message: "user id must be a number",
    });
  }

  //get the trips info from the user_id
  let trips = [];
  try {
    const flatTrips = await query(getTripsFromIdUser(id));

    //what to do if there are no trips??

    //put the dates info inside a dates object
    flatTrips.forEach((trip) => {
      trips.push({
        ...trip,
        dates: {
          startDate: trip.startDate,
          endDate: trip.endDate,
          startDateIncluded: trip.startDateIncluded,
          endDateIncluded: trip.endDateIncluded,
        },
      });
    });
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

        //put amount info inside amount object
        const transformedExpenses = expenses.map((expense) => ({
          ...expense,
          amount: {
            fromValue: expense.fromValue,
            fromCurrency: expense.fromCurrency,
            toValue: expense.toValue,
            toCurrency: expense.toCurrency,
          },
        }));
        return { ...trip, expenses: transformedExpenses };
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
  const tripsComplete = await Promise.all(
    tripsWithExpenses.map(async (trip) => {
      if (!trip.expenses || trip.expenses.length === 0) {
        return { ...trip, splits: [] };
      }
      const splits = [];

      //go through each expense and see if there is a split
      for (const expense of trip.expenses) {
        try {
          const expenseSplits = await query(
            getSplitsFromIdExpenses(expense.id)
          );
          if (!expenseSplits) {
            return;
          }

          //if there are splits with this expense push them into the array of splits and create an amount object
          if (expenseSplits) {
            expenseSplits.forEach((split) => {
              splits.push({
                ...split,
                amount: {
                  fromValue: split.fromValue,
                  fromCurrency: split.fromCurrency,
                  toValue: split.toValue,
                  toCurrency: split.toCurrency,
                },
              });
            });
          }
        } catch (e) {
          console.log(e);
          return res.status(400).send({
            status: 0,
            message:
              "something went wrong with retrieving the splits per expense",
          });
        }
      }
      return { ...trip, splits };
    })
  );

  res.send(tripsComplete);
});

module.exports = router;
