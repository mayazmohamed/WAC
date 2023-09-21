const axios = require("axios");
const fs = require("fs");

const getVideos = async (url) => {
  const videoUrl = url;
  const outputFilePath = "output.mp4"; // Change the file name and extension as needed

  await axios({
    method: "get",
    url: videoUrl,
    responseType: "stream",
  })
    .then((response) => {
      const writer = fs.createWriteStream(outputFilePath);

      response.data.pipe(writer);

      writer.on("finish", () => {
        console.log("Video downloaded successfully.");
      });

      writer.on("error", (err) => {
        console.error("Error downloading the video:", err);
      });
    })
    .catch((err) => {
      console.error("Error fetching the video URL:", err);
    });
};

export default getVideos;
