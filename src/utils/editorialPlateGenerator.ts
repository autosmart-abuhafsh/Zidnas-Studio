/**
 * High-Resolution Procedural Editorial Photography Plate Generator
 * Generates rich, atmospheric, zero-404 canvas photography plates for both
 * 2D gallery frames and 3D WebGL gallery textures.
 * If the studio owner replaces imageUrl in src/data/portfolio.ts or services.ts
 * with their own hosted photos, the site uses their photo and falls back to
 * these plates if offline.
 */

export type PlateTheme =
  | 'kebaya-wedding'
  | 'bromo-prewedding'
  | 'velvet-portrait'
  | 'heritage-family'
  | 'graduation-editorial'
  | 'artisan-product'
  | 'architecture-commercial'
  | 'cultural-stage'
  | 'batik-macro'
  | 'camera-craft'
  | 'lighting-bts'
  | 'direction-bts';

export interface PlateConfig {
  id: string;
  theme: PlateTheme;
  title: string;
  subtitle?: string;
  aspect?: 'portrait' | 'landscape' | 'square' | 'wide';
  accentColor?: string;
  secondaryColor?: string;
}

const plateCache = new Map<string, string>();

function seededRandom(seedStr: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    return (h >>> 0) / 4294967296;
  };
}

/**
 * Cross-browser rounded rectangle helper (avoids ctx.roundRect issues on older WebViews)
 */
function fillRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

/**
 * Draws a subtle Javanese Kawung geometric motif at given coordinates
 */
function drawKawungPattern(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  strokeStyle: string,
  lineWidth = 1
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;

  const r = size / 2;
  ctx.beginPath();
  ctx.arc(0, -r * 0.5, r * 0.5, 0, Math.PI * 2);
  ctx.arc(0, r * 0.5, r * 0.5, 0, Math.PI * 2);
  ctx.arc(-r * 0.5, 0, r * 0.5, 0, Math.PI * 2);
  ctx.arc(r * 0.5, 0, r * 0.5, 0, Math.PI * 2);
  ctx.stroke();

  // Center diamond accent
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

export function renderEditorialCanvas(
  canvas: HTMLCanvasElement,
  config: PlateConfig
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  const rand = seededRandom(config.id + config.theme);

  // Palette definitions matching Javanese Kebaya Design System
  const palettes: Record<
    PlateTheme,
    { bg1: string; bg2: string; glow: string; gold: string; rim: string }
  > = {
    'kebaya-wedding': {
      bg1: '#171518',
      bg2: '#651B32',
      glow: '#B9838C',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'bromo-prewedding': {
      bg1: '#171518',
      bg2: '#35251F',
      glow: '#C5A15A',
      gold: '#E5C882',
      rim: '#F7F0E5',
    },
    'velvet-portrait': {
      bg1: '#141115',
      bg2: '#4E1527',
      glow: '#B9838C',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'heritage-family': {
      bg1: '#1F1815',
      bg2: '#35251F',
      glow: '#C5A15A',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'graduation-editorial': {
      bg1: '#171518',
      bg2: '#2C221E',
      glow: '#C5A15A',
      gold: '#D4B475',
      rim: '#F7F0E5',
    },
    'artisan-product': {
      bg1: '#1A1617',
      bg2: '#35251F',
      glow: '#C5A15A',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'architecture-commercial': {
      bg1: '#121316',
      bg2: '#261D21',
      glow: '#B9838C',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'cultural-stage': {
      bg1: '#171518',
      bg2: '#651B32',
      glow: '#C5A15A',
      gold: '#DFBD78',
      rim: '#F7F0E5',
    },
    'batik-macro': {
      bg1: '#231715',
      bg2: '#651B32',
      glow: '#C5A15A',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'camera-craft': {
      bg1: '#111013',
      bg2: '#271E21',
      glow: '#C5A15A',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'lighting-bts': {
      bg1: '#151316',
      bg2: '#35251F',
      glow: '#B9838C',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'direction-bts': {
      bg1: '#171518',
      bg2: '#4A1828',
      glow: '#C5A15A',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
  };

  const pal = palettes[config.theme] || palettes['kebaya-wedding'];

  // 1. Base Studio Backdrop Gradient
  const baseGrad = ctx.createLinearGradient(0, 0, w * 0.85, h);
  baseGrad.addColorStop(0, pal.bg1);
  baseGrad.addColorStop(0.55, pal.bg2);
  baseGrad.addColorStop(1, '#100E11');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Dramatic Window / Softbox Light Shafts
  ctx.save();
  const beamGrad = ctx.createRadialGradient(
    w * (0.28 + rand() * 0.4),
    h * 0.28,
    w * 0.02,
    w * 0.5,
    h * 0.5,
    w * 0.85
  );
  beamGrad.addColorStop(0, `${pal.glow}44`);
  beamGrad.addColorStop(0.45, `${pal.gold}1E`);
  beamGrad.addColorStop(1, 'rgba(23, 21, 24, 0)');
  ctx.fillStyle = beamGrad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  // 3. Subtle Kawung Filigree Mesh in Background Shadow (Optimized loop for 60fps)
  ctx.save();
  const gridStep = Math.max(100, Math.floor(w / 5));
  for (let gx = gridStep / 2; gx < w; gx += gridStep) {
    for (let gy = gridStep / 2; gy < h; gy += gridStep) {
      if ((gx + gy) % 2 === 0) {
        drawKawungPattern(
          ctx,
          gx,
          gy,
          gridStep * 0.68,
          'rgba(197, 161, 90, 0.055)',
          1
        );
      }
    }
  }
  ctx.restore();

  // 4. Theme-Specific Editorial Subject Composition
  ctx.save();
  if (
    config.theme === 'kebaya-wedding' ||
    config.theme === 'velvet-portrait' ||
    config.theme === 'graduation-editorial'
  ) {
    const cx = w * 0.5 + (rand() - 0.5) * w * 0.06;
    const cy = h * 0.54;

    const halo = ctx.createRadialGradient(
      cx,
      cy - h * 0.1,
      10,
      cx,
      cy,
      w * 0.42
    );
    halo.addColorStop(0, 'rgba(247, 240, 229, 0.25)');
    halo.addColorStop(0.5, 'rgba(197, 161, 90, 0.12)');
    halo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy - h * 0.06, w * 0.42, 0, Math.PI * 2);
    ctx.fill();

    // Traditional Sanggul / Headpiece silhouette
    ctx.fillStyle = '#141114';
    ctx.beginPath();
    ctx.ellipse(cx, cy - h * 0.21, w * 0.085, h * 0.095, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sanggul bun
    ctx.beginPath();
    ctx.ellipse(
      cx + w * 0.055,
      cy - h * 0.22,
      w * 0.055,
      h * 0.05,
      -0.2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Golden Tusuk Konde hairpin rays
    ctx.strokeStyle = pal.gold;
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const angle = -0.7 + i * 0.22;
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.04, cy - h * 0.22);
      ctx.lineTo(
        cx + w * 0.04 + Math.cos(angle) * w * 0.14,
        cy - h * 0.22 + Math.sin(angle) * w * 0.14
      );
      ctx.stroke();
    }

    // Kebaya Kutubaru / Velvet Torso Drape
    const kebayaGrad = ctx.createLinearGradient(
      cx - w * 0.2,
      cy - h * 0.1,
      cx + w * 0.2,
      h
    );
    kebayaGrad.addColorStop(0, '#651B32');
    kebayaGrad.addColorStop(0.5, '#3E101F');
    kebayaGrad.addColorStop(1, '#171518');
    ctx.fillStyle = kebayaGrad;

    ctx.beginPath();
    ctx.moveTo(cx - w * 0.04, cy - h * 0.11);
    ctx.quadraticCurveTo(
      cx - w * 0.22,
      cy - h * 0.06,
      cx - w * 0.26,
      h * 0.95
    );
    ctx.lineTo(cx + w * 0.26, h * 0.95);
    ctx.quadraticCurveTo(
      cx + w * 0.22,
      cy - h * 0.06,
      cx + w * 0.04,
      cy - h * 0.11
    );
    ctx.closePath();
    ctx.fill();

    // Golden Kebaya Sulaman Embroidery Lapel Lines
    ctx.strokeStyle = 'rgba(197, 161, 90, 0.78)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.045, cy - h * 0.1);
    ctx.quadraticCurveTo(cx, cy + h * 0.08, cx, h * 0.92);
    ctx.moveTo(cx + w * 0.045, cy - h * 0.1);
    ctx.quadraticCurveTo(cx, cy + h * 0.08, cx, h * 0.92);
    ctx.stroke();

    // Golden Bros Kebaya Susun (3-tier breast brooch)
    for (let b = 0; b < 3; b++) {
      const by = cy - h * 0.01 + b * h * 0.045;
      const br = w * 0.024 * (1 - b * 0.15);
      ctx.fillStyle = pal.gold;
      ctx.beginPath();
      ctx.arc(cx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (
    config.theme === 'bromo-prewedding' ||
    config.theme === 'heritage-family'
  ) {
    const sunY = h * 0.38;
    const sunGrad = ctx.createRadialGradient(
      w * 0.52,
      sunY,
      5,
      w * 0.52,
      sunY,
      w * 0.45
    );
    sunGrad.addColorStop(0, 'rgba(247, 240, 229, 0.55)');
    sunGrad.addColorStop(0.35, 'rgba(197, 161, 90, 0.28)');
    sunGrad.addColorStop(1, 'rgba(23, 21, 24, 0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, w, h);

    const ridges = [
      { y: h * 0.52, amp: h * 0.08, col: 'rgba(53, 37, 31, 0.55)' },
      { y: h * 0.64, amp: h * 0.06, col: 'rgba(38, 25, 23, 0.78)' },
      { y: h * 0.76, amp: h * 0.04, col: '#171518' },
    ];
    ridges.forEach((ridge, idx) => {
      ctx.fillStyle = ridge.col;
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, ridge.y);
      for (let x = 0; x <= w; x += w / 12) {
        const peak =
          Math.sin(x * 0.008 + idx * 1.7) * ridge.amp +
          Math.cos(x * 0.015 - idx) * (ridge.amp * 0.5);
        ctx.lineTo(x, ridge.y + peak);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();
    });

    const fx = w * 0.48;
    const fy = h * 0.72;
    ctx.fillStyle = '#120F12';
    ctx.beginPath();
    ctx.arc(fx - w * 0.035, fy - h * 0.13, w * 0.022, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(fx - w * 0.065, fy);
    ctx.lineTo(fx - w * 0.05, fy - h * 0.11);
    ctx.lineTo(fx - w * 0.015, fy - h * 0.11);
    ctx.lineTo(fx - w * 0.005, fy);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(fx + w * 0.035, fy - h * 0.115, w * 0.02, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(fx + w * 0.005, fy);
    ctx.lineTo(fx + w * 0.018, fy - h * 0.095);
    ctx.lineTo(fx + w * 0.052, fy - h * 0.095);
    ctx.lineTo(fx + w * 0.075, fy);
    ctx.fill();

    ctx.strokeStyle = 'rgba(185, 131, 140, 0.65)';
    ctx.lineWidth = w * 0.018;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(fx + w * 0.04, fy - h * 0.08);
    ctx.bezierCurveTo(
      fx + w * 0.14,
      fy - h * 0.12,
      fx + w * 0.2,
      fy - h * 0.02,
      fx + w * 0.28,
      fy - h * 0.07
    );
    ctx.stroke();
  } else if (
    config.theme === 'batik-macro' ||
    config.theme === 'artisan-product'
  ) {
    const cx = w * 0.5;
    const cy = h * 0.5;
    for (let ring = 4; ring >= 1; ring--) {
      drawKawungPattern(
        ctx,
        cx,
        cy,
        w * 0.16 * ring,
        `rgba(197, 161, 90, ${0.12 + (5 - ring) * 0.08})`,
        1.8
      );
    }
    const objGrad = ctx.createLinearGradient(
      cx - w * 0.12,
      cy - h * 0.18,
      cx + w * 0.12,
      cy + h * 0.18
    );
    objGrad.addColorStop(0, '#DFBD78');
    objGrad.addColorStop(0.5, '#C5A15A');
    objGrad.addColorStop(1, '#5E4722');
    ctx.fillStyle = objGrad;
    fillRoundedRect(
      ctx,
      cx - w * 0.11,
      cy - h * 0.14,
      w * 0.22,
      h * 0.28,
      18
    );

    ctx.strokeStyle = '#F7F0E5';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - w * 0.085, cy - h * 0.11, w * 0.17, h * 0.22);
  } else {
    const cx = w * 0.5;
    const cy = h * 0.5;
    for (let i = 1; i <= 5; i++) {
      ctx.strokeStyle =
        i % 2 === 0
          ? 'rgba(197, 161, 90, 0.42)'
          : 'rgba(247, 240, 229, 0.18)';
      ctx.lineWidth = i === 3 ? 2.5 : 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, w * (0.07 * i), 0, Math.PI * 2);
      ctx.stroke();
    }
    const lensGrad = ctx.createRadialGradient(
      cx - w * 0.05,
      cy - h * 0.05,
      4,
      cx,
      cy,
      w * 0.22
    );
    lensGrad.addColorStop(0, 'rgba(247, 240, 229, 0.45)');
    lensGrad.addColorStop(0.4, 'rgba(101, 27, 50, 0.35)');
    lensGrad.addColorStop(0.8, 'rgba(197, 161, 90, 0.2)');
    lensGrad.addColorStop(1, 'rgba(23, 21, 24, 0)');
    ctx.fillStyle = lensGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, w * 0.22, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // 5. Creamy Depth-of-Field Bokeh Orbs (85mm f/1.2 Optical Aesthetic)
  ctx.save();
  const bokehCount = 8;
  for (let i = 0; i < bokehCount; i++) {
    const bx = rand() * w;
    const by = rand() * h;
    const br = w * (0.018 + rand() * 0.05);
    const alpha = 0.04 + rand() * 0.11;
    const bGrad = ctx.createRadialGradient(bx, by, br * 0.1, bx, by, br);
    const isGold = i % 2 === 0;
    const rgb = isGold ? '197, 161, 90' : '185, 131, 140';
    bGrad.addColorStop(0, `rgba(${rgb}, ${alpha * 0.4})`);
    bGrad.addColorStop(0.75, `rgba(${rgb}, ${alpha})`);
    bGrad.addColorStop(0.92, `rgba(${rgb}, ${alpha * 1.35})`);
    bGrad.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = bGrad;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // 6. Editorial Frame Border & Vignette
  const vig = ctx.createRadialGradient(
    w * 0.5,
    h * 0.5,
    w * 0.25,
    w * 0.5,
    h * 0.5,
    w * 0.78
  );
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(12, 10, 13, 0.72)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(197, 161, 90, 0.22)';
  ctx.lineWidth = 1;
  ctx.strokeRect(14, 14, w - 28, h - 28);
}

export function getEditorialPlateDataUrl(config: PlateConfig): string {
  const aspect = config.aspect || 'portrait';
  const key = `svg-${config.id}-${config.theme}-${aspect}`;
  if (plateCache.has(key)) {
    return plateCache.get(key)!;
  }

  const palettes: Record<
    PlateTheme,
    { bg1: string; bg2: string; glow: string; gold: string; rim: string }
  > = {
    'kebaya-wedding': {
      bg1: '#171518',
      bg2: '#651B32',
      glow: '#B9838C',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'bromo-prewedding': {
      bg1: '#171518',
      bg2: '#35251F',
      glow: '#C5A15A',
      gold: '#E5C882',
      rim: '#F7F0E5',
    },
    'velvet-portrait': {
      bg1: '#141115',
      bg2: '#4E1527',
      glow: '#B9838C',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'heritage-family': {
      bg1: '#1F1815',
      bg2: '#35251F',
      glow: '#C5A15A',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'graduation-editorial': {
      bg1: '#171518',
      bg2: '#2C221E',
      glow: '#C5A15A',
      gold: '#D4B475',
      rim: '#F7F0E5',
    },
    'artisan-product': {
      bg1: '#1A1617',
      bg2: '#35251F',
      glow: '#C5A15A',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'architecture-commercial': {
      bg1: '#121316',
      bg2: '#261D21',
      glow: '#B9838C',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'cultural-stage': {
      bg1: '#171518',
      bg2: '#651B32',
      glow: '#C5A15A',
      gold: '#DFBD78',
      rim: '#F7F0E5',
    },
    'batik-macro': {
      bg1: '#231715',
      bg2: '#651B32',
      glow: '#C5A15A',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'camera-craft': {
      bg1: '#111013',
      bg2: '#271E21',
      glow: '#C5A15A',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'lighting-bts': {
      bg1: '#151316',
      bg2: '#35251F',
      glow: '#B9838C',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
    'direction-bts': {
      bg1: '#171518',
      bg2: '#4A1828',
      glow: '#C5A15A',
      gold: '#C5A15A',
      rim: '#F7F0E5',
    },
  };

  const pal = palettes[config.theme] || palettes['kebaya-wedding'];
  const w = aspect === 'landscape' ? 600 : aspect === 'wide' ? 640 : aspect === 'square' ? 500 : 480;
  const h = aspect === 'landscape' ? 450 : aspect === 'wide' ? 360 : aspect === 'square' ? 500 : 640;
  const cx = w / 2;
  const cy = h / 2;

  let subjectMarkup = '';
  if (
    config.theme === 'kebaya-wedding' ||
    config.theme === 'velvet-portrait' ||
    config.theme === 'graduation-editorial'
  ) {
    subjectMarkup = `
      <circle cx="${cx}" cy="${cy - h * 0.06}" r="${w * 0.34}" fill="url(#halo)" />
      <ellipse cx="${cx}" cy="${cy - h * 0.19}" rx="${w * 0.08}" ry="${h * 0.09}" fill="#141114" />
      <ellipse cx="${cx + w * 0.05}" cy="${cy - h * 0.2}" rx="${w * 0.05}" ry="${h * 0.045}" fill="#141114" />
      <line x1="${cx + w * 0.03}" y1="${cy - h * 0.2}" x2="${cx + w * 0.16}" y2="${cy - h * 0.27}" stroke="${pal.gold}" stroke-width="2" />
      <line x1="${cx + w * 0.03}" y1="${cy - h * 0.2}" x2="${cx + w * 0.17}" y2="${cy - h * 0.21}" stroke="${pal.gold}" stroke-width="2" />
      <path d="M ${cx - w * 0.04} ${cy - h * 0.09} Q ${cx - w * 0.22} ${cy - h * 0.04} ${cx - w * 0.26} ${h * 0.94} L ${cx + w * 0.26} ${h * 0.94} Q ${cx + w * 0.22} ${cy - h * 0.04} ${cx + w * 0.04} ${cy - h * 0.09} Z" fill="url(#kebaya)" stroke="${pal.gold}" stroke-opacity="0.45" stroke-width="1.5" />
      <circle cx="${cx}" cy="${cy - h * 0.01}" r="${w * 0.022}" fill="${pal.gold}" />
      <circle cx="${cx}" cy="${cy + h * 0.035}" r="${w * 0.018}" fill="${pal.gold}" />
      <circle cx="${cx}" cy="${cy + h * 0.075}" r="${w * 0.014}" fill="${pal.gold}" />
    `;
  } else if (
    config.theme === 'bromo-prewedding' ||
    config.theme === 'heritage-family'
  ) {
    subjectMarkup = `
      <circle cx="${cx}" cy="${h * 0.36}" r="${w * 0.32}" fill="url(#halo)" />
      <path d="M 0 ${h} L 0 ${h * 0.56} Q ${w * 0.28} ${h * 0.44} ${w * 0.55} ${h * 0.54} T ${w} ${h * 0.49} L ${w} ${h} Z" fill="#2A1D19" fill-opacity="0.7" />
      <path d="M 0 ${h} L 0 ${h * 0.68} Q ${w * 0.35} ${h * 0.58} ${w * 0.68} ${h * 0.66} T ${w} ${h * 0.62} L ${w} ${h} Z" fill="#171518" />
      <circle cx="${cx - 18}" cy="${h * 0.58}" r="11" fill="#120F12" />
      <circle cx="${cx + 18}" cy="${h * 0.6}" r="10" fill="#120F12" />
      <path d="M ${cx - 32} ${h * 0.74} L ${cx - 24} ${h * 0.6} L ${cx - 8} ${h * 0.6} L ${cx - 2} ${h * 0.74} Z" fill="#651B32" />
      <path d="M ${cx + 2} ${h * 0.74} L ${cx + 10} ${h * 0.62} L ${cx + 26} ${h * 0.62} L ${cx + 34} ${h * 0.74} Z" fill="#35251F" />
    `;
  } else {
    subjectMarkup = `
      <circle cx="${cx}" cy="${cy}" r="${w * 0.3}" fill="url(#halo)" />
      <circle cx="${cx}" cy="${cy}" r="${w * 0.24}" fill="none" stroke="${pal.gold}" stroke-opacity="0.35" stroke-width="1.5" />
      <circle cx="${cx}" cy="${cy}" r="${w * 0.16}" fill="none" stroke="${pal.rim}" stroke-opacity="0.25" stroke-width="1.2" stroke-dasharray="6 4" />
      <circle cx="${cx}" cy="${cy}" r="${w * 0.08}" fill="${pal.bg2}" stroke="${pal.gold}" stroke-width="2" />
      <circle cx="${cx - 8}" cy="${cy - 8}" r="4" fill="${pal.rim}" fill-opacity="0.7" />
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0.85" y2="1">
        <stop offset="0%" stop-color="${pal.bg1}" />
        <stop offset="55%" stop-color="${pal.bg2}" />
        <stop offset="100%" stop-color="#100E11" />
      </linearGradient>
      <radialGradient id="halo" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stop-color="${pal.glow}" stop-opacity="0.38" />
        <stop offset="55%" stop-color="${pal.gold}" stop-opacity="0.14" />
        <stop offset="100%" stop-color="#171518" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="kebaya" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#651B32" />
        <stop offset="60%" stop-color="#3E101F" />
        <stop offset="100%" stop-color="#171518" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)" />
    ${subjectMarkup}
    <circle cx="${w * 0.22}" cy="${h * 0.26}" r="${w * 0.045}" fill="${pal.gold}" fill-opacity="0.12" />
    <circle cx="${w * 0.78}" cy="${h * 0.32}" r="${w * 0.06}" fill="${pal.glow}" fill-opacity="0.1" />
    <circle cx="${w * 0.72}" cy="${h * 0.74}" r="${w * 0.04}" fill="${pal.gold}" fill-opacity="0.1" />
    <rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke="${pal.gold}" stroke-opacity="0.24" stroke-width="1" />
  </svg>`;

  const url = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  plateCache.set(key, url);
  return url;
}
