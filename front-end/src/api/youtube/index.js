import axios from 'axios';

const API_KEY = 'AIzaSyASI3I6mB5eaGE869SRa5wRdDw8m1LfjEk';
const CHANNEL_USERNAME = '@user-uz4qi2uo8f';
const CHANNEL_ID = '@user-uz4qi2uo8f';



// If you're running this code in Node.js, you'll need the 'node-fetch' library

async function getChannelId(channelName) {
      const apiKey = 'AIzaSyASI3I6mB5eaGE869SRa5wRdDw8m1LfjEk'; // Replace with your YouTube Data API key
      const apiUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&forUsername=${channelName}&part=id`;

      try {
        const response = await axios.get(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const channelId = data.items[0].id;
          return channelId;
        } else {
          throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
}

const channelName = '@user-uz4qi2uo8f';
getChannelId(channelName)
  .then(channelId => {
    console.log(`Channel ID for ${channelName}: ${channelId}`);
  })
  .catch(error => {
    console.error('Error:', error);
  });









const getAllVideoURLs = async () => {
    let videoURLs = [];
    let nextPageToken = '';

    do {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&pageToken=${nextPageToken}`
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

    return videoURLs;
};

export default getAllVideoURLs;
