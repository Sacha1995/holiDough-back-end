const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();
const Joi = require("joi");

const schema = Joi.object({
  date: Joi.number().required(),
  amount: Joi.object({
    fromValue: Joi.number().required(),
    toValue: Joi.number().required(),
    fromCurrency: Joi.string().required(),
    toCurrency: Joi.string().required(),
  }),
  paid: Joi.boolean().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  id: Joi.string().required(),
  expenseID: Joi.string(),
});

router.post("/", async (req, res) => {
  const validation = schema.validate(req.body.billSplit, { abortEarly: false });
  const { date, amount, paid, name, description, id, expenseID } =
    req.body.billSplit;

  if (validation.error) {
    console.log("Error", validation.error);
    res.status(418).send(validation.error.details);
    return;
  }

  console.log("Adding splits");

  // check tripID exists

  // If it does then deconstruct the request and send into query
  await query(`INSERT INTO splits (id, expense_id, shared_id, name, description, date, paid, from_value, from_currency, to_value, to_currency) 
                                VALUES ("${id}", "${expenseID}","${null}","${name}","${description}","${date}","${Number(
    paid
  )}","${amount.fromValue}","${amount.fromCurrency}","${amount.toValue}","${
    amount.toCurrency
  }")`);

  res.send({ status: 1 });
});

router.delete("/id/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id, "INSIDE");
  let result = await query(
    `DELETE FROM splits WHERE splits.expense_id = "${id}"`
  );
  console.log(result, "YOOHOO");
  res.send({ status: 1 });
});

module.exports = router;
