# NativFort static website

This folder is a plain static website for GitHub Pages. It contains only HTML, CSS, JavaScript, and image assets — no server, no build step, and no framework runtime.

## Deploy on GitHub Pages

1. Unzip this package.
2. Copy the contents into your GitHub repository root, or into a `docs/` folder.
3. Commit and push.
4. In GitHub, open Settings → Pages.
5. Choose the branch and folder you uploaded (`/root` or `/docs`) and save.

## Contact form and scheduler

Before publishing, edit `contact.html` and replace:

- `https://formspree.io/f/your-form-id` with your Formspree or Basin endpoint.
- `https://calendly.com/your-handle/nativfort-demo` with your Calendly or Google Scheduler link.

## Files

- `index.html` — homepage
- `platform.html` — Sovereign AI Core
- `sdi.html` — Secure Document Intelligence
- `security.html` — Security & Trust
- `about.html` — About
- `contact.html` — demo/contact form
- `404.html` — GitHub Pages fallback
- `assets/` — CSS, JavaScript, and logos
