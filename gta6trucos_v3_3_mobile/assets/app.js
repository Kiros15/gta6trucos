
const q=document.querySelectorAll('[data-search]');q.forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const v=f.querySelector('input').value.trim();if(v)location.href='/buscar/?q='+encodeURIComponent(v)}));
const year=document.querySelectorAll('[data-year]');year.forEach(x=>x.textContent=new Date().getFullYear());
const form=document.querySelector('[data-newsletter]');if(form)form.addEventListener('submit',e=>{e.preventDefault();const input=form.querySelector('input');if(input.value){form.innerHTML='<strong>¡Listo!</strong> Te avisaremos cuando publiquemos nuevos trucos y guías.'}});

const menuBtn=document.querySelector('[data-menu]');const nav=document.querySelector('[data-nav]');if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{nav.classList.toggle('open');menuBtn.textContent=nav.classList.contains('open')?'✕':'☰';});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.textContent='☰';}));}
