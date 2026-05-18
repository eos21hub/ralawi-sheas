#!/usr/bin/env node
/**
 * Convert source JPGs into purpose-sized WebPs.
 * Source: src/assets/source/*.JPG
 * Output: src/assets/products/*.webp
 */
import sharp from 'sharp';
import { mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src/assets/source');
const OUT = path.join(ROOT, 'src/assets/products');
const PUBLIC_OUT = path.join(ROOT, 'public/media');

// Maps source UUIDs (or substrings) to canonical names + crop hints.
const MAP = [
  { match: 'bbd9da46', name: '4kg-bucket', width: 1600, quality: 82 },
  { match: '28b306ab', name: '700g-tub', width: 1600, quality: 82 },
  { match: 'ad93fb5a', name: '1kg-bag', width: 1280, quality: 82 },
  { match: 'fad9f54d', name: '25kg-box', width: 1600, quality: 82 },
  { match: 'a54f966c', name: 'range-trio', width: 1920, quality: 84 },
  { match: '7cb86bbb', name: 'story-macro', width: 1600, quality: 82 },
  { match: 'b2c99e2d', name: 'bulk-1kg', width: 1600, quality: 80 },
  { match: '730eb277', name: 'bulk-4kg', width: 1600, quality: 80 },
  { match: 'd42abf12', name: 'bulk-25kg', width: 1600, quality: 80 },
  { match: 'a7c6ea12', name: 'bulk-700g', width: 1600, quality: 80 },
];

// Special derived outputs (until Higgsfield-generated assets arrive)
const DERIVED = [
  // Hero poster (mobile fallback if video can't play)
  { from: 'a54f966c', to: 'hero-poster', width: 1920, quality: 78 },
  // Final CTA cinemagraph poster
  { from: '7cb86bbb', to: 'cinemagraph-poster', width: 1920, quality: 78 },
];

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function run() {
  await ensureDir(OUT);
  await ensureDir(PUBLIC_OUT);

  const files = await readdir(SRC);
  const jpgs = files.filter((f) => /\.jpe?g$/i.test(f));
  console.log(`Found ${jpgs.length} source images in ${SRC}`);

  // Direct mapping
  for (const entry of MAP) {
    const file = jpgs.find((f) => f.toLowerCase().includes(entry.match));
    if (!file) {
      console.warn(`  ! No source match for ${entry.match} (${entry.name})`);
      continue;
    }
    const src = path.join(SRC, file);
    const dest = path.join(OUT, `${entry.name}.webp`);
    await sharp(src)
      .resize({ width: entry.width, withoutEnlargement: true })
      .webp({ quality: entry.quality, effort: 5 })
      .toFile(dest);
    console.log(`  ✓ ${entry.name}.webp (${entry.width}w q${entry.quality})`);
  }

  // Derived posters/etc
  for (const entry of DERIVED) {
    const file = jpgs.find((f) => f.toLowerCase().includes(entry.from));
    if (!file) continue;
    const dest = path.join(OUT, `${entry.to}.webp`);
    await sharp(path.join(SRC, file))
      .resize({ width: entry.width, withoutEnlargement: true })
      .webp({ quality: entry.quality, effort: 5 })
      .toFile(dest);
    console.log(`  ✓ ${entry.to}.webp (derived from ${entry.from})`);

    // Also drop a copy in /public/media as the video poster fallback
    await copyFile(dest, path.join(PUBLIC_OUT, `${entry.to}.webp`));
  }

  console.log('Done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
