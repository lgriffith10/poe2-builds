// Builds a single icon atlas for the passive tree from Path of Building's sprite textures.
//
// PoB ships passive icons as zstd-compressed DDS texture arrays (DX10 header, BC1 blocks, full mip chains).
// `tree.ddsCoords[file][iconPath]` gives the 1-based array slice of each icon.
import zlib from "node:zlib";
import { createCanvas, ImageData } from "@napi-rs/canvas";

export const ICON_SHEETS = ["skills_64_64_BC1.dds.zst", "skills_128_128_BC1.dds.zst", "skills_172_172_BC1.dds.zst", "skills_176_176_BC1.dds.zst"];
const CELL = 64;

/** Decodes one BC1 (DXT1) image to RGBA. */
function decodeBC1(src, offset, width, height) {
  const out = new Uint8ClampedArray(width * height * 4);
  const bw = Math.max(1, Math.ceil(width / 4));
  const bh = Math.max(1, Math.ceil(height / 4));
  const rgb = (c) => [((c >> 11) & 31) * 255 / 31, ((c >> 5) & 63) * 255 / 63, (c & 31) * 255 / 31];
  for (let by = 0; by < bh; by++) {
    for (let bx = 0; bx < bw; bx++) {
      const o = offset + (by * bw + bx) * 8;
      const c0 = src.readUInt16LE(o);
      const c1 = src.readUInt16LE(o + 2);
      const bits = src.readUInt32LE(o + 4);
      const p0 = rgb(c0);
      const p1 = rgb(c1);
      const palette =
        c0 > c1
          ? [[...p0, 255], [...p1, 255], [...p0.map((v, i) => (2 * v + p1[i]) / 3), 255], [...p0.map((v, i) => (v + 2 * p1[i]) / 3), 255]]
          : [[...p0, 255], [...p1, 255], [...p0.map((v, i) => (v + p1[i]) / 2), 255], [0, 0, 0, 0]];
      for (let py = 0; py < 4; py++) {
        for (let px = 0; px < 4; px++) {
          const x = bx * 4 + px;
          const y = by * 4 + py;
          if (x >= width || y >= height) continue;
          const color = palette[(bits >> (2 * (py * 4 + px))) & 3];
          out.set(color, (y * width + x) * 4);
        }
      }
    }
  }
  return out;
}

/** Parses a DX10 BC1 texture array and returns the top mip of every slice as RGBA. */
function readTextureArray(compressed) {
  const d = zlib.zstdDecompressSync(compressed);
  if (d.toString("latin1", 0, 4) !== "DDS ") throw new Error("Not a DDS file");
  const height = d.readUInt32LE(12);
  const width = d.readUInt32LE(16);
  const mips = Math.max(1, d.readUInt32LE(28));
  const fourcc = d.toString("latin1", 84, 88);
  let offset = 128;
  let slices = 1;
  if (fourcc === "DX10") {
    const format = d.readUInt32LE(128);
    if (format !== 71 && format !== 72) throw new Error(`Unsupported DXGI format ${format} (expected BC1)`);
    slices = d.readUInt32LE(140);
    offset = 148;
  } else if (fourcc !== "DXT1") throw new Error(`Unsupported DDS format ${fourcc}`);
  let sliceBytes = 0;
  for (let m = 0; m < mips; m++) {
    sliceBytes += Math.max(1, Math.ceil((width >> m) / 4)) * Math.max(1, Math.ceil((height >> m) / 4)) * 8;
  }
  return Array.from({ length: slices }, (_, i) => ({ width, height, rgba: decodeBC1(d, offset + i * sliceBytes, width, height) }));
}

/**
 * Packs every icon used by the tree into one WebP atlas.
 * @param tree raw PoB tree.json
 * @param sheets map of sheet file name -> compressed bytes
 * @returns { atlas: Buffer, index: Map<iconPath, cellIndex>, cols, cell }
 */
export async function buildIconAtlas(tree, sheets) {
  const used = new Set(Object.values(tree.nodes).map((n) => n.icon).filter(Boolean));
  const sources = new Map(); // icon path -> { sheet, slice }
  // Prefer the largest source for each icon (sheets are listed small to large).
  for (const sheet of ICON_SHEETS) {
    for (const [icon, slice] of Object.entries(tree.ddsCoords[sheet] ?? {})) {
      if (used.has(icon)) sources.set(icon, { sheet, slice });
    }
  }
  const decoded = Object.fromEntries(
    Object.entries(sheets).map(([sheet, bytes]) => [sheet, readTextureArray(bytes)]),
  );

  const icons = [...sources.keys()].sort();
  const cols = Math.ceil(Math.sqrt(icons.length));
  const rows = Math.ceil(icons.length / cols);
  const atlas = createCanvas(cols * CELL, rows * CELL);
  const ctx = atlas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  const index = new Map();
  icons.forEach((icon, i) => {
    const { sheet, slice } = sources.get(icon);
    const img = decoded[sheet][slice - 1];
    if (!img) return;
    const tmp = createCanvas(img.width, img.height);
    tmp.getContext("2d").putImageData(new ImageData(img.rgba, img.width, img.height), 0, 0);
    ctx.drawImage(tmp, (i % cols) * CELL, Math.floor(i / cols) * CELL, CELL, CELL);
    index.set(icon, i);
  });
  return { atlas: await atlas.encode("webp", 88), index, cols, cell: CELL, missing: used.size - index.size };
}
