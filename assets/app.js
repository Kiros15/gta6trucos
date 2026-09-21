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

// Weekly GTA VI video picks: every item plays on this page.
(function () {
  const host = document.querySelector('[data-weekly-videos]');
  if (!host) return;
  const en = document.documentElement.lang.startsWith('en');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const status = host.querySelector('[data-video-status]');
  fetch('/api/weekly-videos', { headers: { Accept: 'application/json' } })
    .then(r => { if (!r.ok) throw new Error('unavailable'); return r.json(); })
    .then(data => {
      if (!data.videos?.length) { status.textContent = en ? 'No embeddable GTA VI videos published in the last seven days.' : 'No hay vídeos de GTA VI incrustables publicados en los últimos siete días.'; return; }
      const videos = data.videos;
      const player = host.querySelector('[data-video-player]');
      const title = host.querySelector('[data-featured-title]');
      const meta = host.querySelector('[data-featured-meta]');
      const list = host.querySelector('[data-video-list]');
      const date = host.querySelector('[data-video-date]');
      const format = new Intl.NumberFormat(en ? 'en-US' : 'es-ES');
      function select(index) {
        const v = videos[index];
        player.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id);
        player.title = v.title;
        title.textContent = v.title;
        meta.textContent = v.channel + ' · ' + format.format(v.views) + (en ? ' views' : ' visualizaciones');
        list.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-current', String(i === index)));
      }
      list.innerHTML = videos.map((v, i) => '<li><button type="button" data-video-index="' + i + '"><span class="video-rank">' + (i + 1) + '</span><img loading="lazy" src="' + esc(v.thumbnail) + '" alt=""><span><strong>' + esc(v.title) + '</strong><small>' + esc(v.channel) + ' · ' + format.format(v.views) + (en ? ' views' : ' visualizaciones') + '</small></span></button></li>').join('');
      list.addEventListener('click', event => {
        const button = event.target.closest('[data-video-index]');
        if (button) select(Number(button.dataset.videoIndex));
      });
      date.textContent = (en ? 'Views checked ' : 'Visualizaciones comprobadas ') + new Date(data.updatedAt).toLocaleString(en ? 'en-US' : 'es-ES');
      status.hidden = true;
      host.querySelector('[data-video-content]').hidden = false;
      select(0);
    })
    .catch(() => { status.textContent = en ? 'Weekly videos are temporarily unavailable.' : 'Los vídeos de la semana no están disponibles temporalmente.'; });
})();

