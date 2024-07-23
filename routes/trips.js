const express = require("express");
const router = express.Router();
const { getAndStructureData } = require("../utils");

// get trip info
router.get("/:id", async (req, res) => {
  req.params.id = 1;
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

  //get and structure the data
  try {
    tripsComplete = await getAndStructureData(id);
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      status: 0,
      message: e,
    });
  }

  res.send(tripsComplete);
});

module.exports = router;
