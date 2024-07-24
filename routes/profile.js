const express = require("express");
const router = express.Router();
const { getProfileFromUserId } = require("../mySQL/queries");
const query = require("../mySQL/connection");

// get profile info
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
    profile = await query(getProfileFromUserId(id));
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      status: 0,
      message: e,
    });
  }

  res.send(profile[0]);
});

router.post('/', (req,res)=> {
  console.log("req received",req.body.userID, req.body.userName, req.body.profilePictureSrc)

})

module.exports = router;
