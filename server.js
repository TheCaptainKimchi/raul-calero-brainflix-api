const express = require("express");
const app = express();
const videosRoutes = require("./routes/videos");

// NEW CODE
// when the server receives a GET request to '/'
app.use("/", videosRoutes);

app.listen(8080, () => {
  console.log("Server Started on http://localhost:8080");
});
