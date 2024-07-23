require("dotenv").config();

const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use("/demo", require("./routes/demo"));
app.use("/onboarding", require("./routes/onboarding"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
