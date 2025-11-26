# Docker Usage

Build the image:

```bash
docker build -t tatsuki-portfolio .
```

Run it locally (the container exposes port 4173 via the bundled static server):

```bash
docker run --rm -p 4173:4173 tatsuki-portfolio
```

Now open http://localhost:4173 to view the built site.

This container only serves the static build with Node's `serve` package; configure your own reverse proxy (e.g., Nginx/Cloudflare) on the server if needed.
