const express = require("express");
const path = require("path");
const hbs = require("hbs"); // <--Partials ka code
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 80;

require("./db/conn"); // including Conn file
const ieducateCollection = require("./models/schema"); // Including Schema file

// Public Static Path
const static_path = path.join(__dirname, "../public"); // <--static stuff ka path
const template_path = path.join(__dirname, "../templates/views"); // <--- views dir ka path
const partials_path = path.join(__dirname, "../templates/partials"); // <--- Partials dir ka path

// If we dont using POSTMAN
app.use(express.json());

// To get Form Data
app.use(express.urlencoded({ extended: false }));

// To use Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine Specific
app.set("view engine", "hbs");
app.set("views", template_path); // views folder changed to templates
hbs.registerPartials(partials_path); //<= hbs nay partials dir ko register kr liya &&  Auto-Save K Leye => nodemon src/app.js -e js,hbs

app.use(express.static(static_path));

// End Points -- Routing
app.get("/", function (req, res) {
  res.render("index");
});

app.post("/index", async (req, res) => {
  const PostiEducate = new ieducateCollection({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  });
  PostiEducate.save();
  res.redirect("#myhome");
});

// Listening on this Port
app.listen(port, () => {
  console.log(`Listening to the port at ${port}`);
});
