const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();
const Joi = require("joi");
const {
  addExpense,
  deleteMultiExpense,
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
  id: Joi.string().required(),
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
    // console.log("Error 2", validation.error);
    res.status(418).send({status:0});
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

  try {
    await query(addExpense(), params);
  } catch (e) {
    // console.log(e);
    return res.send({
      status: 0,
      message: "something went wrong with adding the expense",
    });
  }

  res.send({ status: 1 });
});

router.delete("/shared/:id", async (req, res) => {
  let id = req.params.id;
  // need to add checks for sharedid

  try {
    let result = await query(deleteMultiExpense(), [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        status: 0,
        message: `ID not found`,
      });
    }

    // console.log(
    //   `Deleted ${result.affectedRows} expenses with shared_id: ${id}`
    // );
    res.send({ status: 1, message: `Deleted expense/s` });
  } catch (error) {
    // console.error(`Error deleting expenses with shared_id: ${id}`, error);
    res.status(400).send({
      status: 0,
      message: "Failed to delete expenses",
    });
  }
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  // need to add checks for id
  // console.log(id, "INSIDE");

  try {
    const result = await query(deleteSingleExpense(), [id]);

    // console.log(result);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ status: 0, message: `Expense ID not found` });
    }

    // console.log(`Deleted expense with id: ${id}`);
    res.send({
      status: 1,
      message: `Delete successful`,
    });
  } catch (error) {
    // console.error(`Error deleting expense with id: ${id}`, error);
    res.status(500).send({
      status: 0,
      message: "Failed to delete expense",
    });
  }
});

module.exports = router;
