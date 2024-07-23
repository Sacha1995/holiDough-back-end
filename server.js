require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/user", require("./routes/user"));
app.use("/demo", require("./routes/demo"));
app.use("/expenses", require("./routes/expenses"))
<<<<<<< HEAD
app.use("/splits", require("./routes/splits"))
=======
app.use("/trips", require("./routes/trips"));
app.use("/onboarding", require("./routes/onboarding"));
>>>>>>> master

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
