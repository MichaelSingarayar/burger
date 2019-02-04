var express = require("express");

// Override using a query value
// To use a query string value to override the method, specify the query string key as a string argument to the methodOverride function. To then make the call, send a POST request to a URL with the overridden method as the value of that query string key. This method of using a query value would typically be used in conjunction with plain HTML <form> elements when trying to support legacy browsers but still use newer methods.
var methodOverride = require('method-override');

var app = express();

var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller");

app.use("/",routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
