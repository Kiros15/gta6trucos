# GTA6Trucos V3.3 Mobile First

Versión responsive y mobile-first de GTA6Trucos.com.

Incluye:
- Navegación móvil con menú y barra inferior.
- Hero adaptado a pantallas pequeñas.
- Secciones visuales con material oficial enlazado a Rockstar Games.
- Nueva sección de gameplay basada en Grand Theft Auto VI: An Extended Look.
- Información sobre Jason, Lucia, Leonida, combate, policía, conducción y exploración.
- Galería responsive con carga diferida de imágenes.
- Trucos preparados para completarse con información confirmada tras el lanzamiento.
- Sin códigos inventados presentados como oficiales.

## Vercel
Sitio estático HTML/CSS/JS. No requiere build. El Root Directory debe apuntar a esta carpeta cuando se suba al repositorio.


## V3.3.1 — Integración de vídeo
Se integran embeds responsive de YouTube con material oficial de Rockstar Games en páginas estratégicas: inicio, personajes, mapa, vehículos, guías, noticias y el hub de vídeos. Se usan iframes lazy-loaded y diseño mobile-first.


## V3.4 — Monetización preparada

- Espacios publicitarios responsive en zonas estratégicas de las páginas de contenido.
- Preparación para Google AdSense mediante `assets/ads.js`.
- No contiene un Publisher ID inventado: se configura después de la aprobación de AdSense.
- `ads.txt` queda preparado como recordatorio para publicar la línea oficial proporcionada por AdSense.
- Las páginas legales y de contacto no llevan espacios publicitarios.
- Los anuncios se distinguen claramente del contenido como “PUBLICIDAD”.

### Activación
1. Obtener la Publisher ID y los IDs de las unidades en AdSense.
2. Añadirlos en `assets/ads.js` (CONFIG) o en los atributos `data-ad-slot` de los espacios.
3. Publicar en la raíz `/ads.txt` la línea oficial proporcionada por AdSense.
4. Configurar el consentimiento de usuarios de EEE/Reino Unido/Suiza según los requisitos vigentes antes de servir anuncios personalizados.


### V3.4.1 — AdSense verification
- Added the exact AdSense publisher script and `google-adsense-account` meta tag to the `<head>` of all pages containing ad slots.
- Publisher ID: `ca-pub-2781521462195370`.
- `ads.js` now only renders ad units; it does not dynamically load the AdSense library.
- `ads.txt` contains the publisher authorization line.
- This matches Google's recommended connection method: place the AdSense code between `<head>` and `</head>`.


## V3.5 — Amazon Afiliados
Se añade un bloque responsive de equipamiento recomendado con 5 enlaces de afiliado de Amazon, disclosure y atributos sponsored/nofollow.


V4.2: official Rockstar screenshots are rendered with real <img> elements rather than CSS background images, with lazy loading and fallback.
