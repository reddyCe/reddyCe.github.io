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
  en: { title: 'We build web platforms, mobile apps and AI tools, end to end.', role: 'Software studio for web, mobile and AI', open: 'Open to new projects' },
  it: { title: 'Realizziamo piattaforme web, app mobile e strumenti AI.', role: 'Studio software per web, mobile e AI', open: 'Disponibili per nuovi progetti' },
  sq: { title: 'Ndërtojmë platforma web, aplikacione mobile dhe mjete AI.', role: 'Studio softueri për web, mobile dhe AI', open: 'Të hapur për projekte të reja' },
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
.mark svg{width:96px;height:96px}
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
<div class="l"><div class="mark"><svg viewBox="0 0 48 48"><rect width="48" height="48" rx="4" fill="#fff"/><path fill="#d52b1e" stroke="#d52b1e" stroke-width="0.3" stroke-linejoin="round" d="M6.41 16.5V9.48H7.97V11.2L7.8 10.98Q7.94 10.61 8.16 10.31Q8.39 10.01 8.72 9.82Q8.98 9.66 9.28 9.57Q9.58 9.49 9.89 9.46Q10.21 9.44 10.53 9.48V11.13Q10.24 11.04 9.85 11.07Q9.46 11.1 9.15 11.25Q8.84 11.39 8.63 11.63Q8.41 11.87 8.3 12.19Q8.19 12.51 8.19 12.91V16.5ZM14.43 16.7Q13.35 16.7 12.53 16.23Q11.71 15.77 11.24 14.95Q10.78 14.13 10.78 13.08Q10.78 11.93 11.23 11.08Q11.69 10.23 12.49 9.76Q13.29 9.29 14.32 9.29Q15.43 9.29 16.2 9.8Q16.98 10.32 17.35 11.27Q17.72 12.21 17.61 13.48H15.86V12.83Q15.86 11.76 15.52 11.29Q15.18 10.82 14.4 10.82Q13.5 10.82 13.07 11.37Q12.65 11.92 12.65 12.99Q12.65 13.97 13.07 14.51Q13.5 15.04 14.32 15.04Q14.84 15.04 15.22 14.82Q15.59 14.59 15.78 14.16L17.55 14.67Q17.15 15.63 16.3 16.16Q15.44 16.7 14.43 16.7ZM12.1 13.48V12.17H16.76V13.48ZM21.32 16.7Q20.35 16.7 19.62 16.21Q18.89 15.72 18.49 14.88Q18.08 14.04 18.08 12.99Q18.08 11.92 18.49 11.08Q18.91 10.25 19.65 9.77Q20.4 9.29 21.41 9.29Q22.41 9.29 23.09 9.77Q23.77 10.26 24.12 11.1Q24.48 11.94 24.48 12.99Q24.48 14.04 24.12 14.88Q23.77 15.72 23.07 16.21Q22.36 16.7 21.32 16.7ZM21.6 15.12Q22.19 15.12 22.55 14.86Q22.9 14.59 23.06 14.11Q23.22 13.63 23.22 12.99Q23.22 12.35 23.06 11.87Q22.9 11.39 22.56 11.12Q22.22 10.86 21.67 10.86Q21.08 10.86 20.7 11.15Q20.32 11.44 20.13 11.92Q19.95 12.41 19.95 12.99Q19.95 13.58 20.13 14.07Q20.3 14.55 20.67 14.84Q21.03 15.12 21.6 15.12ZM23.22 16.5V11.69H22.99V7.14H24.78V16.5Z M5.76 29V28.78L9.21 23.51H6.15V21.98H11.93V22.2L8.5 27.47H11.8V29ZM15.92 29.2Q14.86 29.2 14.06 28.72Q13.27 28.25 12.82 27.41Q12.38 26.58 12.38 25.49Q12.38 24.39 12.83 23.56Q13.29 22.72 14.08 22.25Q14.88 21.79 15.92 21.79Q16.98 21.79 17.79 22.26Q18.59 22.73 19.04 23.57Q19.49 24.4 19.49 25.49Q19.49 26.58 19.03 27.42Q18.58 28.25 17.78 28.72Q16.98 29.2 15.92 29.2ZM15.92 27.54Q16.78 27.54 17.19 26.97Q17.61 26.39 17.61 25.49Q17.61 24.55 17.19 24Q16.76 23.44 15.92 23.44Q15.35 23.44 14.98 23.7Q14.6 23.96 14.43 24.42Q14.25 24.88 14.25 25.49Q14.25 26.43 14.67 26.99Q15.1 27.54 15.92 27.54ZM25.1 29V25.68Q25.1 25.44 25.07 25.07Q25.05 24.7 24.91 24.32Q24.77 23.94 24.47 23.69Q24.16 23.44 23.59 23.44Q23.36 23.44 23.1 23.51Q22.84 23.58 22.62 23.78Q22.39 23.99 22.24 24.39Q22.1 24.78 22.1 25.44L21.08 24.96Q21.08 24.12 21.42 23.4Q21.76 22.67 22.44 22.22Q23.12 21.77 24.15 21.77Q24.98 21.77 25.5 22.05Q26.02 22.33 26.31 22.76Q26.59 23.19 26.72 23.65Q26.84 24.12 26.87 24.5Q26.89 24.89 26.89 25.06V29ZM20.3 29V21.98H21.88V24.31H22.1V29ZM31.25 29.2Q30.17 29.2 29.35 28.73Q28.52 28.27 28.06 27.45Q27.59 26.63 27.59 25.58Q27.59 24.43 28.05 23.58Q28.5 22.73 29.3 22.26Q30.1 21.79 31.14 21.79Q32.25 21.79 33.02 22.3Q33.8 22.82 34.17 23.77Q34.54 24.71 34.43 25.98H32.68V25.33Q32.68 24.26 32.34 23.79Q31.99 23.32 31.22 23.32Q30.32 23.32 29.89 23.87Q29.47 24.42 29.47 25.49Q29.47 26.47 29.89 27.01Q30.32 27.54 31.14 27.54Q31.66 27.54 32.03 27.32Q32.4 27.09 32.6 26.66L34.37 27.17Q33.97 28.13 33.12 28.66Q32.26 29.2 31.25 29.2ZM28.92 25.98V24.67H33.57V25.98Z M6.54 41.5V31.95H8.31V41.5ZM11.61 41.7Q10.85 41.7 10.33 41.41Q9.81 41.12 9.54 40.63Q9.27 40.15 9.27 39.56Q9.27 39.08 9.42 38.67Q9.57 38.27 9.9 37.96Q10.24 37.65 10.8 37.44Q11.19 37.3 11.73 37.19Q12.27 37.08 12.95 36.98Q13.64 36.88 14.45 36.76L13.82 37.11Q13.82 36.48 13.52 36.19Q13.22 35.9 12.52 35.9Q12.13 35.9 11.71 36.09Q11.28 36.27 11.11 36.76L9.51 36.25Q9.78 35.38 10.52 34.83Q11.25 34.28 12.52 34.28Q13.45 34.28 14.17 34.57Q14.89 34.86 15.26 35.56Q15.47 35.95 15.51 36.34Q15.55 36.73 15.55 37.21V41.5H14V40.06L14.22 40.36Q13.71 41.06 13.11 41.38Q12.52 41.7 11.61 41.7ZM11.98 40.3Q12.47 40.3 12.81 40.13Q13.14 39.96 13.34 39.74Q13.54 39.52 13.61 39.37Q13.75 39.08 13.77 38.7Q13.79 38.32 13.79 38.07L14.31 38.2Q13.53 38.33 13.04 38.42Q12.55 38.5 12.25 38.58Q11.95 38.65 11.72 38.73Q11.46 38.84 11.31 38.96Q11.15 39.08 11.07 39.22Q11 39.36 11 39.54Q11 39.78 11.12 39.95Q11.24 40.12 11.46 40.21Q11.68 40.3 11.98 40.3ZM20.08 41.7Q19.04 41.7 18.33 41.21Q17.63 40.72 17.28 39.88Q16.92 39.04 16.92 37.99Q16.92 36.94 17.27 36.1Q17.62 35.26 18.31 34.77Q18.99 34.28 19.99 34.28Q21 34.28 21.75 34.77Q22.49 35.25 22.91 36.08Q23.32 36.92 23.32 37.99Q23.32 39.04 22.91 39.88Q22.51 40.72 21.78 41.21Q21.05 41.7 20.08 41.7ZM16.62 41.5V32.14H18.41V36.69H18.18V41.5ZM19.8 40.12Q20.37 40.12 20.73 39.84Q21.1 39.55 21.27 39.07Q21.45 38.58 21.45 37.99Q21.45 37.41 21.27 36.92Q21.08 36.44 20.7 36.15Q20.32 35.86 19.73 35.86Q19.18 35.86 18.84 36.12Q18.5 36.39 18.34 36.87Q18.18 37.35 18.18 37.99Q18.18 38.63 18.34 39.11Q18.5 39.59 18.85 39.86Q19.2 40.12 19.8 40.12ZM26.89 41.7Q25.57 41.7 24.75 41.09Q23.93 40.49 23.76 39.39L25.57 39.12Q25.68 39.62 26.06 39.89Q26.44 40.17 27.02 40.17Q27.5 40.17 27.76 39.99Q28.02 39.8 28.02 39.47Q28.02 39.26 27.92 39.14Q27.82 39.01 27.45 38.89Q27.09 38.76 26.33 38.56Q25.48 38.34 24.96 38.07Q24.45 37.8 24.22 37.41Q23.99 37.03 23.99 36.49Q23.99 35.82 24.34 35.32Q24.68 34.82 25.31 34.55Q25.94 34.28 26.79 34.28Q27.61 34.28 28.25 34.54Q28.89 34.79 29.28 35.26Q29.67 35.73 29.77 36.37L27.96 36.69Q27.91 36.3 27.62 36.07Q27.33 35.84 26.83 35.81Q26.34 35.77 26.04 35.94Q25.75 36.1 25.75 36.4Q25.75 36.59 25.87 36.71Q26 36.83 26.4 36.96Q26.8 37.09 27.62 37.3Q28.42 37.51 28.9 37.79Q29.39 38.06 29.61 38.45Q29.83 38.84 29.83 39.38Q29.83 40.46 29.05 41.08Q28.27 41.7 26.89 41.7Z"/><rect x="37.5" y="34" width="5" height="7.5" fill="#d52b1e"/></svg></div>
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
  const cover = await dataUri('src/assets/projects/saneo/doctor-calendar-day.webp', 1100);
  await shoot(page({ eyebrow: h.role, title: h.title, open: h.open, image: cover, host: 'saneo.al' }), `${lang}.png`);
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
