// RESONANCE Master Builder
// Clean, verified, visual-first bioacoustics exhibition
const fs = require('fs');
const vm = require('vm');
const { dualViewCss } = require('./build_dual_view_system.js');
const {
  mathAndSimCss,
  getWaveSpeedMathCard,
  getSoundSpeedMediumMathCard,
  getHarmonicWaveParamsMathCard,
  getMiddleEarImpedanceMathCard,
  getGreenwoodMapMathCard,
  getVocoderCapacityMathCard
} = require('./pedagogical_math_cards.js');

console.log('Starting RESONANCE Master Build...');

// ----------------------------------------------------------------------------
// EMOJI CHECKER
// ----------------------------------------------------------------------------
function assertNoEmojis(text) {
  const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;
  const match = text.match(emojiRegex);
  if (match) {
    throw new Error('Detected forbidden emoji: ' + match[0]);
  }
}

// ----------------------------------------------------------------------------
// COLOR PALETTE (Solid Colors Only - No CSS Gradients)
// ----------------------------------------------------------------------------
const C = {
  ivory: '#F8F7F2',
  white: '#FFFFFF',
  sagePale: '#E5EDE6',
  tealMuted: '#8EAAA5',
  forest: '#345B50',
  forestDark: '#233F37',
  charcoal: '#343A38',
  charcoalMuted: '#68726F',
  stone: '#E9E6DD',
  stoneDark: '#D5D0C3',
  clay: '#C67D5A',
  clayPale: '#F5ECE7',
  border: '#D9D5CB',
  borderLight: '#E8E5DD'
};

console.log('Palette and assertions ready.');
// ----------------------------------------------------------------------------
// STYLESHEET (Soft Light Editorial Palette & Consistent Rounded UI)
// ----------------------------------------------------------------------------
function getCss() {
  return `
:root {
  --ivory: ${C.ivory};
  --white: ${C.white};
  --sage-pale: ${C.sagePale};
  --teal-muted: ${C.tealMuted};
  --forest: ${C.forest};
  --forest-dark: ${C.forestDark};
  --charcoal: ${C.charcoal};
  --charcoal-muted: ${C.charcoalMuted};
  --stone: ${C.stone};
  --stone-dark: ${C.stoneDark};
  --clay: ${C.clay};
  --clay-pale: ${C.clayPale};
  --border: ${C.border};
  --border-light: ${C.borderLight};

  --font-display: 'Newsreader', Georgia, 'Times New Roman', serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;

  /* Standardized Corner Radii */
  --radius-full: 9999px;
  --radius-xl: 22px;
  --radius-lg: 18px;
  --radius-md: 14px;
  --radius-sm: 10px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 76px;
  background-color: var(--ivory);
  color: var(--charcoal);
  font-family: var(--font-sans);
  font-size: 17px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--ivory);
  color: var(--charcoal);
  overflow-x: hidden;
}

a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible {
  outline: 2px solid var(--forest);
  outline-offset: 3px;
  border-radius: var(--radius-full);
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  color: var(--forest);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.015em;
}

h1 {
  font-size: clamp(2.8rem, 5.5vw, 4.4rem);
  font-weight: 400;
  line-height: 1.05;
  margin-bottom: 0.6rem;
}

h2 {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 500;
  margin-bottom: 0.85rem;
}

h3 {
  font-size: 1.45rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

p {
  color: var(--charcoal);
  font-size: 1.05rem;
  margin-bottom: 1.15rem;
  max-width: 68ch;
}

p.lead {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--charcoal);
  font-weight: 400;
  margin-bottom: 1.5rem;
}

.kicker {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--forest);
  font-weight: 600;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.kicker::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 2px;
  background-color: var(--forest);
  border-radius: var(--radius-full);
}

.caption {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--charcoal-muted);
  line-height: 1.5;
  margin-top: 0.75rem;
}

.caption strong {
  font-style: normal;
  font-weight: 600;
  color: var(--forest);
}

/* Rounded Navigation */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--ivory);
  border-bottom: 1px solid var(--border);
  height: 68px;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
}

.nav-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

.nav-brand {
  display: flex;
  align-items: baseline;
  text-decoration: none;
  color: var(--forest);
  gap: 0.75rem;
  flex-shrink: 0;
}

.brand-title {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--forest);
}

.brand-sub {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.92rem;
  color: var(--charcoal-muted);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  list-style: none;
}

.nav-link {
  text-decoration: none;
  color: var(--charcoal);
  font-size: 0.86rem;
  font-weight: 500;
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-full);
  transition: all 0.15s ease;
  white-space: nowrap;
}

.nav-link:hover, .nav-link.active {
  color: var(--forest);
  background-color: var(--sage-pale);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.audio-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--charcoal-muted);
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.audio-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--teal-muted);
}

.audio-status-dot.active {
  background-color: var(--forest);
}

/* Mobile Nav Toggle */
.nav-toggle {
  display: none;
  background: var(--white);
  border: 1px solid var(--border);
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--forest);
  cursor: pointer;
}

/* Mobile Nav Overlay & Drawer */
.mobile-nav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background-color: rgba(52, 91, 80, 0.4);
  z-index: 1999;
}

.mobile-nav-overlay.open {
  display: block;
}

.mobile-nav-drawer {
  position: fixed;
  top: 0;
  right: -320px;
  width: 290px;
  height: 100vh;
  background-color: var(--ivory);
  border-left: 1px solid var(--border);
  z-index: 2000;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  box-shadow: -4px 0 20px rgba(0,0,0,0.1);
  transition: right 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
}

.mobile-nav-drawer.open {
  right: 0;
}

.mobile-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;
}

.mobile-nav-close {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--forest);
}

.mobile-nav-drawer .nav-link {
  padding: 0.65rem 1rem;
  font-size: 0.95rem;
}

/* Back-to-Top Floating Button */
.back-to-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  background: var(--white);
  border: 1px solid var(--border);
  color: var(--forest);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  pointer-events: none;
  transition: all 0.25s ease;
}

.back-to-top-btn.visible {
  opacity: 1;
  pointer-events: auto;
}

.back-to-top-btn:hover {
  background-color: var(--sage-pale);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
}

/* Beautifully Rounded Pill Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.85rem 1.85rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  line-height: 1.2;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.btn:active {
  transform: translateY(1px);
}

.btn-forest {
  background-color: var(--forest);
  color: var(--white);
  border-color: var(--forest);
}

.btn-forest:hover {
  background-color: var(--forest-dark);
  box-shadow: 0 3px 10px rgba(52, 91, 80, 0.2);
  transform: translateY(-1px);
}

.btn-outline {
  background-color: transparent;
  color: var(--forest);
  border-color: var(--forest);
}

.btn-outline:hover {
  background-color: var(--sage-pale);
  transform: translateY(-1px);
}

.btn-clay {
  background-color: var(--clay);
  color: var(--white);
  border-color: var(--clay);
}

.btn-clay:hover {
  background-color: #ae6a49;
  box-shadow: 0 3px 10px rgba(198, 125, 90, 0.25);
  transform: translateY(-1px);
}

.btn-sm {
  font-size: 0.85rem;
  padding: 0.5rem 1.25rem;
}

/* Pill Buttons for Controls & Presets */
.pill-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.65rem;
}

.pill-btn {
  background: var(--white);
  border: 1px solid var(--border);
  color: var(--charcoal-muted);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.45rem 1.1rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}

.pill-btn:hover, .pill-btn.active {
  background: var(--sage-pale);
  border-color: var(--forest);
  color: var(--forest);
  transform: translateY(-1px);
}

/* Sections */
section {
  padding: 5.5rem 2rem;
  position: relative;
}

section.bg-white { background-color: var(--white); }
section.bg-sage { background-color: var(--sage-pale); }
section.bg-stone { background-color: var(--stone); }
section.bg-ivory { background-color: var(--ivory); }

.container {
  max-width: 1240px;
  margin: 0 auto;
}

/* Rounded Grids & Showcases */
.visual-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: stretch;
}

.visual-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.visual-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

/* Rounded Museum Framed Photography */
.photo-frame {
  background-color: var(--white);
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: var(--radius-lg);
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.photo-frame img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  object-fit: cover;
}

.photo-badge {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background-color: var(--white);
  border: 1px solid var(--border);
  padding: 0.35rem 0.85rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--forest);
  border-radius: var(--radius-full);
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

/* Rounded Editorial Plates */
.editorial-plate {
  background-color: var(--white);
  border: 1px solid var(--border);
  padding: 2.25rem;
  border-radius: var(--radius-xl);
  margin: 2.5rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}

.editorial-plate.plate-sage {
  background-color: var(--sage-pale);
  border-color: var(--border);
}

.editorial-plate.plate-stone {
  background-color: var(--stone);
  border-color: var(--stone-dark);
}

/* Rounded Comparison & Infographic Panels */
.compare-box {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.85rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}

.compare-box.highlight-forest {
  border-top: 5px solid var(--forest);
}

.compare-box.highlight-clay {
  border-top: 5px solid var(--clay);
}

/* Rounded Sliders */
.slider-row {
  margin-bottom: 1.5rem;
}

.slider-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
}

.slider-val {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--forest);
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: var(--stone);
  border-radius: var(--radius-full);
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--forest);
  border: 2px solid var(--white);
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  transition: transform 0.15s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}

/* Rounded Interactive Canvases */
.resonance-canvas {
  width: 100%;
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  display: block;
}

/* Formula & Scientific Notation Box */
.formula-box {
  background-color: var(--white);
  border: 1px solid var(--border);
  border-left: 4px solid var(--forest);
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  margin: 1.5rem 0;
  color: var(--forest);
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}

.formula-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--charcoal-muted);
  margin-bottom: 0.4rem;
}

/* Live Caption Floating Bar */
.live-caption-bar {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--forest-dark);
  color: var(--white);
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  z-index: 999;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
  display: none;
  max-width: 90vw;
  text-align: center;
  line-height: 1.4;
  border: 1px solid rgba(255,255,255,0.2);
}

.live-caption-bar.visible {
  display: block;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .nav-menu { display: none; }
  .nav-toggle { display: block; }
  .visual-grid-2, .visual-grid-3, .visual-grid-4 {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
  section { padding: 4rem 1.25rem; }
  h1 { font-size: 2.6rem; }
  .editorial-plate { padding: 1.5rem; }
}

${dualViewCss}

${mathAndSimCss}
`;
}

console.log('CSS stylesheet defined.');

// ----------------------------------------------------------------------------
// SCIENTIFIC SVG DIAGRAMS (Large, Functional, Accurate, Rounded)
// ----------------------------------------------------------------------------

function getHeroPathwaySvg() {
  return `
<svg viewBox="0 0 920 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig 1.0: Continuous Physical State Transformations of Auditory Perception" style="width:100%; height:auto; display:block;">
  <rect width="920" height="120" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="16" ry="16" />

  <!-- Stage 1: Acoustic -->
  <g transform="translate(20, 18)">
    <rect width="195" height="84" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.2" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">STAGE I &middot; AIR</text>
    <text x="14" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="${C.charcoal}">Acoustic Wave</text>
    <text x="14" y="62" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">&Delta;P &asymp; 20 &mu;Pa &middot; Longitudinal</text>
  </g>

  <!-- Arrow 1->2 -->
  <path d="M 225 60 L 245 60" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Stage 2: Mechanical -->
  <g transform="translate(250, 18)">
    <rect width="195" height="84" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.2" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">STAGE II &middot; BONE</text>
    <text x="14" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="${C.charcoal}">Mechanical Lever</text>
    <text x="14" y="62" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">22&times; Hydraulic gain &middot; Ossicles</text>
  </g>

  <!-- Arrow 2->3 -->
  <path d="M 455 60 L 475 60" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Stage 3: Hydraulic -->
  <g transform="translate(480, 18)">
    <rect width="195" height="84" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.2" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">STAGE III &middot; FLUID</text>
    <text x="14" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="${C.charcoal}">Hydraulic Wave</text>
    <text x="14" y="62" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">Greenwood tonotopy &middot; Cochlea</text>
  </g>

  <!-- Arrow 3->4 -->
  <path d="M 685 60 L 705 60" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Stage 4: Bioelectric -->
  <g transform="translate(710, 18)">
    <rect width="190" height="84" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.2" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.clay}">STAGE IV &middot; BRAIN</text>
    <text x="14" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="${C.charcoal}">Neural Spikes</text>
    <text x="14" y="62" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">Action potentials &middot; CN VIII</text>
  </g>
</svg>
`;
}

function getHeroAcousticSvg() {
  return `
<svg viewBox="0 0 540 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Acoustic pressure oscillation plate" style="width:100%; height:auto; display:block;">
  <rect width="540" height="180" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="16" ry="16" />
  <line x1="30" y1="90" x2="510" y2="90" stroke="${C.border}" stroke-width="1" stroke-dasharray="4,4" />

  <!-- Continuous Sine Pressure Wave -->
  <path d="M 30 90 Q 75 20 120 90 T 210 90 T 300 90 T 390 90 T 480 90 L 510 90" fill="none" stroke="${C.forest}" stroke-width="2.5" stroke-linecap="round" />

  <!-- High-frequency Carrier Modulation (CI Envelope Concept) -->
  <path d="M 30 90 Q 75 45 120 90 T 210 90 T 300 90 T 390 90 T 480 90" fill="none" stroke="${C.clay}" stroke-width="1.2" stroke-dasharray="2,3" opacity="0.85" />

  <!-- Labels -->
  <text x="35" y="32" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">&Delta;P(t) = A &middot; sin(2&pi;ft)</text>
  <text x="35" y="48" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.charcoalMuted}">Acoustic Compression (+&Delta;P)</text>
  <text x="35" y="155" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.charcoalMuted}">Rarefaction (-&Delta;P)</text>

  <text x="505" y="32" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.clay}" text-anchor="end">&lambda; = v / f</text>
  <text x="505" y="155" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.forest}" text-anchor="end">Air medium: v = 343 m/s</text>
</svg>
`;
}

function getPitchVsLoudnessSvg() {
  return `
<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Visual comparison of pitch vs loudness in acoustics" style="width:100%; height:auto; display:block;">
  <rect width="760" height="250" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Left: Frequency (Pitch) -->
  <g transform="translate(25, 20)">
    <rect width="345" height="210" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="20" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">1. FREQUENCY &rarr; PITCH</text>
    <text x="20" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.charcoalMuted}">Cycles per second (Hertz &middot; Hz)</text>

    <!-- Low pitch wave -->
    <path d="M 20 100 Q 60 65 100 100 T 180 100 T 260 100 T 325 100" fill="none" stroke="${C.forest}" stroke-width="2" />
    <text x="20" y="82" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.forest}">Low Pitch (220 Hz &middot; Longer Period T)</text>

    <!-- High pitch wave -->
    <path d="M 20 165 Q 40 145 60 165 T 100 165 T 140 165 T 180 165 T 220 165 T 260 165 T 300 165 T 325 165" fill="none" stroke="${C.clay}" stroke-width="1.8" />
    <text x="20" y="148" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.clay}">High Pitch (880 Hz &middot; Shorter Period T)</text>

    <text x="20" y="196" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">
      Pitch is determined by the rate of mechanical vibration.
    </text>
  </g>

  <!-- Right: Amplitude (Loudness) -->
  <g transform="translate(390, 20)">
    <rect width="345" height="210" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="20" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">2. AMPLITUDE &rarr; LOUDNESS</text>
    <text x="20" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.charcoalMuted}">Pressure deviation &Delta;P (Pascals / dB SPL)</text>

    <!-- Large amplitude wave -->
    <path d="M 20 100 Q 55 50 90 100 T 160 100 T 230 100 T 300 100 L 325 100" fill="none" stroke="${C.forest}" stroke-width="3" />
    <text x="20" y="78" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.forest}">Large Amplitude (+6 dB &middot; High Intensity)</text>

    <!-- Small amplitude wave -->
    <path d="M 20 165 Q 55 152 90 165 T 160 165 T 230 165 T 300 165 L 325 165" fill="none" stroke="${C.charcoalMuted}" stroke-width="1.5" stroke-dasharray="3,2" />
    <text x="20" y="152" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.charcoalMuted}">Small Amplitude (-18 dB &middot; Whisper)</text>

    <text x="20" y="196" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">
      Loudness is determined by energy intensity: I &prop; &Delta;P&sup2;.
    </text>
  </g>
</svg>
`;
}

function getAirCompressionSvg() {
  return `
<svg viewBox="0 0 540 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Microscopic molecular compression and rarefaction in air" style="width:100%; height:auto; display:block;">
  <rect width="540" height="180" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="16" ry="16" />
  <text x="24" y="28" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">LONGITUDINAL MOLECULAR PRESSURE WAVE IN AIR</text>

  <!-- Speaker Diaphragm on left -->
  <rect x="25" y="45" width="12" height="70" fill="${C.forest}" rx="4" ry="4" />
  <path d="M 37 55 L 55 45 L 55 115 L 37 105 Z" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.2" />

  <!-- Compression Band 1 (Dense) -->
  <g fill="${C.forest}" opacity="0.9">
    <circle cx="85" cy="65" r="2.5"/><circle cx="95" cy="55" r="2.5"/><circle cx="90" cy="80" r="2.5"/><circle cx="100" cy="70" r="2.5"/><circle cx="105" cy="90" r="2.5"/><circle cx="95" cy="100" r="2.5"/>
    <circle cx="110" cy="60" r="2.5"/><circle cx="115" cy="78" r="2.5"/><circle cx="110" cy="95" r="2.5"/><circle cx="120" cy="68" r="2.5"/>
  </g>
  <text x="102" y="135" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.forest}" text-anchor="middle">Compression</text>
  <text x="102" y="148" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">+&Delta;P (High Density)</text>

  <!-- Rarefaction Band 1 (Sparse) -->
  <g fill="${C.charcoalMuted}" opacity="0.5">
    <circle cx="170" cy="60" r="2.5"/><circle cx="195" cy="75" r="2.5"/><circle cx="180" cy="95" r="2.5"/><circle cx="210" cy="65" r="2.5"/>
  </g>
  <text x="190" y="135" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">Rarefaction</text>
  <text x="190" y="148" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">-&Delta;P (Low Density)</text>

  <!-- Compression Band 2 (Dense) -->
  <g fill="${C.forest}" opacity="0.9">
    <circle cx="270" cy="65" r="2.5"/><circle cx="280" cy="55" r="2.5"/><circle cx="275" cy="80" r="2.5"/><circle cx="285" cy="70" r="2.5"/><circle cx="290" cy="90" r="2.5"/><circle cx="280" cy="100" r="2.5"/>
    <circle cx="295" cy="60" r="2.5"/><circle cx="300" cy="78" r="2.5"/><circle cx="295" cy="95" r="2.5"/><circle cx="305" cy="68" r="2.5"/>
  </g>
  <text x="288" y="135" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.forest}" text-anchor="middle">Compression</text>

  <!-- Rarefaction Band 2 -->
  <g fill="${C.charcoalMuted}" opacity="0.5">
    <circle cx="360" cy="60" r="2.5"/><circle cx="385" cy="75" r="2.5"/><circle cx="370" cy="95" r="2.5"/><circle cx="400" cy="65" r="2.5"/>
  </g>

  <!-- Compression Band 3 -->
  <g fill="${C.forest}" opacity="0.9">
    <circle cx="455" cy="65" r="2.5"/><circle cx="465" cy="55" r="2.5"/><circle cx="460" cy="80" r="2.5"/><circle cx="470" cy="70" r="2.5"/><circle cx="475" cy="90" r="2.5"/>
  </g>

  <!-- Wavelength Indicator -->
  <line x1="102" y1="40" x2="288" y2="40" stroke="${C.clay}" stroke-width="1.5" marker-start="url(#dot)" marker-end="url(#dot)" />
  <text x="195" y="34" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.clay}" text-anchor="middle">Wavelength &lambda; = 34.3 cm at 1 kHz</text>
</svg>
`;
}

// Diagram E: Acoustic to Electrical Transduction
function getAcousticToElectricSvg() {
  return `
<svg id="acousticToElectricSvg" viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig 2.2: Conversion of Acoustic Pressure into Electrical Signal via Microphone Diaphragm" style="width:100%; height:auto; display:block;">
  <rect width="760" height="220" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Left: Acoustic Pressure Wave Striking Diaphragm -->
  <g transform="translate(25, 20)">
    <rect width="345" height="180" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="18" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">1. ACOUSTIC PRESSURE DISPLACEMENT</text>

    <!-- Incoming Waves -->
    <path d="M 25 70 C 35 55, 45 85, 55 70" fill="none" stroke="${C.tealMuted}" stroke-width="2" />
    <path d="M 50 70 C 60 55, 70 85, 80 70" fill="none" stroke="${C.tealMuted}" stroke-width="2" />
    <path d="M 75 70 C 85 55, 95 85, 105 70" fill="none" stroke="${C.tealMuted}" stroke-width="2" />
    <text x="65" y="105" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.tealMuted}" text-anchor="middle">&Delta;P(t) Wave</text>

    <!-- Flexible Diaphragm -->
    <rect x="135" y="45" width="6" height="85" fill="${C.clay}" rx="3" ry="3" />
    <text x="138" y="145" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.clay}" text-anchor="middle">Diaphragm</text>

    <!-- Variable Gap -->
    <line x1="145" y1="87" x2="185" y2="87" stroke="${C.charcoalMuted}" stroke-width="1" stroke-dasharray="2,2" />
    <text x="165" y="80" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Gap d</text>

    <!-- Fixed Backplate -->
    <rect x="185" y="45" width="10" height="85" fill="${C.forest}" rx="3" ry="3" />
    <text x="190" y="145" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.forest}" text-anchor="middle">Backplate</text>

    <!-- Capacitor Formula -->
    <rect x="225" y="55" width="105" height="65" fill="${C.sagePale}" stroke="${C.border}" stroke-width="1" rx="8" ry="8" />
    <text x="277" y="76" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}" text-anchor="middle">Capacitance</text>
    <text x="277" y="94" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.charcoal}" text-anchor="middle">C = &epsilon;&middot;A / d</text>
    <text x="277" y="110" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.clay}" text-anchor="middle">&Delta;d &prop; &Delta;P</text>
  </g>

  <!-- Right: Electrical Voltage Output -->
  <g transform="translate(390, 20)">
    <rect width="345" height="180" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="18" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">2. TRANSDUCED ELECTRICAL VOLTAGE</text>

    <!-- Audio Oscilloscope waveform representation -->
    <rect x="20" y="45" width="305" height="85" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="10" ry="10" />
    <line x1="20" y1="87" x2="325" y2="87" stroke="${C.border}" stroke-width="1" stroke-dasharray="3,3" />

    <!-- Pure transduced voltage wave -->
    <path d="M 30 87 Q 55 55 80 87 T 130 87 T 180 87 T 230 87 T 280 87 L 315 87" fill="none" stroke="${C.forest}" stroke-width="2.2" />

    <text x="35" y="65" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">V(t) = Q / C(t)</text>
    <text x="310" y="65" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="end">Analog Output &plusmn;5 mV</text>

    <text x="172" y="152" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.charcoal}" text-anchor="middle">
      Mechanical pressure fluctuations are faithfully converted into electrical audio signals.
    </text>
    <text x="172" y="168" font-family="'Newsreader', serif" font-style="italic" font-size="10.5" fill="${C.charcoalMuted}" text-anchor="middle">
      This continuous electrical signal is digitized for hearing aids and cochlear implant DSP.
    </text>
  </g>
</svg>
`;
}

// Diagram A: Anatomical Cross-Section of Human Ear with Sound Pathway
function getEarCrossSectionSvg() {
  return `
<svg id="earAnatomySvg" viewBox="0 0 860 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig 3.3: Anatomical cross-section of the human auditory peripheral apparatus with highlighted sound pathway" style="width:100%; height:auto; display:block;">
  <style>
    .ear-zone-bg { fill: ${C.white}; }
    .ear-part { cursor: pointer; transition: all 0.2s ease; }
    .ear-part:hover path, .ear-part:hover polygon, .ear-part:hover ellipse, .ear-part:hover circle { stroke: ${C.clay} !important; stroke-width: 2.8px !important; }
    .ear-part.active path, .ear-part.active polygon, .ear-part.active ellipse, .ear-part.active circle { stroke: ${C.forest} !important; stroke-width: 3.2px !important; fill: ${C.sagePale} !important; }
    .fig-heading { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600; fill: ${C.forest}; letter-spacing: 0.05em; }
    .fig-ital { font-family: 'Newsreader', serif; font-style: italic; font-size: 13px; fill: ${C.charcoalMuted}; }
    .pathway-line { stroke: ${C.clay}; stroke-width: 3.2; stroke-linecap: round; stroke-dasharray: 6,4; fill: none; }
  </style>

  <!-- Region Demarcations with Rounded Corners -->
  <rect x="20" y="20" width="240" height="440" class="ear-zone-bg" stroke="${C.border}" stroke-width="1" rx="16" ry="16" />
  <text x="35" y="48" class="fig-heading">I. OUTER EAR (AIR)</text>
  <text x="35" y="66" class="fig-ital">Acoustic collector &amp; resonator</text>

  <rect x="270" y="20" width="280" height="440" class="ear-zone-bg" stroke="${C.border}" stroke-width="1" rx="16" ry="16" />
  <text x="285" y="48" class="fig-heading">II. MIDDLE EAR (TYMPANUM)</text>
  <text x="285" y="66" class="fig-ital">Impedance-matching lever (22&times; gain)</text>

  <rect x="560" y="20" width="280" height="440" class="ear-zone-bg" stroke="${C.border}" stroke-width="1" rx="16" ry="16" />
  <text x="575" y="48" class="fig-heading">III. INNER EAR (FLUID)</text>
  <text x="575" y="66" class="fig-ital">Spatial frequency dispersion</text>

  <!-- Highlighted Sound Pathway Route with Arrowhead -->
  <path d="M 40 210 Q 110 215 150 225 L 262 242 L 315 195 L 368 250 L 405 250 L 530 290 Q 610 270 560 330 L 760 330" class="pathway-line" />
  <!-- Directional Flow Markers -->
  <polygon points="170,225 160,220 160,230" fill="${C.clay}" />
  <polygon points="340,220 330,215 332,226" fill="${C.clay}" />
  <polygon points="460,265 450,260 452,272" fill="${C.clay}" />
  <polygon points="680,330 670,325 670,335" fill="${C.clay}" />

  <!-- Part 1: Pinna (Auricle) -->
  <g class="ear-part" data-part="pinna" id="partPinna">
    <path d="M 60 110 C 130 90, 160 140, 150 200 C 145 230, 95 250, 110 310 C 115 340, 75 350, 60 300 C 50 250, 100 230, 90 190 C 80 150, 40 140, 60 110 Z" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.8" />
    <path d="M 95 160 C 120 170, 120 200, 105 220" fill="none" stroke="${C.tealMuted}" stroke-width="1.4" />
    <text x="105" y="375" class="fig-heading" text-anchor="middle">1. PINNA (AURICLE)</text>
    <text x="105" y="392" class="fig-ital" text-anchor="middle">Directional filter (+5 dB)</text>
  </g>

  <!-- Part 2: Auditory Canal (Meatus) -->
  <g class="ear-part" data-part="canal" id="partCanal">
    <path d="M 125 220 L 260 215 L 265 265 L 115 260 Z" fill="${C.ivory}" stroke="${C.forest}" stroke-width="1.6" />
    <path d="M 155 223 C 158 240, 158 250, 155 258" stroke="${C.tealMuted}" stroke-width="1.2" fill="none" stroke-dasharray="2,2" />
    <path d="M 195 221 C 198 240, 198 250, 195 260" stroke="${C.forest}" stroke-width="1.4" fill="none" stroke-dasharray="2,2" />
    <path d="M 235 218 C 238 240, 238 252, 235 263" stroke="${C.clay}" stroke-width="1.6" fill="none" />
    <text x="190" y="295" class="fig-heading" text-anchor="middle">2. AUDITORY CANAL</text>
    <text x="190" y="312" class="fig-ital" text-anchor="middle">&lambda;/4 pipe (2.7 kHz resonance)</text>
  </g>

  <!-- Part 3: Tympanic Membrane (Eardrum) -->
  <g class="ear-part" data-part="eardrum" id="partEardrum">
    <path d="M 260 210 C 268 235, 268 255, 264 275" stroke="${C.clay}" stroke-width="3" fill="none" stroke-linecap="round" />
    <ellipse cx="264" cy="242" rx="4" ry="32" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.8" />
    <line x1="264" y1="210" x2="310" y2="150" stroke="${C.charcoalMuted}" stroke-width="1" stroke-dasharray="2,2" />
    <text x="315" y="145" class="fig-heading">3. TYMPANIC MEMBRANE</text>
    <text x="315" y="160" class="fig-ital">Area A&sub1; = 55 mm&sup2;</text>
  </g>

  <!-- Part 4: Malleus (Hammer) -->
  <g class="ear-part" data-part="malleus" id="partMalleus">
    <path d="M 264 242 L 315 195 C 322 188, 335 192, 332 205 L 320 220 Z" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.8" />
    <line x1="325" y1="195" x2="360" y2="120" stroke="${C.charcoalMuted}" stroke-width="1" stroke-dasharray="2,2" />
    <text x="365" y="115" class="fig-heading">4. MALLEUS</text>
    <text x="365" y="130" class="fig-ital">Long lever arm L&sub1;</text>
  </g>

  <!-- Part 5: Incus (Anvil) -->
  <g class="ear-part" data-part="incus" id="partIncus">
    <path d="M 332 205 C 342 200, 362 205, 365 220 L 368 250 C 368 255, 362 258, 358 252 L 340 225 Z" fill="${C.stoneDark}" stroke="${C.forest}" stroke-width="1.8" />
    <line x1="365" y1="235" x2="425" y2="165" stroke="${C.charcoalMuted}" stroke-width="1" stroke-dasharray="2,2" />
    <text x="430" y="160" class="fig-heading">5. INCUS</text>
    <text x="430" y="175" class="fig-ital">Short lever arm L&sub2; (1.3:1 ratio)</text>
  </g>

  <!-- Part 6: Stapes (Stirrup) & Oval Window -->
  <g class="ear-part" data-part="stapes" id="partStapes">
    <path d="M 368 250 L 405 240 L 405 265 Z" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.6" />
    <rect x="405" y="235" width="8" height="32" fill="${C.clay}" stroke="${C.forest}" stroke-width="1.5" rx="3" ry="3" />
    <line x1="410" y1="250" x2="465" y2="295" stroke="${C.charcoalMuted}" stroke-width="1" stroke-dasharray="2,2" />
    <text x="470" y="295" class="fig-heading">6. STAPES FOOTPLATE</text>
    <text x="470" y="310" class="fig-ital">Area A&sub2; = 3.2 mm&sup2; (17:1 area ratio)</text>
  </g>

  <!-- Eustachian Tube -->
  <path d="M 350 340 L 380 430 L 415 430 L 380 340 Z" fill="${C.ivory}" stroke="${C.border}" stroke-width="1.2" />
  <text x="395" y="445" class="fig-ital" font-size="11" text-anchor="middle">Eustachian tube (pressure equil.)</text>

  <!-- Part 7: Cochlea (Inner Ear Fluid Spiral) -->
  <g class="ear-part" data-part="cochlea" id="partCochlea">
    <line x1="413" y1="230" x2="413" y2="272" stroke="${C.forest}" stroke-width="2" />
    <path d="M 415 240 C 470 200, 560 210, 610 250 C 660 290, 680 360, 630 400 C 580 435, 500 410, 480 350 C 465 295, 510 260, 560 270 C 595 280, 605 320, 580 340 C 560 350, 535 340, 535 320" fill="none" stroke="${C.forest}" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 425 248 C 475 215, 550 225, 595 258 C 640 295, 655 350, 615 385 C 575 415, 515 395, 498 348 C 485 305, 520 278, 560 286" fill="none" stroke="${C.tealMuted}" stroke-width="2" stroke-linecap="round" />
    <text x="700" y="270" class="fig-heading">7. COCHLEA</text>
    <text x="700" y="287" class="fig-ital">Perilymph (Z &asymp; 1.5&times;10&sup6; Pa&middot;s/m)</text>
    <text x="700" y="304" class="fig-ital">32 mm coiled basilar membrane</text>
  </g>

  <!-- Part 8: Auditory Nerve (Cranial Nerve VIII) -->
  <g class="ear-part" data-part="nerve" id="partNerve">
    <path d="M 570 320 C 650 310, 720 330, 810 325" fill="none" stroke="${C.clay}" stroke-width="3" stroke-linecap="round" />
    <path d="M 580 330 C 660 320, 730 340, 810 338" fill="none" stroke="${C.clay}" stroke-width="2" stroke-linecap="round" stroke-dasharray="4,2" />
    <text x="720" y="365" class="fig-heading">8. AUDITORY NERVE</text>
    <text x="720" y="382" class="fig-ital">Cranial Nerve VIII (30,000 fibers)</text>
  </g>

  <!-- Rounded Pill Prompt Instruction -->
  <rect x="240" y="415" width="380" height="34" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="17" ry="17" />
  <text x="430" y="436" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.forest}" font-weight="600" text-anchor="middle">Interactive: Click any anatomical component or button below</text>
</svg>
`;
}

function getImpedanceLeverDiagramSvg() {
  return `
<svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Acoustic impedance matching ossicular transformer diagram" style="width:100%; height:auto; display:block;">
  <rect width="760" height="220" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Left: Areal Hydraulic Ratio -->
  <g transform="translate(30, 20)">
    <rect width="335" height="180" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="20" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">1. AREAL HYDRAULIC ADVANTAGE</text>

    <!-- Large Eardrum Area -->
    <ellipse cx="80" cy="95" rx="45" ry="40" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.8" />
    <text x="80" y="92" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}" text-anchor="middle">Eardrum (A&sub1;)</text>
    <text x="80" y="106" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">55 mm&sup2;</text>

    <!-- Arrow with ratio -->
    <path d="M 140 95 L 210 95" stroke="${C.clay}" stroke-width="2.5" stroke-linecap="round" />
    <text x="175" y="85" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.clay}" text-anchor="middle">17.2 &times;</text>

    <!-- Tiny Stapes Footplate Area -->
    <ellipse cx="255" cy="95" rx="14" ry="12" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.8" />
    <text x="255" y="93" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="${C.clay}" text-anchor="middle">Stapes (A&sub2;)</text>
    <text x="255" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">3.2 mm&sup2;</text>

    <text x="20" y="160" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">
      Pressure = Force / Area. Concentrating force from 55 mm&sup2; to 3.2 mm&sup2; creates a 17.2-fold pressure gain.
    </text>
  </g>

  <!-- Right: Ossicular Lever Advantage -->
  <g transform="translate(395, 20)">
    <rect width="335" height="180" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="20" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">2. MECHANICAL LEVER RATIO</text>

    <!-- Lever Bar and Fulcrum -->
    <line x1="30" y1="95" x2="305" y2="75" stroke="${C.forest}" stroke-width="4" stroke-linecap="round" />
    <polygon points="190,85 180,115 200,115" fill="${C.clay}" />
    <text x="190" y="130" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.clay}" text-anchor="middle">Fulcrum (Incus Axis)</text>

    <!-- Lever Dimensions -->
    <text x="105" y="70" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}" text-anchor="middle">Malleus: L&sub1; &asymp; 9.1 mm</text>
    <text x="255" y="60" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}" text-anchor="middle">Incus: L&sub2; &asymp; 7.0 mm</text>

    <!-- Formula Calculation -->
    <rect x="20" y="140" width="295" height="28" fill="${C.sagePale}" stroke="${C.border}" stroke-width="1" rx="8" ry="8" />
    <text x="167" y="158" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}" text-anchor="middle">
      Total Gain = 17.2 &times; 1.3 &asymp; 22.4&times; (+27 dB Pressure Gain)
    </text>
  </g>
</svg>
`;
}

function getCochleaScalaeSvg() {
  return `
<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cross-section of the cochlear duct showing three fluid compartments" style="width:100%; height:auto; display:block;">
  <rect width="540" height="220" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="16" ry="16" />
  <text x="24" y="28" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">CROSS-SECTION OF THE COCHLEAR DUCT</text>

  <!-- Scala Vestibuli (Top) -->
  <path d="M 60 45 L 340 45 L 260 110 L 60 110 Z" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.4" />
  <text x="150" y="75" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}">Scala Vestibuli</text>
  <text x="150" y="92" font-family="'Newsreader', serif" font-style="italic" font-size="10" fill="${C.charcoalMuted}">Perilymph (Na+ rich, 0 mV)</text>

  <!-- Reissner's Membrane -->
  <line x1="60" y1="110" x2="260" y2="110" stroke="${C.tealMuted}" stroke-width="1.8" />
  <text x="350" y="105" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.tealMuted}">Reissner's Membrane</text>

  <!-- Scala Media (Middle, Endolymph) -->
  <path d="M 60 110 L 260 110 L 210 155 L 60 155 Z" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.4" />
  <text x="135" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.clay}">Scala Media (Cochlear Duct)</text>
  <text x="135" y="145" font-family="'Newsreader', serif" font-style="italic" font-size="10" fill="${C.charcoalMuted}">Endolymph (K+ rich, +80 mV Endocochlear Potential)</text>

  <!-- Basilar Membrane & Organ of Corti -->
  <line x1="60" y1="155" x2="210" y2="155" stroke="${C.forest}" stroke-width="3" />
  <circle cx="135" cy="153" r="5" fill="${C.forest}" />
  <text x="350" y="155" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">Basilar Membrane &amp; Hair Cells</text>

  <!-- Scala Tympani (Bottom) -->
  <path d="M 60 155 L 210 155 L 340 205 L 60 205 Z" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.4" />
  <text x="150" y="182" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}">Scala Tympani</text>
  <text x="150" y="198" font-family="'Newsreader', serif" font-style="italic" font-size="10" fill="${C.charcoalMuted}">Site of Cochlear Implant Electrode Array!</text>
</svg>
`;
}

// Diagram B: Detailed Healthy vs Damaged Hair Cells with Structural Components
function getHairCellComparisonSvg() {
  return `
<svg id="hairCellSvg" viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig 5.2: Detailed scientific comparison of healthy vs damaged cochlear hair cells" style="width:100%; height:auto; display:block;">
  <style>
    .cell-part { cursor: pointer; transition: all 0.2s ease; }
    .cell-part:hover rect, .cell-part:hover line, .cell-part:hover circle { stroke: ${C.clay} !important; stroke-width: 2.8px !important; }
  </style>

  <rect width="760" height="360" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Left: Healthy Mechanoreceptor -->
  <g transform="translate(25, 20)">
    <rect width="345" height="320" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="20" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">A. HEALTHY SENSORY HAIR CELL</text>
    <text x="20" y="44" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Intact mechanotransduction apparatus (MET)</text>

    <!-- Hair cell body -->
    <path d="M 70 260 C 70 165, 85 155, 172 155 C 260 155, 275 165, 275 260 Z" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.8" />
    <ellipse cx="172" cy="225" rx="35" ry="20" fill="${C.white}" stroke="${C.forest}" stroke-width="1.2" />
    <text x="172" y="229" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.forest}" text-anchor="middle">Cell Nucleus</text>

    <!-- Cuticular plate -->
    <rect x="85" y="148" width="175" height="12" fill="${C.stone}" rx="6" ry="6" stroke="${C.forest}" stroke-width="1.2" />
    <text x="172" y="157" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Cuticular Plate (Actin mesh)</text>

    <!-- 3-Tier Stereocilia Staircase -->
    <!-- Tier 1 (Short) -->
    <rect x="110" y="115" width="9" height="33" fill="${C.forest}" rx="4" ry="4" />
    <rect x="126" y="115" width="9" height="33" fill="${C.forest}" rx="4" ry="4" />
    <rect x="142" y="115" width="9" height="33" fill="${C.forest}" rx="4" ry="4" />

    <!-- Tier 2 (Medium) -->
    <rect x="162" y="85" width="9" height="63" fill="${C.forest}" rx="4" ry="4" />
    <rect x="178" y="85" width="9" height="63" fill="${C.forest}" rx="4" ry="4" />
    <rect x="194" y="85" width="9" height="63" fill="${C.forest}" rx="4" ry="4" />

    <!-- Tier 3 (Tall) -->
    <rect x="214" y="55" width="9" height="93" fill="${C.forest}" rx="4" ry="4" />
    <rect x="230" y="55" width="9" height="93" fill="${C.forest}" rx="4" ry="4" />

    <!-- Cadherin-23 Tip Links (Springs) -->
    <line x1="119" y1="117" x2="162" y2="90" stroke="${C.clay}" stroke-width="2.2" stroke-linecap="round" />
    <line x1="135" y1="117" x2="178" y2="90" stroke="${C.clay}" stroke-width="2.2" stroke-linecap="round" />
    <line x1="151" y1="117" x2="194" y2="90" stroke="${C.clay}" stroke-width="2.2" stroke-linecap="round" />
    <line x1="171" y1="87" x2="214" y2="60" stroke="${C.clay}" stroke-width="2.2" stroke-linecap="round" />
    <line x1="187" y1="87" x2="230" y2="60" stroke="${C.clay}" stroke-width="2.2" stroke-linecap="round" />

    <!-- Ion Channel Influx Indicators -->
    <circle cx="162" cy="90" r="3" fill="${C.clay}" />
    <circle cx="214" cy="60" r="3" fill="${C.clay}" />
    <text x="245" y="75" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.clay}">K+ / Ca2+ Influx</text>

    <!-- Synaptic Ribbon at Base -->
    <ellipse cx="172" cy="256" rx="8" ry="4" fill="${C.clay}" />
    <text x="172" y="278" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">Cadherin-23 Tip Links Intact</text>
    <text x="172" y="296" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}" text-anchor="middle">Depolarization releases glutamate into nerve cleft</text>
  </g>

  <!-- Right: Damaged Hair Cell (Acoustic Trauma / Loss) -->
  <g transform="translate(390, 20)">
    <rect width="345" height="320" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="20" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.clay}">B. ACOUSTIC TRAUMA / LOSS</text>
    <text x="20" y="44" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Permanent mechanical &amp; neural degeneration</text>

    <!-- Hair cell body (Shrunken / Apoptotic) -->
    <path d="M 75 260 C 75 165, 88 155, 172 155 C 255 155, 270 165, 270 260 Z" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.8" />
    <ellipse cx="172" cy="225" rx="30" ry="16" fill="${C.white}" stroke="${C.clay}" stroke-width="1.2" stroke-dasharray="2,2" />
    <text x="172" y="229" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">Degenerating Nucleus</text>

    <!-- Disrupted Cuticular Plate -->
    <rect x="85" y="148" width="175" height="12" fill="${C.stoneDark}" rx="6" ry="6" stroke="${C.charcoalMuted}" stroke-width="1.2" />

    <!-- Sheared, Fused, and Missing Stereocilia Stumps -->
    <path d="M 110 148 L 118 135 L 126 148" stroke="${C.charcoalMuted}" stroke-width="2" fill="none" stroke-linecap="round" />
    <rect x="135" y="138" width="9" height="10" fill="${C.charcoalMuted}" rx="2" ry="2" />
    <path d="M 160 148 C 165 118, 205 125, 220 148" stroke="${C.charcoalMuted}" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <line x1="118" y1="135" x2="135" y2="138" stroke="${C.clay}" stroke-width="1.2" stroke-dasharray="2,3" stroke-linecap="round" />

    <!-- Zero Influx & Silent Synapse -->
    <text x="210" y="80" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.clay}">No Ion Channels Open</text>
    <line x1="165" y1="256" x2="180" y2="256" stroke="${C.border}" stroke-width="2" stroke-dasharray="2,2" />

    <text x="172" y="278" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.clay}" text-anchor="middle">Broken Tip Links &amp; Sheared Cilia</text>
    <text x="172" y="296" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}" text-anchor="middle">Acoustic volume cannot open missing biological gates</text>
  </g>
</svg>
`;
}

// Diagram C: Functional Architecture of a Modern Hearing Aid
function getHearingAidFunctionalSvg() {
  return `
<svg id="hearingAidFunctionalSvg" viewBox="0 0 880 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig 5.3: Functional signal flow architecture of a modern digital acoustic hearing aid" style="width:100%; height:auto; display:block;">
  <style>
    .aid-stage { cursor: pointer; transition: all 0.2s ease; }
    .aid-stage:hover rect { stroke: ${C.forest} !important; stroke-width: 2.5px !important; }
    .aid-stage.active rect { stroke: ${C.forest} !important; stroke-width: 3px !important; fill: ${C.sagePale} !important; }
  </style>

  <rect width="880" height="340" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Flow Direction Arrow Banner across top -->
  <rect x="25" y="18" width="830" height="36" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="12" ry="12" />
  <text x="40" y="41" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">HOW A DIGITAL HEARING AID WORKS: 6 TRANSDUCTION STAGES</text>
  <text x="835" y="41" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.clay}" font-weight="600" text-anchor="end">Acoustic &rarr; Electrical &rarr; Digital &rarr; Electrical &rarr; High-SPL Acoustic</text>

  <!-- Stage 1: Sound Waves in Air -->
  <g class="aid-stage" data-aid-stage="1" id="aidStage1" transform="translate(25, 70)">
    <rect width="125" height="155" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="14" ry="14" />
    <rect x="10" y="10" width="105" height="24" fill="${C.sagePale}" rx="8" ry="8" />
    <text x="62" y="26" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}" text-anchor="middle">STAGE 1</text>
    <text x="62" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">Acoustic Waves</text>

    <!-- Mini wave graphic -->
    <path d="M 25 90 C 35 75, 45 105, 55 90 C 65 75, 75 105, 85 90 C 95 75, 105 105, 110 90" fill="none" stroke="${C.tealMuted}" stroke-width="2" />

    <text x="62" y="125" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">&Delta;P &asymp; 20 &mu;Pa-2 Pa</text>
    <text x="62" y="140" font-family="'Newsreader', serif" font-style="italic" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">Air pressure waves</text>
  </g>

  <!-- Arrow 1->2 -->
  <path d="M 155 147 L 170 147" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Stage 2: Dual Microphones -->
  <g class="aid-stage" data-aid-stage="2" id="aidStage2" transform="translate(170, 70)">
    <rect width="125" height="155" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="14" ry="14" />
    <rect x="10" y="10" width="105" height="24" fill="${C.sagePale}" rx="8" ry="8" />
    <text x="62" y="26" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}" text-anchor="middle">STAGE 2</text>
    <text x="62" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">Dual MEMS Mics</text>

    <!-- Mic icon/diagram -->
    <circle cx="45" cy="90" r="14" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.2" />
    <circle cx="80" cy="90" r="14" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.2" />
    <text x="45" y="93" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.forest}" text-anchor="middle">M1</text>
    <text x="80" y="93" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.forest}" text-anchor="middle">M2</text>

    <text x="62" y="125" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Directional delay</text>
    <text x="62" y="140" font-family="'Newsreader', serif" font-style="italic" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">Analog voltage mV</text>
  </g>

  <!-- Arrow 2->3 -->
  <path d="M 300 147 L 315 147" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Stage 3: Digital Signal Processor (DSP) -->
  <g class="aid-stage active" data-aid-stage="3" id="aidStage3" transform="translate(315, 70)">
    <rect width="135" height="155" fill="${C.white}" stroke="${C.forest}" stroke-width="2" rx="14" ry="14" />
    <rect x="10" y="10" width="115" height="24" fill="${C.forest}" rx="8" ry="8" />
    <text x="67" y="26" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.white}" text-anchor="middle">STAGE 3: CORE</text>
    <text x="67" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">Digital Processor</text>

    <!-- Chip diagram -->
    <rect x="35" y="72" width="65" height="35" fill="${C.stoneDark}" rx="6" ry="6" stroke="${C.forest}" stroke-width="1" />
    <text x="67" y="93" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.white}" text-anchor="middle">DSP ASIC</text>

    <text x="67" y="125" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.forest}" font-weight="600" text-anchor="middle">WDRC + Feedback Canc.</text>
    <text x="67" y="140" font-family="'Newsreader', serif" font-style="italic" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">16-48 Frequency Bands</text>
  </g>

  <!-- Arrow 3->4 -->
  <path d="M 455 147 L 470 147" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Stage 4: Power Amplifier -->
  <g class="aid-stage" data-aid-stage="4" id="aidStage4" transform="translate(470, 70)">
    <rect width="125" height="155" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="14" ry="14" />
    <rect x="10" y="10" width="105" height="24" fill="${C.sagePale}" rx="8" ry="8" />
    <text x="62" y="26" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}" text-anchor="middle">STAGE 4</text>
    <text x="62" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">Class-D Amplifier</text>

    <!-- Triangle amp icon -->
    <polygon points="40,75 40,105 85,90" fill="${C.stone}" stroke="${C.clay}" stroke-width="1.4" />
    <text x="52" y="93" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="${C.clay}">+dB</text>

    <text x="62" y="125" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">+30 to +65 dB Gain</text>
    <text x="62" y="140" font-family="'Newsreader', serif" font-style="italic" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">PWM power output</text>
  </g>

  <!-- Arrow 4->5 -->
  <path d="M 600 147 L 615 147" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Stage 5: Speaker (Receiver) -->
  <g class="aid-stage" data-aid-stage="5" id="aidStage5" transform="translate(615, 70)">
    <rect width="120" height="155" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="14" ry="14" />
    <rect x="10" y="10" width="100" height="24" fill="${C.sagePale}" rx="8" ry="8" />
    <text x="60" y="26" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}" text-anchor="middle">STAGE 5</text>
    <text x="60" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">Receiver (Speaker)</text>

    <!-- Speaker icon -->
    <rect x="35" y="80" width="22" height="20" fill="${C.stoneDark}" rx="3" ry="3" />
    <polygon points="57,80 75,70 75,110 57,100" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.2" />

    <text x="60" y="125" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Balanced armature</text>
    <text x="60" y="140" font-family="'Newsreader', serif" font-style="italic" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">High-SPL acoustic</text>
  </g>

  <!-- Arrow 5->6 -->
  <path d="M 740 147 L 755 147" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Stage 6: Ear Canal & Surviving Hair Cells -->
  <g class="aid-stage" data-aid-stage="6" id="aidStage6" transform="translate(755, 70)">
    <rect width="100" height="155" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="14" ry="14" />
    <rect x="8" y="10" width="84" height="24" fill="${C.clayPale}" rx="8" ry="8" />
    <text x="50" y="26" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.clay}" text-anchor="middle">STAGE 6</text>
    <text x="50" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">Ear &amp; Hair Cells</text>

    <!-- Eardrum curve -->
    <path d="M 45 75 C 55 90, 55 100, 45 115" stroke="${C.clay}" stroke-width="2.5" fill="none" stroke-linecap="round" />

    <text x="50" y="125" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.forest}" font-weight="600" text-anchor="middle">Eardrum defl.</text>
    <text x="50" y="140" font-family="'Newsreader', serif" font-style="italic" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">Living receptors</text>
  </g>

  <!-- Interactive Prompt Strip at bottom -->
  <rect x="25" y="240" width="830" height="80" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
  <g id="aidInspectorContent">
    <text x="45" y="268" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">SELECTED: STAGE 3 &mdash; DIGITAL SIGNAL PROCESSOR (DSP)</text>
    <text x="45" y="290" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="${C.charcoal}">The DSP executes multiband filtering, Wide Dynamic Range Compression (WDRC), and phase-inversion feedback cancellation at 16–32 kHz sampling rates in under 5 ms.</text>
    <text x="45" y="308" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Click any stage above to inspect physical components and acoustic transformations.</text>
  </g>
</svg>
`;
}

function getHearingAidVsImplantHardwareSvg() {
  return `
<svg viewBox="0 0 780 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Visual hardware comparison: Hearing Aid acoustic amplifier vs Cochlear Implant neuroprosthesis" style="width:100%; height:auto; display:block;">
  <rect width="780" height="290" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Device 1: Hearing Aid -->
  <g transform="translate(25, 20)">
    <rect width="350" height="250" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="18" y="25" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">A. ACOUSTIC HEARING AID (AMPLIFIER)</text>

    <!-- Block Diagram -->
    <rect x="20" y="50" width="70" height="45" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.2" rx="10" ry="10" />
    <text x="55" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="${C.forest}" text-anchor="middle">Microphone</text>
    <text x="55" y="82" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Sound in</text>

    <path d="M 90 72 L 115 72" stroke="${C.forest}" stroke-width="1.5" stroke-linecap="round" />

    <rect x="115" y="50" width="85" height="45" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.2" rx="10" ry="10" />
    <text x="157" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="${C.forest}" text-anchor="middle">DSP Amp</text>
    <text x="157" y="82" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.clay}" text-anchor="middle">+30 to +60 dB</text>

    <path d="M 200 72 L 225 72" stroke="${C.forest}" stroke-width="1.5" stroke-linecap="round" />

    <rect x="225" y="50" width="95" height="45" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.2" rx="10" ry="10" />
    <text x="272" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="${C.forest}" text-anchor="middle">Loudspeaker</text>
    <text x="272" y="82" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Acoustic out</text>

    <rect x="20" y="110" width="310" height="55" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="10" ry="10" />
    <text x="32" y="128" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.charcoal}">Biological Requirement:</text>
    <text x="32" y="145" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Must have surviving hair cells to detect amplified airwaves.</text>

    <rect x="20" y="175" width="310" height="55" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1" rx="10" ry="10" />
    <text x="32" y="195" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.clay}">WHEN HAIR CELLS ARE DEAD:</text>
    <text x="32" y="214" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoal}">Turning up volume on dead cells = loud distortion without clarity.</text>
  </g>

  <!-- Device 2: Cochlear Implant -->
  <g transform="translate(405, 20)">
    <rect width="350" height="250" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="18" y="25" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">B. COCHLEAR IMPLANT (NEUROPROSTHESIS)</text>

    <rect x="15" y="50" width="70" height="45" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.2" rx="10" ry="10" />
    <text x="50" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="${C.forest}" text-anchor="middle">External DSP</text>
    <text x="50" y="82" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Mic + Vocoder</text>

    <path d="M 85 72 L 105 72" stroke="${C.forest}" stroke-width="1.5" stroke-linecap="round" />

    <rect x="105" y="50" width="65" height="45" fill="${C.sagePale}" stroke="${C.clay}" stroke-width="1.2" rx="10" ry="10" />
    <text x="137" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="${C.clay}" text-anchor="middle">RF Coil</text>
    <text x="137" y="82" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Through skin</text>

    <path d="M 170 72 L 190 72" stroke="${C.clay}" stroke-width="1.5" stroke-dasharray="2,2" stroke-linecap="round" />

    <rect x="190" y="50" width="70" height="45" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.2" rx="10" ry="10" />
    <text x="225" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="${C.forest}" text-anchor="middle">Titanium RX</text>
    <text x="225" y="82" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Subcutaneous</text>

    <path d="M 260 72 L 275 72" stroke="${C.forest}" stroke-width="1.5" stroke-linecap="round" />

    <rect x="275" y="50" width="65" height="45" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.2" rx="10" ry="10" />
    <text x="307" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="${C.clay}" text-anchor="middle">Electrodes</text>
    <text x="307" y="82" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.forest}" text-anchor="middle">In Cochlea</text>

    <rect x="15" y="110" width="320" height="55" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="10" ry="10" />
    <text x="26" y="128" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.charcoal}">Direct Neural Bypass:</text>
    <text x="26" y="145" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.forestDark}">Bypasses missing hair cells completely; stimulates spiral ganglion neurons.</text>

    <rect x="15" y="175" width="320" height="55" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1" rx="10" ry="10" />
    <text x="26" y="195" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">THE NEUROPROSTHETIC SOLUTION:</text>
    <text x="26" y="214" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoal}">Electrical current pulses directly evoke action potentials in the auditory nerve!</text>
  </g>
</svg>
`;
}

// Diagram D: Anatomical & Transcutaneous Signal Architecture of Cochlear Implant
function getImplantFunctionalSvg() {
  return `
<svg id="implantFlowSvg" viewBox="0 0 880 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig 6.5: Transcutaneous anatomical and physical signal flow of a multichannel cochlear implant system" style="width:100%; height:auto; display:block;">
  <style>
    .flow-card { cursor: pointer; transition: all 0.2s ease; }
    .flow-card:hover rect { stroke: ${C.clay} !important; stroke-width: 2.2px !important; }
    .flow-card.active rect { stroke: ${C.forest} !important; stroke-width: 2.8px !important; fill: ${C.sagePale} !important; }
    .flow-step-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600; fill: ${C.forest}; }
    .flow-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; fill: ${C.charcoal}; }
    .flow-energy { font-family: 'Newsreader', serif; font-style: italic; font-size: 11px; fill: ${C.charcoalMuted}; }
    .skin-barrier { stroke: ${C.clay}; stroke-width: 2.5; stroke-dasharray: 4,4; }
  </style>

  <rect width="880" height="270" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Transcutaneous Demarcation Line -->
  <line x1="435" y1="20" x2="435" y2="250" class="skin-barrier" />
  <rect x="330" y="14" width="100" height="22" fill="${C.white}" stroke="${C.border}" rx="11" ry="11" />
  <text x="380" y="29" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}" text-anchor="middle">EXTERNAL</text>
  <rect x="440" y="14" width="120" height="22" fill="${C.white}" stroke="${C.border}" rx="11" ry="11" />
  <text x="500" y="29" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.clay}" text-anchor="middle">SUBCUTANEOUS</text>

  <!-- Step 1: Microphones -->
  <g class="flow-card active" data-step="1" id="flowStep1" transform="translate(20, 50)">
    <rect width="120" height="150" fill="${C.white}" stroke="${C.forest}" stroke-width="2" rx="12" ry="12" />
    <text x="14" y="24" class="flow-step-num">STAGE 01</text>
    <text x="14" y="46" class="flow-title">Dual Mic</text>
    <text x="14" y="62" class="flow-title">Array</text>
    <line x1="14" y1="75" x2="106" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="14" y="95" class="flow-energy">Energy Domain:</text>
    <text x="14" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">Acoustic</text>
    <text x="14" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">Air pressure</text>
  </g>

  <path d="M 145 125 L 160 125" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Step 2: DSP -->
  <g class="flow-card" data-step="2" id="flowStep2" transform="translate(160, 50)">
    <rect width="120" height="150" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="12" ry="12" />
    <text x="14" y="24" class="flow-step-num">STAGE 02</text>
    <text x="14" y="46" class="flow-title">Audio DSP</text>
    <text x="14" y="62" class="flow-title">Vocoder</text>
    <line x1="14" y1="75" x2="106" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="14" y="95" class="flow-energy">Energy Domain:</text>
    <text x="14" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">Digital</text>
    <text x="14" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">N-band envelop</text>
  </g>

  <path d="M 285 125 L 300 125" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Step 3: RF Coil -->
  <g class="flow-card" data-step="3" id="flowStep3" transform="translate(300, 50)">
    <rect width="120" height="150" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="12" ry="12" />
    <text x="14" y="24" class="flow-step-num">STAGE 03</text>
    <text x="14" y="46" class="flow-title">Inductive</text>
    <text x="14" y="62" class="flow-title">RF Coil</text>
    <line x1="14" y1="75" x2="106" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="14" y="95" class="flow-energy">Energy Domain:</text>
    <text x="14" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.clay}">RF Magnet</text>
    <text x="14" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">2.5 - 5.0 MHz</text>
  </g>

  <!-- Cross-Skin RF Link -->
  <path d="M 425 125 L 450 125" stroke="${C.clay}" stroke-width="2.5" stroke-dasharray="3,3" stroke-linecap="round" />

  <!-- Step 4: Subcutaneous Receiver -->
  <g class="flow-card" data-step="4" id="flowStep4" transform="translate(450, 50)">
    <rect width="120" height="150" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="12" ry="12" />
    <text x="14" y="24" class="flow-step-num">STAGE 04</text>
    <text x="14" y="46" class="flow-title">Titanium</text>
    <text x="14" y="62" class="flow-title">Stimulator</text>
    <line x1="14" y1="75" x2="106" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="14" y="95" class="flow-energy">Energy Domain:</text>
    <text x="14" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">Electrical</text>
    <text x="14" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">Current pulses</text>
  </g>

  <path d="M 575 125 L 590 125" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Step 5: Electrode Array -->
  <g class="flow-card" data-step="5" id="flowStep5" transform="translate(590, 50)">
    <rect width="120" height="150" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="12" ry="12" />
    <text x="14" y="24" class="flow-step-num">STAGE 05</text>
    <text x="14" y="46" class="flow-title">Electrode</text>
    <text x="14" y="62" class="flow-title">Array (16-22)</text>
    <line x1="14" y1="75" x2="106" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="14" y="95" class="flow-energy">Energy Domain:</text>
    <text x="14" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.clay}">Biphasic</text>
    <text x="14" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">In Scala Tympani</text>
  </g>

  <path d="M 715 125 L 730 125" stroke="${C.forest}" stroke-width="2" stroke-linecap="round" />

  <!-- Step 6: Auditory Nerve -->
  <g class="flow-card" data-step="6" id="flowStep6" transform="translate(730, 50)">
    <rect width="130" height="150" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="12" ry="12" />
    <text x="14" y="24" class="flow-step-num">STAGE 06</text>
    <text x="14" y="46" class="flow-title">Auditory Nerve</text>
    <text x="14" y="62" class="flow-title">&amp; Brainstem</text>
    <line x1="14" y1="75" x2="116" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="14" y="95" class="flow-energy">Energy Domain:</text>
    <text x="14" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">Neural</text>
    <text x="14" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">Action potentials</text>
  </g>

  <!-- Instructional Prompt Strip -->
  <rect x="250" y="215" width="380" height="34" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="17" ry="17" />
  <text x="440" y="236" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.forest}" font-weight="600" text-anchor="middle">Click any stage above to inspect physical transduction parameters</text>
</svg>
`;
}

function getCurrentSpreadSvg() {
  return `
<svg viewBox="0 0 740 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Visual explanation of electrical current spread inside the fluid-filled cochlea" style="width:100%; height:auto; display:block;">
  <rect width="740" height="260" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Scala Tympani Fluid Cavity Representation -->
  <g transform="translate(30, 20)">
    <rect width="680" height="220" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="24" y="28" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">CURRENT SPREAD IN CONDUCTIVE PERILYMPH FLUID</text>
    <text x="24" y="46" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.charcoalMuted}">Electrolyte resistivity &rho; &asymp; 0.7 &Omega;&middot;m &middot; Volume conduction smears spatial stimulation</text>

    <!-- Electrode Array Carrier -->
    <rect x="40" y="125" width="600" height="24" fill="${C.stone}" rx="12" ry="12" stroke="${C.border}" stroke-width="1.2" />
    <text x="50" y="141" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.charcoalMuted}">Silicone Carrier</text>

    <!-- Electrode 1 -->
    <circle cx="160" cy="137" r="7" fill="${C.clay}" />
    <ellipse cx="160" cy="137" rx="45" ry="32" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.2" stroke-dasharray="3,2" opacity="0.6" />
    <text x="160" y="112" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.clay}" text-anchor="middle">Electrode E1</text>

    <!-- Electrode 2 (Adjacent) -->
    <circle cx="270" cy="137" r="7" fill="${C.clay}" />
    <ellipse cx="270" cy="137" rx="45" ry="32" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.2" stroke-dasharray="3,2" opacity="0.6" />
    <text x="270" y="112" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.clay}" text-anchor="middle">Electrode E2</text>

    <!-- Overlap Zone -->
    <rect x="195" y="120" width="40" height="34" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1" rx="6" ry="6" opacity="0.85" />
    <text x="215" y="141" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="${C.forest}" text-anchor="middle">Channel</text>
    <text x="215" y="151" font-family="'JetBrains Mono', monospace" font-size="7" font-weight="600" fill="${C.forest}" text-anchor="middle">Crosstalk</text>

    <!-- Spiral Ganglion Target Layer -->
    <line x1="40" y1="180" x2="640" y2="180" stroke="${C.forest}" stroke-width="2" />
    <text x="40" y="200" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">Spiral Ganglion Nerve Fibers (Modiolus)</text>
    <text x="640" y="200" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.clay}" text-anchor="end">Limits 22 electrodes to ~8 independent channels</text>
  </g>
</svg>
`;
}

function getSpeechVsMusicSpectrumSvg() {
  return `
<svg viewBox="0 0 740 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Visual comparison of speech temporal envelope vs musical fine harmonic structure" style="width:100%; height:auto; display:block;">
  <rect width="740" height="240" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Left: Speech Spectrum -->
  <g transform="translate(25, 20)">
    <rect width="335" height="200" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="18" y="24" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">1. SPEECH IS AN ENVELOPE TASK</text>
    <text x="18" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.charcoalMuted}">Broad formant resonances (F1, F2)</text>

    <path d="M 20 150 Q 50 145 70 110 Q 90 75 110 110 Q 130 145 160 148 Q 190 150 215 100 Q 235 60 255 100 Q 275 140 315 150" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="2.5" stroke-linecap="round" />
    <line x1="20" y1="150" x2="315" y2="150" stroke="${C.border}" stroke-width="1" />

    <text x="100" y="95" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">Formant 1</text>
    <text x="235" y="85" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">Formant 2</text>

    <text x="18" y="180" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.forestDark}">
      Easily captured by 8 broad vocoder bands!
    </text>
  </g>

  <!-- Right: Music Spectrum -->
  <g transform="translate(380, 20)">
    <rect width="335" height="200" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="14" ry="14" />
    <text x="18" y="24" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.clay}">2. MUSIC IS A FINE STRUCTURE TASK</text>
    <text x="18" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.charcoalMuted}">Discrete semitones &amp; integer overtones</text>

    <line x1="20" y1="150" x2="315" y2="150" stroke="${C.border}" stroke-width="1" />
    <line x1="50" y1="150" x2="50" y2="65" stroke="${C.clay}" stroke-width="2.5" stroke-linecap="round" />
    <text x="50" y="55" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.clay}" text-anchor="middle">f&sub0;</text>
    <line x1="95" y1="150" x2="95" y2="80" stroke="${C.clay}" stroke-width="2.5" stroke-linecap="round" />
    <text x="95" y="70" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.clay}" text-anchor="middle">2f&sub0;</text>
    <line x1="140" y1="150" x2="140" y2="95" stroke="${C.clay}" stroke-width="2" stroke-linecap="round" />
    <text x="140" y="85" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.clay}" text-anchor="middle">3f&sub0;</text>
    <line x1="185" y1="150" x2="185" y2="110" stroke="${C.clay}" stroke-width="2" stroke-linecap="round" />
    <line x1="230" y1="150" x2="230" y2="120" stroke="${C.clay}" stroke-width="1.8" stroke-linecap="round" />
    <line x1="275" y1="150" x2="275" y2="130" stroke="${C.clay}" stroke-width="1.8" stroke-linecap="round" />

    <text x="18" y="180" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.clay}">
      Noise bands smear these sharp spikes into percussive buzz!
    </text>
  </g>
</svg>
`;
}

console.log('All functional SVG diagrams defined.');

module.exports = {
  assertNoEmojis,
  C,
  getCss,
  getHeroPathwaySvg,
  getHeroAcousticSvg,
  getPitchVsLoudnessSvg,
  getAirCompressionSvg,
  getAcousticToElectricSvg,
  getEarCrossSectionSvg,
  getImpedanceLeverDiagramSvg,
  getCochleaScalaeSvg,
  getHairCellComparisonSvg,
  getHearingAidFunctionalSvg,
  getHearingAidVsImplantHardwareSvg,
  getImplantFunctionalSvg,
  getCurrentSpreadSvg,
  getSpeechVsMusicSpectrumSvg,
  mathAndSimCss,
  getWaveSpeedMathCard,
  getSoundSpeedMediumMathCard,
  getHarmonicWaveParamsMathCard,
  getMiddleEarImpedanceMathCard,
  getGreenwoodMapMathCard,
  getVocoderCapacityMathCard,
  ...require('./dual_view_svg_generators.js')
};
