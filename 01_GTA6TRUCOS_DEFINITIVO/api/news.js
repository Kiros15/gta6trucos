const { createClient } = require('@supabase/supabase-js');

function client() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

module.exports = async (req, res) => {
  const supabase = client();
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  if (!supabase) return res.status(503).json({ configured: false, news: [] });

  try {
    const lang = req.query.lang === 'en' ? 'en' : 'es';
    const slug = req.query.slug || null;
    let query = supabase.from('news').select('*').eq('published', true).order('published_at', { ascending: false });
    if (slug) query = query.eq(lang === 'en' ? 'slug_en' : 'slug_es', slug).limit(1);
    else query = query.limit(50);
    const { data, error } = await query;
    if (error) throw error;
    return res.status(200).json({ configured: true, news: data || [] });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ configured: true, news: [], error: 'news_fetch_failed' });
  }
};
