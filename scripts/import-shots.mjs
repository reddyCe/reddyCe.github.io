// Converts raw PNG captures in captures/<slug>/ (git-ignored) into
// compact WebP sources in src/assets/projects/<slug>/, which Astro then resizes.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'captures');
const out = path.join(root, 'src/assets/projects');
if (!fs.existsSync(src)) process.exit(0);

for (const slug of fs.readdirSync(src)) {
  const dir = path.join(src, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  fs.mkdirSync(path.join(out, slug), { recursive: true });
  const keep = new Set();
  for (const f of fs.readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
    const name = f.replace(/\.(png|jpe?g)$/i, '.webp');
    keep.add(name);
    const target = path.join(out, slug, name);
    const from = path.join(dir, f);
    if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= fs.statSync(from).mtimeMs) continue;
    const img = sharp(from);
    const { width } = await img.metadata();
    await img
      .resize({ width: Math.min(width, 2560), withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(target);
    console.log(`${slug}/${name}`);
  }
  // drop assets whose capture was removed
  for (const f of fs.readdirSync(path.join(out, slug))) if (!keep.has(f)) fs.rmSync(path.join(out, slug, f));
}
