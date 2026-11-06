# RESONANCE — Hear What an Implant Hears

A visual-first bioacoustic and neuroprosthetics research exhibition exploring human auditory biomechanics and cochlear implant signal processing.

## Overview

RESONANCE is an interactive, single-page educational application designed for Grade 11 Physics students and enthusiasts. It models the human auditory system as a multi-stage physical transducer and demonstrates how neuroprosthetics restore hearing to individuals with sensorineural deafness.

Key capabilities include:
- Zero-latency Acoustic Wave & Longitudinal Particle Simulator with bidirectional frequency and wavelength synchronization.
- Real-time mathematical telemetry HUD displaying wave speed, frequency, wavelength, period, angular frequency, wavenumber, and sound pressure level.
- Dual-View Scientific Diagrams allowing visitors to toggle between motion graphics animations and detailed anatomical illustrations.
- Clinical hearing loss simulations comparing healthy audition, conductive attenuation, sensorineural hair cell damage, and cochlear neuroprosthetic vocoding.
- Interactive Basilar Membrane Analyzer mapping frequency to tonotopic basilar position using Greenwood's equation.
- Shannon Channel Capacity calculations and continuous channel vocoder audio synthesis powered by Web Audio API DSP.

## Architecture

- **Format:** Fully self-contained single-page application (`index.html`) with zero backend dependencies and zero paid services.
- **Visual Aesthetic:** Premium scientific editorial journal palette with warm ivory paper, muted forest green, terracotta clay, and soft sage accents. Zero gradients, 100% solid colors.
- **Audio DSP:** Web Audio API synthesis and real-time Fast Fourier Transform (FFT) analysis.

## Getting Started

### Local Development
To run the verification suite and verify all interactive components:
```bash
node verify_complete_site.js
```

To build or recompile `index.html`:
```bash
node build_full_site.js
```

To serve locally:
```bash
npx serve .
```
or open `index.html` directly in any modern web browser.

## License
MIT
