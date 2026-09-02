module.exports = async (req, res) => {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return res.status(200).json({ ok: true, source: 'fallback', items: [] });
  try {
    const q = encodeURIComponent((req.query && req.query.q) || 'GTA 6');
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&order=date&q=${q}&regionCode=ES&key=${key}`;
    const r = await fetch(url);
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ ok: false, error: (data.error && data.error.message) || 'YouTube API error' });
    return res.status(200).json({ ok: true, source: 'youtube', items: data.items || [] });
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'No se pudo consultar YouTube' });
  }
};
