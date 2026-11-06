const fs = require('fs');
const vm = require('vm');

console.log('--- COMPREHENSIVE RESONANCE VERIFICATION SUITE ---');

const html = fs.readFileSync('index.html', 'utf8');
console.log('1. File size:', (html.length / 1024).toFixed(1), 'KB');

// 1. EMOJI AUDIT
const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;
const emojiMatch = html.match(emojiRegex);
if (emojiMatch) {
  console.error('FAIL: Found forbidden emoji:', emojiMatch[0]);
  process.exit(1);
}
console.log('PASS: Zero emojis found in entire file.');

// 2. CSS GRADIENTS AUDIT
const cssGradients = html.match(/linear-gradient|radial-gradient|conic-gradient|-webkit-gradient/gi);
if (cssGradients) {
  console.error('FAIL: Found CSS gradients:', cssGradients);
  process.exit(1);
}
console.log('PASS: Zero CSS gradients found (100% solid editorial palette).');

// 3. QUIZ / FAQ / QUESTIONS SECTION AUDIT
const cleanHtml = html.replace(/<!--[\s\S]*?-->/g, '');
if (/<section[^>]*id=["'](?:quiz|faq|questions)["']/i.test(html) ||
    /<h[1-6][^>]*>(?:quiz|faq|questions|test your knowledge)/i.test(cleanHtml)) {
  console.error('FAIL: Found quiz or questions section!');
  process.exit(1);
}
console.log('PASS: Zero quiz/FAQ/questions sections. Clean natural conclusion.');

// 4. DUAL-VIEW SCIENTIFIC DIAGRAM AUDIT (5 Major Diagrams with 2 Distinct Views Each)
const dualViewWrappers = [
  { name: 'Diagram A: Ear Anatomy Dual View', id: 'earAnatomyDualDiagram' },
  { name: 'Diagram E: Acoustic-Electric Dual View', id: 'acousticElectricDualDiagram' },
  { name: 'Diagram B: Hair Cell Dual View', id: 'hairCellDualDiagram' },
  { name: 'Diagram C: Hearing Aid Dual View', id: 'hearingAidDualDiagram' },
  { name: 'Diagram D: Cochlear Implant Dual View', id: 'implantDualDiagram' }
];

dualViewWrappers.forEach(d => {
  if (!html.includes(d.id)) {
    console.error(`FAIL: Missing dual-view wrapper ${d.name} (${d.id})`);
    process.exit(1);
  }
  console.log(`PASS: Found dual-view container ${d.name}`);
});

const individualViews = [
  'earAnatomyViewAnimated',
  'earAnatomyViewIllustration',
  'acousticElectricViewAnimated',
  'acousticElectricViewIllustration',
  'hairCellViewAnimated',
  'hairCellViewIllustration',
  'hearingAidViewAnimated',
  'hearingAidViewIllustration',
  'implantViewAnimated',
  'implantViewIllustration'
];

individualViews.forEach(viewId => {
  if (!html.includes(viewId)) {
    console.error(`FAIL: Missing individual view element id="${viewId}"`);
    process.exit(1);
  }
  console.log(`PASS: Found view element #${viewId}`);
});

// 5. AUTHENTIC PHOTOGRAPHY AUDIT
const photoChecks = [
  'images.unsplash.com',
  /Behind-the-Ear/i,
  /Receiver-in-Canal/i,
  /In-the-Ear/i,
  /microchip/i,
  /audiology/i
];
photoChecks.forEach(pattern => {
  const isMatch = typeof pattern === 'string' ? html.includes(pattern) : pattern.test(html);
  if (!isMatch) {
    console.warn(`WARN: Photo check term '${pattern}' not found in HTML.`);
  } else {
    console.log(`PASS: Photo content verified: contains '${pattern}'`);
  }
});

// 6. DOM SIMULATION & INTERACTIVE BEHAVIOR TEST
class MockElement {
  constructor(id = '', tag = 'div', className = '') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.className = className;
    this.style = {};
    this.listeners = {};
    this.textContent = '';
    this.innerHTML = '';
    this.value = '0';
    this.checked = false;
    this.dataset = {};
    this.width = 300;
    this.height = 150;
    this.attributes = {};
    this.parentElement = { clientWidth: 800, clientHeight: 200 };
    this.classList = {
      _classes: new Set(className ? className.split(/\s+/) : []),
      add: function(c) { this._classes.add(c); },
      remove: function(c) { this._classes.delete(c); },
      contains: function(c) { return this._classes.has(c); },
      toggle: function(c, force) {
        if (typeof force === 'boolean') {
          if (force) this.add(c); else this.remove(c);
        } else {
          if (this.contains(c)) this.remove(c); else this.add(c);
        }
      }
    };
    this.children = [];
  }
  appendChild(child) { this.children.push(child); }
  setAttribute(attr, val) { this.attributes[attr] = val; }
  getAttribute(attr) { return this.attributes[attr] || null; }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  dispatchEvent(evt) {
    const type = evt.type || 'click';
    if (this.listeners[type]) {
      this.listeners[type].forEach(fn => fn(evt));
    }
  }
  getContext() {
    return {
      save: () => {},
      restore: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      closePath: () => {},
      clearRect: () => {},
      fillRect: () => {},
      strokeRect: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      fill: () => {},
      fillText: () => {},
      measureText: () => ({ width: 10 }),
      arc: () => {},
      ellipse: () => {},
      setLineDash: () => {},
      createLinearGradient: () => ({ addColorStop: () => {} })
    };
  }
  scrollIntoView() {}
}

const elementsById = {};
const allElements = [];

// Extract all tags with id, class, data attributes from html
const tagRegex = /<([a-z0-9-]+)([^>]*)>/gi;
let match;
while ((match = tagRegex.exec(html)) !== null) {
  const tag = match[1];
  const attrs = match[2];
  
  const idMatch = attrs.match(/id=["']([^"']+)["']/i);
  const classMatch = attrs.match(/class=["']([^"']+)["']/i);
  const dataMatches = [...attrs.matchAll(/data-([a-z0-9-]+)=["']([^"']+)["']/gi)];
  
  const id = idMatch ? idMatch[1] : '';
  const cls = classMatch ? classMatch[1] : '';
  
  const el = new MockElement(id, tag, cls);
  dataMatches.forEach(dm => {
    const key = dm[1].replace(/-([a-z])/g, (_, l) => l.toUpperCase());
    el.dataset[key] = dm[2];
  });
  
  if (id) elementsById[id] = el;
  allElements.push(el);
}

console.log(`PASS: Parsed ${Object.keys(elementsById).length} elements with IDs and ${allElements.length} total elements.`);

const mockDocument = {
  createElement: (tag) => {
    const el = new MockElement('', tag);
    allElements.push(el);
    return el;
  },
  getElementById: (id) => elementsById[id] || null,
  querySelectorAll: (selector) => {
    if (selector.startsWith('.')) {
      const cls = selector.slice(1);
      return allElements.filter(el => el.classList.contains(cls));
    }
    if (selector.includes(',')) {
      const parts = selector.split(',').map(s => s.trim());
      const res = new Set();
      parts.forEach(part => {
        mockDocument.querySelectorAll(part).forEach(e => res.add(e));
      });
      return Array.from(res);
    }
    if (selector.includes('[')) {
      const classMatch = selector.match(/^\.([a-z0-9_-]+)/i);
      const baseClass = classMatch ? classMatch[1] : '';
      const attrMatches = [...selector.matchAll(/\[data-([a-z0-9-]+)=["']?([^"']+)["']?\]/gi)];
      
      return allElements.filter(el => {
        if (baseClass && !el.classList.contains(baseClass)) return false;
        for (const am of attrMatches) {
          const key = am[1].replace(/-([a-z])/g, (_, l) => l.toUpperCase());
          const val = am[2];
          if (el.dataset[key] !== val) return false;
        }
        return true;
      });
    }
    return [];
  },
  querySelector: (selector) => {
    const list = mockDocument.querySelectorAll(selector);
    return list.length > 0 ? list[0] : null;
  },
  body: elementsById['body'] || new MockElement('body'),
  addEventListener: () => {}
};

// Extract JS
const scriptStart = html.indexOf('<script>') + '<script>'.length;
const scriptEnd = html.lastIndexOf('</script>');
const clientJs = html.slice(scriptStart, scriptEnd);

const mockOsc = {
  connect: () => {},
  start: () => {},
  stop: () => {},
  frequency: { value: 440, setValueAtTime: () => {} },
  type: 'sine'
};

const sandbox = {
  console: {
    log: () => {},
    warn: (m) => console.log('  [SANDBOX WARN]', m),
    error: (e) => console.error('  [SANDBOX ERROR]', e)
  },
  document: mockDocument,
  window: {
    addEventListener: () => {},
    scrollTo: () => {},
    innerWidth: 1024,
    innerHeight: 768,
    AudioContext: class {
      constructor() { this.state = 'running'; this.destination = {}; }
      resume() { return Promise.resolve(); }
      decodeAudioData() { return Promise.resolve({ duration: 3.5, getChannelData: () => new Float32Array(1000) }); }
      createBuffer() { return { duration: 3.5, copyToChannel: () => {}, getChannelData: () => new Float32Array(100) }; }
      createBufferSource() { return { connect: () => {}, start: () => {}, stop: () => {} }; }
      createOscillator() { return mockOsc; }
      createAnalyser() { return { connect: () => {}, fftSize: 2048, frequencyBinCount: 1024, getByteTimeDomainData: () => {}, getByteFrequencyData: () => {} }; }
      createBiquadFilter() { return { connect: () => {}, frequency: { value: 1000 }, Q: { value: 1 } }; }
      createGain() { return { connect: () => {}, gain: { value: 1, setValueAtTime: () => {}, linearRampToValueAtTime: () => {} } }; }
    },
    MouseEvent: class {
      constructor(type) { this.type = type; }
    },
    IntersectionObserver: class {
      constructor(callback) { this.cb = callback; }
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  },
  MouseEvent: class {
    constructor(type) { this.type = type; }
  },
  IntersectionObserver: class {
    constructor(callback) { this.cb = callback; }
    observe() {}
    unobserve() {}
    disconnect() {}
  },
  setTimeout: (fn) => 1,
  clearTimeout: () => {},
  setInterval: (fn) => 2,
  clearInterval: () => {},
  requestAnimationFrame: () => 3,
  atob: (s) => Buffer.from(s, 'base64').toString('binary')
};

vm.createContext(sandbox);

try {
  vm.runInContext(clientJs, sandbox);
  console.log('PASS: Client JS evaluated in sandbox without syntax errors.');

  // Run all initialization routines
  const initRoutines = [
    'initHeroWave',
    'initWaveStudio',
    'initEarMachine',
    'initCochleaAnalyzer',
    'initHearingLossDemo',
    'initImplantPipeline',
    'initSimulator',
    'initExperiment',
    'initMusicChallenge',
    'initAidStageInspector',
    'initHairCellInspector',
    'initMobileNavAndScroll',
    'initCompanionDiagramButtons',
    'initDualViewDiagrams'
  ];

  initRoutines.forEach(fnName => {
    if (typeof sandbox[fnName] === 'function') {
      sandbox[fnName]();
      console.log(`PASS: Executed ${fnName}() successfully.`);
    } else {
      console.error(`FAIL: ${fnName} is not a function in sandbox!`);
      process.exit(1);
    }
  });

  // Test interactive simulations
  console.log('--- Testing Interactive Dispatches ---');

  // 1. Test clicking hearing aid stage cards
  const aidStages = mockDocument.querySelectorAll('.aid-stage');
  console.log(`Testing ${aidStages.length} Hearing Aid stage cards...`);
  aidStages.forEach((stage, idx) => {
    stage.dispatchEvent({ type: 'click' });
  });
  console.log('PASS: Hearing Aid stage cards click handlers executed.');

  // 2. Test clicking hair cell part buttons
  const hairCellBtns = mockDocument.querySelectorAll('.hair-cell-part-btn');
  console.log(`Testing ${hairCellBtns.length} Hair Cell component buttons...`);
  hairCellBtns.forEach(btn => {
    btn.dispatchEvent({ type: 'click' });
  });
  console.log('PASS: Hair Cell component buttons click handlers executed.');

  // 3. Test clicking ear anatomy pills
  const earPills = mockDocument.querySelectorAll('.ear-pill-btn');
  console.log(`Testing ${earPills.length} Ear Machine anatomy pills...`);
  earPills.forEach(btn => {
    btn.dispatchEvent({ type: 'click' });
  });
  console.log('PASS: Ear Machine anatomy pills click handlers executed.');

  // 4. Test clicking cochlear implant flow pills
  const flowPills = mockDocument.querySelectorAll('.flow-pill-btn');
  console.log(`Testing ${flowPills.length} Cochlear Implant flow pills...`);
  flowPills.forEach(btn => {
    btn.dispatchEvent({ type: 'click' });
  });
  console.log('PASS: Cochlear Implant flow pills click handlers executed.');

  // 5. TEST DUAL-VIEW SWITCHING ON ALL 5 DIAGRAMS
  console.log('--- Testing Dual-View Toggle Switchers ---');
  const viewToggleButtons = mockDocument.querySelectorAll('.view-toggle-btn');
  console.log(`Found ${viewToggleButtons.length} dual-view switcher buttons.`);
  if (viewToggleButtons.length < 10) {
    console.error('FAIL: Expected at least 10 view switcher buttons (2 per diagram x 5 diagrams)!');
    process.exit(1);
  }

  const diagramKeys = ['earAnatomy', 'acousticElectric', 'hairCell', 'hearingAid', 'implant'];
  diagramKeys.forEach(key => {
    const btnIllustration = allElements.find(el => el.classList.contains('view-toggle-btn') && el.dataset.diagram === key && el.dataset.view === 'illustration');
    const btnAnimated = allElements.find(el => el.classList.contains('view-toggle-btn') && el.dataset.diagram === key && el.dataset.view === 'animated');

    if (!btnIllustration || !btnAnimated) {
      console.error(`FAIL: Missing toggle buttons for diagram ${key}`);
      process.exit(1);
    }

    // Switch to Illustration
    btnIllustration.dispatchEvent({ type: 'click' });
    const animView = elementsById[`${key}ViewAnimated`];
    const illusView = elementsById[`${key}ViewIllustration`];

    if (!illusView || !animView) {
      console.error(`FAIL: Missing view elements for diagram ${key}`);
      process.exit(1);
    }

    if (!animView.classList.contains('hidden') || illusView.classList.contains('hidden')) {
      console.error(`FAIL: Switch to illustration failed for ${key}`);
      process.exit(1);
    }
    console.log(`PASS: Diagram ${key} successfully switched to Scientific Illustration.`);

    // Switch back to Animated
    btnAnimated.dispatchEvent({ type: 'click' });
    if (animView.classList.contains('hidden') || !illusView.classList.contains('hidden')) {
      console.error(`FAIL: Switch back to animated failed for ${key}`);
      process.exit(1);
    }
    console.log(`PASS: Diagram ${key} successfully switched back to Animated View.`);
  });

  // 6. Test audio playback and interactive buttons
  const audioButtons = [
    'btnToggleTone',
    'btnToggleMic',
    'btnImpLever',
    'btnImpDirect',
    'btnToggleCochleaTone',
    'btnDemoNormal',
    'btnDemoDegraded',
    'btnDemoImplant',
    'btnStopDemo',
    'btnPlaySim',
    'btnToggleMode',
    'btnPlayRound',
    'btnPlayMusic'
  ];
  audioButtons.forEach(btnId => {
    const btn = elementsById[btnId];
    if (btn) {
      btn.dispatchEvent({ type: 'click' });
      console.log(`PASS: Clicked interactive button #${btnId}`);
    } else {
      console.error(`FAIL: Button #${btnId} missing in DOM!`);
      process.exit(1);
    }
  });

  // 7. Test mobile navigation toggle
  const btnMobile = elementsById['btnMobileNav'];
  const mobileClose = elementsById['mobileNavClose'];
  if (btnMobile) {
    btnMobile.dispatchEvent({ type: 'click' });
    console.log('PASS: Mobile nav opened via #btnMobileNav');
  }
  if (mobileClose) {
    mobileClose.dispatchEvent({ type: 'click' });
    console.log('PASS: Mobile nav closed via #mobileNavClose');
  }

  // 8. Test back to top button
  const btnTop = elementsById['btnBackToTop'];
  if (btnTop) {
    btnTop.dispatchEvent({ type: 'click' });
    console.log('PASS: Back-to-top clicked via #btnBackToTop');
  }

  // 9. TEST ACOUSTIC WAVE & PARTICLE SIMULATOR (ZERO-LATENCY INTERACTION & HUD)
  console.log('--- Testing Acoustic Wave & Particle Simulator Responsiveness ---');
  const simElements = [
    'waveParticleCanvas',
    'oscilloscopeCanvas',
    'spectrogramCanvas',
    'waveFreqSlider',
    'waveLambdaSlider',
    'waveAmpSlider',
    'simSpeedVal',
    'simFreqVal',
    'simLambdaVal',
    'simPeriodVal',
    'simOmegaVal',
    'simKVal',
    'simSplVal',
    'tracerDispReadout'
  ];
  simElements.forEach(id => {
    if (!elementsById[id]) {
      console.error(`FAIL: Missing simulator element #${id}`);
      process.exit(1);
    }
    console.log(`PASS: Found simulator element #${id}`);
  });

  // Test slider dragging: frequency slider -> updates telemetry & lambda slider
  const freqSlider = elementsById['waveFreqSlider'];
  const lambdaSlider = elementsById['waveLambdaSlider'];
  const ampSlider = elementsById['waveAmpSlider'];
  const simFreqVal = elementsById['simFreqVal'];
  const simLambdaVal = elementsById['simLambdaVal'];
  const simSpeedVal = elementsById['simSpeedVal'];

  freqSlider.value = '500';
  freqSlider.dispatchEvent({ type: 'input', target: freqSlider });
  if (simFreqVal.textContent !== '500 Hz') {
    console.error(`FAIL: Frequency input event did not update simFreqVal! Expected '500 Hz', got '${simFreqVal.textContent}'`);
    process.exit(1);
  }
  console.log(`PASS: Frequency slider input updated simFreqVal to ${simFreqVal.textContent} and lambdaSlider.value to ${lambdaSlider.value}`);

  // Test bidirectional slider dragging: lambda slider -> updates frequency slider
  lambdaSlider.value = '1.0';
  lambdaSlider.dispatchEvent({ type: 'input', target: lambdaSlider });
  if (freqSlider.value !== 343 && freqSlider.value !== '343') {
    console.error(`FAIL: Lambda slider input did not update freqSlider! Expected 343, got ${freqSlider.value}`);
    process.exit(1);
  }
  console.log(`PASS: Wavelength slider input updated freqSlider to ${freqSlider.value} Hz bidirectionally.`);

  // Test medium selector buttons
  const mediumBtns = mockDocument.querySelectorAll('.sim-medium-btn');
  console.log(`Found ${mediumBtns.length} medium selector buttons.`);
  if (mediumBtns.length < 4) {
    console.error(`FAIL: Expected at least 4 medium buttons, found ${mediumBtns.length}`);
    process.exit(1);
  }
  const fluidBtn = mediumBtns.find(b => b.dataset.speed === '1480');
  if (fluidBtn) {
    fluidBtn.dispatchEvent({ type: 'click' });
    if (simSpeedVal.textContent !== '1480.0 m/s') {
      console.error(`FAIL: Medium button did not update simSpeedVal! Expected '1480.0 m/s', got '${simSpeedVal.textContent}'`);
      process.exit(1);
    }
    console.log(`PASS: Medium button switched to fluid: speed = ${simSpeedVal.textContent}, lambda = ${simLambdaVal.textContent}`);
  }

  // Test time-base buttons
  const timeBtns = mockDocument.querySelectorAll('.sim-timebase-btn');
  console.log(`PASS: Found ${timeBtns.length} timebase zoom buttons.`);
  timeBtns.forEach(tb => tb.dispatchEvent({ type: 'click' }));

  // Test scale buttons
  const scaleBtns = mockDocument.querySelectorAll('.sim-scale-btn');
  console.log(`PASS: Found ${scaleBtns.length} scale zoom buttons.`);
  scaleBtns.forEach(sb => sb.dispatchEvent({ type: 'click' }));

  // 10. TEST GRADE 11 MATHEMATICAL PRESENTATION CARDS
  console.log('--- Testing Grade 11 Mathematical Equation Cards ---');
  const mathCards = [
    { id: 'waveSpeedMathCard', title: 'Universal Wave Speed' },
    { id: 'soundSpeedMediumMathCard', title: 'Speed in Elastic Media' },
    { id: 'harmonicWaveParamsMathCard', title: 'Harmonic Wave Parameters' },
    { id: 'middleEarImpedanceMathCard', title: 'Middle Ear Impedance Transformer' },
    { id: 'greenwoodMapMathCard', title: 'Greenwood Tonotopic Map' },
    { id: 'vocoderCapacityMathCard', title: 'Vocoder & Shannon Capacity' }
  ];

  mathCards.forEach(c => {
    if (!elementsById[c.id]) {
      console.error(`FAIL: Missing mathematical equation card #${c.id} (${c.title})`);
      process.exit(1);
    }
    console.log(`PASS: Found Grade 11 mathematical card #${c.id} (${c.title})`);
  });

  // Verify pure CSS stacked fractions and pedagogical sections in HTML
  const fracMatches = (html.match(/class=["'][^"']*math-frac[^"']*["']/g) || []).length;
  console.log(`PASS: Verified ${fracMatches} professional stacked fractions (math-frac) across the page.`);
  if (fracMatches < 15) {
    console.error(`FAIL: Expected at least 15 stacked fractions, found ${fracMatches}`);
    process.exit(1);
  }

  const varsTableMatches = (html.match(/class=["'][^"']*math-vars-table[^"']*["']/g) || []).length;
  console.log(`PASS: Verified ${varsTableMatches} variable definition tables with SI units.`);
  if (varsTableMatches < 6) {
    console.error(`FAIL: Expected 6 variable definition tables, found ${varsTableMatches}`);
    process.exit(1);
  }

  const exampleCardMatches = (html.match(/class=["'][^"']*math-example-card[^"']*["']/g) || []).length;
  console.log(`PASS: Verified ${exampleCardMatches} step-by-step numerical worked examples.`);
  if (exampleCardMatches < 6) {
    console.error(`FAIL: Expected 6 worked numerical example cards, found ${exampleCardMatches}`);
    process.exit(1);
  }

  console.log('====================================================');
  console.log('ALL TESTS PASSED! SIMULATOR & MATH CARDS FULLY VERIFIED.');
  console.log('====================================================');
} catch (err) {
  console.error('FATAL TEST ERROR:', err);
  process.exit(1);
}
