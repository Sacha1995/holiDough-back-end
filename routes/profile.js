const express = require("express");
const router = express.Router();
const { getProfileFromUserId, addProfile } = require("../mySQL/queries");
const query = require("../mySQL/connection");
const { profileSchema } = require("../validation/joi");
const joi = require("joi");

// get profile info
router.get("/", async (req, res) => {
  const id = req.userId;

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

  //The below has already been sanitised on insertion
  res.send(profile[0]);
});

router.post("/", async (req, res) => {
  const validateProfile = profileSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validateProfile.error) {
    res.send("Profile info does not match the expected format.");
    return;
  }

  const { userName, profilePictureSrc } = req.body;
  const params = [req.userId, userName, profilePictureSrc];

  try {
    const result = await query(addProfile(), params);
    console.log(result);
    if (!result.affectedRows) {
      throw new Error("failed to send data to store");
    } else {
      res.status(200).send("profile added successfully");
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("Could not send profile to db");
    return;
  }
});

module.exports = router;
