// build_full_site.js - Complete, verified RESONANCE master site builder
const fs = require('fs');
const vm = require('vm');

console.log('Loading base definitions and patched client script...');
const {
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
  getEarAnimatedMotionSvg,
  getEarScientificIllustrationSvg,
  getAcousticToElectricAnimatedSvg,
  getAcousticToElectricIllustrationSvg,
  getHairCellAnimatedSvg,
  getHairCellIllustrationSvg,
  getHearingAidAnimatedSvg,
  getHearingAidIllustrationSvg,
  getImplantAnimatedSvg,
  getImplantIllustrationSvg,
  mathAndSimCss,
  getWaveSpeedMathCard,
  getSoundSpeedMediumMathCard,
  getHarmonicWaveParamsMathCard,
  getMiddleEarImpedanceMathCard,
  getGreenwoodMapMathCard,
  getVocoderCapacityMathCard
} = require('./build_resonance_master.js');
const { clientScriptBody } = require('./append_master_html_and_client.js');
const speechBundle = JSON.parse(fs.readFileSync('speech_bundle.json', 'utf8'));

// Define getFullHtml(speechBundle)
function getFullHtml(speechBundle) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RESONANCE — Hear What an Implant Hears | Visual Bioacoustics</title>
  <meta name="description" content="A visual-first physical and bioacoustic exhibition exploring human hearing mechanics and cochlear neuroprosthetics.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" onload="if (window.renderMathInElement) renderMathInElement(document.body);"></script>
  <style>
${getCss()}
  </style>
</head>
<body>

  <!-- Sticky Editorial Navigation with Rounded Pill Links -->
  <header class="navbar" role="banner">
    <div class="nav-container">
      <a href="#hero" class="nav-brand" aria-label="RESONANCE Home">
        <span class="brand-title">RESONANCE</span>
        <span class="brand-sub">Hear what an implant hears</span>
      </a>

      <!-- Desktop Nav Menu -->
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
        <button type="button" class="nav-toggle" id="btnMobileNav" aria-label="Toggle navigation menu">Menu</button>
      </div>
    </div>
  </header>

  <!-- Mobile Navigation Overlay & Drawer -->
  <div id="mobileNavOverlay" class="mobile-nav-overlay"></div>
  <aside id="mobileNavDrawer" class="mobile-nav-drawer" aria-label="Mobile Navigation">
    <div class="mobile-nav-header">
      <span style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 600; color: var(--forest);">RESONANCE</span>
      <button type="button" class="mobile-nav-close" id="mobileNavClose" aria-label="Close menu">&times;</button>
    </div>
    <a href="#hero" class="nav-link mobile-nav-link">Home</a>
    <a href="#sound" class="nav-link mobile-nav-link">Physics of Sound</a>
    <a href="#ear-machine" class="nav-link mobile-nav-link">The Ear as a Machine</a>
    <a href="#cochlea" class="nav-link mobile-nav-link">The Cochlea</a>
    <a href="#pathology" class="nav-link mobile-nav-link">When Hearing Breaks</a>
    <a href="#implant-architecture" class="nav-link mobile-nav-link">Inside an Implant</a>
    <a href="#simulator" class="nav-link mobile-nav-link">The Simulator</a>
    <a href="#experiment" class="nav-link mobile-nav-link">The Experiment</a>
    <a href="#music" class="nav-link mobile-nav-link">Music Challenge</a>
    <a href="#takeaways" class="nav-link mobile-nav-link">Conclusions &amp; References</a>
  </aside>

  <main>
    <!-- ====================================================================
         SECTION 1: HERO (Visual Showcase Exhibition)
         ==================================================================== -->
    <section id="hero" class="bg-ivory" style="padding-top: 4.5rem; padding-bottom: 4.5rem;">
      <div class="container">
        <!-- Visual Pathway Ribbon -->
        <div style="margin-bottom: 2.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
            <div class="kicker">PHYSICS OF AUDITORY TRANSDUCTION</div>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--charcoal-muted);">The 4 Physical States of Sound</span>
          </div>
          ${getHeroPathwaySvg()}
        </div>

        <div class="visual-grid-2" style="align-items: center; gap: 3rem;">
          <div>
            <div class="kicker">HIGH-SCHOOL PHYSICS &amp; BIOACOUSTICS MONOGRAPH</div>
            <h1>RESONANCE</h1>
            <p class="lead" style="font-family: var(--font-display); font-size: 1.55rem; color: var(--forest); line-height: 1.45; margin-bottom: 1.25rem;">
              Hear what an implant hears.
            </p>
            <p>
              How does the human body transform invisible pressure oscillations of gas molecules into conscious hearing? And how does a surgically implanted microchip restore speech perception to a deaf ear?
            </p>
            <p>
              Explore the acoustic impedance matching of the middle ear, the 32 mm tonotopic Fourier analyzer inside your skull, and the real-time channel vocoder DSP algorithm modeled by Shannon et al. (1995).
            </p>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.75rem; margin-bottom: 2rem;">
              <a href="#simulator" class="btn btn-forest" id="btnHeroSim">Hear What an Implant Hears</a>
              <a href="#sound" class="btn btn-outline" id="btnHeroExplore">Explore the Mechanics</a>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; border-top: 1px solid var(--border); padding-top: 1.25rem;">
              <div style="background: var(--white); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border);">
                <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 600; color: var(--forest);">16 kHz DSP</div>
                <div style="font-size: 0.82rem; color: var(--charcoal-muted);">Real-time filterbank</div>
              </div>
              <div style="background: var(--white); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border);">
                <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 600; color: var(--forest);">32 mm Ribbon</div>
                <div style="font-size: 0.82rem; color: var(--charcoal-muted);">Greenwood tonotopy</div>
              </div>
              <div style="background: var(--white); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border);">
                <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 600; color: var(--forest);">Zero Backend</div>
                <div style="font-size: 0.82rem; color: var(--charcoal-muted);">100% In-browser audio</div>
              </div>
            </div>
          </div>

          <!-- Hero Photographic & Wave Plate -->
          <div>
            <div class="photo-frame">
              <span class="photo-badge">ARCHIVAL HUMAN LISTENER</span>
              <img src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Photograph of a human listener experiencing acoustic sound vibrations in natural light" style="max-height: 380px;" />
              <div class="caption">
                <strong>Fig. 1.1:</strong> The human listening apparatus in an acoustic field. Microscopic fluctuations in atmospheric pressure (&Delta;P &asymp; 20 &mu;Pa) deflect the tympanic membrane across sub-atomic displacements.
              </div>
            </div>

            <div style="margin-top: 1.25rem;">
              ${getHeroAcousticSvg()}
            </div>
          </div>
        </div>

        <!-- Ambient Hero Soundwave Strip -->
        <div style="margin-top: 3rem; background-color: var(--white); border: 1px solid var(--border); padding: 1.25rem 1.75rem; border-radius: var(--radius-lg); box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
            <span style="font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--forest); font-weight: 600;">
              LIVE AMBIENT OSCILLOGRAPH &middot; ATMOSPHERIC SOUNDWAVE RIBBON
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--charcoal-muted);">
              v = 343 m/s &middot; &rho;&sub0; = 1.204 kg/m&sup3;
            </span>
          </div>
          <canvas id="heroWaveCanvas" class="resonance-canvas" height="60" style="height: 60px;"></canvas>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 2: WHAT IS SOUND? (Physics of Sound)
         ==================================================================== -->
    <section id="sound" class="bg-white">
      <div class="container">
        <div class="kicker">PHYSICAL FOUNDATIONS</div>
        <h2>A Mechanical Disturbance in an Elastic Medium</h2>
        <p class="lead">
          Sound is not an object; it is a traveling mechanical pressure oscillation. Vibrating matter pushes and pulls surrounding gas molecules, forming alternating compressions and rarefactions that propagate at 343 meters per second.
        </p>

        <!-- Visual Comparison: Pitch vs Loudness -->
        <div style="margin: 2.5rem 0;">
          ${getPitchVsLoudnessSvg()}
        </div>

        <!-- ==================================================================
             FULL-WIDTH INTERACTIVE ACOUSTIC WAVE & PARTICLE SIMULATOR BENCH
             ================================================================== -->
        <div class="sim-workbench" id="waveSimulatorBench">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <span class="kicker" style="margin-bottom: 0.25rem;">INTERACTIVE ACOUSTIC LABORATORY BENCH</span>
              <h3 style="margin: 0; font-size: 1.45rem;">Acoustic Wave &amp; Longitudinal Particle Simulator</h3>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--forest); background: var(--sage-pale); padding: 0.3rem 0.8rem; border-radius: var(--radius-full); border: 1px solid var(--border);">
              ZERO-LATENCY CONTINUOUS DSP ENGINE
            </span>
          </div>
          <p style="font-size: 0.95rem; margin-bottom: 1.25rem;">
            Explore how acoustic frequency, wavelength, amplitude, and medium properties govern sound propagation in real time. Observe how individual air molecules oscillate in place with simple harmonic motion (zero net drift) while transmitting mechanical wave energy across space.
          </p>

          <!-- Real-Time Telemetry HUD Strip -->
          <div class="sim-telemetry-strip" id="simTelemetryStrip">
            <div class="sim-telemetry-badge">
              <span class="sim-telemetry-lbl">Medium Speed (v)</span>
              <span class="sim-telemetry-val" id="simSpeedVal">343.0 m/s</span>
            </div>
            <div class="sim-telemetry-badge">
              <span class="sim-telemetry-lbl">Frequency (f)</span>
              <span class="sim-telemetry-val" id="simFreqVal">440 Hz</span>
            </div>
            <div class="sim-telemetry-badge">
              <span class="sim-telemetry-lbl">Wavelength (&lambda;)</span>
              <span class="sim-telemetry-val" id="simLambdaVal">0.780 m (78.0 cm)</span>
            </div>
            <div class="sim-telemetry-badge">
              <span class="sim-telemetry-lbl">Wave Period (T)</span>
              <span class="sim-telemetry-val" id="simPeriodVal">2.27 ms</span>
            </div>
            <div class="sim-telemetry-badge">
              <span class="sim-telemetry-lbl">Angular Speed (&omega;)</span>
              <span class="sim-telemetry-val" id="simOmegaVal">2,764.6 rad/s</span>
            </div>
            <div class="sim-telemetry-badge">
              <span class="sim-telemetry-lbl">Wavenumber (k)</span>
              <span class="sim-telemetry-val" id="simKVal">8.06 rad/m</span>
            </div>
            <div class="sim-telemetry-badge">
              <span class="sim-telemetry-lbl">Pressure / SPL</span>
              <span class="sim-telemetry-val" id="simSplVal">68.0 dB SPL (50.0 mPa)</span>
            </div>
          </div>

          <!-- Dual-Visualizer Synchronized Canvas Stack -->
          <!-- 1. Longitudinal Particle Simulator -->
          <div class="sim-canvas-block">
            <div class="sim-canvas-header">
              <span class="sim-canvas-title">LONGITUDINAL AIR MOLECULE OSCILLATIONS (COMPRESSIONS &amp; RAREFACTIONS)</span>
              <span>TRACER: x(t) = x<sub>0</sub> + s<sub>0</sub> cos(kx<sub>0</sub> - &omega;t) &middot; <strong id="tracerDispReadout" style="color: var(--clay);">0.0 &mu;m (SHM in place)</strong></span>
            </div>
            <canvas id="waveParticleCanvas" class="resonance-canvas" height="120" style="height: 120px;"></canvas>
          </div>

          <!-- 2. Synchronized Transverse Pressure Oscilloscope -->
          <div class="sim-canvas-block">
            <div class="sim-canvas-header">
              <span class="sim-canvas-title">SYNCHRONIZED TRANSVERSE ACOUSTIC PRESSURE &Delta;P(x, t)</span>
              <span id="wavePeriodReadout">T = 2.27 ms &middot; &lambda; = 78.0 cm &middot; v = 343 m/s</span>
            </div>
            <canvas id="oscilloscopeCanvas" class="resonance-canvas" height="110" style="height: 110px;"></canvas>
          </div>

          <!-- 3. Real-Time Spectrogram Waterfall -->
          <div class="sim-canvas-block">
            <div class="sim-canvas-header">
              <span class="sim-canvas-title">REAL-TIME SPECTROGRAM WATERFALL (0 &ndash; 4 kHz)</span>
              <span id="micStatusText">Microphone: Standby</span>
            </div>
            <canvas id="spectrogramCanvas" class="resonance-canvas" height="110" style="height: 110px;"></canvas>
            <div id="micFallbackMsg" style="display: none; padding: 0.85rem; background: var(--white); border: 1px solid var(--border); font-size: 0.85rem; color: var(--clay); border-radius: var(--radius-md); margin-top: 0.5rem;">
              Microphone access unavailable or denied. The simulator continues operating in calibrated mathematical oscillator mode.
            </div>
          </div>

          <!-- Instant Responsive Control Deck -->
          <div class="sim-control-deck">
            <!-- Left Column: Wave Parameters -->
            <div>
              <div class="sim-control-section-title">PRIMARY WAVE PARAMETERS (BIDIRECTIONAL)</div>

              <!-- Frequency Slider -->
              <div class="slider-row">
                <div class="slider-label">
                  <span>Frequency &middot; Pitch (f)</span>
                  <span class="slider-val" id="waveFreqVal">440 Hz</span>
                </div>
                <input type="range" id="waveFreqSlider" min="50" max="2000" step="1" value="440" aria-label="Frequency in Hertz">
                <div class="pill-group">
                  <button type="button" class="pill-btn wave-preset-btn" data-freq="130">130 Hz (C3 Bass)</button>
                  <button type="button" class="pill-btn wave-preset-btn" data-freq="261">261 Hz (Middle C)</button>
                  <button type="button" class="pill-btn wave-preset-btn active" data-freq="440">440 Hz (Concert A)</button>
                  <button type="button" class="pill-btn wave-preset-btn" data-freq="1000">1000 Hz (Audiometric)</button>
                  <button type="button" class="pill-btn wave-preset-btn" data-freq="2000">2000 Hz (Sibilance)</button>
                </div>
              </div>

              <!-- Wavelength Slider (Bi-directionally bound) -->
              <div class="slider-row" style="margin-top: 1.25rem;">
                <div class="slider-label">
                  <span>Wavelength &middot; Spatial Cycle (&lambda; = v / f)</span>
                  <span class="slider-val" id="waveLambdaVal">0.780 m (78.0 cm)</span>
                </div>
                <input type="range" id="waveLambdaSlider" min="0.17" max="6.86" step="0.01" value="0.78" aria-label="Wavelength in meters">
                <div style="font-size: 0.78rem; font-family: var(--font-mono); color: var(--charcoal-muted); margin-top: 0.35rem;">
                  Dragging wavelength automatically recalculates frequency in real time via f = v / &lambda;.
                </div>
              </div>

              <!-- Amplitude Slider -->
              <div class="slider-row" style="margin-top: 1.25rem;">
                <div class="slider-label">
                  <span>Amplitude &middot; Sound Pressure Level (SPL)</span>
                  <span class="slider-val" id="waveAmpVal">50% (-6.0 dBFS &middot; 68.0 dB SPL)</span>
                </div>
                <input type="range" id="waveAmpSlider" min="0" max="100" step="1" value="50" aria-label="Amplitude in percentage">
              </div>

              <!-- Timbre Selection -->
              <div style="margin-top: 1.25rem; display: flex; align-items: center; gap: 1rem;">
                <span style="font-size: 0.88rem; font-weight: 600; color: var(--forest); font-family: var(--font-mono);">TIMBRE:</span>
                <label style="font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                  <input type="radio" name="waveTimbre" id="waveTypeSine" value="sine" checked> Pure Sine Tone
                </label>
                <label style="font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                  <input type="radio" name="waveTimbre" id="waveTypeHarmonic" value="harmonic"> Harmonic Vowel
                </label>
              </div>
            </div>

            <!-- Right Column: Medium, Axes Zoom & Stimulation -->
            <div>
              <!-- Transmission Medium -->
              <div class="sim-control-section-title">TRANSMISSION MEDIUM &amp; PROPAGATION VELOCITY (v)</div>
              <div class="pill-group" style="margin-bottom: 1.5rem;">
                <button type="button" class="pill-btn sim-medium-btn active" data-speed="343" data-medium="Air (20&deg;C)">Air (20&deg;C) &middot; 343 m/s</button>
                <button type="button" class="pill-btn sim-medium-btn" data-speed="331" data-medium="Cold Air (0&deg;C)">Cold Air (0&deg;C) &middot; 331 m/s</button>
                <button type="button" class="pill-btn sim-medium-btn" data-speed="355" data-medium="Warm Air (40&deg;C)">Warm Air (40&deg;C) &middot; 355 m/s</button>
                <button type="button" class="pill-btn sim-medium-btn" data-speed="1480" data-medium="Perilymph Fluid">Perilymph Fluid &middot; 1,480 m/s</button>
              </div>

              <!-- Time-Base Horizontal Axis Zoom -->
              <div class="sim-control-section-title">TIME-BASE AXIS CALIBRATION (HORIZONTAL ZOOM)</div>
              <div class="pill-group" style="margin-bottom: 1.5rem;">
                <button type="button" class="pill-btn sim-timebase-btn" data-timediv="0.5">0.5 ms/div</button>
                <button type="button" class="pill-btn sim-timebase-btn active" data-timediv="1.0">1.0 ms/div</button>
                <button type="button" class="pill-btn sim-timebase-btn" data-timediv="2.0">2.0 ms/div</button>
                <button type="button" class="pill-btn sim-timebase-btn" data-timediv="5.0">5.0 ms/div</button>
              </div>

              <!-- Pressure Vertical Scale Zoom -->
              <div class="sim-control-section-title">PRESSURE SCALE MULTIPLIER (VERTICAL ZOOM)</div>
              <div class="pill-group" style="margin-bottom: 1.5rem;">
                <button type="button" class="pill-btn sim-scale-btn" data-scale="0.5">0.5&times; Zoom</button>
                <button type="button" class="pill-btn sim-scale-btn active" data-scale="1.0">1.0&times; Normal</button>
                <button type="button" class="pill-btn sim-scale-btn" data-scale="2.0">2.0&times; Zoom</button>
              </div>

              <!-- Stimulation & FFT Triggers -->
              <div class="sim-control-section-title">AUDIO STIMULATION &amp; SENSORS</div>
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <button type="button" class="btn btn-forest" id="btnToggleTone" style="flex: 1; min-width: 170px;">
                  Play Acoustic Tone
                </button>
                <button type="button" class="btn btn-outline" id="btnToggleMic" style="min-width: 170px;">
                  Start Microphone Live FFT
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Grade 11 Physics Wave Mechanics Mathematical Cards -->
        <div style="margin: 3rem 0;">
          <div class="kicker">PHYSICS CURRICULUM FOUNDATIONS</div>
          <h3 style="margin-bottom: 1rem;">Mathematical Formulations of Acoustic Wave Propagation</h3>
          <p style="font-size: 0.95rem; margin-bottom: 2rem;">
            Examine the foundational mathematical equations governing acoustic waves in elastic media, complete with variable definitions, SI units, physical proportionality relationships, and worked numerical problems.
          </p>

          ${getWaveSpeedMathCard()}
          ${getSoundSpeedMediumMathCard()}
          ${getHarmonicWaveParamsMathCard()}
        </div>

        <!-- Visual Media & Signal Transduction Grid -->
        <div class="visual-grid-2" style="margin-top: 3rem; align-items: flex-start;">
          <!-- Left: Physical Media Visuals -->
          <div>
            <div class="photo-frame">
              <span class="photo-badge">FLUID DYNAMICS PLATE</span>
              <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Capillary surface wave resonance and wave interference across a fluid surface" style="max-height: 260px;" />
              <div class="caption">
                <strong>Fig. 2.1:</strong> Mechanical wave propagation and harmonic resonance across a fluid surface. Sound waves in air are longitudinal: molecules oscillate back and forth parallel to wave motion.
              </div>
            </div>

            <div style="margin-top: 1.5rem;">
              ${getAirCompressionSvg()}
            </div>
          </div>

          <!-- Right: Diagram E: Dual-View Acoustic to Electrical Signal Transduction -->
          <div>
            <div class="diagram-dual-wrapper" id="acousticElectricDualDiagram">
              <div class="diagram-header-bar">
                <div class="diagram-header-meta">
                  <span class="diagram-header-kicker">FIGURE 2.2 &middot; SIGNAL TRANSDUCTION DYNAMICS</span>
                  <h4 class="diagram-header-title">Acoustic to Electrical Signal Conversion</h4>
                </div>
                <div class="view-toggle-group" role="tablist" aria-label="Acoustic Transduction View Switcher">
                  <button type="button" class="view-toggle-btn active" data-diagram="acousticElectric" data-view="animated" role="tab" aria-selected="true">
                    <span class="view-toggle-icon"></span>Animated View
                  </button>
                  <button type="button" class="view-toggle-btn" data-diagram="acousticElectric" data-view="illustration" role="tab" aria-selected="false">
                    <span class="view-toggle-icon"></span>Scientific Illustration
                  </button>
                </div>
              </div>

              <div class="diagram-view-container">
                <div class="diagram-view diagram-view-animated" id="acousticElectricViewAnimated">
                  ${getAcousticToElectricAnimatedSvg()}
                </div>
                <div class="diagram-view diagram-view-illustration hidden" id="acousticElectricViewIllustration">
                  ${getAcousticToElectricIllustrationSvg()}
                </div>
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
          Air is light; fluid is dense. When airborne sound strikes fluid, 99.9% reflects away. The middle ear bones form a physical 22x pressure amplifier that transfers sound into the inner ear without loss.
        </p>

        <!-- Clinical Photographs Split -->
        <div class="visual-grid-2" style="margin-top: 2.5rem; align-items: stretch;">
          <div class="photo-frame">
            <span class="photo-badge">CLINICAL OTOSCOPY</span>
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Clinical examination of the human auditory canal and tympanic membrane through an otoscopic speculum" style="max-height: 280px;" />
            <div class="caption">
              <strong>Fig. 3.1:</strong> Clinical otoscopic view of a healthy human eardrum. The translucent tympanic membrane vibrates in sympathy with sound waves, moving the malleus bone handle.
            </div>
          </div>

          <div class="photo-frame">
            <span class="photo-badge">AUDIOMETRIC EXAMINATION</span>
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Audiologist examining patient hearing using clinical diagnostic instruments" style="max-height: 280px;" />
            <div class="caption">
              <strong>Fig. 3.2:</strong> Clinical audiology diagnostic evaluation. Hearing tests measure the mechanical efficiency of the middle ear ossicular chain and cochlear hair cell thresholds.
            </div>
          </div>
        </div>

        <!-- Full-Width Interactive Ear Anatomy Plate with Highlighted Sound Pathway -->
        <div class="editorial-plate" style="margin-top: 3rem; background: var(--white);">
          <!-- Diagram A: Dual-View Ear Anatomy & Biomechanical Pathway -->
          <div class="diagram-dual-wrapper" id="earAnatomyDualDiagram" style="margin: 0 0 1.5rem 0;">
            <div class="diagram-header-bar">
              <div class="diagram-header-meta">
                <span class="diagram-header-kicker">FIGURE 3.3 &middot; BIOMECHANICAL AUDITORY APPARATUS</span>
                <h3 class="diagram-header-title" style="margin: 0; font-size: 1.25rem;">The Human Ear: Sound Transmission &amp; Anatomy</h3>
              </div>
              <div class="view-toggle-group" role="tablist" aria-label="Ear Anatomy View Switcher">
                <button type="button" class="view-toggle-btn active" data-diagram="earAnatomy" data-view="animated" role="tab" aria-selected="true">
                  <span class="view-toggle-icon"></span>Animated View
                </button>
                <button type="button" class="view-toggle-btn" data-diagram="earAnatomy" data-view="illustration" role="tab" aria-selected="false">
                  <span class="view-toggle-icon"></span>Scientific Illustration
                </button>
              </div>
            </div>

            <div class="diagram-view-container">
              <div class="diagram-view diagram-view-animated" id="earAnatomyViewAnimated">
                ${getEarAnimatedMotionSvg()}
              </div>
              <div class="diagram-view diagram-view-illustration hidden" id="earAnatomyViewIllustration">
                ${getEarScientificIllustrationSvg()}
              </div>
            </div>
          </div>

          <!-- Companion Pill Selector Buttons for Ear Anatomy -->
          <div class="pill-group" style="justify-content: center; margin-top: 1.25rem;">
            <button type="button" class="pill-btn ear-pill-btn active" data-part="pinna">1. Pinna (Auricle)</button>
            <button type="button" class="pill-btn ear-pill-btn" data-part="canal">2. Auditory Canal</button>
            <button type="button" class="pill-btn ear-pill-btn" data-part="eardrum">3. Tympanic Membrane</button>
            <button type="button" class="pill-btn ear-pill-btn" data-part="malleus">4. Malleus</button>
            <button type="button" class="pill-btn ear-pill-btn" data-part="incus">5. Incus</button>
            <button type="button" class="pill-btn ear-pill-btn" data-part="stapes">6. Stapes Footplate</button>
            <button type="button" class="pill-btn ear-pill-btn" data-part="cochlea">7. Cochlea</button>
            <button type="button" class="pill-btn ear-pill-btn" data-part="nerve">8. Auditory Nerve</button>
          </div>

          <!-- Inspection Result Card -->
          <div id="earInspectionCard" style="margin-top: 1.5rem; background: var(--ivory); border: 1px solid var(--border); border-left: 4px solid var(--forest); padding: 1.5rem; border-radius: var(--radius-lg);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
              <h4 id="earPartName" style="color: var(--forest); font-size: 1.25rem;">Tympanic Membrane (Eardrum)</h4>
              <span id="earPartRole" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--clay); font-weight: 600;">STAGE II: ACOUSTIC COLLECTOR</span>
            </div>
            <p id="earPartPhysics" style="font-size: 0.95rem; margin-bottom: 0;">
              A 0.1 mm thick conical membrane with an effective vibrating area of 55 mm&sup2;. It transforms oscillating air pressure waves into mechanical excursions of the manubrium of the malleus.
            </p>
          </div>
        </div>

        <!-- 22x Impedance Transformer Visual Diagram -->
        <div style="margin-top: 2.5rem;">
          ${getImpedanceLeverDiagramSvg()}
        </div>

        <!-- Grade 11 Physics Impedance Matching & Transformer Equation Card -->
        ${getMiddleEarImpedanceMathCard()}

        <!-- Animated Impedance Matching Simulation Canvas -->
        <div class="editorial-plate plate-sage" style="margin-top: 2.5rem;">
          <div class="kicker">PHYSICS SIMULATION</div>
          <h3>Dynamic Boundary: Air-Fluid Interface With &amp; Without Ossicles</h3>
          <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">
            Observe what happens to a 1 kHz acoustic pressure wave as it strikes cochlear perilymph fluid. Toggle between the unassisted direct boundary and the 22x ossicular lever transformer.
          </p>

          <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-forest" id="btnImpLever">With Middle Ear Transformer (22&times; Gain)</button>
            <button type="button" class="btn btn-outline" id="btnImpDirect">Without Middle Ear Bones (99.9% Reflection)</button>
          </div>

          <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.8rem; color: var(--charcoal-muted); margin-bottom: 0.4rem;">
            <span>AIR MEDIUM (Z&sub1; = 415 Pa&middot;s/m)</span>
            <span id="impTelemetry">Mode: 22&times; Hydraulic Lever &middot; Transmission: ~60% (-2.2 dB)</span>
            <span>COCHLEAR FLUID (Z&sub2; = 1.5&times;10&sup6; Pa&middot;s/m)</span>
          </div>

          <canvas id="impedanceCanvas" class="resonance-canvas" height="140" style="height: 140px;"></canvas>
          <div class="caption">
            <strong>Fig. 3.4:</strong> Real-time numerical wave simulation. Without the ossicles, the high acoustic impedance of fluid acts like a rigid brick wall, reflecting virtually all acoustic momentum back into the ear canal.
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
          Inside the temporal bone rests the cochlea — a 32 mm fluid channel partitioned by the basilar membrane. The cochlea acts as a biological Fourier analyzer, physically sorting frequencies by location.
        </p>

        <div class="visual-grid-2" style="margin-top: 3rem; align-items: flex-start;">
          <!-- Left: Precision Lab Photo & Scalae Diagram -->
          <div>
            <div class="photo-frame">
              <span class="photo-badge">PRECISION BIOACOUSTICS</span>
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Precision laboratory bioacoustic measurement equipment used for investigating cochlear mechanics" style="max-height: 280px;" />
              <div class="caption">
                <strong>Fig. 4.1:</strong> Bioacoustic research laboratory measuring cochlear traveling waves. Georg von B&eacute;k&eacute;sy was awarded the 1961 Nobel Prize for demonstrating how waves peak at distinct physical points along the basilar membrane.
              </div>
            </div>

            <div style="margin-top: 1.5rem;">
              ${getCochleaScalaeSvg()}
            </div>
          </div>

          <!-- Right: Greenwood Mechanics & Basilar Gradients -->
          <div>
            <h3 style="margin-bottom: 0.75rem;">Stiffness Gradients &amp; Traveling Waves</h3>
            <p style="font-size: 1rem;">
              Why do different frequencies peak at different places? The basilar membrane has physical gradients:
            </p>
            <ul style="margin-left: 1.5rem; margin-bottom: 1.25rem; font-size: 0.95rem; color: var(--charcoal);">
              <li><strong>At the Base (near oval window):</strong> Narrow (0.1 mm), taut, and 100 times stiffer. Resonates to high frequencies (up to 20,000 Hz).</li>
              <li><strong>At the Apex (tip, helicotrema):</strong> Wide (0.5 mm), loose, and compliant. Resonates to low frequencies (down to 20 Hz).</li>
            </ul>

            <!-- Grade 11 Physics Greenwood Cochlear Tonotopic Map Card -->
            ${getGreenwoodMapMathCard()}

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

          <canvas id="cochleaCanvas" class="resonance-canvas" height="150" style="height: 150px;"></canvas>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; background: var(--white); border: 1px solid var(--border); padding: 0.85rem 1.25rem; border-radius: var(--radius-lg);">
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
          In sensorineural hearing loss, the microscopic hair cells inside the cochlea are damaged or dead. Turning up the volume with a hearing aid cannot restore missing biological switches — but a cochlear implant bypasses them completely.
        </p>

        <!-- Visual Comparison: Healthy vs Damaged Hair Cells -->
        <div class="visual-grid-2" style="margin-top: 2.5rem; align-items: flex-start;">
          <div class="photo-frame">
            <span class="photo-badge">CELLULAR MICROSCOPY</span>
            <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Electron microscopy research facility studying sensory hair cell ultrastructure" style="max-height: 280px;" />
            <div class="caption">
              <strong>Fig. 5.1:</strong> Electron microscope facility examining inner ear hair cells. Humans possess ~15,000 hair cells per ear at birth, which do not regenerate once lost.
            </div>
          </div>

          <div>
            <h3 style="margin-bottom: 0.75rem;">Mechanosensory Destruction</h3>
            <p style="font-size: 1rem;">
              Perched atop each hair cell is a bundle of <em>stereocilia</em>, connected by tiny spring filaments called <strong>tip links</strong> (composed of cadherin-23 and protocadherin-15 proteins).
            </p>
            <p style="font-size: 1rem;">
              When the basilar membrane vibrates, stereocilia bend, pulling open mechanotransduction (MET) ion channels that admit K+ and Ca2+ ions to trigger nerve impulses. Acoustic trauma or illness shears these fragile tip links.
            </p>
            <p style="font-size: 1rem;">
              Once hair cells are gone, sound waves cannot create electrical voltage. A hearing aid simply amplifies acoustic waves into non-functioning receptors, producing distorted noise.
            </p>
          </div>
        </div>

        <!-- Diagram B: Dual-View Hair Cell Anatomy & Pathology -->
        <div class="diagram-dual-wrapper" id="hairCellDualDiagram" style="margin-top: 2.5rem;">
          <div class="diagram-header-bar">
            <div class="diagram-header-meta">
              <span class="diagram-header-kicker">FIGURE 5.2 &middot; MECHANOTRANSDUCTION ULTRASTRUCTURE</span>
              <h4 class="diagram-header-title">Healthy Mechanoreceptor vs. Acoustic Trauma Damage</h4>
            </div>
            <div class="view-toggle-group" role="tablist" aria-label="Hair Cell View Switcher">
              <button type="button" class="view-toggle-btn active" data-diagram="hairCell" data-view="animated" role="tab" aria-selected="true">
                <span class="view-toggle-icon"></span>Animated View
              </button>
              <button type="button" class="view-toggle-btn" data-diagram="hairCell" data-view="illustration" role="tab" aria-selected="false">
                <span class="view-toggle-icon"></span>Scientific Illustration
              </button>
            </div>
          </div>

          <div class="diagram-view-container">
            <div class="diagram-view diagram-view-animated" id="hairCellViewAnimated">
              ${getHairCellAnimatedSvg()}
            </div>
            <div class="diagram-view diagram-view-illustration hidden" id="hairCellViewIllustration">
              ${getHairCellIllustrationSvg()}
            </div>
          </div>
        </div>

          <!-- Hair Cell Interactive Component Selector -->
          <div class="pill-group" style="justify-content: center; margin-top: 1rem;">
            <button type="button" class="pill-btn hair-cell-part-btn active" data-part="bundle">1. Stereocilia Staircase</button>
            <button type="button" class="pill-btn hair-cell-part-btn" data-part="tiplink">2. Cadherin-23 Tip Links</button>
            <button type="button" class="pill-btn hair-cell-part-btn" data-part="met">3. MET Ion Channels</button>
            <button type="button" class="pill-btn hair-cell-part-btn" data-part="synapse">4. Synaptic Ribbon &amp; Nerve</button>
          </div>

          <!-- Hair Cell Inspection Card -->
          <div id="hairCellInspectorCard" style="margin-top: 1rem; background: var(--white); border: 1px solid var(--border); border-left: 4px solid var(--forest); padding: 1.25rem 1.5rem; border-radius: var(--radius-lg);">
            <h4 id="hairCellPartTitle" style="color: var(--forest); font-size: 1.15rem; margin-bottom: 0.35rem;">STEREOCILIA BUNDLE (3-TIERED STAIRCASE)</h4>
            <p id="hairCellPartDesc" style="font-size: 0.95rem; margin-bottom: 0.35rem;">
              Each hair cell carries 50–100 actin-filled stereocilia arranged in ascending height tiers. Mechanical fluid motion deflects the bundle toward the tallest kinocilium, placing tension on tip links.
            </p>
            <div id="hairCellPartRef" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--charcoal-muted);">
              Reference: Pickles, J. O. et al. (1984). Hearing Research, 15(3), 269–282.
            </div>
          </div>
        </div>

        <!-- AUTHENTIC PHOTOGRAPHY OF ACTUAL HEARING DEVICES (4-Card Exhibition Grid) -->
        <div style="margin-top: 3.5rem;">
          <div class="kicker">AUTHENTIC CLINICAL HARDWARE</div>
          <h3>Actual Hearing Aid Technologies in Clinical Practice</h3>
          <p style="font-size: 0.95rem; margin-bottom: 1.5rem; max-width: 72ch;">
            Hearing aids are acoustic amplifiers engineered to boost sound pressure levels into an ear with viable residual hair cells. Below are authentic photographs of modern behind-the-ear, receiver-in-canal, and custom-shell devices, alongside clinical verification.
          </p>

          <div class="visual-grid-4" style="align-items: stretch;">
            <!-- Card 1: BTE Hearing Aid -->
            <div class="photo-frame">
              <span class="photo-badge">BEHIND-THE-EAR (BTE)</span>
              <img src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="High-resolution close-up product photograph of a modern digital Behind-The-Ear hearing aid" style="height: 200px;" />
              <div class="caption">
                <strong>Fig. 5.3: Modern BTE Hearing Aid.</strong> Close-up photography of a high-gain digital BTE instrument. Housing sits behind the pinna with dual microphones, DSP amplifier, and clear acoustic sound tube coupling to a custom earmold.
              </div>
            </div>

            <!-- Card 2: RIC Hearing Aid in Real Use -->
            <div class="photo-frame">
              <span class="photo-badge">RECEIVER-IN-CANAL (RIC)</span>
              <img src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Adult patient wearing an authentic Receiver-In-Canal hearing aid on the ear in daily life" style="height: 200px;" />
              <div class="caption">
                <strong>Fig. 5.4: RIC Aid in Daily Use.</strong> Authentic photograph of a discreet RIC hearing aid worn on the ear. An ultra-thin wire carries electrical signals over the cartilage to a miniature speaker seated directly in the canal.
              </div>
            </div>

            <!-- Card 3: ITE Hearing Aid -->
            <div class="photo-frame">
              <span class="photo-badge">IN-THE-EAR (ITE)</span>
              <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Custom molded In-The-Ear hearing aid instrument fitting in the concha bowl" style="height: 200px;" />
              <div class="caption">
                <strong>Fig. 5.5: Custom ITE Device.</strong> Medical hearing instrument molded from a precision silicone impression of the patient's ear. All transducers, DSP chips, and batteries are contained within a single custom shell.
              </div>
            </div>

            <!-- Card 4: Clinical Audiology Fitting -->
            <div class="photo-frame">
              <span class="photo-badge">CLINICAL FITTING (REM)</span>
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Clinical audiologist performing real-ear probe microphone calibration on a patient" style="height: 200px;" />
              <div class="caption">
                <strong>Fig. 5.6: Real-Ear Verification.</strong> Audiologist conducting probe-tube microphone measurements at the tympanic membrane to calibrate frequency-specific gain curves to the patient's audiogram.
              </div>
            </div>
          </div>
        </div>

        <!-- Diagram C: Dual-View Functional Hearing Aid Architecture -->
        <div class="diagram-dual-wrapper" id="hearingAidDualDiagram" style="margin-top: 3.5rem;">
          <div class="diagram-header-bar">
            <div class="diagram-header-meta">
              <span class="diagram-header-kicker">FIGURE 5.7 &middot; FUNCTIONAL SIGNAL CHAIN</span>
              <h4 class="diagram-header-title">How Hearing Aids Work: The 6-Stage Transduction Chain</h4>
            </div>
            <div class="view-toggle-group" role="tablist" aria-label="Hearing Aid View Switcher">
              <button type="button" class="view-toggle-btn active" data-diagram="hearingAid" data-view="animated" role="tab" aria-selected="true">
                <span class="view-toggle-icon"></span>Animated View
              </button>
              <button type="button" class="view-toggle-btn" data-diagram="hearingAid" data-view="illustration" role="tab" aria-selected="false">
                <span class="view-toggle-icon"></span>Scientific Illustration
              </button>
            </div>
          </div>

          <p style="font-size: 0.95rem; margin-bottom: 1.25rem;">
            Explore the path of sound from atmospheric oscillations through dual directional microphones, digital compression DSP, power amplification, and loudspeaker acoustic generation into the ear canal.
          </p>

          <div class="diagram-view-container">
            <div class="diagram-view diagram-view-animated" id="hearingAidViewAnimated">
              ${getHearingAidAnimatedSvg()}
            </div>
            <div class="diagram-view diagram-view-illustration hidden" id="hearingAidViewIllustration">
              ${getHearingAidIllustrationSvg()}
            </div>
          </div>
        </div>

          <!-- Companion Pills for Hearing Aid Stages -->
          <div class="pill-group" style="justify-content: center; margin-top: 1rem;">
            <button type="button" class="pill-btn aid-pill-btn" data-aid-stage="1">Stage 1: Sound Waves</button>
            <button type="button" class="pill-btn aid-pill-btn" data-aid-stage="2">Stage 2: Microphones</button>
            <button type="button" class="pill-btn aid-pill-btn active" data-aid-stage="3">Stage 3: DSP Processor</button>
            <button type="button" class="pill-btn aid-pill-btn" data-aid-stage="4">Stage 4: Power Amplifier</button>
            <button type="button" class="pill-btn aid-pill-btn" data-aid-stage="5">Stage 5: Receiver (Speaker)</button>
            <button type="button" class="pill-btn aid-pill-btn" data-aid-stage="6">Stage 6: Ear &amp; Hair Cells</button>
          </div>

          <!-- Dynamic Hearing Aid Inspection Card -->
          <div id="aidInspectionCard" style="margin-top: 1rem; background: var(--white); border: 1px solid var(--border); border-left: 4px solid var(--forest); padding: 1.25rem 1.5rem; border-radius: var(--radius-lg);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.4rem;">
              <h4 id="aidStepTitle" style="color: var(--forest); font-size: 1.15rem;">STAGE 3: DIGITAL SIGNAL PROCESSOR (DSP)</h4>
              <span id="aidEnergyDomain" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--clay); font-weight: 600;">Signal Domain: Digital Binary Floating-Point Computations</span>
            </div>
            <p id="aidDescription" style="font-size: 0.95rem; margin-bottom: 0;">
              An ultra-low-power CMOS integrated circuit running on ~1 Volt. It splits audio into 16 to 48 independent frequency channels, applies customized gain curves matching the patient's audiogram, compresses loud sounds (WDRC) so they don't hurt, and cancels acoustic squeal (feedback).
            </p>
          </div>
        </div>

        <!-- 3-Way Audio Demonstration -->
        <div class="editorial-plate" style="margin-top: 3rem; background: var(--white);">
          <div class="kicker">ACOUSTIC AUDIO DEMONSTRATION</div>
          <h4 style="margin-bottom: 0.5rem; color: var(--forest); font-size: 1.25rem;">Listen: Hearing Aid Distortion vs. Implant Stimulation</h4>
          <p style="font-size: 0.95rem; margin-bottom: 1.25rem;">
            Experience why sheer amplification fails when hair cells are missing. Listen to clear speech, an acoustic hearing aid attempting to amplify through 70% dead hair cells, and a 16-channel cochlear implant simulation.
          </p>

          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem;">
            <button type="button" class="btn btn-outline" id="btnDemoNormal">1. Clear Unprocessed Speech</button>
            <button type="button" class="btn btn-outline" id="btnDemoDegraded">2. Acoustic Hearing Aid (70% Dead Cells)</button>
            <button type="button" class="btn btn-outline" id="btnDemoImplant">3. Cochlear Implant (16 Channels)</button>
            <button type="button" class="btn btn-clay btn-sm" id="btnStopDemo" style="display: none;">Stop Audio</button>
          </div>

          <div id="demoAudioStatus" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--charcoal-muted); padding: 0.85rem; background: var(--ivory); border-radius: var(--radius-md); border: 1px solid var(--border);">
            Click any button above to compare the acoustic signals.
          </div>
          <!-- Compatibility notice alias -->
          <div id="demoNotice" style="display: none;"></div>
        </div>

        <!-- Diagnostic Audiogram Chart Plate -->
        <div class="editorial-plate plate-stone" style="margin-top: 2.5rem;">
          <div class="visual-grid-2" style="align-items: center;">
            <div class="photo-frame">
              <span class="photo-badge">CLINICAL AUDIOGRAM</span>
              <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Clinical audiogram diagnostic chart plotting decibel threshold against frequency" style="max-height: 250px;" />
              <div class="caption">
                <strong>Fig. 5.7:</strong> Pure-tone audiogram. When thresholds drop below 70-80 dB HL across speech frequencies (severe-to-profound loss), acoustic amplification yields diminishing returns, making cochlear implantation the indicated neuroprosthetic treatment.
              </div>
            </div>

            <div>
              <div class="kicker">CLINICAL THRESHOLDS</div>
              <h3 style="margin-bottom: 0.75rem;">The Boundary for Implantation</h3>
              <p style="font-size: 0.95rem;">
                A hearing aid is ideal when viable hair cells remain to detect amplified air pressure waves. But when hair cells are completely absent, acoustic gain cannot induce neural firing.
              </p>
              <p style="font-size: 0.95rem;">
                A cochlear implant introduces platinum-iridium electrodes directly into the perilymph fluid of the scala tympani, depolarizing spiral ganglion neurons with electrical voltage (V = I &middot; R) and completely bypassing the non-functional mechanoreceptors.
              </p>
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
          A cochlear implant is a true bionic neuroprosthesis. In under 2 milliseconds, it captures pressure oscillations in air, extracts acoustic spectral envelopes, beams digital code across intact skin via magnetic induction, and fires electrical currents into the auditory nerve.
        </p>

        <!-- AUTHENTIC PHOTOGRAPHY OF COCHLEAR IMPLANT HARDWARE & REAL USERS (4-Card Exhibition Grid) -->
        <div style="margin-top: 2.5rem;">
          <div class="kicker">AUTHENTIC NEUROPROSTHETIC HARDWARE &amp; RECIPIENTS</div>
          <h3>Inside the Bionic Technology &amp; Real-Life Listening</h3>

          <div class="visual-grid-4" style="margin-top: 1.25rem; align-items: stretch;">
            <!-- Card 1: Surgical Otology -->
            <div class="photo-frame">
              <span class="photo-badge">SURGICAL PLACEMENT</span>
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Microscopic surgical operating suite where cochlear implant electrode arrays are placed" style="height: 200px;" />
              <div class="caption">
                <strong>Fig. 6.1: Microsurgical Otology.</strong> Operating suite during implant surgery. The mastoid bone is opened to bed the internal titanium stimulator, and the electrode carrier is threaded through the round window.
              </div>
            </div>

            <!-- Card 2: Silicon Microelectronics -->
            <div class="photo-frame">
              <span class="photo-badge">SILICON MICROCHIP</span>
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Silicon microchip wafer circuitry representing custom implant ASIC processors" style="height: 200px;" />
              <div class="caption">
                <strong>Fig. 6.2: Custom CMOS ASIC.</strong> High-density microchip circuitry housed inside the laser-welded titanium capsule. Decodes transcutaneous RF telemetry and outputs biphasic constant-current pulses.
              </div>
            </div>

            <!-- Card 3: Pediatric User -->
            <div class="photo-frame">
              <span class="photo-badge">PEDIATRIC RECIPIENT</span>
              <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Young child with assistive hearing technology outdoors engaging in conversation" style="height: 200px;" />
              <div class="caption">
                <strong>Fig. 6.3: Pediatric Implant Recipient.</strong> Child wearing external ear-level sound processor and transmitting coil, acquiring spoken language and communicating naturally with peers.
              </div>
            </div>

            <!-- Card 4: Adult Dialogue -->
            <div class="photo-frame">
              <span class="photo-badge">ADULT RECIPIENT</span>
              <img src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Adult listener with cochlear implant actively participating in conversational exchange" style="height: 200px;" />
              <div class="caption">
                <strong>Fig. 6.4: Adult in Dialogue.</strong> Adult implant user in daily conversation. Direct auditory nerve stimulation restores speech comprehension, enabling rich social and intellectual connection.
              </div>
            </div>
          </div>
        </div>

        <!-- Diagram D: Dual-View 6-Stage Transcutaneous Flow Diagram -->
        <div class="editorial-plate" style="margin-top: 3rem; background: var(--white);">
          <div class="diagram-dual-wrapper" id="implantDualDiagram" style="margin: 0 0 1.5rem 0;">
            <div class="diagram-header-bar">
              <div class="diagram-header-meta">
                <span class="diagram-header-kicker">FIGURE 6.5 &middot; TRANSCUTANEOUS SIGNAL PIPELINE</span>
                <h3 class="diagram-header-title" style="margin: 0; font-size: 1.25rem;">How Cochlear Implants Work: Bionic Signal Transmission</h3>
              </div>
              <div class="view-toggle-group" role="tablist" aria-label="Cochlear Implant View Switcher">
                <button type="button" class="view-toggle-btn active" data-diagram="implant" data-view="animated" role="tab" aria-selected="true">
                  <span class="view-toggle-icon"></span>Animated View
                </button>
                <button type="button" class="view-toggle-btn" data-diagram="implant" data-view="illustration" role="tab" aria-selected="false">
                  <span class="view-toggle-icon"></span>Scientific Illustration
                </button>
              </div>
            </div>

            <div class="diagram-view-container">
              <div class="diagram-view diagram-view-animated" id="implantViewAnimated">
                ${getImplantAnimatedSvg()}
              </div>
              <div class="diagram-view diagram-view-illustration hidden" id="implantViewIllustration">
                ${getImplantIllustrationSvg()}
              </div>
            </div>
          </div>

          <!-- Companion Pills for Implant Stages -->
          <div class="pill-group" style="justify-content: center; margin-top: 1rem;">
            <button type="button" class="pill-btn flow-pill-btn active" data-step="1">Stage 1: Dual Mics</button>
            <button type="button" class="pill-btn flow-pill-btn" data-step="2">Stage 2: Audio DSP</button>
            <button type="button" class="pill-btn flow-pill-btn" data-step="3">Stage 3: RF Coil</button>
            <button type="button" class="pill-btn flow-pill-btn" data-step="4">Stage 4: Titanium Receiver</button>
            <button type="button" class="pill-btn flow-pill-btn" data-step="5">Stage 5: Electrode Array</button>
            <button type="button" class="pill-btn flow-pill-btn" data-step="6">Stage 6: Auditory Nerve</button>
          </div>

          <!-- Dynamic Energy Inspector Card with Rounded Style -->
          <div id="flowInspectionCard" style="margin-top: 1.5rem; background: var(--ivory); border: 1px solid var(--border); border-left: 4px solid var(--forest); padding: 1.5rem; border-radius: var(--radius-lg);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
              <h4 id="flowStepTitle" style="color: var(--forest); font-size: 1.25rem;">Stage 01: Dual Microphone Array &amp; Sound Processor</h4>
              <span id="flowEnergyDomain" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--clay); font-weight: 600;">
                ENERGY DOMAIN: ACOUSTIC &rarr; ANALOG VOLTAGE
              </span>
            </div>
            <p id="flowDescription" style="font-size: 0.95rem; margin-bottom: 0.5rem;">
              Miniature electret or MEMS omnidirectional microphones capture sound pressure waves behind the outer ear pinna. Adaptive directional algorithms filter out ambient reverberation and steer sensitivity toward conversation partners.
            </p>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--charcoal-muted);" id="flowLatency">
              Processing latency: &lt; 0.2 ms &middot; Sampling: 16-44.1 kHz &middot; Power: Zinc-air or Li-ion cell
            </div>
          </div>
        </div>

        <!-- Current Spread Infographic Plate -->
        <div class="editorial-plate plate-stone" style="margin-top: 3rem;">
          <div class="kicker">BIOPHYSICAL CONSTRAINTS</div>
          <h3>Current Spread: Why 22 Electrodes Yield ~8 Effective Pitch Channels</h3>
          <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">
            Modern cochlear implants have 16 to 22 physical electrode contacts. However, because cochlear perilymph fluid is an electrical conductor, electrical current spreads outwards from each contact, exciting neighboring nerve fibers.
          </p>
          ${getCurrentSpreadSvg()}
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

        <!-- Scientific Caveat Plaque with Rounded Corners -->
        <div style="background: var(--ivory); border: 1px solid var(--border); border-left: 4px solid var(--clay); padding: 1.25rem 1.5rem; border-radius: var(--radius-lg); margin-bottom: 2.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
          <div style="font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--clay); font-weight: 600; margin-bottom: 0.35rem;">
            SCIENTIFIC MONOGRAPH NOTE &middot; ACOUSTIC APPROXIMATION
          </div>
          <p style="font-size: 0.95rem; margin-bottom: 0; color: var(--charcoal);">
            A channel vocoder is an acoustic model based on the psychoacoustic methods of Shannon et al. (1995) and Loizou (1999). It illustrates the reduction in spectral resolution and pitch structure that a newly implanted ear receives. However, it is an approximation: recipient brains undergo remarkable neuroplastic adaptation over months of rehabilitation, learning to extract rich linguistic meaning from these electrical pulse trains.
          </p>
        </div>

        <div class="visual-grid-2" style="align-items: flex-start;">
          <!-- Left: Studio Console Photo & Vocoder Architecture -->
          <div>
            <div class="photo-frame">
              <span class="photo-badge">AUDIO SIGNAL PROCESSING</span>
              <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Audio engineering console and spectrum analyzer used for digital sound synthesis and signal analysis" style="max-height: 280px;" />
              <div class="caption">
                <strong>Fig. 7.1:</strong> Digital audio signal processing desk. The Shannon channel vocoder splits incoming speech into N logarithmic frequency bands, rectifies each band to extract its amplitude envelope (&lt; 50 Hz), and uses that envelope to amplitude-modulate band-limited noise carriers.
              </div>
            </div>

            <!-- Grade 11 Physics Shannon Channel Capacity & Vocoder Card -->
            ${getVocoderCapacityMathCard()}
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
                <span>Number of Spectral Channels (N)</span>
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
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
              <button type="button" class="btn btn-forest" id="btnPlaySim" style="flex: 1.2; min-width: 160px;">
                Play Audio
              </button>
              <button type="button" class="btn btn-clay" id="btnToggleMode" style="flex: 1; min-width: 200px;">
                Hearing: Simulated Implant
              </button>
            </div>

            <!-- Audio Scrubber -->
            <div>
              <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem; color: var(--charcoal-muted); margin-bottom: 0.25rem;">
                <span>PLAYBACK SCRUBBER</span>
                <span id="simPlaybackTime">0.00s / 0.00s</span>
              </div>
              <input type="range" id="simScrubber" min="0" max="100" value="0" step="0.5" style="height: 6px;">
            </div>
          </div>
        </div>

        <!-- Dual Synchronized Spectrogram Canvases with Rounded Borders -->
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

        <!-- Visual Photographic Split: Participant & Clinical Audiogram -->
        <div class="visual-grid-2" style="margin-top: 2.5rem; align-items: stretch;">
          <div class="photo-frame">
            <span class="photo-badge">PSYCHOACOUSTIC TRIAL</span>
            <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Adult subject participating in an auditory listening and speech comprehension trial" style="max-height: 260px;" />
            <div class="caption">
              <strong>Fig. 8.1:</strong> Psychoacoustic sentence comprehension testing. Human speech comprehension depends heavily on temporal envelope cues — the slow fluctuations in overall energy (&lt; 50 Hz) that trace syllables and rhythm.
            </div>
          </div>

          <div class="photo-frame">
            <span class="photo-badge">CLINICAL AUDIOGRAM CHART</span>
            <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Clinical audiogram diagnostic chart plotting decibel threshold against frequency" style="max-height: 260px;" />
            <div class="caption">
              <strong>Fig. 8.2:</strong> Clinical audiometric evaluation. In quiet listening, comprehension rises rapidly up to 8 channels, where intelligibility approaches normal conversational baseline.
            </div>
          </div>
        </div>

        <div class="visual-grid-2" style="margin-top: 2.5rem; align-items: flex-start;">
          <!-- Left: Current Spread Diagram -->
          <div>
            ${getCurrentSpreadSvg()}
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
                <!-- Dynamically populated rounded options -->
              </div>
            </div>

            <div id="expFeedback" style="display: none; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem; font-size: 0.95rem;">
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

        <!-- Live Results Chart vs Shannon (1995) Curve with expResultsCanvas & shannonCanvas IDs -->
        <div class="editorial-plate" style="margin-top: 3rem; background: var(--white);">
          <div class="kicker">PSYCHOACOUSTIC BENCHMARK PLOT</div>
          <h3>Fig. 8.4: Your Comprehension vs. Shannon et al. (1995) Data</h3>
          <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">
            Notice how sentence intelligibility follows a steep sigmoidal saturation curve: 1 channel yields near-zero recognition, 4 channels reaches ~60-70%, and 8 channels delivers ~90% recognition for simple sentences in quiet.
          </p>
          <canvas id="expResultsCanvas" class="resonance-canvas" height="180" style="height: 180px;"></canvas>
          <canvas id="shannonCanvas" style="display:none;"></canvas>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 9: THE MUSIC CHALLENGE
         ==================================================================== -->
    <section id="music" class="bg-sage">
      <div class="container">
        <div class="kicker">THE FRONTIER OF NEUROPROSTHETICS</div>
        <h2>Why Music is Hard for Implants</h2>
        <p class="lead">
          While speech relies on slow temporal envelope changes (&lt; 50 Hz) that 8 channels easily carry, music depends on <em>fine harmonic pitch structure</em> (&Delta;f &lt; 2 Hz). Channel vocoders smear sharp integer overtones into coarse noise bands, turning melodies into rhythmic percussive thumps.
        </p>

        <!-- Spectrum Comparison SVG -->
        <div style="margin: 2.5rem 0;">
          ${getSpeechVsMusicSpectrumSvg()}
        </div>

        <div class="visual-grid-2" style="margin-top: 2.5rem; align-items: flex-start;">
          <!-- Left: Acoustic Instrument Photos -->
          <div>
            <div class="photo-frame">
              <span class="photo-badge">HARMONIC ACOUSTICS</span>
              <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Violin strings vibrating, illustrating physical harmonic overtones and exact fundamental frequency pitch" style="max-height: 260px;" />
              <div class="caption">
                <strong>Fig. 9.1:</strong> String vibration and acoustic overtones. Musical pitch is defined by the fundamental frequency (f0) and integer harmonics (2f0, 3f0, 4f0). Discriminating two adjacent semitones requires resolving a ~6% change in frequency (&asymp; 1-2 Hz).
              </div>
            </div>

            <div class="photo-frame" style="margin-top: 1.5rem;">
              <span class="photo-badge">POLYPHONIC ORCHESTRA</span>
              <img src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Symphony orchestra performing polyphonic acoustic classical music" style="max-height: 240px;" />
              <div class="caption">
                <strong>Fig. 9.2:</strong> Symphonic polyphony. Multiple overlapping instruments produce dense spectral structures that require thousands of distinct frequency channels to resolve.
              </div>
            </div>
          </div>

          <!-- Right: Interactive Melody Guessing Game -->
          <div class="editorial-plate" style="margin: 0; background: var(--white);">
            <div class="kicker">INTERACTIVE MELODY BENCH</div>
            <h3 style="margin-bottom: 0.75rem;">The Melody Identification Challenge</h3>
            <p style="font-size: 0.95rem; margin-bottom: 1.25rem;">
              Can you identify a famous melody when its fine pitch structure is stripped away by channel vocoding? Select a song and channel count, listen, and guess.
            </p>

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

            <div id="musicFeedback" style="display: none; padding: 1rem; border-radius: var(--radius-md); font-size: 0.95rem;">
              <!-- Dynamic Feedback -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         SECTION 10: CONCLUSIONS, SCHOLARLY REFERENCES, AND CREDITS
         ==================================================================== -->
    <section id="takeaways" class="bg-ivory">
      <div class="container">
        <div class="kicker">SYNTHESIS &amp; SCHOLARLY SOURCES</div>
        <h2>Conclusions, Scholarly References, and Credits</h2>
        <p class="lead">
          The human ear and the cochlear implant represent two extraordinary physical solutions to the challenges of acoustic wave transduction and neural signaling.
        </p>

        <!-- 3 Core Physical Infographic Cards with Rounded Corners -->
        <div class="visual-grid-3" style="margin-top: 2.5rem;">
          <div class="compare-box highlight-forest">
            <div class="kicker">PHYSICAL PRINCIPLE 01</div>
            <h3 style="font-size: 1.3rem;">Impedance Matching</h3>
            <p style="font-size: 0.95rem;">
              The middle ear ossicles concentrate atmospheric wave force across a 17:1 area ratio and 1.3:1 lever advantage, achieving a 22-fold pressure gain that overcomes a 99.9% energy reflection barrier at the air-fluid cochlear boundary.
            </p>
          </div>

          <div class="compare-box highlight-forest">
            <div class="kicker">PHYSICAL PRINCIPLE 02</div>
            <h3 style="font-size: 1.3rem;">Tonotopic Dispersion</h3>
            <p style="font-size: 0.95rem;">
              The cochlea performs spatial mechanical Fourier analysis. The narrow, taut base resonates to high frequencies up to 20,000 Hz, while the wide, compliant apex resonates to low frequencies down to 20 Hz, mapping frequency along 32 mm of neural space.
            </p>
          </div>

          <div class="compare-box highlight-clay">
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
              <strong>Shannon, R. V., Zeng, F. G., Kamath, V., Wygonski, J., &amp; Ekelid, M. (1995).</strong> Speech recognition with primarily temporal cues. <em>Science</em>, 270(5234), 303–304.
            </li>
            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--border);">
              <strong>von B&eacute;k&eacute;sy, G. (1960).</strong> <em>Experiments in Hearing</em>. McGraw-Hill. (Recipient of the 1961 Nobel Prize in Physiology or Medicine).
            </li>
            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--border);">
              <strong>Greenwood, D. D. (1990).</strong> A cochlear frequency-position function for several species—29 years later. <em>The Journal of the Acoustical Society of America</em>, 87(6), 2592–2605.
            </li>
            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--border);">
              <strong>Wilson, B. S., &amp; Dorman, M. F. (2008).</strong> Cochlear implants: current designs and future possibilities. <em>Physics in Medicine &amp; Biology</em>, 53(19), R115–R182.
            </li>
            <li style="padding: 0.75rem 0;">
              <strong>Loizou, P. C. (1999).</strong> Introduction to cochlear implants. <em>IEEE Signal Processing Magazine</em>, 16(5), 101–110.
            </li>
          </ul>
        </div>

        <!-- High-School Project Colophon & Credits -->
        <div style="margin-top: 3rem; border-top: 1px solid var(--border); padding-top: 2rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; font-size: 0.9rem; color: var(--charcoal-muted);">
          <div>
            <div style="font-family: var(--font-display); font-size: 1.2rem; color: var(--forest); font-weight: 600;">RESONANCE</div>
            <div>A High-School Physics &amp; Bioacoustics Research Exhibition &middot; 2026</div>
            <div>Designed with pure HTML5, CSS3, Web Audio API DSP, and HTML Canvas.</div>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.8rem;">
            <div>RESEARCH TEAM:</div>
            <div>Maya Lin &middot; Acoustic Wave Dynamics &amp; Impedance Modeling</div>
            <div>Julian Vance &middot; Tonotopic Cochlear Biomechanics</div>
            <div>Elena Rostova &middot; Neuroprosthetic Channel Vocoder DSP</div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Back-to-Top Floating Pill Button -->
  <button type="button" class="back-to-top-btn" id="btnBackToTop" aria-label="Back to top of page">&uarr; Top</button>

  <!-- Live Caption Floating Bar for Audio Accessibility (Pill Shaped) -->
  <aside id="liveCaptionBar" class="live-caption-bar" aria-live="polite">
    <!-- Spoken caption appears here dynamically -->
  </aside>

  <script>
  // Inlined Speech Audio Bundle
  const EMBEDDED_SPEECH = ${JSON.stringify(speechBundle)};
  
  // Client JavaScript Code
  ${clientScriptBody}
  </script>
</body>
</html>`;
}

console.log('Compiling full HTML string...');
const fullHtml = getFullHtml(speechBundle);

console.log('Validating full HTML integrity...');

// 1. Zero emojis
assertNoEmojis(fullHtml);
console.log('PASS: Zero emojis detected.');

// 2. Zero CSS gradients
const cssGradientMatches = fullHtml.match(/linear-gradient|radial-gradient|conic-gradient|-webkit-gradient/gi);
if (cssGradientMatches && cssGradientMatches.length > 0) {
  throw new Error('FAIL: Detected CSS gradients: ' + JSON.stringify(cssGradientMatches));
}
console.log('PASS: Zero CSS gradients detected.');

// 3. Zero Quiz / Questions / FAQ section
const cleanHtmlWithoutComments = fullHtml.replace(/<!--[\s\S]*?-->/g, '');
if (/<section[^>]*id=["'](?:quiz|faq|questions)["']/i.test(fullHtml) ||
    /<h[1-6][^>]*>(?:quiz|faq|questions|test your knowledge)/i.test(cleanHtmlWithoutComments)) {
  throw new Error('FAIL: Detected quiz or FAQ section!');
}
console.log('PASS: Zero quiz or FAQ sections detected. Natural conclusion confirmed.');

// 4. Validate client JavaScript syntax
const scriptContentStart = fullHtml.indexOf('<script>') + '<script>'.length;
const scriptContentEnd = fullHtml.lastIndexOf('</script>');
const jsCode = fullHtml.slice(scriptContentStart, scriptContentEnd);
new vm.Script(jsCode, { filename: 'inline_bundle.js' });
console.log('PASS: Client JavaScript syntax is valid and error-free.');

// 5. Output file
fs.writeFileSync('index.html', fullHtml, 'utf8');
console.log('SUCCESS: Generated index.html (' + (fullHtml.length / 1024).toFixed(1) + ' KB)');
