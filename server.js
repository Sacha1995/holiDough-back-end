require("dotenv").config();

const express = require("express");
const cors = require("cors");
const query = require("./mySQL/connection");
const app = express();

function request(req, res, next) {
  // console.log(req.headers, req.body);
  next();
}

async function checkToken(req, res, next) {
  const results = await query(
    `SELECT user_id FROM tokens
                                  WHERE token = ?;`,
    [req.headers.token]
  );

  // console.log("userID from checkToken", results[0].user_id);

  if (results.length === 1) {
    req.userId = results[0].user_id;
    next();
    return;
  }
  res.send({ status: 0, reason: "Bad token" });
}

app.use(cors());
app.use(express.json({ limit: "300kb" }));
app.use(request);
app.use("/user", require("./routes/user"));
app.use("/demo", require("./routes/demo"));
app.use("/expenses", checkToken, require("./routes/expenses"));
app.use("/splits", checkToken, require("./routes/splits"));
app.use("/trips", checkToken, require("./routes/trips"));
app.use("/profile", checkToken, require("./routes/profile"));
app.use("/onboarding", checkToken, require("./routes/onboarding"));
app.use("/conversion", require("./routes/conversion"));
app.use("/goodbye", require("./routes/goodbye"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});
