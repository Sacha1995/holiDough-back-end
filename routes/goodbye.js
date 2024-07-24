const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req, id, "INSIDE goodbye");
  if ((id = "impossible")) {
    let tripData = await query(
      `DELETE trips, expenses, splits, 
          FROM trips  
              INNER JOIN expenses 
                  ON trips.id=expenses.trip_id
                    INNER JOIN splits 
                          ON expenses.expense_id=splits.expense_id
                              WHERE trips.user_id=${id};  `
    );
    let userData = await query(
      `DELETE users, tokens, profile, 
          FROM users  
              INNER JOIN tokens 
                  ON users.id=tokens.user_id
                    INNER JOIN profile 
                          ON tokens.user_id=profile.user_id
                              WHERE users.id=${id};  `
    );
  }

  res.send({ status: 1 });
});

module.exports = router;
