// build_journal_site.js
const fs = require('fs');

const speechBundle = JSON.parse(fs.readFileSync('speech_bundle.json', 'utf8'));

// Strict verification that no emojis are present
function assertNoEmojis(text) {
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const match = text.match(emojiRegex);
  if (match) {
    throw new Error('Forbidden emoji detected: ' + match[0]);
  }
}

// Helper for SVGs with hand-drawn printed journal style (thin charcoal lines #2E2A26, flat fills)
// Color constants:
const C_INK = '#2E2A26';
const C_INK_MUTED = '#6A635B';
const C_PAPER = '#F6F1E7';
const C_SAND = '#EDE5D3';
const C_SAGE = '#8FA68E';
const C_SAGE_TINT = '#E3EAE2';
const C_CLAY = '#C9805F';
const C_CLAY_TINT = '#F6EAE4';
const C_BLUE = '#8CA3B0';
const C_BLUE_TINT = '#E5EDF1';
const C_HAIRLINE = '#D8CFBF';

// ----------------------------------------------------------------------------
// 1. HERO SVG: Ear in profile with concentric acoustic sound wave arcs
// ----------------------------------------------------------------------------
function getHeroSvg() {
  return `
<svg viewBox="0 0 540 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line illustration of the human ear and sound waves" style="width:100%; height:auto; display:block;">
  <style>
    .j-stroke { stroke: ${C_INK}; stroke-width: 1.35; stroke-linecap: round; stroke-linejoin: round; fill: none; }
    .j-wave { stroke: ${C_CLAY}; stroke-width: 1.4; stroke-linecap: round; fill: none; }
    .j-wave-outer { stroke: ${C_SAGE}; stroke-width: 1.2; stroke-dasharray: 4,4; fill: none; }
    .j-annotation { font-family: 'Newsreader', Georgia, serif; font-style: italic; font-size: 13px; fill: ${C_INK_MUTED}; }
  </style>

  <!-- Concentric Sound Wave Arcs propagating toward the ear -->
  <path d="M 60 70 A 240 240 0 0 1 60 310" class="j-wave-outer" />
  <path d="M 95 90 A 200 200 0 0 1 95 290" class="j-wave" />
  <path d="M 130 110 A 160 160 0 0 1 130 270" class="j-wave" />
  <path d="M 165 130 A 120 120 0 0 1 165 250" class="j-wave" />
  <path d="M 200 150 A 80 80 0 0 1 200 230" class="j-wave" />

  <!-- Directional arrow -->
  <path d="M 100 190 L 195 190" stroke="${C_CLAY}" stroke-width="1.2" stroke-dasharray="2,2" />
  <polygon points="195,187 203,190 195,193" fill="${C_CLAY}" />
  <text x="75" y="180" class="j-annotation">acoustic pressure wave</text>

  <!-- Ear Profile (Pinna, antihelix, concha, lobule, canal entrance) -->
  <g transform="translate(190, 20)">
    <!-- Base paper tint fill for the pinna -->
    <path d="M 130 60 
             C 80 75, 45 130, 55 195 
             C 65 245, 60 280, 95 315 
             C 115 335, 140 325, 140 300 
             C 125 260, 115 235, 105 195 
             C 90 145, 105 95, 140 70 
             Z" fill="${C_SAND}" stroke="none" />

    <!-- Outer helix rim -->
    <path d="M 130 60 
             C 70 80, 40 140, 52 205 
             C 62 255, 58 285, 92 320 
             C 112 338, 142 328, 138 298 
             C 122 258, 112 230, 102 190 
             C 88 140, 105 92, 142 66" class="j-stroke" />

    <!-- Inner helix & antihelix folds -->
    <path d="M 98 120 C 80 150, 78 185, 95 210 C 110 230, 115 255, 112 285" class="j-stroke" />
    <path d="M 115 135 C 102 155, 102 175, 115 190" class="j-stroke" />

    <!-- Tragus and Concha basin -->
    <path d="M 135 185 C 122 188, 118 198, 122 208 C 128 218, 138 215, 142 208" class="j-stroke" fill="${C_SAGE_TINT}" />
    <!-- Canal entrance aperture -->
    <ellipse cx="145" cy="204" rx="10" ry="14" fill="${C_INK}" />

    <!-- Sidenote annotations with hand-drawn-style pointer lines -->
    <path d="M 70 110 L 30 75 L -10 75" stroke="${C_INK_MUTED}" stroke-width="0.8" fill="none" />
    <text x="-15" y="70" class="j-annotation" text-anchor="end">Pinna (acoustic collector)</text>

    <path d="M 145 204 L 195 180 L 250 180" stroke="${C_INK_MUTED}" stroke-width="0.8" fill="none" />
    <text x="255" y="184" class="j-annotation">Auditory meatus (canal)</text>

    <path d="M 120 315 L 160 345 L 210 345" stroke="${C_INK_MUTED}" stroke-width="0.8" fill="none" />
    <text x="215" y="349" class="j-annotation">Lobule</text>
  </g>
</svg>
`;
}

// ----------------------------------------------------------------------------
// 2. SECTION 3 SVG: Cross-section of outer, middle, and inner ear (Fig. 2)
// ----------------------------------------------------------------------------
function getEarCrossSectionSvg() {
  return `
<svg id="earCrossSvg" viewBox="0 0 860 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Plate II: Anatomical cross-section of the human ear showing outer, middle, and inner structures" style="width:100%; height:auto; display:block;">
  <style>
    .plate-ink { stroke: ${C_INK}; stroke-width: 1.3; stroke-linecap: round; stroke-linejoin: round; }
    .plate-thin { stroke: ${C_INK_MUTED}; stroke-width: 0.9; stroke-dasharray: 3,3; fill: none; }
    .ear-click-zone { cursor: pointer; transition: opacity 0.2s ease; }
    .ear-click-zone:hover path, .ear-click-zone:hover polygon, .ear-click-zone:hover ellipse { stroke-width: 2.2px !important; }
    .ear-click-zone.active path, .ear-click-zone.active polygon, .ear-click-zone.active ellipse { stroke: ${C_CLAY} !important; stroke-width: 2.5px !important; }
    .fig-label { font-family: 'Newsreader', Georgia, serif; font-size: 13px; fill: ${C_INK}; font-style: italic; }
    .part-tag { font-family: 'Source Sans 3', sans-serif; font-size: 12px; font-weight: 600; fill: ${C_INK}; letter-spacing: 0.03em; }
    .dim-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${C_INK_MUTED}; }
  </style>

  <!-- Background Region Demarcations -->
  <rect x="20" y="20" width="230" height="440" fill="${C_PAPER}" stroke="${C_HAIRLINE}" stroke-width="1" />
  <text x="35" y="45" class="part-tag" fill="${C_INK_MUTED}">I. OUTER EAR (AIR)</text>

  <rect x="260" y="20" width="220" height="440" fill="${C_SAND}" stroke="${C_HAIRLINE}" stroke-width="1" opacity="0.6" />
  <text x="275" y="45" class="part-tag" fill="${C_INK_MUTED}">II. MIDDLE EAR (LEVER)</text>

  <rect x="490" y="20" width="350" height="440" fill="${C_PAPER}" stroke="${C_HAIRLINE}" stroke-width="1" />
  <text x="505" y="45" class="part-tag" fill="${C_INK_MUTED}">III. INNER EAR (FLUID &amp; NERVE)</text>

  <!-- EAR CANAL (External Auditory Meatus) -->
  <path d="M 50 200 C 100 205, 170 215, 275 225 L 275 275 C 170 265, 100 255, 50 250 Z" 
        fill="${C_SAND}" class="plate-ink" />
  <text x="140" y="295" class="dim-label" text-anchor="middle">Canal length: 2.5 cm</text>

  <!-- PART 1: TYMPANIC MEMBRANE (Eardrum) -->
  <g id="earPartEardrum" class="ear-click-zone active" tabindex="0" role="button" aria-label="Eardrum">
    <!-- Conical diaphragm -->
    <path d="M 275 218 C 285 240, 285 255, 278 282" stroke="${C_CLAY}" stroke-width="3.5" stroke-linecap="round" fill="none" />
    <ellipse cx="282" cy="250" rx="3.5" ry="5.5" fill="${C_CLAY}" />
    <!-- Pointer Line -->
    <path d="M 280 240 L 230 150 L 160 150" stroke="${C_CLAY}" stroke-width="1" fill="none" />
    <text x="155" y="145" class="fig-label" text-anchor="end" fill="${C_CLAY}">Tympanic membrane (55 mm²)</text>
  </g>

  <!-- MIDDLE EAR CAVITY -->
  <!-- PART 2: MALLEUS (Hammer) -->
  <g id="earPartMalleus" class="ear-click-zone" tabindex="0" role="button" aria-label="Malleus">
    <!-- Handle (manubrium) attached to eardrum, head articulating with incus -->
    <path d="M 282 250 L 320 200 C 330 188, 345 190, 345 205 C 345 218, 332 230, 320 232 Z" 
          fill="${C_SAGE_TINT}" class="plate-ink" />
    <path d="M 330 190 L 330 130 L 370 130" stroke="${C_INK_MUTED}" stroke-width="1" fill="none" />
    <text x="375" y="134" class="fig-label">Malleus (hammer lever)</text>
  </g>

  <!-- PART 3: INCUS (Anvil) -->
  <g id="earPartIncus" class="ear-click-zone" tabindex="0" role="button" aria-label="Incus">
    <path d="M 340 200 C 360 195, 385 200, 390 218 C 395 235, 385 260, 400 270 L 392 280 C 378 270, 372 245, 360 235 Z" 
          fill="${C_SAGE_TINT}" class="plate-ink" />
    <path d="M 385 230 L 415 170 L 460 170" stroke="${C_INK_MUTED}" stroke-width="1" fill="none" />
    <text x="465" y="174" class="fig-label">Incus (anvil fulcrum)</text>
  </g>

  <!-- PART 4: STAPES (Stirrup) & OVAL WINDOW -->
  <g id="earPartStapes" class="ear-click-zone" tabindex="0" role="button" aria-label="Stapes">
    <!-- Stirrup crura arch and footplate -->
    <path d="M 400 272 L 428 260 L 448 260 L 448 285 L 428 285 Z" fill="${C_CLAY_TINT}" class="plate-ink" />
    <ellipse cx="430" cy="272" rx="5" ry="4" fill="${C_SAND}" />
    <!-- Footplate against oval window (3.2 mm²) -->
    <rect x="446" y="255" width="6" height="34" rx="2" fill="${C_CLAY}" stroke="${C_INK}" stroke-width="1.2" />
    <path d="M 450 272 L 485 340 L 530 340" stroke="${C_INK_MUTED}" stroke-width="1" fill="none" />
    <text x="535" y="344" class="fig-label">Stapes footplate in oval window (3.2 mm²)</text>
  </g>

  <!-- EUSTACHIAN TUBE -->
  <path d="M 340 310 L 305 450 L 285 445 L 325 305 Z" fill="${C_SAND}" class="plate-ink" opacity="0.6" />
  <text x="290" y="465" class="dim-label">Eustachian tube</text>

  <!-- INNER EAR: COCHLEA & NERVE -->
  <!-- Vestibule and Semicircular canals (balance) -->
  <g opacity="0.75">
    <path d="M 470 220 C 470 140, 540 130, 555 190 C 560 210, 545 225, 525 225" 
          fill="none" stroke="${C_BLUE}" stroke-width="5" stroke-linecap="round" />
    <path d="M 485 230 C 515 205, 580 220, 565 250 C 550 265, 520 255, 495 245" 
          fill="none" stroke="${C_BLUE}" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 530 210 C 580 210, 595 275, 555 295 C 530 305, 510 275, 515 255" 
          fill="none" stroke="${C_BLUE}" stroke-width="4.5" stroke-linecap="round" />
    <text x="530" y="125" class="dim-label" text-anchor="middle">Semicircular canals (balance)</text>
  </g>

  <!-- PART 5: COCHLEA (The Spiral Frequency Analyzer) -->
  <g id="earPartCochlea" class="ear-click-zone" tabindex="0" role="button" aria-label="Cochlea">
    <!-- Spiral shell -->
    <path d="M 475 285 
             C 520 325, 610 335, 630 275 
             C 645 215, 580 175, 530 205 
             C 495 225, 510 275, 550 280 
             C 580 280, 590 250, 565 240 
             C 550 235, 545 250, 555 255" 
          fill="${C_BLUE_TINT}" class="plate-ink" stroke-width="2" />
    <!-- Internal partition lines -->
    <path d="M 490 295 C 540 325, 615 320, 620 265 C 625 220, 570 190, 535 215" 
          class="plate-thin" stroke="${C_BLUE}" />
    <!-- Pointer -->
    <path d="M 625 280 L 665 240 L 730 240" stroke="${C_INK_MUTED}" stroke-width="1" fill="none" />
    <text x="735" y="244" class="fig-label">Cochlea (fluid-filled spiral)</text>
  </g>

  <!-- AUDITORY NERVE (Cranial Nerve VIII) -->
  <g id="earPartNerve" class="ear-click-zone" tabindex="0" role="button" aria-label="Auditory nerve">
    <path d="M 560 250 C 610 245, 690 235, 820 225" fill="none" stroke="${C_CLAY}" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 570 260 C 630 260, 710 255, 820 245" fill="none" stroke="${C_CLAY}" stroke-width="3" stroke-linecap="round" />
    <path d="M 565 270 C 620 275, 700 275, 820 265" fill="none" stroke="${C_CLAY}" stroke-width="3" stroke-linecap="round" />
    <!-- Pointer -->
    <path d="M 720 225 L 750 170 L 800 170" stroke="${C_INK_MUTED}" stroke-width="1" fill="none" />
    <text x="805" y="174" class="fig-label">Auditory nerve (to brain)</text>
  </g>
</svg>
`;
}

// ----------------------------------------------------------------------------
// 3. SECTION 5 SVG: Healthy vs Damaged Hair Cells (Fig. 5 & Fig. 6)
// ----------------------------------------------------------------------------
function getHairCellComparisonSvg() {
  return `
<svg viewBox="0 0 780 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig. 5: Comparison of healthy and damaged hair cells" style="width:100%; height:auto; display:block;">
  <style>
    .ink-line { stroke: ${C_INK}; stroke-width: 1.25; stroke-linecap: round; stroke-linejoin: round; }
    .cell-label { font-family: 'Newsreader', Georgia, serif; font-size: 14px; fill: ${C_INK}; font-style: italic; }
    .plate-caption { font-family: 'Source Sans 3', sans-serif; font-size: 12px; fill: ${C_INK_MUTED}; }
  </style>

  <!-- Left: Healthy Hair Cell Bundle -->
  <g transform="translate(40, 20)">
    <rect x="0" y="0" width="320" height="220" fill="${C_PAPER}" stroke="${C_HAIRLINE}" stroke-width="1" />
    <text x="25" y="30" class="cell-label" fill="${C_SAGE}">Intact sensory hair cell</text>
    <text x="25" y="48" class="plate-caption">Stereocilia stand upright in tight, organized ranks.</text>

    <!-- Basilar membrane floor -->
    <line x1="30" y1="180" x2="290" y2="180" stroke="${C_INK}" stroke-width="2" />
    <text x="30" y="200" class="plate-caption">Basilar membrane</text>

    <!-- Cell body -->
    <rect x="110" y="90" width="80" height="90" rx="8" fill="${C_SAGE_TINT}" class="ink-line" />
    <circle cx="150" cy="135" r="14" fill="${C_SAGE}" opacity="0.6" />

    <!-- Upright stereocilia bundle with tip links -->
    <line x1="120" y1="90" x2="120" y2="40" stroke="${C_INK}" stroke-width="3" stroke-linecap="round" />
    <line x1="135" y1="90" x2="135" y2="35" stroke="${C_INK}" stroke-width="3.2" stroke-linecap="round" />
    <line x1="150" y1="90" x2="150" y2="30" stroke="${C_INK}" stroke-width="3.5" stroke-linecap="round" />
    <line x1="165" y1="90" x2="165" y2="38" stroke="${C_INK}" stroke-width="3.2" stroke-linecap="round" />
    <line x1="180" y1="90" x2="180" y2="45" stroke="${C_INK}" stroke-width="3" stroke-linecap="round" />

    <!-- Tip links connecting stereocilia -->
    <line x1="120" y1="46" x2="135" y2="38" stroke="${C_CLAY}" stroke-width="1.2" stroke-dasharray="2,2" />
    <line x1="135" y1="38" x2="150" y2="33" stroke="${C_CLAY}" stroke-width="1.2" stroke-dasharray="2,2" />
    <line x1="150" y1="33" x2="165" y2="41" stroke="${C_CLAY}" stroke-width="1.2" stroke-dasharray="2,2" />
    <line x1="165" y1="41" x2="180" y2="48" stroke="${C_CLAY}" stroke-width="1.2" stroke-dasharray="2,2" />

    <!-- Nerve fiber exiting at base -->
    <path d="M 150 180 L 150 205 L 230 205" stroke="${C_CLAY}" stroke-width="2" fill="none" />
    <circle cx="200" cy="205" r="3" fill="${C_CLAY}" />
    <text x="235" y="209" class="plate-caption">Nerve signal fires</text>
  </g>

  <!-- Right: Damaged Hair Cell Bundle -->
  <g transform="translate(410, 20)">
    <rect x="0" y="0" width="320" height="220" fill="${C_SAND}" stroke="${C_HAIRLINE}" stroke-width="1" opacity="0.6" />
    <text x="25" y="30" class="cell-label" fill="${C_CLAY}">Damaged / missing hair cell</text>
    <text x="25" y="48" class="plate-caption">Broken or sheared cilia; ion channels cannot open.</text>

    <!-- Basilar membrane floor -->
    <line x1="30" y1="180" x2="290" y2="180" stroke="${C_INK}" stroke-width="2" />
    <text x="30" y="200" class="plate-caption">Basilar membrane</text>

    <!-- Degraded cell body -->
    <rect x="110" y="90" width="80" height="90" rx="8" fill="${C_PAPER}" class="ink-line" stroke-dasharray="4,2" />

    <!-- Broken, fused, or missing stereocilia stumps -->
    <line x1="120" y1="90" x2="115" y2="75" stroke="${C_CLAY}" stroke-width="2.5" stroke-linecap="round" />
    <line x1="135" y1="90" x2="130" y2="80" stroke="${C_CLAY}" stroke-width="2.5" stroke-linecap="round" />
    <circle cx="150" cy="85" r="4" fill="${C_CLAY}" />
    <line x1="175" y1="90" x2="180" y2="70" stroke="${C_CLAY}" stroke-width="2.5" stroke-linecap="round" />

    <!-- Broken indicator -->
    <text x="150" y="55" font-family="'Newsreader', serif" font-size="22" fill="${C_CLAY}" text-anchor="middle" font-weight="bold">×</text>
    <text x="150" y="70" class="plate-caption" text-anchor="middle">No mechanical transduction</text>

    <!-- Silent nerve fiber -->
    <path d="M 150 180 L 150 205 L 230 205" stroke="${C_INK_MUTED}" stroke-width="1.2" stroke-dasharray="3,3" fill="none" />
    <text x="235" y="209" class="plate-caption">Nerve remains silent</text>
  </g>
</svg>
`;
}

// ----------------------------------------------------------------------------
// 4. SECTION 6 SVG: Inside an Implant Signal Flow (Fig. 7)
// ----------------------------------------------------------------------------
function getImplantFlowSvg() {
  return `
<svg id="implantFlowSvg" viewBox="0 0 940 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fig. 7: Signal pathway and energy conversions in a cochlear implant system" style="width:100%; height:auto; display:block;">
  <style>
    .flow-box { fill: ${C_PAPER}; stroke: ${C_INK}; stroke-width: 1.25; rx: 4; cursor: pointer; transition: all 0.2s ease; }
    .flow-box:hover, .flow-box.active { fill: ${C_CLAY_TINT}; stroke: ${C_CLAY}; stroke-width: 2px; }
    .flow-title { font-family: 'Newsreader', Georgia, serif; font-size: 14px; font-weight: 600; fill: ${C_INK}; text-anchor: middle; }
    .flow-sub { font-family: 'Source Sans 3', sans-serif; font-size: 11px; fill: ${C_INK_MUTED}; text-anchor: middle; }
    .flow-energy { font-family: 'JetBrains Mono', monospace; font-size: 10px; fill: ${C_CLAY}; text-anchor: middle; }
    .flow-num { font-family: 'Newsreader', Georgia, serif; font-style: italic; font-size: 13px; fill: ${C_INK_MUTED}; text-anchor: middle; }
  </style>

  <!-- Transcutaneous Skin Barrier -->
  <line x1="465" y1="20" x2="465" y2="220" stroke="${C_CLAY}" stroke-width="1.5" stroke-dasharray="4,4" />
  <text x="470" y="32" font-family="'Newsreader', Georgia, serif" font-size="11px" font-style="italic" fill="${C_CLAY}">skin barrier (transcutaneous)</text>

  <!-- Step 1: Microphone -->
  <g class="implant-step-node" onclick="selectFlowStep(0)" tabindex="0" role="button">
    <rect x="20" y="45" width="125" height="150" class="flow-box active" id="stepBox0" />
    <text x="82" y="70" class="flow-num">Step 1</text>
    <text x="82" y="95" class="flow-title">Microphone</text>
    <text x="82" y="118" class="flow-sub">Behind the ear</text>
    <line x1="35" y1="135" x2="130" y2="135" stroke="${C_HAIRLINE}" stroke-width="1" />
    <text x="82" y="155" class="flow-energy">Sound wave</text>
    <text x="82" y="172" class="flow-energy">&darr; electrical voltage</text>
  </g>

  <!-- Connector 1->2 -->
  <path d="M 145 120 L 175 120" stroke="${C_INK}" stroke-width="1.2" />
  <polygon points="175,117 182,120 175,123" fill="${C_INK}" />

  <!-- Step 2: Sound Processor -->
  <g class="implant-step-node" onclick="selectFlowStep(1)" tabindex="0" role="button">
    <rect x="185" y="45" width="125" height="150" class="flow-box" id="stepBox1" />
    <text x="247" y="70" class="flow-num">Step 2</text>
    <text x="247" y="95" class="flow-title">Sound Processor</text>
    <text x="247" y="118" class="flow-sub">Digital filter bank</text>
    <line x1="200" y1="135" x2="295" y2="135" stroke="${C_HAIRLINE}" stroke-width="1" />
    <text x="247" y="155" class="flow-energy">Electrical signal</text>
    <text x="247" y="172" class="flow-energy">&darr; digital codes</text>
  </g>

  <!-- Connector 2->3 -->
  <path d="M 310 120 L 335 120" stroke="${C_INK}" stroke-width="1.2" />
  <polygon points="335,117 342,120 335,123" fill="${C_INK}" />

  <!-- Step 3: Transmitter Coil -->
  <g class="implant-step-node" onclick="selectFlowStep(2)" tabindex="0" role="button">
    <rect x="345" y="45" width="110" height="150" class="flow-box" id="stepBox2" />
    <text x="400" y="70" class="flow-num">Step 3</text>
    <text x="400" y="95" class="flow-title">Transmitter Coil</text>
    <text x="400" y="118" class="flow-sub">Held by magnet</text>
    <line x1="358" y1="135" x2="442" y2="135" stroke="${C_HAIRLINE}" stroke-width="1" />
    <text x="400" y="155" class="flow-energy">Digital code</text>
    <text x="400" y="172" class="flow-energy">&darr; radio wave (RF)</text>
  </g>

  <!-- RF Wireless Link Across Skin -->
  <path d="M 458 110 C 468 105, 478 105, 488 110" fill="none" stroke="${C_CLAY}" stroke-width="1.5" />
  <path d="M 458 120 C 468 115, 478 115, 488 120" fill="none" stroke="${C_CLAY}" stroke-width="1.8" />
  <path d="M 458 130 C 468 125, 478 125, 488 130" fill="none" stroke="${C_CLAY}" stroke-width="1.5" />

  <!-- Step 4: Internal Receiver -->
  <g class="implant-step-node" onclick="selectFlowStep(3)" tabindex="0" role="button">
    <rect x="495" y="45" width="125" height="150" class="flow-box" id="stepBox3" />
    <text x="557" y="70" class="flow-num">Step 4</text>
    <text x="557" y="95" class="flow-title">Internal Receiver</text>
    <text x="557" y="118" class="flow-sub">Under the scalp</text>
    <line x1="510" y1="135" x2="605" y2="135" stroke="${C_HAIRLINE}" stroke-width="1" />
    <text x="557" y="155" class="flow-energy">Radio wave</text>
    <text x="557" y="172" class="flow-energy">&darr; electric pulses</text>
  </g>

  <!-- Connector 4->5 -->
  <path d="M 620 120 L 645 120" stroke="${C_INK}" stroke-width="1.2" />
  <polygon points="645,117 652,120 645,123" fill="${C_INK}" />

  <!-- Step 5: Electrode Array -->
  <g class="implant-step-node" onclick="selectFlowStep(4)" tabindex="0" role="button">
    <rect x="655" y="45" width="125" height="150" class="flow-box" id="stepBox4" />
    <text x="717" y="70" class="flow-num">Step 5</text>
    <text x="717" y="95" class="flow-title">Electrode Array</text>
    <text x="717" y="118" class="flow-sub">Inside the cochlea</text>
    <line x1="670" y1="135" x2="765" y2="135" stroke="${C_HAIRLINE}" stroke-width="1" />
    <text x="717" y="155" class="flow-energy">Current pulses</text>
    <text x="717" y="172" class="flow-energy">&darr; fluid conduction</text>
  </g>

  <!-- Connector 5->6 -->
  <path d="M 780 120 L 805 120" stroke="${C_INK}" stroke-width="1.2" />
  <polygon points="805,117 812,120 805,123" fill="${C_INK}" />

  <!-- Step 6: Auditory Nerve -->
  <g class="implant-step-node" onclick="selectFlowStep(5)" tabindex="0" role="button">
    <rect x="815" y="45" width="110" height="150" class="flow-box" id="stepBox5" />
    <text x="870" y="70" class="flow-num">Step 6</text>
    <text x="870" y="95" class="flow-title">Auditory Nerve</text>
    <text x="870" y="118" class="flow-sub">To the brain</text>
    <line x1="828" y1="135" x2="912" y2="135" stroke="${C_HAIRLINE}" stroke-width="1" />
    <text x="870" y="155" class="flow-energy">Action potentials</text>
    <text x="870" y="172" class="flow-energy">&darr; perceived sound</text>
  </g>
</svg>
`;
}

console.log('SVG templates built.');

// ----------------------------------------------------------------------------
// CSS STYLESHEET (Pure Flat Science Journal Design)
// ----------------------------------------------------------------------------
function getJournalStyles() {
  return `
:root {
  --paper: #F6F1E7;
  --sand: #EDE5D3;
  --ink: #2E2A26;
  --ink-muted: #6A635B;
  --hairline: #D8CFBF;
  
  --sage: #8FA68E;
  --sage-light: #E3EAE2;
  --clay: #C9805F;
  --clay-light: #F6EAE4;
  --blue: #8CA3B0;
  --blue-light: #E5EDF1;
  
  --font-serif: 'Newsreader', Georgia, serif;
  --font-sans: 'Source Sans 3', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', Courier, monospace;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 60px;
  background-color: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans);
  font-size: 17px;
  line-height: 1.68;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--paper);
  color: var(--ink);
  overflow-x: hidden;
}

/* Accessibility Focus States */
a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible {
  outline: 2px solid var(--clay);
  outline-offset: 2px;
}

/* Typography */
h1, h2, h3, h4 {
  font-family: var(--font-serif);
  color: var(--ink);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

h1 {
  font-size: clamp(2.8rem, 6vw, 4.2rem);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  font-weight: 500;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.45rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

p {
  color: var(--ink);
  font-size: 1.08rem;
  margin-bottom: 1.25rem;
  max-width: 68ch;
}

p.lead {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--ink);
}

.serif-italic {
  font-family: var(--font-serif);
  font-style: italic;
}

/* Pull quotes */
blockquote.pull-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.4rem;
  line-height: 1.45;
  color: var(--clay);
  border-left: 2px solid var(--clay);
  padding: 0.5rem 0 0.5rem 1.5rem;
  margin: 2rem 0;
  max-width: 58ch;
}

/* Plate / Figure Captions */
.figure-caption {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--ink-muted);
  line-height: 1.5;
  margin-top: 0.75rem;
}

.figure-caption strong {
  font-style: normal;
  font-weight: 600;
  color: var(--ink);
}

/* Hairline horizontal divider */
.hairline-divider {
  border: none;
  border-top: 1px solid var(--hairline);
  margin: 3.5rem 0;
}

/* Header & Sticky Top Bar */
.journal-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--paper);
  border-bottom: 1px solid var(--hairline);
  padding: 0 1.5rem;
  height: 58px;
  display: flex;
  align-items: center;
}

.header-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header-logo {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  letter-spacing: 0.02em;
}

.header-tagline-sub {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.9rem;
  color: var(--ink-muted);
  margin-left: 0.75rem;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  list-style: none;
}

.header-nav a {
  color: var(--ink-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.15s ease;
}

.header-nav a:hover, .header-nav a.active {
  color: var(--clay);
}

.header-cta-btn {
  background: var(--clay);
  color: var(--paper);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border-radius: 3px;
  border: 1px solid var(--clay);
  transition: background 0.15s ease;
}

.header-cta-btn:hover {
  background: #b56f4f;
}

/* Sections */
section {
  padding: 5rem 1.5rem;
  position: relative;
}

section.bg-sand {
  background-color: var(--sand);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

/* Two-column editorial layout with marginalia */
.editorial-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 3.5rem;
  align-items: start;
}

.margin-note {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.9rem;
  color: var(--ink-muted);
  line-height: 1.5;
  border-left: 1px solid var(--clay);
  padding-left: 1rem;
  margin-bottom: 1.5rem;
}

.margin-note strong {
  font-style: normal;
  color: var(--ink);
  display: block;
  margin-bottom: 0.25rem;
}

/* Buttons (Flat Journal Aesthetic) */
.btn {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.65rem 1.4rem;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: all 0.15s ease;
  line-height: 1.2;
}

.btn-primary {
  background-color: var(--clay);
  color: var(--paper);
  border: 1px solid var(--clay);
}

.btn-primary:hover {
  background-color: #b56f4f;
  border-color: #b56f4f;
}

.btn-secondary {
  background-color: transparent;
  color: var(--ink);
  border: 1px solid var(--ink);
}

.btn-secondary:hover {
  background-color: var(--sand);
}

.btn-sm {
  font-size: 0.85rem;
  padding: 0.4rem 0.85rem;
}

/* Slider Controls */
.slider-group {
  margin-bottom: 1.25rem;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.slider-val {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--clay);
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: var(--hairline);
  outline: none;
  border-radius: 2px;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--clay);
  border: 2px solid var(--paper);
  cursor: pointer;
}

input[type="range"].range-sage::-webkit-slider-thumb {
  background: var(--sage);
}

/* Wave type pills */
.pills-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.5rem 0 1rem;
}

.pill-item {
  background: transparent;
  border: 1px solid var(--hairline);
  color: var(--ink-muted);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.65rem;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pill-item:hover, .pill-item.active {
  background: var(--clay-light);
  border-color: var(--clay);
  color: var(--ink);
}

/* Canvases in Journal Aesthetic */
canvas.journal-canvas {
  width: 100%;
  background-color: var(--paper);
  border: 1px solid var(--hairline);
  display: block;
  border-radius: 2px;
}

/* Plate Box */
.plate-box {
  background: var(--paper);
  border: 1px solid var(--hairline);
  padding: 1.5rem;
  margin: 1.5rem 0;
  position: relative;
}

.plate-tag {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--clay);
  margin-bottom: 0.5rem;
}

/* Accessible Caption Notice */
.journal-caption-bar {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1050;
  background: var(--sand);
  border: 1px solid var(--hairline);
  padding: 0.6rem 1.25rem;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--ink);
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(46,42,38,0.08);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.journal-caption-bar.visible {
  opacity: 1;
  pointer-events: auto;
}

/* Audio Status Pill */
.audio-status-pill {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--ink-muted);
  background: transparent;
  border: 1px solid var(--hairline);
  padding: 0.25rem 0.6rem;
  border-radius: 3px;
  cursor: pointer;
}

.audio-status-pill:hover {
  border-color: var(--clay);
  color: var(--ink);
}

/* Simulator Split Grid */
.sim-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1.5rem 0;
}

.sim-source-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.sim-player-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
  margin: 1.5rem 0;
}

/* Experiment Game Options */
.game-opts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}

.game-opt-btn {
  background: var(--paper);
  border: 1px solid var(--hairline);
  color: var(--ink);
  padding: 0.75rem 1rem;
  text-align: left;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.game-opt-btn:hover {
  background: var(--sand);
  border-color: var(--ink);
}

.game-opt-btn.correct {
  background: var(--sage-light);
  border-color: var(--sage);
  color: var(--ink);
}

.game-opt-btn.wrong {
  background: var(--clay-light);
  border-color: var(--clay);
  color: var(--ink);
}

/* Takeaways 3 Columns */
.takeaways-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 2rem 0;
}

.takeaway-col {
  border-top: 2px solid var(--clay);
  padding-top: 1rem;
}

.takeaway-col.sage {
  border-top-color: var(--sage);
}

.takeaway-col.blue {
  border-top-color: var(--blue);
}

.takeaway-num {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.8rem;
  color: var(--ink-muted);
  line-height: 1;
  margin-bottom: 0.5rem;
}

/* Responsive */
@media (max-width: 900px) {
  .editorial-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .sim-grid {
    grid-template-columns: 1fr;
  }
  .takeaways-row {
    grid-template-columns: 1fr;
  }
  .header-nav {
    display: none;
  }
  .sim-player-bar {
    flex-direction: column;
    align-items: stretch;
  }
}
`;
}

console.log('Styles prepared.');

// ----------------------------------------------------------------------------
// CLIENT-SIDE JAVASCRIPT (Web Audio API, DSP Vocoder, Canvases, Interactions)
// Strict rule: Zero emojis in code, comments, or UI.
// ----------------------------------------------------------------------------
function getJournalScript() {
  return `
// Electric Ear — Printed Science Journal Edition
// Pure Web Audio API & Canvas Signal Processing
// Zero server dependencies. All computations execute locally in the browser.

let audioCtx = null;
let masterGain = null;
let micStream = null;
let micAnalyser = null;
let isMicActive = false;

// AudioContext initialization on first user interaction
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.85, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  updateAudioPill();
  return audioCtx;
}

function updateAudioPill() {
  const pill = document.getElementById('audioStatusPill');
  if (!pill) return;
  if (audioCtx && audioCtx.state === 'running') {
    pill.textContent = 'Audio active';
    pill.style.borderColor = 'var(--sage)';
    pill.style.color = 'var(--ink)';
  } else {
    pill.textContent = 'Click to enable audio';
  }
}

window.addEventListener('click', () => {
  if (!audioCtx || audioCtx.state === 'suspended') {
    getAudioContext();
  }
}, { once: false });

// Accessible live captions banner
let captionTimer = null;
function showCaption(text, durationMs = 3800) {
  const bar = document.getElementById('journalCaptionBar');
  const captionEl = document.getElementById('captionText');
  if (!bar || !captionEl) return;
  captionEl.textContent = text;
  bar.classList.add('visible');
  if (captionTimer) clearTimeout(captionTimer);
  captionTimer = setTimeout(() => {
    bar.classList.remove('visible');
  }, durationMs);
}

// ----------------------------------------------------------------------------
// DIGITAL SIGNAL PROCESSING: Biquad Filter Bank & Channel Vocoder
// Implementation based on Shannon et al. (1995) Science 270: 303-304
// ----------------------------------------------------------------------------

class BiquadFilter {
  constructor(b0, b1, b2, a1, a2) {
    this.b0 = b0; this.b1 = b1; this.b2 = b2;
    this.a1 = a1; this.a2 = a2;
    this.z1 = 0; this.z2 = 0;
  }
  reset() { this.z1 = 0; this.z2 = 0; }
  process(x) {
    const y = this.b0 * x + this.z1;
    this.z1 = this.b1 * x - this.a1 * y + this.z2;
    this.z2 = this.b2 * x - this.a2 * y;
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

// Shannon Channel Vocoder Engine
function runChannelVocoder(inputSamples, sampleRate, numChannels, bgNoiseRatio = 0) {
  const N = inputSamples.length;
  const fMin = 150;
  const fMax = Math.min(7500, sampleRate * 0.45);

  // Greenwood / Logarithmic frequency bands
  const edges = [];
  for (let i = 0; i <= numChannels; i++) {
    edges.push(fMin * Math.pow(fMax / fMin, i / numChannels));
  }

  // Pre-generate white noise carrier
  const whiteNoise = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    whiteNoise[i] = (Math.random() * 2 - 1);
  }

  const output = new Float32Array(N);

  for (let ch = 0; ch < numChannels; ch++) {
    const fLow = edges[ch];
    const fHigh = edges[ch + 1];

    // Analysis bandpass filter
    const analysisFilter = designBandpass(fLow, fHigh, sampleRate);
    // Envelope extractor: full-wave rectification + 160 Hz low-pass filter
    const envFilter = designLowpass(160, sampleRate, 0.7071);
    // Noise carrier synthesis bandpass filter
    const synthFilter = designBandpass(fLow, fHigh, sampleRate);

    for (let i = 0; i < N; i++) {
      const bandSignal = analysisFilter.process(inputSamples[i]);
      const rectified = Math.abs(bandSignal);
      const envelope = Math.max(0, envFilter.process(rectified));
      const noiseCarrier = synthFilter.process(whiteNoise[i]);
      output[i] += envelope * noiseCarrier;
    }
  }

  // Match root-mean-square (RMS) energy to original
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

// Convert Base64 WAV to AudioBuffer
async function decodeBase64Wav(b64String, ctx) {
  const byteChars = atob(b64String.split(',')[1]);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return await ctx.decodeAudioData(byteArray.buffer);
}

// Algorithmic Melody Synthesizer (Piano / Chime Timbre with Harmonics)
const NOTE = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25
};

const MELODIES = {
  odeToJoy: [
    [NOTE.E4, 1], [NOTE.E4, 1], [NOTE.F4, 1], [NOTE.G4, 1],
    [NOTE.G4, 1], [NOTE.F4, 1], [NOTE.E4, 1], [NOTE.D4, 1],
    [NOTE.C4, 1], [NOTE.C4, 1], [NOTE.D4, 1], [NOTE.E4, 1],
    [NOTE.E4, 1.5], [NOTE.D4, 0.5], [NOTE.D4, 2]
  ],
  twinkle: [
    [NOTE.C4, 1], [NOTE.C4, 1], [NOTE.G4, 1], [NOTE.G4, 1],
    [NOTE.A4, 1], [NOTE.A4, 1], [NOTE.G4, 2],
    [NOTE.F4, 1], [NOTE.F4, 1], [NOTE.E4, 1], [NOTE.E4, 1],
    [NOTE.D4, 1], [NOTE.D4, 1], [NOTE.C4, 2]
  ],
  birthday: [
    [NOTE.C4, 0.75], [NOTE.C4, 0.25], [NOTE.D4, 1], [NOTE.C4, 1], [NOTE.F4, 1], [NOTE.E4, 2],
    [NOTE.C4, 0.75], [NOTE.C4, 0.25], [NOTE.D4, 1], [NOTE.C4, 1], [NOTE.G4, 1], [NOTE.F4, 2]
  ]
};

function synthesizeMelodyBuffer(notes, tempo = 120, ctx) {
  const sampleRate = ctx.sampleRate || 44100;
  const beatSec = 60 / tempo;
  let totalSec = 0;
  notes.forEach(([f, dur]) => totalSec += dur * beatSec);
  totalSec += 0.5;

  const numSamples = Math.ceil(totalSec * sampleRate);
  const buffer = ctx.createBuffer(1, numSamples, sampleRate);
  const data = buffer.getChannelData(0);

  let currentSample = 0;
  for (const [freq, dur] of notes) {
    const noteSamples = Math.round(dur * beatSec * sampleRate);
    const noteSec = dur * beatSec;

    for (let i = 0; i < noteSamples; i++) {
      const t = i / sampleRate;
      const env = Math.min(1, t / 0.015) * Math.exp(-t * (2.2 / noteSec));
      let s = 0;
      if (freq > 0) {
        s += 0.60 * Math.sin(2 * Math.PI * freq * t);
        s += 0.25 * Math.sin(2 * Math.PI * (freq * 2) * t);
        s += 0.10 * Math.sin(2 * Math.PI * (freq * 3) * t);
        s += 0.05 * Math.sin(2 * Math.PI * (freq * 4) * t);
      }
      data[currentSample + i] += s * env * 0.45;
    }
    currentSample += noteSamples;
  }

  let max = 0;
  for (let i = 0; i < numSamples; i++) {
    if (Math.abs(data[i]) > max) max = Math.abs(data[i]);
  }
  if (max > 0.001) {
    for (let i = 0; i < numSamples; i++) data[i] = (data[i] / max) * 0.92;
  }
  return buffer;
}

// ----------------------------------------------------------------------------
// SECTION 2: WHAT IS SOUND (Oscilloscope & Live Spectrogram)
// ----------------------------------------------------------------------------
let toneOsc = null;
let toneGain = null;
let toneAnalyser = null;
let isTonePlaying = false;
let toneFreq = 440;
let toneAmp = 0.5;

let oscCanvas, oscCtx;
let specCanvas, specCtx;
let waveStudioAnimId = null;
let waveStudioTime = 0;

function initWaveStudio() {
  oscCanvas = document.getElementById('journalOscCanvas');
  specCanvas = document.getElementById('journalSpecCanvas');

  if (oscCanvas) oscCtx = oscCanvas.getContext('2d');
  if (specCanvas) specCtx = specCanvas.getContext('2d');

  function resizeWaveCanvases() {
    [oscCanvas, specCanvas].forEach(c => {
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.width = r.width * (window.devicePixelRatio || 1);
      c.height = r.height * (window.devicePixelRatio || 1);
    });
  }
  resizeWaveCanvases();
  window.addEventListener('resize', resizeWaveCanvases);

  const freqSlider = document.getElementById('waveFreqSlider');
  const ampSlider = document.getElementById('waveAmpSlider');

  if (freqSlider) {
    freqSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      toneFreq = Math.round(20 * Math.pow(4000 / 20, val / 100));
      updateWaveTelemetry();
      if (toneOsc && audioCtx) {
        toneOsc.frequency.setTargetAtTime(toneFreq, audioCtx.currentTime, 0.03);
      }
    });
  }

  if (ampSlider) {
    ampSlider.addEventListener('input', (e) => {
      toneAmp = parseFloat(e.target.value) / 100;
      updateWaveTelemetry();
      if (toneGain && audioCtx) {
        toneGain.gain.setTargetAtTime(toneAmp * 0.4, audioCtx.currentTime, 0.03);
      }
    });
  }

  updateWaveTelemetry();
  renderWaveStudio();
}

function updateWaveTelemetry() {
  const fEl = document.getElementById('waveFreqDisplay');
  const aEl = document.getElementById('waveAmpDisplay');
  const tEl = document.getElementById('wavePeriodDisplay');
  const lEl = document.getElementById('waveLambdaDisplay');

  if (fEl) fEl.textContent = toneFreq + ' Hz';
  if (aEl) aEl.textContent = Math.round(toneAmp * 100) + '%';
  if (tEl) tEl.textContent = (1000 / toneFreq).toFixed(2) + ' ms';

  const lambdaM = 343 / toneFreq;
  if (lEl) {
    lEl.textContent = lambdaM >= 1.0 ? lambdaM.toFixed(2) + ' m' : (lambdaM * 100).toFixed(1) + ' cm';
  }
}

function setTonePreset(f) {
  const slider = document.getElementById('waveFreqSlider');
  const pct = Math.max(0, Math.min(100, (Math.log(f / 20) / Math.log(4000 / 20)) * 100));
  if (slider) slider.value = pct;
  toneFreq = f;
  updateWaveTelemetry();
  if (toneOsc && audioCtx) {
    toneOsc.frequency.setTargetAtTime(toneFreq, audioCtx.currentTime, 0.03);
  }
}

function toggleTonePlayback() {
  const ctx = getAudioContext();
  const btn = document.getElementById('playWaveBtn');

  if (isTonePlaying) {
    if (toneGain) {
      toneGain.gain.setTargetAtTime(0, ctx.currentTime, 0.04);
      setTimeout(() => {
        if (toneOsc) { toneOsc.stop(); toneOsc.disconnect(); toneOsc = null; }
        isTonePlaying = false;
        if (btn) btn.textContent = 'Play Tone';
      }, 50);
    }
  } else {
    toneOsc = ctx.createOscillator();
    toneOsc.type = 'sine';
    toneOsc.frequency.setValueAtTime(toneFreq, ctx.currentTime);

    toneGain = ctx.createGain();
    toneGain.gain.setValueAtTime(0, ctx.currentTime);
    toneGain.gain.setTargetAtTime(toneAmp * 0.4, ctx.currentTime, 0.04);

    toneAnalyser = ctx.createAnalyser();
    toneAnalyser.fftSize = 512;
    toneAnalyser.smoothingTimeConstant = 0.85;

    toneOsc.connect(toneGain);
    toneGain.connect(toneAnalyser);
    toneGain.connect(masterGain);

    toneOsc.start();
    isTonePlaying = true;
    if (btn) btn.textContent = 'Stop Tone';
    showCaption('Playing pure sine tone at ' + toneFreq + ' Hz', 2800);
  }
}

async function enableLiveMic() {
  const statusEl = document.getElementById('micStatusMessage');
  const ctx = getAudioContext();
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = ctx.createMediaStreamSource(micStream);
    micAnalyser = ctx.createAnalyser();
    micAnalyser.fftSize = 512;
    micAnalyser.smoothingTimeConstant = 0.8;
    source.connect(micAnalyser);
    isMicActive = true;
    if (statusEl) {
      statusEl.textContent = 'Microphone active. Spectrogram is displaying live environmental sound.';
      statusEl.style.color = 'var(--sage)';
    }
    showCaption('Microphone active. Spectrogram is receiving live audio.', 3000);
  } catch (err) {
    isMicActive = false;
    if (statusEl) {
      statusEl.textContent = 'Microphone access was denied or is unavailable on this device. You can still test all frequency controls and tone synthesis above.';
      statusEl.style.color = 'var(--clay)';
    }
  }
}

function renderWaveStudio() {
  const dpr = window.devicePixelRatio || 1;

  // 1. Oscilloscope Canvas (Off-white paper background, charcoal ink wave)
  if (oscCtx && oscCanvas) {
    const w = oscCanvas.width;
    const h = oscCanvas.height;
    oscCtx.fillStyle = '#F6F1E7';
    oscCtx.fillRect(0, 0, w, h);

    // Baseline rule
    oscCtx.strokeStyle = '#D8CFBF';
    oscCtx.lineWidth = 1 * dpr;
    oscCtx.beginPath();
    oscCtx.moveTo(0, h / 2);
    oscCtx.lineTo(w, h / 2);
    oscCtx.stroke();

    // Wave trace
    oscCtx.strokeStyle = '#2E2A26';
    oscCtx.lineWidth = 1.8 * dpr;
    oscCtx.beginPath();

    const periods = Math.max(1, Math.min(8, toneFreq / 120));
    const k = (2 * Math.PI * periods) / w;
    const ampPx = (h / 2.6) * toneAmp;
    const speed = isTonePlaying ? waveStudioTime * 6 : waveStudioTime * 2;

    for (let x = 0; x < w; x += 2 * dpr) {
      const y = h / 2 - Math.sin(k * x - speed) * ampPx;
      if (x === 0) oscCtx.moveTo(x, y);
      else oscCtx.lineTo(x, y);
    }
    oscCtx.stroke();

    // Period dimension annotation
    if (ampPx > 10 * dpr) {
      const periodPx = (2 * Math.PI) / k;
      if (periodPx < w * 0.75) {
        oscCtx.strokeStyle = '#C9805F';
        oscCtx.lineWidth = 1 * dpr;
        oscCtx.beginPath();
        oscCtx.moveTo(30 * dpr, 20 * dpr);
        oscCtx.lineTo(30 * dpr + periodPx, 20 * dpr);
        oscCtx.moveTo(30 * dpr, 16 * dpr); oscCtx.lineTo(30 * dpr, 24 * dpr);
        oscCtx.moveTo(30 * dpr + periodPx, 16 * dpr); oscCtx.lineTo(30 * dpr + periodPx, 24 * dpr);
        oscCtx.stroke();

        oscCtx.fillStyle = '#C9805F';
        oscCtx.font = (10 * dpr) + 'px "Newsreader", Georgia, serif';
        oscCtx.fillText('Period T = ' + (1000 / toneFreq).toFixed(2) + ' ms', 35 * dpr, 14 * dpr);
      }
    }
  }

  // 2. Spectrogram Canvas (Paper aesthetic: Sand background, sage/clay density bars)
  if (specCtx && specCanvas) {
    const w = specCanvas.width;
    const h = specCanvas.height;
    specCtx.fillStyle = '#F6F1E7';
    specCtx.fillRect(0, 0, w, h);

    let activeAnalyser = isMicActive && micAnalyser ? micAnalyser : (isTonePlaying ? toneAnalyser : null);

    if (activeAnalyser) {
      const bufferLength = activeAnalyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      activeAnalyser.getByteFrequencyData(dataArray);

      const numBars = 54;
      const barWidth = (w / numBars) - (1.5 * dpr);

      for (let i = 0; i < numBars; i++) {
        const binIndex = Math.min(bufferLength - 1, Math.floor(Math.pow(i / numBars, 2) * bufferLength));
        const val = dataArray[binIndex];
        const barHeight = (val / 255) * (h - 22 * dpr);
        const x = i * (barWidth + 1.5 * dpr);
        const y = h - barHeight - 12 * dpr;

        specCtx.fillStyle = (i / numBars < 0.6) ? '#8FA68E' : '#C9805F';
        specCtx.fillRect(x, y, barWidth, barHeight);
      }
    } else {
      specCtx.fillStyle = '#6A635B';
      specCtx.font = (11 * dpr) + 'px "Newsreader", Georgia, serif';
      specCtx.fontStyle = 'italic';
      specCtx.textAlign = 'center';
      specCtx.fillText('Spectrogram idle. Play a tone above or enable the microphone.', w / 2, h / 2);
      specCtx.textAlign = 'left';
    }

    // Baseline frequency axis
    specCtx.strokeStyle = '#D8CFBF';
    specCtx.lineWidth = 1 * dpr;
    specCtx.beginPath();
    specCtx.moveTo(0, h - 12 * dpr);
    specCtx.lineTo(w, h - 12 * dpr);
    specCtx.stroke();

    specCtx.fillStyle = '#6A635B';
    specCtx.font = (9 * dpr) + 'px "JetBrains Mono", monospace';
    specCtx.fillText('100 Hz', 10 * dpr, h - 3 * dpr);
    specCtx.fillText('1 kHz', w * 0.48, h - 3 * dpr);
    specCtx.fillText('8 kHz', w - 45 * dpr, h - 3 * dpr);
  }

  waveStudioTime += 0.02;
  waveStudioAnimId = requestAnimationFrame(renderWaveStudio);
}

// ----------------------------------------------------------------------------
// SECTION 3: THE EAR AS A MACHINE & IMPEDANCE MATCHING
// ----------------------------------------------------------------------------
const EAR_PART_NOTES = {
  earPartEardrum: {
    name: 'Tympanic Membrane (Eardrum)',
    area: '55 mm²',
    job: 'A thin, cone-shaped sheet of fibrous tissue. Sound waves in air push against it, causing it to vibrate. Its broad surface collects sound energy and channels it onto the much smaller bones of the middle ear.'
  },
  earPartMalleus: {
    name: 'Malleus (Hammer)',
    area: 'Lever arm: 9 mm',
    job: 'The first of three auditory bones. Its handle is embedded in the center of the eardrum. As the eardrum moves, the malleus swings with it, transferring force to the anvil.'
  },
  earPartIncus: {
    name: 'Incus (Anvil)',
    area: 'Lever arm: 7 mm',
    job: 'Acts as the central pivot of the middle ear lever. Because its lever arm is slightly shorter than the hammer handle, it produces a mechanical force advantage of roughly 1.3 to 1.'
  },
  earPartStapes: {
    name: 'Stapes (Stirrup)',
    area: 'Footplate: 3.2 mm²',
    job: 'The smallest bone in the human body. Its base rests against the oval window of the cochlea. By concentrating force from the large eardrum onto this tiny surface, pressure increases by roughly 22 times.'
  },
  earPartCochlea: {
    name: 'Cochlea',
    area: 'Length: 35 mm',
    job: 'A fluid-filled snail shell that serves as the inner ear. Pressure waves set up fluid ripples that travel along the basilar membrane, sorting incoming sounds by frequency.'
  },
  earPartNerve: {
    name: 'Auditory Nerve',
    area: '~30,000 fibers',
    job: 'Cranial nerve VIII. Carries electrical nerve spikes generated by sensory hair cells (or an implant electrode array) directly to the auditory cortex of the brain.'
  }
};

function initEarMachine() {
  Object.keys(EAR_PART_NOTES).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => selectEarPart(id));
    }
  });
  initImpedanceCanvas();
}

function selectEarPart(id) {
  const data = EAR_PART_NOTES[id];
  if (!data) return;

  document.querySelectorAll('.ear-click-zone').forEach(z => z.classList.remove('active'));
  const clicked = document.getElementById(id);
  if (clicked) clicked.classList.add('active');

  const titleEl = document.getElementById('marginPartTitle');
  const areaEl = document.getElementById('marginPartArea');
  const jobEl = document.getElementById('marginPartJob');

  if (titleEl) titleEl.textContent = data.name;
  if (areaEl) areaEl.textContent = data.area;
  if (jobEl) jobEl.textContent = data.job;

  showCaption(data.name + ': ' + data.job, 3500);
}

// Impedance Matching Canvas (Fig. 3)
let impCanvas, impCtx;
let impTime = 0;
let impMode = 'matched'; // 'mismatched' or 'matched'

function initImpedanceCanvas() {
  impCanvas = document.getElementById('impedanceCanvas');
  if (!impCanvas) return;
  impCtx = impCanvas.getContext('2d');

  function resizeImp() {
    const r = impCanvas.getBoundingClientRect();
    impCanvas.width = r.width * (window.devicePixelRatio || 1);
    impCanvas.height = r.height * (window.devicePixelRatio || 1);
  }
  resizeImp();
  window.addEventListener('resize', resizeImp);

  renderImpedanceLoop();
}

function setImpedanceMode(mode) {
  impMode = mode;
  const btnNo = document.getElementById('btnImpNo');
  const btnYes = document.getElementById('btnImpYes');
  const textEl = document.getElementById('impedanceResultText');

  if (btnNo) btnNo.classList.toggle('active', mode === 'mismatched');
  if (btnYes) btnYes.classList.toggle('active', mode === 'matched');

  if (mode === 'mismatched') {
    if (textEl) {
      textEl.innerHTML = '<strong>Without the bone lever:</strong> 99.9% of acoustic energy reflects backwards off the dense fluid surface. Only 0.1% enters the fluid (-30 dB attenuation), making natural hearing virtually impossible.';
    }
    showCaption('Without middle ear: 99.9% of sound reflects back from fluid', 3500);
  } else {
    if (textEl) {
      textEl.innerHTML = '<strong>With the bone lever:</strong> The area ratio (55 mm² to 3.2 mm²) and mechanical lever boost pressure by 22 times (+27 dB). This matches the impedance and transmits roughly 80% of energy deep into the cochlear fluid.';
    }
    showCaption('With bone lever: 22x pressure boost matches impedance, transmitting 80% of sound', 3500);
  }
}

function renderImpedanceLoop() {
  if (!impCtx || !impCanvas) return;
  const w = impCanvas.width;
  const h = impCanvas.height;
  const dpr = window.devicePixelRatio || 1;
  const midX = w * 0.48;
  const midY = h / 2;

  impCtx.fillStyle = '#F6F1E7';
  impCtx.fillRect(0, 0, w, h);

  // Air region
  impCtx.fillStyle = '#F6F1E7';
  impCtx.fillRect(0, 0, midX, h);

  // Fluid region
  impCtx.fillStyle = '#EDE5D3';
  impCtx.fillRect(midX, 0, w - midX, h);

  // Boundary hairline
  impCtx.strokeStyle = '#2E2A26';
  impCtx.lineWidth = 1.2 * dpr;
  impCtx.beginPath();
  impCtx.moveTo(midX, 0);
  impCtx.lineTo(midX, h);
  impCtx.stroke();

  // Region Labels
  impCtx.font = (11 * dpr) + 'px "Newsreader", Georgia, serif';
  impCtx.fontStyle = 'italic';
  impCtx.fillStyle = '#6A635B';
  impCtx.fillText('Air medium (low impedance)', 20 * dpr, 25 * dpr);
  impCtx.fillText('Cochlear fluid (high impedance)', midX + 20 * dpr, 25 * dpr);

  const incidentAmp = 25 * dpr;

  if (impMode === 'mismatched') {
    // Incident wave traveling right
    impCtx.strokeStyle = '#2E2A26';
    impCtx.lineWidth = 1.5 * dpr;
    impCtx.beginPath();
    for (let x = 0; x <= midX; x += 2 * dpr) {
      const y = midY + Math.sin(x * 0.05 * dpr - impTime * 4) * incidentAmp;
      if (x === 0) impCtx.moveTo(x, y); else impCtx.lineTo(x, y);
    }
    impCtx.stroke();

    // Reflected wave (99.9% energy bouncing back left)
    impCtx.strokeStyle = '#C9805F';
    impCtx.lineWidth = 1.5 * dpr;
    impCtx.setLineDash([3 * dpr, 3 * dpr]);
    impCtx.beginPath();
    for (let x = 0; x <= midX; x += 2 * dpr) {
      const y = midY + Math.sin(x * 0.05 * dpr + impTime * 4) * (incidentAmp * 0.98);
      if (x === 0) impCtx.moveTo(x, y); else impCtx.lineTo(x, y);
    }
    impCtx.stroke();
    impCtx.setLineDash([]);

    // Transmitted wave in fluid (almost zero ripple)
    impCtx.strokeStyle = '#8FA68E';
    impCtx.lineWidth = 1 * dpr;
    impCtx.beginPath();
    for (let x = midX; x <= w; x += 2 * dpr) {
      const y = midY + Math.sin((x - midX) * 0.03 * dpr - impTime * 4) * (incidentAmp * 0.04);
      if (x === midX) impCtx.moveTo(x, y); else impCtx.lineTo(x, y);
    }
    impCtx.stroke();

    impCtx.fillStyle = '#C9805F';
    impCtx.font = (10 * dpr) + 'px "JetBrains Mono", monospace';
    impCtx.fillText('99.9% reflected', 20 * dpr, h - 15 * dpr);
    impCtx.fillStyle = '#6A635B';
    impCtx.fillText('0.1% transmitted (silent)', midX + 20 * dpr, h - 15 * dpr);

  } else {
    // Matched with bone lever
    const leverAngle = Math.sin(impTime * 4) * 0.16;
    const leverX = midX - 8 * dpr;

    // Incoming wave
    impCtx.strokeStyle = '#2E2A26';
    impCtx.lineWidth = 1.5 * dpr;
    impCtx.beginPath();
    for (let x = 0; x <= leverX; x += 2 * dpr) {
      const y = midY + Math.sin(x * 0.05 * dpr - impTime * 4) * incidentAmp;
      if (x === 0) impCtx.moveTo(x, y); else impCtx.lineTo(x, y);
    }
    impCtx.stroke();

    // Lever arm
    impCtx.save();
    impCtx.translate(leverX, midY);
    impCtx.rotate(leverAngle);
    impCtx.fillStyle = '#2E2A26';
    impCtx.fillRect(-3 * dpr, -35 * dpr, 6 * dpr, 70 * dpr);
    impCtx.restore();

    // Stapes piston
    const pistonX = midX + Math.sin(impTime * 4) * 6 * dpr;
    impCtx.fillStyle = '#C9805F';
    impCtx.fillRect(pistonX - 4 * dpr, midY - 18 * dpr, 8 * dpr, 36 * dpr);

    // Deep fluid wave transmitted
    impCtx.strokeStyle = '#8FA68E';
    impCtx.lineWidth = 2.2 * dpr;
    impCtx.beginPath();
    for (let x = midX; x <= w; x += 2 * dpr) {
      const y = midY + Math.sin((x - midX) * 0.04 * dpr - impTime * 4) * (incidentAmp * 0.82);
      if (x === midX) impCtx.moveTo(x, y); else impCtx.lineTo(x, y);
    }
    impCtx.stroke();

    impCtx.fillStyle = '#8FA68E';
    impCtx.font = (10 * dpr) + 'px "JetBrains Mono", monospace';
    impCtx.fillText('22x pressure multiplier (+27 dB)', midX + 20 * dpr, 45 * dpr);
    impCtx.fillText('~80% transmitted into cochlea', midX + 20 * dpr, h - 15 * dpr);
  }

  impTime += 0.02;
  requestAnimationFrame(renderImpedanceLoop);
}

// ----------------------------------------------------------------------------
// SECTION 4: THE COCHLEA AS A FREQUENCY ANALYZER
// ----------------------------------------------------------------------------
let cochleaCanvas, cochleaCtx;
let cochleaFreq = 1000;
let cochleaOsc = null;
let isCochleaPitchPlaying = false;
let cochleaTime = 0;

function freqToCochleaPosition(freq) {
  const f = Math.max(20, Math.min(20000, freq));
  const x = 35 - (1 / 0.06) * Math.log10(f / 165.4 + 0.88);
  return Math.max(0, Math.min(35, x));
}

function initCochleaAnalyzer() {
  cochleaCanvas = document.getElementById('journalCochleaCanvas');
  if (!cochleaCanvas) return;
  cochleaCtx = cochleaCanvas.getContext('2d');

  function resizeCochlea() {
    const r = cochleaCanvas.getBoundingClientRect();
    cochleaCanvas.width = r.width * (window.devicePixelRatio || 1);
    cochleaCanvas.height = r.height * (window.devicePixelRatio || 1);
  }
  resizeCochlea();
  window.addEventListener('resize', resizeCochlea);

  const slider = document.getElementById('cochleaPitchSlider');
  if (slider) {
    slider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      cochleaFreq = Math.round(100 * Math.pow(12000 / 100, val / 100));
      updateCochleaReadouts();
      if (cochleaOsc && audioCtx) {
        cochleaOsc.frequency.setTargetAtTime(cochleaFreq, audioCtx.currentTime, 0.03);
      }
    });
  }

  updateCochleaReadouts();
  renderCochleaLoop();
}

function updateCochleaReadouts() {
  const posMm = freqToCochleaPosition(cochleaFreq);
  const fEl = document.getElementById('cochleaFreqText');
  const posEl = document.getElementById('cochleaPosText');
  const descEl = document.getElementById('cochleaResonanceDesc');

  if (fEl) fEl.textContent = cochleaFreq + ' Hz';
  if (posEl) posEl.textContent = posMm.toFixed(1) + ' mm from base (' + ((posMm / 35) * 100).toFixed(0) + '%)';

  if (descEl) {
    if (cochleaFreq > 4000) {
      descEl.textContent = 'High pitches resonate near the entrance (base) where the membrane is narrow and 100 times stiffer.';
    } else if (cochleaFreq > 600) {
      descEl.textContent = 'Speech formant frequencies resonate along the middle turns of the membrane.';
    } else {
      descEl.textContent = 'Low bass pitches travel all the way to the tip (apex) where the membrane is five times wider and flexible.';
    }
  }
}

function setCochleaPreset(f) {
  const slider = document.getElementById('cochleaPitchSlider');
  const pct = Math.max(0, Math.min(100, (Math.log(f / 100) / Math.log(12000 / 100)) * 100));
  if (slider) slider.value = pct;
  cochleaFreq = f;
  updateCochleaReadouts();
  if (cochleaOsc && audioCtx) {
    cochleaOsc.frequency.setTargetAtTime(cochleaFreq, audioCtx.currentTime, 0.03);
  }
}

function toggleCochleaPitch() {
  const ctx = getAudioContext();
  const btn = document.getElementById('playCochleaBtn');

  if (isCochleaPitchPlaying) {
    if (cochleaOsc) {
      cochleaOsc.stop();
      cochleaOsc.disconnect();
      cochleaOsc = null;
    }
    isCochleaPitchPlaying = false;
    if (btn) btn.textContent = 'Play Pitch';
  } else {
    cochleaOsc = ctx.createOscillator();
    cochleaOsc.type = 'sine';
    cochleaOsc.frequency.setValueAtTime(cochleaFreq, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);

    cochleaOsc.connect(gain);
    gain.connect(masterGain);

    cochleaOsc.start();
    isCochleaPitchPlaying = true;
    if (btn) btn.textContent = 'Stop Pitch';
    showCaption('Sounding ' + cochleaFreq + ' Hz tone on basilar membrane', 2800);
  }
}

function renderCochleaLoop() {
  if (!cochleaCtx || !cochleaCanvas) return;
  const w = cochleaCanvas.width;
  const h = cochleaCanvas.height;
  const dpr = window.devicePixelRatio || 1;

  cochleaCtx.fillStyle = '#F6F1E7';
  cochleaCtx.fillRect(0, 0, w, h);

  const startX = 60 * dpr;
  const endX = w - 60 * dpr;
  const membraneLen = endX - startX;
  const midY = h * 0.46;

  // Tapered basilar membrane (narrow at base, wide at apex)
  const baseW = 10 * dpr;
  const apexW = 34 * dpr;

  cochleaCtx.beginPath();
  cochleaCtx.moveTo(startX, midY - baseW);
  cochleaCtx.lineTo(endX, midY - apexW);
  cochleaCtx.lineTo(endX, midY + apexW);
  cochleaCtx.lineTo(startX, midY + baseW);
  cochleaCtx.closePath();
  cochleaCtx.fillStyle = '#EDE5D3';
  cochleaCtx.fill();
  cochleaCtx.strokeStyle = '#2E2A26';
  cochleaCtx.lineWidth = 1.2 * dpr;
  cochleaCtx.stroke();

  // Frequency ticks
  const markers = [
    { f: 16000, label: '16 kHz' },
    { f: 8000, label: '8 kHz' },
    { f: 4000, label: '4 kHz' },
    { f: 2000, label: '2 kHz' },
    { f: 1000, label: '1 kHz' },
    { f: 500, label: '500 Hz' },
    { f: 200, label: '200 Hz' }
  ];

  cochleaCtx.font = (9 * dpr) + 'px "JetBrains Mono", monospace';
  cochleaCtx.fillStyle = '#6A635B';
  markers.forEach(m => {
    const posMm = freqToCochleaPosition(m.f);
    const mx = startX + (posMm / 35) * membraneLen;
    cochleaCtx.beginPath();
    cochleaCtx.moveTo(mx, midY + 40 * dpr);
    cochleaCtx.lineTo(mx, midY + 46 * dpr);
    cochleaCtx.strokeStyle = '#D8CFBF';
    cochleaCtx.stroke();
    cochleaCtx.textAlign = 'center';
    cochleaCtx.fillText(m.label, mx, midY + 58 * dpr);
  });
  cochleaCtx.textAlign = 'left';

  // Base and Apex labels
  cochleaCtx.font = (11 * dpr) + 'px "Newsreader", Georgia, serif';
  cochleaCtx.fontStyle = 'italic';
  cochleaCtx.fillStyle = '#2E2A26';
  cochleaCtx.fillText('Base (0 mm) — Narrow & Stiff', startX, midY - 45 * dpr);
  cochleaCtx.textAlign = 'right';
  cochleaCtx.fillText('Apex (35 mm) — Wide & Floppy', endX, midY - 45 * dpr);
  cochleaCtx.textAlign = 'left';

  // Active resonance position
  const activePosMm = freqToCochleaPosition(cochleaFreq);
  const activeX = startX + (activePosMm / 35) * membraneLen;

  // Traveling wave simulation
  cochleaCtx.strokeStyle = '#2E2A26';
  cochleaCtx.lineWidth = 1.6 * dpr;
  cochleaCtx.beginPath();

  for (let x = startX; x <= endX; x += 2 * dpr) {
    const distFromBase = x - startX;
    const norm = (x - startX) / (activeX - startX + 0.001);

    let env = 0;
    if (x <= activeX) {
      env = Math.pow(norm, 2.2);
    } else {
      const decay = (x - activeX) / (25 * dpr);
      env = Math.max(0, 1 - decay * 1.6);
    }

    const waveK = 0.06 * dpr;
    const waveY = Math.sin(waveK * distFromBase - cochleaTime * 6) * (24 * dpr) * env;
    const py = midY + waveY;

    if (x === startX) cochleaCtx.moveTo(x, py);
    else cochleaCtx.lineTo(x, py);
  }
  cochleaCtx.stroke();

  // Resonant marker line
  cochleaCtx.strokeStyle = '#C9805F';
  cochleaCtx.lineWidth = 1.5 * dpr;
  cochleaCtx.setLineDash([3 * dpr, 3 * dpr]);
  cochleaCtx.beginPath();
  cochleaCtx.moveTo(activeX, midY - 38 * dpr);
  cochleaCtx.lineTo(activeX, midY + 38 * dpr);
  cochleaCtx.stroke();
  cochleaCtx.setLineDash([]);

  // Resonant spot circle
  cochleaCtx.beginPath();
  cochleaCtx.arc(activeX, midY, 5 * dpr, 0, 2 * Math.PI);
  cochleaCtx.fillStyle = '#C9805F';
  cochleaCtx.fill();

  cochleaTime += 0.02;
  requestAnimationFrame(renderCochleaLoop);
}

// ----------------------------------------------------------------------------
// SECTION 5: WHEN HEARING BREAKS (Comparison Demos)
// ----------------------------------------------------------------------------
let demoSource = null;

async function playBrokenHearingDemo(type) {
  const ctx = getAudioContext();
  if (demoSource) {
    try { demoSource.stop(); } catch(e){}
    demoSource = null;
  }

  const rawBuf = await decodeBase64Wav(speechData.sim_sample1, ctx);
  const rawData = rawBuf.getChannelData(0);
  const N = rawData.length;
  const fs = rawBuf.sampleRate;

  let processedData;
  if (type === 'aid-broken') {
    processedData = new Float32Array(N);
    const lp = designLowpass(850, fs, 0.7071);
    for (let i = 0; i < N; i++) {
      const filtered = lp.process(rawData[i]);
      const amplified = filtered * 3.5;
      const clipped = Math.tanh(amplified * 2.0) * 0.7;
      processedData[i] = clipped + (Math.random() * 2 - 1) * 0.04;
    }
    showCaption('Simulating hearing aid on damaged hair cells: loud, distorted, unintelligible.', 4000);
  } else {
    processedData = runChannelVocoder(rawData, fs, 8, 0);
    showCaption('Simulating cochlear implant: electrical pulses bypass hair cells to stimulate nerve.', 4000);
  }

  const outBuf = ctx.createBuffer(1, N, fs);
  outBuf.copyToChannel(processedData, 0);

  demoSource = ctx.createBufferSource();
  demoSource.buffer = outBuf;
  demoSource.connect(masterGain);
  demoSource.start();
}

// ----------------------------------------------------------------------------
// SECTION 6: INSIDE AN IMPLANT (Signal Flow Interaction)
// ----------------------------------------------------------------------------
const FLOW_STEP_DESCRIPTIONS = [
  {
    title: '1. Dual Microphones',
    form: 'Sound waves in air &rarr; analog electrical voltage',
    details: 'Small microphones mounted in the external processor pick up acoustic pressure vibrations in the air.'
  },
  {
    title: '2. Sound Processor',
    form: 'Analog electrical signal &rarr; digital code',
    details: 'A microchip divides the sound into frequency channels, extracts the amplitude envelope of each band, and encodes it into digital instructions.'
  },
  {
    title: '3. Transmitter Coil',
    form: 'Digital instructions &rarr; radio waves (RF)',
    details: 'Held against the head with a magnet, the coil beams both power and data wirelessly through unbroken skin using high-frequency magnetic induction.'
  },
  {
    title: '4. Internal Receiver',
    form: 'Radio waves &rarr; electrical current pulses',
    details: 'Hermetically sealed in a titanium case beneath the scalp, the receiver harvests DC power and converts the radio signals into microsecond electric pulses.'
  },
  {
    title: '5. Electrode Array',
    form: 'Electrical pulses &rarr; fluid conduction in cochlea',
    details: 'A flexible silicone strip carrying 12 to 22 platinum rings sits inside the fluid-filled scala tympani, sending charge-balanced currents through the fluid.'
  },
  {
    title: '6. Auditory Nerve',
    form: 'Fluid currents &rarr; neural action potentials',
    details: 'The electric currents directly trigger action potentials in the spiral ganglion neurons of cranial nerve VIII, carrying signals to the brain.'
  }
];

function selectFlowStep(idx) {
  document.querySelectorAll('.flow-box').forEach((box, i) => {
    box.classList.toggle('active', i === idx);
  });

  const data = FLOW_STEP_DESCRIPTIONS[idx];
  if (!data) return;

  const descBox = document.getElementById('flowStepDetailBox');
  if (descBox) {
    descBox.innerHTML = '<strong>' + data.title + '</strong><br>' +
      '<span style="font-family:var(--font-mono); font-size:0.85rem; color:var(--clay);">' + data.form + '</span><br>' +
      '<span style="font-size:0.95rem; color:var(--ink);">' + data.details + '</span>';
  }

  showCaption(data.title + ': ' + data.form.replace(/&rarr;/g, '→'), 3000);
}

// ----------------------------------------------------------------------------
// SECTION 7: THE SIMULATOR (Core Feature)
// ----------------------------------------------------------------------------
let simAudioBuffer = null;
let simVocodedBuffer = null;
let simActiveSource = null;
let simIsPlaying = false;
let simPlayingType = null;
let simStartTime = 0;
let simPauseOffset = 0;
let simAnimId = null;

let simChannels = 8;
let simBgNoise = 0.0;
let simCurrentPreset = 'sim_sample1';

let specOrigCanvas, specOrigCtx;
let specVocCanvas, specVocCtx;
let origSpectrogramData = null;
let vocSpectrogramData = null;

async function initSimulator() {
  specOrigCanvas = document.getElementById('journalSimOrigCanvas');
  specVocCanvas = document.getElementById('journalSimVocCanvas');

  if (specOrigCanvas) specOrigCtx = specOrigCanvas.getContext('2d');
  if (specVocCanvas) specVocCtx = specVocCanvas.getContext('2d');

  function resizeSim() {
    [specOrigCanvas, specVocCanvas].forEach(c => {
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.width = r.width * (window.devicePixelRatio || 1);
      c.height = r.height * (window.devicePixelRatio || 1);
    });
    drawStaticSpectrograms(0);
  }
  resizeSim();
  window.addEventListener('resize', resizeSim);

  const chSlider = document.getElementById('simChSlider');
  if (chSlider) {
    chSlider.addEventListener('input', (e) => {
      simChannels = parseInt(e.target.value);
      updateSimControlsDisplay();
      reprocessSimulatorAudio();
    });
  }

  const noiseSlider = document.getElementById('simNoiseSlider');
  if (noiseSlider) {
    noiseSlider.addEventListener('input', (e) => {
      simBgNoise = parseFloat(e.target.value) / 100;
      const nReadout = document.getElementById('simNoiseText');
      if (nReadout) {
        nReadout.textContent = simBgNoise > 0 ? Math.round(simBgNoise * 100) + '% noise' : 'Clean (no noise)';
      }
      reprocessSimulatorAudio();
    });
  }

  const scrubber = document.getElementById('simScrubber');
  if (scrubber) {
    scrubber.addEventListener('input', (e) => {
      if (simAudioBuffer) {
        simPauseOffset = (parseFloat(e.target.value) / 100) * simAudioBuffer.duration;
        if (simIsPlaying) {
          playSimulatorAudio(simPlayingType, simPauseOffset);
        } else {
          updateScrubberDisplay();
          drawStaticSpectrograms(simPauseOffset / simAudioBuffer.duration);
        }
      }
    });
  }

  const fileInput = document.getElementById('simFileInput');
  if (fileInput) {
    fileInput.addEventListener('change', handleAudioFileUpload);
  }

  await loadSimulatorPreset('sim_sample1');
}

function updateSimControlsDisplay() {
  const chText = document.getElementById('simChText');
  const chNote = document.getElementById('simChNote');
  if (chText) chText.textContent = simChannels + ' Channels';

  if (chNote) {
    if (simChannels === 1) chNote.textContent = '1 Channel: Only rhythm and speech cadence. Unintelligible.';
    else if (simChannels <= 2) chNote.textContent = '2 Channels: Vowel cadence heard, but consonants are smeared.';
    else if (simChannels <= 4) chNote.textContent = '4 Channels: Rough speech contours. Some sentences recognized.';
    else if (simChannels <= 8) chNote.textContent = '8 Channels: High speech intelligibility threshold.';
    else if (simChannels <= 16) chNote.textContent = '16 Channels: Clear speech and natural rhythm.';
    else chNote.textContent = simChannels + ' Channels: High spectral resolution.';
  }
}

function setSimChannelPreset(ch) {
  const slider = document.getElementById('simChSlider');
  if (slider) slider.value = ch;
  simChannels = ch;
  updateSimControlsDisplay();
  reprocessSimulatorAudio();
}

async function loadSimulatorPreset(key) {
  const ctx = getAudioContext();
  simCurrentPreset = key;

  document.querySelectorAll('.sim-preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === key);
  });

  if (key.startsWith('melody_')) {
    const melodyKey = key.replace('melody_', '');
    const notes = MELODIES[melodyKey];
    simAudioBuffer = synthesizeMelodyBuffer(notes, 125, ctx);
  } else if (speechData[key]) {
    simAudioBuffer = await decodeBase64Wav(speechData[key], ctx);
  }

  reprocessSimulatorAudio();
}

function reprocessSimulatorAudio() {
  if (!simAudioBuffer) return;
  const ctx = getAudioContext();
  const inputData = simAudioBuffer.getChannelData(0);
  const fs = simAudioBuffer.sampleRate;

  const vocodedData = runChannelVocoder(inputData, fs, simChannels, simBgNoise);

  simVocodedBuffer = ctx.createBuffer(1, vocodedData.length, fs);
  simVocodedBuffer.copyToChannel(vocodedData, 0);

  origSpectrogramData = computeSpectrogramMatrix(inputData, fs);
  vocSpectrogramData = computeSpectrogramMatrix(vocodedData, fs);

  drawStaticSpectrograms(0);
}

function computeSpectrogramMatrix(samples, fs, winSize = 256, hopSize = 128) {
  const numFrames = Math.floor((samples.length - winSize) / hopSize);
  const matrix = [];
  const numBins = winSize / 2;

  const hann = new Float32Array(winSize);
  for (let i = 0; i < winSize; i++) {
    hann[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / winSize));
  }

  for (let f = 0; f < numFrames; f++) {
    const start = f * hopSize;
    const real = new Float32Array(numBins);

    for (let k = 0; k < numBins; k++) {
      let r = 0;
      let im = 0;
      const omega = (2 * Math.PI * k) / winSize;
      for (let n = 0; n < winSize; n += 2) {
        const val = samples[start + n] * hann[n];
        r += val * Math.cos(omega * n);
        im -= val * Math.sin(omega * n);
      }
      real[k] = Math.sqrt(r * r + im * im);
    }
    matrix.push(real);
  }
  return matrix;
}

function drawStaticSpectrograms(playheadRatio = 0) {
  const dpr = window.devicePixelRatio || 1;
  if (specOrigCtx && specOrigCanvas && origSpectrogramData) {
    drawJournalSpectrogram(specOrigCtx, specOrigCanvas, origSpectrogramData, playheadRatio, '#8FA68E');
  }
  if (specVocCtx && specVocCanvas && vocSpectrogramData) {
    drawJournalSpectrogram(specVocCtx, specVocCanvas, vocSpectrogramData, playheadRatio, '#C9805F');
  }
}

// Printed journal spectrogram renderer: Off-white paper background, sage/clay density marks
function drawJournalSpectrogram(ctx, canvas, matrix, playheadRatio, tintColor) {
  const w = canvas.width;
  const h = canvas.height;
  const dpr = window.devicePixelRatio || 1;

  ctx.fillStyle = '#F6F1E7';
  ctx.fillRect(0, 0, w, h);

  if (!matrix || matrix.length === 0) return;

  const numCols = matrix.length;
  const numBins = matrix[0].length;
  const colWidth = w / numCols;

  for (let c = 0; c < numCols; c++) {
    const col = matrix[c];
    const x = c * colWidth;

    for (let b = 0; b < numBins; b++) {
      const mag = col[b];
      const intensity = Math.min(1.0, Math.log10(1 + mag * 15) * 1.2);
      if (intensity < 0.05) continue;

      const y = h - (b / numBins) * h;
      const binH = Math.max(1, h / numBins);

      if (tintColor === '#8FA68E') {
        ctx.fillStyle = 'rgba(143, 166, 142, ' + (intensity * 0.9) + ')';
      } else {
        ctx.fillStyle = 'rgba(201, 128, 95, ' + (intensity * 0.9) + ')';
      }
      ctx.fillRect(x, y - binH, colWidth + 0.5, binH + 0.5);
    }
  }

  // Thin playhead rule
  if (playheadRatio > 0 && playheadRatio <= 1.0) {
    const px = playheadRatio * w;
    ctx.strokeStyle = '#2E2A26';
    ctx.lineWidth = 1.5 * dpr;
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, h);
    ctx.stroke();
  }
}

function playSimulatorAudio(type, startOffset = 0) {
  const ctx = getAudioContext();
  stopSimulatorAudio();

  const bufferToPlay = (type === 'orig') ? simAudioBuffer : simVocodedBuffer;
  if (!bufferToPlay) return;

  simActiveSource = ctx.createBufferSource();
  simActiveSource.buffer = bufferToPlay;
  simActiveSource.connect(masterGain);

  simPlayingType = type;
  simIsPlaying = true;
  simStartTime = ctx.currentTime - startOffset;

  simActiveSource.start(0, startOffset);

  const origBtn = document.getElementById('btnSimOrig');
  const vocBtn = document.getElementById('btnSimVoc');
  if (type === 'orig') {
    if (origBtn) origBtn.classList.add('btn-primary');
    if (vocBtn) vocBtn.classList.remove('btn-primary');
    showCaption('Playing original audio (unaltered acoustic speech)', 3000);
  } else {
    if (vocBtn) vocBtn.classList.add('btn-primary');
    if (origBtn) origBtn.classList.remove('btn-primary');
    showCaption('Playing simulated implant (' + simChannels + ' channels)', 3000);
  }

  simActiveSource.onended = () => {
    stopSimulatorAudio();
  };

  trackSimulatorPlayback();
}

function stopSimulatorAudio() {
  if (simActiveSource) {
    try { simActiveSource.stop(); } catch(e){}
    simActiveSource = null;
  }
  simIsPlaying = false;
  simPlayingType = null;
  if (simAnimId) cancelAnimationFrame(simAnimId);

  const origBtn = document.getElementById('btnSimOrig');
  const vocBtn = document.getElementById('btnSimVoc');
  if (origBtn) origBtn.classList.remove('btn-primary');
  if (vocBtn) vocBtn.classList.remove('btn-primary');

  drawStaticSpectrograms(0);
}

function trackSimulatorPlayback() {
  if (!simIsPlaying || !simAudioBuffer || !audioCtx) return;
  const elapsed = audioCtx.currentTime - simStartTime;
  const dur = simAudioBuffer.duration;
  const ratio = Math.min(1.0, elapsed / dur);

  updateScrubberDisplay(ratio, elapsed, dur);
  drawStaticSpectrograms(ratio);

  if (ratio < 1.0) {
    simAnimId = requestAnimationFrame(trackSimulatorPlayback);
  }
}

function updateScrubberDisplay(ratio = 0, currentSec = 0, totalSec = 0) {
  const scrubber = document.getElementById('simScrubber');
  const readout = document.getElementById('simTimeText');
  if (scrubber && ratio !== undefined) {
    scrubber.value = ratio * 100;
  }
  if (readout) {
    const curStr = currentSec.toFixed(1);
    const totStr = totalSec > 0 ? totalSec.toFixed(1) : (simAudioBuffer ? simAudioBuffer.duration.toFixed(1) : '0.0');
    readout.textContent = curStr + 's / ' + totStr + 's';
  }
}

// User Voice Recording (3 Seconds)
let mediaRecorder = null;
let recordedChunks = [];
let isRecordingUser = false;

async function recordUserVoice() {
  const ctx = getAudioContext();
  const recBtn = document.getElementById('btnSimRecord');
  if (isRecordingUser) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(recordedChunks, { type: 'audio/webm' });
      const arrayBuffer = await blob.arrayBuffer();
      simAudioBuffer = await ctx.decodeAudioData(arrayBuffer);
      stream.getTracks().forEach(t => t.stop());

      if (recBtn) recBtn.textContent = 'Record voice (3s)';
      isRecordingUser = false;
      showCaption('Voice recorded successfully. Ready to process.', 3000);
      reprocessSimulatorAudio();
    };

    mediaRecorder.start();
    isRecordingUser = true;
    if (recBtn) recBtn.textContent = 'Recording (3s)... speak now';
    showCaption('Recording 3 seconds of voice. Speak plainly into your microphone.', 3000);

    setTimeout(() => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    }, 3000);

  } catch (err) {
    showCaption('Microphone access unavailable or denied. Please use the built-in samples.', 4000);
  }
}

async function handleAudioFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const ctx = getAudioContext();
  const arrayBuffer = await file.arrayBuffer();
  try {
    simAudioBuffer = await ctx.decodeAudioData(arrayBuffer);
    showCaption('Loaded file: ' + file.name, 3000);
    reprocessSimulatorAudio();
  } catch (err) {
    showCaption('Could not decode file. Please use a standard WAV or MP3 audio file.', 4000);
  }
}

// ----------------------------------------------------------------------------
// SECTION 8: THE EXPERIMENT ("How many channels do you need?")
// ----------------------------------------------------------------------------
const EXPERIMENT_DATA = [
  {
    round: 1,
    channels: 2,
    key: 'exp_sent1',
    sentence: 'The silver moon shines brightly in the night sky.',
    options: [
      'The silver moon shines brightly in the night sky.',
      'The river pool runs quietly through the dark night.',
      'A winter breeze is blowing across the mountains.',
      'The city street is noisy during the morning rush.'
    ],
    note: 'With 2 channels, vowel rhythms are preserved, but consonants are heavily blurred.'
  },
  {
    round: 2,
    channels: 4,
    key: 'exp_sent2',
    sentence: 'Fresh coffee is brewing downstairs in the kitchen.',
    options: [
      'Hot water is pouring slowly into the teapot.',
      'Fresh coffee is brewing downstairs in the kitchen.',
      'Ten apples are baking quietly inside the oven.',
      'A neighbor is walking quickly toward the station.'
    ],
    note: 'With 4 channels, general vowel patterns emerge, though several words remain ambiguous.'
  },
  {
    round: 3,
    channels: 8,
    key: 'exp_sent3',
    sentence: 'Science unlocks the deep mysteries of the universe.',
    options: [
      'Silence covers the ancient stones of the monument.',
      'Students examine the small details of the crystal.',
      'Science unlocks the deep mysteries of the universe.',
      'Shadows lengthen along the boundary of the forest.'
    ],
    note: 'At 8 channels, sentence comprehension rises dramatically, often above 80 percent.'
  },
  {
    round: 4,
    channels: 16,
    key: 'exp_sent4',
    sentence: 'The river flows gently through the quiet green valley.',
    options: [
      'The river flows gently through the quiet green valley.',
      'A traveler walks quickly toward the distant village.',
      'The mirror hangs crookedly upon the bedroom wall.',
      'Cold rain falls steadily into the empty garden.'
    ],
    note: 'At 16 channels, speech is clear and easy to understand.'
  }
];

let expRound = 0;
let userExpScores = {};
let expAudioSource = null;
let expChartCanvas, expChartCtx;

function initExperiment() {
  expChartCanvas = document.getElementById('journalExpCanvas');
  if (expChartCanvas) expChartCtx = expChartCanvas.getContext('2d');

  function resizeExpChart() {
    if (!expChartCanvas) return;
    const r = expChartCanvas.getBoundingClientRect();
    expChartCanvas.width = r.width * (window.devicePixelRatio || 1);
    expChartCanvas.height = r.height * (window.devicePixelRatio || 1);
    renderExperimentChart();
  }
  resizeExpChart();
  window.addEventListener('resize', resizeExpChart);

  loadExperimentRound(0);
}

function loadExperimentRound(idx) {
  expRound = idx;
  const rData = EXPERIMENT_DATA[idx];
  if (!rData) return;

  const roundNumEl = document.getElementById('expRoundNum');
  const chBadgeEl = document.getElementById('expChBadge');
  const noteEl = document.getElementById('expRoundNote');
  const optsContainer = document.getElementById('expOptionsContainer');
  const feedbackEl = document.getElementById('expFeedbackBox');

  if (roundNumEl) roundNumEl.textContent = 'Round ' + rData.round + ' of 4';
  if (chBadgeEl) chBadgeEl.textContent = rData.channels + ' Channels';
  if (noteEl) noteEl.textContent = rData.note;
  if (feedbackEl) {
    feedbackEl.style.display = 'none';
    feedbackEl.innerHTML = '';
  }

  if (optsContainer) {
    optsContainer.innerHTML = '';
    rData.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'game-opt-btn';
      btn.textContent = opt;
      btn.onclick = () => submitExperimentAnswer(opt, rData.sentence, rData.channels);
      optsContainer.appendChild(btn);
    });
  }

  renderExperimentChart();
}

async function playExperimentAudio() {
  const ctx = getAudioContext();
  const rData = EXPERIMENT_DATA[expRound];
  if (!rData) return;

  if (expAudioSource) {
    try { expAudioSource.stop(); } catch(e){}
    expAudioSource = null;
  }

  const rawBuf = await decodeBase64Wav(speechData[rData.key], ctx);
  const inputData = rawBuf.getChannelData(0);
  const fs = rawBuf.sampleRate;

  const vocData = runChannelVocoder(inputData, fs, rData.channels, 0);

  const outBuf = ctx.createBuffer(1, vocData.length, fs);
  outBuf.copyToChannel(vocData, 0);

  expAudioSource = ctx.createBufferSource();
  expAudioSource.buffer = outBuf;
  expAudioSource.connect(masterGain);
  expAudioSource.start();

  showCaption('Playing mystery sentence at ' + rData.channels + ' channels', 3000);
}

function submitExperimentAnswer(selected, correctSentence, channels) {
  const isCorrect = (selected === correctSentence);
  userExpScores[channels] = isCorrect ? 100 : 0;

  document.querySelectorAll('#expOptionsContainer .game-opt-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctSentence) {
      btn.classList.add('correct');
    } else if (btn.textContent === selected && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  const feedbackEl = document.getElementById('expFeedbackBox');
  if (feedbackEl) {
    feedbackEl.style.display = 'block';
    if (isCorrect) {
      feedbackEl.innerHTML = '<p style="color:var(--sage); font-weight:600; margin-top:0.75rem;">Correct. You identified: "' + correctSentence + '"</p>';
    } else {
      feedbackEl.innerHTML = '<p style="color:var(--clay); font-weight:600; margin-top:0.75rem;">The spoken sentence was: "' + correctSentence + '".</p>';
    }

    if (expRound < EXPERIMENT_DATA.length - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn btn-secondary btn-sm';
      nextBtn.style.marginTop = '0.5rem';
      nextBtn.textContent = 'Continue to Round ' + (expRound + 2);
      nextBtn.onclick = () => loadExperimentRound(expRound + 1);
      feedbackEl.appendChild(nextBtn);
    } else {
      const finishText = document.createElement('p');
      finishText.style.marginTop = '0.75rem';
      finishText.style.fontStyle = 'italic';
      finishText.textContent = 'Experiment complete. Compare your results with the research benchmark in the chart beside.';
      feedbackEl.appendChild(finishText);
    }
  }

  renderExperimentChart();
}

function renderExperimentChart() {
  if (!expChartCtx || !expChartCanvas) return;
  const w = expChartCanvas.width;
  const h = expChartCanvas.height;
  const dpr = window.devicePixelRatio || 1;

  expChartCtx.fillStyle = '#F6F1E7';
  expChartCtx.fillRect(0, 0, w, h);

  const padLeft = 45 * dpr;
  const padRight = 25 * dpr;
  const padTop = 30 * dpr;
  const padBottom = 40 * dpr;
  const plotW = w - padLeft - padRight;
  const plotH = h - padTop - padBottom;

  // Grid lines
  expChartCtx.strokeStyle = '#D8CFBF';
  expChartCtx.lineWidth = 0.8 * dpr;
  for (let pct = 0; pct <= 100; pct += 25) {
    const y = padTop + plotH - (pct / 100) * plotH;
    expChartCtx.beginPath();
    expChartCtx.moveTo(padLeft, y);
    expChartCtx.lineTo(padLeft + plotW, y);
    expChartCtx.stroke();

    expChartCtx.fillStyle = '#6A635B';
    expChartCtx.font = (9 * dpr) + 'px "JetBrains Mono", monospace';
    expChartCtx.fillText(pct + '%', 10 * dpr, y + 3 * dpr);
  }

  const chValues = [1, 2, 4, 8, 16, 22];
  function chToX(ch) {
    const minLog = Math.log2(1);
    const maxLog = Math.log2(24);
    const norm = (Math.log2(ch) - minLog) / (maxLog - minLog);
    return padLeft + norm * plotW;
  }

  chValues.forEach(ch => {
    const x = chToX(ch);
    expChartCtx.beginPath();
    expChartCtx.moveTo(x, padTop + plotH);
    expChartCtx.lineTo(x, padTop + plotH + 4 * dpr);
    expChartCtx.strokeStyle = '#2E2A26';
    expChartCtx.stroke();

    expChartCtx.fillStyle = '#2E2A26';
    expChartCtx.font = (9 * dpr) + 'px "JetBrains Mono", monospace';
    expChartCtx.textAlign = 'center';
    expChartCtx.fillText(ch + 'ch', x, padTop + plotH + 18 * dpr);
  });
  expChartCtx.textAlign = 'left';

  // Benchmark curve (Shannon et al. 1995)
  const benchmarkData = [
    { ch: 1, score: 2 },
    { ch: 2, score: 10 },
    { ch: 4, score: 42 },
    { ch: 8, score: 88 },
    { ch: 16, score: 96 },
    { ch: 22, score: 97 }
  ];

  expChartCtx.strokeStyle = '#8FA68E';
  expChartCtx.lineWidth = 1.8 * dpr;
  expChartCtx.setLineDash([3 * dpr, 3 * dpr]);
  expChartCtx.beginPath();
  benchmarkData.forEach((pt, i) => {
    const x = chToX(pt.ch);
    const y = padTop + plotH - (pt.score / 100) * plotH;
    if (i === 0) expChartCtx.moveTo(x, y);
    else expChartCtx.lineTo(x, y);
  });
  expChartCtx.stroke();
  expChartCtx.setLineDash([]);

  benchmarkData.forEach(pt => {
    const x = chToX(pt.ch);
    const y = padTop + plotH - (pt.score / 100) * plotH;
    expChartCtx.beginPath();
    expChartCtx.arc(x, y, 3 * dpr, 0, 2 * Math.PI);
    expChartCtx.fillStyle = '#8FA68E';
    expChartCtx.fill();
  });

  // User results
  const userChannels = Object.keys(userExpScores).map(k => parseInt(k)).sort((a,b) => a - b);
  if (userChannels.length > 0) {
    expChartCtx.strokeStyle = '#C9805F';
    expChartCtx.lineWidth = 2 * dpr;
    expChartCtx.beginPath();
    userChannels.forEach((ch, i) => {
      const score = userExpScores[ch];
      const x = chToX(ch);
      const y = padTop + plotH - (score / 100) * plotH;
      if (i === 0) expChartCtx.moveTo(x, y);
      else expChartCtx.lineTo(x, y);
    });
    expChartCtx.stroke();

    userChannels.forEach(ch => {
      const score = userExpScores[ch];
      const x = chToX(ch);
      const y = padTop + plotH - (score / 100) * plotH;
      expChartCtx.beginPath();
      expChartCtx.arc(x, y, 4.5 * dpr, 0, 2 * Math.PI);
      expChartCtx.fillStyle = '#C9805F';
      expChartCtx.fill();
    });
  }

  // Legend
  expChartCtx.font = (10 * dpr) + 'px "Newsreader", Georgia, serif';
  expChartCtx.fontStyle = 'italic';
  expChartCtx.fillStyle = '#8FA68E';
  expChartCtx.fillText('Shannon et al. (1995) benchmark', padLeft + 10 * dpr, padTop - 10 * dpr);
  expChartCtx.fillStyle = '#C9805F';
  expChartCtx.fillText('Your trial', padLeft + 220 * dpr, padTop - 10 * dpr);
}

// ----------------------------------------------------------------------------
// SECTION 9: THE MUSIC CHALLENGE
// ----------------------------------------------------------------------------
const MUSIC_SONGS = [
  {
    key: 'odeToJoy',
    title: "Beethoven's Ode to Joy",
    options: ["Beethoven's Ode to Joy", "Mozart's Twinkle Twinkle", "Happy Birthday to You", "Brahms' Lullaby"]
  },
  {
    key: 'twinkle',
    title: "Mozart's Twinkle, Twinkle, Little Star",
    options: ["Row, Row, Row Your Boat", "Mozart's Twinkle, Twinkle, Little Star", "Jingle Bells", "London Bridge"]
  },
  {
    key: 'birthday',
    title: "Happy Birthday to You",
    options: ["Silent Night", "We Wish You a Merry Christmas", "Happy Birthday to You", "Auld Lang Syne"]
  }
];

let musicSong = 'odeToJoy';
let musicCh = 4;
let musicSource = null;

function initMusicChallenge() {
  renderMusicOptions();
}

function selectMusicSong(k) {
  musicSong = k;
  document.querySelectorAll('.music-sel-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.song === k);
  });
  renderMusicOptions();
}

function setMusicChannels(ch) {
  musicCh = ch;
  document.querySelectorAll('.music-ch-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.ch) === ch);
  });
}

function renderMusicOptions() {
  const current = MUSIC_SONGS.find(s => s.key === musicSong);
  if (!current) return;

  const container = document.getElementById('musicOptionsContainer');
  const feedbackEl = document.getElementById('musicFeedbackBox');
  if (feedbackEl) {
    feedbackEl.style.display = 'none';
    feedbackEl.innerHTML = '';
  }

  if (container) {
    container.innerHTML = '';
    current.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'game-opt-btn';
      btn.textContent = opt;
      btn.onclick = () => submitMusicGuess(opt, current.title);
      container.appendChild(btn);
    });
  }
}

async function playMusicAudio(mode = 'vocoded') {
  const ctx = getAudioContext();
  if (musicSource) {
    try { musicSource.stop(); } catch(e){}
    musicSource = null;
  }

  const notes = MELODIES[musicSong];
  if (!notes) return;

  const rawBuf = synthesizeMelodyBuffer(notes, 125, ctx);
  const inputData = rawBuf.getChannelData(0);
  const fs = rawBuf.sampleRate;

  let bufferToPlay = rawBuf;
  if (mode === 'vocoded') {
    const vocData = runChannelVocoder(inputData, fs, musicCh, 0);
    const vocBuf = ctx.createBuffer(1, vocData.length, fs);
    vocBuf.copyToChannel(vocData, 0);
    bufferToPlay = vocBuf;
    showCaption('Playing melody through ' + musicCh + '-channel vocoder', 3000);
  } else {
    showCaption('Playing original melody with acoustic harmonics', 3000);
  }

  musicSource = ctx.createBufferSource();
  musicSource.buffer = bufferToPlay;
  musicSource.connect(masterGain);
  musicSource.start();
}

function submitMusicGuess(selected, correctTitle) {
  const isCorrect = (selected === correctTitle);

  document.querySelectorAll('#musicOptionsContainer .game-opt-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctTitle) {
      btn.classList.add('correct');
    } else if (btn.textContent === selected && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  const feedbackEl = document.getElementById('musicFeedbackBox');
  if (feedbackEl) {
    feedbackEl.style.display = 'block';
    if (isCorrect) {
      feedbackEl.innerHTML = '<p style="color:var(--sage); font-weight:600; margin-top:0.75rem;">Correct. The piece is ' + correctTitle + '. You were likely relying on the rhythm and tempo rather than fine pitch.</p>';
    } else {
      feedbackEl.innerHTML = '<p style="color:var(--clay); font-weight:600; margin-top:0.75rem;">The piece is ' + correctTitle + '. Notice how difficult it is to recognize when the pitch steps between semitones are replaced by broad noise bands.</p>';
    }
  }
}

// ----------------------------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initWaveStudio();
  initEarMachine();
  initCochleaAnalyzer();
  selectFlowStep(0);
  initSimulator();
  initExperiment();
  initMusicChallenge();
});
`;
}

console.log('Script module prepared.');

// ----------------------------------------------------------------------------
// FULL HTML TEMPLATE BUILDER
// ----------------------------------------------------------------------------
function buildCompleteJournalHtml() {
  const styles = getJournalStyles();
  const script = getJournalScript();
  const heroSvg = getHeroSvg();
  const earCrossSvg = getEarCrossSectionSvg();
  const hairCellSvg = getHairCellComparisonSvg();
  const implantFlowSvg = getImplantFlowSvg();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Electric Ear — Hear what an implant hears</title>
  <meta name="description" content="A high-school physics project explaining how the ear works as a physics system and how a cochlear implant restores hearing.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
${styles}
  </style>
</head>
<body>

  <!-- Accessible Live Caption Bar -->
  <div id="journalCaptionBar" class="journal-caption-bar" role="status" aria-live="polite">
    <span id="captionText">Electric Ear ready</span>
  </div>

  <!-- Editorial Sticky Navigation Header -->
  <header class="journal-header">
    <div class="header-container">
      <div style="display:flex; align-items:baseline;">
        <a href="#hero" class="header-logo">Electric Ear</a>
        <span class="header-tagline-sub">Hear what an implant hears</span>
      </div>

      <nav>
        <ul class="header-nav">
          <li><a href="#sound">Sound</a></li>
          <li><a href="#machine">The Ear Machine</a></li>
          <li><a href="#cochlea">Tonotopy</a></li>
          <li><a href="#pathology">Hearing Loss</a></li>
          <li><a href="#implant">The Implant</a></li>
          <li><a href="#simulator">Simulator</a></li>
          <li><a href="#experiment">Experiment</a></li>
          <li><a href="#music">Music</a></li>
          <li><a href="#sources">Sources</a></li>
        </ul>
      </nav>

      <div style="display:flex; align-items:center; gap:0.75rem;">
        <button id="audioStatusPill" class="audio-status-pill" onclick="getAudioContext()">Audio active</button>
        <a href="#simulator" class="header-cta-btn">Simulator</a>
      </div>
    </div>
  </header>

  <main>
    <!-- =================================================================== -->
    <!-- 1. HERO                                                             -->
    <!-- =================================================================== -->
    <section id="hero">
      <div class="container">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:center;">
          <div>
            <div style="font-family:var(--font-mono); font-size:0.8rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--clay); margin-bottom:0.75rem;">
              High School Physics Demonstration &bull; Bioacoustics
            </div>
            <h1>Electric Ear</h1>
            <p style="font-family:var(--font-serif); font-style:italic; font-size:1.5rem; color:var(--ink-muted); margin-bottom:1.25rem;">
              Hear what an implant hears.
            </p>
            <p class="lead" style="margin-bottom:1.5rem;">
              This high-school physics project examines how the human ear works as an acoustic machine and how a cochlear implant restores hearing using electrical pulses. Sound begins as mechanical waves in the air, turns into fluid motion in the inner ear, and is transformed into electrical impulses that travel to the brain.
            </p>
            <div>
              <a href="#simulator" class="btn btn-primary" style="font-size:1.05rem; padding:0.75rem 1.6rem;">
                Hear what an implant hears
              </a>
            </div>
          </div>

          <div>
            ${heroSvg}
            <div class="figure-caption" style="text-align:center;">
              <strong>Fig. 1</strong> &mdash; Acoustic pressure waves propagating toward the human pinna.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 2. WHAT IS SOUND?                                                   -->
    <!-- =================================================================== -->
    <section id="sound" class="bg-sand">
      <div class="container">
        <div class="editorial-grid">
          <div>
            <div class="plate-tag">Section I &bull; Acoustic Foundations</div>
            <h2>What is Sound?</h2>
            <p class="lead">
              Sound is a mechanical vibration that moves through air as pressure waves. Pitch is determined by frequency, which is how many wave crests pass a point each second, measured in hertz. Loudness is determined by amplitude, which is the height of the pressure crests, measured in decibels.
            </p>

            <blockquote class="pull-quote">
              "Because air has mass and elasticity, a vibrating surface pushes molecules together in compression, followed by a spring-back rarefaction."
            </blockquote>

            <!-- Interactive Wave Studio -->
            <div class="plate-box">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:1rem;">
                <h3 style="font-size:1.2rem; margin:0;">Interactive Waveform Studio</h3>
                <span style="font-family:var(--font-mono); font-size:0.85rem; color:var(--ink-muted);">Web Audio Synthesizer</span>
              </div>

              <!-- Frequency Slider -->
              <div class="slider-group">
                <div class="slider-header">
                  <span>Frequency (Pitch)</span>
                  <span id="waveFreqDisplay" class="slider-val">440 Hz</span>
                </div>
                <input type="range" id="waveFreqSlider" min="0" max="100" value="58" aria-label="Frequency slider">
                <div class="pills-row">
                  <button class="pill-item" onclick="setTonePreset(100)">100 Hz (Bass)</button>
                  <button class="pill-item" onclick="setTonePreset(261.6)">261 Hz (Middle C)</button>
                  <button class="pill-item active" onclick="setTonePreset(440)">440 Hz (Concert A)</button>
                  <button class="pill-item" onclick="setTonePreset(1200)">1.2 kHz (Speech)</button>
                  <button class="pill-item" onclick="setTonePreset(3000)">3 kHz (Ear peak)</button>
                </div>
              </div>

              <!-- Amplitude Slider -->
              <div class="slider-group">
                <div class="slider-header">
                  <span>Amplitude (Loudness)</span>
                  <span id="waveAmpDisplay" class="slider-val">50%</span>
                </div>
                <input type="range" id="waveAmpSlider" min="0" max="100" value="50" class="range-sage" aria-label="Amplitude slider">
              </div>

              <!-- Oscilloscope Canvas -->
              <div style="margin:1rem 0;">
                <canvas id="journalOscCanvas" class="journal-canvas" height="140"></canvas>
                <div class="figure-caption">
                  <strong>Oscilloscope</strong> &mdash; Continuous mathematical plot of y(t) = A &times; sin(2&pi;ft).
                </div>
              </div>

              <!-- Spectrogram Canvas -->
              <div style="margin:1.5rem 0 0.5rem;">
                <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.4rem;">
                  <span style="font-family:var(--font-serif); font-size:0.95rem; font-style:italic;">Spectrogram Display</span>
                  <button class="btn btn-secondary btn-sm" onclick="enableLiveMic()">Use Microphone</button>
                </div>
                <canvas id="journalSpecCanvas" class="journal-canvas" height="110"></canvas>
                <p id="micStatusMessage" style="font-size:0.85rem; color:var(--ink-muted); margin-top:0.4rem;">
                  Microphone idle. You can play a tone or click "Use Microphone" to view live environmental sound.
                </p>
              </div>

              <div style="margin-top:1rem;">
                <button id="playWaveBtn" class="btn btn-primary" onclick="toggleTonePlayback()">
                  Play Tone
                </button>
              </div>
            </div>
          </div>

          <!-- Margin Column -->
          <div>
            <div class="margin-note">
              <strong>Wave Period</strong>
              The time taken for one full pressure oscillation:
              <br>T = 1 / f = <span id="wavePeriodDisplay" style="font-family:var(--font-mono);">2.27 ms</span>.
            </div>

            <div class="margin-note">
              <strong>Wavelength in Air</strong>
              Distance between pressure crests at 343 m/s:
              <br>&lambda; = v / f = <span id="waveLambdaDisplay" style="font-family:var(--font-mono);">78.0 cm</span>.
            </div>

            <div class="margin-note">
              <strong>Human Hearing Range</strong>
              Healthy human ears can detect frequencies from roughly 20 Hz to 20,000 Hz, with greatest sensitivity between 2,000 Hz and 4,000 Hz.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 3. THE EAR AS A MACHINE & IMPEDANCE MATCHING                        -->
    <!-- =================================================================== -->
    <section id="machine">
      <div class="container">
        <div class="editorial-grid">
          <div>
            <div class="plate-tag">Section II &bull; Mechanical Anatomy</div>
            <h2>The Ear as a Machine</h2>
            <p class="lead">
              The human ear is a mechanical transformer. Its primary job is to take delicate, low-force vibrations in air and transfer them into dense fluid inside the cochlea without losing energy to reflection.
            </p>

            <!-- Fig. 2 Ear Cross Section SVG -->
            <div class="plate-box" style="padding:1rem;">
              ${earCrossSvg}
              <div class="figure-caption">
                <strong>Fig. 2</strong> &mdash; Anatomical cross-section of the human ear. Click each labeled region to view its mechanical function.
              </div>
            </div>

            <!-- Impedance Matching Animated Diagram -->
            <div style="margin-top:3rem;">
              <h3>Impedance Matching at the Air-Fluid Boundary</h3>
              <p>
                Sound reflects strongly when it hits a dense boundary. Air has very low acoustic impedance (resistance to movement), while the perilymph fluid inside the cochlea is about 3,600 times denser. Without the middle ear, 99.9% of sound energy bounces straight off the fluid surface, like an echo bouncing off a lake.
              </p>

              <div class="plate-box">
                <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
                  <button id="btnImpYes" class="pill-item active" onclick="setImpedanceMode('matched')">
                    With middle ear lever (Matched)
                  </button>
                  <button id="btnImpNo" class="pill-item" onclick="setImpedanceMode('mismatched')">
                    Without middle ear (Direct boundary)
                  </button>
                </div>

                <canvas id="impedanceCanvas" class="journal-canvas" height="150"></canvas>
                
                <p id="impedanceResultText" style="font-size:0.95rem; line-height:1.6; margin-top:0.75rem;">
                  <strong>With the bone lever:</strong> The area ratio (55 mm² to 3.2 mm²) and mechanical lever boost pressure by 22 times (+27 dB). This matches the impedance and transmits roughly 80% of energy deep into the cochlear fluid.
                </p>

                <div class="figure-caption">
                  <strong>Fig. 3</strong> &mdash; Acoustic wave reflection and transmission at the fluid boundary with and without ossicular leverage.
                </div>
              </div>
            </div>
          </div>

          <!-- Margin Column for Ear Anatomy Notes -->
          <div>
            <div class="margin-note" id="marginNoteBox">
              <strong id="marginPartTitle">Tympanic Membrane (Eardrum)</strong>
              <span id="marginPartArea" style="font-family:var(--font-mono); font-size:0.8rem; color:var(--clay); display:block; margin-bottom:0.25rem;">55 mm²</span>
              <span id="marginPartJob">A thin, cone-shaped sheet of fibrous tissue. Sound waves in air push against it, causing it to vibrate. Its broad surface collects sound energy and channels it onto the much smaller bones of the middle ear.</span>
            </div>

            <div class="margin-note">
              <strong>The Hydraulic Lever</strong>
              Force from the large eardrum (55 mm²) is concentrated onto the tiny stapes footplate (3.2 mm²). Just like a hydraulic car jack, this area reduction creates a 17-fold pressure multiplication. Combined with a 1.3-fold lever advantage from the bones, total pressure increases by 22 times.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 4. THE COCHLEA AS A FREQUENCY ANALYZER                             -->
    <!-- =================================================================== -->
    <section id="cochlea" class="bg-sand">
      <div class="container">
        <div class="editorial-grid">
          <div>
            <div class="plate-tag">Section III &bull; Resonance &amp; Tonotopy</div>
            <h2>The Cochlea as a Frequency Analyzer</h2>
            <p class="lead">
              The cochlea unrolls into a 35 mm tapered basilar membrane. It behaves as a physical spectrum analyzer, sorting complex sounds into separate frequencies along its length.
            </p>

            <p>
              Near the entrance (the base), the basilar membrane is narrow, light, and stiff, so it resonates to high-frequency sounds. Near the far tip (the apex), the membrane becomes wider, heavier, and less stiff, so it resonates to low-frequency sounds. Just as a heavy xylophone bar vibrates at a lower pitch than a small one, each location along the membrane has its own resonant frequency.
            </p>

            <!-- Unrolled Cochlea Canvas -->
            <div class="plate-box">
              <div style="margin-bottom:0.75rem;">
                <canvas id="journalCochleaCanvas" class="journal-canvas" height="170"></canvas>
                <div class="figure-caption">
                  <strong>Fig. 4</strong> &mdash; Tonotopic frequency map along the unrolled basilar membrane from base (0 mm) to apex (35 mm).
                </div>
              </div>

              <!-- Pitch Slider -->
              <div class="slider-group" style="margin-top:1.25rem;">
                <div class="slider-header">
                  <span>Frequency along the membrane:</span>
                  <span id="cochleaFreqText" class="slider-val">1000 Hz</span>
                </div>
                <input type="range" id="cochleaPitchSlider" min="0" max="100" value="48" aria-label="Basilar membrane frequency slider">
                <div class="pills-row">
                  <button class="pill-item" onclick="setCochleaPreset(200)">200 Hz (Apex)</button>
                  <button class="pill-item" onclick="setCochleaPreset(500)">500 Hz (Vowel)</button>
                  <button class="pill-item active" onclick="setCochleaPreset(1000)">1,000 Hz (Mid)</button>
                  <button class="pill-item" onclick="setCochleaPreset(4000)">4 kHz (Consonants)</button>
                  <button class="pill-item" onclick="setCochleaPreset(8000)">8 kHz (Base)</button>
                </div>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; padding-top:0.75rem; border-top:1px solid var(--hairline);">
                <button id="playCochleaBtn" class="btn btn-primary btn-sm" onclick="toggleCochleaPitch()">
                  Play Pitch
                </button>
                <span id="cochleaPosText" style="font-family:var(--font-mono); font-size:0.85rem; color:var(--ink-muted);">
                  15.5 mm from base (44%)
                </span>
              </div>
            </div>
          </div>

          <!-- Margin Column -->
          <div>
            <div class="margin-note">
              <strong>Resonance Explained</strong>
              <span id="cochleaResonanceDesc">
                Speech formant frequencies resonate along the middle turns of the membrane.
              </span>
            </div>

            <div class="margin-note">
              <strong>Georg von B&eacute;k&eacute;sy (1961)</strong>
              Nobel Prize-winning experiments demonstrated that sound sets up a traveling wave along the membrane. The wave peaks sharply at the resonant spot and then dies out immediately beyond it.
            </div>

            <div class="margin-note">
              <strong>The Greenwood Function</strong>
              f = 165.4 &times; (10<sup>0.06(35 &minus; x)</sup> &minus; 0.88), where x is the distance in millimeters from the base.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 5. WHEN HEARING BREAKS                                              -->
    <!-- =================================================================== -->
    <section id="pathology">
      <div class="container">
        <div class="editorial-grid">
          <div>
            <div class="plate-tag">Section IV &bull; Sensorineural Loss &amp; Bionic Bypass</div>
            <h2>When Hearing Breaks</h2>
            <p class="lead">
              Hearing loss is usually not caused by a failure of the middle-ear bones, but by damage to the microscopic sensory hair cells sitting on the basilar membrane. In mammals, these cells do not regenerate once lost.
            </p>

            <!-- Hair cell SVG diagram -->
            <div class="plate-box" style="padding:1rem;">
              ${hairCellSvg}
              <div class="figure-caption">
                <strong>Fig. 5</strong> &mdash; Microscopic sensory hair cell bundles (stereocilia). When noise or illness damages them, mechanical motion can no longer be converted into electrical nerve signals.
              </div>
            </div>

            <!-- Comparison of Hearing Aid vs Cochlear Implant -->
            <div style="margin-top:2.5rem;">
              <h3>Hearing Aid vs. Cochlear Implant</h3>
              <p>
                A hearing aid is an acoustic amplifier: it turns up the volume of sound waves entering the ear canal. This works well if some hair cells remain. But if hair cells are missing entirely, turning up the volume is like shouting into a severed microphone cord—it creates loud distortion rather than clarity.
              </p>
              <p>
                A cochlear implant bypasses the hair cells entirely. A surgeon threads a flexible silicone wire with platinum rings directly into the cochlea, using small electrical current pulses to stimulate the auditory nerve fibers directly.
              </p>

              <div style="display:flex; gap:1rem; flex-wrap:wrap; margin:1.5rem 0;">
                <button class="btn btn-secondary" onclick="playBrokenHearingDemo('aid-broken')">
                  Listen: Amplified sound through damaged hair cells
                </button>
                <button class="btn btn-primary" onclick="playBrokenHearingDemo('implant-bionic')">
                  Listen: Direct electrical pulse stimulation
                </button>
              </div>
            </div>
          </div>

          <!-- Margin Column -->
          <div>
            <div class="margin-note">
              <strong>Amplification vs. Bypass</strong>
              Hearing aids require functional biology to hear. Cochlear implants replace broken sensory biology with a neural electrical interface.
            </div>

            <div class="margin-note">
              <strong>3,500 Hair Cells</strong>
              In each healthy ear, roughly 3,500 inner hair cells send signals to about 30,000 nerve fibers. A cochlear implant restores speech understanding using just 12 to 22 electrode rings.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 6. INSIDE AN IMPLANT                                                -->
    <!-- =================================================================== -->
    <section id="implant" class="bg-sand">
      <div class="container">
        <div class="plate-tag">Section V &bull; System Architecture</div>
        <h2>Inside an Implant</h2>
        <p class="lead">
          Follow the signal path from a pressure wave in the air to electrical impulses inside the skull. Click or tap any step in the flow diagram below to inspect the form of energy it uses.
        </p>

        <!-- Flow diagram SVG -->
        <div class="plate-box" style="padding:1rem;">
          ${implantFlowSvg}
          <div class="figure-caption">
            <strong>Fig. 7</strong> &mdash; Signal flow and transcutaneous energy conversion in a cochlear implant system.
          </div>
        </div>

        <!-- Detail box populated dynamically -->
        <div id="flowStepDetailBox" class="plate-box" style="border-left:3px solid var(--clay); padding:1rem 1.5rem; margin-top:1rem;">
          <strong>1. Dual Microphones</strong><br>
          <span style="font-family:var(--font-mono); font-size:0.85rem; color:var(--clay);">Sound waves in air &rarr; analog electrical voltage</span><br>
          <span style="font-size:0.95rem; color:var(--ink);">Small microphones mounted in the external processor pick up acoustic pressure vibrations in the air.</span>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 7. THE SIMULATOR (THE MAIN FEATURE)                                 -->
    <!-- =================================================================== -->
    <section id="simulator">
      <div class="container">
        <div class="plate-tag">Section VI &bull; Audio Simulator</div>
        <h2>The Cochlear Implant Simulator</h2>
        <p class="lead">
          This simulator uses a <strong>channel vocoder</strong>, the standard acoustic model developed by auditory researchers (Shannon et al., 1995). The code splits audio into N frequency bands, extracts the slow amplitude envelope of each band, and modulates band-passed noise.
        </p>

        <div class="plate-box">
          <!-- Audio Source Selector -->
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:0.85rem; font-weight:600; text-transform:uppercase; letter-spacing:0.04em; color:var(--ink-muted); margin-bottom:0.5rem;">
              Select an Audio Sample:
            </div>
            <div class="sim-source-pills">
              <button class="pill-item sim-preset-btn active" data-preset="sim_sample1" onclick="loadSimulatorPreset('sim_sample1')">
                Speech 1 (Pangram sentence)
              </button>
              <button class="pill-item sim-preset-btn" data-preset="sim_sample2" onclick="loadSimulatorPreset('sim_sample2')">
                Speech 2 (Acoustics sentence)
              </button>
              <button class="pill-item sim-preset-btn" data-preset="sim_sample3" onclick="loadSimulatorPreset('sim_sample3')">
                Speech 3 (Bionics sentence)
              </button>
              <button class="pill-item sim-preset-btn" data-preset="melody_ode" onclick="loadSimulatorPreset('melody_ode')">
                Melody (Ode to Joy)
              </button>
              <button class="pill-item sim-preset-btn" data-preset="melody_twinkle" onclick="loadSimulatorPreset('melody_twinkle')">
                Melody (Twinkle Star)
              </button>
              <button id="btnSimRecord" class="pill-item" onclick="recordUserVoice()">
                Record voice (3s)
              </button>
              <label class="pill-item" style="cursor:pointer;">
                Upload audio file
                <input type="file" id="simFileInput" accept="audio/*" style="display:none;">
              </label>
            </div>
          </div>

          <!-- Slider Controls -->
          <div class="sim-grid">
            <!-- Channel Slider -->
            <div class="slider-group">
              <div class="slider-header">
                <span>Number of Frequency Channels:</span>
                <span id="simChText" class="slider-val">8 Channels</span>
              </div>
              <input type="range" id="simChSlider" min="1" max="32" value="8" aria-label="Simulator channel count slider">
              <div id="simChNote" style="font-family:var(--font-serif); font-style:italic; font-size:0.85rem; color:var(--ink-muted); margin-top:0.35rem;">
                8 Channels: High speech intelligibility threshold.
              </div>
              <div class="pills-row" style="margin-top:0.4rem;">
                <button class="pill-item" onclick="setSimChannelPreset(1)">1ch</button>
                <button class="pill-item" onclick="setSimChannelPreset(2)">2ch</button>
                <button class="pill-item" onclick="setSimChannelPreset(4)">4ch</button>
                <button class="pill-item active" onclick="setSimChannelPreset(8)">8ch</button>
                <button class="pill-item" onclick="setSimChannelPreset(12)">12ch</button>
                <button class="pill-item" onclick="setSimChannelPreset(16)">16ch</button>
                <button class="pill-item" onclick="setSimChannelPreset(22)">22ch</button>
              </div>
            </div>

            <!-- Background Noise Slider -->
            <div class="slider-group">
              <div class="slider-header">
                <span>Simulated Background Noise:</span>
                <span id="simNoiseText" class="slider-val">Clean (no noise)</span>
              </div>
              <input type="range" id="simNoiseSlider" min="0" max="60" value="0" class="range-sage" aria-label="Simulator background noise slider">
              <div style="font-family:var(--font-serif); font-style:italic; font-size:0.85rem; color:var(--ink-muted); margin-top:0.35rem;">
                Background noise degrades speech recognition quickly for implant users.
              </div>
            </div>
          </div>

          <!-- Playback Bar -->
          <div class="sim-player-bar">
            <div style="display:flex; gap:0.75rem; align-items:center;">
              <button id="btnSimOrig" class="btn btn-secondary" onclick="playSimulatorAudio('orig')">
                Play Original
              </button>
              <button id="btnSimVoc" class="btn btn-primary" onclick="playSimulatorAudio('voc')">
                Play Simulated Implant
              </button>
              <button class="btn btn-secondary btn-sm" onclick="stopSimulatorAudio()">
                Stop
              </button>
            </div>

            <div style="display:flex; align-items:center; gap:1rem; flex:1; max-width:350px;">
              <input type="range" id="simScrubber" min="0" max="100" value="0" aria-label="Simulator playback scrubber">
              <span id="simTimeText" style="font-family:var(--font-mono); font-size:0.8rem; color:var(--ink-muted); white-space:nowrap;">
                0.0s / 2.6s
              </span>
            </div>
          </div>

          <!-- Dual Side-by-Side Spectrograms -->
          <div class="sim-grid">
            <div>
              <div style="font-family:var(--font-serif); font-size:0.95rem; font-style:italic; margin-bottom:0.4rem;">
                Original acoustic spectrum (Continuous)
              </div>
              <canvas id="journalSimOrigCanvas" class="journal-canvas" height="150"></canvas>
            </div>

            <div>
              <div style="font-family:var(--font-serif); font-size:0.95rem; font-style:italic; margin-bottom:0.4rem;">
                Simulated implant spectrum (N Channels)
              </div>
              <canvas id="journalSimVocCanvas" class="journal-canvas" height="150"></canvas>
            </div>
          </div>
          <div class="figure-caption">
            <strong>Fig. 8</strong> &mdash; Side-by-side spectrograms showing continuous harmonic bands (left) compared with discretized, noise-vocoded bands (right).
          </div>

          <!-- Honest Note on Simulation -->
          <div style="background:var(--sand); border-left:3px solid var(--clay); padding:0.85rem 1.25rem; margin-top:1.5rem; font-size:0.92rem; line-height:1.6;">
            <strong>Note on simulation:</strong> A noise vocoder models the loss of frequency detail that occurs with an implant. It demonstrates the physical limitation of having only a few electrodes. However, it is not an exact reproduction of what an implant user hears, because the human brain adapts over months of listening to make sense of the electrical signals.
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 8. THE EXPERIMENT                                                   -->
    <!-- =================================================================== -->
    <section id="experiment" class="bg-sand">
      <div class="container">
        <div class="editorial-grid">
          <div>
            <div class="plate-tag">Section VII &bull; Psychoacoustic Trial</div>
            <h2>The Experiment: How Many Channels Do You Need?</h2>
            <p class="lead">
              Test your own ears. In this experiment, you will hear four short sentences processed at 2, 4, 8, and 16 channels. Listen to each recording and choose what sentence was spoken.
            </p>

            <div class="plate-box">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.75rem;">
                <span id="expRoundNum" style="font-family:var(--font-serif); font-style:italic; font-size:1.1rem; color:var(--clay);">Round 1 of 4</span>
                <span id="expChBadge" style="font-family:var(--font-mono); font-size:0.85rem; color:var(--ink-muted);">2 Channels</span>
              </div>

              <p id="expRoundNote" style="font-size:0.9rem; color:var(--ink-muted); margin-bottom:1rem;">
                With 2 channels, vowel rhythms are preserved, but consonants are heavily blurred.
              </p>

              <button class="btn btn-primary" onclick="playExperimentAudio()" style="margin-bottom:1rem;">
                Play Mystery Audio
              </button>

              <div style="font-size:0.9rem; font-weight:600; margin-bottom:0.5rem;">
                What did you hear?
              </div>
              <div id="expOptionsContainer" class="game-opts">
                <!-- Dynamically populated options -->
              </div>

              <div id="expFeedbackBox" style="display:none;"></div>
            </div>
          </div>

          <!-- Margin Column: Results Chart & Current Spread Explanation -->
          <div>
            <div class="plate-box" style="padding:1rem;">
              <div style="font-family:var(--font-serif); font-size:0.95rem; font-style:italic; margin-bottom:0.5rem;">
                Sentence Comprehension (%)
              </div>
              <canvas id="journalExpCanvas" class="journal-canvas" height="200"></canvas>
              <div class="figure-caption">
                <strong>Fig. 9</strong> &mdash; Test results plotted against the Shannon et al. (1995) benchmark curve.
              </div>
            </div>

            <div class="margin-note" style="margin-top:1.5rem;">
              <strong>Why Gains Level Off After 8 to 10 Channels</strong>
              Current spread: The fluid inside the cochlea conducts electricity. When an electrode fires, its electrical current spreads outward and overlaps with the current from neighboring electrodes. Because of this electrical overlap, having 20 or 22 physical electrodes only gives the listener about 8 to 10 truly independent channels.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 9. THE MUSIC CHALLENGE                                              -->
    <!-- =================================================================== -->
    <section id="music">
      <div class="container">
        <div class="editorial-grid">
          <div>
            <div class="plate-tag">Section VIII &bull; Pitch &amp; Melody</div>
            <h2>The Music Challenge</h2>
            <p class="lead">
              While cochlear implants are remarkably successful for speech, listening to music is far more difficult. Choose a mystery melody below, listen to it through the simulator, and try to guess what it is.
            </p>

            <div class="plate-box">
              <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
                <div>
                  <div style="font-size:0.85rem; font-weight:600; text-transform:uppercase; color:var(--ink-muted); margin-bottom:0.35rem;">
                    Select Piece:
                  </div>
                  <div class="pills-row">
                    <button class="pill-item music-sel-btn active" data-song="odeToJoy" onclick="selectMusicSong('odeToJoy')">Melody A (Classical)</button>
                    <button class="pill-item music-sel-btn" data-song="twinkle" onclick="selectMusicSong('twinkle')">Melody B (Traditional)</button>
                    <button class="pill-item music-sel-btn" data-song="birthday" onclick="selectMusicSong('birthday')">Melody C (Celebration)</button>
                  </div>
                </div>

                <div>
                  <div style="font-size:0.85rem; font-weight:600; text-transform:uppercase; color:var(--ink-muted); margin-bottom:0.35rem;">
                    Channel Setting:
                  </div>
                  <div class="pills-row">
                    <button class="pill-item music-ch-btn active" data-ch="4" onclick="setMusicChannels(4)">4 Channels</button>
                    <button class="pill-item music-ch-btn" data-ch="8" onclick="setMusicChannels(8)">8 Channels</button>
                    <button class="pill-item music-ch-btn" data-ch="16" onclick="setMusicChannels(16)">16 Channels</button>
                  </div>
                </div>
              </div>

              <div style="display:flex; gap:0.75rem; margin-bottom:1.5rem;">
                <button class="btn btn-primary" onclick="playMusicAudio('vocoded')">
                  Play Vocoded Melody
                </button>
                <button class="btn btn-secondary" onclick="playMusicAudio('original')">
                  Play Original Acoustic
                </button>
              </div>

              <div style="font-size:0.9rem; font-weight:600; margin-bottom:0.5rem;">
                Which famous melody is this?
              </div>
              <div id="musicOptionsContainer" class="game-opts">
                <!-- Dynamically populated options -->
              </div>
              <div id="musicFeedbackBox" style="display:none;"></div>

              <div class="figure-caption" style="margin-top:1.5rem; padding-top:0.75rem; border-top:1px solid var(--hairline);">
                <strong>Fig. 10</strong> &mdash; Western musical semitones require roughly 6% frequency discrimination, exceeding the resolution of broad implant filter bands.
              </div>
            </div>
          </div>

          <!-- Margin Column -->
          <div>
            <div class="margin-note">
              <strong>Why Music Is Harder Than Speech</strong>
              Speech can be understood using coarse rhythms and broad frequency groups. Western music, however, depends on exact pitches. Adjacent musical notes (semitones) differ by only about 6 percent in frequency. Because the implant divides sound into broad bands, these small pitch differences are lost, turning melodies into rhythmic noise.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 10. TAKEAWAYS AND SOURCES                                           -->
    <!-- =================================================================== -->
    <section id="sources" class="bg-sand">
      <div class="container">
        <div class="plate-tag">Section IX &bull; Conclusions &amp; Bibliography</div>
        <h2>Takeaways and Sources</h2>
        <p class="lead">
          Three summary findings from our physics and bioacoustics inquiry:
        </p>

        <!-- Three Takeaways -->
        <div class="takeaways-row">
          <div class="takeaway-col">
            <div class="takeaway-num">01</div>
            <h3>Impedance Matching</h3>
            <p style="font-size:0.98rem; line-height:1.6;">
              The middle ear is a mechanical lever that prevents sound from bouncing off fluid. By combining a 17-to-1 area ratio with a 1.3-to-1 lever arm, it multiplies pressure by 22 times (+27 dB).
            </p>
          </div>

          <div class="takeaway-col sage">
            <div class="takeaway-num">02</div>
            <h3>Tonotopic Resonance</h3>
            <p style="font-size:0.98rem; line-height:1.6;">
              The cochlea sorts sound by frequency because its membrane varies in stiffness and weight along its 35 mm length, establishing a continuous mathematical map from high pitch at the base to low pitch at the apex.
            </p>
          </div>

          <div class="takeaway-col blue">
            <div class="takeaway-num">03</div>
            <h3>Bionic Limits</h3>
            <p style="font-size:0.98rem; line-height:1.6;">
              An implant restores speech understanding with roughly 8 channels of rhythm and timing, but electrical current spread and lack of fine temporal structure leave music recognition an ongoing challenge.
            </p>
          </div>
        </div>

        <hr class="hairline-divider">

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:3rem;">
          <!-- Sources List -->
          <div>
            <h3 style="font-size:1.2rem;">Sources &amp; Further Reading</h3>
            <ul style="list-style:none; padding:0; margin-top:0.75rem;">
              <li style="font-size:0.9rem; color:var(--ink-muted); margin-bottom:0.75rem; border-left:1px solid var(--clay); padding-left:0.75rem;">
                <strong>Shannon, R. V. et al. (1995).</strong> "Speech recognition with primarily temporal cues." <em>Science</em>, 270(5234), 303&ndash;304.
              </li>
              <li style="font-size:0.9rem; color:var(--ink-muted); margin-bottom:0.75rem; border-left:1px solid var(--clay); padding-left:0.75rem;">
                <strong>von B&eacute;k&eacute;sy, G. (1961).</strong> "Concerning the pleasures of observing, and the mechanics of the inner ear." <em>Nobel Lecture</em>.
              </li>
              <li style="font-size:0.9rem; color:var(--ink-muted); margin-bottom:0.75rem; border-left:1px solid var(--clay); padding-left:0.75rem;">
                <strong>Wilson, B. S., &amp; Dorman, M. F. (2008).</strong> "Cochlear implants: current designs and future possibilities." <em>Physiological Measurement</em>, 29(10), R1.
              </li>
              <li style="font-size:0.9rem; color:var(--ink-muted); margin-bottom:0.75rem; border-left:1px solid var(--clay); padding-left:0.75rem;">
                <strong>Greenwood, D. D. (1990).</strong> "A cochlear frequency-position function for several species." <em>J. Acoust. Soc. Am.</em>, 87(6), 2592&ndash;2605.
              </li>
            </ul>
          </div>

          <!-- Team Credits -->
          <div>
            <h3 style="font-size:1.2rem;">Project Team Credits</h3>
            <p style="font-size:0.9rem; color:var(--ink-muted); margin-bottom:1rem;">
              Advanced High School Physics &bull; Bioacoustics Demonstration
            </p>
            <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.92rem;">
              <div style="border-bottom:1px solid var(--hairline); padding-bottom:0.35rem;">
                <strong>Maya Lin</strong> &mdash; Acoustics and ear mechanics
              </div>
              <div style="border-bottom:1px solid var(--hairline); padding-bottom:0.35rem;">
                <strong>Alex Rivera</strong> &mdash; Audio filter design and vocoder code
              </div>
              <div style="padding-bottom:0.35rem;">
                <strong>Jordan Chen</strong> &mdash; Scientific illustrations and layout
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer style="border-top:1px solid var(--hairline); padding:2rem 1.5rem; text-align:center; font-family:var(--font-serif); font-style:italic; font-size:0.9rem; color:var(--ink-muted); background:var(--paper);">
    <div class="container">
      Electric Ear &mdash; A printed science journal inquiry into biological acoustics and neural bionics.
    </div>
  </footer>

  <!-- Embedded Speech Data Bundle -->
  <script>
    const speechData = ${JSON.stringify(speechBundle)};
  </script>

  <!-- Journal Application Script -->
  <script>
${script}
  </script>
</body>
</html>
`;

  return html;
}

const finalHtml = buildCompleteJournalHtml();

// Enforce strict zero-emoji requirement
assertNoEmojis(finalHtml);
console.log('Zero emojis verified.');

fs.writeFileSync('index.html', finalHtml, 'utf8');
console.log('Saved index.html successfully. Size:', (finalHtml.length / 1024).toFixed(1), 'KB');
