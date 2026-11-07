"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { belongsToAscendancy, nodeStats } from "@/lib/tree";
import type { TreeData, TreeNode } from "@/lib/types";

export interface NodePreview {
  add: number[];
  remove: number[];
}

interface Props {
  tree: TreeData;
  classIndex: number;
  ascendancy: string | null;
  view: "main" | "ascendancy";
  allocated: ReadonlySet<number>;
  attributes?: Record<number, number>;
  highlight?: ReadonlySet<number>;
  /** When provided, nodes are clickable. */
  onNodeClick?: (id: number, event: { shift: boolean }) => void;
  /** Path that hovering a node would allocate/remove. */
  previewFor?: (id: number) => NodePreview | null;
  className?: string;
}

/** Radius of the empty centre of the main tree (class starts sit just outside it). */
const CENTRE_RADIUS = 1390;
/** World size of the central ring art so that its circle passes through the class starts. */
const RING_SIZE = 3800;

const FRAME_KEY: Record<TreeNode["t"], string> = {
  normal: "normal",
  attribute: "normal",
  notable: "notable",
  ascStart: "notable",
  keystone: "keystone",
  jewel: "jewel",
  start: "start",
};
/** Frame radius relative to the node radius (frames are drawn around the icon). */
const FRAME_SCALE: Record<TreeNode["t"], number> = {
  normal: 1.4,
  attribute: 1.4,
  notable: 1.45,
  ascStart: 1.45,
  keystone: 1.5,
  jewel: 1.35,
  start: 1.6,
};

const RADIUS: Record<TreeNode["t"], number> = {
  normal: 27,
  attribute: 25,
  notable: 42,
  keystone: 58,
  jewel: 34,
  start: 80,
  ascStart: 42,
};

const COLORS = {
  edge: "#3a3227",
  edgeAlloc: "#d4a64f",
  edgeAdd: "#7fbf6a",
  edgeRemove: "#d0503f",
  node: "#2a241c",
  nodeStroke: "#6f6656",
  notableStroke: "#a8946c",
  keystoneStroke: "#c9b48a",
  jewelStroke: "#4fb3a9",
  alloc: "#d4a64f",
  allocStroke: "#ffe2a3",
  highlight: "#5be0f0",
};

interface Geometry {
  ids: number[];
  pos: Map<number, { x: number; y: number }>;
  edges: { a: number; b: number; draw: (ctx: Path2D) => void }[];
}

function buildGeometry(tree: TreeData, view: Props["view"], ascendancy: string | null, classIndex: number): Geometry {
  const pos = new Map<number, { x: number; y: number }>();
  const ids: number[] = [];
  const asc = view === "ascendancy" && ascendancy
    ? tree.classes[classIndex].ascendancies.find((a) => a.name === ascendancy)
    : null;
  for (const [key, n] of Object.entries(tree.nodes)) {
    const id = Number(key);
    if (view === "main") {
      if (n.a) continue;
      pos.set(id, { x: n.x, y: n.y });
    } else {
      if (!asc || !belongsToAscendancy(n, asc.name)) continue;
      pos.set(id, { x: n.x - asc.centre.x, y: n.y - asc.centre.y });
    }
    ids.push(id);
  }

  const edges: Geometry["edges"] = [];
  for (const e of tree.edges) {
    const [a, b] = e;
    const p = pos.get(a);
    const q = pos.get(b);
    if (!p || !q) continue;
    const r = e[2];
    const d = Math.hypot(q.x - p.x, q.y - p.y);
    if (r && r >= d / 2 && d > 0) {
      // Arc of radius r through p and q; `sweep` picks the side of the centre.
      const mx = (p.x + q.x) / 2;
      const my = (p.y + q.y) / 2;
      const h = Math.sqrt(Math.max(0, r * r - (d / 2) ** 2));
      const ux = -(q.y - p.y) / d;
      const uy = (q.x - p.x) / d;
      const side = e[3] ? 1 : -1;
      const cx = mx + side * h * ux;
      const cy = my + side * h * uy;
      const a1 = Math.atan2(p.y - cy, p.x - cx);
      const a2 = Math.atan2(q.y - cy, q.x - cx);
      let delta = a2 - a1;
      while (delta > Math.PI) delta -= 2 * Math.PI;
      while (delta < -Math.PI) delta += 2 * Math.PI;
      edges.push({
        a,
        b,
        draw: (path) => {
          path.moveTo(p.x, p.y);
          path.arc(cx, cy, r, a1, a2, delta < 0);
        },
      });
    } else {
      edges.push({
        a,
        b,
        draw: (path) => {
          path.moveTo(p.x, p.y);
          path.lineTo(q.x, q.y);
        },
      });
    }
  }
  return { ids, pos, edges };
}

const atlasCache = new Map<string, Promise<HTMLImageElement>>();

/** Loads the passive icon atlas once per page and shares it between tree instances. */
function useIconAtlas(url: string | undefined) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    if (!url) return;
    let promise = atlasCache.get(url);
    if (!promise) {
      promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
      atlasCache.set(url, promise);
    }
    let alive = true;
    promise.then((img) => alive && setImage(img)).catch(() => {});
    return () => {
      alive = false;
    };
  }, [url]);
  return image;
}

export function PassiveTree({
  tree,
  classIndex,
  ascendancy,
  view,
  allocated,
  attributes = {},
  highlight,
  onNodeClick,
  previewFor,
  className = "h-[600px]",
}: Props) {
  const { t } = useI18n();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const camera = useRef({ x: 0, y: 0, scale: 0.05 });
  const frame = useRef(0);
  const [hover, setHover] = useState<{ id: number; sx: number; sy: number } | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  // The icon atlas (~1 MB) is only fetched once nodes are drawn large enough to show icons.
  const [atlasWanted, setAtlasWanted] = useState(false);
  const atlas = useIconAtlas(atlasWanted ? tree.icons?.url : undefined);
  // Decorative game art: node frames (with the icons), the central ring and a class/ascendancy illustration.
  const art = tree.art;
  const frames = useIconAtlas(atlasWanted && art ? art.base + art.frames.url : undefined);
  const ring = useIconAtlas(art && view === "main" ? art.base + art.ring : undefined);
  const backdropName = view === "ascendancy" ? ascendancy : tree.classes[classIndex]?.name;
  const backdropFile = backdropName ? art?.classes[backdropName] : undefined;
  const backdrop = useIconAtlas(art && backdropFile ? art.base + backdropFile : undefined);
  const [full, setFull] = useState(false);

  const geo = useMemo(() => buildGeometry(tree, view, ascendancy, classIndex), [tree, view, ascendancy, classIndex]);
  const preview = useMemo(() => (hover && previewFor ? previewFor(hover.id) : null), [hover, previewFor]);
  const extent = useMemo(() => Math.max(0, ...[...geo.pos.values()].map((p) => Math.hypot(p.x, p.y))), [geo]);

  // Edge paths grouped by state, rebuilt only when allocation or preview changes.
  const paths = useMemo(() => {
    const base = new Path2D();
    const alloc = new Path2D();
    const add = new Path2D();
    const remove = new Path2D();
    const adding = new Set(preview?.add ?? []);
    const removing = new Set(preview?.remove ?? []);
    for (const e of geo.edges) {
      const aOn = allocated.has(e.a);
      const bOn = allocated.has(e.b);
      if (aOn && bOn) e.draw(removing.has(e.a) || removing.has(e.b) ? remove : alloc);
      else if ((aOn || adding.has(e.a)) && (bOn || adding.has(e.b))) e.draw(add);
      else e.draw(base);
    }
    return { base, alloc, add, remove, adding, removing };
  }, [geo, allocated, preview]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.w) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const { x, y, scale } = camera.current;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * (size.w / 2 - x * scale), dpr * (size.h / 2 - y * scale));

    const px = 1 / scale; // one screen pixel in world units
    if (!atlasWanted && RADIUS.notable * scale >= 4) setAtlasWanted(true);

    // Class (main view) or ascendancy illustration, inside the central ring like in game.
    if (backdrop && view === "main") {
      // Faint, enlarged copy behind the whole tree for atmosphere when zoomed out.
      const R = extent * 0.85;
      ctx.globalAlpha = 0.25;
      ctx.drawImage(backdrop, -R, -R, R * 2, R * 2);
      ctx.globalAlpha = 1;
    }
    if (backdrop) {
      const R = view === "main" ? CENTRE_RADIUS : extent + 220;
      ctx.save();
      ctx.globalAlpha = view === "main" ? 0.6 : 0.4;
      ctx.beginPath();
      ctx.arc(0, 0, R, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(backdrop, -R, -R, R * 2, R * 2);
      ctx.restore();
    }
    if (ring && view === "main") {
      ctx.globalAlpha = 0.85;
      ctx.drawImage(ring, -RING_SIZE / 2, -RING_SIZE / 2, RING_SIZE, RING_SIZE);
      ctx.globalAlpha = 1;
    }
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(5, 1.2 * px);
    ctx.strokeStyle = COLORS.edge;
    ctx.stroke(paths.base);
    ctx.lineWidth = Math.max(9, 2.5 * px);
    ctx.strokeStyle = COLORS.edgeAlloc;
    ctx.stroke(paths.alloc);
    ctx.strokeStyle = COLORS.edgeAdd;
    ctx.stroke(paths.add);
    ctx.strokeStyle = COLORS.edgeRemove;
    ctx.stroke(paths.remove);

    // Visible world rectangle, for culling.
    const halfW = size.w / 2 / scale;
    const halfH = size.h / 2 / scale;
    const showLabels = scale > 0.2;
    const startNode = tree.classes[classIndex]?.start;

    for (const id of geo.ids) {
      const p = geo.pos.get(id)!;
      if (Math.abs(p.x - x) > halfW + 80 || Math.abs(p.y - y) > halfH + 80) continue;
      const n = tree.nodes[id];
      const r = Math.max(RADIUS[n.t], (n.t === "normal" || n.t === "attribute" ? 2 : 3) * px);
      const on = allocated.has(id);
      const isRemove = paths.removing.has(id);
      const isAdd = paths.adding.has(id);

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      if (n.t === "start") {
        const mine = id === startNode;
        if (frames && art && r * scale >= 4) {
          const cell = art.frames.cell;
          const fs = r * 1.6;
          ctx.globalAlpha = mine ? 1 : 0.55;
          ctx.drawImage(frames, art.frames.keys.indexOf("start") * cell, 0, cell, cell, p.x - fs, p.y - fs, fs * 2, fs * 2);
          ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = mine ? "#3b2f1a" : "#1a1612";
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * (frames ? 1.25 : 1), 0, Math.PI * 2);
        ctx.lineWidth = Math.max(8, 1.5 * px);
        ctx.strokeStyle = mine ? COLORS.alloc : "#4a4032";
        ctx.stroke();
        continue;
      }
      const icons = tree.icons;
      let framed = false;
      if (atlas && icons && n.i !== undefined && r * scale >= 4) {
        // Real game icon, clipped to the node circle; dimmed until allocated.
        ctx.fillStyle = "#0d0b09";
        ctx.fill();
        ctx.save();
        ctx.clip();
        ctx.globalAlpha = on || isAdd ? 1 : 0.62;
        const sx = (n.i % icons.cols) * icons.cell;
        const sy = Math.floor(n.i / icons.cols) * icons.cell;
        ctx.drawImage(atlas, sx, sy, icons.cell, icons.cell, p.x - r, p.y - r, r * 2, r * 2);
        if (isRemove || isAdd) {
          ctx.globalAlpha = isRemove ? 0.5 : 0.22;
          ctx.fillStyle = isRemove ? COLORS.edgeRemove : COLORS.edgeAdd;
          ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
        }
        ctx.restore();
        if (frames && art) {
          // Game frame around the icon, matching the node state.
          const key = FRAME_KEY[n.t] + (on ? "Alloc" : isAdd ? "Path" : "");
          const cell = art.frames.cell;
          const fs = r * FRAME_SCALE[n.t];
          ctx.drawImage(frames, art.frames.keys.indexOf(key) * cell, 0, cell, cell, p.x - fs, p.y - fs, fs * 2, fs * 2);
          framed = true;
        }
      } else {
        ctx.fillStyle = isRemove ? "#5a2018" : on ? COLORS.alloc : isAdd ? "#2f4a26" : COLORS.node;
        ctx.fill();
      }
      if (!framed || isRemove) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.lineWidth = Math.max(n.t === "normal" || n.t === "attribute" ? 4 : 7, 1.2 * px);
      ctx.strokeStyle = isRemove
        ? COLORS.edgeRemove
        : on
          ? COLORS.allocStroke
          : isAdd
            ? COLORS.edgeAdd
            : n.t === "keystone"
              ? COLORS.keystoneStroke
              : n.t === "notable" || n.t === "ascStart"
                ? COLORS.notableStroke
                : n.t === "jewel"
                  ? COLORS.jewelStroke
                  : COLORS.nodeStroke;
      ctx.stroke();
      }
      if (n.t === "attribute" && on && attributes[id] !== undefined) {
        const letter = ["S", "D", "I"][attributes[id]];
        ctx.font = `bold ${r * 1.1}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineWidth = r * 0.25;
        ctx.strokeStyle = "#1a1612";
        ctx.strokeText(letter, p.x, p.y + r * 0.05);
        ctx.fillStyle = ["#f08070", "#90e080", "#90b8ff"][attributes[id]];
        ctx.fillText(letter, p.x, p.y + r * 0.05);
      }
      if (highlight?.has(id)) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + Math.max(10, 4 * px), 0, Math.PI * 2);
        ctx.lineWidth = Math.max(6, 2 * px);
        ctx.strokeStyle = COLORS.highlight;
        ctx.stroke();
      }
    }

    if (showLabels) {
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.font = `600 ${12 * px}px Inter, sans-serif`;
      for (const id of geo.ids) {
        const n = tree.nodes[id];
        if (n.t !== "notable" && n.t !== "keystone" && n.t !== "ascStart") continue;
        const p = geo.pos.get(id)!;
        if (Math.abs(p.x - x) > halfW || Math.abs(p.y - y) > halfH) continue;
        ctx.fillStyle = allocated.has(id) ? "#ffe2a3" : "#b8ad98";
        ctx.fillText(n.n, p.x, p.y + RADIUS[n.t] + 6 * px);
      }
    }
  }, [geo, paths, size, tree, allocated, attributes, highlight, classIndex, atlas, atlasWanted, frames, ring, backdrop, art, view, extent]);

  const requestDraw = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(draw);
  }, [draw]);

  useEffect(() => {
    requestDraw();
  }, [requestDraw]);

  // Resize canvas with its container.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.w) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    requestDraw();
  }, [size, requestDraw]);

  // Frame the view: allocated nodes if any, otherwise the class start (main) or the whole ascendancy.
  const fittedFor = useRef("");
  useEffect(() => {
    if (!size.w) return;
    const key = `${view}|${classIndex}|${ascendancy}`;
    if (fittedFor.current === key) return;
    fittedFor.current = key;
    let pts = geo.ids.filter((id) => allocated.has(id)).map((id) => geo.pos.get(id)!);
    if (view === "ascendancy" || pts.length < 2) {
      pts = view === "main" ? [geo.pos.get(tree.classes[classIndex].start)!] : geo.ids.map((id) => geo.pos.get(id)!);
    }
    if (!pts.length || !pts[0]) return;
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs) - 600;
    const maxX = Math.max(...xs) + 600;
    const minY = Math.min(...ys) - 600;
    const maxY = Math.max(...ys) + 600;
    const span = pts.length === 1 ? 1600 : 0;
    camera.current = {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
      scale: Math.min(size.w / (maxX - minX + span), size.h / (maxY - minY + span), 0.4),
    };
    requestDraw();
  }, [size, view, classIndex, ascendancy, geo, allocated, tree, requestDraw]);

  // --- Interaction -----------------------------------------------------------
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const drag = useRef({ moved: 0, pinch: 0 });

  const toWorld = (sx: number, sy: number) => {
    const { x, y, scale } = camera.current;
    return { x: (sx - size.w / 2) / scale + x, y: (sy - size.h / 2) / scale + y };
  };

  const hitTest = (sx: number, sy: number): number | null => {
    const w = toWorld(sx, sy);
    const tol = 6 / camera.current.scale;
    let best: number | null = null;
    let bestD = Infinity;
    for (const id of geo.ids) {
      const p = geo.pos.get(id)!;
      const d = Math.hypot(p.x - w.x, p.y - w.y);
      const n = tree.nodes[id];
      if (n.t === "start") continue;
      if (d < Math.max(RADIUS[n.t], 3 / camera.current.scale) + tol && d < bestD) {
        best = id;
        bestD = d;
      }
    }
    return best;
  };

  const zoomAt = (sx: number, sy: number, factor: number) => {
    const before = toWorld(sx, sy);
    const cam = camera.current;
    cam.scale = Math.min(1.5, Math.max(0.012, cam.scale * factor));
    const after = toWorld(sx, sy);
    cam.x += before.x - after.x;
    cam.y += before.y - after.y;
    requestDraw();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      zoomAt(e.clientX - rect.left, e.clientY - rect.top, Math.exp(-e.deltaY * 0.0015));
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  });

  const local = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    canvasRef.current!.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, local(e));
    drag.current.moved = 0;
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      drag.current.pinch = Math.hypot(a.x - b.x, a.y - b.y);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const p = local(e);
    const prev = pointers.current.get(e.pointerId);
    if (prev) {
      if (pointers.current.size === 2) {
        pointers.current.set(e.pointerId, p);
        const [a, b] = [...pointers.current.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (drag.current.pinch) zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, dist / drag.current.pinch);
        drag.current.pinch = dist;
        drag.current.moved += 10;
        return;
      }
      const dx = p.x - prev.x;
      const dy = p.y - prev.y;
      drag.current.moved += Math.abs(dx) + Math.abs(dy);
      pointers.current.set(e.pointerId, p);
      camera.current.x -= dx / camera.current.scale;
      camera.current.y -= dy / camera.current.scale;
      requestDraw();
      if (drag.current.moved > 4) setHover(null);
      return;
    }
    if (e.pointerType === "mouse") {
      const id = hitTest(p.x, p.y);
      setHover((h) => (id === null ? null : h?.id === id ? h : { id, sx: p.x, sy: p.y }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const p = local(e);
    const wasTap = pointers.current.size === 1 && drag.current.moved <= 4;
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) drag.current.pinch = 0;
    if (!wasTap) return;
    const id = hitTest(p.x, p.y);
    if (id === null) {
      setHover(null);
      return;
    }
    if (e.pointerType !== "mouse") {
      // Touch: first tap shows the tooltip, second tap on the same node acts.
      if (hover?.id !== id) {
        setHover({ id, sx: p.x, sy: p.y });
        return;
      }
    }
    onNodeClick?.(id, { shift: e.shiftKey });
  };

  const hovered = hover ? tree.nodes[hover.id] : null;

  useEffect(() => {
    const onChange = () => setFull(document.fullscreenElement === wrapRef.current);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !document.fullscreenElement && setFull(false);
    document.addEventListener("fullscreenchange", onChange);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggleFullscreen = async () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
      return;
    }
    if (full) {
      setFull(false);
      return;
    }
    // Native fullscreen when available; otherwise (e.g. iOS Safari) a fixed full-viewport overlay.
    if (el.requestFullscreen) {
      try {
        await el.requestFullscreen();
        return;
      } catch {
        // fall through to the overlay
      }
    }
    setFull(true);
  };

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none select-none overflow-hidden ${
        full ? "fixed inset-0 z-[60] h-[100dvh] w-screen" : `rounded-xl border border-line ${className}`
      }`}
      style={{ background: "radial-gradient(ellipse at center, #1c1610 0%, #110e0a 45%, #070605 100%)" }}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${hovered && onNodeClick ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={(e) => pointers.current.delete(e.pointerId)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
      />
      <button
        type="button"
        onClick={toggleFullscreen}
        className="absolute right-3 top-3 flex h-8 items-center gap-1.5 rounded-md border border-line-strong bg-surface/90 px-2 text-xs text-muted hover:text-ink"
        aria-label={full ? t.tree.exitFullscreen : t.tree.fullscreen}
        title={full ? t.tree.exitFullscreenEsc : t.tree.fullscreen}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {full ? (
            <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
          ) : (
            <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
          )}
        </svg>
        <span className="hidden sm:inline">{full ? t.tree.exitShort : t.tree.fullscreen}</span>
      </button>
      <div className="absolute bottom-3 right-3 flex flex-col gap-1">
        {[
          ["+", 1.4],
          ["−", 1 / 1.4],
        ].map(([label, f]) => (
          <button
            key={label}
            type="button"
            onClick={() => zoomAt(size.w / 2, size.h / 2, f as number)}
            className="h-8 w-8 rounded-md border border-line-strong bg-surface/90 text-lg leading-none text-muted hover:text-ink"
            aria-label={label === "+" ? t.tree.zoomIn : t.tree.zoomOut}
          >
            {label}
          </button>
        ))}
      </div>
      {hovered && hover && (
        <NodeTooltip
          node={hovered}
          attribute={attributes[hover.id]}
          allocated={allocated.has(hover.id)}
          preview={preview}
          x={hover.sx}
          y={hover.sy}
          bounds={size}
        />
      )}
    </div>
  );
}

function NodeTooltip({
  node,
  attribute,
  allocated,
  preview,
  x,
  y,
  bounds,
}: {
  node: TreeNode;
  attribute?: number;
  allocated: boolean;
  preview: NodePreview | null;
  x: number;
  y: number;
  bounds: { w: number; h: number };
}) {
  const { t, fmt } = useI18n();
  const left = Math.min(x + 16, bounds.w - 296);
  const top = y + 16 > bounds.h - 160 ? Math.max(8, y - 170) : y + 16;
  const kind = {
    normal: t.tree.kindNormal,
    attribute: t.tree.kindAttribute,
    notable: t.tree.kindNotable,
    keystone: t.tree.kindKeystone,
    jewel: t.tree.kindJewel,
    start: t.tree.kindStart,
    ascStart: t.tree.kindAscStart,
  }[node.t];
  return (
    <div
      className="pointer-events-none absolute z-10 w-72 rounded-lg border border-line-strong bg-surface/95 p-3 text-sm shadow-xl backdrop-blur"
      style={{ left: Math.max(8, left), top }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className={`font-semibold ${node.t === "keystone" || node.t === "notable" ? "text-gold" : "text-ink"}`}>
          {node.n}
        </span>
        <span className="text-xs text-faint">{kind}</span>
      </div>
      <ul className="mt-1.5 space-y-0.5 text-[#8fb6f0]">
        {nodeStats(node, attribute).map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      {node.t === "attribute" && allocated && <p className="mt-1.5 text-xs text-faint">{t.tree.shiftCycle}</p>}
      {node.f && <p className="mt-2 text-xs italic text-unique">{node.f}</p>}
      {preview && (preview.add.length > 0 || preview.remove.length > 0) && (
        <p className="mt-2 border-t border-line pt-2 text-xs text-muted">
          {preview.add.length > 0
            ? fmt(t.tree.clickAllocate, { n: preview.add.length })
            : fmt(t.tree.clickRefund, { n: preview.remove.length })}
        </p>
      )}
    </div>
  );
}
