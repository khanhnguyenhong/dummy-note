require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.use(
  express.static(path.join(__dirname, "dummy-note-web/dist/dummy-note-web")),
);

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "dummy-note-web/dist/dummy-note-web/index.html"),
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
