const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();
const { createRoles, createAdmin } = require("./libs/initialSetup");

const server = express();
createRoles();
createAdmin();
server.use(cors());

server.name = "API";

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(morgan("dev"));
server.use(helmet());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
      "script-src": ["https://js.stripe.com/", "https://travel-app-group-project.vercel.app/", "https://checkout.stripe.com/", "https://travelapp-x6lf.onrender.com/", "https://apis.google.com/", "https://apis.google.com/js/api.js"],
      'script-src-elem': ["https://js.stripe.com/", "https://checkout.stripe.com/", "https://travel-app-group-project.vercel.app/", "https://travelapp-x6lf.onrender.com/", "https://apis.google.com/", "https://apis.google.com/js/api.js"],  
      'frame-src': ["https://checkout.stripe.com/", "https://accounts.google.com/"]
    },
  })
);

server.use("/", routes);
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "./client/build")));
  server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
} else {
  server.get("/", (req, res) => {
    res.send("API Running");
  });
}

module.exports = server;
