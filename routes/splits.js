const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();
const Joi = require("joi");
const { addSplit } = require("../mySQL/queries");

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
  expenseId: Joi.string().required(),
  sharedId: Joi.string().allow(null),
});

router.post("/", async (req, res) => {
  const validation = schema.validate(req.body.billSplit, { abortEarly: false });
  const { date, amount, paid, name, description, id, expenseId } =
    req.body.billSplit;
  const { fromValue, fromCurrency, toValue, toCurrency } = amount;

  if (validation.error) {
    console.log("Error", validation.error);
    res.status(418).send(validation.error.details);
    return;
  }

  console.log("Adding splits");

  // check tripID exists, I don't think you need tripID.

  // If it does then deconstruct the request and send into query
  const params = [
    id,
    expenseId,
    sharedId || "",
    name,
    description,
    date,
    Number(paid),
    fromValue,
    fromCurrency,
    toValue,
    toCurrency,
  ];
  try {
    const result = await query(addSplit(), params);
    console.log(result);
  } catch (e) {
    console.log(e);
    res
      .status(418)
      .send({ status: 0, message: "could not put split in database" });
  }

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
