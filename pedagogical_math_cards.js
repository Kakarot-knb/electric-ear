// pedagogical_math_cards.js - Grade 11 Physics Mathematical Presentation Cards
// Formatted with proper stacked fractions, SI units, physical relationships, and worked examples.
// ZERO emojis, ZERO gradients.

const { C } = require('./palette.js');

const mathAndSimCss = `
/* ==========================================================================
   MATHEMATICAL PRESENTATION SYSTEM (GRADE 11 PHYSICS)
   ========================================================================== */
.math-card {
  background-color: var(--white);
  border: 1px solid var(--border);
  border-left: 4px solid var(--forest);
  border-radius: var(--radius-lg);
  padding: 1.75rem 2rem;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.math-card-header {
  margin-bottom: 1.25rem;
}

.math-card-kicker {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--clay);
  font-weight: 600;
  display: block;
  margin-bottom: 0.35rem;
}

.math-card-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--forest);
  margin: 0 0 0.4rem 0;
  font-weight: 600;
}

.math-card-purpose {
  font-size: 0.95rem;
  color: var(--charcoal);
  margin-bottom: 0;
  line-height: 1.5;
}

.math-formula-box {
  background-color: var(--ivory);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem;
  text-align: center;
  margin: 1.25rem 0;
}

.math-display-eq {
  font-family: var(--font-display), "Times New Roman", serif;
  font-size: 1.6rem;
  color: var(--forest);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.math-sym {
  font-style: italic;
  font-weight: 600;
}

.math-op {
  font-style: normal;
  color: var(--charcoal-muted);
  margin: 0 0.15rem;
}

.math-times {
  font-style: normal;
  color: var(--charcoal-muted);
  margin: 0 0.2rem;
}

.math-frac {
  display: inline-flex;
  flex-direction: column;
  vertical-align: middle;
  text-align: center;
  padding: 0 0.35rem;
  line-height: 1.1;
  font-family: var(--font-display), serif;
}

.math-num {
  border-bottom: 1.5px solid currentColor;
  padding-bottom: 2px;
  font-size: 0.95em;
}

.math-den {
  padding-top: 2px;
  font-size: 0.95em;
}

.math-sqrt-wrap {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-display), serif;
}

.math-sqrt-sym {
  font-size: 1.2em;
  margin-right: 1px;
}

.math-sqrt-radicand {
  border-top: 1.5px solid currentColor;
  padding-top: 2px;
  display: inline-flex;
  align-items: center;
}

.math-rearranged-row {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--border);
}

.math-rearranged-pill {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  padding: 0.35rem 0.9rem;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  color: var(--charcoal);
}

.math-sublabel {
  font-size: 0.72rem;
  text-transform: uppercase;
  color: var(--charcoal-muted);
  letter-spacing: 0.04em;
}

.math-details-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.75rem;
  margin: 1.5rem 0;
  align-items: start;
}

.math-section-title {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--forest);
  font-weight: 600;
  margin-bottom: 0.65rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.35rem;
}

.math-vars-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.math-vars-table th {
  text-align: left;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  color: var(--charcoal-muted);
  padding: 0.4rem 0.5rem;
  border-bottom: 1px solid var(--border);
}

.math-vars-table td {
  padding: 0.45rem 0.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  vertical-align: middle;
}

.math-vars-table code {
  background: var(--stone);
  padding: 0.15rem 0.35rem;
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  color: var(--forest);
}

.math-proportionality-note {
  background: var(--stone);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--charcoal);
  border: 1px solid var(--border);
}

.math-example-card {
  background: var(--sage-pale);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem;
  margin-top: 1.25rem;
}

.math-example-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.85rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.math-example-tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--forest);
  font-weight: 700;
  background: var(--white);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
}

.math-example-step {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.math-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--forest);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.math-step-calc {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.85rem;
  margin-top: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

/* ==========================================================================
   ACOUSTIC SIMULATOR WORKBENCH & REAL-TIME HUD
   ========================================================================== */
.sim-workbench {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.75rem 2rem;
  margin: 2.5rem 0;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}

.sim-telemetry-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.85rem;
  background: var(--ivory);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 0.85rem 1.25rem;
  margin-bottom: 1.5rem;
}

.sim-telemetry-badge {
  display: flex;
  flex-direction: column;
}

.sim-telemetry-lbl {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--charcoal-muted);
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.sim-telemetry-val {
  font-family: var(--font-mono);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--forest);
}

.sim-canvas-block {
  margin-bottom: 1.25rem;
}

.sim-canvas-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--charcoal-muted);
  margin-bottom: 0.35rem;
}

.sim-canvas-title {
  font-weight: 600;
  color: var(--forest);
}

.sim-control-deck {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
  margin-top: 1.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.sim-control-section-title {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--forest);
  font-weight: 700;
  margin-bottom: 0.85rem;
}

@media (max-width: 960px) {
  .math-details-grid { grid-template-columns: 1fr; }
  .sim-control-deck { grid-template-columns: 1fr; }
  .math-card { padding: 1.25rem 1.25rem; }
  .sim-workbench { padding: 1.25rem 1.25rem; }
}
`;

// ----------------------------------------------------------------------------
// 1. Universal Wave Speed Equation Card
// ----------------------------------------------------------------------------
function getWaveSpeedMathCard() {
  return `
<div class="math-card" id="waveSpeedMathCard">
  <div class="math-card-header">
    <span class="math-card-kicker">GRADE 11 PHYSICS &middot; WAVE MECHANICS</span>
    <h4 class="math-card-title">The Universal Wave Speed Equation</h4>
    <p class="math-card-purpose">
      Calculates the propagation velocity of a mechanical wave through an elastic medium based on its temporal oscillation frequency and spatial wavelength.
    </p>
  </div>

  <div class="math-formula-box">
    <div class="math-display-eq">
      <span class="math-sym">v</span>
      <span class="math-op">=</span>
      <span class="math-sym">f</span>
      <span class="math-times">&times;</span>
      <span class="math-sym">&lambda;</span>
    </div>
    <div class="math-rearranged-row">
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Wavelength:</span>
        <span class="math-sym">&lambda;</span>
        <span class="math-op">=</span>
        <div class="math-frac">
          <span class="math-num">v</span>
          <span class="math-den">f</span>
        </div>
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Frequency:</span>
        <span class="math-sym">f</span>
        <span class="math-op">=</span>
        <div class="math-frac">
          <span class="math-num">v</span>
          <span class="math-den">&lambda;</span>
        </div>
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Period Form:</span>
        <span class="math-sym">v</span>
        <span class="math-op">=</span>
        <div class="math-frac">
          <span class="math-num">&lambda;</span>
          <span class="math-den">T</span>
        </div>
      </div>
    </div>
  </div>

  <div class="math-details-grid">
    <div class="math-vars-col">
      <div class="math-section-title">VARIABLE DEFINITIONS &amp; SI UNITS</div>
      <table class="math-vars-table">
        <thead>
          <tr><th>Symbol</th><th>Quantity</th><th>SI Unit</th><th>Physical Meaning</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong class="math-sym">v</strong></td>
            <td>Wave Speed</td>
            <td><code>m/s</code></td>
            <td>Velocity at which pressure compressions travel through space</td>
          </tr>
          <tr>
            <td><strong class="math-sym">f</strong></td>
            <td>Frequency</td>
            <td><code>Hz (s<sup>-1</sup>)</code></td>
            <td>Number of complete wave cycles produced per second</td>
          </tr>
          <tr>
            <td><strong class="math-sym">&lambda;</strong></td>
            <td>Wavelength</td>
            <td><code>m (meters)</code></td>
            <td>Distance between consecutive compression peaks or rarefaction troughs</td>
          </tr>
          <tr>
            <td><strong class="math-sym">T</strong></td>
            <td>Wave Period</td>
            <td><code>s (seconds)</code></td>
            <td>Time taken for one full molecular oscillation cycle (T = 1 / f)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="math-physics-col">
      <div class="math-section-title">PHYSICAL RELATIONSHIP &amp; PROPORTIONALITY</div>
      <div class="math-proportionality-note">
        <strong>Inverse Proportionality:</strong> The propagation speed <span class="math-sym">v</span> is determined strictly by the physical elasticity and density of the medium, NOT by the sound source.
        <div style="text-align: center; margin: 0.6rem 0; font-family: var(--font-mono); font-weight: 600; color: var(--forest);">
          f &prop; <div class="math-frac"><span class="math-num">1</span><span class="math-den">&lambda;</span></div> &nbsp;&nbsp;&harr;&nbsp;&nbsp; &lambda; &prop; <div class="math-frac"><span class="math-num">1</span><span class="math-den">f</span></div>
        </div>
        <strong>Critical Insight:</strong> When frequency is doubled (e.g., jumping an octave from 440 Hz to 880 Hz), the wave does NOT travel faster. Instead, its spatial compressions pack twice as close together in space, cutting the wavelength precisely in half (from 78.0 cm to 39.0 cm).
      </div>
    </div>
  </div>

  <div class="math-example-card">
    <div class="math-example-header">
      <span class="math-example-tag">WORKED NUMERICAL EXAMPLE &middot; GRADE 11 CALCULATION</span>
      <strong style="color: var(--forest);">Concert Pitch Tuning Fork in Dry Air at 20&deg;C</strong>
    </div>
    <div class="math-example-body">
      <div class="math-example-step">
        <span class="math-step-num">1</span>
        <div><strong>Identify Given Parameters:</strong> Oscillation frequency <span class="math-sym">f</span> = 440 Hz (standard Concert A), sound velocity in ambient room air <span class="math-sym">v</span> = 343 m/s. Target: calculate spatial wavelength <span class="math-sym">&lambda;</span> and wave period <span class="math-sym">T</span>.</div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">2</span>
        <div><strong>Substitute into Wavelength Equation:</strong>
          <div class="math-step-calc">
            <span class="math-sym">&lambda;</span> = <div class="math-frac"><span class="math-num">v</span><span class="math-den">f</span></div> = <div class="math-frac"><span class="math-num">343 m/s</span><span class="math-den">440 s<sup>-1</sup></span></div> = <strong>0.7795 m &asymp; 78.0 cm</strong>
          </div>
        </div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">3</span>
        <div><strong>Compute Wave Period:</strong>
          <div class="math-step-calc">
            <span class="math-sym">T</span> = <div class="math-frac"><span class="math-num">1</span><span class="math-den">f</span></div> = <div class="math-frac"><span class="math-num">1</span><span class="math-den">440 Hz</span></div> = 0.002273 s = <strong>2.27 ms</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

// ----------------------------------------------------------------------------
// 2. Speed of Sound in Elastic Media & Temperature Dependency Card
// ----------------------------------------------------------------------------
function getSoundSpeedMediumMathCard() {
  return `
<div class="math-card" id="soundSpeedMediumMathCard">
  <div class="math-card-header">
    <span class="math-card-kicker">GRADE 11 PHYSICS &middot; THERMAL &amp; ELASTIC DYNAMICS</span>
    <h4 class="math-card-title">Acoustic Velocity in Elastic Media &amp; Thermal Scaling</h4>
    <p class="math-card-purpose">
      Calculates how sound propagation velocity depends on the volume elasticity, inertial density, and thermodynamic temperature of the transmission medium.
    </p>
  </div>

  <div class="math-formula-box">
    <div class="math-display-eq">
      <span class="math-sym">v</span>
      <span class="math-op">=</span>
      <div class="math-sqrt-wrap">
        <span class="math-sqrt-sym">&radic;</span>
        <div class="math-sqrt-radicand">
          <div class="math-frac">
            <span class="math-num">B</span>
            <span class="math-den">&rho;</span>
          </div>
        </div>
      </div>
      <span class="math-op">&asymp;</span>
      <span class="math-sym">331.3</span>
      <span class="math-op">+</span>
      <span class="math-sym">0.606</span>
      <span class="math-times">&times;</span>
      <span class="math-sym">T<sub>C</sub></span>
    </div>
    <div class="math-rearranged-row">
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Adiabatic Gas:</span>
        <span class="math-sym">v</span>
        <span class="math-op">=</span>
        <div class="math-sqrt-wrap">
          <span class="math-sqrt-sym">&radic;</span>
          <div class="math-sqrt-radicand">
            <div class="math-frac">
              <span class="math-num">&gamma; &middot; R &middot; T<sub>K</sub></span>
              <span class="math-den">M</span>
            </div>
          </div>
        </div>
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Air at 0&deg;C:</span>
        <span class="math-sym">v</span> = 331.3 m/s
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Air at 20&deg;C:</span>
        <span class="math-sym">v</span> = 343.4 m/s
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Cochlear Fluid:</span>
        <span class="math-sym">v</span> &asymp; 1,480 m/s
      </div>
    </div>
  </div>

  <div class="math-details-grid">
    <div class="math-vars-col">
      <div class="math-section-title">VARIABLE DEFINITIONS &amp; SI UNITS</div>
      <table class="math-vars-table">
        <thead>
          <tr><th>Symbol</th><th>Quantity</th><th>SI Unit</th><th>Physical Meaning</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong class="math-sym">B</strong></td>
            <td>Bulk Modulus</td>
            <td><code>Pa (N/m<sup>2</sup>)</code></td>
            <td>Elastic resistance of substance to uniform volumetric compression</td>
          </tr>
          <tr>
            <td><strong class="math-sym">&rho;</strong></td>
            <td>Mass Density</td>
            <td><code>kg/m<sup>3</sup></code></td>
            <td>Inertial mass per unit volume of the medium</td>
          </tr>
          <tr>
            <td><strong class="math-sym">&gamma;</strong></td>
            <td>Adiabatic Ratio</td>
            <td><code>dimensionless</code></td>
            <td>Heat capacity ratio (C<sub>p</sub>/C<sub>v</sub> = 1.40 for diatomic air)</td>
          </tr>
          <tr>
            <td><strong class="math-sym">T<sub>C</sub></strong></td>
            <td>Celsius Temperature</td>
            <td><code>&deg;C</code></td>
            <td>Ambient temperature in degrees Celsius</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="math-physics-col">
      <div class="math-section-title">PHYSICAL RELATIONSHIP &amp; PROPORTIONALITY</div>
      <div class="math-proportionality-note">
        <strong>Stiffness vs. Inertia:</strong> Sound speed increases with elastic restoring force (<span class="math-sym">B</span>) and decreases with mass inertia (<span class="math-sym">&rho;</span>).
        <div style="margin: 0.5rem 0;">
          Although water is 800 times denser than air, its bulk modulus is over 15,000 times higher (B &asymp; 2.18 &times; 10<sup>9</sup> Pa). As a result, sound travels over <strong>4.3 times faster</strong> in cochlear perilymph fluid (1,480 m/s) than in atmospheric air!
        </div>
        <strong>Thermal Kinetic Effect:</strong> Warmer air molecules possess higher kinetic energy, restoring pressure equilibrium faster and adding <strong>+0.606 m/s per degree Celsius</strong>.
      </div>
    </div>
  </div>

  <div class="math-example-card">
    <div class="math-example-header">
      <span class="math-example-tag">WORKED COMPARISON &middot; AIR VS COCHLEAR PERILYMPH</span>
      <strong style="color: var(--forest);">Velocity Contrast Across the Oval Window Boundary</strong>
    </div>
    <div class="math-example-body">
      <div class="math-example-step">
        <span class="math-step-num">1</span>
        <div><strong>Calculate Room Air Speed (20&deg;C):</strong>
          <div class="math-step-calc">
            <span class="math-sym">v</span><sub>air</sub> &asymp; 331.3 + (0.606 &times; 20) = 331.3 + 12.12 = <strong>343.4 m/s</strong>
          </div>
        </div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">2</span>
        <div><strong>Calculate Perilymph Liquid Speed (B = 2.18 &times; 10<sup>9</sup> Pa, &rho; = 1,000 kg/m<sup>3</sup>):</strong>
          <div class="math-step-calc">
            <span class="math-sym">v</span><sub>fluid</sub> = <div class="math-sqrt-wrap"><span class="math-sqrt-sym">&radic;</span><div class="math-sqrt-radicand"><div class="math-frac"><span class="math-num">2.18 &times; 10<sup>9</sup> N/m<sup>2</sup></span><span class="math-den">1,000 kg/m<sup>3</sup></span></div></div></div> = &radic;(2.18 &times; 10<sup>6</sup>) = <strong>1,476.5 m/s &asymp; 1,480 m/s</strong>
          </div>
        </div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">3</span>
        <div><strong>Physical Implication for Wavelength at 1,000 Hz:</strong>
          In air, &lambda; = 34.3 cm. In cochlear fluid, &lambda; jumps to 1.48 m! This speed jump makes impedance matching essential.
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

// ----------------------------------------------------------------------------
// 3. Harmonic Wave Parameters Card
// ----------------------------------------------------------------------------
function getHarmonicWaveParamsMathCard() {
  return `
<div class="math-card" id="harmonicWaveParamsMathCard">
  <div class="math-card-header">
    <span class="math-card-kicker">GRADE 11 PHYSICS &middot; OSCILLATIONS &amp; WAVE FUNCTIONS</span>
    <h4 class="math-card-title">Harmonic Wave Kinematics &amp; Pressure Wavefunction</h4>
    <p class="math-card-purpose">
      Defines the mathematical parameters describing simple harmonic acoustic oscillations in time and space.
    </p>
  </div>

  <div class="math-formula-box">
    <div class="math-display-eq">
      &Delta;<span class="math-sym">P(x, t)</span>
      <span class="math-op">=</span>
      &Delta;<span class="math-sym">P</span><sub>max</sub>
      <span class="math-times">&times;</span>
      <span class="math-sym">sin</span>
      <span class="math-op">(</span>
      <span class="math-sym">k</span><span class="math-times">&middot;</span><span class="math-sym">x</span>
      <span class="math-op">&minus;</span>
      <span class="math-sym">&omega;</span><span class="math-times">&middot;</span><span class="math-sym">t</span>
      <span class="math-op">)</span>
    </div>
    <div class="math-rearranged-row">
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Angular Frequency:</span>
        <span class="math-sym">&omega;</span>
        <span class="math-op">=</span>
        <span class="math-sym">2&pi; f</span>
        <span class="math-op">=</span>
        <div class="math-frac">
          <span class="math-num">2&pi;</span>
          <span class="math-den">T</span>
        </div>
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Angular Wavenumber:</span>
        <span class="math-sym">k</span>
        <span class="math-op">=</span>
        <div class="math-frac">
          <span class="math-num">2&pi;</span>
          <span class="math-den">&lambda;</span>
        </div>
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Phase Speed:</span>
        <span class="math-sym">v</span>
        <span class="math-op">=</span>
        <div class="math-frac">
          <span class="math-num">&omega;</span>
          <span class="math-den">k</span>
        </div>
        <span class="math-op">=</span>
        <span class="math-sym">f &times; &lambda;</span>
      </div>
    </div>
  </div>

  <div class="math-details-grid">
    <div class="math-vars-col">
      <div class="math-section-title">VARIABLE DEFINITIONS &amp; SI UNITS</div>
      <table class="math-vars-table">
        <thead>
          <tr><th>Symbol</th><th>Quantity</th><th>SI Unit</th><th>Physical Meaning</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong class="math-sym">&omega;</strong></td>
            <td>Angular Frequency</td>
            <td><code>rad/s</code></td>
            <td>Rate of oscillation phase rotation in time</td>
          </tr>
          <tr>
            <td><strong class="math-sym">k</strong></td>
            <td>Angular Wavenumber</td>
            <td><code>rad/m</code></td>
            <td>Spatial rate of phase change per meter along the wave path</td>
          </tr>
          <tr>
            <td><strong class="math-sym">&Delta;P(x,t)</strong></td>
            <td>Acoustic Pressure</td>
            <td><code>Pa</code></td>
            <td>Instantaneous pressure deviation from atmospheric equilibrium</td>
          </tr>
          <tr>
            <td><strong class="math-sym">&Delta;P<sub>max</sub></strong></td>
            <td>Pressure Amplitude</td>
            <td><code>Pa</code></td>
            <td>Peak acoustic overpressure corresponding to physical loudness</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="math-physics-col">
      <div class="math-section-title">PHYSICAL RELATIONSHIP &amp; PROPORTIONALITY</div>
      <div class="math-proportionality-note">
        <strong>Spatiotemporal Duality:</strong> In a traveling acoustic wave, time and space are married by wave velocity.
        <ul style="margin: 0.5rem 0 0 1rem; padding: 0;">
          <li>At a single fixed point in space (<span class="math-sym">x</span> = constant), air molecules oscillate back and forth in time with period <span class="math-sym">T</span>.</li>
          <li>At a single frozen instant in time (<span class="math-sym">t</span> = constant), alternating compressions and rarefactions repeat across distance with spatial wavelength <span class="math-sym">&lambda;</span>.</li>
        </ul>
        The ratio <div class="math-frac"><span class="math-num">&omega;</span><span class="math-den">k</span></div> = <div class="math-frac"><span class="math-num">rad/s</span><span class="math-den">rad/m</span></div> = <strong>m/s</strong> equals the physical wave speed.
      </div>
    </div>
  </div>

  <div class="math-example-card">
    <div class="math-example-header">
      <span class="math-example-tag">NUMERICAL SIMULATION VERIFICATION</span>
      <strong style="color: var(--forest);">Standard 440 Hz Acoustic Wave Parameters</strong>
    </div>
    <div class="math-example-body">
      <div class="math-example-step">
        <span class="math-step-num">1</span>
        <div><strong>Calculate Angular Frequency &omega;:</strong>
          <div class="math-step-calc">
            <span class="math-sym">&omega;</span> = 2 &times; &pi; &times; 440 Hz = <strong>2,764.6 rad/s</strong>
          </div>
        </div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">2</span>
        <div><strong>Calculate Angular Wavenumber k (&lambda; = 0.7795 m):</strong>
          <div class="math-step-calc">
            <span class="math-sym">k</span> = <div class="math-frac"><span class="math-num">2 &times; &pi;</span><span class="math-den">0.7795 m</span></div> = <strong>8.06 rad/m</strong>
          </div>
        </div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">3</span>
        <div><strong>Verify Phase Velocity Ratio:</strong>
          <div class="math-step-calc">
            <span class="math-sym">v</span> = <div class="math-frac"><span class="math-num">2,764.6 rad/s</span><span class="math-den">8.06 rad/m</span></div> = <strong>343.0 m/s</strong> (matches speed of sound exactly!)
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

// ----------------------------------------------------------------------------
// 4. Middle Ear Impedance Transformer Card
// ----------------------------------------------------------------------------
function getMiddleEarImpedanceMathCard() {
  return `
<div class="math-card" id="middleEarImpedanceMathCard">
  <div class="math-card-header">
    <span class="math-card-kicker">GRADE 11 PHYSICS &middot; ACOUSTIC IMPEDANCE &amp; HYDRAULIC LEVERS</span>
    <h4 class="math-card-title">Middle Ear Biomechanical Impedance Transformer</h4>
    <p class="math-card-purpose">
      Calculates the mechanical pressure amplification generated by the tympanic-to-stapes areal ratio and ossicular lever advantage, overcoming acoustic reflection at the fluid boundary.
    </p>
  </div>

  <div class="math-formula-box">
    <div class="math-display-eq">
      <span class="math-sublabel" style="font-size: 0.9rem; margin-right: 0.5rem;">TOTAL PRESSURE GAIN:</span>
      <div class="math-frac">
        <span class="math-num">P<sub>stapes</sub></span>
        <span class="math-den">P<sub>tympanic</sub></span>
      </div>
      <span class="math-op">=</span>
      <div class="math-frac">
        <span class="math-num">A<sub>tympanic</sub></span>
        <span class="math-den">A<sub>stapes</sub></span>
      </div>
      <span class="math-times">&times;</span>
      <div class="math-frac">
        <span class="math-num">L<sub>malleus</sub></span>
        <span class="math-den">L<sub>incus</sub></span>
      </div>
      <span class="math-op">&asymp;</span>
      <span class="math-sym">22.1&times;</span>
      <span class="math-sublabel" style="font-size: 0.9rem; margin-left: 0.5rem;">(+26.9 dB)</span>
    </div>
    <div class="math-rearranged-row">
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Areal Hydraulic Gain:</span>
        <div class="math-frac"><span class="math-num">55.0 mm<sup>2</sup></span><span class="math-den">3.2 mm<sup>2</sup></span></div> &asymp; 17.2&times;
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Ossicular Lever Gain:</span>
        <div class="math-frac"><span class="math-num">9.0 mm</span><span class="math-den">7.0 mm</span></div> &asymp; 1.29&times;
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Unassisted Air-Fluid Reflection:</span>
        R &asymp; 99.9% (-30 dB loss)
      </div>
    </div>
  </div>

  <div class="math-details-grid">
    <div class="math-vars-col">
      <div class="math-section-title">VARIABLE DEFINITIONS &amp; SI UNITS</div>
      <table class="math-vars-table">
        <thead>
          <tr><th>Symbol</th><th>Quantity</th><th>Value</th><th>Physical Meaning</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong class="math-sym">A<sub>tympanic</sub></strong></td>
            <td>Eardrum Area</td>
            <td><code>55.0 mm<sup>2</sup></code></td>
            <td>Effective acoustic collector area vibrating in air</td>
          </tr>
          <tr>
            <td><strong class="math-sym">A<sub>stapes</sub></strong></td>
            <td>Stapes Footplate Area</td>
            <td><code>3.2 mm<sup>2</sup></code></td>
            <td>Piston area pushing against dense cochlear perilymph</td>
          </tr>
          <tr>
            <td><strong class="math-sym">L<sub>malleus</sub></strong></td>
            <td>Malleus Arm Length</td>
            <td><code>9.0 mm</code></td>
            <td>Input lever arm driven by tympanic membrane excursion</td>
          </tr>
          <tr>
            <td><strong class="math-sym">L<sub>incus</sub></strong></td>
            <td>Incus Long Process</td>
            <td><code>7.0 mm</code></td>
            <td>Output lever arm driving the stapes capitulum</td>
          </tr>
          <tr>
            <td><strong class="math-sym">Z</strong></td>
            <td>Specific Acoustic Impedance</td>
            <td><code>Pa&middot;s/m</code></td>
            <td>Characteristic acoustic resistance of medium (Z = &rho; &times; v)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="math-physics-col">
      <div class="math-section-title">PHYSICAL RELATIONSHIP &amp; PROPORTIONALITY</div>
      <div class="math-proportionality-note">
        <strong>The Acoustic Impedance Crisis:</strong> Specific acoustic impedance is the ratio of sound pressure to particle velocity (<span class="math-sym">Z</span> = &rho; &times; <span class="math-sym">v</span>).
        <ul style="margin: 0.5rem 0 0 1rem; padding: 0;">
          <li>Air: <span class="math-sym">Z</span><sub>air</sub> &asymp; 1.21 &times; 343 &asymp; <strong>415 Pa&middot;s/m</strong>.</li>
          <li>Cochlear Fluid: <span class="math-sym">Z</span><sub>fluid</sub> &asymp; 1,000 &times; 1,480 &asymp; <strong>1,500,000 Pa&middot;s/m</strong> (3,600&times; higher!).</li>
        </ul>
        Because intensity reflection is <span class="math-sym">R</span> = <div class="math-frac"><span class="math-num">(Z<sub>2</sub> &minus; Z<sub>1</sub>)<sup>2</sup></span><span class="math-den">(Z<sub>2</sub> + Z<sub>1</sub>)<sup>2</sup></span></div>, without ossicles <strong>99.9% of sound bounces off</strong> the oval window. The middle ear bones act as an impedance-matching transformer, converting large-amplitude/low-pressure air vibrations into small-amplitude/high-pressure fluid thrust!
      </div>
    </div>
  </div>

  <div class="math-example-card">
    <div class="math-example-header">
      <span class="math-example-tag">STEP-BY-STEP BIOMECHANICAL PROOF</span>
      <strong style="color: var(--forest);">How Human Anatomy Restores +27 dB of Hearing Sensitivity</strong>
    </div>
    <div class="math-example-body">
      <div class="math-example-step">
        <span class="math-step-num">1</span>
        <div><strong>Calculate Unassisted Power Reflection Loss:</strong>
          <div class="math-step-calc">
            <span class="math-sym">R</span> = <div class="math-frac"><span class="math-num">(1,500,000 &minus; 415)<sup>2</sup></span><span class="math-den">(1,500,000 + 415)<sup>2</sup></span></div> = <div class="math-frac"><span class="math-num">(1,499,585)<sup>2</sup></span><span class="math-den">(1,500,415)<sup>2</sup></span></div> = (0.999447)<sup>2</sup> = <strong>0.9989 (99.9%)</strong>
          </div>
          Only 0.1% enters the fluid &mdash; a devastating <strong>-30 dB acoustic loss</strong>.
        </div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">2</span>
        <div><strong>Compute Combined Middle Ear Mechanical Advantage:</strong>
          <div class="math-step-calc">
            <span class="math-sym">Gain</span> = <div class="math-frac"><span class="math-num">55.0 mm<sup>2</sup></span><span class="math-den">3.2 mm<sup>2</sup></span></div> &times; <div class="math-frac"><span class="math-num">9.0 mm</span><span class="math-den">7.0 mm</span></div> = 17.188 &times; 1.286 = <strong>22.1&times; Pressure Boost</strong>
          </div>
        </div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">3</span>
        <div><strong>Convert Pressure Gain to Decibels:</strong>
          <div class="math-step-calc">
            &Delta;dB = 20 &times; log<sub>10</sub>(22.1) = 20 &times; 1.3444 = <strong>+26.9 dB</strong>
          </div>
          The middle ear nearly perfectly cancels out the 30 dB boundary reflection loss!
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

// ----------------------------------------------------------------------------
// 5. Greenwood Cochlear Tonotopic Map Card
// ----------------------------------------------------------------------------
function getGreenwoodMapMathCard() {
  return `
<div class="math-card" id="greenwoodMapMathCard">
  <div class="math-card-header">
    <span class="math-card-kicker">GRADE 11 PHYSICS &middot; BIOMECHANICAL TONOTOPY &amp; LOGARITHMIC MAPS</span>
    <h4 class="math-card-title">The Greenwood Frequency-Position Equation</h4>
    <p class="math-card-purpose">
      Computes the characteristic resonant frequency of each microscopic point along the 35 mm human basilar membrane, establishing the biomechanical foundation for cochlear implants.
    </p>
  </div>

  <div class="math-formula-box">
    <div class="math-display-eq">
      <span class="math-sym">f(x)</span>
      <span class="math-op">=</span>
      <span class="math-sym">A</span>
      <span class="math-times">&times;</span>
      <span class="math-op">(</span>
      <span class="math-sym">10</span><sup><span class="math-sym">a</span><span class="math-times">&middot;</span><span class="math-sym">x</span></sup>
      <span class="math-op">&minus;</span>
      <span class="math-sym">k</span>
      <span class="math-op">)</span>
    </div>
    <div class="math-rearranged-row">
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Human Calibration:</span>
        <span class="math-sym">f(x)</span> = 165.4 &times; (10<sup>0.060 &middot; x</sup> &minus; 0.88)
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Inverse Map (Position from Pitch):</span>
        <span class="math-sym">x(f)</span> = <div class="math-frac"><span class="math-num">1</span><span class="math-den">0.060</span></div> &times; log<sub>10</sub><div class="math-frac"><span class="math-num">f</span><span class="math-den">165.4</span></div> + 0.88
      </div>
    </div>
  </div>

  <div class="math-details-grid">
    <div class="math-vars-col">
      <div class="math-section-title">VARIABLE DEFINITIONS &amp; SI UNITS</div>
      <table class="math-vars-table">
        <thead>
          <tr><th>Symbol</th><th>Quantity</th><th>Standard Human Value</th><th>Physical Meaning</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong class="math-sym">x</strong></td>
            <td>Basilar Distance</td>
            <td><code>0 to 35 mm</code></td>
            <td>Metric distance along the uncoiled cochlea from apex (0 mm) to base (35 mm)</td>
          </tr>
          <tr>
            <td><strong class="math-sym">f(x)</strong></td>
            <td>Resonant Frequency</td>
            <td><code>Hz (20 to 20,000 Hz)</code></td>
            <td>Acoustic pitch exciting maximum traveling wave basilar excursion at x</td>
          </tr>
          <tr>
            <td><strong class="math-sym">A</strong></td>
            <td>Scaling Constant</td>
            <td><code>165.4 Hz</code></td>
            <td>Empirical human frequency scale factor (Greenwood, 1990)</td>
          </tr>
          <tr>
            <td><strong class="math-sym">a</strong></td>
            <td>Stiffness Slope</td>
            <td><code>0.060 mm<sup>-1</sup></code></td>
            <td>Exponential gradient of basilar membrane stiffness per millimeter</td>
          </tr>
          <tr>
            <td><strong class="math-sym">k</strong></td>
            <td>Low-End Offset</td>
            <td><code>0.88</code></td>
            <td>Integration constant setting low-frequency human cutoff (~20 Hz at apex)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="math-physics-col">
      <div class="math-section-title">PHYSICAL RELATIONSHIP &amp; PROPORTIONALITY</div>
      <div class="math-proportionality-note">
        <strong>Exponential Stiffness Gradient:</strong> The basilar membrane is not uniform.
        <ul style="margin: 0.5rem 0 0 1rem; padding: 0;">
          <li>At the basal entrance (near the oval window), the membrane is narrow (0.1 mm) and extremely stiff.</li>
          <li>At the apical tip, the membrane is 5 times wider (0.5 mm) and ~100 times more flexible.</li>
        </ul>
        Because mechanical resonance scales as <span class="math-sym">f</span> &prop; <div class="math-sqrt-wrap"><span class="math-sqrt-sym">&radic;</span><div class="math-sqrt-radicand"><div class="math-frac"><span class="math-num">K</span><span class="math-den">M</span></div></div></div>, characteristic frequency drops exponentially with distance.
        <strong>Musical Pitch Linearity:</strong> Each musical octave occupies roughly 3.5 mm of basilar membrane length across the entire cochlea!
      </div>
    </div>
  </div>

  <div class="math-example-card">
    <div class="math-example-header">
      <span class="math-example-tag">THREE-POINT AUDITORY BENCHMARK</span>
      <strong style="color: var(--forest);">Verifying Apex, Speech Band, and Basal Extremes</strong>
    </div>
    <div class="math-example-body">
      <div class="math-example-step">
        <span class="math-step-num">1</span>
        <div><strong>Apical Resonance (x = 0 mm, Deep Cochlear Tip):</strong>
          <div class="math-step-calc">
            <span class="math-sym">f(0)</span> = 165.4 &times; (10<sup>0</sup> &minus; 0.88) = 165.4 &times; (1.00 &minus; 0.88) = 165.4 &times; 0.12 = <strong>19.8 Hz &asymp; 20 Hz</strong> (threshold of human hearing)
          </div>
        </div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">2</span>
        <div><strong>Mid-Cochlea Resonance (x = 17.5 mm, Vowel Formants):</strong>
          <div class="math-step-calc">
            <span class="math-sym">f(17.5)</span> = 165.4 &times; (10<sup>0.060 &times; 17.5</sup> &minus; 0.88) = 165.4 &times; (10<sup>1.05</sup> &minus; 0.88) = 165.4 &times; (11.22 &minus; 0.88) = <strong>1,710 Hz</strong> (speech formant range)
          </div>
        </div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">3</span>
        <div><strong>Basal Entrance (x = 35.0 mm, Stapes Interface):</strong>
          <div class="math-step-calc">
            <span class="math-sym">f(35)</span> = 165.4 &times; (10<sup>0.060 &times; 35</sup> &minus; 0.88) = 165.4 &times; (10<sup>2.10</sup> &minus; 0.88) = 165.4 &times; (125.89 &minus; 0.88) = <strong>20,677 Hz &asymp; 20 kHz</strong> (ultrasound threshold)
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

// ----------------------------------------------------------------------------
// 6. Shannon-Hartley Information Rate & Vocoder Synthesis Card
// ----------------------------------------------------------------------------
function getVocoderCapacityMathCard() {
  return `
<div class="math-card" id="vocoderCapacityMathCard">
  <div class="math-card-header">
    <span class="math-card-kicker">GRADE 11 PHYSICS &middot; INFORMATION THEORY &amp; DIGITAL SIGNAL PROCESSING</span>
    <h4 class="math-card-title">Channel Vocoder Synthesis &amp; Shannon Channel Capacity</h4>
    <p class="math-card-purpose">
      Defines the mathematical summation used by cochlear neuroprosthetics to reconstruct acoustic speech and the theoretical information capacity of degraded neural channels.
    </p>
  </div>

  <div class="math-formula-box">
    <div class="math-display-eq">
      <span class="math-sym">s</span><sub>vocoded</sub><span class="math-sym">(t)</span>
      <span class="math-op">=</span>
      <span style="font-size: 1.5em; font-family: serif; vertical-align: middle;">&sum;</span><sub>k=1</sub><sup>N</sup>
      <span class="math-op">[</span>
      <span class="math-sym">Env</span><sub>k</sub><span class="math-sym">(t)</span>
      <span class="math-times">&times;</span>
      <span class="math-sym">Carrier</span><sub>k</sub><span class="math-sym">(t)</span>
      <span class="math-op">]</span>
    </div>
    <div class="math-rearranged-row">
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Shannon Capacity:</span>
        <span class="math-sym">C</span>
        <span class="math-op">=</span>
        <span class="math-sym">B</span>
        <span class="math-times">&times;</span>
        <span class="math-sym">log</span><sub>2</sub>
        <span class="math-op">(</span>
        <span class="math-sym">1</span>
        <span class="math-op">+</span>
        <div class="math-frac"><span class="math-num">S</span><span class="math-den">N</span></div>
        <span class="math-op">)</span>
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Envelope Extraction:</span>
        <span class="math-sym">Env</span><sub>k</sub>(t) = LPF<sub>160 Hz</sub>(&#124;x<sub>k</sub>(t)&#124;)
      </div>
      <div class="math-rearranged-pill">
        <span class="math-sublabel">Electrode Count:</span>
        N = 8 to 22 physical channels
      </div>
    </div>
  </div>

  <div class="math-details-grid">
    <div class="math-vars-col">
      <div class="math-section-title">VARIABLE DEFINITIONS &amp; SI UNITS</div>
      <table class="math-vars-table">
        <thead>
          <tr><th>Symbol</th><th>Quantity</th><th>SI Unit</th><th>Physical Meaning</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong class="math-sym">C</strong></td>
            <td>Channel Capacity</td>
            <td><code>bits/s</code></td>
            <td>Maximum theoretical error-free information rate through channel</td>
          </tr>
          <tr>
            <td><strong class="math-sym">B</strong></td>
            <td>Acoustic Bandwidth</td>
            <td><code>Hz</code></td>
            <td>Frequency span of each discrete bandpass filter</td>
          </tr>
          <tr>
            <td><strong class="math-sym">S / N</strong></td>
            <td>Signal-to-Noise Ratio</td>
            <td><code>dimensionless</code></td>
            <td>Ratio of neural signal power to background electrical crosstalk noise</td>
          </tr>
          <tr>
            <td><strong class="math-sym">Env<sub>k</sub>(t)</strong></td>
            <td>Temporal Envelope</td>
            <td><code>dimensionless</code></td>
            <td>Slowly varying amplitude modulation (f<sub>c</sub> &le; 160 Hz) carrying syllable rhythm</td>
          </tr>
          <tr>
            <td><strong class="math-sym">Carrier<sub>k</sub>(t)</strong></td>
            <td>Carrier Signal</td>
            <td><code>acoustic wave</code></td>
            <td>Bandpassed acoustic noise or biphasic electrical pulse train for channel k</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="math-physics-col">
      <div class="math-section-title">PHYSICAL RELATIONSHIP &amp; PROPORTIONALITY</div>
      <div class="math-proportionality-note">
        <strong>Envelope vs. Fine Structure:</strong> Spoken language comprehension relies overwhelmingly on low-frequency temporal envelopes (&le; 50 Hz rhythm, &le; 160 Hz voicing cues) across 8 to 12 distinct spectral channels.
        <ul style="margin: 0.5rem 0 0 1rem; padding: 0;">
          <li>Because speech redundancy is so vast, 12 to 16 cochlear implant channels deliver more than enough Shannon capacity (&gt; 20 kbps) for <strong>&gt; 80% sentence recognition in quiet</strong>.</li>
          <li>In contrast, musical harmony and pitch timbre demand microsecond-accurate acoustic fine structure (&gt; 500 Hz phase locking) across hundreds of points, which discrete current pulses cannot yet replicate.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="math-example-card">
    <div class="math-example-header">
      <span class="math-example-tag">INFORMATION THEORY CALCULATION</span>
      <strong style="color: var(--forest);">Quantifying Neural Information Flow Through an Electrode Array</strong>
    </div>
    <div class="math-example-body">
      <div class="math-example-step">
        <span class="math-step-num">1</span>
        <div><strong>Channel Parameters:</strong> Bandwidth <span class="math-sym">B</span> = 300 Hz per electrode, Signal-to-Noise ratio <span class="math-sym">S/N</span> = 31 (equivalent to +15 dB electrical SNR). Target: calculate single-channel capacity.</div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">2</span>
        <div><strong>Apply Shannon-Hartley Theorem:</strong>
          <div class="math-step-calc">
            <span class="math-sym">C</span> = 300 &times; log<sub>2</sub>(1 + 31) = 300 &times; log<sub>2</sub>(32) = 300 &times; 5 = <strong>1,500 bits/s</strong>
          </div>
        </div>
      </div>
      <div class="math-example-step">
        <span class="math-step-num">3</span>
        <div><strong>Aggregate 16-Electrode Neuroprosthetic Array Bandwidth:</strong>
          <div class="math-step-calc">
            <span class="math-sym">C</span><sub>total</sub> = 16 &times; 1,500 bits/s = <strong>24,000 bits/s (24 kbps)</strong>
          </div>
          This 24 kbps information pipe exceeds the 100-200 bps linguistic entropy of conversational speech by two orders of magnitude, making fluent spoken dialogue possible!
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

module.exports = {
  mathAndSimCss,
  getWaveSpeedMathCard,
  getSoundSpeedMediumMathCard,
  getHarmonicWaveParamsMathCard,
  getMiddleEarImpedanceMathCard,
  getGreenwoodMapMathCard,
  getVocoderCapacityMathCard
};
