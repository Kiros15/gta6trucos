document.querySelectorAll('.langs a').forEach(a=>a.addEventListener('click',()=>localStorage.setItem('gta6trucos-language',a.textContent.includes('EN')?'en':'es')));
document.querySelectorAll('[data-amazon-product]').forEach(a=>a.addEventListener('click',()=>{
  const product=a.dataset.amazonProduct;
  if(window.gtag) gtag('event','amazon_click',{product,language:document.documentElement.lang,page:location.pathname});
}));

/* Dynamic news layer: if Supabase is configured, new published stories are added
   automatically. If it is not configured, the existing static site remains untouched. */
(function(){
  const lang=(document.documentElement.lang||'es').startsWith('en')?'en':'es';
  const endpoint='/api/news?lang='+lang;
  const esc=s=>String(s??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
  const imgPath=s=>{ if(!s)return ''; if(s.startsWith('http'))return s; return s.startsWith('/')?s:'/'+s.replace(/^\.\.?\//,''); };
  fetch(endpoint,{headers:{'Accept':'application/json'}}).then(r=>r.ok?r.json():null).then(data=>{
    if(!data||!data.configured||!Array.isArray(data.news)||!data.news.length)return;
    const cards=document.querySelector('.news-cards');
    if(cards){
      const html=data.news.map(n=>`<article class="news-card dynamic-news-card"><a href="${lang==='en'?'/en/noticia/':'/es/noticia/'}${esc(lang==='en'?n.slug_en:n.slug_es)}/"><img loading="lazy" src="${esc(imgPath(n.image))}" alt="${esc(lang==='en'?n.title_en:n.title_es)}"><div><span class="pill">${esc(n.category||'GTA VI')}</span><h2>${esc(lang==='en'?n.title_en:n.title_es)}</h2><p>${esc(lang==='en'?n.excerpt_en:n.excerpt_es||'')}</p><span class="section-link">${lang==='en'?'Read article →':'Leer noticia →'}</span></div></a></article>`).join('');
      cards.insertAdjacentHTML('afterbegin',html);
    }
    const homeGrid=document.querySelector('.news-grid');
    if(homeGrid && !cards){
      const host=homeGrid.querySelector('.news-list')||homeGrid;
      const html=data.news.slice(0,5).map(n=>`<article class="dynamic-news-card"><a href="${lang==='en'?'/en/noticia/':'/es/noticia/'}${esc(lang==='en'?n.slug_en:n.slug_es)}/"><div><strong>${esc(lang==='en'?n.title_en:n.title_es)}</strong><span>${esc(lang==='en'?n.excerpt_en:n.excerpt_es||'')}</span></div></a></article>`).join('');
      host.insertAdjacentHTML('afterbegin',html);
    }
  }).catch(()=>{});
})();
