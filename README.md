# landingpage-Fontanero

Static landing pages for Fontanero services, optimized for mobile and Google Ads.

## Available Landing Pages

This repository contains five conversion-focused landing pages:

1. **General Fontanero** - `/index.html`
   - URL: `https://servicio-fontaneros24.es/`
   - Service: General plumbing services

2. **Urgente 24h** - `/urgente-24h/index.html`
   - URL: `https://servicio-fontaneros24.es/urgente-24h/`
   - Service: 24/7 emergency plumbing

3. **Desatascos** - `/desatascos/index.html`
   - URL: `https://servicio-fontaneros24.es/desatascos/`
   - Service: Drain unblocking

4. **Fugas de Agua** - `/fugas-de-agua/index.html`
   - URL: `https://servicio-fontaneros24.es/fugas-de-agua/`
   - Service: Water leak detection and repair

5. **Instalaciones** - `/instalaciones/index.html`
   - URL: `https://servicio-fontaneros24.es/instalaciones/`
   - Service: Plumbing installations

## Configuration

### Header and Logo

All pages include a blue header bar with:
- **Logo**: A professional SVG logo located at `/assets/images/logo.svg`
- **Phone number**: Displayed in the top-right corner and linked to call via `tel:`

To customize the logo:
1. Replace `/assets/images/logo.svg` with your own logo
2. Recommended dimensions: 200x50px (auto-scales on mobile)
3. Use white/light colors for visibility against the blue (#0B5ED7) background

The header is non-sticky to preserve the one-screen layout philosophy.

### Setting the Phone Number

The phone number appears in three places on each page and needs to be updated:

1. **In the header** - Search for `tel:+346XXXXXXXX` and `+34 6XX XXX XXX` in the header section
2. **In the CTA button** - Search for `tel:+346XXXXXXXX` in all HTML files
3. **In the footer** - Search for `+34 6XX XXX XXX` in all HTML files

**To update:**

```bash
# Replace in all HTML files
find . -name "*.html" -type f -exec sed -i 's/+346XXXXXXXX/+34612345678/g' {} \;
find . -name "*.html" -type f -exec sed -i 's/+34 6XX XXX XXX/+34 612 345 678/g' {} \;
```

Or manually edit each file and replace both placeholders with your actual phone number.

### Dynamic City Replacement

All pages support dynamic city replacement via the `city` query parameter.

**How it works:**
- Add `?city=Madrid` to any URL to replace "Barcelona" with "Madrid"
- Only cities from the allowed list (see `/assets/js/city.js`) are accepted
- Invalid cities fall back to "Barcelona"

**Examples:**
```
https://servicio-fontaneros24.es/?city=Madrid
https://servicio-fontaneros24.es/urgente-24h/?city=Valencia
https://servicio-fontaneros24.es/desatascos/?city=Terrassa
```

**Allowed cities:**
Barcelona, Madrid, Valencia, Sevilla, Zaragoza, Málaga, Murcia, Palma, Las Palmas, Bilbao, Alicante, Córdoba, Valladolid, Vigo, Gijón, Hospitalet, Vitoria, Granada, Elche, Oviedo, Badalona, Cartagena, Terrassa, Jerez, Sabadell, Móstoles, Santa Cruz, Pamplona, Almería, Leganés, San Sebastián, Burgos, Albacete, Getafe, Salamanca, Huelva, Logroño, Tarragona, León, Lleida, Marbella, Mataró, Dos Hermanas, Santa Coloma, Torrejón, Alcalá de Henares, Parla, Alcorcón, Reus, Girona

### Images

Images are stored in `/assets/images/` with descriptive filenames:

- `fontanero-general.jpg` - General plumbing service image
- `fontanero-urgente.jpg` - Emergency/24h service image
- `desatascos.jpg` - Drain unblocking service image
- `fugas-agua.jpg` - Water leak service image
- `instalaciones.jpg` - Installation service image

**To replace images:**

1. Prepare your images (recommended: 800x600px or larger, optimized for web)
2. Use real service photos (avoid stock glamour photos)
3. Replace the placeholder files in `/assets/images/` with your actual images
4. Keep the same filenames to avoid updating HTML

**Image requirements:**
- Format: JPG, PNG, or WebP
- Recommended size: 800x600px minimum
- Optimize for web (compress to reduce file size)
- Use real-looking service photos

## Testing Locally

To test the pages locally:

```bash
# Using Python 3
python3 -m http.server 8000

# Using PHP
php -S localhost:8000

# Using Node.js (http-server)
npx http-server -p 8000
```

Then visit:
- `http://localhost:8000/`
- `http://localhost:8000/?city=Madrid`
- `http://localhost:8000/urgente-24h/`
- `http://localhost:8000/desatascos/?city=Terrassa`

## Deployment

The current deployment serves static files from `/var/www/Fontanero` behind nginx for domain `servicio-fontaneros24.es`.

**To deploy:**

1. SSH into your server
2. Pull the latest changes:
   ```bash
   cd /var/www/Fontanero
   git pull origin main
   ```
3. Verify nginx is configured to serve static files
4. Test the pages in your browser

**Nginx configuration example:**

```nginx
server {
    listen 80;
    server_name servicio-fontaneros24.es;
    root /var/www/Fontanero;
    index index.html;
    
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }
    
    # Include caching configuration for optimal performance
    # See nginx-cache-config.conf for full configuration
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|webp|avif|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}
```

## File Structure

```
.
├── index.html                          # Main landing page
├── urgente-24h/
│   └── index.html                      # Emergency service page
├── desatascos/
│   └── index.html                      # Drain unblocking page
├── fugas-de-agua/
│   └── index.html                      # Water leak page
├── instalaciones/
│   └── index.html                      # Installation page
├── impressum/
│   └── index.html                      # Legal information (placeholder)
├── politica-de-privacidad/
│   └── index.html                      # Privacy policy (placeholder)
├── assets/
│   ├── css/
│   │   └── styles.css                  # Shared responsive styles
│   ├── js/
│   │   └── city.js                     # Dynamic city replacement
│   └── images/
│       ├── fontanero-general.jpg       # Fallback images (JPEG)
│       ├── fontanero-general-*w.webp   # Responsive WebP images
│       ├── fontanero-urgente.jpg
│       ├── fontanero-urgente-*w.webp
│       ├── desatascos.jpg
│       ├── desatascos-*w.webp
│       ├── fugas-agua.jpg
│       ├── fugas-agua-*w.webp
│       ├── instalaciones.jpg
│       └── instalaciones-*w.webp
├── nginx-cache-config.conf             # Sample nginx caching configuration
└── README.md
```

## Performance Optimizations

This site has been optimized for PageSpeed Insights with the following improvements:

### Image Optimization
- **Modern formats**: All hero images use WebP format with JPEG fallback
- **Responsive images**: Multiple sizes (480w, 768w, 1024w, 1400w) served via `srcset`
- **Explicit dimensions**: All images include `width` and `height` attributes to prevent Cumulative Layout Shift (CLS)
- **Priority loading**: Hero images use `loading="eager"` and `fetchpriority="high"` for faster LCP
- **Async decoding**: Images use `decoding="async"` for better rendering performance

### Layout Stability
- **Object-fit**: Images use `object-fit: cover` with consistent 4:3 aspect ratio
- **No layout shifts**: Explicit image dimensions prevent CLS
- **Responsive breakpoints**: Optimized layouts for mobile (≤768px), tablet (769-1024px), and desktop (>1024px)

### Accessibility
- **WCAG AA compliance**: All text and buttons meet contrast requirements
- **Semantic HTML**: Proper heading hierarchy and alt text on all images
- **Mobile-friendly**: Touch-friendly button sizes and spacing

### Caching Configuration

To achieve optimal performance scores, configure your web server to cache static assets:

**For Nginx:**
Copy the configuration from `nginx-cache-config.conf` into your server block. This will:
- Cache images, CSS, and JS for 1 year with `immutable` flag
- Enable gzip compression for text-based assets
- Add appropriate `Cache-Control` headers

**For Apache (.htaccess):**
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\.(webp|jpg|jpeg|png|gif|css|js|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
```

### Expected Performance Improvements
- **LCP**: Significantly improved with optimized hero images and priority loading
- **CLS**: Near 0 with explicit image dimensions
- **Total Transfer Size**: Reduced from ~6.8MB to <10KB for hero images
- **Accessibility Score**: Improved with better contrast ratios

## Features

- ✅ Mobile-first responsive design
- ✅ One-screen layout (no navigation menu)
- ✅ Single clear CTA (call button)
- ✅ Dynamic city replacement
- ✅ Fast loading (minimal dependencies)
- ✅ SEO optimized (meta tags, semantic HTML)
- ✅ Accessible (alt tags, proper headings, WCAG AA contrast)
- ✅ Performance optimized (WebP images, responsive srcset, priority loading)
- ✅ Layout stability (explicit image dimensions, zero CLS)
- ✅ Cache-ready (server configuration examples included)

## Support

For questions or issues, please open an issue in this repository.
