
  # Humaneers Website Design

  This is a code bundle for Humaneers Website Design. The original project is available at https://www.figma.com/design/F8cpSsOZXMUfQxxmFU5TLO/Humaneers-Website-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Contact form (Moxie proxy)

  The contact form submits to a Cloudflare Pages Function at `/api/forms/contact`, which forwards the request to Moxie using server-side credentials.

  ### Environment variables

  Configure these in Cloudflare Pages (or locally for preview builds):

  - `MOXIE_ENDPOINT` - Full Moxie API endpoint that accepts the form payload.
  - `MOXIE_API_KEY` (or `MOXIE_TOKEN`) - Server-side credential for Moxie.
  - `TURNSTILE_SECRET_KEY` - Optional Cloudflare Turnstile secret for spam protection.
  - `VITE_TURNSTILE_SITE_KEY` - Optional Turnstile site key for the client widget.

  ### Cloudflare Pages settings

  - Build command: `npm run build`
  - Output directory: `dist`
  - Functions directory: `functions`
  
