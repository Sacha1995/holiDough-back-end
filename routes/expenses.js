const express = require("express");
const query = require("../mySQL/connection");
const router = express.Router();

router.post("/", async (req, res) => {
    const {date, amount, split, category, description, id, sharedID} = req.body.expense

    console.log(req.body.expense);

    // check tripID exists
    
    // If it does then deconstruct the request and send into query 
    await query(`INSERT INTO expenses (id, trip_id, shared_id, category, description, date, split, from_value, from_currency, to_value, to_currency) 
                                VALUES ("${id}", "${req.body.tripID}","${sharedID}","${category}","${description}","${date}","${Number(split)}","${amount.fromValue}","${amount.fromCurrency}","${amount.toValue}","${amount.toCurrency}")`)

});



  
  module.exports = router;