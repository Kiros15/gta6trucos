
document.querySelectorAll('.langs a').forEach(a=>a.addEventListener('click',()=>localStorage.setItem('gta6trucos-language',a.textContent.includes('EN')?'en':'es')));
document.querySelectorAll('[data-amazon-product]').forEach(a=>a.addEventListener('click',()=>{
  const product=a.dataset.amazonProduct;
  if(window.gtag) gtag('event','amazon_click',{product,language:document.documentElement.lang,page:location.pathname});
}));
