(function(){
  const KEY="gta6trucos-language";
  const path=location.pathname;
  const isEN=path.startsWith("/en");
  const stored=localStorage.getItem(KEY);
  const navLang = navigator.language || "";
  const countryHint = (navigator.languages||[]).join(",").toLowerCase();

  // Client-side country heuristic. It never blocks direct /es/ or /en/ URLs.
  function likelyUSA(){
    return /\b(en-us|us|usa)\b/i.test(navLang+" "+countryHint);
  }
  if(!stored && !isEN && path !== "/es/" && likelyUSA()){
    location.replace("/en/");
    return;
  }
  document.querySelectorAll("[data-lang]").forEach(a=>{
    a.addEventListener("click",()=>localStorage.setItem(KEY,a.dataset.lang));
  });
})();
