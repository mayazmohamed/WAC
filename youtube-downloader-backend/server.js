const express = require("express");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3001; // You can change this port as needed

app.use(express.json());
app.use(cors());

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

  try {
    // Validate the YouTube URL (optional)
    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    // Get video info
    const videoInfo = await ytdl.getInfo(videoUrl);

    // Choose the audio format to download
    const audioFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestaudio' });

    // Set the file name and path
    const fileName = `${videoInfo.title}.${audioFormat.container}`;
    const filePath = path.join(__dirname, 'downloads', fileName);

    // Create a write stream to save the audio
    const fileStream = fs.createWriteStream(filePath);

    // Create a read stream to download the audio
    const audioStream = ytdl(videoUrl, { format: audioFormat });
    
    // Pipe the audio stream to the file stream to save the audio
    audioStream.pipe(fileStream);

    // Wait for the audio to finish downloading
    fileStream.on('finish', () => {
      console.log(`Audio downloaded: ${fileName}`);
      res.status(200).json({ downloadLink: `/downloads/${fileName}` });
    });
  } catch (error) {
    console.error('Error downloading audio:', error);
    res.status(500).json({ error: 'An error occurred while downloading the audio' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
