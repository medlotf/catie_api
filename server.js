const express = require("express")
const bodyParser = require("body-parser")
var cors = require('cors');

const app = express()

app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.json({ message: "test" });
});

require("./app/routes/question.routes.js")(app);
require("./app/routes/response.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});