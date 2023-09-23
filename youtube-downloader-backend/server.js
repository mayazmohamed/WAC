const express = require("express");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 3001; // You can change this port as needed
const cron = require('node-cron');

app.use(express.json());
app.use(cors());

cron.schedule('0 4 * * *', async () => {


  let videoURLs = [];
    let nextPageToken = '';

    do {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAj50aNoOaVvPzvzxFy9B-f8FkHA53bzdk&channelId=UCdy-tsiOvAiO4aGWosgJtGQ&part=snippet,id&order=date&maxResults=50&pageToken=${nextPageToken}`
            );

            // Extract video URLs and add them to the array
            const videos = response.data.items;
            videoURLs = videoURLs.concat(
                videos.map((video) => `https://www.youtube.com/watch?v=${video.id.videoId}`)
            );

            // Check if there are more pages of results
            nextPageToken = response.data.nextPageToken;
        } catch (error) {
            console.error('Error fetching video data:', error);
            break; // Exit the loop on error
        }
    } while (nextPageToken);

    console.log(videoURLs);
    fs.writeFileSync(path.join(__dirname, 'urls/videoUrls.json'), `{ "videos": [\n${videoURLs.map((url) => `"${url}"`).join(',\n')}\n] }`);

});

// Define a route to handle video downloads
app.get('/download', async (req, res) => {
  var URL = req.query.URL;
  console.log(URL);
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');

  ytdl(URL, {
    format: "mp4",
  }).pipe(res);
}
);

app.post('/download', async (req, res) => {
  const { videoUrl } = req.body;


});

app.get('/download-audio', async (req, res) => {
  var URL = req.query.URL;
  console.log(URL);
  res.header('Content-Disposition', 'attachment; filename="audio.mp3"');

  ytdl(URL, {
    format: "mp3",
  }).pipe(res);
}
);

app.get('/urls', async (req, res) => {
  const urls = fs.readFileSync(path.join(__dirname, 'urls/videoUrls.json'), 'utf-8')
  res.send(urls)
})

app.post('/urls', async (req, res) => {
  const { url } = req.body;
  console.log(url);
  const file = fs.readFileSync(path.join(__dirname, 'urls/videoUrls.json'), 'utf-8')
  const newFile = file.replace('"videos":[\n', `"videos":[\n"${url}",\n`);
  fs.writeFileSync(path.join(__dirname, 'urls/videoUrls.json'), newFile)
  res.send('ok')
}
);

// app.get('/test', async (req, res) => {
//   try{
//   const data = await fetch('package.json', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   res.send(data)
// }catch(err){
//   console.log(err);
// }
// })


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
