/* GTA6Trucos — AdSense ad-slot renderer
 * The AdSense library is loaded directly in <head> on pages that contain ads.
 * Add the AdSense ad-unit slot IDs below after creating the ad units in AdSense.
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
  if (!slots.length || !CONFIG.client || !window.adsbygoogle) return;

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
})();
