# GTA6Trucos — capa dinámica de noticias

La web conserva sus páginas estáticas y sus imágenes. La capa dinámica es adicional y tiene fallback: si Supabase no está configurado, las páginas existentes siguen funcionando.

## 1. Supabase
1. Crea/abre el proyecto Supabase.
2. SQL Editor → ejecuta `supabase/schema.sql`.
3. Después ejecuta `supabase/seed-existing.sql` para migrar las 6 noticias existentes ES/EN.

## 2. Vercel
Añade estas variables de entorno (Production y Preview si procede):
- `SUPABASE_URL` = URL del proyecto
- `SUPABASE_SERVICE_ROLE_KEY` = service-role key (SOLO servidor; nunca la publiques en HTML/JS)
- `NEWS_ADMIN_TOKEN` = una contraseña/token largo y aleatorio para el panel

Vercel volverá a desplegar al guardar las variables.

## 3. Publicar
Abre `/admin/`, introduce el token y crea la noticia. Las noticias publicadas aparecen automáticamente en la sección de noticias y portada. Las nuevas páginas se sirven en `/es/noticia/slug/` y `/en/noticia/slug/`.

## Seguridad
El service-role key nunca se expone al navegador. El endpoint público solo devuelve noticias con `published=true`. El panel exige `NEWS_ADMIN_TOKEN`.

## Importante para AdSense
No se debe copiar automáticamente el texto de otros medios. Usa las fuentes para investigar y publica una pieza editorial propia, útil y con valor añadido.
