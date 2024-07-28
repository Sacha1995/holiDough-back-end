const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();
const Joi = require("joi");
const {
  addExpense,
  deleteMultidayExpense,
  deleteSingleExpense,
} = require("../mySQL/queries");

const schema = Joi.object({
  date: Joi.number().required(),
  amount: Joi.object({
    fromValue: Joi.number().required(),
    toValue: Joi.number().required(),
    fromCurrency: Joi.string().required(),
    toCurrency: Joi.string().required(),
  }),
  split: Joi.boolean().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  sharedId: Joi.string().allow(null),
  id: Joi.string().required(),
});

router.post("/", async (req, res) => {
  const validation = schema.validate(req.body.expense, { abortEarly: false });
  const { date, amount, split, category, description, id, sharedId } =
    req.body.expense;

  if (validation.error) {
    console.log("Error 2", validation.error);
    res.status(418).send(validation.error.details);
    return;
  }

  //create array of params to send to SQL
  const params = [
    id,
    req.body.tripID,
    sharedId || "",
    category,
    description,
    date,
    Number(split),
    amount.fromValue,
    amount.fromCurrency,
    amount.toValue,
    amount.toCurrency,
  ];

  let expenseId;

  try {
    const result = await query(addExpense(), params);
    expenseId = result.insertId;
    console.log(">>>>>", result.insertId);
  } catch (e) {
    console.log(e);
    return res.send({
      status: 0,
      message: "something went wrong with adding the expense",
    });
  }

  // console.log("ADD", result, Date.now())
  res.send({ status: 1, expenseId: expenseId });
});

router.delete("/shared/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req, id, "INSIDE Shared");
  let result = await query(deleteMultidayExpense(), [id]);
  console.log(result, "YOOHOO");
  res.send({ status: 1 });
});

router.delete("/id/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id, "INSIDE");
  let result = await query(deleteSingleExpense(), [id]);
  console.log(result, "YOOHOO");
  res.send({ status: 1 });
});

module.exports = router;
