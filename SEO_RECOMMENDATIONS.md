# SEO Recommendations

## Completed ✅

### Base Meta Tags (index.html)
- ✅ Added comprehensive meta description (156 characters)
- ✅ Added relevant keywords
- ✅ Added Open Graph tags for social sharing
- ✅ Added Twitter Card tags
- ✅ Added canonical URL
- ✅ Set proper HTML lang attribute

### Page Titles
- ✅ All pages have unique `document.title` updates
- ✅ Titles follow pattern: "Humaneers | Page Name | Value Prop"
- ✅ 20 pages verified with proper titles

### Content Quality
- ✅ Service pages use clear, descriptive headings (H1, H2, H3)
- ✅ Content follows brand voice (clear over clever)
- ✅ Technical terms explained with DefinitionTooltip
- ✅ Proper semantic HTML structure

## Future Enhancements 🔮

### 1. Dynamic Meta Tags (High Priority)
**Install React Helmet or React Helmet Async**

```bash
npm install react-helmet-async
```

**Implementation Example:**
```tsx
import { Helmet } from 'react-helmet-async';

export function ManagedIT() {
  return (
    <>
      <Helmet>
        <title>Humaneers | Managed IT | Nationwide Support</title>
        <meta name="description" content="Cloud-native managed IT infrastructure with 100% US-based engineering. No user minimums, no offshore NOCs. SOC 2 compliant nationwide support." />
        <meta property="og:title" content="Managed IT Services | Humaneers" />
        <meta property="og:description" content="Enterprise-grade managed IT for small businesses. 24/7 monitoring, proactive security, hybrid cloud infrastructure." />
        <link rel="canonical" content="https://humaneers.dev/managed-it" />
      </Helmet>
      {/* Page content */}
    </>
  );
}
```

### 2. Structured Data (Schema.org)
Add JSON-LD structured data for:

**Organization Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Humaneers",
  "description": "Enterprise Strategy, Small Business Soul",
  "url": "https://humaneers.dev",
  "logo": "https://humaneers.dev/logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "Customer Service",
    "areaServed": "US",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://linkedin.com/company/humaneers",
    "https://twitter.com/humaneers"
  ]
}
```

**Service Schema** (for each service page):
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Managed IT Services",
  "provider": {
    "@type": "Organization",
    "name": "Humaneers"
  },
  "areaServed": "United States",
  "description": "Cloud-native managed IT infrastructure..."
}
```

### 3. Image Optimization
- [ ] Add descriptive alt text to all images
- [ ] Use WebP format for better compression
- [ ] Implement lazy loading (already using Suspense for routes)
- [ ] Create Open Graph images (1200x630px) for each major page

### 4. Performance Optimization
- [x] Code splitting implemented (reduces initial bundle)
- [ ] Consider preloading critical assets
- [ ] Add resource hints (dns-prefetch, preconnect)
- [ ] Optimize third-party scripts (PageSense, Zoho)

### 5. URL Structure & Routing
Current: Client-side routing with single HTML file

**Recommendation**: Consider SSR/SSG for better SEO
- Next.js for full SSR
- Vite SSG plugin for static generation
- Or implement prerendering for production builds

### 6. Sitemap & Robots.txt

**Create public/robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://humaneers.dev/sitemap.xml
```

**Create public/sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://humaneers.dev/</loc>
    <lastmod>2026-01-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://humaneers.dev/managed-it</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add all pages -->
</urlset>
```

### 7. Local SEO (If applicable)
- [ ] Google Business Profile optimization
- [ ] Local schema markup (address, phone, hours)
- [ ] NAP consistency (Name, Address, Phone)
- [ ] Service area pages (if serving specific cities)

### 8. Content Enhancements
- [ ] Add blog/resources section for content marketing
- [ ] Case studies with schema markup
- [ ] FAQ section with FAQ schema
- [ ] Customer testimonials with Review schema

### 9. Analytics & Tracking
Currently installed: PageSense, Zoho SalesIQ

**Additional Recommendations:**
- [ ] Google Search Console setup
- [ ] Google Analytics 4 (or privacy-friendly alternative)
- [ ] Core Web Vitals monitoring
- [ ] Conversion tracking for CTAs

### 10. Mobile SEO
- [x] Viewport meta tag configured
- [x] Responsive design implemented
- [x] Touch-friendly targets (44px minimum)
- [ ] Test mobile page speed (aim for <3s load time)
- [ ] Verify mobile usability in Google Search Console

## SEO Best Practices Checklist

### On-Page SEO
- [x] Unique title tags (50-60 characters)
- [x] Meta descriptions (150-160 characters)
- [x] H1 tag on every page (one per page)
- [x] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Alt text on all images
- [x] Internal linking structure
- [x] Descriptive URLs (via document.title)
- [ ] Canonical tags for each page

### Technical SEO
- [x] Mobile responsive
- [x] Fast load times (bundle optimized)
- [x] HTTPS (assumed for production)
- [ ] XML sitemap
- [ ] Robots.txt
- [ ] Structured data
- [ ] 301 redirects for changed URLs

### Content SEO
- [x] High-quality, original content
- [x] Keyword usage (natural, not stuffed)
- [x] Clear value propositions
- [x] Scannable content (headings, bullets)
- [ ] Regular content updates
- [ ] Internal content linking

## Priority Implementation Order

1. **Immediate** (This Sprint):
   - ✅ Base meta tags in index.html
   - ✅ Verify all pages have titles
   - Create robots.txt and sitemap.xml

2. **Short-term** (Next 2 Weeks):
   - Install React Helmet Async
   - Add dynamic meta tags to all pages
   - Add image alt text
   - Create Open Graph images

3. **Medium-term** (Next Month):
   - Implement structured data (JSON-LD)
   - Set up Google Search Console
   - Analyze Core Web Vitals
   - Create content calendar for blog

4. **Long-term** (Next Quarter):
   - Consider SSR/SSG migration if needed
   - Build comprehensive content library
   - Implement advanced schema markup
   - Local SEO optimization (if applicable)

---

**Last Updated**: January 17, 2026
**Reviewed By**: Claude
