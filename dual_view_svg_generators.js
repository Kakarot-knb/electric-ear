// dual_view_svg_generators.js
// 10 Distinct Scientific Diagram Functions (5 Animated Views + 5 Scientific Illustrations)
const { C } = require('./palette.js');

// ============================================================================
// DIAGRAM 1: HUMAN EAR ANATOMY & SOUND TRANSMISSION
// ============================================================================

// 1A. ANIMATED VIEW (Motion Graphics & Step-by-Step Biomechanical Flow)
function getEarAnimatedMotionSvg() {
  return `
<svg id="earAnatomySvg" data-view-mode="animated" viewBox="0 0 880 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated visualization: Real-time sound wave transmission through the human auditory peripheral system" style="width:100%; height:auto; display:block;">
  <style>
    .ear-wave-arc { fill: none; stroke: ${C.tealMuted}; stroke-width: 2.2; stroke-linecap: round; }
    .ear-wave-fast { animation: acousticWavePulse 1.8s infinite ease-out; }
    .ear-part { cursor: pointer; transition: all 0.2s ease; }
    .ear-part:hover path, .ear-part:hover ellipse, .ear-part:hover circle { stroke: ${C.clay} !important; stroke-width: 2.6px !important; }
    .ear-part.active path, .ear-part.active ellipse, .ear-part.active circle { stroke: ${C.forest} !important; stroke-width: 3px !important; fill: ${C.sagePale} !important; }
    .fluid-ripple { stroke-dasharray: 8,6; animation: cochleaFluidRipple 1.2s infinite linear; }
    .nerve-firing { stroke-dasharray: 6,4; animation: nerveActionPotential 0.9s infinite linear; }
    .vibe-membrane { animation: eardrumVibe 0.6s infinite ease-in-out; transform-origin: 264px 242px; }
    .lever-malleus { animation: ossicleLeverRock 0.6s infinite ease-in-out; transform-origin: 280px 200px; }
    .piston-stapes { animation: stapesPistonStroke 0.6s infinite ease-in-out; }
  </style>

  <rect width="880" height="500" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Live Sequential State Status Bar -->
  <g transform="translate(25, 20)">
    <rect width="830" height="42" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <circle cx="24" cy="21" r="5" fill="${C.forest}">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <text x="40" y="25" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="600" fill="${C.forest}">
      LIVE SIGNAL TRANSDUCTION: Acoustic Air Pressure (20 uPa) &rarr; Mechanical Ossicular Torque (22&times; Gain) &rarr; Hydrodynamic Wave (1,480 m/s) &rarr; Neural Spike Train (+30 mV)
    </text>
  </g>

  <!-- 3 Zone Demarcation Panels -->
  <!-- Outer Ear Zone -->
  <g transform="translate(25, 75)">
    <rect width="240" height="375" fill="${C.white}" stroke="${C.border}" rx="14" ry="14" />
    <text x="18" y="26" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">I. OUTER EAR (AIR)</text>
    <text x="18" y="42" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Acoustic Funnel &amp; Resonator</text>
  </g>

  <!-- Middle Ear Zone -->
  <g transform="translate(275, 75)">
    <rect width="280" height="375" fill="${C.white}" stroke="${C.border}" rx="14" ry="14" />
    <text x="18" y="26" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">II. MIDDLE EAR (TYMPANUM)</text>
    <text x="18" y="42" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Mechanical Impedance Transformer</text>
  </g>

  <!-- Inner Ear Zone -->
  <g transform="translate(565, 75)">
    <rect width="290" height="375" fill="${C.white}" stroke="${C.border}" rx="14" ry="14" />
    <text x="18" y="26" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">III. INNER EAR (FLUID)</text>
    <text x="18" y="42" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Tonotopic Fourier Dispersion</text>
  </g>

  <!-- Animated Sound Wavefront Arcs Entering Canal -->
  <g transform="translate(30, 200)">
    <path d="M 15 15 C 30 35, 30 75, 15 95" class="ear-wave-arc ear-wave-fast" style="animation-delay: 0s;" />
    <path d="M 40 18 C 55 38, 55 72, 40 92" class="ear-wave-arc ear-wave-fast" style="animation-delay: 0.4s;" />
    <path d="M 65 20 C 78 38, 78 72, 65 90" class="ear-wave-arc ear-wave-fast" style="animation-delay: 0.8s;" />
    <path d="M 90 22 C 100 40, 100 70, 90 88" class="ear-wave-arc ear-wave-fast" style="animation-delay: 1.2s;" />
  </g>

  <!-- Part 1: Pinna -->
  <g class="ear-part" data-part="pinna" id="animPartPinna" transform="translate(10, 20)">
    <path d="M 60 140 C 130 120, 160 170, 150 230 C 145 260, 95 280, 110 340 C 115 370, 75 380, 60 330 C 50 280, 100 260, 90 220 C 80 180, 40 170, 60 140 Z" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.8" />
    <text x="105" y="405" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}" text-anchor="middle">1. PINNA</text>
    <text x="105" y="420" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}" text-anchor="middle">+5 dB High-freq gain</text>
  </g>

  <!-- Part 2: Auditory Canal -->
  <g class="ear-part" data-part="canal" id="animPartCanal" transform="translate(10, 20)">
    <path d="M 125 240 L 260 235 L 265 285 L 115 280 Z" fill="${C.ivory}" stroke="${C.forest}" stroke-width="1.6" />
    <text x="190" y="315" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}" text-anchor="middle">2. CANAL</text>
    <text x="190" y="330" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}" text-anchor="middle">&lambda;/4 2.7 kHz tube</text>
  </g>

  <!-- Part 3: Vibrating Eardrum -->
  <g class="ear-part" data-part="eardrum" id="animPartEardrum" transform="translate(10, 20)">
    <g class="vibe-membrane">
      <ellipse cx="264" cy="260" rx="4.5" ry="32" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="2.2" />
      <path d="M 260 228 C 268 253, 268 273, 264 293" stroke="${C.clay}" stroke-width="2.8" fill="none" />
    </g>
    <text x="270" y="165" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.clay}">3. TYMPANUM</text>
    <text x="270" y="180" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">Area A&sub1; = 55 mm&sup2;</text>
  </g>

  <!-- Middle Ear Ossicle Mechanical Chain (Animated Lever) -->
  <g transform="translate(10, 20)">
    <!-- Part 4: Malleus (Hammer) -->
    <g class="ear-part lever-malleus" data-part="malleus" id="animPartMalleus">
      <path d="M 264 260 L 315 210 C 322 203, 335 207, 332 220 L 320 235 Z" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.8" />
      <text x="335" y="145" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">4. MALLEUS</text>
      <text x="335" y="160" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">L&sub1; lever arm</text>
    </g>

    <!-- Part 5: Incus (Anvil) -->
    <g class="ear-part" data-part="incus" id="animPartIncus">
      <path d="M 332 220 C 342 215, 362 220, 365 235 L 368 265 C 368 270, 362 273, 358 267 L 340 240 Z" fill="${C.stoneDark}" stroke="${C.forest}" stroke-width="1.8" />
      <text x="390" y="195" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">5. INCUS</text>
      <text x="390" y="210" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">1.3:1 ratio</text>
    </g>

    <!-- Part 6: Stapes Piston in Oval Window -->
    <g class="ear-part piston-stapes" data-part="stapes" id="animPartStapes">
      <path d="M 368 265 L 405 255 L 405 280 Z" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.8" />
      <rect x="405" y="250" width="8" height="32" fill="${C.clay}" stroke="${C.forest}" stroke-width="1.6" rx="3" ry="3" />
      <text x="420" y="325" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.clay}">6. STAPES PISTON</text>
      <text x="420" y="340" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">A&sub2; = 3.2 mm&sup2;</text>
    </g>
  </g>

  <!-- Part 7: Coiled Fluid Cochlea with Hydraulic Wave -->
  <g class="ear-part" data-part="cochlea" id="animPartCochlea" transform="translate(10, 20)">
    <path d="M 425 255 C 480 215, 570 225, 620 265 C 670 305, 690 375, 640 415 C 590 450, 510 425, 490 365 C 475 310, 520 275, 570 285 C 605 295, 615 335, 590 355" fill="none" stroke="${C.forest}" stroke-width="5" stroke-linecap="round" />
    <path d="M 430 260 C 485 225, 565 235, 608 270 C 650 308, 665 365, 625 400 C 585 430, 520 410, 505 362" fill="none" stroke="${C.tealMuted}" stroke-width="2.5" stroke-linecap="round" class="fluid-ripple" />
    <text x="705" y="285" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">7. COCHLEA FLUID</text>
    <text x="705" y="302" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">Traveling hydrodynamic wave</text>
  </g>

  <!-- Part 8: Auditory Nerve (Cranial Nerve VIII) with Firing Pulses -->
  <g class="ear-part" data-part="nerve" id="animPartNerve" transform="translate(10, 20)">
    <path d="M 580 340 C 660 330, 730 350, 820 345" fill="none" stroke="${C.clay}" stroke-width="3.5" stroke-linecap="round" class="nerve-firing" />
    <path d="M 590 352 C 670 342, 740 362, 820 360" fill="none" stroke="${C.clay}" stroke-width="2.2" stroke-linecap="round" class="nerve-firing" />
    <text x="720" y="390" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.clay}">8. AUDITORY NERVE</text>
    <text x="720" y="405" font-family="'Newsreader', serif" font-style="italic" font-size="11" fill="${C.charcoalMuted}">Action potentials to brainstem</text>
  </g>

  <!-- Bottom Interactive Helper Pill -->
  <g transform="translate(240, 455)">
    <rect width="400" height="30" fill="${C.white}" stroke="${C.border}" rx="15" ry="15" />
    <text x="200" y="19" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">
      Motion View: Watch sound transduce through each anatomical stage
    </text>
  </g>
</svg>
`;
}

// 1B. SCIENTIFIC ILLUSTRATION (High-Detail Morphological Anatomical Plate)
function getEarScientificIllustrationSvg() {
  return `
<svg id="earAnatomyIllustrationSvg" viewBox="0 0 880 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scientific illustration: Precise cross-sectional anatomy of the peripheral human ear" style="width:100%; height:auto; display:block;">
  <rect width="880" height="500" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Architectural Textbook Plate Header -->
  <g transform="translate(25, 20)">
    <rect width="830" height="42" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="25" y="25" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">
      PLATE 3.1 &middot; ANATOMICAL DISSECTION &middot; AUDITORY PERIPHERY OF HOMO SAPIENS
    </text>
    <text x="805" y="25" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}" text-anchor="end">
      Coronal Plane &middot; Right Temporal Bone
    </text>
  </g>

  <!-- Sectional Zones -->
  <!-- Outer Ear -->
  <g transform="translate(25, 75)">
    <rect width="240" height="375" fill="${C.white}" stroke="${C.border}" rx="14" ry="14" />
    <text x="18" y="26" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">AURIS EXTERNA</text>
    <text x="18" y="42" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Pinna &amp; Meatus Acusticus Externus</text>

    <!-- Anatomical Linework: Pinna Cartilage & Skin Layers -->
    <path d="M 50 80 C 130 50, 175 110, 160 180 C 150 220, 85 240, 100 310 C 110 345, 65 355, 50 300 C 40 240, 95 220, 85 180 C 75 130, 30 110, 50 80 Z" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.8" />
    <path d="M 85 140 C 120 150, 120 185, 100 205" fill="none" stroke="${C.tealMuted}" stroke-width="1.4" />

    <!-- Meatus Tube with Bony vs Cartilaginous Junction -->
    <path d="M 120 200 L 225 195 L 230 245 L 110 240 Z" fill="${C.ivory}" stroke="${C.forest}" stroke-width="1.6" />
    <line x1="165" y1="190" x2="165" y2="250" stroke="${C.border}" stroke-width="1.2" stroke-dasharray="2,2" />
    <text x="140" y="270" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}">Cartilage</text>
    <text x="185" y="270" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}">Bony Canal</text>

    <!-- Labels -->
    <text x="18" y="325" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">1. HELIX &amp; CONCHA</text>
    <text x="18" y="340" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" fill="${C.charcoalMuted}">Elastic cartilage funnel</text>
    <text x="18" y="365" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">2. AUDITORY MEATUS</text>
    <text x="18" y="380" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" fill="${C.charcoalMuted}">L = 2.5 cm, quarter-wave pipe</text>
  </g>

  <!-- Middle Ear -->
  <g transform="translate(275, 75)">
    <rect width="280" height="375" fill="${C.white}" stroke="${C.border}" rx="14" ry="14" />
    <text x="18" y="26" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">AURIS MEDIA</text>
    <text x="18" y="42" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Cavitas Tympanica &amp; Ossicula</text>

    <!-- Tympanic Membrane Detailed Cross Section -->
    <ellipse cx="20" cy="220" rx="4" ry="34" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.8" />
    <path d="M 16 186 C 24 212, 24 232, 20 254" stroke="${C.clay}" stroke-width="2.5" fill="none" />
    <circle cx="20" cy="220" r="2.5" fill="${C.forest}" />
    <text x="32" y="195" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.clay}">Pars Tensa</text>
    <text x="32" y="224" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}">Umbo</text>

    <!-- Malleus, Incus, Stapes Detailed Anatomy -->
    <!-- Malleus Manubrium & Head -->
    <path d="M 20 220 L 75 170 C 85 160, 100 165, 96 180 L 82 195 Z" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.8" />
    <circle cx="85" cy="172" r="3" fill="${C.white}" stroke="${C.forest}" stroke-width="1.2" />
    <text x="45" y="150" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}">Caput Mallei</text>

    <!-- Incus Body & Long Crus -->
    <path d="M 96 180 C 110 175, 130 180, 132 195 L 136 228 C 136 234, 128 238, 124 230 L 105 200 Z" fill="${C.stoneDark}" stroke="${C.forest}" stroke-width="1.8" />
    <circle cx="134" cy="230" r="2" fill="${C.clay}" />
    <text x="142" y="200" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}">Incus Crus</text>

    <!-- Stapes & Annular Ligament in Fenestra Vestibuli -->
    <path d="M 136 228 L 178 218 L 178 245 Z" fill="${C.clayPale}" stroke="${C.clay}" stroke-width="1.6" />
    <rect x="178" y="212" width="8" height="34" fill="${C.clay}" stroke="${C.forest}" stroke-width="1.6" rx="2" ry="2" />
    <line x1="186" y1="210" x2="186" y2="250" stroke="${C.forest}" stroke-width="2" />
    <text x="195" y="222" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.clay}">Basis Stapedis</text>
    <text x="195" y="235" font-family="'Newsreader', serif" font-style="italic" font-size="9" fill="${C.charcoalMuted}">Oval Window (A=3.2 mm&sup2;)</text>

    <!-- Middle Ear Muscles -->
    <path d="M 50 200 L 15 210" stroke="${C.clay}" stroke-width="1.5" stroke-dasharray="2,2" />
    <text x="55" y="280" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.charcoal}">M. Tensor Tympani</text>
    <text x="110" y="295" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.charcoal}">M. Stapedius (Acoustic reflex)</text>

    <!-- Eustachian Tube -->
    <path d="M 110 320 L 140 365 L 165 365 L 135 320 Z" fill="${C.ivory}" stroke="${C.border}" stroke-width="1.2" />
    <text x="18" y="355" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">EUSTACHIAN TUBE</text>
    <text x="18" y="370" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" fill="${C.charcoalMuted}">Tympanic pressure balance</text>
  </g>

  <!-- Inner Ear -->
  <g transform="translate(565, 75)">
    <rect width="290" height="375" fill="${C.white}" stroke="${C.border}" rx="14" ry="14" />
    <text x="18" y="26" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">AURIS INTERNA</text>
    <text x="18" y="42" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Labyrinthus Osseus &amp; N. Vestibulocochlearis</text>

    <!-- Cochlea Anatomy: Modiolus and 2.75 Coiled Turns -->
    <path d="M 30 220 C 85 180, 175 190, 225 230 C 275 270, 295 340, 245 380 C 195 415, 115 390, 95 330 C 80 275, 125 240, 175 250 C 210 260, 220 300, 195 320" fill="none" stroke="${C.forest}" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 40 228 C 90 195, 165 205, 210 238 C 255 275, 270 330, 230 365 C 190 395, 130 375, 112 328" fill="none" stroke="${C.tealMuted}" stroke-width="2" stroke-linecap="round" />

    <!-- Modiolus and Ganglion of Corti Core -->
    <circle cx="160" cy="295" r="14" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.5" />
    <text x="160" y="299" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.forest}" text-anchor="middle">Modiolus</text>

    <!-- Round Window (Fenestra Cochleae) -->
    <ellipse cx="32" cy="255" rx="5" ry="9" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.5" />
    <text x="45" y="260" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}">Round Window Niche</text>

    <!-- Auditory Nerve Bundle (Cranial Nerve VIII) -->
    <path d="M 175 295 C 220 290, 250 310, 285 305" fill="none" stroke="${C.clay}" stroke-width="3.5" stroke-linecap="round" />
    <path d="M 180 305 C 225 300, 255 320, 285 318" fill="none" stroke="${C.clay}" stroke-width="2" stroke-linecap="round" stroke-dasharray="3,2" />

    <!-- Legend -->
    <text x="18" y="340" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">COCHLEA OSSEA</text>
    <text x="18" y="355" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" fill="${C.charcoalMuted}">2.75 helical turns, L = 32 mm</text>
    <text x="18" y="375" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.clay}">N. VESTIBULOCOCHLEARIS</text>
    <text x="18" y="390" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" fill="${C.charcoalMuted}">~30,000 bipolar spiral ganglion neurons</text>
  </g>

  <!-- Bottom Plate Footnote -->
  <g transform="translate(240, 455)">
    <rect width="400" height="30" fill="${C.white}" stroke="${C.border}" rx="15" ry="15" />
    <text x="200" y="19" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forest}" text-anchor="middle">
      Scientific Plate: Meticulously labeled anatomical structures &amp; landmarks
    </text>
  </g>
</svg>
`;
}

// ============================================================================
// DIAGRAM 2: SOUND TO ELECTRICAL SIGNAL CONVERSION (PHYSICS)
// ============================================================================

// 2A. ANIMATED VIEW
function getAcousticToElectricAnimatedSvg() {
  return `
<svg id="acousticToElectricSvg" data-view-mode="animated" viewBox="0 0 880 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated visualization: Acoustic pressure wave converted into electrical voltage via microphone diaphragm" style="width:100%; height:auto; display:block;">
  <style>
    .oscilloscope-sine { stroke-dasharray: 20,4; animation: liveOscilloscopeSine 1.5s infinite linear; }
    .diaphragm-vibe { animation: eardrumVibe 0.8s infinite ease-in-out; transform-origin: 165px 120px; }
  </style>

  <rect width="880" height="280" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Left: Acoustic Compression Wave & Diaphragm in Motion -->
  <g transform="translate(25, 20)">
    <rect width="400" height="240" fill="${C.white}" stroke="${C.border}" rx="14" ry="14" />
    <text x="20" y="26" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="600" fill="${C.forest}">1. CONDENSER TRANSDUCTION DYNAMICS</text>
    <text x="20" y="44" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Acoustic Pressure Oscillates Diaphragm Gap</text>

    <!-- Incoming Longitudinal Wavefronts -->
    <path d="M 35 90 C 45 70, 45 150, 35 130" stroke="${C.tealMuted}" stroke-width="2.5" fill="none" class="ear-wave-fast" />
    <path d="M 65 90 C 75 70, 75 150, 65 130" stroke="${C.tealMuted}" stroke-width="2.5" fill="none" class="ear-wave-fast" style="animation-delay: 0.3s;" />
    <path d="M 95 90 C 105 70, 105 150, 95 130" stroke="${C.tealMuted}" stroke-width="2.5" fill="none" class="ear-wave-fast" style="animation-delay: 0.6s;" />
    <text x="65" y="165" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.tealMuted}" text-anchor="middle">&Delta;P(t) Wave</text>

    <!-- Vibrating Gold Diaphragm -->
    <g class="diaphragm-vibe">
      <rect x="155" y="65" width="7" height="110" fill="${C.clay}" rx="3.5" ry="3.5" />
      <text x="158" y="195" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.clay}" text-anchor="middle">Diaphragm</text>
    </g>

    <!-- Variable Air Gap d(t) -->
    <line x1="168" y1="120" x2="218" y2="120" stroke="${C.charcoalMuted}" stroke-width="1.2" stroke-dasharray="3,3" />
    <text x="193" y="112" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="${C.charcoalMuted}" text-anchor="middle">d(t)</text>

    <!-- Fixed Perforated Backplate -->
    <rect x="220" y="65" width="14" height="110" fill="${C.stoneDark}" stroke="${C.forest}" stroke-width="1.5" rx="3" ry="3" />
    <circle cx="227" cy="85" r="2.5" fill="${C.white}" />
    <circle cx="227" cy="120" r="2.5" fill="${C.white}" />
    <circle cx="227" cy="155" r="2.5" fill="${C.white}" />
    <text x="227" y="195" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}" text-anchor="middle">Backplate</text>

    <!-- Dynamic Capacitance Equation -->
    <g transform="translate(265, 85)">
      <rect width="115" height="50" fill="${C.ivory}" stroke="${C.border}" rx="8" ry="8" />
      <text x="57" y="22" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="600" fill="${C.forest}" text-anchor="middle">C(t) = &epsilon;A / d(t)</text>
      <text x="57" y="38" font-family="'Newsreader', serif" font-style="italic" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">C &asymp; 15 pF nominal</text>
    </g>
    <text x="200" y="225" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" fill="${C.charcoalMuted}" text-anchor="middle">
      Diaphragm displacement &Delta;d &asymp; 10 pm per Pascal of sound pressure
    </text>
  </g>

  <!-- Right: Live Oscilloscope Waveform in Motion -->
  <g transform="translate(445, 20)">
    <rect width="410" height="240" fill="${C.white}" stroke="${C.border}" rx="14" ry="14" />
    <text x="20" y="26" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="600" fill="${C.forest}">2. REAL-TIME OSCILLOSCOPE TRACE</text>
    <text x="20" y="44" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Transduced Voltage V(t) = Q / C(t)</text>

    <!-- Oscilloscope CRT Screen Graticule -->
    <rect x="20" y="55" width="370" height="135" fill="${C.ivory}" stroke="${C.border}" rx="10" ry="10" />
    <line x1="20" y1="122" x2="390" y2="122" stroke="${C.border}" stroke-width="1" stroke-dasharray="4,4" />
    <line x1="205" y1="55" x2="205" y2="190" stroke="${C.border}" stroke-width="1" stroke-dasharray="4,4" />

    <!-- Animated Sine Trace -->
    <path d="M 30 122 Q 65 72 100 122 T 170 122 T 240 122 T 310 122 T 380 122" fill="none" stroke="${C.forest}" stroke-width="2.6" class="oscilloscope-sine" />

    <!-- Live Status Indicators -->
    <text x="35" y="75" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">CH1: 5.0 mV/div</text>
    <text x="370" y="75" font-family="'JetBrains Mono', monospace" font-size="9" fill="${C.charcoalMuted}" text-anchor="end">1.0 kHz Acoustic Tone</text>

    <text x="205" y="215" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="${C.charcoal}" font-weight="600" text-anchor="middle">
      High fidelity conversion: Pressure oscillations become microvolt analog waves.
    </text>
  </g>
</svg>
`;
}

// 2B. SCIENTIFIC ILLUSTRATION
function getAcousticToElectricIllustrationSvg() {
  return `
<svg id="acousticElectricIllustrationSvg" viewBox="0 0 880 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scientific illustration: Precision engineering cross-section of a laboratory condenser microphone capsule" style="width:100%; height:auto; display:block;">
  <rect width="880" height="280" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Header -->
  <g transform="translate(25, 20)">
    <rect width="830" height="38" fill="${C.white}" stroke="${C.border}" rx="10" ry="10" />
    <text x="20" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">
      ENGINEERING SCHEMATIC &middot; 1/2-INCH FREE-FIELD CONDENSER MICROPHONE CAPSULE (IEC 61094-4)
    </text>
  </g>

  <!-- Left: Detailed Structural Cutaway -->
  <g transform="translate(25, 70)">
    <rect width="450" height="190" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="18" y="22" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="600" fill="${C.forest}">CROSS-SECTIONAL ARCHITECTURE</text>

    <!-- Metallic Housing Casing -->
    <path d="M 25 45 L 205 45 L 205 155 L 25 155 Z" fill="${C.ivory}" stroke="${C.stoneDark}" stroke-width="2" />

    <!-- Protective Grille -->
    <line x1="25" y1="45" x2="25" y2="155" stroke="${C.forest}" stroke-width="4" stroke-dasharray="4,3" />
    <text x="15" y="105" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="${C.forest}" transform="rotate(-90,15,105)" text-anchor="middle">Acoustic Mesh Grille</text>

    <!-- Gold Sputtered Diaphragm -->
    <line x1="55" y1="48" x2="55" y2="152" stroke="${C.clay}" stroke-width="3" stroke-linecap="round" />
    <text x="50" y="172" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.clay}" text-anchor="middle">Mylar Diaphragm (2 um)</text>

    <!-- Quartz Spacer Ring -->
    <rect x="58" y="48" width="16" height="15" fill="${C.stone}" stroke="${C.border}" />
    <rect x="58" y="137" width="16" height="15" fill="${C.stone}" stroke="${C.border}" />
    <text x="66" y="102" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="${C.charcoalMuted}" text-anchor="middle">Spacer</text>

    <!-- Backplate with Damping Holes -->
    <rect x="74" y="58" width="30" height="84" fill="${C.stoneDark}" stroke="${C.forest}" stroke-width="1.2" rx="3" ry="3" />
    <line x1="74" y1="78" x2="104" y2="78" stroke="${C.white}" stroke-width="1.8" />
    <line x1="74" y1="100" x2="104" y2="100" stroke="${C.white}" stroke-width="1.8" />
    <line x1="74" y1="122" x2="104" y2="122" stroke="${C.white}" stroke-width="1.8" />
    <text x="89" y="172" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.forest}" text-anchor="middle">Damped Backplate</text>

    <!-- Rear Acoustic Chamber & Equalization Leak -->
    <rect x="108" y="58" width="85" height="84" fill="${C.white}" stroke="${C.border}" rx="4" ry="4" />
    <line x1="193" y1="100" x2="205" y2="100" stroke="${C.clay}" stroke-width="1.5" />
    <text x="150" y="102" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="${C.charcoalMuted}" text-anchor="middle">Rear Cavity</text>
    <text x="150" y="116" font-family="'Newsreader', serif" font-style="italic" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Capillary leak</text>

    <!-- Dimension Callouts -->
    <text x="320" y="60" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}">ELECTROACOUSTIC METRICS:</text>
    <text x="320" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Diaphragm Area A: 125 mm&sup2;</text>
    <text x="320" y="98" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Air Gap d&sub0;: 20 &mu;m nominal</text>
    <text x="320" y="116" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Polarization Voltage: 200 V</text>
    <text x="320" y="134" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Frequency Range: 3 Hz &ndash; 20 kHz</text>
    <text x="320" y="152" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Open-circuit Sensitivity: 50 mV/Pa</text>
  </g>

  <!-- Right: Preamplifier Circuit Schematic -->
  <g transform="translate(490, 70)">
    <rect width="365" height="190" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="18" y="22" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="600" fill="${C.forest}">IMPEDANCE CONVERTER (JFET)</text>

    <!-- Circuit Diagram -->
    <!-- Capsule Capacitor C -->
    <line x1="40" y1="80" x2="70" y2="80" stroke="${C.forest}" stroke-width="1.8" />
    <line x1="70" y1="65" x2="70" y2="95" stroke="${C.forest}" stroke-width="2.5" />
    <line x1="78" y1="65" x2="78" y2="95" stroke="${C.forest}" stroke-width="2.5" />
    <line x1="78" y1="80" x2="130" y2="80" stroke="${C.forest}" stroke-width="1.8" />
    <text x="74" y="55" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}" text-anchor="middle">C(t)</text>

    <!-- Bias Resistor Rbias -->
    <line x1="105" y1="80" x2="105" y2="135" stroke="${C.clay}" stroke-width="1.5" />
    <rect x="98" y="100" width="14" height="25" fill="${C.white}" stroke="${C.clay}" stroke-width="1.5" />
    <text x="120" y="116" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.clay}">R&sub0; &gt; 1 G&Omega;</text>
    <line x1="105" y1="135" x2="105" y2="145" stroke="${C.clay}" stroke-width="1.5" />
    <line x1="95" y1="145" x2="115" y2="145" stroke="${C.charcoal}" stroke-width="1.5" />

    <!-- JFET Buffer -->
    <polygon points="140,80 180,60 180,100" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.5" />
    <text x="156" y="83" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="${C.forest}">JFET</text>
    <line x1="180" y1="80" x2="240" y2="80" stroke="${C.forest}" stroke-width="1.8" />
    <circle cx="240" cy="80" r="3" fill="${C.clay}" />
    <text x="250" y="83" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.clay}">Vout</text>

    <!-- Transfer Function -->
    <rect x="25" y="148" width="315" height="32" fill="${C.ivory}" stroke="${C.border}" rx="6" ry="6" />
    <text x="182" y="168" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}" text-anchor="middle">
      Vout(t) &asymp; Vbias &middot; [&Delta;d(t) / d&sub0;] &middot; [Rin / (Rin + Zc)]
    </text>
  </g>
</svg>
`;
}

// ============================================================================
// DIAGRAM 3: HEALTHY VS DAMAGED HAIR CELLS
// ============================================================================

// 3A. ANIMATED VIEW
function getHairCellAnimatedSvg() {
  return `
<svg id="hairCellSvg" data-view-mode="animated" viewBox="0 0 880 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated visualization: Comparison of active mechanotransduction vs damaged hair cell pathology" style="width:100%; height:auto; display:block;">
  <style>
    .ion-flow-line { stroke-dasharray: 4,3; animation: ionStreamFlow 0.8s infinite linear; }
    .bundle-shear { animation: ossicleLeverRock 1.2s infinite ease-in-out; transform-origin: 195px 170px; }
  </style>

  <rect width="880" height="400" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Left: Healthy Hair Cell in Motion -->
  <g transform="translate(25, 20)">
    <rect width="405" height="360" fill="${C.white}" stroke="${C.border}" rx="14" ry="14" />
    <text x="20" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.forest}">A. HEALTHY CELL &middot; ACTIVE MET ION INFLUX</text>
    <text x="20" y="44" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Intact tip links &amp; synaptic vesicle discharge</text>

    <!-- Shearing Stereocilia Staircase -->
    <g class="bundle-shear">
      <!-- 3 Tiered Stereocilia with Tip Links -->
      <rect x="160" y="70" width="8" height="95" fill="${C.forest}" rx="4" ry="4" />
      <rect x="180" y="90" width="8" height="75" fill="${C.forest}" rx="4" ry="4" />
      <rect x="200" y="110" width="8" height="55" fill="${C.forest}" rx="4" ry="4" />

      <!-- Tensioned Tip Links with MET Channels -->
      <line x1="168" y1="85" x2="180" y2="92" stroke="${C.clay}" stroke-width="2.5" />
      <circle cx="180" cy="92" r="3" fill="${C.clay}" />
      <line x1="188" y1="105" x2="200" y2="112" stroke="${C.clay}" stroke-width="2.5" />
      <circle cx="200" cy="112" r="3" fill="${C.clay}" />
    </g>

    <!-- Cuticular Plate -->
    <rect x="110" y="165" width="170" height="14" fill="${C.stone}" rx="6" ry="6" stroke="${C.forest}" stroke-width="1.2" />

    <!-- Animated Inflowing K+ and Ca2+ Ions -->
    <path d="M 180 92 L 180 165 L 175 220" stroke="${C.forest}" stroke-width="2" fill="none" class="ion-flow-line" />
    <path d="M 200 112 L 195 165 L 190 220" stroke="${C.forest}" stroke-width="2" fill="none" class="ion-flow-line" style="animation-delay: 0.4s;" />
    <text x="140" y="125" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">K+ / Ca2+ Influx</text>

    <!-- Hair Cell Body -->
    <path d="M 100 290 C 100 185, 115 175, 195 175 C 275 175, 290 185, 290 290 Z" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.8" />
    <ellipse cx="195" cy="245" rx="35" ry="20" fill="${C.white}" stroke="${C.forest}" stroke-width="1.2" />
    <text x="195" y="249" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="${C.forest}" text-anchor="middle">Nucleus (-20 mV Depol.)</text>

    <!-- Active Synaptic Ribbon & Exocytosis -->
    <circle cx="195" cy="285" r="5" fill="${C.clay}" />
    <circle cx="188" cy="292" r="2.5" fill="${C.forest}" />
    <circle cx="202" cy="292" r="2.5" fill="${C.forest}" />
    <text x="195" y="315" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.clay}" text-anchor="middle">Glutamate Neurotransmitter Release</text>

    <!-- Firing Afferent Nerve Fiber -->
    <path d="M 195 320 L 195 348" stroke="${C.clay}" stroke-width="3" stroke-linecap="round" class="nerve-firing" />
    <text x="195" y="340" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="${C.clay}" text-anchor="middle">Spikes Active &rarr;</text>
  </g>

  <!-- Right: Damaged Hair Cell (Acoustic Trauma) -->
  <g transform="translate(450, 20)">
    <rect width="405" height="360" fill="${C.white}" stroke="${C.border}" rx="14" ry="14" />
    <text x="20" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${C.clay}">B. DAMAGED CELL &middot; ACOUSTIC TRAUMA / LOSS</text>
    <text x="20" y="44" font-family="'Newsreader', serif" font-style="italic" font-size="12" fill="${C.charcoalMuted}">Fractured tip links &amp; silenced synaptic transmission</text>

    <!-- Splayed, Fractured Stereocilia (Disordered Clump) -->
    <rect x="150" y="115" width="8" height="55" fill="${C.stoneDark}" rx="4" ry="4" transform="rotate(-30,150,140)" />
    <rect x="180" y="125" width="8" height="45" fill="${C.stoneDark}" rx="4" ry="4" transform="rotate(40,180,140)" />
    <rect x="220" y="130" width="8" height="40" fill="${C.stoneDark}" rx="4" ry="4" transform="rotate(65,220,140)" />

    <!-- Broken Detached Tip Links -->
    <line x1="165" y1="120" x2="175" y2="115" stroke="${C.clay}" stroke-width="1.8" stroke-dasharray="2,2" />
    <line x1="195" y1="130" x2="210" y2="120" stroke="${C.clay}" stroke-width="1.8" stroke-dasharray="2,2" />
    <text x="195" y="105" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.clay}" text-anchor="middle">Broken Tip Links (Zero Tension)</text>

    <!-- Cuticular Plate -->
    <rect x="110" y="165" width="170" height="14" fill="${C.stone}" rx="6" ry="6" stroke="${C.border}" stroke-width="1.2" />

    <!-- Hair Cell Body (Hyperpolarized / Dormant) -->
    <path d="M 100 290 C 100 185, 115 175, 195 175 C 275 175, 290 185, 290 290 Z" fill="${C.stone}" stroke="${C.border}" stroke-width="1.8" />
    <ellipse cx="195" cy="245" rx="35" ry="20" fill="${C.white}" stroke="${C.border}" stroke-width="1.2" />
    <text x="195" y="249" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="${C.charcoalMuted}" text-anchor="middle">No Depolarization (-45 mV)</text>

    <!-- Silent Inactive Ribbon Synapse -->
    <circle cx="195" cy="285" r="5" fill="${C.stoneDark}" stroke="${C.border}" />
    <text x="195" y="315" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="${C.charcoalMuted}" text-anchor="middle">Zero Vesicle Exocytosis</text>

    <!-- Silenced Nerve Terminal -->
    <path d="M 195 320 L 195 348" stroke="${C.border}" stroke-width="3" stroke-linecap="round" stroke-dasharray="3,3" />
    <text x="195" y="340" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.clay}" text-anchor="middle">[ NO NEURAL SIGNAL ]</text>
  </g>
</svg>
`;
}

// 3B. SCIENTIFIC ILLUSTRATION
function getHairCellIllustrationSvg() {
  return `
<svg id="hairCellIllustrationSvg" viewBox="0 0 880 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scientific illustration: Ultrastructural transmission electron microscopy morphology of human sensory hair cells" style="width:100%; height:auto; display:block;">
  <rect width="880" height="400" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Header -->
  <g transform="translate(25, 20)">
    <rect width="830" height="38" fill="${C.white}" stroke="${C.border}" rx="10" ry="10" />
    <text x="20" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">
      ULTRASTRUCTURAL CYTOLOGY &middot; COCHLEAR ORGAN OF CORTI SENSORY MECHANORECEPTOR
    </text>
  </g>

  <!-- Left: TEM Labeled Morphology -->
  <g transform="translate(25, 68)">
    <rect width="450" height="312" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="18" y="22" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="600" fill="${C.forest}">ORGANELLE ANATOMY (INNER HAIR CELL)</text>

    <!-- Stereocilia Bundle W-Shape with Rootlets -->
    <g transform="translate(80, 40)">
      <rect x="50" y="10" width="10" height="85" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.5" rx="5" ry="5" />
      <line x1="55" y1="95" x2="55" y2="120" stroke="${C.forest}" stroke-width="1.8" />
      <rect x="75" y="30" width="10" height="65" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.5" rx="5" ry="5" />
      <line x1="80" y1="95" x2="80" y2="120" stroke="${C.forest}" stroke-width="1.8" />
      <rect x="100" y="50" width="10" height="45" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.5" rx="5" ry="5" />
      <line x1="105" y1="95" x2="105" y2="120" stroke="${C.forest}" stroke-width="1.8" />

      <!-- Tip Links & Ankyrin/Myosin XVIIa motors -->
      <line x1="60" y1="28" x2="75" y2="35" stroke="${C.clay}" stroke-width="2" />
      <circle cx="75" cy="35" r="2.5" fill="${C.clay}" />
      <line x1="85" y1="48" x2="100" y2="55" stroke="${C.clay}" stroke-width="2" />
      <circle cx="100" cy="55" r="2.5" fill="${C.clay}" />
    </g>

    <!-- Cuticular Plate -->
    <rect x="110" y="145" width="140" height="14" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.5" rx="4" ry="4" />
    <text x="260" y="156" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="${C.forest}">Cuticular Plate (Actin-spectrin mesh)</text>

    <!-- Lateral Wall Prestin Motor Lattice (Outer Hair Cell electromotility) -->
    <path d="M 125 159 L 110 245" stroke="${C.tealMuted}" stroke-width="3" stroke-dasharray="2,2" />
    <path d="M 235 159 L 250 245" stroke="${C.tealMuted}" stroke-width="3" stroke-dasharray="2,2" />
    <text x="260" y="200" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="${C.tealMuted}">Prestin Motor Array (OHC)</text>

    <!-- Synaptic Ribbon Complex -->
    <circle cx="180" cy="250" r="6" fill="${C.clay}" />
    <circle cx="172" cy="245" r="2" fill="${C.forest}" />
    <circle cx="188" cy="245" r="2" fill="${C.forest}" />
    <circle cx="174" cy="255" r="2" fill="${C.forest}" />
    <circle cx="186" cy="255" r="2" fill="${C.forest}" />
    <text x="260" y="252" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="${C.clay}">Synaptic Ribbon (CtBP2 / Bassoon)</text>

    <!-- Nerve Postsynaptic Terminal -->
    <path d="M 160 262 C 160 280, 200 280, 200 262" fill="none" stroke="${C.forest}" stroke-width="2" />
    <line x1="180" y1="275" x2="180" y2="300" stroke="${C.forest}" stroke-width="2.5" />
    <text x="260" y="285" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="${C.forest}">Postsynaptic AMPA Receptor Terminal</text>
  </g>

  <!-- Right: Clinical Pathology Comparison Table -->
  <g transform="translate(490, 68)">
    <rect width="365" height="312" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="18" y="22" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="600" fill="${C.forest}">MOLECULAR SENSITIVITY &amp; TRAUMA</text>

    <!-- Structural Breakdown Table -->
    <g transform="translate(15, 38)">
      <rect width="335" height="42" fill="${C.ivory}" stroke="${C.border}" rx="6" ry="6" />
      <text x="12" y="18" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}">Tip Links: Cadherin-23 &amp; PCDH15</text>
      <text x="12" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" fill="${C.charcoalMuted}">Helical dimer filament, 170 nm length, rupture tension ~10 pN.</text>
    </g>

    <g transform="translate(15, 88)">
      <rect width="335" height="42" fill="${C.ivory}" stroke="${C.border}" rx="6" ry="6" />
      <text x="12" y="18" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}">Channel Core: TMC1 / TMC2 Pore</text>
      <text x="12" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" fill="${C.charcoalMuted}">Opens in &lt;10 us, single channel conductance ~150 pS.</text>
    </g>

    <g transform="translate(15, 138)">
      <rect width="335" height="54" fill="${C.ivory}" stroke="${C.border}" rx="6" ry="6" />
      <text x="12" y="18" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.clay}">Temporary Threshold Shift (TTS)</text>
      <text x="12" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" fill="${C.charcoalMuted}">Reversible tip link tension loss. Hair cells restabilize in 24&ndash;48 hrs.</text>
      <text x="12" y="46" font-family="'Newsreader', serif" font-style="italic" font-size="8" fill="${C.clay}">Pickles et al. (1984) Hearing Research</text>
    </g>

    <g transform="translate(15, 200)">
      <rect width="335" height="54" fill="${C.clayPale}" stroke="${C.clay}" rx="6" ry="6" />
      <text x="12" y="18" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.clay}">Permanent Sensorineural Loss (PTS)</text>
      <text x="12" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" fill="${C.charcoal}">Complete stereocilia rootlet avulsion &amp; hair cell apoptosis. Irreversible.</text>
      <text x="12" y="46" font-family="'Newsreader', serif" font-style="italic" font-size="8" fill="${C.clay}">Schwander et al. (2010) J. Cell Biol.</text>
    </g>
  </g>
</svg>
`;
}

// ============================================================================
// DIAGRAM 4: HOW HEARING AIDS WORK
// ============================================================================

// 4A. ANIMATED VIEW
function getHearingAidAnimatedSvg() {
  return `
<svg id="hearingAidFunctionalSvg" data-view-mode="animated" viewBox="0 0 880 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated visualization: 6-stage signal processing chain of a digital hearing aid" style="width:100%; height:auto; display:block;">
  <style>
    .eq-bar { animation: liveOscilloscopeSine 1s infinite alternate ease-in-out; transform-origin: bottom; }
    .bit-pulse { stroke-dasharray: 4,4; animation: ionStreamFlow 0.7s infinite linear; }
  </style>

  <rect width="880" height="300" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Flow Arrows Between Stages -->
  <g stroke="${C.clay}" stroke-width="2.5" fill="none" stroke-linecap="round">
    <path d="M 135 150 L 155 150" marker-end="url(#arrow)" />
    <path d="M 280 150 L 300 150" />
    <path d="M 425 150 L 445 150" />
    <path d="M 570 150 L 590 150" />
    <path d="M 715 150 L 735 150" />
  </g>

  <!-- Stage 1: Sound Waves -->
  <g transform="translate(15, 45)">
    <rect width="120" height="210" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">STAGE 1</text>
    <text x="14" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.charcoal}">Acoustic Wave</text>

    <!-- Animated Wavefronts -->
    <path d="M 30 110 C 40 90, 40 150, 30 130" stroke="${C.tealMuted}" stroke-width="2.5" fill="none" class="ear-wave-fast" />
    <path d="M 50 110 C 60 90, 60 150, 50 130" stroke="${C.tealMuted}" stroke-width="2.5" fill="none" class="ear-wave-fast" style="animation-delay: 0.3s;" />
    <path d="M 70 110 C 80 90, 80 150, 70 130" stroke="${C.tealMuted}" stroke-width="2.5" fill="none" class="ear-wave-fast" style="animation-delay: 0.6s;" />

    <text x="60" y="185" font-family="'Newsreader', serif" font-style="italic" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">Air pressure</text>
  </g>

  <!-- Stage 2: Dual Microphones -->
  <g transform="translate(160, 45)">
    <rect width="120" height="210" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">STAGE 2</text>
    <text x="14" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.charcoal}">Dual Mics</text>

    <!-- Dual Mic Ports -->
    <rect x="45" y="80" width="30" height="24" fill="${C.stone}" stroke="${C.forest}" rx="4" ry="4" />
    <circle cx="60" cy="92" r="3" fill="${C.clay}" />
    <rect x="45" y="125" width="30" height="24" fill="${C.stone}" stroke="${C.forest}" rx="4" ry="4" />
    <circle cx="60" cy="137" r="3" fill="${C.clay}" />

    <text x="60" y="185" font-family="'Newsreader', serif" font-style="italic" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">Beamforming</text>
  </g>

  <!-- Stage 3: Digital Signal Processor (Bouncing EQ) -->
  <g transform="translate(305, 45)">
    <rect width="120" height="210" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.8" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">STAGE 3</text>
    <text x="14" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.forestDark}">DSP Core</text>

    <!-- Bouncing Graphic EQ Bars -->
    <g transform="translate(25, 85)">
      <rect x="0" y="25" width="8" height="35" fill="${C.forest}" class="eq-bar" />
      <rect x="14" y="10" width="8" height="50" fill="${C.forest}" class="eq-bar" style="animation-delay: 0.2s;" />
      <rect x="28" y="5" width="8" height="55" fill="${C.forest}" class="eq-bar" style="animation-delay: 0.5s;" />
      <rect x="42" y="18" width="8" height="42" fill="${C.forest}" class="eq-bar" style="animation-delay: 0.1s;" />
      <rect x="56" y="30" width="8" height="30" fill="${C.forest}" class="eq-bar" style="animation-delay: 0.4s;" />
    </g>

    <text x="60" y="185" font-family="'Newsreader', serif" font-style="italic" font-size="10" fill="${C.forest}" text-anchor="middle">16-Ch WDRC</text>
  </g>

  <!-- Stage 4: Power Amplifier -->
  <g transform="translate(450, 45)">
    <rect width="120" height="210" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">STAGE 4</text>
    <text x="14" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.charcoal}">Class-D Amp</text>

    <!-- High-Freq PWM Square Wave Pulses -->
    <path d="M 25 120 L 35 120 L 35 90 L 45 90 L 45 120 L 55 120 L 55 90 L 65 90 L 65 120 L 75 120 L 75 90 L 85 90 L 85 120 L 95 120" stroke="${C.clay}" stroke-width="2" fill="none" class="bit-pulse" />

    <text x="60" y="185" font-family="'Newsreader', serif" font-style="italic" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">+45 dB Boost</text>
  </g>

  <!-- Stage 5: Loudspeaker Receiver -->
  <g transform="translate(595, 45)">
    <rect width="120" height="210" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">STAGE 5</text>
    <text x="14" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.charcoal}">Receiver</text>

    <!-- Balanced Armature Motor Vibration -->
    <polygon points="35,100 65,85 65,135 35,120" fill="${C.stoneDark}" stroke="${C.forest}" stroke-width="1.5" />
    <rect x="65" y="95" width="25" height="30" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.2" />

    <text x="60" y="185" font-family="'Newsreader', serif" font-style="italic" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">Acoustic Motor</text>
  </g>

  <!-- Stage 6: Ear & Surviving Hair Cells -->
  <g transform="translate(740, 45)">
    <rect width="125" height="210" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">STAGE 6</text>
    <text x="14" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.charcoal}">Ear Canal</text>

    <!-- Amplified Acoustic Waves into Ear -->
    <path d="M 40 100 C 60 85, 60 145, 40 130" stroke="${C.clay}" stroke-width="3" fill="none" class="ear-wave-fast" />
    <path d="M 65 95 C 85 80, 85 150, 65 135" stroke="${C.clay}" stroke-width="3" fill="none" class="ear-wave-fast" style="animation-delay: 0.3s;" />

    <text x="62" y="185" font-family="'Newsreader', serif" font-style="italic" font-size="10" fill="${C.charcoalMuted}" text-anchor="middle">115 dB SPL</text>
  </g>
</svg>
`;
}

// 4B. SCIENTIFIC ILLUSTRATION
function getHearingAidIllustrationSvg() {
  return `
<svg id="hearingAidIllustrationSvg" viewBox="0 0 880 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scientific illustration: Mechanical and electronic cutaway of a modern Receiver-In-Canal hearing instrument" style="width:100%; height:auto; display:block;">
  <rect width="880" height="300" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Header -->
  <g transform="translate(25, 20)">
    <rect width="830" height="36" fill="${C.white}" stroke="${C.border}" rx="10" ry="10" />
    <text x="20" y="23" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">
      HARDWARE CUTAWAY &middot; MODERN RECEIVER-IN-CANAL (RIC) DIGITAL HEARING INSTRUMENT
    </text>
  </g>

  <!-- Left: BTE Body Cutaway -->
  <g transform="translate(25, 68)">
    <rect width="520" height="212" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="18" y="22" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="600" fill="${C.forest}">BEHIND-THE-EAR (BTE) HOUSING UNIT</text>

    <!-- Ergonomic Outer Shell Outline -->
    <path d="M 40 70 C 80 40, 160 45, 180 85 C 195 125, 185 175, 140 185 C 90 195, 45 160, 40 110 Z" fill="${C.ivory}" stroke="${C.stoneDark}" stroke-width="2" />

    <!-- Dual MEMS Microphones with Wind Mesh -->
    <rect x="75" y="52" width="16" height="12" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.2" rx="2" ry="2" />
    <circle cx="83" cy="58" r="2.5" fill="${C.clay}" />
    <rect x="135" y="58" width="16" height="12" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.2" rx="2" ry="2" />
    <circle cx="143" cy="64" r="2.5" fill="${C.clay}" />
    <text x="110" y="42" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.forest}" text-anchor="middle">Dual MEMS Ports (12 mm spacing)</text>

    <!-- Custom CMOS DSP Microchip Die -->
    <rect x="70" y="90" width="45" height="35" fill="${C.forestDark}" stroke="${C.forest}" stroke-width="1.5" rx="3" ry="3" />
    <text x="92" y="111" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="${C.white}" text-anchor="middle">DSP ASIC</text>
    <text x="92" y="138" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="${C.charcoalMuted}" text-anchor="middle">65nm CMOS Core</text>

    <!-- Rechargeable Li-Ion Battery -->
    <ellipse cx="140" cy="130" rx="25" ry="35" fill="${C.stone}" stroke="${C.border}" />
    <text x="140" y="134" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Li-Ion Cell</text>

    <!-- Specifications Column -->
    <g transform="translate(230, 45)">
      <text x="0" y="15" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}">TECHNICAL SPECIFICATIONS:</text>
      <text x="0" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">DSP Clock: 10.24 MHz Ultra-low power</text>
      <text x="0" y="48" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Audio Sampling: 24-bit @ 32 kHz</text>
      <text x="0" y="64" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">DSP Processing Delay: &lt; 4.5 ms latency</text>
      <text x="0" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Dynamic Range: 108 dB Input SPL</text>
      <text x="0" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Battery Runtime: 24+ hours per charge</text>
    </g>
  </g>

  <!-- Right: In-the-Canal Receiver Unit -->
  <g transform="translate(560, 68)">
    <rect width="295" height="212" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="18" y="22" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="600" fill="${C.forest}">RECEIVER ASSEMBLY (IN CANAL)</text>

    <!-- Flexible Wire Cable -->
    <path d="M 25 70 C 55 40, 80 50, 95 90" fill="none" stroke="${C.charcoal}" stroke-width="2.5" />
    <text x="50" y="42" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}">Kevlar Conductor</text>

    <!-- Balanced Armature Receiver Motor -->
    <g transform="translate(100, 70)">
      <rect width="80" height="42" fill="${C.stone}" stroke="${C.forest}" stroke-width="1.5" rx="3" ry="3" />
      <polygon points="50,12 75,2 75,40 50,30" fill="${C.stoneDark}" />
      <text x="40" y="25" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="${C.forest}" text-anchor="middle">Armature</text>
    </g>

    <!-- Custom Silicone Acoustic Dome with Vent -->
    <g transform="translate(195, 75)">
      <path d="M 10 0 C 40 5, 50 32, 10 32 Z" fill="${C.sagePale}" stroke="${C.forest}" stroke-width="1.5" />
      <circle cx="25" cy="16" r="3" fill="${C.white}" stroke="${C.clay}" />
      <text x="25" y="45" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.clay}" text-anchor="middle">Acoustic Vent</text>
    </g>

    <text x="145" y="165" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">
      Miniature loudspeaker seated directly adjacent to tympanic membrane
    </text>
  </g>
</svg>
`;
}

// ============================================================================
// DIAGRAM 5: HOW COCHLEAR IMPLANTS WORK (TRANSCUTANEOUS ARCHITECTURE)
// ============================================================================

// 5A. ANIMATED VIEW
function getImplantAnimatedSvg() {
  return `
<svg id="implantFlowSvg" data-view-mode="animated" viewBox="0 0 880 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated visualization: Transcutaneous signal transmission from external sound processor to intracochlear electrode array" style="width:100%; height:auto; display:block;">
  <style>
    .rf-wave { animation: rfInductionPulse 1.8s infinite ease-out; fill: none; stroke: ${C.clay}; stroke-width: 2.2; }
    .electrode-pulse { animation: electrodeFlashSequence 1.2s infinite ease-in-out; }
  </style>

  <rect width="880" height="320" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Dotted Transcutaneous Dermal Demarcation Line -->
  <line x1="440" y1="20" x2="440" y2="295" stroke="${C.clay}" stroke-width="2.5" stroke-dasharray="5,4" />
  <rect x="330" y="12" width="100" height="24" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
  <text x="380" y="28" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}" text-anchor="middle">EXTERNAL</text>
  <rect x="450" y="12" width="125" height="24" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
  <text x="512" y="28" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.clay}" text-anchor="middle">SUBCUTANEOUS</text>

  <!-- External Side: BTE Processor & Transmitting Coil -->
  <!-- Step 1: External Sound Processor & Microphones -->
  <g transform="translate(30, 55)">
    <rect width="180" height="235" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">STEP 1 &amp; 2</text>
    <text x="14" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.charcoal}">Sound Processor</text>

    <!-- Audio Inflow Wave -->
    <path d="M 25 90 C 35 75, 35 125, 25 110" stroke="${C.tealMuted}" stroke-width="2.5" fill="none" class="ear-wave-fast" />
    <circle cx="55" cy="85" r="4" fill="${C.forest}" />
    <text x="65" y="88" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.forest}">Dual Mics</text>

    <!-- CIS DSP Core -->
    <rect x="25" y="115" width="130" height="42" fill="${C.sagePale}" stroke="${C.forest}" rx="6" ry="6" />
    <text x="90" y="133" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}" text-anchor="middle">CIS Vocoder DSP</text>
    <text x="90" y="148" font-family="'Newsreader', serif" font-style="italic" font-size="8" fill="${C.charcoalMuted}" text-anchor="middle">Envelope detection</text>

    <text x="90" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoalMuted}" text-anchor="middle">Battery powered unit worn on ear</text>
  </g>

  <!-- Step 3: External RF Transmitter Coil with Animated Induction Waves -->
  <g transform="translate(240, 95)">
    <rect width="180" height="155" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.forest}">STEP 3</text>
    <text x="14" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.charcoal}">RF Transmitter</text>

    <!-- Magnet & Antenna Coil -->
    <ellipse cx="90" cy="90" rx="35" ry="35" fill="${C.stone}" stroke="${C.forest}" stroke-width="2" />
    <circle cx="90" cy="90" r="14" fill="${C.clay}" />
    <text x="90" y="94" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="${C.white}" text-anchor="middle">Magnet</text>

    <!-- Pulsing RF Waves -->
    <circle cx="90" cy="90" r="25" class="rf-wave" />
    <circle cx="90" cy="90" r="35" class="rf-wave" style="animation-delay: 0.6s;" />
    <circle cx="90" cy="90" r="45" class="rf-wave" style="animation-delay: 1.2s;" />

    <text x="90" y="142" font-family="'Newsreader', serif" font-style="italic" font-size="8.5" fill="${C.clay}" text-anchor="middle">5 MHz Inductive telemetry</text>
  </g>

  <!-- Internal Subcutaneous Side: Titanium Receiver & Intracochlear Array -->
  <!-- Step 4: Titanium Receiver-Stimulator -->
  <g transform="translate(460, 95)">
    <rect width="180" height="155" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.clay}">STEP 4</text>
    <text x="14" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.charcoal}">Titanium Receiver</text>

    <!-- Titanium Hermetic Capsule -->
    <rect x="25" y="60" width="130" height="60" fill="${C.stone}" stroke="${C.clay}" stroke-width="2" rx="10" ry="10" />
    <circle cx="90" cy="90" r="14" fill="${C.clay}" />
    <text x="90" y="94" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="${C.white}" text-anchor="middle">Magnet</text>
    <text x="90" y="140" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.forest}" text-anchor="middle">Demodulates RF</text>
  </g>

  <!-- Step 5 & 6: 22-Electrode Array & Firing Auditory Nerve -->
  <g transform="translate(665, 55)">
    <rect width="190" height="235" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${C.clay}">STEP 5 &amp; 6</text>
    <text x="14" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="${C.charcoal}">Cochlear Stimulation</text>

    <!-- Coiled Electrode Carrier in Scala Tympani -->
    <path d="M 25 130 C 55 90, 115 100, 145 130 C 165 155, 145 190, 100 180" fill="none" stroke="${C.stoneDark}" stroke-width="5" stroke-linecap="round" />

    <!-- Sequential Flashing Electrodes (Apex to Base) -->
    <circle cx="45" cy="112" r="3.5" class="electrode-pulse" />
    <circle cx="70" cy="100" r="3.5" class="electrode-pulse" style="animation-delay: 0.2s;" />
    <circle cx="95" cy="100" r="3.5" class="electrode-pulse" style="animation-delay: 0.4s;" />
    <circle cx="120" cy="110" r="3.5" class="electrode-pulse" style="animation-delay: 0.6s;" />
    <circle cx="140" cy="130" r="3.5" class="electrode-pulse" style="animation-delay: 0.8s;" />
    <circle cx="130" cy="165" r="3.5" class="electrode-pulse" style="animation-delay: 1.0s;" />

    <text x="95" y="80" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="${C.clay}" text-anchor="middle">22 Platinum Contacts</text>

    <!-- Nerve Action Potentials to Brainstem -->
    <path d="M 95 185 L 95 215" stroke="${C.clay}" stroke-width="3" stroke-linecap="round" class="nerve-firing" />
    <text x="95" y="205" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="${C.clay}" text-anchor="middle">Nerve Firing &rarr;</text>
  </g>
</svg>
`;
}

// 5B. SCIENTIFIC ILLUSTRATION
function getImplantIllustrationSvg() {
  return `
<svg id="implantIllustrationSvg" viewBox="0 0 880 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scientific illustration: Medical device architecture and surgical anatomical plate of a multichannel cochlear implant system" style="width:100%; height:auto; display:block;">
  <rect width="880" height="320" fill="${C.ivory}" stroke="${C.border}" stroke-width="1" rx="18" ry="18" />

  <!-- Header -->
  <g transform="translate(25, 20)">
    <rect width="830" height="36" fill="${C.white}" stroke="${C.border}" rx="10" ry="10" />
    <text x="20" y="23" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${C.forest}">
      SURGICAL &amp; NEUROPROSTHETIC SPECIFICATION &middot; TRANSCUTANEOUS BIONIC COCHLEA SYSTEM
    </text>
  </g>

  <!-- Left: Medical Architecture Cutaway -->
  <g transform="translate(25, 68)">
    <rect width="500" height="232" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="18" y="22" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="600" fill="${C.forest}">HARDWARE SPECIFICATIONS &amp; CASING</text>

    <!-- External Sound Processor Unit -->
    <g transform="translate(25, 45)">
      <path d="M 20 20 C 50 5, 90 10, 100 45 C 105 70, 95 110, 65 115 C 35 120, 15 95, 20 50 Z" fill="${C.ivory}" stroke="${C.stoneDark}" stroke-width="2" />
      <circle cx="35" cy="25" r="3" fill="${C.forest}" />
      <circle cx="75" cy="25" r="3" fill="${C.forest}" />
      <text x="55" y="15" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="${C.forest}" text-anchor="middle">Dual Mics</text>
      <text x="55" y="70" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="${C.charcoal}" text-anchor="middle">BTE Processor</text>
    </g>

    <!-- External Antenna Coil & Internal Titanium Package -->
    <g transform="translate(160, 45)">
      <!-- Skin Line -->
      <line x1="75" y1="5" x2="75" y2="135" stroke="${C.clay}" stroke-width="2" stroke-dasharray="3,3" />
      <text x="75" y="150" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.clay}" text-anchor="middle">Transcutaneous Barrier</text>

      <!-- External Coil -->
      <ellipse cx="45" cy="65" rx="24" ry="34" fill="${C.white}" stroke="${C.forest}" stroke-width="1.8" />
      <circle cx="45" cy="65" r="10" fill="${C.clay}" />
      <text x="45" y="69" font-family="'JetBrains Mono', monospace" font-size="7" fill="${C.white}" text-anchor="middle">NdFeB</text>

      <!-- Internal Titanium Stimulator -->
      <rect x="100" y="35" width="80" height="60" fill="${C.stone}" stroke="${C.forest}" stroke-width="2" rx="8" ry="8" />
      <circle cx="140" cy="65" r="10" fill="${C.clay}" />
      <text x="140" y="69" font-family="'JetBrains Mono', monospace" font-size="7" fill="${C.white}" text-anchor="middle">NdFeB</text>
      <text x="140" y="112" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="${C.forest}" text-anchor="middle">Titanium Grade 2</text>
    </g>

    <!-- Detailed Hardware Metrics Table -->
    <g transform="translate(365, 45)">
      <text x="0" y="15" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}">IMPLANT METRICS:</text>
      <text x="0" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">RF Carrier: 5.0 MHz inductive link</text>
      <text x="0" y="48" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Power Source: Inductive power transfer</text>
      <text x="0" y="64" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Telemetry: Bidirectional neural response</text>
      <text x="0" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Stimulation Rate: Up to 50,000 pps</text>
      <text x="0" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="${C.charcoal}">Laser-welded hermetic ceramic seal</text>
    </g>
  </g>

  <!-- Right: Surgical Anatomical Placement in Temporal Bone -->
  <g transform="translate(540, 68)">
    <rect width="315" height="232" fill="${C.white}" stroke="${C.border}" rx="12" ry="12" />
    <text x="18" y="22" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="600" fill="${C.forest}">SURGICAL OTOLOGIC ANATOMY</text>

    <!-- Temporal Bone Mastoid Well -->
    <path d="M 30 70 C 60 45, 120 50, 150 85 C 180 120, 200 170, 160 200" fill="none" stroke="${C.stoneDark}" stroke-width="3" />
    <text x="95" y="45" font-family="'JetBrains Mono', monospace" font-size="8" fill="${C.charcoalMuted}">Mastoidectomy Recess</text>

    <!-- Posterior Tympanotomy & Round Window Entry -->
    <path d="M 125 110 L 155 130" stroke="${C.clay}" stroke-width="2" stroke-linecap="round" />
    <circle cx="155" cy="130" r="4" fill="${C.clay}" />
    <text x="165" y="125" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="${C.clay}">Round Window</text>

    <!-- Contoured Perimodiolar 22-Electrode Lead in Scala Tympani -->
    <path d="M 155 130 C 185 140, 220 160, 240 185 C 255 205, 235 225, 205 215" fill="none" stroke="${C.forest}" stroke-width="4.5" stroke-linecap="round" />
    <circle cx="175" cy="140" r="2.5" fill="${C.white}" stroke="${C.clay}" />
    <circle cx="198" cy="155" r="2.5" fill="${C.white}" stroke="${C.clay}" />
    <circle cx="220" cy="175" r="2.5" fill="${C.white}" stroke="${C.clay}" />
    <circle cx="235" cy="198" r="2.5" fill="${C.white}" stroke="${C.clay}" />
    <circle cx="215" cy="216" r="2.5" fill="${C.white}" stroke="${C.clay}" />

    <text x="160" y="215" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="${C.forest}">Scala Tympani</text>
    <text x="160" y="228" font-family="'Newsreader', serif" font-style="italic" font-size="8.5" fill="${C.charcoalMuted}">Direct Spiral Ganglion excitation</text>
  </g>
</svg>
`;
}

console.log('All 10 dual-view SVG generators defined successfully.');

module.exports = {
  getEarAnimatedMotionSvg,
  getEarScientificIllustrationSvg,
  getAcousticToElectricAnimatedSvg,
  getAcousticToElectricIllustrationSvg,
  getHairCellAnimatedSvg,
  getHairCellIllustrationSvg,
  getHearingAidAnimatedSvg,
  getHearingAidIllustrationSvg,
  getImplantAnimatedSvg,
  getImplantIllustrationSvg
};
