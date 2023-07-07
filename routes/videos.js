const express = require("express");
const router = express.Router();
const videos = require("../data/videos.json");
const fs = require("fs");

router.route("/").get((req, res) => {
  res.send("Welcome to the API!");
});

router
  .route("/videos")
  .get((req, res) => {
    res.send(videos[1]);
  })
  .post((req, res) => {
    const id = "";
    const title = "";
    const description = "";
    const channel = "";
    const image = "";
    const views = "";
    const likes = "";
    const duration = "";
    const video = "";
    const timestamp = "";
    const comments = [];
  });
router.route("/videos/:videoId").get((req, res) => {
  const { videoId } = req.params;

  const video = videos[0].find((video) => {
    return video.id === videoId;
  });
  if (!video) {
    res.status(404);
    res.send(
      `Video ID: "${videoId}" not found in database. Check ID if entered correctly or iterate through "GET /videos" to find full list.`
    );
  }
  res.json(video);
});

router.route("*").get((req, res) => {
  res.send(
    "Path not defined. Try a different path or refer to '/' path to start."
  );
});

module.exports = router;

// 1. Adjusted videos.json file to only include one list.
// 2. Adjust GET /videos & GET /videos/:videoId to only display videos list and/or video details
