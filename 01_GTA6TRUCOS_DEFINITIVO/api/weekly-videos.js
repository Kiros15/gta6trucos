// YouTube Data API key stays on the server. Configure YOUTUBE_API_KEY in Vercel.
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=3600');
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return res.status(503).json({ error: 'youtube_not_configured' });
  try {
    const cutoff = new Date(Date.now() - 7 * 86400000).toISOString();
    const searches = await Promise.all(['GTA 6', 'Grand Theft Auto VI'].map(q => {
      const params = new URLSearchParams({ part: 'snippet', type: 'video', videoEmbeddable: 'true', videoDuration: 'medium', order: 'viewCount', maxResults: '50', q, publishedAfter: cutoff, key });
      return fetch('https://www.googleapis.com/youtube/v3/search?' + params).then(r => { if (!r.ok) throw new Error('search_failed'); return r.json(); });
    }));
    const ids = [...new Set(searches.flatMap(s => (s.items || []).map(v => v.id?.videoId).filter(Boolean)))];
    if (!ids.length) return res.status(200).json({ updatedAt: new Date().toISOString(), cutoff, videos: [] });
    const batches = await Promise.all(Array.from({ length: Math.ceil(ids.length / 50) }, (_, i) => {
      const params = new URLSearchParams({ part: 'snippet,statistics,status', id: ids.slice(i * 50, (i + 1) * 50).join(','), key });
      return fetch('https://www.googleapis.com/youtube/v3/videos?' + params)
        .then(r => { if (!r.ok) throw new Error('videos_failed'); return r.json(); });
    }));
    const videos = batches.flatMap(batch => batch.items || []).filter(v => {
      const title = v.snippet?.title || '';
      return v.status?.embeddable === true && v.status?.privacyStatus === 'public'
        && new Date(v.snippet?.publishedAt) >= new Date(cutoff)
        && /(?:gta\s*(?:6|vi)|grand theft auto\s*(?:6|vi))/i.test(title)
        && !/gta\s*(?:5|v|online)\b/i.test(title)
        && !/^(?:#shorts|live\b)/i.test(title);
    }).map(v => ({
      id: v.id, title: v.snippet.title, channel: v.snippet.channelTitle,
      publishedAt: v.snippet.publishedAt, views: Number(v.statistics?.viewCount || 0),
      thumbnail: v.snippet.thumbnails?.medium?.url || ''
    })).sort((a, b) => b.views - a.views).slice(0, 5);
    res.status(200).json({ updatedAt: new Date().toISOString(), cutoff, videos });
  } catch (error) {
    res.status(502).json({ error: 'youtube_unavailable' });
  }
};

