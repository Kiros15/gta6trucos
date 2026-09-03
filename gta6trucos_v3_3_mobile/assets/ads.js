/* GTA6Trucos — AdSense-ready ad slots
 * No publisher ID is hard-coded. After AdSense approval, add your
 * publisher ID and slot IDs in the CONFIG object below, or replace the
 * data-slot values in the HTML with the IDs from your AdSense account.
 */
(function(){
  const CONFIG = {
    client: 'ca-pub-2781521462195370',
    slots: {
      top: '',
      mid: '',
      bottom: '',
      sidebar: ''
    }
  };

  const slots = document.querySelectorAll('[data-ad-slot-name]');
  if (!slots.length || !CONFIG.client) return;

  const loadAdsense = () => {
    if (window.adsbygoogle) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.async = true;
      s.crossOrigin = 'anonymous';
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(CONFIG.client);
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  };

  loadAdsense().then(() => {
    slots.forEach(slot => {
      const name = slot.getAttribute('data-ad-slot-name');
      const slotId = slot.getAttribute('data-ad-slot') || CONFIG.slots[name] || '';
      if (!slotId) return;
      slot.innerHTML = '';
      const ad = document.createElement('ins');
      ad.className = 'adsbygoogle';
      ad.style.display = 'block';
      ad.setAttribute('data-ad-client', CONFIG.client);
      ad.setAttribute('data-ad-slot', slotId);
      ad.setAttribute('data-ad-format', 'auto');
      ad.setAttribute('data-full-width-responsive', 'true');
      slot.appendChild(ad);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
    });
  }).catch(() => {});
})();
