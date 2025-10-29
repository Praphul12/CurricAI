
export const fetchVideos = async (query) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&maxResults=1&key=${process.env.YT_API_KEY}`;

    const r = await fetch(url);
    const data = await r.json();
    const videoId = data.items?.[0]?.id?.videoId;
    return videoId || null;
  } catch (err) {
    console.error("YouTube fetch error:", err);
    return null;
  }
};


