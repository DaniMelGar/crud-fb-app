const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");

const app = express();
admin.initializeApp({
  credential: admin.credential.cert("./permissions.json"),
  databaseURL: "",
});

app.get("/hello", (req, res) => {
  return res.status(200).json({ message: "Hello world" });
});

app.use(require("./routes/user.routes"));

exports.app = functions.https.onRequest(app);
