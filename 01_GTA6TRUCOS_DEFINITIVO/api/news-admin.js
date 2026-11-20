const { createClient } = require('@supabase/supabase-js');

function normalizeCoverImage(value) {
  const image = typeof value === 'string' ? value.trim() : '';
  if (!image) return '';
  return /^(https?:)?\/\//i.test(image) ? image : `/${image.replace(/^\/+/, '')}`;
}
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  const auth = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!process.env.NEWS_ADMIN_TOKEN || auth !== process.env.NEWS_ADMIN_TOKEN) return res.status(401).json({ error: 'unauthorized' });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(503).json({ error: 'supabase_not_configured' });
  try {
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession:false } });
    const allowed = ['slug_es','slug_en','title_es','title_en','excerpt_es','excerpt_en','content_es','content_en','image','category','tags','source_name','source_url','published_at','published','featured'];
    const row = Object.fromEntries(Object.entries(req.body || {}).filter(([k]) => allowed.includes(k)));
    row.image = normalizeCoverImage(row.image);
    if (row.published && !row.image) return res.status(422).json({ error: 'cover_image_required' });

    // The database index is the race-safe protection; this lookup provides a
    // useful response to the editor before an insert is attempted.
    if (row.published) {
      const { data: existing, error: lookupError } = await sb.from('news').select('id').eq('published', true).eq('image', row.image).limit(1);
      if (lookupError) throw lookupError;
      if (existing && existing.length) return res.status(409).json({ error: 'cover_image_already_in_use' });
    }
    const { data, error } = await sb.from('news').insert(row).select().single();
    if (error) {
      if (error.code === '23505' && error.constraint === 'news_published_cover_image_unique_idx') return res.status(409).json({ error: 'cover_image_already_in_use' });
      throw error;
    }
    return res.status(201).json({ ok:true, news:data });
  } catch(e) { console.error(e); return res.status(400).json({ error:e.message || 'insert_failed' }); }
};
