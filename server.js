const express = require("express");
const hbs = require("express-handlebars");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express()
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(express.urlencoded({
  extended: true
}));
app.set("view engine", "hbs");
app.engine("hbs", hbs({
  extname: "hbs"
}));

app.use("/", (req, res) => {
  res.send("1")
})

app.use("/url", require("./routes/url.js"))

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
});
