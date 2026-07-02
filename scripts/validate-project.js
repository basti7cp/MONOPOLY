import fs from 'node:fs';
import zlib from 'node:zlib';
import { boardSpaces, validateBoardSpaces } from '../src/data/boardSpaces.js';
import { assetMap } from '../src/config/assetMap.js';

const PNG_SIGNATURE = '89504e470d0a1a0a';

function readPngInfo(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.subarray(0, 8).toString('hex') !== PNG_SIGNATURE) {
    throw new Error(`${filePath} is not a PNG file.`);
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idatChunks = [];
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString('ascii');
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    }
    offset += 12 + length;
  }

  return { width, height, bitDepth, colorType, idat: Buffer.concat(idatChunks) };
}

function countTransparentPixels(filePath) {
  const info = readPngInfo(filePath);
  if (info.bitDepth !== 8 || info.colorType !== 6) return 0;

  const raw = zlib.inflateSync(info.idat);
  const bytesPerPixel = 4;
  const stride = info.width * bytesPerPixel;
  const previous = Buffer.alloc(stride);
  const current = Buffer.alloc(stride);
  let transparent = 0;
  let rawOffset = 0;

  for (let y = 0; y < info.height; y += 1) {
    const filter = raw[rawOffset];
    rawOffset += 1;
    for (let x = 0; x < stride; x += 1) {
      const value = raw[rawOffset + x];
      const left = x >= bytesPerPixel ? current[x - bytesPerPixel] : 0;
      const up = previous[x];
      const upLeft = x >= bytesPerPixel ? previous[x - bytesPerPixel] : 0;
      if (filter === 0) current[x] = value;
      if (filter === 1) current[x] = (value + left) & 255;
      if (filter === 2) current[x] = (value + up) & 255;
      if (filter === 3) current[x] = (value + Math.floor((left + up) / 2)) & 255;
      if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        current[x] = (value + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft)) & 255;
      }
    }
    for (let x = 3; x < stride; x += bytesPerPixel) {
      if (current[x] < 8) transparent += 1;
    }
    current.copy(previous);
    rawOffset += stride;
  }

  return transparent;
}

const manifest = JSON.parse(fs.readFileSync('data/assets.manifest.json', 'utf8'));
const assetMapCount = Object.values(assetMap).reduce((sum, group) => sum + Object.keys(group).length, 0);
const plannedAssetMapCount = assetMapCount - Object.keys(assetMap.tiles).filter((key) => /^space\d+$/.test(key)).length;
const numberedTileEntries = Object.entries(assetMap.tiles).filter(([key]) => /^space\d+$/.test(key));
const requiredAssetFiles = [
  assetMap.board.boardBase,
  ...['zebra', 'car', 'van', 'bottle', 'fries', 'ship', 'scooter', 'knife'].map((token) => assetMap.tokens[token])
];
const errors = [];
if (!validateBoardSpaces(boardSpaces)) errors.push('Board must contain exactly 40 sequential spaces.');
if (plannedAssetMapCount !== manifest.assets.length) errors.push(`planned assetMap count ${plannedAssetMapCount} does not match manifest count ${manifest.assets.length}.`);
if (numberedTileEntries.length !== 40) errors.push(`assetMap.tiles must register 40 numbered board tiles, found ${numberedTileEntries.length}.`);
for (const space of boardSpaces) {
  const expectedPath = `assets/tiles/${space.index}.png`;
  if (space.tileImage !== expectedPath) errors.push(`Space ${space.index} must use tile image ${expectedPath}.`);
  if (assetMap.tiles[`space${space.index}`] !== expectedPath) errors.push(`assetMap.tiles.space${space.index} must be ${expectedPath}.`);
  if (!fs.existsSync(expectedPath)) errors.push(`Tile image ${expectedPath} is missing.`);
}
for (const asset of manifest.assets) {
  if (!asset.path || !asset.prompt) errors.push(`Asset ${asset.id} is missing path or prompt.`);
}
for (const assetPath of requiredAssetFiles) {
  if (!assetPath) {
    errors.push('A required board or token asset is not registered in assetMap.');
  } else if (!fs.existsSync(assetPath)) {
    errors.push(`Required asset ${assetPath} is missing.`);
  }
}
if (fs.existsSync(assetMap.board.boardBase)) {
  const boardBaseInfo = readPngInfo(assetMap.board.boardBase);
  if (boardBaseInfo.width >= 1000 || boardBaseInfo.height >= 1000) {
    errors.push(`Board base should be cropped below 1000px, found ${boardBaseInfo.width}x${boardBaseInfo.height}.`);
  }
}
for (const tokenPath of Object.values(assetMap.tokens)) {
  if (fs.existsSync(tokenPath) && countTransparentPixels(tokenPath) === 0) {
    errors.push(`Token asset ${tokenPath} must contain transparent background pixels.`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${boardSpaces.length} board spaces and ${manifest.assets.length} asset prompts.`);
