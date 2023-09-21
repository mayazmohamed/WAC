import axios from "axios";

const API_KEY = "AIzaSyAiREdIIqke4tqN4E61uIdk8u9bK0iPXXk";
const CHANNEL_ID = "UCdy-tsiOvAiO4aGWosgJtGQ";

const getAllVideoURLs = async () => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
    );

    if (response.status === 200) {
      const videoUrls = response.data.items.map((item) => {
        return `https://www.youtube.com/watch?v=${item.id.videoId}`;
      });

      return videoUrls;
    } else {
      throw new Error('Failed to fetch video URLs');
    }
  } catch (error) {
    console.error('Error fetching video URLs:', error);
    return [];
  }
};

export default getAllVideoURLs;
