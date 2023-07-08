const express = require("express");
const router = express.Router();
const videos = require("../data/videos.json");
const fs = require("fs");
const crypto = require("crypto");

const videosList = [];

router.route("/").get((req, res) => {
  res.send(
    "Welcome to the API! You may obtain list of videos from GET /videos, upload a video from POST /videos by passing query params `title` and `description`, and you may get the specific video details from GET videos/:videoId"
  );
});

router
  .route("/videos")
  .get((req, res) => {
    videos.map((video) => {
      const videoObj = {
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image,
      };
      videosList.push(videoObj);
    });
    res.send(videosList);
  })
  .post((req, res) => {
    const titleQuery = req.query.title;
    const descriptionQuery = req.query.description;
    const currentDate = new Date();

    if (!titleQuery || !descriptionQuery) {
      res
        .status(400)
        .send("Title and/or Description not entered parameter not entered");
    } else {
      const videoSubmit = {
        id: crypto.randomBytes(16).toString("hex"),
        title: titleQuery,
        channel: "User",
        image: "../public/images/Upload-video-preview.jpg",
        description: descriptionQuery,
        views: "0",
        likes: "0",
        duration: "3:02",
        video: "https://www.youtube.com/watch?v=moR4uw-NWLY",
        timestamp: currentDate.getTime(),
        comments: [],
      };

      const addVideo = (video) => {
        videos.push(video);
        const jsonVideos = JSON.stringify(videos, null, 4);
        fs.writeFileSync("./data/videos.json", jsonVideos);
        return video;
      };
      addVideo(videoSubmit);
      res.status(202).send("Submission received");
    }
  });
router.route("/videos/:videoId").get((req, res) => {
  const { videoId } = req.params;

  const video = videos.find((video) => {
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
