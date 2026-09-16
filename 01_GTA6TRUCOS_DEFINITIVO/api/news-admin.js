const { createClient } = require('@supabase/supabase-js');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  const auth = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!process.env.NEWS_ADMIN_TOKEN || auth !== process.env.NEWS_ADMIN_TOKEN) return res.status(401).json({ error: 'unauthorized' });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(503).json({ error: 'supabase_not_configured' });
  try {
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession:false } });
    const allowed = ['slug_es','slug_en','title_es','title_en','excerpt_es','excerpt_en','content_es','content_en','image','category','tags','source_name','source_url','published_at','published','featured'];
    const row = Object.fromEntries(Object.entries(req.body || {}).filter(([k]) => allowed.includes(k)));
    const { data, error } = await sb.from('news').insert(row).select().single();
    if (error) throw error;
    return res.status(201).json({ ok:true, news:data });
  } catch(e) { console.error(e); return res.status(400).json({ error:e.message || 'insert_failed' }); }
};
