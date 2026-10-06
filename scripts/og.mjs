// Renders 1200x630 Open Graph images into public/og/ using the same look as the site.
// Run after adding or changing projects: `npm run og`
import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'node:fs';
import sharp from 'sharp';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const ORDER = ['saneo', 'alproperty', 'ucs', 'circleon', 'quizmaster', 'tdown', 'pushim'];
const LANGS = ['en', 'it', 'sq'];
const home = {
  en: { title: 'I build web platforms, mobile apps and AI tools, end to end.', role: 'Freelance full-stack and AI engineer', open: 'Open to new projects' },
  it: { title: 'Realizzo piattaforme web, app mobile e strumenti AI.', role: 'Sviluppatore full-stack e AI freelance', open: 'Disponibile per nuovi progetti' },
  sq: { title: 'Ndërtoj platforma web, aplikacione mobile dhe mjete AI.', role: 'Inxhinier full-stack dhe AI freelance', open: 'I hapur për projekte të reja' },
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
// Inline as data URIs: a page created with setContent can't load file:// images.
const dataUri = async (p, width = 1100) =>
  'data:image/jpeg;base64,' + (await sharp(path.join(root, p)).resize({ width }).jpeg({ quality: 85 }).toBuffer()).toString('base64');

const page = ({ eyebrow, title, sub, open, image, host, phone, photo }) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;font-family:Manrope,sans-serif;background:#fff;color:#211f1c;display:grid;grid-template-columns:600px 600px}
.l{background:#d52b1e;color:#fff;padding:56px;display:flex;flex-direction:column}
.mark{display:flex;align-items:center;gap:14px;font-weight:700;font-size:24px}
.mark svg{width:52px;height:52px}
.eb{margin-top:auto;font-size:18px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;opacity:.9}
h1{font-size:${title.length > 48 ? 46 : 58}px;line-height:1.08;font-weight:500;letter-spacing:-.02em;margin-top:12px}
.sub{font-size:22px;line-height:1.4;margin-top:14px;opacity:.92}
.open{display:flex;align-items:center;gap:10px;margin-top:28px;font-size:20px;font-weight:600}
.open i{width:12px;height:12px;border-radius:50%;background:#4ade80}
.r{background:#f5f3ef;display:grid;place-items:center;padding:40px;overflow:hidden}
.br{width:540px;border-radius:8px;overflow:hidden;border:1px solid #c9c4ba;box-shadow:0 12px 32px rgba(33,31,28,.16);background:#fff}
.bar{height:30px;background:#ebe8e2;border-bottom:1px solid #c9c4ba;display:flex;align-items:center;gap:6px;padding:0 12px}
.bar i{width:10px;height:10px;border-radius:50%;background:#c9c4ba}
.bar b{margin:0 auto;font-weight:500;font-size:12px;color:#736e66;background:#fff;border-radius:4px;padding:2px 30px}
.br img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top left}
.ph{width:250px;border:10px solid #1d1c1a;border-top-width:30px;border-radius:40px;background:#1d1c1a;box-shadow:0 12px 32px rgba(33,31,28,.2)}
.ph img{display:block;width:100%;border-radius:4px 4px 30px 30px}
.me{width:100%;height:100%;object-fit:cover;border-radius:6px}
.r.photo{padding:0}
.r.photo .me{border-radius:0}
</style></head><body>
<div class="l"><div class="mark"><svg viewBox="0 0 40 40"><defs><clipPath id="c"><rect width="40" height="40" rx="5"/></clipPath></defs><rect width="40" height="40" rx="5" fill="#fff"/><g clip-path="url(#c)" fill="#d52b1e"><path fill-rule="evenodd" d="M12 9h9.5a7 7 0 0 1 0 14H17v8h-5zm5 4.5v5h4.3a2.5 2.5 0 0 0 0-5z"/><path d="M19.6 21.4h5.6l10.9 18.6h-5.8z"/></g></svg>Redon Cela</div>
<p class="eb">${esc(eyebrow)}</p><h1>${esc(title)}</h1>${sub ? `<p class="sub">${esc(sub)}</p>` : ''}
<p class="open">${esc(open)}</p></div>
${image === 'photo'
  ? `<div class="r photo"><img class="me" src="${photo}"></div>`
  : phone
    ? `<div class="r"><div class="ph"><img src="${image}"></div></div>`
    : `<div class="r"><div class="br"><div class="bar"><i></i><i></i><i></i><b>${esc(host)}</b></div><img src="${image}"></div></div>`}
</body></html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const shoot = async (html, out) => {
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(root, 'public/og', out), type: 'png' });
  console.log('og/' + out);
};

for (const lang of LANGS) {
  const h = home[lang];
  await shoot(page({ eyebrow: h.role, title: h.title, open: h.open, image: 'photo', photo: await dataUri('src/assets/me.jpg', 600) }), `${lang}.png`);
  for (const slug of ORDER) {
    const f = path.join(root, 'research', `${slug}.json`);
    if (!existsSync(f)) continue;
    const d = JSON.parse(readFileSync(f, 'utf8'));
    const shot = d.screenshots.find((s) => s.kind === 'desktop') ?? d.screenshots[0];
    const img = await dataUri(`src/assets/${shot.file.replace(/\.(png|jpe?g)$/i, '.webp')}`, shot.kind === 'mobile' ? 500 : 1100);
    const host = (d.url || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    await shoot(
      page({ eyebrow: d.category ?? '', title: d.name, sub: d.i18n[lang].tagline, open: h.open, image: img, host, phone: shot.kind === 'mobile' }),
      `${slug}-${lang}.png`,
    );
  }
}
// Service landing pages
const svcDir = path.join(root, 'src/data/services');
for (const f of existsSync(svcDir) ? (await import('node:fs')).readdirSync(svcDir).filter((f) => f.endsWith('.json')) : []) {
  const sv = JSON.parse(readFileSync(path.join(svcDir, f), 'utf8'));
  const file = sv.heroShot?.replace(/\.(png|jpe?g)$/i, '.webp');
  if (!file || !existsSync(path.join(root, 'src/assets', file))) continue;
  const phone = /mobile/.test(file);
  const slug = file.split('/')[1];
  const rf = path.join(root, 'research', `${slug}.json`);
  const host = existsSync(rf) ? (JSON.parse(readFileSync(rf, 'utf8')).url || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : '';
  const img = await dataUri(`src/assets/${file}`, phone ? 500 : 1100);
  for (const lang of LANGS) {
    const c = sv.i18n[lang];
    await shoot(
      page({ eyebrow: c.eyebrow, title: c.navLabel, sub: c.h1, open: home[lang].open, image: img, host, phone }),
      `service-${sv.id}-${lang}.png`,
    );
  }
}
await browser.close();
