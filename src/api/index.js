const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let users = [];
app.post("/api/register", (req, res) => {
  const userData = req.body.formData;
  console.log(userData);
  if (!userData.firstName || !userData.lastName) {
    return res
      .status(400)
      .json({ message: "First name and last name are required." });
  }

  users.push(userData);

  res.status(201).json({ message: "User registered successfully!", userData });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
