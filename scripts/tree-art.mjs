// Extracts decorative passive tree art from Path of Building's BC7 textures:
//  - node frames (normal / notable / keystone / jewel, in unallocated / path / allocated states) packed in one atlas
//  - the class start ornament and the central ring (BGTree)
//  - one illustration per class and ascendancy, shown behind the tree
import fs from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";
import { createCanvas, ImageData } from "@napi-rs/canvas";
import { decodeImage, parseDDSHeader } from "dds-ktx-parser";

export const ART_SHEETS = [
  "group-background_112_112_BC7.dds.zst",
  "group-background_160_164_BC7.dds.zst",
  "group-background_228_232_BC7.dds.zst",
  "group-background_536_536_BC7.dds.zst",
  "ascendancy-background_4008_4008_BC7.dds.zst",
  "ascendancy-background_1500_1500_BC7.dds.zst",
];

/** Frames used by the renderer: key -> ddsCoords sprite name. */
const FRAMES = {
  normal: "PSSkillFrame",
  normalPath: "PSSkillFrameHighlighted",
  normalAlloc: "PSSkillFrameActive",
  notable: "NotableFrameUnallocated",
  notablePath: "NotableFrameCanAllocate",
  notableAlloc: "NotableFrameAllocated",
  keystone: "KeystoneFrameUnallocated",
  keystonePath: "KeystoneFrameCanAllocate",
  keystoneAlloc: "KeystoneFrameAllocated",
  jewel: "JewelFrameUnallocated",
  jewelPath: "JewelFrameCanAllocate",
  jewelAlloc: "JewelFrameAllocated",
  start: "PSStartNodeBackgroundInactive",
};
const FRAME_CELL = 128;

function decodeSheet(compressed) {
  const bytes = new Uint8Array(zlib.zstdDecompressSync(compressed));
  const info = parseDDSHeader(bytes, bytes.length);
  if (!info) throw new Error("Unreadable DDS texture");
  return { bytes, info };
}

/** Decodes the top mip of one array slice (1-based, as in ddsCoords) to a canvas. */
function sliceToCanvas(sheet, slice) {
  const layer = sheet.info.layers.find((l) => l.level === 0 && l.arrayIndex === slice - 1);
  if (!layer) throw new Error(`Missing slice ${slice}`);
  const rgba = decodeImage(sheet.bytes, sheet.info.format, layer);
  const { width, height } = layer.shape;
  const canvas = createCanvas(width, height);
  canvas
    .getContext("2d")
    .putImageData(new ImageData(new Uint8ClampedArray(rgba.buffer, rgba.byteOffset, rgba.byteLength), width, height), 0, 0);
  return canvas;
}

function resized(canvas, size) {
  const scale = Math.min(size / canvas.width, size / canvas.height, 1);
  const out = createCanvas(Math.round(canvas.width * scale), Math.round(canvas.height * scale));
  const ctx = out.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(canvas, 0, 0, out.width, out.height);
  return out;
}

/**
 * @param tree raw PoB tree.json
 * @param readSheet (fileName) => Promise<Buffer>
 * @param outDir public output directory (e.g. public/data/tree-art)
 * @returns metadata stored in the compact tree under `art`
 */
export async function buildTreeArt(tree, readSheet, outDir) {
  await fs.mkdir(path.join(outDir, "classes"), { recursive: true });
  const sheets = {};
  const sheet = async (file) => (sheets[file] ??= decodeSheet(await readSheet(file)));
  const findSprite = (name) => {
    for (const [file, sprites] of Object.entries(tree.ddsCoords)) {
      const v = sprites[name];
      if (v !== undefined) return { file, slice: Array.isArray(v) ? v[4] : v };
    }
    throw new Error(`Sprite ${name} not found`);
  };

  // Frames atlas: one row of fixed-size cells.
  const keys = Object.keys(FRAMES);
  const atlas = createCanvas(FRAME_CELL * keys.length, FRAME_CELL);
  const actx = atlas.getContext("2d");
  actx.imageSmoothingQuality = "high";
  for (const [i, key] of keys.entries()) {
    const { file, slice } = findSprite(FRAMES[key]);
    actx.drawImage(sliceToCanvas(await sheet(file), slice), i * FRAME_CELL, 0, FRAME_CELL, FRAME_CELL);
  }
  await fs.writeFile(path.join(outDir, "frames.webp"), await atlas.encode("webp", 85));

  // Central ring.
  const ring = findSprite("BGTree");
  await fs.writeFile(path.join(outDir, "ring.webp"), await resized(sliceToCanvas(await sheet(ring.file), ring.slice), 1200).encode("webp", 75));

  // Class and ascendancy illustrations.
  const classes = [];
  for (const [name, index] of Object.entries(tree.ddsCoords["ascendancy-background_1500_1500_BC7.dds.zst"] ?? {})) {
    if (!name.startsWith("Classes")) continue;
    const id = name.slice("Classes".length);
    const file = `${id.toLowerCase().replace(/[^a-z]+/g, "-")}.webp`;
    const img = resized(sliceToCanvas(await sheet("ascendancy-background_1500_1500_BC7.dds.zst"), index), 900);
    await fs.writeFile(path.join(outDir, "classes", file), await img.encode("webp", 72));
    classes.push([id, file]);
  }

  return {
    base: "/data/tree-art/",
    frames: { url: "frames.webp", cell: FRAME_CELL, keys },
    ring: "ring.webp",
    classes: Object.fromEntries(classes.map(([id, file]) => [id, `classes/${file}`])),
  };
}
