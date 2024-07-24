const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();

router.post("/", async (req, res) => {
  const { date, amount, split, category, description, id, sharedID } =
    req.body.expense;

  console.log(req.body.expense);

  // check tripID exists

  // If it does then deconstruct the request and send into query
  await query(`INSERT INTO expenses (id, trip_id, shared_id, category, description, date, split, from_value, from_currency, to_value, to_currency) 
                                VALUES ("${id}", "${req.body.tripID}","${
    sharedID || null
  }","${category}","${description}","${date}","${Number(split)}","${
    amount.fromValue
  }","${amount.fromCurrency}","${amount.toValue}","${amount.toCurrency}")`);
});

//delete a single expense
router.delete("/:id", async (req, res) => {
  req.params.id = 101;
  const id = Number(req.params.id);

  //do checks for user ID
  if (!id) {
    return res.status(400).send({
      status: 0,
      message: "no expense id input",
    });
  }

  if (typeof id !== "number") {
    return res.status(400).send({
      status: 0,
      message: "expense id must be a number",
    });
  }

  try {
    const result = await query(deleteSingleExpense(id));
    if (result.rowCount === 0) {
      return res.status(400).send({ status: 0, message: "Expense not found" });
    }
  } catch (e) {
    res.status(400).send({
      status: 0,
      message: e,
    });
    return;
  }

  res.send({ status: 1, message: "Expense deleted succesfully" });
});

module.exports = router;
