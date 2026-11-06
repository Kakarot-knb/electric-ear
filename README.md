# RESONANCE — Beyond What We Hear
### How Technology Helps People Hear Again

An interactive physics and bioacoustics exhibition exploring sound waves, the human ear, hearing loss, hearing aids, and cochlear implants with a live wave simulator.

---

## ✨ Features

- **Live Acoustic Wave & Particle Simulator:** Real-time canvas simulation showing air compression waves, longitudinal particle displacement, frequency, wavelength, amplitude, and medium presets (Air, Water, Steel, Custom).
- **Interactive Auditory Pathway:** Multi-stage breakdown from the outer pinna, tympanic membrane, ossicles, fluid cochlea, to electrical auditory nerve impulses.
- **Hearing Loss Diagnostic & Hair Cell Explorer:** Visual organ of Corti modeling stereocilia damage across mild, moderate, severe, and profound sensorineural hearing loss.
- **Hearing Aids vs Cochlear Implants:** In-depth technical comparison, component anatomy, energy transformation chains, and multi-generation processor evolution.
- **Interactive Dual-View Diagrams:** Animated motion view and high-fidelity scientific illustrations.
- **Offline & Self-Contained:** High-resolution assets and imagery stored locally in `/assets/images/` for zero hotlink blocking and fast offline capability.
- **Fully Pre-rendered SSR + React Hydration:** Ultra-fast load times with interactive client-side React hydration and zero console errors.

---

## 🚀 Quick Start

### 1. Run Locally
To start the local web server:
```bash
npm start
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### 2. Run Automated Verification Tests
To run the automated suite testing HTML integrity, assets, and HTTP responses:
```bash
npm test
```

### 3. Build & Sync for Production / Vercel
To sync assets and prepare the `public/` directory:
```bash
npm run build
```

---

## 📁 Project Structure

```
├── index.html                 # Main website entry point (SSR pre-rendered + hydrated)
├── assets/
│   ├── styles-DeJe8TIu.css    # Full application stylesheets & Tailwind layout
│   ├── index-Bc0M62SV.js      # Core React & routing runtime
│   ├── routes-DHy1J_uN.js     # Interactive components, canvas simulator & pages
│   └── images/                # High-resolution local image assets
├── public/                    # Production output directory (synced for Vercel/Netlify)
├── server.js                  # Lightweight local preview HTTP server
├── process_clone.js           # Production build & asset sync script
├── test_clone.js              # Automated verification test script
├── package.json               # Scripts and metadata
└── vercel.json                # Vercel deployment configuration
```

---

## 📄 License
MIT
