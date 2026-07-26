"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LAND_MASK_BASE64, LAND_MASK_HEIGHT, LAND_MASK_WIDTH } from "./land-mask";

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;

/* Dots sit in latitude rows, but each row's longitude step widens with latitude so
   spacing stays even across the sphere instead of bunching into arcs at the poles. */
const LAT_STEP = 2.5;
const LON_STEP = 2.5;
const LAT_LIMIT = 84;

/* Camera sits slightly above the equator, matching the design's viewpoint. */
const TILT = 12 * DEG;
const SECONDS_PER_TURN = 48;

/* Depth is quantised so every dot at a similar depth can be filled in one pass. */
const DEPTH_LEVELS = 14;

type Dot = { lambda: number; sinPhi: number; cosPhi: number };

function buildDots(): Dot[] {
  const binary = atob(LAND_MASK_BASE64);
  const mask = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) mask[i] = binary.charCodeAt(i);

  const isLand = (lon: number, lat: number) => {
    const col = Math.min(LAND_MASK_WIDTH - 1, Math.max(0, Math.floor(lon + 180)));
    const row = Math.min(LAND_MASK_HEIGHT - 1, Math.max(0, Math.floor(90 - lat)));
    const bit = row * LAND_MASK_WIDTH + col;
    return (mask[bit >> 3] & (128 >> (bit & 7))) !== 0;
  };

  const dots: Dot[] = [];
  for (let lat = -LAT_LIMIT; lat <= LAT_LIMIT; lat += LAT_STEP) {
    const cosPhi = Math.cos(lat * DEG);
    const sinPhi = Math.sin(lat * DEG);
    const columns = Math.max(1, Math.round((360 * cosPhi) / LON_STEP));
    for (let i = 0; i < columns; i++) {
      const lon = -180 + (i * 360) / columns;
      if (!isLand(lon, lat)) continue;
      dots.push({ lambda: lon * DEG, sinPhi, cosPhi });
    }
  }
  return dots;
}

export default function RotatingGlobe({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = buildDots();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sinTilt = Math.sin(TILT);
    const cosTilt = Math.cos(TILT);

    let width = 0;
    let height = 0;
    let angle = 0;
    let lastTime = 0;
    let frame = 0;
    let visible = true;

    const draw = () => {
      if (!width || !height) return;
      const cx = width / 2;
      const cy = height / 2;
      const radius = (Math.min(width, height) / 2) * 0.94;

      ctx.clearRect(0, 0, width, height);

      // Soft halo bleeding just past the limb.
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.93, cx, cy, radius * 1.09);
      halo.addColorStop(0, "rgba(255,255,255,0)");
      halo.addColorStop(0.5, "rgba(255,255,255,0.08)");
      halo.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);

      // Sphere body: lit from the upper left, falling to black at the far edge.
      const body = ctx.createRadialGradient(
        cx - radius * 0.4,
        cy - radius * 0.45,
        radius * 0.05,
        cx,
        cy,
        radius * 1.02,
      );
      body.addColorStop(0, "#1d1d1d");
      body.addColorStop(0.45, "#0b0b0b");
      body.addColorStop(1, "#000000");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.fillStyle = body;
      ctx.fill();

      // Inner rim light, brightest toward the upper left.
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.clip();
      const inner = ctx.createRadialGradient(cx, cy, radius * 0.87, cx, cy, radius);
      inner.addColorStop(0, "rgba(255,255,255,0)");
      inner.addColorStop(1, "rgba(255,255,255,0.16)");
      ctx.fillStyle = inner;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.996, 0, TAU);
      const edge = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
      edge.addColorStop(0, "rgba(255,255,255,0.5)");
      edge.addColorStop(0.45, "rgba(255,255,255,0.12)");
      edge.addColorStop(1, "rgba(255,255,255,0.05)");
      ctx.strokeStyle = edge;
      ctx.lineWidth = Math.max(1, radius * 0.006);
      ctx.stroke();

      // Land dots, batched by depth so each alpha needs a single fill.
      const dotRadius = Math.max(0.55, radius * 0.0072);
      const paths: Path2D[] = [];
      for (let i = 0; i < DEPTH_LEVELS; i++) paths.push(new Path2D());

      for (const dot of dots) {
        const lon = dot.lambda + angle;
        const x = dot.cosPhi * Math.sin(lon);
        const yFlat = dot.sinPhi;
        const zFlat = dot.cosPhi * Math.cos(lon);
        const y = yFlat * cosTilt - zFlat * sinTilt;
        const z = yFlat * sinTilt + zFlat * cosTilt;
        if (z <= 0.015) continue;

        const level = Math.min(DEPTH_LEVELS - 1, (z * DEPTH_LEVELS) | 0);
        const depth = (level + 0.5) / DEPTH_LEVELS;
        const r = dotRadius * (0.62 + 0.38 * depth);
        const px = cx + x * radius;
        const py = cy - y * radius;
        paths[level].moveTo(px + r, py);
        paths[level].arc(px, py, r, 0, TAU);
      }

      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < DEPTH_LEVELS; i++) {
        ctx.globalAlpha = 0.32 + 0.68 * ((i + 0.5) / DEPTH_LEVELS);
        ctx.fill(paths[i]);
      }
      ctx.globalAlpha = 1;
    };

    const tick = (time: number) => {
      const delta = lastTime ? Math.min(time - lastTime, 100) : 0;
      lastTime = time;
      angle = (angle + (delta / 1000) * (TAU / SECONDS_PER_TURN)) % TAU;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || reduceMotion) return;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = wrap.clientWidth;
      if (!size) return;
      width = size * dpr;
      height = size * dpr;
      canvas.width = width;
      canvas.height = height;
      draw();
      setPainted(true);
    };

    resize();
    if (visible) start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    // Only animate while the globe is on screen and the tab is in the foreground.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    intersectionObserver.observe(wrap);

    const onVisibilityChange = () => {
      if (document.hidden || !visible) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative aspect-square ${className}`}>
      {/* Static render from the design, covering the canvas until it paints its first
          frame — and standing in for it entirely when canvas or scripting is unavailable. */}
      <Image
        src="/images/globe.png"
        alt="A globe with the world's landmasses picked out in light"
        fill
        sizes="(max-width: 1024px) 80vw, 469px"
        className={`object-contain transition-opacity duration-300 ${
          painted ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </div>
  );
}
