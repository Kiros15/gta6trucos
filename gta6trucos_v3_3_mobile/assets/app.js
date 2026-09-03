
const q=document.querySelectorAll('[data-search]');q.forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const v=f.querySelector('input').value.trim();if(v)location.href='/buscar/?q='+encodeURIComponent(v)}));
const year=document.querySelectorAll('[data-year]');year.forEach(x=>x.textContent=new Date().getFullYear());
const form=document.querySelector('[data-newsletter]');if(form)form.addEventListener('submit',e=>{e.preventDefault();const input=form.querySelector('input');if(input.value){form.innerHTML='<strong>¡Listo!</strong> Te avisaremos cuando publiquemos nuevos trucos y guías.'}});

const menuBtn=document.querySelector('[data-menu]');const nav=document.querySelector('[data-nav]');if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{nav.classList.toggle('open');menuBtn.textContent=nav.classList.contains('open')?'✕':'☰';});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.textContent='☰';}));}

// V4.2 official image fallback
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.official-thumb img').forEach(img=>{img.addEventListener('error',()=>{img.style.display='none'; const p=img.parentElement; p.classList.add('image-unavailable'); if(!p.querySelector('.image-fallback')){const x=document.createElement('div');x.className='image-fallback';x.innerHTML='<strong>Imagen oficial de GTA VI</strong><small>Ver en Rockstar Games ↗</small>';x.onclick=()=>window.open('https://www.rockstargames.com/VI/media/screenshots','_blank');p.appendChild(x);}});});});
