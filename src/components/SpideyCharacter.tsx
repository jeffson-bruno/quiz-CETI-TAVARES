import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const SPIDEY_IMAGE_URL = '/assets/aistudio/imagem_homen_aranha_c239efa2.jpg';

type SpideyPose = 'shooter' | 'clinger';

const processedPoseCache: Partial<Record<SpideyPose, string>> = {};
let preloadPromise: Promise<void> | null = null;

function extractTransparentPose(img: HTMLImageElement, pose: SpideyPose): string {
  const cached = processedPoseCache[pose];
  if (cached) return cached;

  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const sy = pose === 'shooter' ? 0 : Math.floor(h * 0.51);
  const sh = pose === 'shooter' ? Math.floor(h * 0.51) : h - Math.floor(h * 0.51);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = sh;
  const ctx = canvas.getContext('2d');
  if (!ctx) return SPIDEY_IMAGE_URL;

  ctx.drawImage(img, 0, sy, w, sh, 0, 0, w, sh);
  const imageData = ctx.getImageData(0, 0, w, sh);
  const data = imageData.data;

  const visited = new Uint8Array(w * sh);
  const queue = new Int32Array(w * sh);
  let head = 0;
  let tail = 0;

  const isBgWhite = (idx: number) => {
    const p = idx * 4;
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return r > 222 && g > 222 && b > 222 && max - min < 28;
  };

  const enqueueIfBg = (x: number, y: number) => {
    if (x < 0 || x >= w || y < 0 || y >= sh) return;
    const idx = y * w + x;
    if (visited[idx]) return;
    if (isBgWhite(idx)) {
      visited[idx] = 1;
      queue[tail++] = idx;
    }
  };

  for (let x = 0; x < w; x++) {
    enqueueIfBg(x, 0);
    enqueueIfBg(x, sh - 1);
  }
  for (let y = 0; y < sh; y++) {
    enqueueIfBg(0, y);
    enqueueIfBg(w - 1, y);
  }

  while (head < tail) {
    const curr = queue[head++];
    const p = curr * 4;
    data[p + 3] = 0;

    const cx = curr % w;
    const cy = (curr - cx) / w;
    enqueueIfBg(cx - 1, cy);
    enqueueIfBg(cx + 1, cy);
    enqueueIfBg(cx, cy - 1);
    enqueueIfBg(cx, cy + 1);
  }

  let minX = w;
  let minY = sh;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const p = idx * 4;
      if (data[p + 3] > 0) {
        const r = data[p];
        const g = data[p + 1];
        const b = data[p + 2];
        if (r > 235 && g > 235 && b > 235) {
          const touchesTransparent =
            (x > 0 && data[(idx - 1) * 4 + 3] === 0) ||
            (x < w - 1 && data[(idx + 1) * 4 + 3] === 0) ||
            (y > 0 && data[(idx - w) * 4 + 3] === 0) ||
            (y < sh - 1 && data[(idx + w) * 4 + 3] === 0);
          if (touchesTransparent) {
            data[p + 3] = 60;
          }
        }
        if (data[p + 3] > 20) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  if (maxX <= minX || maxY <= minY) {
    return SPIDEY_IMAGE_URL;
  }

  const pad = 6;
  const cx = Math.max(0, minX - pad);
  const cy = Math.max(0, minY - pad);
  const cw = Math.min(w - cx, maxX - minX + 1 + pad * 2);
  const ch = Math.min(sh - cy, maxY - minY + 1 + pad * 2);

  const trimmed = document.createElement('canvas');
  trimmed.width = cw;
  trimmed.height = ch;
  const tCtx = trimmed.getContext('2d');
  if (!tCtx) return SPIDEY_IMAGE_URL;

  tCtx.drawImage(canvas, cx, cy, cw, ch, 0, 0, cw, ch);
  const url = trimmed.toDataURL('image/png');
  processedPoseCache[pose] = url;
  return url;
}

export function preloadSpideyPoses(): Promise<void> {
  if (processedPoseCache.shooter && processedPoseCache.clinger) {
    return Promise.resolve();
  }
  if (preloadPromise) return preloadPromise;

  preloadPromise = new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        extractTransparentPose(img, 'shooter');
        extractTransparentPose(img, 'clinger');
      } catch {
        // fallback handled in component
      }
      resolve();
    };
    img.onerror = () => resolve();
    img.src = SPIDEY_IMAGE_URL;
  });

  return preloadPromise;
}

const SpideySprite: React.FC<{
  pose: SpideyPose;
  alt: string;
  className?: string;
}> = ({ pose, alt, className = '' }) => {
  const [src, setSrc] = useState<string>(processedPoseCache[pose] ?? '');

  useEffect(() => {
    if (processedPoseCache[pose]) {
      setSrc(processedPoseCache[pose]!);
      return;
    }

    let cancelled = false;
    preloadSpideyPoses().then(() => {
      if (!cancelled) {
        setSrc(processedPoseCache[pose] ?? SPIDEY_IMAGE_URL);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [pose]);

  if (!src) {
    return <div aria-hidden="true" className={`w-full h-full ${className}`} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      className={`w-full h-full object-contain select-none pointer-events-none ${className}`}
    />
  );
};

export const SpideyThinking: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className={`relative w-full h-full flex items-center justify-center animate-char-bob ${className}`}
  >
    {/* Ponto de interrogação ciano original flutuando */}
    <svg
      viewBox="0 0 40 60"
      aria-hidden="true"
      className="absolute -top-4 -right-2 sm:-top-5 sm:-right-3 w-7 h-10 sm:w-9 sm:h-12 animate-qmark-float drop-shadow-[0_3px_8px_rgba(0,0,0,0.45)]"
    >
      <path
        d="M 10 18 C 10 7, 30 7, 30 18 C 30 26, 20 28, 20 36"
        fill="none"
        stroke="#06C8E8"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="20" cy="49" r="4.5" fill="#06C8E8" />
    </svg>

    <SpideySprite
      pose="shooter"
      alt="Homem-Aranha pronto para responder"
      className="drop-shadow-[0_8px_16px_rgba(12,8,35,0.55)]"
    />
  </motion.div>
);

export const SpideyPullingHero: React.FC<{
  className?: string;
  pullOffset: { x: number; y: number } | null;
}> = ({ className = '', pullOffset }) => {
  const targetX = pullOffset ? pullOffset.x : 0;
  const targetY = pullOffset ? pullOffset.y : 0;

  return (
    <motion.div
      style={{ transformOrigin: 'center center' }}
      initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
      animate={
        pullOffset
          ? {
              x: [0, 0, targetX * 0.42, targetX],
              y: [0, 0, targetY * 0.52, targetY],
              scale: [1, 1.04, 0.86, 0.68],
              rotate: [0, -6, 6, 0],
            }
          : { x: 0, y: 0, scale: [1, 1.04, 1] }
      }
      transition={{
        duration: 0.85,
        times: [0, 0.28, 0.62, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative w-full h-full flex items-center justify-center ${className}`}
    >
      {/* Brilho ciano ao pousar na borda esquerda da resposta certa */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 0, 0.85, 0], scale: [0.4, 0.4, 1.2, 1.4] }}
        transition={{ duration: 0.9, times: [0, 0.72, 0.88, 1] }}
        className="absolute inset-0 rounded-full bg-[#06C8E8]/35 blur-md pointer-events-none"
      />

      <SpideySprite
        pose="clinger"
        alt="Homem-Aranha puxando-se pela teia até ficar em cima da resposta correta"
        className="drop-shadow-[0_10px_18px_rgba(12,8,35,0.6)]"
      />
    </motion.div>
  );
};

export const SpideySad: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div
    initial={{ opacity: 0.85, y: -4, rotate: 0 }}
    animate={{ opacity: 1, y: 6, rotate: -7 }}
    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    className={`relative w-full h-full flex items-center justify-center animate-char-sad ${className}`}
  >
    {/* Linhas de tristeza */}
    <svg
      viewBox="0 0 44 40"
      aria-hidden="true"
      className="absolute -top-4 -right-2 w-8 h-8 text-[#7B93E8]"
    >
      <path d="M 10 10 L 10 26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M 22 6 L 22 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M 34 12 L 34 26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>

    {/* Lágrima ciano animada */}
    <svg
      viewBox="0 0 20 28"
      aria-hidden="true"
      className="absolute top-[36%] left-[32%] w-4 h-6 z-20 animate-tear-drop"
    >
      <path
        d="M 10 2 C 10 2, 3 12, 3 18 C 3 22.5, 6 26, 10 26 C 14 26, 17 22.5, 17 18 C 17 12, 10 2, 10 2 Z"
        fill="#06C8E8"
        stroke="#0F172A"
        strokeWidth="1.5"
      />
    </svg>

    <SpideySprite
      pose="shooter"
      alt="Homem-Aranha triste com o erro"
      className="brightness-90 saturate-75 drop-shadow-[0_8px_14px_rgba(12,8,35,0.55)]"
    />
  </motion.div>
);

export const SpideyPresenter: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: 14 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className={`relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center animate-char-present ${className}`}
  >
    <SpideySprite
      pose="shooter"
      alt="Homem-Aranha apresentando o resultado"
      className="drop-shadow-[0_8px_16px_rgba(12,8,35,0.55)]"
    />
  </motion.div>
);
