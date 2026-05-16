/**
 * Generate favicons from stray-gear.png with rounded corners.
 * 
 * Usage: 
 *   npm install -D sharp png-to-ico
 *   node scripts/generate-favicons.mjs
 * 
 * Or just: npm install -D sharp && node scripts/generate-favicons.mjs
 */

import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const source = join(root, 'assets', 'img', 'stray-gear.png');
const publicDir = join(root, 'public');

// Rounded rectangle SVG mask
function roundedMask(size, radius) {
  return Buffer.from(
    `<svg width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>`
  );
}

async function generate() {
  const sizes = [
    { name: 'favicon-16x16.png', size: 16, radius: 3 },
    { name: 'favicon-32x32.png', size: 32, radius: 5 },
    { name: 'apple-touch-icon.png', size: 180, radius: 15 },
    { name: 'android-chrome-192x192.png', size: 192, radius: 15 },
    { name: 'android-chrome-512x512.png', size: 512, radius: 40 },
  ];

  for (const { name, size, radius } of sizes) {
    const mask = roundedMask(size, radius);
    await sharp(source)
      .resize(size, size, { fit: 'cover' })
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toFile(join(publicDir, name));
    console.log(`✓ ${name} (${size}x${size}, radius ${radius}px)`);
  }

  // Generate favicon.ico from the 32x32 version
  const ico32 = await sharp(source)
    .resize(32, 32, { fit: 'cover' })
    .composite([{ input: roundedMask(32, 5), blend: 'dest-in' }])
    .png()
    .toBuffer();

  const ico16 = await sharp(source)
    .resize(16, 16, { fit: 'cover' })
    .composite([{ input: roundedMask(16, 3), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Create a simple ICO file (with PNG payload - supported by all modern browsers)
  const icoBuffer = createIco([
    { png: ico16, size: 16 },
    { png: ico32, size: 32 },
  ]);
  writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ favicon.ico (16x16 + 32x32)');

  console.log('\nDone! All favicons generated from stray-gear.png with rounded corners.');
}

// Minimal ICO file builder (PNG-in-ICO format)
function createIco(images) {
  const headerSize = 6;
  const dirEntrySize = 16;
  const dataOffset = headerSize + dirEntrySize * images.length;

  // ICO header
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);      // reserved
  header.writeUInt16LE(1, 2);      // type: 1 = ICO
  header.writeUInt16LE(images.length, 4); // image count

  // Directory entries + image data
  const entries = [];
  const datas = [];
  let offset = dataOffset;

  for (const { png, size } of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size < 256 ? size : 0, 0);  // width
    entry.writeUInt8(size < 256 ? size : 0, 1);  // height
    entry.writeUInt8(0, 2);         // color palette
    entry.writeUInt8(0, 3);         // reserved
    entry.writeUInt16LE(1, 4);      // color planes
    entry.writeUInt16LE(32, 6);     // bits per pixel
    entry.writeUInt32LE(png.length, 8);  // data size
    entry.writeUInt32LE(offset, 12);     // data offset
    entries.push(entry);
    datas.push(png);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...datas]);
}

generate().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
