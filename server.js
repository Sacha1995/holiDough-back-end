require("dotenv").config();

const express = require("express");
const cors = require("cors");
const query = require("./mySQL/connection");
const app = express();

async function checkToken(req, res, next) {
  const results = await query(
    `SELECT user_id FROM tokens
                                  WHERE token = ?;`,
    [req.headers.token]
  );

  console.log("tokenresults", results);

  if (results.length === 1) {
    req.userId = results[0].user_id;
    next();
    return;
  }
  res.send({ status: 0, reason: "Bad token" });
}

app.use(cors());
app.use(express.json({ limit: "300kb" }));
app.use("/user", require("./routes/user"));
app.use("/demo", require("./routes/demo"));
app.use("/expenses", require("./routes/expenses"));
app.use("/splits", require("./routes/splits"));
app.use("/trips", checkToken, require("./routes/trips"));
app.use("/profile", checkToken, require("./routes/profile"));
app.use("/onboarding", require("./routes/onboarding"));
app.use("/conversion", require("./routes/conversion"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});
