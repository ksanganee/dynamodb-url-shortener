const express = require("express");
const hbs = require("express-handlebars");
require("dotenv").config();
const bodyParser = require("body-parser");
const subdomain = require('express-subdomain');

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

app.get("/", (req, res, next) => {
  res.redirect("/url")
})

app.use(subdomain('api', require("./routes/api.js")));

app.use("/url", require("./routes/url.js"))

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
});
