# arefinrumi.github.io

Personal portfolio site for **S. M. Arefin Rumi** — DevOps & Infrastructure Engineer.

Static, dependency-free, single-page. No build step, no framework, no npm install.
Three source files plus assets — open `index.html` in a browser and it works.

**Live:** https://arefinrumi.github.io

---

## Structure

```
.
├── index.html                 # all markup and content
├── favicon.svg
├── .nojekyll                  # tell GitHub Pages to serve files as-is
├── assets/
│   ├── css/style.css          # design tokens at the top — edit colours there
│   ├── js/main.js             # theme, typewriter, reveal, counters
│   └── cv/
│       └── S_M_Arefin_Rumi_DevOps_Engineer_Resume.pdf
└── README.md
```

## Features

- Dark / light theme, remembered in `localStorage`, defaults to the visitor's OS preference
- Animated terminal hero (typewriter) with a static fallback for screen readers
- Scroll-reveal animations and animated stat counters
- Fully responsive — one column below 980px, mobile nav below 820px
- `prefers-reduced-motion` respected: all animation disabled, content shown immediately
- Print stylesheet — the page prints as a clean document
- Semantic HTML, skip link, focus-visible outlines, ARIA labels on icon buttons
- Open Graph + Twitter meta for link previews

---

## Deploying to GitHub Pages

This repo is named `Arefinrumi.github.io`, which makes it a **user site** — GitHub Pages
serves it from the repository root of the default branch, at `https://arefinrumi.github.io`.

### First push

```bash
cd Arefinrumi.github.io

git init -b main
git add -A
git commit -m "Add portfolio site"

git remote add origin git@github.com:Arefinrumi/Arefinrumi.github.io.git
git push -u origin main
```

If `git remote add` says the remote already exists, set the URL instead:

```bash
git remote set-url origin git@github.com:Arefinrumi/Arefinrumi.github.io.git
```

### Enable Pages

Repo → **Settings** → **Pages** → *Build and deployment*:

- **Source:** Deploy from a branch
- **Branch:** `main` / `/ (root)` → **Save**

First build takes a minute or two. After that, every push to `main` redeploys automatically.

### If SSH isn't set up on this machine

Check first:

```bash
ssh -T git@github.com
```

A greeting means you're good. `Permission denied (publickey)` means you need a key:

```bash
ssh-keygen -t ed25519 -C "smarefin7@gmail.com"
cat ~/.ssh/id_ed25519.pub
```

Paste that public key into GitHub → Settings → SSH and GPG keys → **New SSH key**, then
re-run `ssh -T git@github.com`.

### Later updates

```bash
git add -A
git commit -m "Update projects section"
git push
```

---

## Custom domain (optional)

1. Create a file named `CNAME` in the repo root containing only your domain, e.g. `arefinrumi.dev`
2. At your DNS provider, add for the apex domain four `A` records pointing to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   — or for a `www` subdomain, one `CNAME` record pointing to `arefinrumi.github.io`
3. Repo → Settings → Pages → Custom domain → enter it → **Save**, then tick **Enforce HTTPS**
   once the certificate is issued (can take up to an hour)

---

## Editing

**Colours and spacing** — the `:root` and `[data-theme="light"]` blocks at the top of
`assets/css/style.css` hold every colour as a custom property. Change `--accent` and the
whole site follows.

**Terminal hero text** — the `SCRIPT` array near the top of `assets/js/main.js`. Each entry
is one line: `cmd` types out like a command, `out` prints instantly, `kv` renders a
`key: value` pair, `ok` is green, `dim` is muted, `gap` is a blank line.

**Content** — all in `index.html`, one commented section per page section.

**Résumé** — replace the PDF at `assets/cv/` keeping the same filename, or update the two
`href`s in `index.html` if you rename it.

---

## Local preview

Any static server works. With Python:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Licence

Code MIT. Content, CV and personal details © S. M. Arefin Rumi — please don't reuse those.
