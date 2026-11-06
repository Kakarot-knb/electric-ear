// Append HTML and Client Script to build_resonance_master.js
const fs = require('fs');
const { upgradedWaveStudioCode } = require('./upgraded_wave_studio.js');

const visualBase = fs.readFileSync('build_visual_resonance.js', 'utf8');

// Extract client script from build_visual_resonance.js
const clientStart = visualBase.indexOf('function getClientScript() {');
const clientEnd = visualBase.indexOf('function buildSite()');
let clientScriptBody = visualBase.slice(clientStart, clientEnd).trim();

// Apply critical bug fixes to client script:
// 1. Fix dur.toFixed(2) error on line 1181:
clientScriptBody = clientScriptBody.replace(
  "const dur = currentAudioBuffer ? currentAudioBuffer.duration : 0;",
  "const dur = (currentAudioBuffer && typeof currentAudioBuffer.duration === 'number') ? currentAudioBuffer.duration : 0;"
);
clientScriptBody = clientScriptBody.replace(
  "playbackTime.textContent = curr.toFixed(2) + 's / ' + dur.toFixed(2) + 's';",
  "playbackTime.textContent = (typeof curr === 'number' ? curr.toFixed(2) : '0.00') + 's / ' + (typeof dur === 'number' ? dur.toFixed(2) : '0.00') + 's';"
);

// 2. Wire up btnStopDemo and support both btnDemoDegraded and btnDemoAid
clientScriptBody = clientScriptBody.replace(
  "const btnDegraded = document.getElementById('btnDemoDegraded');",
  "const btnDegraded = document.getElementById('btnDemoDegraded') || document.getElementById('btnDemoAid');\n  const btnStop = document.getElementById('btnStopDemo');"
);
clientScriptBody = clientScriptBody.replace(
  "const status = document.getElementById('demoAudioStatus');",
  "const status = document.getElementById('demoAudioStatus') || document.getElementById('demoNotice');"
);

// In playOption: show btnStopDemo when playing, hide on ended
clientScriptBody = clientScriptBody.replace(
  "currentDemoSource.onended = () => {\n      status.textContent = 'Audio playback completed.';\n    };",
  "if (btnStop) btnStop.style.display = 'inline-flex';\n    currentDemoSource.onended = () => {\n      status.textContent = 'Audio playback completed.';\n      if (btnStop) btnStop.style.display = 'none';\n    };"
);

// Add btnStop click listener and support stopCurrentDemo
clientScriptBody = clientScriptBody.replace(
  "btnImplant.addEventListener('click', () => playOption('implant'));",
  `btnImplant.addEventListener('click', () => playOption('implant'));
  if (btnStop) {
    btnStop.addEventListener('click', () => {
      stopCurrentDemo();
      if (status) status.textContent = 'Audio stopped by user.';
      btnStop.style.display = 'none';
      showCaption('[Audio stopped]', 1500);
    });
  }`
);

// Support both expResultsCanvas and shannonCanvas
clientScriptBody = clientScriptBody.replace(
  "const canvas = document.getElementById('expResultsCanvas');",
  "const canvas = document.getElementById('expResultsCanvas') || document.getElementById('shannonCanvas');"
);
clientScriptBody = clientScriptBody.replace(
  "document.getElementById('expResultsCanvas').scrollIntoView({ behavior: 'smooth' });",
  "const resCv = document.getElementById('expResultsCanvas') || document.getElementById('shannonCanvas'); if (resCv) resCv.scrollIntoView({ behavior: 'smooth' });"
);

// Upgrade Section 2 Wave & Particle Studio with 60fps physics, bidirectional binding, and zero latency
const waveStart = clientScriptBody.indexOf('function initWaveStudio() {');
const waveEnd = clientScriptBody.indexOf('// ----------------------------------------------------------------------------\n// SECTION 3: THE EAR AS A MACHINE', waveStart);
if (waveStart !== -1 && waveEnd !== -1) {
  clientScriptBody = clientScriptBody.slice(0, waveStart) + upgradedWaveStudioCode + '\n\n' + clientScriptBody.slice(waveEnd);
}

// Add Mobile Navigation Drawer Toggle, Back-To-Top Button, Scroll Observer, and Interactive Stage Inspectors
const newFeaturesScript = `
// ----------------------------------------------------------------------------
// INTERACTIVE DIAGRAM DATA & INSPECTORS
// ----------------------------------------------------------------------------
const HAIR_CELL_COMPONENTS = {
  "bundle": {
    title: "STEREOCILIA BUNDLE (3-TIERED STAIRCASE)",
    desc: "Each hair cell carries 50-100 actin-filled stereocilia arranged in ascending height tiers. Mechanical fluid motion deflects the bundle toward the tallest kinocilium, placing tension on tip links.",
    ref: "Pickles, J. O. et al. (1984). Hearing Research, 15(3), 269-282."
  },
  "tiplink": {
    title: "CADHERIN-23 & PROTOCADHERIN-15 TIP LINKS",
    desc: "Fine extracellular helical filaments connecting the tip of each stereocilium to its taller neighbor. Tension pulls directly on the molecular gates of mechanotransduction (MET) ion channels.",
    ref: "Schwander, M. et al. (2010). Journal of Cell Biology, 190(1), 9-20."
  },
  "met": {
    title: "MECHANOTRANSDUCTION (MET) ION CHANNELS",
    desc: "TMC1/TMC2 channel complexes open within microseconds of deflection. Abundant K+ and Ca2+ ions from the +80 mV endolymph flow inward, rapidly depolarizing the cell membrane from -45 mV to -20 mV.",
    ref: "Kawashima, Y. et al. (2011). Journal of Clinical Investigation, 121(12), 4796-4809."
  },
  "synapse": {
    title: "SYNAPTIC RIBBON & AUDITORY NERVE DENDRITES",
    desc: "Specialized presynaptic protein scaffolding holds hundreds of glutamate neurotransmitter vesicles. Voltage-gated Ca2+ influx triggers vesicle fusion, releasing neurotransmitter to fire action potentials along Cranial Nerve VIII.",
    ref: "Moser, T. et al. (2006). Trends in Neurosciences, 29(5), 241-248."
  }
};

const AID_STAGES_INFO = {
  "1": {
    title: "STAGE 1: ACOUSTIC SOUND WAVES IN AIR",
    desc: "Traveling longitudinal pressure waves created by vibrating vocal cords or instruments. Molecules oscillate back and forth at acoustic pressures between 20 uPa (threshold of hearing) and 2 Pa (loud speech), transmitting acoustic energy toward the ear pinna.",
    note: "Signal Domain: Atmospheric Pressure Variations (Pascals)"
  },
  "2": {
    title: "STAGE 2: DUAL DIRECTIONAL MEMS MICROPHONES",
    desc: "Two ultra-miniature micro-electro-mechanical system (MEMS) silicon microphones spaced ~10-15 mm apart on the hearing aid body. By subtracting the delayed signal of the rear microphone from the front microphone, the device cancels sounds arriving from behind while preserving speech from the front.",
    note: "Signal Domain: Transduced Analog Electrical Voltage (Microvolts to Millivolts)"
  },
  "3": {
    title: "STAGE 3: DIGITAL SIGNAL PROCESSOR (DSP)",
    desc: "An ultra-low-power CMOS integrated circuit running on ~1 Volt. It splits audio into 16 to 48 independent frequency channels, applies customized gain curves matching the patient's audiogram, compresses loud sounds (WDRC) so they do not hurt, and cancels acoustic squeal (feedback).",
    note: "Signal Domain: Digital Binary Floating-Point Computations (Under 5 ms Latency)"
  },
  "4": {
    title: "STAGE 4: LINEAR POWER AMPLIFIER",
    desc: "A high-efficiency Class-D pulse-width modulation (PWM) amplifier that boosts the electrical power of the processed signal by +30 dB to +65 dB SPL, driving the loudspeaker transducer while drawing minimal current from the zinc-air or lithium-ion battery cell.",
    note: "Signal Domain: Amplified Analog Drive Current (Milliamperes)"
  },
  "5": {
    title: "STAGE 5: BALANCED-ARMATURE LOUDSPEAKER (RECEIVER)",
    desc: "A precision electromagnetic motor consisting of a magnetic armature centered between two permanent magnets and linked to a lightweight aluminum diaphragm. It converts amplified electrical pulses back into high-fidelity acoustic airwaves with negligible harmonic distortion.",
    note: "Signal Domain: Amplified Acoustic Pressure Waves (Up to 110-130 dB SPL)"
  },
  "6": {
    title: "STAGE 6: THE EAR CANAL & SURVIVING HAIR CELLS",
    desc: "The amplified air pressure wave enters the external ear canal through a custom silicone dome or earmold, vibrating the tympanic membrane with high mechanical force. This wave travels through the ossicles into the cochlear fluid, where viable hair cells can detect it and trigger hearing.",
    note: "Biological Constraint: Requires functional sensory hair cells to transduce the amplified wave!"
  }
};

function initAidStageInspector() {
  const cards = document.querySelectorAll('.aid-stage, .aid-pill-btn');
  const title = document.getElementById('aidStepTitle');
  const domain = document.getElementById('aidEnergyDomain');
  const desc = document.getElementById('aidDescription');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const step = card.dataset.aidStage;
      const data = AID_STAGES_INFO[step];
      if (!data) return;

      document.querySelectorAll('.aid-stage').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.aid-pill-btn').forEach(b => b.classList.remove('active'));

      const activeSvgStage = document.getElementById('aidStage' + step);
      if (activeSvgStage) activeSvgStage.classList.add('active');

      const activePill = document.querySelector('.aid-pill-btn[data-aid-stage="' + step + '"]');
      if (activePill) activePill.classList.add('active');

      if (title) title.textContent = data.title;
      if (domain) domain.textContent = data.note;
      if (desc) desc.textContent = data.desc;
    });
  });
}

function initHairCellInspector() {
  const btns = document.querySelectorAll('.hair-cell-part-btn');
  const title = document.getElementById('hairCellPartTitle');
  const desc = document.getElementById('hairCellPartDesc');
  const ref = document.getElementById('hairCellPartRef');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const partKey = btn.dataset.part;
      const data = HAIR_CELL_COMPONENTS[partKey];
      if (!data) return;

      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.desc;
      if (ref) ref.textContent = 'Reference: ' + data.ref;
    });
  });
}

function initMobileNavAndScroll() {
  // Mobile Nav Toggle
  const btnToggle = document.getElementById('btnMobileNav');
  const drawer = document.getElementById('mobileNavDrawer');
  const overlay = document.getElementById('mobileNavOverlay');
  const btnClose = document.getElementById('mobileNavClose');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  if (btnToggle) btnToggle.addEventListener('click', openDrawer);
  if (btnClose) btnClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Back to Top Button
  const btnBackToTop = document.getElementById('btnBackToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      if (btnBackToTop) btnBackToTop.classList.add('visible');
    } else {
      if (btnBackToTop) btnBackToTop.classList.remove('visible');
    }
  });

  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll Spy / Intersection Observer for Navigation Links
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(sec => observer.observe(sec));
}

// Hook up Companion Buttons for Ear Anatomy and Implant Flow
function initCompanionDiagramButtons() {
  document.querySelectorAll('.ear-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const part = btn.dataset.part;
      if (typeof EAR_PARTS_INFO !== 'undefined' && EAR_PARTS_INFO[part]) {
        const data = EAR_PARTS_INFO[part];
        const nameEl = document.getElementById('earPartName');
        const roleEl = document.getElementById('earPartRole');
        const descEl = document.getElementById('earPartPhysics');
        if (nameEl) nameEl.textContent = data.name;
        if (roleEl) roleEl.textContent = data.role;
        if (descEl) descEl.textContent = data.desc;
      }
      document.querySelectorAll('.ear-part').forEach(el => {
        el.classList.toggle('active', el.dataset.part === part);
      });
      document.querySelectorAll('.ear-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.flow-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.dataset.step;
      const svgStep = document.getElementById('flowStep' + step);
      if (svgStep) {
        try {
          svgStep.dispatchEvent(new MouseEvent('click'));
        } catch(e) {}
      }
      document.querySelectorAll('.flow-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// Dual-View Scientific Diagram Switcher (Animated View vs Scientific Illustration)
function initDualViewDiagrams() {
  const toggleBtns = document.querySelectorAll('.view-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const diagramKey = btn.dataset.diagram;
      const targetView = btn.dataset.view; // 'animated' or 'illustration'
      if (!diagramKey || !targetView) return;

      // Update button states in this diagram's group
      const groupBtns = document.querySelectorAll('.view-toggle-btn[data-diagram="' + diagramKey + '"]');
      groupBtns.forEach(b => {
        const isActive = b.dataset.view === targetView;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Switch view visibility
      const animatedView = document.getElementById(diagramKey + 'ViewAnimated');
      const illustrationView = document.getElementById(diagramKey + 'ViewIllustration');

      if (animatedView && illustrationView) {
        if (targetView === 'animated') {
          animatedView.classList.remove('hidden');
          illustrationView.classList.add('hidden');
        } else {
          animatedView.classList.add('hidden');
          illustrationView.classList.remove('hidden');
        }
      }
    });
  });
}
`;

// Insert new features into DOMContentLoaded in clientScriptBody
clientScriptBody = clientScriptBody.replace(
  "initMusicChallenge();",
  `initMusicChallenge();
  initAidStageInspector();
  initHairCellInspector();
  initMobileNavAndScroll();
  initCompanionDiagramButtons();
  initDualViewDiagrams();`
);

// Append new features to clientScriptBody
const insertionIndex = clientScriptBody.lastIndexOf('document.addEventListener(\'DOMContentLoaded\'');
clientScriptBody = clientScriptBody.slice(0, insertionIndex) + '\n' + newFeaturesScript + '\n' + clientScriptBody.slice(insertionIndex);

// Strip outer function wrapper and return backticks if present
if (clientScriptBody.includes('return `')) {
  const returnIdx = clientScriptBody.indexOf('return `') + 'return `'.length;
  const endIdx = clientScriptBody.lastIndexOf('`;');
  if (returnIdx !== -1 && endIdx !== -1) {
    clientScriptBody = clientScriptBody.slice(returnIdx, endIdx).trim();
  }
}

console.log('Client script patched with all bug fixes and interactive features.');

module.exports = {
  clientScriptBody
};
