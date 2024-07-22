require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use("/demo", require("./routes/demo"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
