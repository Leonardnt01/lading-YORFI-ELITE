# YORFI ÉLITE GOLD CLUB

Landing estática de una página para la comunidad XAU/USD. Construida con React, TypeScript, Vite, Tailwind CSS y Lucide React.

Los títulos y la marca usan **Cinzel**, una serif de Google Fonts con licencia SIL Open Font License 1.1. La fuente se integra en la compilación desde `@fontsource-variable/cinzel`; no requiere solicitudes a Google Fonts al visitar la página. La licencia se distribuye en `public/fonts/OFL-Cinzel.txt`.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre la dirección local que muestre Vite. Para compilar y revisar la versión de producción:

```bash
npm run build
npm run preview
```

La salida estática queda en `dist/`.

## Meta Pixel

La integración está en `index.html` y `src/lib/pixel.ts`. Actualmente el marcador `PIXEL_ID_PENDIENTE` impide que se cargue Meta o se envíen eventos.

Cuando tengas el ID numérico:

1. En `index.html`, sustituye `PIXEL_ID_PENDIENTE` en `var pixelId` por el ID recibido.
2. En el `<noscript>` del mismo archivo, cambia el `src` del GIF local por `https://www.facebook.com/tr?id=TU_ID&ev=PageView&noscript=1`, usando **el mismo ID**.
3. Comprueba antes que no se haya agregado otro Pixel o Google Tag Manager al proyecto o al despliegue.
4. Publica y verifica la recepción en Meta Events Manager / Test Events. La compilación solo valida el código, no confirma que Meta reciba los eventos.

`Lead` mide el clic hacia la comunidad de Telegram; no representa una incorporación confirmada. Los eventos `TelegramDownload` y `SocialClick` están preparados en el módulo de seguimiento, pero no se activan porque la página no tiene enlaces a tiendas ni redes sociales.

## Video y textos

El video entregado aparece en la sección inicial y está en `public/yorfi-intro-v2.mp4` (MP4 de 7.4 MB). El nombre cambia en cada versión del video para que los navegadores no reutilicen una copia anterior en caché. Se reproduce automáticamente y empieza silenciado para cumplir las políticas de reproducción de los navegadores; el visitante puede activar el sonido en los controles. La foto aparece junto a «ESTE SOY YO». Ambos se sirven como archivos estáticos, sin servicios externos. Los textos pueden modificarse en `src/App.tsx`.

## Compartir y desplegar

`index.html` incluye título, descripción y metadatos Open Graph/Twitter. Al conocer el dominio final, cambia `og:image` y `twitter:image` a una URL absoluta de la foto para una vista previa más consistente al compartir.

Para Dokploy, sube este proyecto a GitHub y crea una aplicación desde el repositorio con el `Dockerfile` incluido. El contenedor expone el puerto `80` y sirve `dist/` con Nginx. No requiere backend ni variables de entorno.
# lading-YORFI-ELITE
