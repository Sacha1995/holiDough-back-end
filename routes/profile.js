const express = require("express");
const router = express.Router();
const { getProfileFromUserId } = require("../mySQL/queries");
const query = require("../mySQL/connection");

// get profile info
router.get("/", async (req, res) => {
  const id = Number(req.userId);

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
    profile = await query(getProfileFromUserId(), [id]);
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      status: 0,
      message: "could not find your profile",
    });
  }

  res.send(profile[0]);
});

module.exports = router;
