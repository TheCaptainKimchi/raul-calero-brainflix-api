const express = require("express");
const router = express.Router();
const app = express();
const videosRoutes = require("./routes/videos");
const cors = require("cors");

app.use(cors());
app.use(express.static("public"));

app.use("/", videosRoutes);

app.listen(8080, () => {
  console.log("Server Started on http://localhost:8080");
});
