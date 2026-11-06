// build_resonance_redesign.js
// Assembles the complete editorial scientific redesign of RESONANCE into a single index.html
const fs = require('fs');
const vm = require('vm');

function assertNoEmojis(text) {
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const match = text.match(emojiRegex);
  if (match) {
    throw new Error('Forbidden emoji detected: ' + match[0]);
  }
}

// ----------------------------------------------------------------------------
// COLOR PALETTE CONSTANTS
// ----------------------------------------------------------------------------
const C = {
  ivory: '#F8F7F2',
  white: '#FFFFFF',
  sagePale: '#E5EDE6',
  tealMuted: '#8EAAA5',
  forest: '#345B50',
  forestDark: '#233E36',
  charcoal: '#343A38',
  charcoalMuted: '#5F6663',
  stone: '#E9E6DD',
  stoneDark: '#D4D0C5',
  clay: '#C67D5A',
  clayPale: '#F7EDE8',
  border: '#DCD8CD',
  borderLight: '#ECE8DF'
};

// ----------------------------------------------------------------------------
// CSS DESIGN SYSTEM (Editorial Scientific Museum)
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
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 72px;
  background-color: var(--ivory);
  color: var(--charcoal);
  font-family: var(--font-sans);
  font-size: 17px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--ivory);
  color: var(--charcoal);
  overflow-x: hidden;
}

a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible {
  outline: 2px solid var(--forest);
  outline-offset: 2px;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  color: var(--forest);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.015em;
}

h1 {
  font-size: clamp(3rem, 6.5vw, 4.8rem);
  font-weight: 400;
  line-height: 1.08;
  margin-bottom: 0.75rem;
}

h2 {
  font-size: clamp(2rem, 3.8vw, 2.75rem);
  font-weight: 500;
  margin-bottom: 1.25rem;
}

h3 {
  font-size: 1.45rem;
  font-weight: 500;
  margin-bottom: 0.6rem;
}

p {
  color: var(--charcoal);
  font-size: 1.08rem;
  margin-bottom: 1.35rem;
  max-width: 68ch;
}

p.lead {
  font-size: 1.25rem;
  line-height: 1.65;
  color: var(--charcoal);
  font-weight: 400;
}

.kicker {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--forest);
  font-weight: 600;
  margin-bottom: 0.75rem;
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
}

.caption {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--charcoal-muted);
  line-height: 1.55;
  margin-top: 0.75rem;
}

.caption strong {
  font-style: normal;
  font-weight: 600;
  color: var(--forest);
}

.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 4rem 0;
}

/* Navigation */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--ivory);
  border-bottom: 1px solid var(--border);
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

.nav-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.nav-brand {
  display: flex;
  align-items: baseline;
  text-decoration: none;
  color: var(--forest);
  gap: 0.75rem;
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
  font-size: 0.95rem;
  color: var(--charcoal-muted);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.35rem;
  list-style: none;
}

.nav-link {
  text-decoration: none;
  color: var(--charcoal);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.15s ease;
  white-space: nowrap;
}

.nav-link:hover, .nav-link.active {
  color: var(--forest);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.audio-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.75rem;
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--charcoal-muted);
}

.audio-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--teal-muted);
}

.audio-status-dot.active {
  background-color: var(--forest);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.75rem 1.6rem;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  line-height: 1.2;
  border: 1px solid transparent;
}

.btn-forest {
  background-color: var(--forest);
  color: var(--white);
  border-color: var(--forest);
}

.btn-forest:hover {
  background-color: var(--forest-dark);
}

.btn-outline {
  background-color: transparent;
  color: var(--forest);
  border-color: var(--forest);
}

.btn-outline:hover {
  background-color: var(--sage-pale);
}

.btn-clay {
  background-color: var(--clay);
  color: var(--white);
  border-color: var(--clay);
}

.btn-clay:hover {
  background-color: #ae6a49;
}

.btn-sm {
  font-size: 0.85rem;
  padding: 0.45rem 1rem;
}

/* Sections */
section {
  padding: 6.5rem 2rem;
  position: relative;
}

section.bg-white {
  background-color: var(--white);
}

section.bg-sage {
  background-color: var(--sage-pale);
}

section.bg-stone {
  background-color: var(--stone);
}

section.bg-ivory {
  background-color: var(--ivory);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.editorial-split {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 3.5rem;
  align-items: center;
}

.editorial-split.reverse {
  grid-template-columns: 0.95fr 1.05fr;
}

.editorial-split-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Museum Framed Photography */
.photo-frame {
  background-color: var(--white);
  border: 1px solid var(--border);
  padding: 0.75rem;
  border-radius: 4px;
  position: relative;
}

.photo-frame img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 2px;
  object-fit: cover;
}

.photo-badge {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  background-color: var(--white);
  border: 1px solid var(--border);
  padding: 0.3rem 0.65rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--forest);
  border-radius: 3px;
}

/* Plates & Interactive Boxes */
.editorial-plate {
  background-color: var(--white);
  border: 1px solid var(--border);
  padding: 2.25rem;
  border-radius: 4px;
  margin: 2.5rem 0;
}

.editorial-plate.plate-sage {
  background-color: var(--sage-pale);
  border-color: var(--border);
}

.editorial-plate.plate-stone {
  background-color: var(--stone);
  border-color: var(--stone-dark);
}

.editorial-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.editorial-card {
  background-color: var(--white);
  border: 1px solid var(--border);
  padding: 2rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.editorial-card.card-border-top {
  border-top: 4px solid var(--forest);
}

.editorial-card.card-clay-top {
  border-top: 4px solid var(--clay);
}

/* Formula Callout */
.formula-box {
  background-color: var(--ivory);
  border-left: 3px solid var(--forest);
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--font-mono);
  font-size: 0.92rem;
  color: var(--forest);
  border-radius: 0 4px 4px 0;
  border-top: 1px solid var(--border-light);
  border-right: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
}

.formula-box .formula-title {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--charcoal-muted);
  margin-bottom: 0.4rem;
  font-weight: 600;
}

/* Sliders */
.slider-row {
  margin-bottom: 1.5rem;
}

.slider-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
  font-weight: 500;
}

.slider-val {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--forest);
  font-weight: 600;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: var(--stone-dark);
  outline: none;
  border-radius: 3px;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--forest);
  border: 2px solid var(--white);
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.18);
}

input[type="range"].range-clay::-webkit-slider-thumb {
  background: var(--clay);
}

/* Preset Pill Buttons */
.pill-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.6rem;
}

.pill-btn {
  background: var(--white);
  border: 1px solid var(--border);
  color: var(--charcoal-muted);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.35rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pill-btn:hover, .pill-btn.active {
  background: var(--sage-pale);
  border-color: var(--forest);
  color: var(--forest);
}

/* Canvases */
canvas.resonance-canvas {
  width: 100%;
  background-color: var(--ivory);
  border: 1px solid var(--border);
  display: block;
  border-radius: 3px;
}

/* Interactive Ear Cross-Section */
.ear-part {
  cursor: pointer;
  transition: all 0.2s ease;
}

.ear-part:hover path,
.ear-part:hover polygon,
.ear-part:hover ellipse {
  stroke: var(--clay) !important;
  stroke-width: 2.5px !important;
}

.ear-part.active path,
.ear-part.active polygon,
.ear-part.active ellipse {
  stroke: var(--forest) !important;
  stroke-width: 3px !important;
}

/* Comparison Table */
.editorial-table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  font-size: 0.95rem;
}

.editorial-table th {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--forest);
  text-align: left;
  padding: 1rem 1.25rem;
  border-bottom: 2px solid var(--forest);
  background-color: var(--sage-pale);
}

.editorial-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}

.editorial-table tr:nth-child(even) td {
  background-color: #faf9f6;
}

/* Live Caption Bar */
.live-caption-bar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1050;
  background: var(--white);
  border: 1px solid var(--border);
  border-left: 4px solid var(--forest);
  padding: 0.85rem 1.75rem;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--charcoal);
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  max-width: 85vw;
}

.live-caption-bar.visible {
  opacity: 1;
  pointer-events: auto;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .editorial-split, .editorial-split.reverse {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .editorial-grid-3 {
    grid-template-columns: 1fr;
  }
  .nav-menu {
    display: none;
  }
}

@media (max-width: 640px) {
  section {
    padding: 4.5rem 1.25rem;
  }
  .editorial-plate {
    padding: 1.5rem;
  }
  h1 {
    font-size: 2.6rem;
  }
}
`;
}

console.log('CSS module defined.');

// ----------------------------------------------------------------------------
// SVG SCIENTIFIC DIAGRAMS
// ----------------------------------------------------------------------------

function getHeroAcousticSvg() {
  return `
<svg viewBox="0 0 540 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig 1.1: Acoustic pressure waves radiating through an atmospheric medium" style="width:100%; height:auto; display:block;">
  <rect width="540" height="420" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="4" />
  
  <!-- Grid lines -->
  <line x1="40" y1="210" x2="500" y2="210" stroke="${C.borderLight}" stroke-width="1" stroke-dasharray="4,4" />
  <line x1="270" y1="40" x2="270" y2="380" stroke="${C.borderLight}" stroke-width="1" stroke-dasharray="4,4" />
  
  <!-- Isobaric Acoustic Waves radiating from left -->
  <circle cx="80" cy="210" r="40" fill="none" stroke="${C.tealMuted}" stroke-width="1.2" opacity="0.4" />
  <circle cx="80" cy="210" r="80" fill="none" stroke="${C.forest}" stroke-width="1.4" opacity="0.6" />
  <circle cx="80" cy="210" r="130" fill="none" stroke="${C.tealMuted}" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.5" />
  <circle cx="80" cy="210" r="180" fill="none" stroke="${C.forest}" stroke-width="1.8" opacity="0.75" />
  <circle cx="80" cy="210" r="235" fill="none" stroke="${C.tealMuted}" stroke-width="1.2" stroke-dasharray="4,4" opacity="0.6" />
  <circle cx="80" cy="210" r="290" fill="none" stroke="${C.forest}" stroke-width="2.0" opacity="0.85" />
  <circle cx="80" cy="210" r="350" fill="none" stroke="${C.tealMuted}" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.65" />
  <circle cx="80" cy="210" r="410" fill="none" stroke="${C.forest}" stroke-width="2.2" opacity="0.9" />

  <!-- Acoustic Point Source -->
  <circle cx="80" cy="210" r="5" fill="${C.clay}" />
  <text x="80" y="235" font-family="'JetBrains Mono', monospace" font-size="11" fill="${C.charcoalMuted}" text-anchor="middle">Acoustic Source</text>
  <text x="80" y="250" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.clay}" text-anchor="middle">f = 1000 Hz</text>

  <!-- Wavelength Caliper -->
  <line x1="260" y1="120" x2="370" y2="120" stroke="${C.charcoal}" stroke-width="1.2" />
  <line x1="260" y1="114" x2="260" y2="126" stroke="${C.charcoal}" stroke-width="1.2" />
  <line x1="370" y1="114" x2="370" y2="126" stroke="${C.charcoal}" stroke-width="1.2" />
  <text x="315" y="110" font-family="'Newsreader', serif" font-size="14" font-style="italic" fill="${C.forest}" text-anchor="middle">Wavelength \u03BB = v / f \u2248 34.3 cm</text>

  <!-- Annotated Measurement Callouts -->
  <g transform="translate(360, 270)">
    <rect x="-10" y="-12" width="165" height="68" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="3" />
    <text x="0" y="10" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">ACOUSTIC FIELD</text>
    <text x="0" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.charcoal}">P\u2080 = 101.325 kPa (Equil.)</text>
    <text x="0" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.clay}">\u0394P = 20 \u03BCPa (0 dB SPL)</text>
  </g>

  <!-- Ear Receiver Silhouette Outline -->
  <g transform="translate(450, 160)" stroke="${C.forest}" stroke-width="1.8" fill="none" stroke-linecap="round">
    <path d="M 15 15 C 35 15, 45 35, 42 60 C 40 80, 20 85, 25 105 C 28 118, 12 115, 10 100 C 8 85, 22 75, 20 60 C 18 45, 10 40, 15 15 Z" />
    <path d="M 24 35 C 32 40, 32 55, 26 62" stroke-width="1.2" stroke="${C.tealMuted}" />
  </g>
  <text x="470" y="295" font-family="'Newsreader', serif" font-style="italic" font-size="13" fill="${C.charcoalMuted}" text-anchor="middle">Auditory Pinna</text>
</svg>
`;
}

function getAirCompressionSvg() {
  return `
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Longitudinal wave particle displacement showing compression and rarefaction" style="width:100%; height:auto; display:block;">
  <rect width="680" height="200" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="4" />
  
  <!-- Title / Legend -->
  <text x="25" y="30" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">LONGITUDINAL MOLECULAR DISPLACEMENT IN AIR</text>
  <text x="655" y="30" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}" text-anchor="end">v = 343 m/s (20\u00B0C)</text>

  <!-- Air Molecules (Particles clustered in compression, spaced in rarefaction) -->
  <g fill="${C.charcoal}">
    <!-- Compression 1 (x: 50 to 110) -->
    <circle cx="65" cy="70" r="2.5"/><circle cx="75" cy="65" r="2.5"/><circle cx="85" cy="72" r="2.5"/><circle cx="95" cy="67" r="2.5"/><circle cx="70" cy="85" r="2.5"/><circle cx="80" cy="80" r="2.5"/><circle cx="90" cy="88" r="2.5"/><circle cx="100" cy="82" r="2.5"/>
    <!-- Rarefaction 1 (x: 120 to 220) -->
    <circle cx="135" cy="75" r="2"/><circle cx="165" cy="68" r="2"/><circle cx="195" cy="82" r="2"/><circle cx="150" cy="88" r="2"/><circle cx="180" cy="72" r="2"/>
    <!-- Compression 2 (x: 230 to 300) -->
    <circle cx="240" cy="70" r="2.5"/><circle cx="250" cy="65" r="2.5"/><circle cx="260" cy="74" r="2.5"/><circle cx="270" cy="68" r="2.5"/><circle cx="280" cy="72" r="2.5"/><circle cx="245" cy="85" r="2.5"/><circle cx="255" cy="82" r="2.5"/><circle cx="265" cy="90" r="2.5"/><circle cx="275" cy="84" r="2.5"/>
    <!-- Rarefaction 2 (x: 310 to 420) -->
    <circle cx="330" cy="74" r="2"/><circle cx="360" cy="68" r="2"/><circle cx="390" cy="85" r="2"/><circle cx="345" cy="86" r="2"/><circle cx="375" cy="72" r="2"/>
    <!-- Compression 3 (x: 430 to 500) -->
    <circle cx="440" cy="70" r="2.5"/><circle cx="450" cy="66" r="2.5"/><circle cx="460" cy="73" r="2.5"/><circle cx="470" cy="68" r="2.5"/><circle cx="480" cy="71" r="2.5"/><circle cx="445" cy="84" r="2.5"/><circle cx="455" cy="81" r="2.5"/><circle cx="465" cy="89" r="2.5"/><circle cx="475" cy="83" r="2.5"/>
    <!-- Rarefaction 3 (x: 510 to 620) -->
    <circle cx="530" cy="75" r="2"/><circle cx="560" cy="69" r="2"/><circle cx="590" cy="84" r="2"/><circle cx="545" cy="87" r="2"/><circle cx="575" cy="73" r="2"/>
    <!-- Compression 4 edge -->
    <circle cx="635" cy="72" r="2.5"/><circle cx="645" cy="67" r="2.5"/><circle cx="655" cy="74" r="2.5"/><circle cx="640" cy="86" r="2.5"/><circle cx="650" cy="82" r="2.5"/>
  </g>

  <!-- Density labels -->
  <text x="80" y="115" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">Compression</text>
  <text x="80" y="128" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">\u03C1 &gt; \u03C1\u2080 (+ \u0394P)</text>

  <text x="175" y="115" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.clay}" text-anchor="middle">Rarefaction</text>
  <text x="175" y="128" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">\u03C1 &lt; \u03C1\u2080 (- \u0394P)</text>

  <text x="265" y="115" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">Compression</text>
  <text x="265" y="128" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">\u03C1 &gt; \u03C1\u2080 (+ \u0394P)</text>

  <text x="370" y="115" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.clay}" text-anchor="middle">Rarefaction</text>
  <text x="370" y="128" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">\u03C1 &lt; \u03C1\u2080 (- \u0394P)</text>

  <text x="465" y="115" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">Compression</text>
  <text x="465" y="128" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">\u03C1 &gt; \u03C1\u2080 (+ \u0394P)</text>

  <!-- Sinusoidal Pressure Curve -->
  <path d="M 40 160 Q 80 142 120 160 T 200 160 T 280 160 T 360 160 T 440 160 T 520 160 T 600 160 L 640 160" fill="none" stroke="${C.forest}" stroke-width="1.6" />
  <line x1="40" y1="160" x2="640" y2="160" stroke="${C.border}" stroke-width="1" stroke-dasharray="2,2" />
  <text x="645" y="164" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">P(x)</text>
</svg>
`;
}

function getEarCrossSectionSvg() {
  return `
<svg id="earAnatomySvg" viewBox="0 0 860 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig 3.2: Anatomical cross-section of the human auditory peripheral apparatus" style="width:100%; height:auto; display:block;">
  <style>
    .ear-zone-border { stroke: ${C.border}; stroke-width: 1; fill: none; }
    .ear-zone-bg { fill: ${C.white}; }
    .ear-line { stroke: ${C.forest}; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
    .ear-thin { stroke: ${C.charcoalMuted}; stroke-width: 1; stroke-dasharray: 3,3; fill: none; }
    .ear-part { cursor: pointer; transition: all 0.2s ease; }
    .ear-part:hover path, .ear-part:hover polygon, .ear-part:hover ellipse { stroke: ${C.clay} !important; stroke-width: 2.5px !important; }
    .ear-part.active path, .ear-part.active polygon, .ear-part.active ellipse { stroke: ${C.forest} !important; stroke-width: 3px !important; }
    .fig-heading { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600; fill: ${C.forest}; letter-spacing: 0.05em; }
    .fig-txt { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; fill: ${C.charcoal}; }
    .fig-ital { font-family: 'Newsreader', serif; font-style: italic; font-size: 13px; fill: ${C.charcoalMuted}; }
  </style>

  <!-- Region Demarcations -->
  <rect x="20" y="20" width="240" height="440" class="ear-zone-bg" stroke="${C.border}" stroke-width="1" rx="4" />
  <text x="35" y="48" class="fig-heading">I. OUTER EAR (AIR)</text>
  <text x="35" y="66" class="fig-ital">Acoustic collector &amp; resonator</text>

  <rect x="270" y="20" width="280" height="440" class="ear-zone-bg" stroke="${C.border}" stroke-width="1" rx="4" />
  <text x="285" y="48" class="fig-heading">II. MIDDLE EAR (TYMPANUM)</text>
  <text x="285" y="66" class="fig-ital">Impedance-matching lever (22\u00D7 gain)</text>

  <rect x="560" y="20" width="280" height="440" class="ear-zone-bg" stroke="${C.border}" stroke-width="1" rx="4" />
  <text x="575" y="48" class="fig-heading">III. INNER EAR (FLUID)</text>
  <text x="575" y="66" class="fig-ital">Spatial frequency dispersion</text>

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
    <!-- Sound wavefronts in canal -->
    <path d="M 155 223 C 158 240, 158 250, 155 258" stroke="${C.tealMuted}" stroke-width="1.2" fill="none" stroke-dasharray="2,2" />
    <path d="M 195 221 C 198 240, 198 250, 195 260" stroke="${C.forest}" stroke-width="1.4" fill="none" stroke-dasharray="2,2" />
    <path d="M 235 218 C 238 240, 238 252, 235 263" stroke="${C.clay}" stroke-width="1.6" fill="none" />
    <text x="190" y="295" class="fig-heading" text-anchor="middle">2. AUDITORY CANAL</text>
    <text x="190" y="312" class="fig-ital" text-anchor="middle">\u03BB/4 pipe (2.7 kHz resonance)</text>
  </g>

  <!-- Part 3: Tympanic Membrane (Eardrum) -->
  <g class="ear-part" data-part="eardrum" id="partEardrum">
    <path d="M 260 210 C 268 235, 268 255, 264 275" stroke="${C.clay}" stroke-width="3" fill="none" stroke-linecap="round" />
    <ellipse cx="264" cy="242" rx="4" ry="32" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.8" />
    <line x1="264" y1="210" x2="310" y2="150" stroke="${C.charcoalMuted}" stroke-width="1" stroke-dasharray="2,2" />
    <text x="315" y="145" class="fig-heading">3. TYMPANIC MEMBRANE</text>
    <text x="315" y="160" class="fig-ital">Area A\u2081 = 55 mm\u00B2</text>
  </g>

  <!-- Part 4: Malleus (Hammer) -->
  <g class="ear-part" data-part="malleus" id="partMalleus">
    <!-- Manubrium attached to eardrum, head articulating with incus -->
    <path d="M 264 242 L 315 195 C 322 188, 335 192, 332 205 L 320 220 Z" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.8" />
    <line x1="325" y1="195" x2="360" y2="120" stroke="${C.charcoalMuted}" stroke-width="1" stroke-dasharray="2,2" />
    <text x="365" y="115" class="fig-heading">4. MALLEUS</text>
    <text x="365" y="130" class="fig-ital">Long lever arm L\u2081</text>
  </g>

  <!-- Part 5: Incus (Anvil) -->
  <g class="ear-part" data-part="incus" id="partIncus">
    <!-- Body and short/long crus -->
    <path d="M 332 205 C 342 200, 362 205, 365 220 L 368 250 C 368 255, 362 258, 358 252 L 340 225 Z" fill="${C.stoneDark}" stroke="${C.forest}" stroke-width="1.8" />
    <line x1="365" y1="235" x2="425" y2="165" stroke="${C.charcoalMuted}" stroke-width="1" stroke-dasharray="2,2" />
    <text x="430" y="160" class="fig-heading">5. INCUS</text>
    <text x="430" y="175" class="fig-ital">Short lever arm L\u2082 (1.3:1 ratio)</text>
  </g>

  <!-- Part 6: Stapes (Stirrup) & Oval Window -->
  <g class="ear-part" data-part="stapes" id="partStapes">
    <!-- Anterior and posterior crus, and footplate -->
    <path d="M 368 250 L 405 240 L 405 265 Z" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.6" />
    <rect x="405" y="235" width="8" height="32" fill="${C.clay}" stroke="${C.forest}" stroke-width="1.5" rx="1" />
    <line x1="410" y1="250" x2="465" y2="295" stroke="${C.charcoalMuted}" stroke-width="1" stroke-dasharray="2,2" />
    <text x="470" y="295" class="fig-heading">6. STAPES FOOTPLATE</text>
    <text x="470" y="310" class="fig-ital">Area A\u2082 = 3.2 mm\u00B2 (17:1 area ratio)</text>
  </g>

  <!-- Eustachian Tube -->
  <path d="M 350 340 L 380 430 L 415 430 L 380 340 Z" fill="${C.ivory}" stroke="${C.border}" stroke-width="1.2" />
  <text x="395" y="445" class="fig-ital" font-size="11" text-anchor="middle">Eustachian tube (pressure equil.)</text>

  <!-- Part 7: Cochlea (Inner Ear Fluid Spiral) -->
  <g class="ear-part" data-part="cochlea" id="partCochlea">
    <!-- Oval window boundary -->
    <line x1="413" y1="230" x2="413" y2="272" stroke="${C.forest}" stroke-width="2" />
    <!-- Spiral shell structure (2.75 turns) -->
    <path d="M 415 240 C 470 200, 560 210, 610 250 C 660 290, 680 360, 630 400 C 580 435, 500 410, 480 350 C 465 295, 510 260, 560 270 C 595 280, 605 320, 580 340 C 560 350, 535 340, 535 320" fill="none" stroke="${C.forest}" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 425 248 C 475 215, 550 225, 595 258 C 640 295, 655 350, 615 385 C 575 415, 515 395, 498 348 C 485 305, 520 278, 560 286" fill="none" stroke="${C.tealMuted}" stroke-width="2" stroke-linecap="round" />
    <text x="700" y="270" class="fig-heading">7. COCHLEA</text>
    <text x="700" y="287" class="fig-ital">Perilymph (Z \u2248 1.5\u00D710\u2076 Pa\u00B7s/m)</text>
    <text x="700" y="304" class="fig-ital">32 mm coiled basilar membrane</text>
  </g>

  <!-- Part 8: Auditory Nerve (Cranial Nerve VIII) -->
  <g class="ear-part" data-part="nerve" id="partNerve">
    <path d="M 570 320 C 650 310, 720 330, 810 325" fill="none" stroke="${C.clay}" stroke-width="3" stroke-linecap="round" />
    <path d="M 580 330 C 660 320, 730 340, 810 338" fill="none" stroke="${C.clay}" stroke-width="2" stroke-linecap="round" stroke-dasharray="4,2" />
    <text x="720" y="365" class="fig-heading">8. AUDITORY NERVE</text>
    <text x="720" y="382" class="fig-ital">Cranial Nerve VIII (30,000 fibers)</text>
  </g>

  <!-- Prompt Instruction -->
  <rect x="270" y="420" width="320" height="28" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="3" />
  <text x="430" y="438" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${C.charcoalMuted}" font-weight="500" text-anchor="middle">Click any numbered anatomical component to inspect</text>
</svg>
`;
}

function getCochleaScalaeSvg() {
  return `
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig 4.1: Cross section of the cochlear duct showing the three fluid scalae and the Organ of Corti" style="width:100%; height:auto; display:block;">
  <rect width="680" height="320" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="4" />

  <text x="25" y="32" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">CROSS-SECTION THROUGH COCHLEAR DUCT</text>
  <text x="655" y="32" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}" text-anchor="end">Tri-Chamber Fluid Wave Dynamics</text>

  <!-- Bony Outer Labyrinth wall -->
  <path d="M 80 60 C 250 40, 480 40, 600 70 C 640 140, 630 230, 580 270 C 440 290, 200 290, 90 260 C 60 190, 60 110, 80 60 Z" fill="${C.white}" stroke="${C.border}" stroke-width="1.8" />

  <!-- Scala Vestibuli (Top) -->
  <path d="M 85 75 C 240 55, 470 55, 580 85 L 430 150 L 150 145 Z" fill="${C.stone}" opacity="0.6" stroke="${C.border}" stroke-width="1" />
  <text x="320" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="${C.forest}" text-anchor="middle">SCALA VESTIBULI (Perilymph)</text>
  <text x="320" y="122" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}" text-anchor="middle">Direct fluid path from Stapes / Oval Window (0 mV)</text>

  <!-- Reissner's Membrane -->
  <line x1="150" y1="145" x2="430" y2="150" stroke="${C.tealMuted}" stroke-width="1.8" stroke-dasharray="4,2" />
  <text x="145" y="140" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.tealMuted}">Reissner's Membrane</text>

  <!-- Scala Media / Cochlear Duct (Middle - Endolymph +80 mV) -->
  <path d="M 150 145 L 430 150 L 460 215 L 180 210 Z" fill="${C.sagePale}" opacity="0.75" stroke="${C.forest}" stroke-width="1.2" />
  <text x="300" y="175" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="${C.forest}" text-anchor="middle">SCALA MEDIA (Endolymph, +80 mV)</text>
  <text x="300" y="192" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.forestDark}" text-anchor="middle">High K\u207A concentration (150 mM) driving hair cell battery</text>

  <!-- Basilar Membrane -->
  <line x1="180" y1="210" x2="460" y2="215" stroke="${C.clay}" stroke-width="3" stroke-linecap="round" />
  <text x="468" y="218" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.clay}">Basilar Membrane</text>

  <!-- Organ of Corti on Basilar Membrane -->
  <g transform="translate(240, 195)">
    <!-- Tectorial Membrane -->
    <path d="M 0 0 C 35 -15, 80 -10, 110 -2" fill="none" stroke="${C.forest}" stroke-width="2.5" />
    <text x="50" y="-18" font-family="'Newsreader', serif" font-style="italic" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">Tectorial Membrane</text>
    <!-- Inner Hair Cell -->
    <circle cx="25" cy="12" r="5" fill="${C.forest}" />
    <!-- Outer Hair Cells (3 rows) -->
    <circle cx="65" cy="12" r="4.5" fill="${C.tealMuted}" />
    <circle cx="80" cy="12" r="4.5" fill="${C.tealMuted}" />
    <circle cx="95" cy="12" r="4.5" fill="${C.tealMuted}" />
    <!-- Stereocilia brushing tectorial -->
    <line x1="25" y1="7" x2="25" y2="-4" stroke="${C.clay}" stroke-width="1.5" />
    <line x1="65" y1="7.5" x2="65" y2="-3" stroke="${C.clay}" stroke-width="1.5" />
    <line x1="80" y1="7.5" x2="80" y2="-2" stroke="${C.clay}" stroke-width="1.5" />
    <line x1="95" y1="7.5" x2="95" y2="-1" stroke="${C.clay}" stroke-width="1.5" />
  </g>

  <!-- Scala Tympani (Bottom) -->
  <path d="M 180 210 L 460 215 L 560 260 C 440 280, 220 280, 110 250 Z" fill="${C.stone}" opacity="0.6" stroke="${C.border}" stroke-width="1" />
  <text x="320" y="248" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="${C.forest}" text-anchor="middle">SCALA TYMPANI (Perilymph)</text>
  <text x="320" y="265" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}" text-anchor="middle">Relieves pressure at Round Window | Site of Implant Electrode Array</text>
</svg>
`;
}

function getHairCellComparisonSvg() {
  return `
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig 5.2: Scanning electron microscope comparison of healthy stereocilia vs acoustic trauma degradation" style="width:100%; height:auto; display:block;">
  <rect width="720" height="360" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="4" />

  <!-- Left: Healthy Mechanoreceptor -->
  <g transform="translate(30, 20)">
    <rect width="315" height="320" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="3" />
    <text x="20" y="32" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">A. HEALTHY STEREOCILIA BUNDLE</text>
    <text x="20" y="50" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Intact mechanotransduction apparatus</text>

    <!-- Hair cell body -->
    <path d="M 60 260 C 60 170, 75 160, 155 160 C 235 160, 250 170, 250 260 Z" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.6" />
    <!-- Nucleus -->
    <ellipse cx="155" cy="225" rx="35" ry="22" fill="${C.white}" stroke="${C.forest}" stroke-width="1.2" />
    <text x="155" y="229" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.forest}" text-anchor="middle">Cell Nucleus</text>

    <!-- Cuticular plate -->
    <rect x="75" y="152" width="160" height="12" fill="${C.stone}" rx="2" stroke="${C.forest}" stroke-width="1" />

    <!-- 3-Tier Stereocilia Staircase -->
    <!-- Tier 1: Short -->
    <rect x="95" y="115" width="8" height="37" fill="${C.forest}" rx="2" />
    <rect x="110" y="115" width="8" height="37" fill="${C.forest}" rx="2" />
    <rect x="125" y="115" width="8" height="37" fill="${C.forest}" rx="2" />

    <!-- Tier 2: Medium -->
    <rect x="145" y="90" width="8" height="62" fill="${C.forest}" rx="2" />
    <rect x="160" y="90" width="8" height="62" fill="${C.forest}" rx="2" />
    <rect x="175" y="90" width="8" height="62" fill="${C.forest}" rx="2" />

    <!-- Tier 3: Tall -->
    <rect x="195" y="65" width="8" height="87" fill="${C.forest}" rx="2" />
    <rect x="210" y="65" width="8" height="87" fill="${C.forest}" rx="2" />

    <!-- Tip-link Spring Filaments (Terracotta) -->
    <line x1="103" y1="117" x2="145" y2="95" stroke="${C.clay}" stroke-width="2" stroke-linecap="round" />
    <line x1="118" y1="117" x2="160" y2="95" stroke="${C.clay}" stroke-width="2" stroke-linecap="round" />
    <line x1="133" y1="117" x2="175" y2="95" stroke="${C.clay}" stroke-width="2" stroke-linecap="round" />
    <line x1="153" y1="92" x2="195" y2="70" stroke="${C.clay}" stroke-width="2" stroke-linecap="round" />
    <line x1="168" y1="92" x2="210" y2="70" stroke="${C.clay}" stroke-width="2" stroke-linecap="round" />

    <text x="155" y="285" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">Cadherin-23 tip links intact</text>
    <text x="155" y="302" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}" text-anchor="middle">K\u207A / Ca\u00B2\u207A influx depolarizes cell</text>
  </g>

  <!-- Right: Damaged Hair Cell (Sensorineural Trauma) -->
  <g transform="translate(375, 20)">
    <rect width="315" height="320" fill="${C.white}" stroke="${C.border}" stroke-width="1" rx="3" />
    <text x="20" y="32" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.clay}">B. ACOUSTIC TRAUMA / LOSS</text>
    <text x="20" y="50" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Permanent mechanical degeneration</text>

    <!-- Hair cell body -->
    <path d="M 60 260 C 60 170, 75 160, 155 160 C 235 160, 250 170, 250 260 Z" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.6" />
    <!-- Nucleus (apoptotic / stressed) -->
    <ellipse cx="155" cy="225" rx="30" ry="18" fill="${C.white}" stroke="${C.clay}" stroke-width="1.2" stroke-dasharray="2,2" />
    <text x="155" y="229" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">Degenerating</text>

    <!-- Cuticular plate -->
    <rect x="75" y="152" width="160" height="12" fill="${C.stoneDark}" rx="2" stroke="${C.charcoalMuted}" stroke-width="1" />

    <!-- Sheared, flopped, broken stereocilia stumps -->
    <path d="M 95 152 L 105 138 L 115 152" stroke="${C.charcoalMuted}" stroke-width="2" fill="none" />
    <rect x="125" y="140" width="8" height="12" fill="${C.charcoalMuted}" rx="1" />
    <!-- Bent / fused cilium -->
    <path d="M 145 152 C 150 120, 185 125, 200 152" stroke="${C.charcoalMuted}" stroke-width="2" fill="none" />
    <!-- Missing tip links -->
    <line x1="105" y1="138" x2="125" y2="140" stroke="${C.clay}" stroke-width="1.2" stroke-dasharray="2,3" />

    <text x="155" y="285" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.clay}" text-anchor="middle">Broken tip links &amp; sheared cilia</text>
    <text x="155" y="302" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}" text-anchor="middle">Acoustic amplifiers cannot restore missing gates</text>
  </g>
</svg>
`;
}

function getImplantPipelineSvg() {
  return `
<svg id="implantFlowSvg" viewBox="0 0 880 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig 6.1: The six physical transduction stages of a multichannel cochlear implant system" style="width:100%; height:auto; display:block;">
  <style>
    .flow-card { cursor: pointer; transition: all 0.2s ease; }
    .flow-card:hover rect { stroke: ${C.clay} !important; stroke-width: 2px !important; }
    .flow-card.active rect { stroke: ${C.forest} !important; stroke-width: 2.5px !important; fill: ${C.sagePale} !important; }
    .flow-step-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600; fill: ${C.forest}; }
    .flow-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; fill: ${C.charcoal}; }
    .flow-energy { font-family: 'Newsreader', serif; font-style: italic; font-size: 11px; fill: ${C.charcoalMuted}; }
    .skin-barrier { stroke: ${C.clay}; stroke-width: 2; stroke-dasharray: 4,4; }
  </style>

  <rect width="880" height="240" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="4" />

  <!-- External / Internal Boundary Divider -->
  <line x1="435" y1="20" x2="435" y2="220" class="skin-barrier" />
  <text x="430" y="35" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.clay}" text-anchor="end">EXTERNAL PROCESSOR</text>
  <text x="440" y="35" font-family="'JetBrains Mono', monospace" font-size="10" fill="${C.clay}">SUBCUTANEOUS TISSUE</text>

  <!-- Step 1: Microphones -->
  <g class="flow-card active" data-step="1" id="flowStep1" transform="translate(20, 55)">
    <rect width="120" height="150" fill="${C.white}" stroke="${C.forest}" stroke-width="2" rx="3" />
    <text x="12" y="24" class="flow-step-num">STAGE 01</text>
    <text x="12" y="46" class="flow-title">Dual Mic</text>
    <text x="12" y="62" class="flow-title">Array</text>
    <line x1="12" y1="75" x2="108" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="12" y="95" class="flow-energy">Energy Domain:</text>
    <text x="12" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">Acoustic</text>
    <text x="12" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">Air pressure</text>
  </g>

  <!-- Arrow 1 -> 2 -->
  <path d="M 145 130 L 160 130" stroke="${C.forest}" stroke-width="2" marker-end="url(#arrow)" />

  <!-- Step 2: Digital Signal Processor -->
  <g class="flow-card" data-step="2" id="flowStep2" transform="translate(160, 55)">
    <rect width="120" height="150" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="3" />
    <text x="12" y="24" class="flow-step-num">STAGE 02</text>
    <text x="12" y="46" class="flow-title">Audio DSP</text>
    <text x="12" y="62" class="flow-title">Filterbank</text>
    <line x1="12" y1="75" x2="108" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="12" y="95" class="flow-energy">Energy Domain:</text>
    <text x="12" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">Digital</text>
    <text x="12" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">N-band envelop</text>
  </g>

  <!-- Arrow 2 -> 3 -->
  <path d="M 285 130 L 300 130" stroke="${C.forest}" stroke-width="2" />

  <!-- Step 3: Transcutaneous RF Coil -->
  <g class="flow-card" data-step="3" id="flowStep3" transform="translate(300, 55)">
    <rect width="120" height="150" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="3" />
    <text x="12" y="24" class="flow-step-num">STAGE 03</text>
    <text x="12" y="46" class="flow-title">Inductive</text>
    <text x="12" y="62" class="flow-title">RF Coil</text>
    <line x1="12" y1="75" x2="108" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="12" y="95" class="flow-energy">Energy Domain:</text>
    <text x="12" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.clay}">RF Magnet</text>
    <text x="12" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">2.5 - 5.0 MHz</text>
  </g>

  <!-- Arrow across skin barrier 3 -> 4 -->
  <path d="M 425 130 L 450 130" stroke="${C.clay}" stroke-width="2.5" stroke-dasharray="3,3" />

  <!-- Step 4: Subcutaneous Receiver-Stimulator -->
  <g class="flow-card" data-step="4" id="flowStep4" transform="translate(450, 55)">
    <rect width="120" height="150" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="3" />
    <text x="12" y="24" class="flow-step-num">STAGE 04</text>
    <text x="12" y="46" class="flow-title">Receiver</text>
    <text x="12" y="62" class="flow-title">Stimulator</text>
    <line x1="12" y1="75" x2="108" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="12" y="95" class="flow-energy">Energy Domain:</text>
    <text x="12" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">Electrical</text>
    <text x="12" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">Current pulses</text>
  </g>

  <!-- Arrow 4 -> 5 -->
  <path d="M 575 130 L 590 130" stroke="${C.forest}" stroke-width="2" />

  <!-- Step 5: Electrode Array -->
  <g class="flow-card" data-step="5" id="flowStep5" transform="translate(590, 55)">
    <rect width="120" height="150" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="3" />
    <text x="12" y="24" class="flow-step-num">STAGE 05</text>
    <text x="12" y="46" class="flow-title">Electrode</text>
    <text x="12" y="62" class="flow-title">Array (12-24)</text>
    <line x1="12" y1="75" x2="108" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="12" y="95" class="flow-energy">Energy Domain:</text>
    <text x="12" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.clay}">Biphasic</text>
    <text x="12" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">Ionic current</text>
  </g>

  <!-- Arrow 5 -> 6 -->
  <path d="M 715 130 L 730 130" stroke="${C.forest}" stroke-width="2" />

  <!-- Step 6: Auditory Nerve -->
  <g class="flow-card" data-step="6" id="flowStep6" transform="translate(730, 55)">
    <rect width="130" height="150" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" rx="3" />
    <text x="12" y="24" class="flow-step-num">STAGE 06</text>
    <text x="12" y="46" class="flow-title">Auditory Nerve</text>
    <text x="12" y="62" class="flow-title">&amp; Brainstem</text>
    <line x1="12" y1="75" x2="118" y2="75" stroke="${C.border}" stroke-width="1" />
    <text x="12" y="95" class="flow-energy">Energy Domain:</text>
    <text x="12" y="112" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">Neural</text>
    <text x="12" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="${C.charcoalMuted}">Action potentials</text>
  </g>
</svg>
`;
}

console.log('SVG generators defined.');

// ----------------------------------------------------------------------------
// HTML SECTION GENERATORS
// ----------------------------------------------------------------------------

function getHtml(speechBundle) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RESONANCE \u2014 Hear What an Implant Hears | High-School Physics &amp; Bioacoustics</title>
  <meta name="description" content="A physical and bioacoustic inquiry into how the human ear processes pressure waves, and how neuroprosthetic engineering restores hearing.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
${getCss()}
  </style>
</head>
<body>

  <!-- Sticky Editorial Navigation -->
  <header class="navbar" role="banner">
    <div class="nav-container">
      <a href="#hero" class="nav-brand" aria-label="RESONANCE Home">
        <span class="brand-title">RESONANCE</span>
        <span class="brand-sub">Hear what an implant hears</span>
      </a>

      <nav aria-label="Site Navigation">
        <ul class="nav-menu">
          <li><a href="#sound" class="nav-link">Physics of Sound</a></li>
          <li><a href="#ear-machine" class="nav-link">The Ear as a Machine</a></li>
          <li><a href="#cochlea" class="nav-link">The Cochlea</a></li>
          <li><a href="#pathology" class="nav-link">When Hearing Breaks</a></li>
          <li><a href="#implant-architecture" class="nav-link">Inside an Implant</a></li>
          <li><a href="#simulator" class="nav-link">The Simulator</a></li>
          <li><a href="#experiment" class="nav-link">The Experiment</a></li>
          <li><a href="#music" class="nav-link">Music Challenge</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <div class="audio-status-pill" id="audioStatusPill" title="Web Audio DSP Engine Status">
          <span class="audio-status-dot" id="audioStatusDot"></span>
          <span id="audioStatusText">DSP Ready</span>
        </div>
        <a href="#simulator" class="btn btn-forest btn-sm">Open Simulator</a>
      </div>
    </div>
  </header>

  <main>
    <!-- ====================================================================
         SECTION 1: HERO (Editorial Cover Exhibition)
         ==================================================================== -->
    <section id="hero" class="bg-ivory" style="padding-top: 5rem; padding-bottom: 5rem;">
      <div class="container">
        <div class="editorial-split">
          <div class="editorial-split-text">
            <div class="kicker">PHYSICS &amp; BIOACOUSTICS LABORATORY MONOGRAPH \u00B7 2026</div>
            <h1>RESONANCE</h1>
            <p class="lead" style="font-family: var(--font-display); font-size: 1.45rem; color: var(--forest); line-height: 1.5; margin-bottom: 1.5rem;">
              Hear what an implant hears.
            </p>
            <p>
              Sound is a traveling mechanical pressure oscillation in air. How does a biological machine transform micro-disturbances of gas molecules into neural perception \u2014 and how can surgical microelectronics restore speech to those with profound sensory loss?
            </p>
            <p>
              This exhibition explores the physical impedance matching of the middle ear, Georg von B\u00E9k\u00E9sy's tonotopic spatial Fourier analysis along the basilar ribbon, and the channel vocoder DSP algorithm modeled by Shannon et al. (1995).
            </p>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem; margin-bottom: 2rem;">
              <a href="#simulator" class="btn btn-forest" id="btnHeroSim">Hear What an Implant Hears</a>
              <a href="#sound" class="btn btn-outline" id="btnHeroExplore">Explore the Mechanics</a>
            </div>

            <div style="display: flex; gap: 1.5rem; border-top: 1px solid var(--border); padding-top: 1.25rem;">
              <div>
                <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 600; color: var(--forest);">16 kHz DSP</div>
                <div style="font-size: 0.85rem; color: var(--charcoal-muted);">Real-time filterbank</div>
              </div>
              <div style="border-left: 1px solid var(--border); padding-left: 1.5rem;">
                <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 600; color: var(--forest);">32 mm Basilar Map</div>
                <div style="font-size: 0.85rem; color: var(--charcoal-muted);">Greenwood tonotopy</div>
              </div>
              <div style="border-left: 1px solid var(--border); padding-left: 1.5rem;">
                <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 600; color: var(--forest);">Zero Backend</div>
                <div style="font-size: 0.85rem; color: var(--charcoal-muted);">100% In-browser audio</div>
              </div>
            </div>
          </div>

          <!-- Hero Photographic & Wave Plate -->
          <div>
            <div class="photo-frame">
              <span class="photo-badge">ARCHIVAL BIOACOUSTICS</span>
              <img src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Photograph of a human listener experiencing sound vibrations in natural light" style="max-height: 380px;" />
              <div class="caption">
                <strong>Fig. 1.1:</strong> The human listening apparatus in an acoustic field. Microscopic fluctuations in atmospheric pressure ($\Delta P \approx 20\text{ }\mu\text{Pa}$) deflect the tympanic membrane across sub-atomic displacements.
              </div>
            </div>

            <!-- Overlaid Acoustic Field Diagram -->
            <div style="margin-top: 1.25rem;">
              ${getHeroAcousticSvg()}
            </div>
          </div>
        </div>

        <!-- Ambient Hero Soundwave Strip -->
        <div style="margin-top: 3.5rem; background-color: var(--white); border: 1px solid var(--border); padding: 1.25rem 1.75rem; border-radius: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
            <span style="font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--forest); font-weight: 600;">
              AMBIENT OSCILLOGRAPH \u00B7 ATMOSPHERIC SOUNDWAVE RIBBON
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--charcoal-muted);">
              Speed of sound v = 343 m/s \u00B7 \u03C1\u2080 = 1.204 kg/m\u00B3
            </span>
          </div>
          <canvas id="heroWaveCanvas" class="resonance-canvas" height="60" style="height: 60px;"></canvas>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 2: WHAT IS SOUND?
         ==================================================================== -->
    <section id="sound" class="bg-white">
      <div class="container">
        <div class="kicker">PHYSICAL FOUNDATIONS</div>
        <h2>A Mechanical Disturbance in an Elastic Medium</h2>
        <p class="lead">
          Sound is not a tangible substance; it is a traveling mechanical pressure wave. When an object vibrates, it alternately pushes and pulls surrounding gas molecules, creating regions of compression and rarefaction that propagate outward at the speed of sound.
        </p>

        <div class="editorial-split" style="margin-top: 3rem;">
          <!-- Left: Physical Media Visuals -->
          <div>
            <div class="photo-frame">
              <span class="photo-badge">FLUID DYNAMICS PLATE</span>
              <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Resonant concentric water wave ripples illustrating physical wave interference and harmonic propagation" style="max-height: 280px;" />
              <div class="caption">
                <strong>Fig. 2.1:</strong> Mechanical wave propagation and harmonic resonance across a fluid surface. In air, sound is longitudinal, meaning particles oscillate parallel to the direction of wave velocity.
              </div>
            </div>

            <div style="margin-top: 1.5rem;">
              ${getAirCompressionSvg()}
            </div>

            <div class="formula-box">
              <div class="formula-title">THE SPEED OF SOUND IN GASES &amp; FLUIDS</div>
              <div>v = \u221A(\u03B3 \u00B7 R \u00B7 T / M)</div>
              <div style="font-size: 0.85rem; color: var(--charcoal-muted); margin-top: 0.35rem;">
                In air at 20\u00B0C: v = 343 m/s (\u03BB at 1 kHz = 34.3 cm).<br>
                In cochlear perilymph fluid: v \u2248 1,480 m/s.
              </div>
            </div>
          </div>

          <!-- Right: Interactive Waveform Studio -->
          <div class="editorial-plate plate-sage" style="margin: 0;">
            <div class="kicker">INTERACTIVE BENCH</div>
            <h3 style="margin-bottom: 0.75rem;">Waveform &amp; Spectrogram Studio</h3>
            <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">
              Adjust the sliders below to synthesize a pure acoustic tone. Observe how frequency determines pitch and amplitude determines sound pressure level.
            </p>

            <!-- Frequency Slider -->
            <div class="slider-row">
              <div class="slider-label">
                <span>Frequency (Pitch)</span>
                <span class="slider-val" id="waveFreqVal">440 Hz (Concert A)</span>
              </div>
              <input type="range" id="waveFreqSlider" min="50" max="2000" step="5" value="440" aria-label="Frequency in Hertz">
              <div class="pill-group">
                <button type="button" class="pill-btn wave-preset-btn" data-freq="130">130 Hz (C3 Bass)</button>
                <button type="button" class="pill-btn wave-preset-btn" data-freq="261">261 Hz (Middle C)</button>
                <button type="button" class="pill-btn wave-preset-btn active" data-freq="440">440 Hz (Concert A)</button>
                <button type="button" class="pill-btn wave-preset-btn" data-freq="1000">1000 Hz (Audiometric)</button>
                <button type="button" class="pill-btn wave-preset-btn" data-freq="2000">2000 Hz (Sibilance)</button>
              </div>
            </div>

            <!-- Amplitude Slider -->
            <div class="slider-row">
              <div class="slider-label">
                <span>Amplitude (Loudness)</span>
                <span class="slider-val" id="waveAmpVal">50% (-6.0 dBFS)</span>
              </div>
              <input type="range" id="waveAmpSlider" min="0" max="100" step="1" value="50" aria-label="Amplitude in percentage">
            </div>

            <!-- Waveform Timbre Mode -->
            <div style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem;">
              <span style="font-size: 0.9rem; font-weight: 600; color: var(--forest);">Timbre:</span>
              <label style="font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                <input type="radio" name="waveTimbre" id="waveTypeSine" value="sine" checked> Pure Sine
              </label>
              <label style="font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                <input type="radio" name="waveTimbre" id="waveTypeHarmonic" value="harmonic"> Harmonic Vowel
              </label>
            </div>

            <!-- Play Audio Tone Button -->
            <div style="display: flex; gap: 0.75rem; margin-bottom: 1.5rem;">
              <button type="button" class="btn btn-forest" id="btnToggleTone" style="flex: 1;">
                Play Acoustic Tone
              </button>
              <button type="button" class="btn btn-outline" id="btnToggleMic">
                Start Microphone Live FFT
              </button>
            </div>

            <!-- Calibrated Oscilloscope Canvas -->
            <div style="margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem; color: var(--charcoal-muted); margin-bottom: 0.25rem;">
                <span>CALIBRATED TIME DOMAIN OSCILLOSCOPE</span>
                <span id="wavePeriodReadout">T = 2.27 ms \u00B7 \u03BB = 78.0 cm</span>
              </div>
              <canvas id="oscilloscopeCanvas" class="resonance-canvas" height="110" style="height: 110px;"></canvas>
            </div>

            <!-- Microphone Spectrogram Waterfall Canvas -->
            <div>
              <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem; color: var(--charcoal-muted); margin-bottom: 0.25rem;">
                <span>REAL-TIME SPECTROGRAM WATERFALL (0 - 4 kHz)</span>
                <span id="micStatusText">Microphone: Standby</span>
              </div>
              <canvas id="spectrogramCanvas" class="resonance-canvas" height="110" style="height: 110px;"></canvas>
              <div id="micFallbackMsg" style="display: none; padding: 0.6rem; background: var(--white); border: 1px solid var(--border); font-size: 0.85rem; color: var(--clay); border-radius: 3px; margin-top: 0.5rem;">
                Microphone access unavailable or denied. The oscilloscope above continues displaying calibrated mathematical waveforms.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 3: THE EAR AS A MACHINE
         ==================================================================== -->
    <section id="ear-machine" class="bg-stone">
      <div class="container">
        <div class="kicker">BIOMECHANICAL TRANSDUCTION</div>
        <h2>The Middle Ear as an Impedance Transformer</h2>
        <p class="lead">
          Air is light and easily compressed; fluid is dense and virtually incompressible. When an airborne acoustic wave reaches the fluid of the cochlea, the mismatch in acoustic impedance would cause 99.9% of the sound wave to reflect harmlessly away. The middle ear is nature's mechanical transformer.
        </p>

        <!-- Clinical Otoscopy & Impedance Theory -->
        <div class="editorial-split" style="margin-top: 2.5rem; align-items: flex-start;">
          <div class="photo-frame">
            <span class="photo-badge">CLINICAL OTOSCOPY</span>
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Clinical examination of the human auditory canal and tympanic membrane through an otoscopic speculum" style="max-height: 320px;" />
            <div class="caption">
              <strong>Fig. 3.1:</strong> Clinical otoscopic view of a healthy human ear canal. The pearly-gray tympanic membrane (eardrum) is under tension, with the manubrium of the malleus bone visible through the semi-translucent fibrous tissue.
            </div>
          </div>

          <div>
            <h3 style="margin-bottom: 0.75rem;">The Physics of the Acoustic Boundary</h3>
            <p style="font-size: 1rem;">
              Specific acoustic impedance is given by the product of density and wave velocity: $Z = \rho \cdot v$. For air, $Z_{\text{air}} \approx 415 \text{ Pa}\cdot\text{s/m}$. For the watery perilymph of the inner ear, $Z_{\text{fluid}} \approx 1,500,000 \text{ Pa}\cdot\text{s/m}$.
            </p>
            <p style="font-size: 1rem;">
              The intensity reflection coefficient $R$ at an untreated boundary is:
            </p>
            <div class="formula-box">
              <div class="formula-title">INTENSITY REFLECTION COEFFICIENT</div>
              <div>R = [ (Z\u2082 - Z\u2081) / (Z\u2082 + Z\u2081) ]\u00B2 \u2248 0.9989 (99.9%)</div>
              <div style="font-size: 0.85rem; color: var(--charcoal-muted); margin-top: 0.35rem;">
                Without an impedance transformer, only 0.1% of acoustic energy enters the fluid \u2014 a devastating 30 dB transmission loss.
              </div>
            </div>
            <p style="font-size: 0.95rem;">
              The middle ear solves this with two compounding mechanical levers:
            </p>
            <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; font-size: 0.95rem; color: var(--charcoal);">
              <li><strong>The Hydraulic Area Ratio (17:1):</strong> Force gathered across the wide $55\text{ mm}^2$ eardrum is concentrated onto the tiny $3.2\text{ mm}^2$ stapes footplate. Pressure increases by $55 / 3.2 = 17.2\times$.</li>
              <li><strong>The Ossicular Lever Advantage (1.3:1):</strong> The malleus arm is 1.3 times longer than the incus arm, acting like a crowbar to boost force by 30%.</li>
              <li><strong>Combined Pressure Amplification:</strong> $17.2 \times 1.3 \approx 22.3\times$ pressure gain ($+27\text{ dB}$), perfectly matching air to fluid.</li>
            </ul>
          </div>
        </div>

        <!-- Full-Width Interactive Ear Anatomy Plate -->
        <div class="editorial-plate" style="margin-top: 3rem; background: var(--white);">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
            <div>
              <div class="kicker">INTERACTIVE DISSECTION PLATE</div>
              <h3>Fig. 3.2: Anatomical Cross-Section of the Human Ear</h3>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--charcoal-muted);">Click components to inspect</span>
          </div>

          ${getEarCrossSectionSvg()}

          <!-- Inspection Result Card -->
          <div id="earInspectionCard" style="margin-top: 1.5rem; background: var(--ivory); border: 1px solid var(--border); border-left: 4px solid var(--forest); padding: 1.5rem; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
              <h4 id="earPartName" style="color: var(--forest); font-size: 1.25rem;">Tympanic Membrane (Eardrum)</h4>
              <span id="earPartRole" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--clay); font-weight: 600;">STAGE II: ACOUSTIC COLLECTOR</span>
            </div>
            <p id="earPartPhysics" style="font-size: 0.95rem; margin-bottom: 0;">
              A 0.1 mm thick conical membrane with an effective vibrating area of 55 mm\u00B2. It transforms oscillating air pressure waves into mechanical excursions of the manubrium of the malleus.
            </p>
          </div>
        </div>

        <!-- Animated Impedance Matching Simulation Canvas -->
        <div class="editorial-plate plate-sage" style="margin-top: 2.5rem;">
          <div class="kicker">PHYSICS SIMULATION</div>
          <h3>Dynamic Boundary: Air-Fluid Interface With &amp; Without Ossicles</h3>
          <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">
            Observe what happens to a 1 kHz acoustic pressure wave as it strikes cochlear perilymph fluid. Toggle between the unassisted direct boundary and the 22x ossicular lever transformer.
          </p>

          <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
            <button type="button" class="btn btn-forest" id="btnImpLever">With Middle Ear Transformer (22\u00D7 Gain)</button>
            <button type="button" class="btn btn-outline" id="btnImpDirect">Without Middle Ear Bones (99.9% Reflection)</button>
          </div>

          <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.8rem; color: var(--charcoal-muted); margin-bottom: 0.4rem;">
            <span>AIR MEDIUM (Z\u2081 = 415 Pa\u00B7s/m)</span>
            <span id="impTelemetry">Mode: 22\u00D7 Hydraulic Lever \u00B7 Transmission: ~60% (-2.2 dB)</span>
            <span>COCHLEAR FLUID (Z\u2082 = 1.5\u00D710\u2076 Pa\u00B7s/m)</span>
          </div>

          <canvas id="impedanceCanvas" class="resonance-canvas" height="140" style="height: 140px;"></canvas>
          <div class="caption">
            <strong>Fig. 3.3:</strong> Real-time numerical wave simulation. Without the ossicles, the high acoustic impedance of fluid acts like a rigid brick wall, reflecting virtually all acoustic momentum back into the ear canal.
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 4: THE COCHLEA AS A FREQUENCY ANALYZER
         ==================================================================== -->
    <section id="cochlea" class="bg-white">
      <div class="container">
        <div class="kicker">TONOTOPIC FOURIER ANALYSIS</div>
        <h2>Spatial Frequency Dispersion Along the Basilar Ribbon</h2>
        <p class="lead">
          Inside the temporal bone rests the cochlea \u2014 a snail-like spiral shell making 2.75 turns. When uncoiled, it forms a 32 mm fluid channel partitioned by the basilar membrane. The cochlea acts as a physical Fourier analyzer, physically sorting complex acoustic sounds into separate spatial locations.
        </p>

        <div class="editorial-split" style="margin-top: 3rem; align-items: flex-start;">
          <!-- Left: Laboratory Photo and Cochlear Duct Diagram -->
          <div>
            <div class="photo-frame">
              <span class="photo-badge">PRECISION BIOACOUSTICS</span>
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Precision laboratory bioacoustic measurement equipment used for investigating cellular and cochlear mechanics" style="max-height: 280px;" />
              <div class="caption">
                <strong>Fig. 4.1:</strong> Precision laser vibrometry and cellular imaging instruments used in modern cochlear biophysics. Georg von B\u00E9k\u00E9sy was awarded the 1961 Nobel Prize for discovering the physical traveling wave that propagates along the basilar membrane.
              </div>
            </div>

            <div style="margin-top: 1.5rem;">
              ${getCochleaScalaeSvg()}
            </div>
          </div>

          <!-- Right: Greenwood Equation and Mechanics -->
          <div>
            <h3 style="margin-bottom: 0.75rem;">Stiffness Gradients &amp; Traveling Waves</h3>
            <p style="font-size: 1rem;">
              Why do different frequencies peak at different places? The basilar membrane is not uniform:
            </p>
            <ul style="margin-left: 1.5rem; margin-bottom: 1.25rem; font-size: 0.95rem; color: var(--charcoal);">
              <li><strong>At the Base (near the oval window):</strong> The membrane is narrow (0.1 mm), taut, and 100 times stiffer. It resonates to fast, high-frequency pressure waves (up to 20,000 Hz).</li>
              <li><strong>At the Apex (tip, helicotrema):</strong> The membrane is wide (0.5 mm), loose, and compliant. High-frequency waves have already dissipated before reaching it; only slow, low frequencies (down to 20 Hz) travel all the way to the apex.</li>
            </ul>

            <div class="formula-box">
              <div class="formula-title">THE GREENWOOD FREQUENCY-POSITION EQUATION</div>
              <div>f(x) = 165.4 \u00B7 (10^[2.1 \u00B7 (1 - x / 32)] - 0.88)</div>
              <div style="font-size: 0.85rem; color: var(--charcoal-muted); margin-top: 0.35rem;">
                Where $x$ is distance from the cochlear base in millimeters ($0 \le x \le 32\text{ mm}$).
              </div>
            </div>

            <p style="font-size: 0.95rem;">
              Because of this physical map (called <em>tonotopy</em>), each pitch excites a specific bundle of auditory nerve fibers. The brain knows what frequency entered the ear simply by noting <em>where</em> the basilar membrane vibrated.
            </p>
          </div>
        </div>

        <!-- Full-Width Interactive Unrolled Cochlea Plate -->
        <div class="editorial-plate plate-sage" style="margin-top: 3rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
            <div>
              <div class="kicker">INTERACTIVE BASILAR MEMBRANE</div>
              <h3>Fig. 4.2: Unrolled 32 mm Tonotopic Traveling Wave Analyzer</h3>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--charcoal-muted);">Move slider to observe peak resonance location</span>
          </div>

          <!-- Pitch Slider & Audio Controls -->
          <div class="slider-row" style="margin-bottom: 1.25rem;">
            <div class="slider-label">
              <span>Stimulus Pitch: <strong id="cochleaFreqVal" style="color: var(--forest); font-family: var(--font-mono);">1000 Hz</strong></span>
              <span id="cochleaResonanceReadout" style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--clay); font-weight: 600;">
                Resonance at x = 18.2 mm from Base
              </span>
            </div>
            <input type="range" id="cochleaFreqSlider" min="100" max="8000" step="25" value="1000" aria-label="Cochlear probe frequency in Hertz">
            <div class="pill-group">
              <button type="button" class="pill-btn cochlea-preset-btn" data-freq="250">250 Hz (Vowels / Bass)</button>
              <button type="button" class="pill-btn cochlea-preset-btn" data-freq="500">500 Hz (Male Pitch)</button>
              <button type="button" class="pill-btn cochlea-preset-btn active" data-freq="1000">1000 Hz (Consonants)</button>
              <button type="button" class="pill-btn cochlea-preset-btn" data-freq="3000">3000 Hz (Pinna Gain Peak)</button>
              <button type="button" class="pill-btn cochlea-preset-btn" data-freq="6000">6000 Hz (High Fricatives)</button>
            </div>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <button type="button" class="btn btn-forest btn-sm" id="btnToggleCochleaTone">Play Resonant Tone</button>
          </div>

          <!-- Unrolled Basilar Membrane Canvas -->
          <canvas id="cochleaCanvas" class="resonance-canvas" height="150" style="height: 150px;"></canvas>

          <!-- Telemetry Bar -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; background: var(--white); border: 1px solid var(--border); padding: 0.85rem 1.25rem; border-radius: 4px;">
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--charcoal-muted); text-transform: uppercase;">Anatomical Position</div>
              <div id="cochleaPosVal" style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 600; color: var(--forest);">18.2 mm from Oval Window</div>
            </div>
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--charcoal-muted); text-transform: uppercase;">Membrane Width</div>
              <div id="cochleaWidthVal" style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 600; color: var(--forest);">0.26 mm (Mid-Turn)</div>
            </div>
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--charcoal-muted); text-transform: uppercase;">Relative Stiffness</div>
              <div id="cochleaStiffnessVal" style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 600; color: var(--clay);">Medium Compliance</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 5: WHEN HEARING BREAKS
         ==================================================================== -->
    <section id="pathology" class="bg-sage">
      <div class="container">
        <div class="kicker">PATHOLOGY &amp; NEUROPROSTHETICS</div>
        <h2>Acoustic Amplification vs. Direct Neural Stimulation</h2>
        <p class="lead">
          Hearing loss is not merely a loss of volume; in sensorineural hearing loss, it is a loss of biological transducer switches. Understanding why a hearing aid cannot help a severely damaged inner ear reveals the engineering brilliance of the cochlear implant.
        </p>

        <!-- Electron Microscopy & Hair Cell Comparison -->
        <div class="editorial-split" style="margin-top: 3rem; align-items: flex-start;">
          <div class="photo-frame">
            <span class="photo-badge">CELLULAR MICROSCOPY</span>
            <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Scanning electron microscope in an auditory neuroscience research facility" style="max-height: 320px;" />
            <div class="caption">
              <strong>Fig. 5.1:</strong> Electron microscope facility examining inner ear hair cells. Humans are born with approximately 15,000 hair cells per ear. Unlike avian or reptilian hair cells, human cochlear hair cells do not regenerate once damaged.
            </div>
          </div>

          <div>
            <h3 style="margin-bottom: 0.75rem;">Mechanosensory Destruction</h3>
            <p style="font-size: 1rem;">
              Perched atop each hair cell is a microscopic bundle of <em>stereocilia</em>, connected by tiny protein filaments called <strong>tip links</strong> (cadherin-23 and protocadherin-15).
            </p>
            <p style="font-size: 1rem;">
              When the basilar membrane vibrates, fluid shear tilts the stereocilia. This mechanically yanks the tip links like tiny pull-cords, opening mechano-electrical transduction (MET) ion channels. Potassium ions ($K^+$) flood into the hair cell from the high-voltage endolymph (+80 mV), generating neurotransmitter release.
            </p>
            <p style="font-size: 1rem;">
              Acoustic trauma, ototoxic antibiotics, genetic variants, or aging break these fragile tip links and shear the stereocilia. Once the hair cell dies, no acoustic sound wave can be converted into electrical voltage.
            </p>
          </div>
        </div>

        <div style="margin-top: 2rem;">
          ${getHairCellComparisonSvg()}
        </div>

        <!-- Comparative Table: Hearing Aid vs Cochlear Implant -->
        <div class="editorial-plate" style="margin-top: 3rem; background: var(--white);">
          <div class="kicker">ENGINEERING COMPARISON</div>
          <h3>Acoustic Hearing Aid vs. Cochlear Implant</h3>

          <table class="editorial-table">
            <thead>
              <tr>
                <th style="width: 20%;">Attribute</th>
                <th style="width: 40%;">Acoustic Hearing Aid</th>
                <th style="width: 40%;">Cochlear Implant Neuroprosthesis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Primary Mechanism</strong></td>
                <td>Acoustic amplification (microphone \u2192 DSP \u2192 miniature loudspeaker in ear canal).</td>
                <td>Direct electrical stimulation (microphone \u2192 speech processor \u2192 platinum electrode array).</td>
              </tr>
              <tr>
                <td><strong>Biological Target</strong></td>
                <td>Relies entirely on surviving biological hair cells to sense the louder sound waves.</td>
                <td>Bypasses dead hair cells completely; directly depolarizes spiral ganglion auditory nerve fibers.</td>
              </tr>
              <tr>
                <td><strong>When Indicated</strong></td>
                <td>Mild to moderate hearing loss where substantial hair cells remain intact.</td>
                <td>Severe to profound sensorineural deafness where hair cells are missing or non-functional.</td>
              </tr>
              <tr>
                <td><strong>Limitation in Severe Loss</strong></td>
                <td>Amplifying sound into dead cochlear regions produces painful acoustic distortion without clarity.</td>
                <td>Limited to 12\u201324 discrete electrode channels; current spread blurs pitch discrimination.</td>
              </tr>
            </tbody>
          </table>

          <!-- 3-Way Audio Demonstration -->
          <div style="margin-top: 2rem; background: var(--ivory); border: 1px solid var(--border); padding: 1.5rem; border-radius: 4px;">
            <div class="kicker">ACOUSTIC DEMONSTRATION</div>
            <h4 style="margin-bottom: 0.5rem; color: var(--forest); font-size: 1.2rem;">Listen: Hearing Aid Distortion vs. Implant Stimulation</h4>
            <p style="font-size: 0.95rem; margin-bottom: 1.25rem;">
              Experience why sheer amplification fails when hair cells are missing. Listen to clear speech, an acoustic hearing aid attempting to amplify through 70% dead hair cells, and a 16-channel cochlear implant simulation.
            </p>

            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem;">
              <button type="button" class="btn btn-outline" id="btnDemoNormal">1. Clear Unprocessed Speech</button>
              <button type="button" class="btn btn-outline" id="btnDemoDegraded" style="border-color: var(--clay); color: var(--clay);">2. Hearing Aid with 70% Hair Cell Loss</button>
              <button type="button" class="btn btn-forest" id="btnDemoImplant">3. 16-Channel Direct Neural Simulation</button>
            </div>

            <div id="demoAudioStatus" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--charcoal-muted);">
              Click any option above to listen to the audio trial.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 6: INSIDE AN IMPLANT
         ==================================================================== -->
    <section id="implant-architecture" class="bg-ivory">
      <div class="container">
        <div class="kicker">SYSTEM ARCHITECTURE</div>
        <h2>The Six Transduction Stages of a Cochlear Implant</h2>
        <p class="lead">
          A cochlear implant is a true bionic organ. In under 2 milliseconds, it captures pressure oscillations in air, extracts acoustic spectral envelopes, beams digital instructions through intact human skin via magnetic induction, and fires electrical currents into the auditory nerve.
        </p>

        <!-- Photographic Composite: Microelectronics & Real Assistive User -->
        <div class="editorial-split" style="margin-top: 3rem; align-items: center;">
          <div class="photo-frame">
            <span class="photo-badge">BIONIC MICROELECTRONICS</span>
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Silicon wafer microelectronics and processor circuitry representing neuroprosthetic implant technology" style="max-height: 280px;" />
            <div class="caption">
              <strong>Fig. 6.1:</strong> Custom CMOS silicon application-specific integrated circuit (ASIC). The internal receiver-stimulator is encapsulated in hermetically sealed medical-grade titanium to withstand bodily electrolytes.
            </div>
          </div>

          <div class="photo-frame">
            <span class="photo-badge">ASSISTIVE TECHNOLOGY IN DAILY LIFE</span>
            <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="A child outdoors engaging with the environment, representing how modern hearing technology connects users with speech and sound" style="max-height: 280px;" />
            <div class="caption">
              <strong>Fig. 6.2:</strong> Pediatric and adult cochlear neuroprosthetics. With early implantation and auditory habilitation, children acquire natural spoken language and adult recipients regain social connection.
            </div>
          </div>
        </div>

        <!-- Full-Width 6-Stage Transcutaneous Flow Diagram -->
        <div class="editorial-plate" style="margin-top: 3rem; background: var(--white);">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
            <div>
              <div class="kicker">TRANSCUTANEOUS SIGNAL PIPELINE</div>
              <h3>Fig. 6.3: The Transduction Chain from Acoustic Wave to Action Potentials</h3>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--charcoal-muted);">Click any stage to inspect energy domains</span>
          </div>

          ${getImplantPipelineSvg()}

          <!-- Dynamic Energy Inspector Card -->
          <div id="flowInspectionCard" style="margin-top: 1.5rem; background: var(--ivory); border: 1px solid var(--border); border-left: 4px solid var(--forest); padding: 1.5rem; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
              <h4 id="flowStepTitle" style="color: var(--forest); font-size: 1.25rem;">Stage 01: Dual Microphone Array &amp; Sound Processor</h4>
              <span id="flowEnergyDomain" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--clay); font-weight: 600;">
                ENERGY DOMAIN: ACOUSTIC \u2192 ANALOG VOLTAGE
              </span>
            </div>
            <p id="flowDescription" style="font-size: 0.95rem; margin-bottom: 0.5rem;">
              Miniature electret or MEMS omnidirectional microphones capture sound pressure waves behind the outer ear pinna. Adaptive directional algorithms filter out ambient reverberation and steer sensitivity toward conversation partners.
            </p>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--charcoal-muted);" id="flowLatency">
              Processing latency: &lt; 0.2 ms \u00B7 Sampling: 16\u201344.1 kHz \u00B7 Power: Zinc-air or Li-ion cell
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 7: THE SIMULATOR (The Centerpiece)
         ==================================================================== -->
    <section id="simulator" class="bg-white">
      <div class="container">
        <div class="kicker">CENTRAL LABORATORY EXPERIMENT</div>
        <h2>The Channel Vocoder Simulator</h2>
        <p class="lead">
          How does human speech sound when filtered through the spatial bottleneck of a cochlear implant? Use this real-time DSP vocoder to decompose audio into discrete frequency bands, extract temporal envelopes, and reconstruct sound through noise or sine carriers.
        </p>

        <!-- Scientific Caveat Plaque -->
        <div style="background: var(--ivory); border: 1px solid var(--border); border-left: 4px solid var(--clay); padding: 1.25rem 1.5rem; border-radius: 4px; margin-bottom: 2.5rem;">
          <div style="font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--clay); font-weight: 600; margin-bottom: 0.35rem;">
            SCIENTIFIC MONOGRAPH NOTE \u00B7 ACOUSTIC APPROXIMATION
          </div>
          <p style="font-size: 0.95rem; margin-bottom: 0; color: var(--charcoal);">
            A channel vocoder is an acoustic model based on the pioneering psychoacoustic methods of Shannon et al. (1995) and Loizou (1999). It illustrates the reduction in spectral resolution and pitch structure that a newly implanted ear receives. However, it is an approximation: recipient brains undergo remarkable neuroplastic adaptation over months of rehabilitation, learning to extract rich linguistic meaning from these electrical pulse trains.
          </p>
        </div>

        <div class="editorial-split" style="align-items: flex-start;">
          <!-- Left: Studio Console Photo & Vocoder Architecture -->
          <div>
            <div class="photo-frame">
              <span class="photo-badge">AUDIO SIGNAL PROCESSING</span>
              <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Audio engineering console and spectrum analyzer used for digital sound synthesis and signal analysis" style="max-height: 280px;" />
              <div class="caption">
                <strong>Fig. 7.1:</strong> Digital audio signal processing desk. The Shannon channel vocoder splits incoming speech into $N$ logarithmic frequency bands, rectifies each band to extract its amplitude envelope ($&lt; 50\text{ Hz}$), and uses that envelope to amplitude-modulate band-limited noise carriers.
              </div>
            </div>

            <!-- Vocoder Mathematics Callout -->
            <div class="formula-box" style="margin-top: 1.5rem;">
              <div class="formula-title">THE CHANNEL VOCODER ALGORITHM</div>
              <div>s_vocoded[n] = \u2211 ( Env_k[n] \u00B7 Carrier_k[n] ) for k = 1 to N</div>
              <div style="font-size: 0.85rem; color: var(--charcoal-muted); margin-top: 0.35rem;">
                Env_k[n] is computed by half-wave rectifying bandpassed signal x_k[n] and lowpass filtering at 160 Hz.
              </div>
            </div>
          </div>

          <!-- Right: Interactive Channel Vocoder Console -->
          <div class="editorial-plate plate-sage" style="margin: 0;">
            <div class="kicker">INTERACTIVE DSP CONSOLE</div>
            <h3 style="margin-bottom: 0.75rem;">Cochlear Implant Audio Bench</h3>

            <!-- Audio Source Selector -->
            <div style="margin-bottom: 1.5rem;">
              <div style="font-size: 0.9rem; font-weight: 600; color: var(--forest); margin-bottom: 0.5rem;">
                Step 1: Choose Audio Source
              </div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button type="button" class="pill-btn sim-source-btn active" data-src="sample1">Sample 1: Quick Brown Fox</button>
                <button type="button" class="pill-btn sim-source-btn" data-src="sample2">Sample 2: Bioacoustics</button>
                <button type="button" class="pill-btn sim-source-btn" data-src="sample3">Sample 3: Ear Frequency</button>
                <button type="button" class="pill-btn sim-source-btn" id="btnRecordMic">Record Your Voice (3s)</button>
                <label class="pill-btn" style="cursor: pointer;">
                  Upload WAV/MP3
                  <input type="file" id="simFileInput" accept="audio/*" style="display: none;">
                </label>
              </div>
              <div id="simSourceNotice" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--charcoal-muted); margin-top: 0.4rem;">
                Loaded: Built-in 16 kHz Speech Sentence (Sample 1)
              </div>
            </div>

            <!-- Channel Count Slider -->
            <div class="slider-row">
              <div class="slider-label">
                <span>Number of Spectral Channels ($N$)</span>
                <span class="slider-val" id="simChannelsVal">8 Channels (Standard Speech)</span>
              </div>
              <input type="range" id="simChannelsSlider" min="1" max="32" step="1" value="8" aria-label="Number of vocoder channels">
              <div class="pill-group">
                <button type="button" class="pill-btn sim-chan-btn" data-ch="1">1 Ch (Monotone)</button>
                <button type="button" class="pill-btn sim-chan-btn" data-ch="4">4 Ch (Rough)</button>
                <button type="button" class="pill-btn sim-chan-btn active" data-ch="8">8 Ch (Intelligible)</button>
                <button type="button" class="pill-btn sim-chan-btn" data-ch="16">16 Ch (Crisp)</button>
                <button type="button" class="pill-btn sim-chan-btn" data-ch="24">24 Ch (Fine)</button>
              </div>
            </div>

            <!-- Carrier Mode -->
            <div style="margin-bottom: 1.25rem; display: flex; align-items: center; gap: 1.25rem;">
              <span style="font-size: 0.9rem; font-weight: 600; color: var(--forest);">Carrier Mode:</span>
              <label style="font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                <input type="radio" name="simCarrier" id="carrierNoise" value="noise" checked> Band-limited Noise (Shannon)
              </label>
              <label style="font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                <input type="radio" name="simCarrier" id="carrierSine" value="sine"> Sine Wave Center (Loizou)
              </label>
            </div>

            <!-- Background Noise Slider -->
            <div class="slider-row">
              <div class="slider-label">
                <span>Background Acoustic Noise</span>
                <span class="slider-val" id="simBgNoiseVal">0% (Quiet Room)</span>
              </div>
              <input type="range" id="simBgNoiseSlider" min="0" max="50" step="5" value="0" aria-label="Background noise ratio">
            </div>

            <!-- Playback & AB Toggle Engine -->
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; margin-bottom: 1.25rem;">
              <button type="button" class="btn btn-forest" id="btnPlaySim" style="flex: 1.2;">
                Play Audio
              </button>
              <button type="button" class="btn btn-clay" id="btnToggleMode" style="flex: 1;">
                Hearing: Simulated Implant
              </button>
            </div>

            <!-- Audio Scrubber -->
            <div>
              <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem; color: var(--charcoal-muted); margin-bottom: 0.25rem;">
                <span>PLAYBACK SCRUBBER</span>
                <span id="simPlaybackTime">0.00s / 0.00s</span>
              </div>
              <input type="range" id="simScrubber" min="0" max="100" value="0" step="0.5" style="height: 4px;">
            </div>
          </div>
        </div>

        <!-- Dual Synchronized Spectrogram Canvases -->
        <div class="editorial-plate" style="margin-top: 3rem; background: var(--white);">
          <div class="kicker">SPECTRO-TEMPORAL COMPARISON</div>
          <h3>Fig. 7.2: Side-by-Side Spectrogram Analysis</h3>
          <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">
            Compare the full-frequency acoustic input against the discretized channel vocoder output. Notice how fine harmonic lines in the vowels smear into broad bands of modulated energy.
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <div>
              <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 600; color: var(--forest); margin-bottom: 0.35rem;">
                <span>ORIGINAL ACOUSTIC SPECTROGRAM (0 - 8 kHz)</span>
                <span>Continuous Formants</span>
              </div>
              <canvas id="specOrigCanvas" class="resonance-canvas" height="150" style="height: 150px;"></canvas>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 600; color: var(--clay); margin-bottom: 0.35rem;">
                <span>SIMULATED IMPLANT SPECTROGRAM</span>
                <span id="simSpecLabel">8 Discretized Channels</span>
              </div>
              <canvas id="specSimCanvas" class="resonance-canvas" height="150" style="height: 150px;"></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 8: THE EXPERIMENT
         ==================================================================== -->
    <section id="experiment" class="bg-stone">
      <div class="container">
        <div class="kicker">PSYCHOACOUSTIC BENCHMARK</div>
        <h2>How Many Channels Are Sufficient for Speech?</h2>
        <p class="lead">
          In 1995, Robert Shannon and colleagues published a landmark paper in <em>Science</em> showing that humans can comprehend speech with remarkably few spectral channels. Take this 4-round listening trial to test your own auditory brain.
        </p>

        <div class="editorial-split" style="margin-top: 3rem; align-items: flex-start;">
          <!-- Left: Trial Participant Photo and Current Spread Explanation -->
          <div>
            <div class="photo-frame">
              <span class="photo-badge">PSYCHOACOUSTIC TRIAL</span>
              <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Adult subject participating in an auditory listening and speech comprehension trial" style="max-height: 280px;" />
              <div class="caption">
                <strong>Fig. 8.1:</strong> Psychoacoustic sentence comprehension testing. Human speech comprehension depends heavily on temporal envelope cues \u2014 the slow fluctuations in overall energy (&lt; 50 Hz) that trace syllables and rhythm.
              </div>
            </div>

            <!-- Current Spread Physical Explanation -->
            <div style="margin-top: 1.5rem; background: var(--white); border: 1px solid var(--border); padding: 1.5rem; border-radius: 4px;">
              <div class="kicker">PHYSICS OF THE BIOLOGICAL BOTTLENECK</div>
              <h4 style="color: var(--forest); margin-bottom: 0.5rem;">Why More Channels Bring Diminishing Returns</h4>
              <p style="font-size: 0.95rem; margin-bottom: 0.75rem;">
                Modern implants have 12 to 24 physical electrode rings. Why not 1,000 electrodes to match the 3,500 biological hair cells?
              </p>
              <p style="font-size: 0.95rem; margin-bottom: 0.75rem;">
                The answer is <strong>electrical current spread</strong> in an electrolyte fluid. The cochlea's scala tympani is filled with saline perilymph ($\sigma \approx 1.4\text{ S/m}$), which is an excellent electrical conductor. When an electrode contact injects current, the electrical field spreads widely like water from a lawn sprinkler.
              </p>
              <p style="font-size: 0.95rem; margin-bottom: 0;">
                Activating adjacent electrodes stimulates overlapping populations of spiral ganglion neurons (<em>channel crosstalk</em>). Beyond 8 to 10 effective independent channels, additional electrodes provide little extra speech intelligibility in quiet.
              </p>
            </div>
          </div>

          <!-- Right: Interactive 4-Round Listening Test -->
          <div class="editorial-plate" style="margin: 0; background: var(--white);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
              <div class="kicker">INTERACTIVE CLINICAL TRIAL</div>
              <span id="expRoundBadge" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--clay); font-weight: 600;">ROUND 1 OF 4</span>
            </div>
            <h3 id="expRoundTitle" style="margin-bottom: 0.5rem;">Round 1: 2 Channels (High Spectral Smear)</h3>
            <p id="expRoundDesc" style="font-size: 0.95rem; margin-bottom: 1.25rem;">
              Press the button below to listen to the vocoded sentence processed through only 2 spectral channels. Can you decipher the spoken words?
            </p>

            <div style="margin-bottom: 1.5rem;">
              <button type="button" class="btn btn-forest" id="btnPlayRound" style="width: 100%;">
                Play Round Sentence Audio
              </button>
            </div>

            <!-- Multiple Choice Options -->
            <div style="margin-bottom: 1.5rem;">
              <div style="font-size: 0.9rem; font-weight: 600; color: var(--forest); margin-bottom: 0.5rem;">
                What sentence did you hear?
              </div>
              <div id="expOptionsContainer" style="display: flex; flex-direction: column; gap: 0.6rem;">
                <!-- Dynamically populated options -->
              </div>
            </div>

            <div id="expFeedback" style="display: none; padding: 1rem; border-radius: 4px; margin-bottom: 1.25rem; font-size: 0.95rem;">
              <!-- Feedback text -->
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <button type="button" class="btn btn-outline btn-sm" id="btnNextRound" style="display: none;">
                Proceed to Next Round
              </button>
              <span id="expScoreTally" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--charcoal-muted);">
                Trial Score: 0 / 4
              </span>
            </div>
          </div>
        </div>

        <!-- Live Results Chart vs Shannon (1995) Curve -->
        <div class="editorial-plate" style="margin-top: 3rem; background: var(--white);">
          <div class="kicker">PSYCHOACOUSTIC BENCHMARK PLOT</div>
          <h3>Fig. 8.2: Your Comprehension vs. Shannon et al. (1995) Data</h3>
          <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">
            The solid forest-green curve illustrates empirical sentence intelligibility in quiet published in <em>Science</em>. Notice the steep sigmoid jump between 2 and 8 channels, followed by the asymptotic plateau.
          </p>

          <canvas id="expResultsCanvas" class="resonance-canvas" height="180" style="height: 180px;"></canvas>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 9: THE MUSIC CHALLENGE
         ==================================================================== -->
    <section id="music" class="bg-sage">
      <div class="container">
        <div class="kicker">SPECTRO-TEMPORAL DICHOTOMY</div>
        <h2>Why Music Is Harder Than Speech for Implant Users</h2>
        <p class="lead">
          While cochlear implant recipients routinely converse on the telephone and understand speech with 8 channels, listening to symphonic music or appreciating melody remains notoriously difficult. Why does an engineering marvel that restores conversation struggle with a simple melody?
        </p>

        <div class="editorial-split" style="margin-top: 3rem; align-items: flex-start;">
          <!-- Left: Acoustic Instrument Photos -->
          <div>
            <div class="photo-frame">
              <span class="photo-badge">HARMONIC ACOUSTICS</span>
              <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Violin strings vibrating, illustrating physical harmonic overtones and exact fundamental frequency pitch" style="max-height: 280px;" />
              <div class="caption">
                <strong>Fig. 9.1:</strong> String vibration and acoustic overtones. Musical pitch is defined by the fundamental frequency ($f_0$) and integer harmonics ($2f_0, 3f_0, 4f_0$). Discriminating two adjacent semitones requires resolving a ~6% change in frequency ($\approx 1\text{--}2\text{ Hz}$ at low pitches).
              </div>
            </div>

            <!-- Envelope vs Fine Structure Box -->
            <div style="margin-top: 1.5rem; background: var(--white); border: 1px solid var(--border); padding: 1.5rem; border-radius: 4px;">
              <div class="kicker">PHYSICAL CONTRAST</div>
              <h4 style="color: var(--forest); margin-bottom: 0.5rem;">Temporal Envelope vs. Fine Spectral Structure</h4>
              <p style="font-size: 0.95rem; margin-bottom: 0.75rem;">
                <strong>Speech is an envelope task:</strong> You can recognize vowels and consonants by their gross rhythm, energy bursts, and broad formant bands. An 8-channel vocoder conveys these temporal contours with high fidelity.
              </p>
              <p style="font-size: 0.95rem; margin-bottom: 0;">
                <strong>Music is a fine-structure task:</strong> Harmony, timbre, and melodic pitch require fine frequency discrimination across 3,500 biological inner hair cells. When 22 electrical electrodes stimulate overlapping nerve bundles, individual musical notes collapse into rhythmic percussion without clear pitch.
              </p>
            </div>
          </div>

          <!-- Right: Interactive Melody Guessing Game -->
          <div class="editorial-plate" style="margin: 0; background: var(--white);">
            <div class="kicker">INTERACTIVE MELODY BENCH</div>
            <h3 style="margin-bottom: 0.75rem;">The Melody Identification Challenge</h3>
            <p style="font-size: 0.95rem; margin-bottom: 1.25rem;">
              Can you identify a famous melody when its fine pitch structure is stripped away by channel vocoding? Select a song and channel count, listen, and guess.
            </p>

            <!-- Song Selector -->
            <div style="margin-bottom: 1.25rem;">
              <div style="font-size: 0.9rem; font-weight: 600; color: var(--forest); margin-bottom: 0.4rem;">
                Step 1: Select Melody
              </div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button type="button" class="pill-btn music-song-btn active" data-song="joy">Melody A</button>
                <button type="button" class="pill-btn music-song-btn" data-song="twinkle">Melody B</button>
                <button type="button" class="pill-btn music-song-btn" data-song="birthday">Melody C</button>
              </div>
            </div>

            <!-- Channel Setting -->
            <div style="margin-bottom: 1.25rem;">
              <div style="font-size: 0.9rem; font-weight: 600; color: var(--forest); margin-bottom: 0.4rem;">
                Step 2: Choose Implant Resolution
              </div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button type="button" class="pill-btn music-chan-btn active" data-ch="4">4 Channels (Heavy Smear)</button>
                <button type="button" class="pill-btn music-chan-btn" data-ch="8">8 Channels (Standard)</button>
                <button type="button" class="pill-btn music-chan-btn" data-ch="16">16 Channels (Expanded)</button>
                <button type="button" class="pill-btn music-chan-btn" data-ch="0">Original Pure Tone</button>
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <button type="button" class="btn btn-forest" id="btnPlayMusic" style="width: 100%;">
                Play Melody Audio
              </button>
            </div>

            <!-- Guess Buttons -->
            <div style="margin-bottom: 1.25rem;">
              <div style="font-size: 0.9rem; font-weight: 600; color: var(--forest); margin-bottom: 0.5rem;">
                Step 3: What is the melody?
              </div>
              <div style="display: grid; grid-template-columns: 1fr; gap: 0.6rem;">
                <button type="button" class="pill-btn music-guess-btn" data-guess="joy">Beethoven: Ode to Joy (Symphony No. 9)</button>
                <button type="button" class="pill-btn music-guess-btn" data-guess="twinkle">Mozart: Twinkle Twinkle Little Star</button>
                <button type="button" class="pill-btn music-guess-btn" data-guess="birthday">Traditional: Happy Birthday to You</button>
              </div>
            </div>

            <!-- Guess Result Feedback Card -->
            <div id="musicFeedback" style="display: none; padding: 1rem; border-radius: 4px; font-size: 0.95rem;">
              <!-- Dynamic Feedback -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 10: KEY TAKEAWAYS, SCHOLARLY LITERATURE & CREDITS
         ==================================================================== -->
    <section id="takeaways" class="bg-ivory">
      <div class="container">
        <div class="kicker">SYNTHESIS &amp; SCHOLARLY SOURCES</div>
        <h2>Key Takeaways, Literature, and Credits</h2>
        <p class="lead">
          The human ear and the cochlear implant represent two extraordinary solutions to the physics of acoustics and neurobiology.
        </p>

        <!-- 3 Core Physical Takeaways -->
        <div class="editorial-grid-3" style="margin-top: 2.5rem;">
          <div class="editorial-card card-border-top">
            <div class="kicker">PHYSICAL PRINCIPLE 01</div>
            <h3 style="font-size: 1.3rem;">Impedance Matching</h3>
            <p style="font-size: 0.95rem;">
              The middle ear's ossicular chain concentrates atmospheric wave force across a 17:1 area ratio and 1.3:1 lever advantage, achieving a 22-fold pressure gain that overcomes a 99.9% energy reflection barrier at the air-fluid cochlear boundary.
            </p>
          </div>

          <div class="editorial-card card-border-top">
            <div class="kicker">PHYSICAL PRINCIPLE 02</div>
            <h3 style="font-size: 1.3rem;">Tonotopic Dispersion</h3>
            <p style="font-size: 0.95rem;">
              The cochlea performs spatial mechanical Fourier analysis. The narrow, taut base resonates to high frequencies up to 20,000 Hz, while the wide, compliant apex resonates to low frequencies down to 20 Hz, mapping frequency along 32 mm of neural space.
            </p>
          </div>

          <div class="editorial-card card-clay-top">
            <div class="kicker">PHYSICAL PRINCIPLE 03</div>
            <h3 style="font-size: 1.3rem;">Current Spread &amp; Vocoding</h3>
            <p style="font-size: 0.95rem;">
              Speech intelligibility relies on slow temporal envelope modulations (&lt; 50 Hz), which are intelligible with only 8 spectral channels. However, electrical current spread in conductive perilymph fluid limits pitch resolution, making music and noisy rooms challenging.
            </p>
          </div>
        </div>

        <!-- Scholarly Literature & Bibliographic Citations -->
        <div class="editorial-plate" style="margin-top: 3rem; background: var(--white);">
          <div class="kicker">SCHOLARLY BIBLIOGRAPHY</div>
          <h3>Curated Scientific Literature</h3>
          <ul style="list-style: none; margin-top: 1.25rem; font-size: 0.95rem;">
            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--border);">
              <strong>Shannon, R. V., Zeng, F. G., Kamath, V., Wygonski, J., &amp; Ekelid, M. (1995).</strong> Speech recognition with primarily temporal cues. <em>Science</em>, 270(5234), 303\u2013304.
            </li>
            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--border);">
              <strong>von B\u00E9k\u00E9sy, G. (1960).</strong> <em>Experiments in Hearing</em>. McGraw-Hill. (Recipient of the 1961 Nobel Prize in Physiology or Medicine).
            </li>
            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--border);">
              <strong>Greenwood, D. D. (1990).</strong> A cochlear frequency-position function for several species\u201429 years later. <em>The Journal of the Acoustical Society of America</em>, 87(6), 2592\u20132605.
            </li>
            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--border);">
              <strong>Wilson, B. S., &amp; Dorman, M. F. (2008).</strong> Cochlear implants: current designs and future possibilities. <em>Physics in Medicine &amp; Biology</em>, 53(19), R115\u2013R182.
            </li>
            <li style="padding: 0.75rem 0;">
              <strong>Loizou, P. C. (1999).</strong> Introduction to cochlear implants. <em>IEEE Signal Processing Magazine</em>, 16(5), 101\u2013110.
            </li>
          </ul>
        </div>

        <!-- High-School Project Colophon & Credits -->
        <div style="margin-top: 3rem; border-top: 1px solid var(--border); padding-top: 2rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; font-size: 0.9rem; color: var(--charcoal-muted);">
          <div>
            <div style="font-family: var(--font-display); font-size: 1.2rem; color: var(--forest); font-weight: 600;">RESONANCE</div>
            <div>A High-School Physics &amp; Bioacoustics Research Exhibition \u00B7 2026</div>
            <div>Designed with pure HTML5, CSS3, Web Audio API DSP, and HTML Canvas.</div>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.8rem;">
            <div>RESEARCH TEAM:</div>
            <div>Maya Lin \u00B7 Acoustic Wave Dynamics &amp; Impedance Modeling</div>
            <div>Julian Vance \u00B7 Tonotopic Cochlear Biomechanics</div>
            <div>Elena Rostova \u00B7 Neuroprosthetic Channel Vocoder DSP</div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Live Caption Floating Bar for Audio Accessibility -->
  <aside id="liveCaptionBar" class="live-caption-bar" aria-live="polite">
    <!-- Spoken caption appears here dynamically -->
  </aside>

  <script>
  // Inlined Speech Audio Bundle
  const EMBEDDED_SPEECH = ${JSON.stringify(speechBundle)};
  
  // Client JavaScript Code
  ${getClientScript()}
  </script>
</body>
</html>
`;
}

console.log('HTML generator defined.');

// ----------------------------------------------------------------------------
// CLIENT JAVASCRIPT ENGINE
// ----------------------------------------------------------------------------

function getClientScript() {
  return `
// Global Audio & UI State
let audioCtx = null;
let isAudioInitialized = false;

// Audio Context Getter with User-Gesture Activation
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass({ sampleRate: 16000 });
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  updateAudioPill(true);
  return audioCtx;
}

function updateAudioPill(active) {
  const dot = document.getElementById('audioStatusDot');
  const text = document.getElementById('audioStatusText');
  if (dot && text) {
    if (active) {
      dot.classList.add('active');
      text.textContent = 'DSP Active (16 kHz)';
    } else {
      dot.classList.remove('active');
      text.textContent = 'DSP Ready';
    }
  }
}

// Live Caption Bar Display
let captionTimer = null;
function showCaption(text, durationMs = 4000) {
  const bar = document.getElementById('liveCaptionBar');
  if (!bar) return;
  bar.textContent = text;
  bar.classList.add('visible');
  if (captionTimer) clearTimeout(captionTimer);
  captionTimer = setTimeout(() => {
    bar.classList.remove('visible');
  }, durationMs);
}

// Base64 WAV Decoder
async function decodeBase64Wav(b64String, ctx) {
  const byteChars = atob(b64String.split(',')[1] || b64String);
  const byteNumbers = new Uint8Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  return await ctx.decodeAudioData(byteNumbers.buffer);
}

// ----------------------------------------------------------------------------
// BIQUAD FILTER & CHANNEL VOCODER DSP ENGINE
// ----------------------------------------------------------------------------
class BiquadFilter {
  constructor(b0, b1, b2, a1, a2) {
    this.b0 = b0; this.b1 = b1; this.b2 = b2;
    this.a1 = a1; this.a2 = a2;
    this.x1 = 0; this.x2 = 0;
    this.y1 = 0; this.y2 = 0;
  }
  reset() {
    this.x1 = 0; this.x2 = 0;
    this.y1 = 0; this.y2 = 0;
  }
  process(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1;
    this.x1 = x;
    this.y2 = this.y1;
    this.y1 = y;
    return y;
  }
}

function designLowpass(fc, fs, Q = 0.7071) {
  const w0 = 2 * Math.PI * fc / fs;
  const alpha = Math.sin(w0) / (2 * Q);
  const cosw = Math.cos(w0);
  const a0 = 1 + alpha;
  return new BiquadFilter(
    ((1 - cosw) / 2) / a0,
    (1 - cosw) / a0,
    ((1 - cosw) / 2) / a0,
    (-2 * cosw) / a0,
    (1 - alpha) / a0
  );
}

function designHighpass(fc, fs, Q = 0.7071) {
  const w0 = 2 * Math.PI * fc / fs;
  const alpha = Math.sin(w0) / (2 * Q);
  const cosw = Math.cos(w0);
  const a0 = 1 + alpha;
  return new BiquadFilter(
    ((1 + cosw) / 2) / a0,
    (-(1 + cosw)) / a0,
    ((1 + cosw) / 2) / a0,
    (-2 * cosw) / a0,
    (1 - alpha) / a0
  );
}

function designBandpass(fLow, fHigh, fs) {
  const hp = designHighpass(fLow, fs, 0.7071);
  const lp = designLowpass(fHigh, fs, 0.7071);
  return {
    reset() { hp.reset(); lp.reset(); },
    process(x) { return lp.process(hp.process(x)); }
  };
}

// Shannon / Loizou Channel Vocoder
function runChannelVocoder(inputSamples, sampleRate, numChannels, bgNoiseRatio = 0, carrierMode = 'noise') {
  const N = inputSamples.length;
  const fMin = 150;
  const fMax = Math.min(7500, sampleRate * 0.45);

  // Greenwood tonotopic logarithmic band edges
  const edges = [];
  for (let i = 0; i <= numChannels; i++) {
    edges.push(fMin * Math.pow(fMax / fMin, i / numChannels));
  }

  // Pre-generate noise or sine carriers
  const whiteNoise = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    whiteNoise[i] = (Math.random() * 2 - 1);
  }

  const output = new Float32Array(N);

  for (let ch = 0; ch < numChannels; ch++) {
    const fLow = edges[ch];
    const fHigh = edges[ch + 1];
    const fCenter = Math.sqrt(fLow * fHigh);

    // Analysis bandpass filter
    const analysisFilter = designBandpass(fLow, fHigh, sampleRate);
    // Envelope extractor: full-wave rectification + 160 Hz low-pass filter
    const envFilter = designLowpass(160, sampleRate, 0.7071);
    // Synthesis filter for noise carrier
    const synthFilter = carrierMode === 'noise' ? designBandpass(fLow, fHigh, sampleRate) : null;

    const twoPiFc = 2 * Math.PI * fCenter / sampleRate;

    for (let i = 0; i < N; i++) {
      const bandSignal = analysisFilter.process(inputSamples[i]);
      const rectified = Math.abs(bandSignal);
      const envelope = Math.max(0, envFilter.process(rectified));

      let carrier = 0;
      if (carrierMode === 'sine') {
        carrier = Math.sin(twoPiFc * i);
      } else {
        carrier = synthFilter.process(whiteNoise[i]);
      }

      output[i] += envelope * carrier;
    }
  }

  // Energy matching
  let inRms = 0;
  let outRms = 0;
  for (let i = 0; i < N; i++) {
    inRms += inputSamples[i] * inputSamples[i];
    outRms += output[i] * output[i];
  }
  inRms = Math.sqrt(inRms / N);
  outRms = Math.sqrt(outRms / N);

  const gain = outRms > 1e-6 ? (inRms / outRms) : 1.0;

  for (let i = 0; i < N; i++) {
    let s = output[i] * gain;
    if (bgNoiseRatio > 0) {
      s = s * (1 - bgNoiseRatio * 0.5) + (Math.random() * 2 - 1) * inRms * bgNoiseRatio * 0.8;
    }
    output[i] = Math.max(-0.98, Math.min(0.98, s));
  }

  return output;
}

// ----------------------------------------------------------------------------
// SECTION 1: HERO SOUNDWAVE STRIP
// ----------------------------------------------------------------------------
function initHeroWave() {
  const canvas = document.getElementById('heroWaveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let phase = 0;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
  }
  window.addEventListener('resize', resize);
  resize();

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '${C.ivory}';
    ctx.fillRect(0, 0, w, h);

    // Centerline
    ctx.strokeStyle = '${C.border}';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // Ambient traveling wave
    ctx.strokeStyle = '${C.forest}';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const k1 = 0.02;
      const k2 = 0.05;
      const y = h / 2 + Math.sin(x * k1 + phase) * 16 + Math.sin(x * k2 - phase * 1.5) * 6;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    phase += 0.04;
    requestAnimationFrame(draw);
  }
  draw();
}

// ----------------------------------------------------------------------------
// SECTION 2: WAVEFORM STUDIO & MICROPHONE FFT
// ----------------------------------------------------------------------------
let toneOscNode = null;
let toneGainNode = null;
let isTonePlaying = false;
let micStream = null;
let micAnalyser = null;
let isMicActive = false;

function initWaveStudio() {
  const freqSlider = document.getElementById('waveFreqSlider');
  const freqVal = document.getElementById('waveFreqVal');
  const ampSlider = document.getElementById('waveAmpSlider');
  const ampVal = document.getElementById('waveAmpVal');
  const periodReadout = document.getElementById('wavePeriodReadout');
  const btnToggleTone = document.getElementById('btnToggleTone');
  const btnToggleMic = document.getElementById('btnToggleMic');
  const oscCanvas = document.getElementById('oscilloscopeCanvas');
  const specCanvas = document.getElementById('spectrogramCanvas');

  function updateWaveLabels() {
    const f = parseFloat(freqSlider.value);
    const a = parseFloat(ampSlider.value);
    freqVal.textContent = f + ' Hz';
    const dB = a > 0 ? (20 * Math.log10(a / 100)).toFixed(1) : '-inf';
    ampVal.textContent = a + '% (' + dB + ' dBFS)';
    const periodMs = (1000 / f).toFixed(2);
    const wavelengthCm = (34300 / f).toFixed(1);
    periodReadout.textContent = 'T = ' + periodMs + ' ms \u00B7 \u03BB = ' + wavelengthCm + ' cm';

    if (toneOscNode && isTonePlaying) {
      toneOscNode.frequency.setValueAtTime(f, audioCtx.currentTime);
      toneGainNode.gain.setValueAtTime(a / 100 * 0.3, audioCtx.currentTime);
    }
  }

  freqSlider.addEventListener('input', updateWaveLabels);
  ampSlider.addEventListener('input', updateWaveLabels);

  document.querySelectorAll('.wave-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wave-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      freqSlider.value = btn.dataset.freq;
      updateWaveLabels();
    });
  });

  // Tone toggle
  btnToggleTone.addEventListener('click', () => {
    const ctx = getAudioContext();
    if (!isTonePlaying) {
      toneOscNode = ctx.createOscillator();
      toneGainNode = ctx.createGain();
      
      const isHarmonic = document.getElementById('waveTypeHarmonic').checked;
      if (isHarmonic) {
        // Construct harmonic periodic wave for vowel-like timbre
        const real = new Float32Array([0, 1.0, 0.6, 0.4, 0.25, 0.15]);
        const imag = new Float32Array(real.length);
        const wave = ctx.createPeriodicWave(real, imag);
        toneOscNode.setPeriodicWave(wave);
      } else {
        toneOscNode.type = 'sine';
      }

      toneOscNode.frequency.setValueAtTime(parseFloat(freqSlider.value), ctx.currentTime);
      toneGainNode.gain.setValueAtTime(parseFloat(ampSlider.value) / 100 * 0.3, ctx.currentTime);
      toneOscNode.connect(toneGainNode);
      toneGainNode.connect(ctx.destination);
      toneOscNode.start();
      isTonePlaying = true;
      btnToggleTone.textContent = 'Mute Acoustic Tone';
      btnToggleTone.classList.add('btn-clay');
      btnToggleTone.classList.remove('btn-forest');
    } else {
      if (toneOscNode) {
        toneOscNode.stop();
        toneOscNode.disconnect();
      }
      isTonePlaying = false;
      btnToggleTone.textContent = 'Play Acoustic Tone';
      btnToggleTone.classList.remove('btn-clay');
      btnToggleTone.classList.add('btn-forest');
    }
  });

  // Mic Toggle
  btnToggleMic.addEventListener('click', async () => {
    const statusText = document.getElementById('micStatusText');
    const fallbackMsg = document.getElementById('micFallbackMsg');
    const ctx = getAudioContext();

    if (!isMicActive) {
      try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = ctx.createMediaStreamSource(micStream);
        micAnalyser = ctx.createAnalyser();
        micAnalyser.fftSize = 512;
        source.connect(micAnalyser);
        isMicActive = true;
        btnToggleMic.textContent = 'Stop Microphone Live FFT';
        btnToggleMic.classList.add('btn-clay');
        statusText.textContent = 'Microphone: Active (Capturing Audio)';
        fallbackMsg.style.display = 'none';
      } catch (err) {
        console.warn('Microphone access denied or unavailable', err);
        fallbackMsg.style.display = 'block';
        statusText.textContent = 'Microphone: Unavailable (Fallback Mode)';
      }
    } else {
      if (micStream) {
        micStream.getTracks().forEach(t => t.stop());
      }
      isMicActive = false;
      btnToggleMic.textContent = 'Start Microphone Live FFT';
      btnToggleMic.classList.remove('btn-clay');
      statusText.textContent = 'Microphone: Standby';
    }
  });

  // Oscilloscope render loop
  const oscCtx = oscCanvas.getContext('2d');
  let oscPhase = 0;
  function renderOscilloscope() {
    const w = oscCanvas.width = oscCanvas.parentElement.clientWidth;
    const h = oscCanvas.height = 110;

    oscCtx.fillStyle = '${C.ivory}';
    oscCtx.fillRect(0, 0, w, h);

    // Calibrated Grid
    oscCtx.strokeStyle = '${C.border}';
    oscCtx.lineWidth = 1;
    oscCtx.setLineDash([2, 2]);
    oscCtx.beginPath();
    oscCtx.moveTo(0, h / 2); oscCtx.lineTo(w, h / 2);
    for (let x = 50; x < w; x += 50) {
      oscCtx.moveTo(x, 0); oscCtx.lineTo(x, h);
    }
    oscCtx.stroke();
    oscCtx.setLineDash([]);

    // Pressure wave
    const f = parseFloat(freqSlider.value);
    const amp = parseFloat(ampSlider.value) / 100;
    const isHarmonic = document.getElementById('waveTypeHarmonic').checked;

    oscCtx.strokeStyle = '${C.forest}';
    oscCtx.lineWidth = 2;
    oscCtx.beginPath();
    const spatialCycles = (f / 100) * (w / 400);

    for (let x = 0; x < w; x++) {
      const angle = (x / w) * spatialCycles * 2 * Math.PI - oscPhase;
      let val = Math.sin(angle);
      if (isHarmonic) {
        val = 0.7 * Math.sin(angle) + 0.3 * Math.sin(2 * angle) + 0.15 * Math.sin(3 * angle);
      }
      const y = h / 2 - val * amp * (h * 0.38);
      if (x === 0) oscCtx.moveTo(x, y);
      else oscCtx.lineTo(x, y);
    }
    oscCtx.stroke();

    oscPhase += 0.05;
    requestAnimationFrame(renderOscilloscope);
  }
  renderOscilloscope();

  // Spectrogram waterfall loop
  const specCtx = specCanvas.getContext('2d');
  const waterfallHistory = [];
  function renderSpectrogramWaterfall() {
    const w = specCanvas.width = specCanvas.parentElement.clientWidth;
    const h = specCanvas.height = 110;

    let bins = new Uint8Array(128);
    if (isMicActive && micAnalyser) {
      const freqData = new Uint8Array(micAnalyser.frequencyBinCount);
      micAnalyser.getByteFrequencyData(freqData);
      for (let i = 0; i < 128; i++) {
        bins[i] = freqData[i];
      }
    } else {
      // Ambient synthetic spectrum
      const f = parseFloat(freqSlider.value);
      const amp = parseFloat(ampSlider.value) / 100;
      const targetBin = Math.min(127, Math.floor((f / 4000) * 128));
      for (let i = 0; i < 128; i++) {
        const dist = Math.abs(i - targetBin);
        const peak = isTonePlaying ? Math.max(0, 255 * amp * Math.exp(-dist * 0.4)) : 0;
        bins[i] = Math.min(255, peak + Math.random() * 15);
      }
    }

    waterfallHistory.unshift(bins);
    if (waterfallHistory.length > h) waterfallHistory.pop();

    specCtx.fillStyle = '${C.ivory}';
    specCtx.fillRect(0, 0, w, h);

    const binWidth = w / 128;
    for (let row = 0; row < waterfallHistory.length; row++) {
      const rowBins = waterfallHistory[row];
      for (let col = 0; col < 128; col++) {
        const v = rowBins[col] / 255;
        if (v > 0.05) {
          // Warm forest to terracotta color map (NO GRADIENT, solid filled pixels)
          if (v > 0.6) {
            specCtx.fillStyle = '${C.clay}';
          } else if (v > 0.3) {
            specCtx.fillStyle = '${C.forest}';
          } else {
            specCtx.fillStyle = '${C.tealMuted}';
          }
          specCtx.fillRect(col * binWidth, row, binWidth + 0.5, 1.2);
        }
      }
    }

    requestAnimationFrame(renderSpectrogramWaterfall);
  }
  renderSpectrogramWaterfall();
}

// ----------------------------------------------------------------------------
// SECTION 3: THE EAR AS A MACHINE (ANATOMY & IMPEDANCE CANVAS)
// ----------------------------------------------------------------------------
const EAR_PARTS_INFO = {
  pinna: {
    name: 'Pinna (Auricle)',
    role: 'STAGE I: ACOUSTIC COLLECTOR & DIRECTIONAL FILTER',
    desc: 'The cartilaginous outer funnel. Its complex folds act as a spatial filter, boosting frequencies between 2 and 5 kHz by up to 5 dB and introducing elevation-dependent spectral notches that allow the brain to localize sound sources.'
  },
  canal: {
    name: 'External Auditory Canal (Meatus)',
    role: 'STAGE I: QUARTER-WAVELENGTH ACOUSTIC RESONATOR',
    desc: 'An air-filled tube ~27 mm long, closed at one end by the eardrum. It functions as an acoustic quarter-wavelength (\u03BB/4) resonator with a peak resonance at f = v / (4L) \u2248 343 / (4 \u00D7 0.027) \u2248 3,100 Hz, granting high sensitivity to human speech consonants.'
  },
  eardrum: {
    name: 'Tympanic Membrane (Eardrum)',
    role: 'STAGE II: ACOUSTIC-MECHANICAL TRANSDUCTION DIAPHRAGM',
    desc: 'A thin, fibrous membrane with an effective surface area of 55 mm\u00B2. It intercepts oscillating atmospheric pressure waves and converts them into mechanical displacement of the attached malleus handle.'
  },
  malleus: {
    name: 'Malleus (Hammer)',
    role: 'STAGE II: OSSICULAR LEVER ARM (LONG)',
    desc: 'The first middle-ear bone. Its manubrium is fused to the eardrum. It pivots about a rotational axis, transferring force to the incus with a 1.3:1 mechanical lever advantage.'
  },
  incus: {
    name: 'Incus (Anvil)',
    role: 'STAGE II: INTERMEDIATE ARTICULATION & TRANSMISSION',
    desc: 'Suspended in the middle ear cavity by delicate ligaments. Its short process provides the fulcrum for the ossicular lever, transferring kinetic momentum directly to the stapes head.'
  },
  stapes: {
    name: 'Stapes (Stirrup) & Oval Window',
    role: 'STAGE II: HYDRAULIC PRESSURE CONCENTRATOR (17:1 RATIO)',
    desc: 'The smallest bone in the human body. Its footplate measures just 3.2 mm\u00B2, fitting into the oval window of the cochlea. Concentrating force from the 55 mm\u00B2 eardrum onto 3.2 mm\u00B2 yields a 17.2-fold hydraulic pressure boost.'
  },
  cochlea: {
    name: 'Cochlea (Perilymph & Endolymph Spiral)',
    role: 'STAGE III: TONOTOPIC DISPERSION & MECHANO-ELECTRICAL TRANSDUCTION',
    desc: 'A fluid-filled bony spiral of 2.75 turns. Because cochlear perilymph fluid has a high acoustic impedance (Z \u2248 1.5\u00D710\u2076 Pa\u00B7s/m), the 22x middle ear pressure transformer is required to drive fluid traveling waves along its 32 mm basilar membrane.'
  },
  nerve: {
    name: 'Auditory Nerve (Cranial Nerve VIII)',
    role: 'STAGE IV: NEURAL ACTION POTENTIAL TRANSMISSION',
    desc: 'Composed of ~30,000 spiral ganglion bipolar neuron axons. It carries tonotopically organized action potential spike trains to the cochlear nucleus in the brainstem and up to the primary auditory cortex in the temporal lobe.'
  }
};

let impMode = 'lever'; // 'lever' or 'direct'

function initEarMachine() {
  document.querySelectorAll('.ear-part').forEach(elem => {
    elem.addEventListener('click', () => {
      const partKey = elem.dataset.part;
      const data = EAR_PARTS_INFO[partKey];
      if (!data) return;

      document.querySelectorAll('.ear-part').forEach(el => el.classList.remove('active'));
      elem.classList.add('active');

      document.getElementById('earPartName').textContent = data.name;
      document.getElementById('earPartRole').textContent = data.role;
      document.getElementById('earPartPhysics').textContent = data.desc;
    });
  });

  // Impedance simulation canvas
  const canvas = document.getElementById('impedanceCanvas');
  const btnLever = document.getElementById('btnImpLever');
  const btnDirect = document.getElementById('btnImpDirect');
  const telemetry = document.getElementById('impTelemetry');

  btnLever.addEventListener('click', () => {
    impMode = 'lever';
    btnLever.classList.add('btn-forest');
    btnLever.classList.remove('btn-outline');
    btnDirect.classList.remove('btn-forest');
    btnDirect.classList.add('btn-outline');
    telemetry.textContent = 'Mode: 22\u00D7 Hydraulic Lever \u00B7 Transmission: ~60% (-2.2 dB)';
  });

  btnDirect.addEventListener('click', () => {
    impMode = 'direct';
    btnDirect.classList.add('btn-forest');
    btnDirect.classList.remove('btn-outline');
    btnLever.classList.remove('btn-forest');
    btnLever.classList.add('btn-outline');
    telemetry.textContent = 'Mode: Direct Unassisted \u00B7 Reflection: 99.89% (-30 dB Loss)';
  });

  const ctx = canvas.getContext('2d');
  let waveTime = 0;

  function renderImpedanceCanvas() {
    const w = canvas.width = canvas.parentElement.clientWidth;
    const h = canvas.height = 140;
    const boundaryX = w * 0.5;

    ctx.fillStyle = '${C.ivory}';
    ctx.fillRect(0, 0, w, h);

    // Air side (left)
    ctx.fillStyle = '${C.white}';
    ctx.fillRect(0, 0, boundaryX, h);

    // Fluid side (right)
    ctx.fillStyle = '${C.sagePale}';
    ctx.fillRect(boundaryX, 0, w - boundaryX, h);

    // Boundary line
    ctx.strokeStyle = '${C.forest}';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(boundaryX, 0); ctx.lineTo(boundaryX, h);
    ctx.stroke();

    // Lever indicator at boundary
    if (impMode === 'lever') {
      const leverAngle = Math.sin(waveTime * 3) * 0.15;
      ctx.save();
      ctx.translate(boundaryX, h / 2);
      ctx.rotate(leverAngle);
      ctx.fillStyle = '${C.clay}';
      ctx.fillRect(-6, -35, 12, 70);
      ctx.restore();
    }

    // Wave in air (left side)
    ctx.strokeStyle = '${C.forest}';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x <= boundaryX; x++) {
      const k = 0.05;
      let y = h / 2;
      // Incident wave traveling right
      const incident = Math.sin(x * k - waveTime * 3) * 22;
      let reflected = 0;
      if (impMode === 'direct') {
        // 99.9% reflection traveling left
        reflected = Math.sin((boundaryX - (boundaryX - x)) * k + waveTime * 3) * 21.8;
      } else {
        // ~40% reflection
        reflected = Math.sin((boundaryX - (boundaryX - x)) * k + waveTime * 3) * 8.8;
      }
      y += (incident + reflected);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Wave in fluid (right side)
    ctx.strokeStyle = impMode === 'lever' ? '${C.clay}' : '${C.charcoalMuted}';
    ctx.lineWidth = impMode === 'lever' ? 2.5 : 1;
    ctx.beginPath();
    const fluidAmp = impMode === 'lever' ? 18 : 1.2;
    const kFluid = 0.02; // longer wavelength in fluid (v=1480 m/s)
    for (let x = boundaryX; x <= w; x++) {
      const dx = x - boundaryX;
      const y = h / 2 + Math.sin(dx * kFluid - waveTime * 3) * fluidAmp;
      if (x === boundaryX) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    waveTime += 0.04;
    requestAnimationFrame(renderImpedanceCanvas);
  }
  renderImpedanceCanvas();
}

// ----------------------------------------------------------------------------
// SECTION 4: THE COCHLEA TONOTOPY & BASILAR MEMBRANE CANVAS
// ----------------------------------------------------------------------------
let cochleaToneOsc = null;
let isCochleaTonePlaying = false;

function freqToGreenwoodPosition(f) {
  // Greenwood 1990: f = 165.4 * (10^(2.1 * (1 - x/32)) - 0.88)
  // Solve for x:
  const val = (f / 165.4) + 0.88;
  if (val <= 0) return 32;
  const x = 32 * (1 - Math.log10(val) / 2.1);
  return Math.max(0, Math.min(32, x));
}

function initCochleaAnalyzer() {
  const slider = document.getElementById('cochleaFreqSlider');
  const freqVal = document.getElementById('cochleaFreqVal');
  const readout = document.getElementById('cochleaResonanceReadout');
  const posVal = document.getElementById('cochleaPosVal');
  const widthVal = document.getElementById('cochleaWidthVal');
  const stiffnessVal = document.getElementById('cochleaStiffnessVal');
  const btnTogglePitch = document.getElementById('btnToggleCochleaTone');
  const canvas = document.getElementById('cochleaCanvas');

  function updateCochlea() {
    const f = parseFloat(slider.value);
    freqVal.textContent = f + ' Hz';
    const xMm = freqToGreenwoodPosition(f).toFixed(1);
    readout.textContent = 'Resonance at x = ' + xMm + ' mm from Base';
    posVal.textContent = xMm + ' mm from Oval Window';

    const widthMm = (0.1 + (xMm / 32) * 0.4).toFixed(2);
    widthVal.textContent = widthMm + ' mm (' + (xMm < 10 ? 'Narrow Base' : xMm > 22 ? 'Wide Apex' : 'Mid Turn') + ')';

    if (xMm < 10) {
      stiffnessVal.textContent = 'High Stiffness (100x apex)';
    } else if (xMm < 22) {
      stiffnessVal.textContent = 'Medium Compliance';
    } else {
      stiffnessVal.textContent = 'High Compliance (Loose)';
    }

    if (cochleaToneOsc && isCochleaTonePlaying) {
      cochleaToneOsc.frequency.setValueAtTime(f, audioCtx.currentTime);
    }
  }

  slider.addEventListener('input', updateCochlea);

  document.querySelectorAll('.cochlea-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cochlea-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      slider.value = btn.dataset.freq;
      updateCochlea();
    });
  });

  btnTogglePitch.addEventListener('click', () => {
    const ctx = getAudioContext();
    if (!isCochleaTonePlaying) {
      cochleaToneOsc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      cochleaToneOsc.frequency.setValueAtTime(parseFloat(slider.value), ctx.currentTime);
      cochleaToneOsc.connect(gain);
      gain.connect(ctx.destination);
      cochleaToneOsc.start();
      isCochleaTonePlaying = true;
      btnTogglePitch.textContent = 'Stop Pitch';
      btnTogglePitch.classList.add('btn-clay');
    } else {
      if (cochleaToneOsc) {
        cochleaToneOsc.stop();
        cochleaToneOsc.disconnect();
      }
      isCochleaTonePlaying = false;
      btnTogglePitch.textContent = 'Play Resonant Tone';
      btnTogglePitch.classList.remove('btn-clay');
    }
  });

  // Basilar Membrane Traveling Wave Canvas
  const ctx = canvas.getContext('2d');
  let travelPhase = 0;

  function renderBasilarWave() {
    const w = canvas.width = canvas.parentElement.clientWidth;
    const h = canvas.height = 150;
    const f = parseFloat(slider.value);
    const xResMm = freqToGreenwoodPosition(f);
    const xResPx = 50 + (xResMm / 32) * (w - 100);

    ctx.fillStyle = '${C.ivory}';
    ctx.fillRect(0, 0, w, h);

    // Anatomical taper shape of basilar membrane (narrow left, wide right)
    ctx.fillStyle = '${C.sagePale}';
    ctx.beginPath();
    ctx.moveTo(50, h / 2 - 8);
    ctx.lineTo(w - 50, h / 2 - 28);
    ctx.lineTo(w - 50, h / 2 + 28);
    ctx.lineTo(50, h / 2 + 8);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '${C.border}';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Baseline axis
    ctx.strokeStyle = '${C.stoneDark}';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(50, h / 2); ctx.lineTo(w - 50, h / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Traveling wave envelope & instantaneous wave
    ctx.strokeStyle = '${C.forest}';
    ctx.lineWidth = 2.2;
    ctx.beginPath();

    for (let x = 50; x <= w - 50; x++) {
      const distFromPeak = (x - xResPx);
      // Envelope peaks at xResPx and decays rapidly beyond it
      let envelope = 0;
      if (x <= xResPx) {
        envelope = Math.exp((x - xResPx) / 60);
      } else {
        envelope = Math.exp(-(x - xResPx) / 25);
      }
      const amp = envelope * 32;
      const k = 0.08;
      const y = h / 2 + Math.sin((x - 50) * k - travelPhase) * amp;
      if (x === 50) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Resonant Peak Callout
    ctx.fillStyle = '${C.clay}';
    ctx.beginPath();
    ctx.arc(xResPx, h / 2, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '${C.clay}';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(xResPx, 20); ctx.lineTo(xResPx, h - 20);
    ctx.stroke();

    // Frequency Calibrations along ribbon
    const freqs = [
      { f: '20 kHz', xMm: 0 },
      { f: '4 kHz', xMm: 8.5 },
      { f: '1 kHz', xMm: 18.2 },
      { f: '250 Hz', xMm: 26.5 },
      { f: '20 Hz', xMm: 32 }
    ];

    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '${C.charcoalMuted}';
    freqs.forEach(item => {
      const px = 50 + (item.xMm / 32) * (w - 100);
      ctx.textAlign = 'center';
      ctx.fillText(item.f, px, h - 8);
      ctx.fillRect(px - 0.5, h / 2 - 4, 1, 8);
    });

    // End labels
    ctx.textAlign = 'left';
    ctx.fillText('BASE (Narrow/Stiff)', 45, 18);
    ctx.textAlign = 'right';
    ctx.fillText('APEX (Wide/Compliant)', w - 45, 18);

    travelPhase += 0.08;
    requestAnimationFrame(renderBasilarWave);
  }
  renderBasilarWave();
}

// ----------------------------------------------------------------------------
// SECTION 5: WHEN HEARING BREAKS (3-WAY AUDIO COMPARISON)
// ----------------------------------------------------------------------------
let currentDemoSource = null;

function stopCurrentDemo() {
  if (currentDemoSource) {
    try { currentDemoSource.stop(); } catch(e) {}
    currentDemoSource.disconnect();
    currentDemoSource = null;
  }
}

function initHearingLossDemo() {
  const btnNormal = document.getElementById('btnDemoNormal');
  const btnDegraded = document.getElementById('btnDemoDegraded');
  const btnImplant = document.getElementById('btnDemoImplant');
  const status = document.getElementById('demoAudioStatus');

  async function playOption(type) {
    stopCurrentDemo();
    const ctx = getAudioContext();
    const rawBuffer = await decodeBase64Wav(EMBEDDED_SPEECH.sim_sample1, ctx);
    const samples = rawBuffer.getChannelData(0);

    let outputSamples = null;
    let label = '';
    let caption = '"The quick brown fox jumps over the lazy dog."';

    if (type === 'normal') {
      outputSamples = samples;
      label = 'Playing: 1. Normal Clear Speech';
    } else if (type === 'degraded') {
      // 70% hair cell loss simulation: steep lowpass/bandpass + clipping + harmonic smear
      const lp = designLowpass(1600, 16000, 0.7071);
      const hp = designHighpass(400, 16000, 0.7071);
      outputSamples = new Float32Array(samples.length);
      for (let i = 0; i < samples.length; i++) {
        let s = lp.process(hp.process(samples[i])) * 1.8;
        // Non-linear recruitment distortion
        s = Math.tanh(s * 1.5);
        outputSamples[i] = s;
      }
      label = 'Playing: 2. Acoustic Amplification with 70% Hair Cell Loss';
      caption = '[Muffled & Distorted]: The quick brown fox jumps over the lazy dog.';
    } else if (type === 'implant') {
      outputSamples = runChannelVocoder(samples, 16000, 16, 0, 'noise');
      label = 'Playing: 3. 16-Channel Direct Neural Simulation';
      caption = '[16-Channel Implant]: The quick brown fox jumps over the lazy dog.';
    }

    const playBuffer = ctx.createBuffer(1, outputSamples.length, 16000);
    playBuffer.copyToChannel(outputSamples, 0);

    currentDemoSource = ctx.createBufferSource();
    currentDemoSource.buffer = playBuffer;
    currentDemoSource.connect(ctx.destination);
    currentDemoSource.onended = () => {
      status.textContent = 'Audio playback completed.';
    };
    currentDemoSource.start();
    status.textContent = label;
    showCaption(caption, 3500);
  }

  btnNormal.addEventListener('click', () => playOption('normal'));
  btnDegraded.addEventListener('click', () => playOption('degraded'));
  btnImplant.addEventListener('click', () => playOption('implant'));
}

// ----------------------------------------------------------------------------
// SECTION 6: INSIDE AN IMPLANT (FLOW CARDS)
// ----------------------------------------------------------------------------
const IMPLANT_STAGES_INFO = {
  '1': {
    title: 'Stage 01: Dual Directional Microphones & Sound Processor',
    energy: 'ENERGY DOMAIN: ACOUSTIC PRESSURE \u2192 ANALOG ELECTRICAL VOLTAGE',
    desc: 'Behind-the-ear microphones capture acoustic waves. Front-facing and rear-facing mics allow DSP algorithms to calculate inter-microphone time differences and suppress ambient room reverberation.',
    latency: 'Latency: < 0.2 ms \u00B7 Bandwidth: 100 Hz \u2013 8,000 Hz'
  },
  '2': {
    title: 'Stage 02: Digital Signal Processor (Filterbank & Envelope Extractor)',
    energy: 'ENERGY DOMAIN: ANALOG VOLTAGE \u2192 DIGITAL DSP CODE',
    desc: 'The speech processor divides incoming sound into discrete frequency bands using bandpass filterbanks. A Hilbert rectifier extracts amplitude envelope modulation (< 300 Hz) for each channel.',
    latency: 'Latency: ~ 1.0 ms \u00B7 Strategy: CIS (Continuous Interleaved Sampling) or ACE'
  },
  '3': {
    title: 'Stage 03: Transcutaneous Inductive RF Transmitter Coil',
    energy: 'ENERGY DOMAIN: DIGITAL CODE \u2192 ELECTROMAGNETIC RF INDUCTION',
    desc: 'Held to the scalp by an internal neodymium magnet. It broadcasts high-frequency radio waves (2.5 to 5.0 MHz) across intact human skin, transmitting both power and data without piercing the epidermis.',
    latency: 'Coupling: Inductive mutual inductance \u00B7 Loss across 5 mm skin: < 15%'
  },
  '4': {
    title: 'Stage 04: Subcutaneous Titanium Receiver-Stimulator',
    energy: 'ENERGY DOMAIN: RF INDUCTION \u2192 DECODED BIPHASIC CURRENT PULSES',
    desc: 'Surgically seated in the mastoid bone in a hermetic titanium case. It rectifies the RF signal to power its internal custom ASIC microchip, decoding packets into microsecond charge-balanced electrical pulses.',
    latency: 'Hermetic seal: Medical-grade Grade 2 titanium with ceramic feedthroughs'
  },
  '5': {
    title: 'Stage 05: Intracochlear Electrode Array (12\u201324 Platinum Contacts)',
    energy: 'ENERGY DOMAIN: ELECTRICAL VOLTAGE \u2192 IONIC SOLUTION CURRENT',
    desc: 'Threaded through the round window ~20 to 25 mm into the fluid-filled scala tympani. Platinum-iridium electrode contacts inject biphasic current pulses into perilymph fluid at rates up to 5,000 pulses/sec per channel.',
    latency: 'Safety: Charge-balanced biphasic pulses prevent electrode electrolysis'
  },
  '6': {
    title: 'Stage 06: Spiral Ganglion Neurons & Auditory Cortex',
    energy: 'ENERGY DOMAIN: IONIC DEPOLARIZATION \u2192 NEURAL ACTION POTENTIALS',
    desc: 'Electrical currents depolarize nodes of Ranvier along surviving spiral ganglion axon fibers. Nerve impulses travel up the auditory nerve (CN VIII) through the brainstem to the auditory cortex.',
    latency: 'Physiological transduction: Direct axonal depolarization (< 0.1 ms)'
  }
};

function initImplantPipeline() {
  document.querySelectorAll('.flow-card').forEach(card => {
    card.addEventListener('click', () => {
      const step = card.dataset.step;
      const data = IMPLANT_STAGES_INFO[step];
      if (!data) return;

      document.querySelectorAll('.flow-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      document.getElementById('flowStepTitle').textContent = data.title;
      document.getElementById('flowEnergyDomain').textContent = data.energy;
      document.getElementById('flowDescription').textContent = data.desc;
      document.getElementById('flowLatency').textContent = data.latency;
    });
  });
}

// ----------------------------------------------------------------------------
// SECTION 7: THE SIMULATOR (CENTRAL VOCODER STUDIO)
// ----------------------------------------------------------------------------
let simOriginalBuffer = null;
let simVocodedBuffer = null;
let simCurrentSource = null;
let simIsPlaying = false;
let simPlayMode = 'sim'; // 'sim' or 'orig'
let simStartTime = 0;
let simPauseOffset = 0;

async function initSimulator() {
  const ctx = getAudioContext();
  const channelsSlider = document.getElementById('simChannelsSlider');
  const channelsVal = document.getElementById('simChannelsVal');
  const bgNoiseSlider = document.getElementById('simBgNoiseSlider');
  const bgNoiseVal = document.getElementById('simBgNoiseVal');
  const btnPlaySim = document.getElementById('btnPlaySim');
  const btnToggleMode = document.getElementById('btnToggleMode');
  const playbackTime = document.getElementById('simPlaybackTime');
  const scrubber = document.getElementById('simScrubber');
  const fileInput = document.getElementById('simFileInput');
  const btnRecordMic = document.getElementById('btnRecordMic');
  const specLabel = document.getElementById('simSpecLabel');

  // Load default sample
  simOriginalBuffer = await decodeBase64Wav(EMBEDDED_SPEECH.sim_sample1, ctx);
  reprocessVocoder();

  function updateVocoderLabels() {
    const ch = parseInt(channelsSlider.value, 10);
    let desc = 'Channels';
    if (ch === 1) desc = 'Channel (Monotone cadence)';
    else if (ch <= 4) desc = 'Channels (Rough syllabic rhythm)';
    else if (ch <= 8) desc = 'Channels (Intelligible speech)';
    else if (ch <= 16) desc = 'Channels (Crisp articulation)';
    else desc = 'Channels (High-fidelity spectral resolution)';
    channelsVal.textContent = ch + ' ' + desc;
    specLabel.textContent = ch + ' Discretized Channels';

    const noise = parseInt(bgNoiseSlider.value, 10);
    bgNoiseVal.textContent = noise === 0 ? '0% (Quiet Room)' : noise + '% Ambient Noise';
  }

  channelsSlider.addEventListener('input', () => {
    updateVocoderLabels();
    reprocessVocoder();
  });

  bgNoiseSlider.addEventListener('input', () => {
    updateVocoderLabels();
    reprocessVocoder();
  });

  document.querySelectorAll('input[name="simCarrier"]').forEach(r => {
    r.addEventListener('change', reprocessVocoder);
  });

  document.querySelectorAll('.sim-chan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sim-chan-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      channelsSlider.value = btn.dataset.ch;
      updateVocoderLabels();
      reprocessVocoder();
    });
  });

  // Source selection
  document.querySelectorAll('.sim-source-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (btn.id === 'btnRecordMic') return; // Handled separately
      document.querySelectorAll('.sim-source-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const src = btn.dataset.src;
      let b64 = EMBEDDED_SPEECH.sim_sample1;
      let text = 'Loaded: Sample 1 (Quick Brown Fox)';
      if (src === 'sample2') {
        b64 = EMBEDDED_SPEECH.sim_sample2;
        text = 'Loaded: Sample 2 (Bioacoustics)';
      } else if (src === 'sample3') {
        b64 = EMBEDDED_SPEECH.sim_sample3;
        text = 'Loaded: Sample 3 (Ear Frequency)';
      }

      document.getElementById('simSourceNotice').textContent = text;
      stopSimulator();
      simOriginalBuffer = await decodeBase64Wav(b64, ctx);
      reprocessVocoder();
    });
  });

  // File upload handler
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    document.getElementById('simSourceNotice').textContent = 'Processing uploaded file: ' + file.name;
    const arrayBuffer = await file.arrayBuffer();
    try {
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      simOriginalBuffer = decoded;
      document.getElementById('simSourceNotice').textContent = 'Loaded Custom File: ' + file.name;
      stopSimulator();
      reprocessVocoder();
    } catch(err) {
      alert('Could not decode audio file. Please use a standard WAV or MP3 file.');
    }
  });

  // Microphone recording (3 seconds)
  btnRecordMic.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];
      document.getElementById('simSourceNotice').textContent = 'Recording your voice for 3 seconds... Speak now!';
      btnRecordMic.textContent = 'Recording (3s)...';

      mediaRecorder.ondataavailable = e => chunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const arrayBuf = await blob.arrayBuffer();
        simOriginalBuffer = await ctx.decodeAudioData(arrayBuf);
        stream.getTracks().forEach(t => t.stop());
        btnRecordMic.textContent = 'Record Your Voice (3s)';
        document.getElementById('simSourceNotice').textContent = 'Recorded voice successfully loaded into vocoder.';
        stopSimulator();
        reprocessVocoder();
      };

      mediaRecorder.start();
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') mediaRecorder.stop();
      }, 3000);
    } catch(err) {
      alert('Microphone access could not be acquired: ' + err.message);
    }
  });

  function reprocessVocoder() {
    if (!simOriginalBuffer) return;
    const samples = simOriginalBuffer.getChannelData(0);
    const ch = parseInt(channelsSlider.value, 10);
    const noise = parseInt(bgNoiseSlider.value, 10) / 100;
    const carrierMode = document.getElementById('carrierSine').checked ? 'sine' : 'noise';

    const vocodedSamples = runChannelVocoder(samples, 16000, ch, noise, carrierMode);
    simVocodedBuffer = ctx.createBuffer(1, vocodedSamples.length, 16000);
    simVocodedBuffer.copyToChannel(vocodedSamples, 0);

    drawStaticSpectrograms();
  }

  // Playback engine
  function playSimulator() {
    const targetBuffer = simPlayMode === 'sim' ? simVocodedBuffer : simOriginalBuffer;
    if (!targetBuffer) return;

    stopSimulator();

    simCurrentSource = ctx.createBufferSource();
    simCurrentSource.buffer = targetBuffer;
    simCurrentSource.connect(ctx.destination);

    simStartTime = ctx.currentTime - simPauseOffset;
    simCurrentSource.start(0, simPauseOffset);
    simIsPlaying = true;
    btnPlaySim.textContent = 'Pause Audio';
    btnPlaySim.classList.add('btn-clay');

    showCaption(simPlayMode === 'sim' ? '[Simulated Implant Sound Playing]' : '[Original Clear Acoustic Sound Playing]', 2500);

    simCurrentSource.onended = () => {
      if (simIsPlaying) {
        simIsPlaying = false;
        simPauseOffset = 0;
        btnPlaySim.textContent = 'Play Audio';
        btnPlaySim.classList.remove('btn-clay');
      }
    };
  }

  function stopSimulator() {
    if (simCurrentSource) {
      try { simCurrentSource.stop(); } catch(e) {}
      simCurrentSource.disconnect();
      simCurrentSource = null;
    }
    simIsPlaying = false;
    btnPlaySim.textContent = 'Play Audio';
    btnPlaySim.classList.remove('btn-clay');
  }

  btnPlaySim.addEventListener('click', () => {
    if (simIsPlaying) {
      simPauseOffset = ctx.currentTime - simStartTime;
      stopSimulator();
    } else {
      playSimulator();
    }
  });

  btnToggleMode.addEventListener('click', () => {
    if (simPlayMode === 'sim') {
      simPlayMode = 'orig';
      btnToggleMode.textContent = 'Hearing: Original Audio';
      btnToggleMode.classList.remove('btn-clay');
      btnToggleMode.classList.add('btn-outline');
    } else {
      simPlayMode = 'sim';
      btnToggleMode.textContent = 'Hearing: Simulated Implant';
      btnToggleMode.classList.remove('btn-outline');
      btnToggleMode.classList.add('btn-clay');
    }
    if (simIsPlaying) {
      simPauseOffset = ctx.currentTime - simStartTime;
      playSimulator();
    }
  });

  // Track scrubber progress
  setInterval(() => {
    if (!simOriginalBuffer) return;
    const dur = simOriginalBuffer.duration;
    let curr = simPauseOffset;
    if (simIsPlaying) {
      curr = ctx.currentTime - simStartTime;
    }
    if (curr > dur) curr = dur;
    playbackTime.textContent = curr.toFixed(2) + 's / ' + dur.toFixed(2) + 's';
    scrubber.value = dur > 0 ? (curr / dur * 100) : 0;
  }, 100);

  scrubber.addEventListener('input', () => {
    if (!simOriginalBuffer) return;
    simPauseOffset = (scrubber.value / 100) * simOriginalBuffer.duration;
    if (simIsPlaying) playSimulator();
  });

  // Dual Spectrogram Render
  function drawStaticSpectrograms() {
    if (!simOriginalBuffer || !simVocodedBuffer) return;
    drawOneSpectrogram(document.getElementById('specOrigCanvas'), simOriginalBuffer.getChannelData(0));
    drawOneSpectrogram(document.getElementById('specSimCanvas'), simVocodedBuffer.getChannelData(0));
  }

  function drawOneSpectrogram(canvas, samples) {
    if (!canvas) return;
    const w = canvas.width = canvas.parentElement.clientWidth;
    const h = canvas.height = 150;
    const sCtx = canvas.getContext('2d');

    sCtx.fillStyle = '${C.ivory}';
    sCtx.fillRect(0, 0, w, h);

    const step = Math.floor(samples.length / w);
    for (let x = 0; x < w; x++) {
      let energy = 0;
      for (let s = 0; s < step; s++) {
        energy += Math.abs(samples[x * step + s] || 0);
      }
      energy = energy / (step || 1);

      // Draw vertical spectral slice
      const barH = Math.min(h, energy * h * 2.2);
      sCtx.fillStyle = canvas.id === 'specOrigCanvas' ? '${C.forest}' : '${C.clay}';
      sCtx.fillRect(x, h - barH, 1, barH);
    }
  }
}

// ----------------------------------------------------------------------------
// SECTION 8: THE EXPERIMENT (4-ROUND LISTENING BENCHMARK)
// ----------------------------------------------------------------------------
const EXPERIMENT_ROUNDS = [
  {
    round: 1,
    channels: 2,
    sampleKey: 'exp_sent1',
    sentence: 'A blue sky appeared after the morning storm.',
    options: [
      'A blue sky appeared after the morning storm.',
      'Two old shoes were resting near the garden wall.',
      'The quiet sheep ran quickly across the river.',
      'Cold milk spilled across the kitchen floor.'
    ],
    answerIdx: 0,
    explanation: 'With only 2 channels, vowel formants cannot be distinguished. Speech sounds like monotonic robotic buzzing, making words almost impossible to decipher without context.'
  },
  {
    round: 2,
    channels: 4,
    sampleKey: 'exp_sent2',
    sentence: 'The wooden fence kept the sheep in the field.',
    options: [
      'A golden bird sang sweetly inside the tree.',
      'The wooden fence kept the sheep in the field.',
      'Ten silver coins were scattered on the path.',
      'The sudden wind blew leaves into the porch.'
    ],
    answerIdx: 1,
    explanation: 'At 4 channels, syllable counts and coarse rhythm become apparent. Certain vowels can be guessed, but consonant place of articulation remains ambiguous.'
  },
  {
    round: 3,
    channels: 8,
    sampleKey: 'exp_sent3',
    sentence: 'Silver coins were hidden beneath the garden stone.',
    options: [
      'Seven horses walked slowly down the mountain trail.',
      'Yellow daisies bloomed around the quiet lake.',
      'Silver coins were hidden beneath the garden stone.',
      'A tiny insect crawled across the window glass.'
    ],
    answerIdx: 2,
    explanation: 'At 8 channels, speech comprehension makes a dramatic leap! Most adult listeners can understand full sentences because the key formant transitions (F1 and F2) are now resolved.'
  },
  {
    round: 4,
    channels: 16,
    sampleKey: 'exp_sent4',
    sentence: 'Fresh coffee brewed quietly in the early morning.',
    options: [
      'White winter clouds drifted above the sleepy valley.',
      'Heavy iron bells chimed throughout the ancient town.',
      'Three small boats sailed away before sunset.',
      'Fresh coffee brewed quietly in the early morning.'
    ],
    answerIdx: 3,
    explanation: 'At 16 channels, speech articulation is remarkably clear. Notice how intelligibility gains level off \u2014 the famous Shannon plateau.'
  }
];

let expCurrentRound = 0;
let expScore = 0;
let expUserResults = []; // [{ channels, correct }]

function initExperiment() {
  const roundBadge = document.getElementById('expRoundBadge');
  const roundTitle = document.getElementById('expRoundTitle');
  const roundDesc = document.getElementById('expRoundDesc');
  const btnPlayRound = document.getElementById('btnPlayRound');
  const optionsContainer = document.getElementById('expOptionsContainer');
  const feedback = document.getElementById('expFeedback');
  const btnNext = document.getElementById('btnNextRound');
  const scoreTally = document.getElementById('expScoreTally');

  function loadRound(idx) {
    const r = EXPERIMENT_ROUNDS[idx];
    roundBadge.textContent = 'ROUND ' + r.round + ' OF 4';
    roundTitle.textContent = 'Round ' + r.round + ': ' + r.channels + ' Channels (' + (r.channels <= 4 ? 'Heavy Smear' : 'High Clarity') + ')';
    roundDesc.textContent = 'Listen to the sentence vocoded through ' + r.channels + ' channels. Pick the sentence you heard:';
    feedback.style.display = 'none';
    btnNext.style.display = 'none';
    optionsContainer.innerHTML = '';

    r.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill-btn exp-option-btn';
      btn.style.textAlign = 'left';
      btn.style.padding = '0.75rem 1rem';
      btn.style.fontSize = '0.95rem';
      btn.textContent = (optIdx + 1) + '. ' + optText;
      btn.addEventListener('click', () => evaluateAnswer(optIdx));
      optionsContainer.appendChild(btn);
    });
  }

  async function playRoundAudio() {
    const ctx = getAudioContext();
    const r = EXPERIMENT_ROUNDS[expCurrentRound];
    const b64 = EMBEDDED_SPEECH[r.sampleKey];
    const rawBuffer = await decodeBase64Wav(b64, ctx);
    const samples = rawBuffer.getChannelData(0);

    const vocoded = runChannelVocoder(samples, 16000, r.channels, 0, 'noise');
    const playBuffer = ctx.createBuffer(1, vocoded.length, 16000);
    playBuffer.copyToChannel(vocoded, 0);

    const src = ctx.createBufferSource();
    src.buffer = playBuffer;
    src.connect(ctx.destination);
    src.start();
    showCaption('[Sentence Audio Playing through ' + r.channels + ' Channels]', 3000);
  }

  btnPlayRound.addEventListener('click', playRoundAudio);

  function evaluateAnswer(selectedIdx) {
    const r = EXPERIMENT_ROUNDS[expCurrentRound];
    const isCorrect = (selectedIdx === r.answerIdx);

    if (isCorrect) expScore++;
    expUserResults.push({ channels: r.channels, correct: isCorrect ? 100 : 0 });

    scoreTally.textContent = 'Trial Score: ' + expScore + ' / 4';

    feedback.style.display = 'block';
    if (isCorrect) {
      feedback.style.backgroundColor = '${C.sagePale}';
      feedback.style.border = '1px solid ${C.forest}';
      feedback.style.color = '${C.forest}';
      feedback.innerHTML = '<strong>Correct!</strong> ' + r.sentence + '<br><span style="font-size: 0.88rem; color: ${C.charcoal};">' + r.explanation + '</span>';
    } else {
      feedback.style.backgroundColor = '${C.clayPale}';
      feedback.style.border = '1px solid ${C.clay}';
      feedback.style.color = '${C.clay}';
      feedback.innerHTML = '<strong>Not quite.</strong> The sentence was: <em>"' + r.sentence + '"</em><br><span style="font-size: 0.88rem; color: ${C.charcoal};">' + r.explanation + '</span>';
    }

    // Disable option buttons
    document.querySelectorAll('.exp-option-btn').forEach((b, i) => {
      b.disabled = true;
      if (i === r.answerIdx) {
        b.style.borderColor = '${C.forest}';
        b.style.fontWeight = 'bold';
      }
    });

    if (expCurrentRound < EXPERIMENT_ROUNDS.length - 1) {
      btnNext.style.display = 'inline-flex';
      btnNext.textContent = 'Proceed to Round ' + (expCurrentRound + 2);
    } else {
      btnNext.style.display = 'inline-flex';
      btnNext.textContent = 'Trial Complete (View Benchmark Plot Below)';
    }

    drawExperimentResultsChart();
  }

  btnNext.addEventListener('click', () => {
    if (expCurrentRound < EXPERIMENT_ROUNDS.length - 1) {
      expCurrentRound++;
      loadRound(expCurrentRound);
    } else {
      document.getElementById('expResultsCanvas').scrollIntoView({ behavior: 'smooth' });
    }
  });

  loadRound(0);
  drawExperimentResultsChart();
}

function drawExperimentResultsChart() {
  const canvas = document.getElementById('expResultsCanvas');
  if (!canvas) return;
  const w = canvas.width = canvas.parentElement.clientWidth;
  const h = canvas.height = 180;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '${C.ivory}';
  ctx.fillRect(0, 0, w, h);

  const padLeft = 55;
  const padRight = 35;
  const padBottom = 35;
  const padTop = 20;
  const plotW = w - padLeft - padRight;
  const plotH = h - padTop - padBottom;

  // Grid lines
  ctx.strokeStyle = '${C.border}';
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 2]);

  // Horizontal % lines
  [0, 25, 50, 75, 100].forEach(pct => {
    const y = padTop + plotH * (1 - pct / 100);
    ctx.beginPath();
    ctx.moveTo(padLeft, y); ctx.lineTo(w - padRight, y);
    ctx.stroke();

    ctx.fillStyle = '${C.charcoalMuted}';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(pct + '%', padLeft - 8, y + 3);
  });
  ctx.setLineDash([]);

  // X-axis channel ticks (1, 2, 4, 8, 16, 24, 32 channels on log scale)
  const channelTicks = [1, 2, 4, 8, 16, 24, 32];
  function chToX(c) {
    const minL = Math.log(1);
    const maxL = Math.log(32);
    const frac = (Math.log(c) - minL) / (maxL - minL);
    return padLeft + frac * plotW;
  }

  channelTicks.forEach(c => {
    const x = chToX(c);
    ctx.fillStyle = '${C.charcoalMuted}';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(c + ' ch', x, h - 14);
  });

  // Shannon et al. (1995) Published Benchmark Curve (Forest Green)
  const shannonData = [
    { ch: 1, val: 2 },
    { ch: 2, val: 18 },
    { ch: 3, val: 45 },
    { ch: 4, val: 68 },
    { ch: 6, val: 84 },
    { ch: 8, val: 92 },
    { ch: 12, val: 95 },
    { ch: 16, val: 96 },
    { ch: 24, val: 97 },
    { ch: 32, val: 97 }
  ];

  ctx.strokeStyle = '${C.forest}';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  shannonData.forEach((pt, i) => {
    const x = chToX(pt.ch);
    const y = padTop + plotH * (1 - pt.val / 100);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // User Results Plot (Clay Red Dots & Line)
  if (expUserResults.length > 0) {
    ctx.strokeStyle = '${C.clay}';
    ctx.lineWidth = 2;
    ctx.beginPath();
    expUserResults.forEach((pt, i) => {
      const x = chToX(pt.channels);
      const y = padTop + plotH * (1 - pt.correct / 100);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    expUserResults.forEach(pt => {
      const x = chToX(pt.channels);
      const y = padTop + plotH * (1 - pt.correct / 100);
      ctx.fillStyle = '${C.clay}';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Legend
  ctx.font = '11px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '${C.forest}';
  ctx.textAlign = 'left';
  ctx.fillText('Shannon et al. (1995) Benchmark in Quiet', padLeft + 10, padTop + 15);

  ctx.fillStyle = '${C.clay}';
  ctx.fillText('Your Trial Comprehension', padLeft + 10, padTop + 32);
}

// ----------------------------------------------------------------------------
// SECTION 9: THE MUSIC CHALLENGE
// ----------------------------------------------------------------------------
const MELODIES = {
  joy: {
    name: 'Beethoven: Ode to Joy (Symphony No. 9)',
    key: 'joy',
    notes: [
      { f: 329.63, d: 0.4 }, { f: 329.63, d: 0.4 }, { f: 349.23, d: 0.4 }, { f: 392.00, d: 0.4 },
      { f: 392.00, d: 0.4 }, { f: 349.23, d: 0.4 }, { f: 329.63, d: 0.4 }, { f: 293.66, d: 0.4 },
      { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 293.66, d: 0.4 }, { f: 329.63, d: 0.4 },
      { f: 329.63, d: 0.6 }, { f: 293.66, d: 0.2 }, { f: 293.66, d: 0.8 }
    ]
  },
  twinkle: {
    name: 'Mozart: Twinkle Twinkle Little Star',
    key: 'twinkle',
    notes: [
      { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 392.00, d: 0.4 }, { f: 392.00, d: 0.4 },
      { f: 440.00, d: 0.4 }, { f: 440.00, d: 0.4 }, { f: 392.00, d: 0.8 },
      { f: 349.23, d: 0.4 }, { f: 349.23, d: 0.4 }, { f: 329.63, d: 0.4 }, { f: 329.63, d: 0.4 },
      { f: 293.66, d: 0.4 }, { f: 293.66, d: 0.4 }, { f: 261.63, d: 0.8 }
    ]
  },
  birthday: {
    name: 'Traditional: Happy Birthday to You',
    key: 'birthday',
    notes: [
      { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.1 }, { f: 293.66, d: 0.4 }, { f: 261.63, d: 0.4 },
      { f: 349.23, d: 0.4 }, { f: 329.63, d: 0.8 },
      { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.1 }, { f: 293.66, d: 0.4 }, { f: 261.63, d: 0.4 },
      { f: 392.00, d: 0.4 }, { f: 349.23, d: 0.8 }
    ]
  }
};

let currentMelodyKey = 'joy';
let currentMelodyChannels = 4;
let currentMelodySource = null;

function synthesizeMelody(melodyData, ctx) {
  const sampleRate = 16000;
  let totalDur = 0;
  melodyData.notes.forEach(n => totalDur += n.d);
  const N = Math.floor(totalDur * sampleRate);
  const samples = new Float32Array(N);

  let offset = 0;
  melodyData.notes.forEach(n => {
    const noteSamples = Math.floor(n.d * sampleRate);
    const twoPiF = 2 * Math.PI * n.f / sampleRate;
    for (let i = 0; i < noteSamples; i++) {
      // Add fundamental + 2nd and 3rd harmonics for instrument timbre
      const s = 0.6 * Math.sin(twoPiF * i) + 0.3 * Math.sin(2 * twoPiF * i) + 0.1 * Math.sin(3 * twoPiF * i);
      // Envelope
      const env = Math.exp(-i / (noteSamples * 0.7));
      if (offset + i < N) {
        samples[offset + i] = s * env;
      }
    }
    offset += noteSamples;
  });

  return samples;
}

function initMusicChallenge() {
  const btnPlayMusic = document.getElementById('btnPlayMusic');
  const feedback = document.getElementById('musicFeedback');

  document.querySelectorAll('.music-song-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.music-song-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMelodyKey = btn.dataset.song;
      feedback.style.display = 'none';
    });
  });

  document.querySelectorAll('.music-chan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.music-chan-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMelodyChannels = parseInt(btn.dataset.ch, 10);
      feedback.style.display = 'none';
    });
  });

  btnPlayMusic.addEventListener('click', () => {
    if (currentMelodySource) {
      try { currentMelodySource.stop(); } catch(e) {}
      currentMelodySource = null;
    }

    const ctx = getAudioContext();
    const song = MELODIES[currentMelodyKey];
    const rawSamples = synthesizeMelody(song, ctx);

    let output = rawSamples;
    if (currentMelodyChannels > 0) {
      output = runChannelVocoder(rawSamples, 16000, currentMelodyChannels, 0, 'noise');
    }

    const playBuf = ctx.createBuffer(1, output.length, 16000);
    playBuf.copyToChannel(output, 0);

    currentMelodySource = ctx.createBufferSource();
    currentMelodySource.buffer = playBuf;
    currentMelodySource.connect(ctx.destination);
    currentMelodySource.start();

    showCaption('[Synthesizing Melody: ' + (currentMelodyChannels === 0 ? 'Original Pitch' : currentMelodyChannels + ' Channels') + ']', 3000);
  });

  document.querySelectorAll('.music-guess-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const guess = btn.dataset.guess;
      const correctSong = MELODIES[currentMelodyKey];
      const isCorrect = (guess === currentMelodyKey);

      feedback.style.display = 'block';
      if (isCorrect) {
        feedback.style.backgroundColor = '${C.sagePale}';
        feedback.style.border = '1px solid ${C.forest}';
        feedback.style.color = '${C.forest}';
        feedback.innerHTML = '<strong>Correct!</strong> You identified: ' + correctSong.name + '.<br><span style="font-size: 0.88rem; color: ${C.charcoal};">Notice how rhythm and note timing helped you guess, even when pitch was replaced by noise bursts.</span>';
      } else {
        feedback.style.backgroundColor = '${C.clayPale}';
        feedback.style.border = '1px solid ${C.clay}';
        feedback.style.color = '${C.clay}';
        feedback.innerHTML = '<strong>Incorrect.</strong> The melody was actually: <em>' + correctSong.name + '</em>.<br><span style="font-size: 0.88rem; color: ${C.charcoal};">Without fine harmonic overtone resolution (\u0394f < 2 Hz), melodies lose musical intervals and sound like drum beats.</span>';
      }
    });
  });
}

// ----------------------------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Global click to unlock AudioContext
  document.body.addEventListener('click', () => {
    if (!isAudioInitialized) {
      getAudioContext();
      isAudioInitialized = true;
    }
  }, { once: true });

  initHeroWave();
  initWaveStudio();
  initEarMachine();
  initCochleaAnalyzer();
  initHearingLossDemo();
  initImplantPipeline();
  initSimulator();
  initExperiment();
  initMusicChallenge();

  console.log('RESONANCE Bioacoustics Engine Initialized.');
});
`;
}

console.log('Client script defined.');

// ----------------------------------------------------------------------------
// COMPILATION & INTEGRITY VERIFICATION
// ----------------------------------------------------------------------------

function buildSite() {
  console.log('Compiling RESONANCE website...');

  const speechBundle = JSON.parse(fs.readFileSync('speech_bundle.json', 'utf8'));
  console.log('Loaded speech bundle with keys:', Object.keys(speechBundle));

  const fullHtml = getHtml(speechBundle);

  // 1. Emoji check
  assertNoEmojis(fullHtml);
  console.log('Verification: Zero emojis detected.');

  // 2. CSS Gradient check
  if (/linear-gradient|radial-gradient|conic-gradient|-webkit-gradient/i.test(fullHtml)) {
    throw new Error('Forbidden CSS gradient detected in stylesheet or markup!');
  }
  console.log('Verification: Zero CSS gradients detected.');

  // 3. Script syntax validation
  const scriptStart = fullHtml.indexOf('<script>') + 8;
  const scriptEnd = fullHtml.lastIndexOf('</script>');
  const scriptCode = fullHtml.substring(scriptStart, scriptEnd);
  
  try {
    new vm.Script(scriptCode);
    console.log('Verification: JavaScript syntax is valid and error-free.');
  } catch(err) {
    console.error('JavaScript syntax error:', err);
    throw err;
  }

  // 4. Write index.html
  fs.writeFileSync('index.html', fullHtml, 'utf8');
  const stats = fs.statSync('index.html');
  console.log('SUCCESS! index.html written successfully.');
  console.log('Total file size:', (stats.size / 1024).toFixed(1), 'KB');
}

buildSite();
