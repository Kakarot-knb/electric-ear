// upgraded_wave_studio.js - Instant Responsive Acoustic Wave & Particle Simulator
// Zero unnecessary latency, 60fps physics simulation, bidirectional sliders, and real-time HUD telemetry.
// ZERO emojis, ZERO gradients.

const upgradedWaveStudioCode = `function initWaveStudio() {
  const freqSlider = document.getElementById('waveFreqSlider');
  const freqVal = document.getElementById('waveFreqVal');
  const lambdaSlider = document.getElementById('waveLambdaSlider');
  const lambdaVal = document.getElementById('waveLambdaVal');
  const ampSlider = document.getElementById('waveAmpSlider');
  const ampVal = document.getElementById('waveAmpVal');
  const periodReadout = document.getElementById('wavePeriodReadout');
  const tracerDispReadout = document.getElementById('tracerDispReadout');
  const btnToggleTone = document.getElementById('btnToggleTone');
  const btnToggleMic = document.getElementById('btnToggleMic');
  const particleCanvas = document.getElementById('waveParticleCanvas');
  const oscCanvas = document.getElementById('oscilloscopeCanvas');
  const specCanvas = document.getElementById('spectrogramCanvas');

  // Unified Physical Simulation State
  const simState = {
    freq: 440,
    amp: 50,
    speed: 343,
    mediumName: 'Air (20°C)',
    timeDiv: 1.0,
    scale: 1.0,
    phase: 0,
    tracerDisplacement: 0
  };

  function updateTelemetry() {
    const f = simState.freq;
    const a = simState.amp;
    const v = simState.speed;
    const lambda = v / f;
    const lambdaCm = lambda * 100;
    const periodMs = 1000 / f;
    const omega = 2 * Math.PI * f;
    const k = (2 * Math.PI) / lambda;
    const pPeak = (a / 100) * 0.1;
    const pRms = pPeak / Math.SQRT2;
    const spl = pRms > 0 ? (20 * Math.log10(pRms / 20e-6)).toFixed(1) : '0.0';
    const dBFS = a > 0 ? (20 * Math.log10(a / 100)).toFixed(1) : '-inf';

    if (freqVal) freqVal.textContent = f.toFixed(0) + ' Hz';
    if (lambdaVal) lambdaVal.textContent = (lambda < 1 ? lambdaCm.toFixed(1) + ' cm' : lambda.toFixed(3) + ' m') + ' (' + lambdaCm.toFixed(1) + ' cm)';
    if (ampVal) ampVal.textContent = a.toFixed(0) + '% (' + dBFS + ' dBFS \u00B7 ' + spl + ' dB SPL)';
    if (periodReadout) periodReadout.textContent = 'T = ' + periodMs.toFixed(2) + ' ms \u00B7 \u03BB = ' + lambdaCm.toFixed(1) + ' cm \u00B7 v = ' + v.toFixed(0) + ' m/s';

    const elSpeed = document.getElementById('simSpeedVal');
    const elFreq = document.getElementById('simFreqVal');
    const elLambda = document.getElementById('simLambdaVal');
    const elPeriod = document.getElementById('simPeriodVal');
    const elOmega = document.getElementById('simOmegaVal');
    const elK = document.getElementById('simKVal');
    const elSpl = document.getElementById('simSplVal');

    if (elSpeed) elSpeed.textContent = v.toFixed(1) + ' m/s';
    if (elFreq) elFreq.textContent = f.toFixed(0) + ' Hz';
    if (elLambda) elLambda.textContent = lambda < 1 ? (lambdaCm.toFixed(1) + ' cm') : (lambda.toFixed(3) + ' m');
    if (elPeriod) elPeriod.textContent = periodMs.toFixed(2) + ' ms';
    if (elOmega) elOmega.textContent = omega.toFixed(1) + ' rad/s';
    if (elK) elK.textContent = k.toFixed(2) + ' rad/m';
    if (elSpl) elSpl.textContent = spl + ' dB SPL (' + (pPeak * 1000).toFixed(1) + ' mPa)';
  }

  function updateAudioTone() {
    if (toneOscNode && isTonePlaying) {
      try {
        const ctx = getAudioContext();
        toneOscNode.frequency.setValueAtTime(simState.freq, ctx.currentTime);
        const gainVal = (simState.amp / 100) * 0.25;
        toneGainNode.gain.setValueAtTime(gainVal, ctx.currentTime);
      } catch (e) {}
    }
  }

  function onFrequencyChange(newFreq, syncLambda = true) {
    simState.freq = Math.max(50, Math.min(2000, newFreq));
    const lambda = simState.speed / simState.freq;
    if (syncLambda && lambdaSlider) {
      lambdaSlider.value = lambda.toFixed(3);
    }
    updateTelemetry();
    updateAudioTone();
  }

  function onLambdaChange(newLambda, syncFreq = true) {
    const lam = Math.max(0.17, Math.min(6.86, newLambda));
    simState.freq = Math.max(50, Math.min(2000, Math.round(simState.speed / lam)));
    if (syncFreq && freqSlider) {
      freqSlider.value = simState.freq;
    }
    updateTelemetry();
    updateAudioTone();
  }

  // Instant input event listeners (zero delay)
  if (freqSlider) {
    freqSlider.addEventListener('input', (e) => onFrequencyChange(parseFloat(e.target.value), true));
  }
  if (lambdaSlider) {
    lambdaSlider.addEventListener('input', (e) => onLambdaChange(parseFloat(e.target.value), true));
  }
  if (ampSlider) {
    ampSlider.addEventListener('input', (e) => {
      simState.amp = parseFloat(e.target.value);
      updateTelemetry();
      updateAudioTone();
    });
  }

  // Preset buttons
  document.querySelectorAll('.wave-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wave-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (freqSlider) freqSlider.value = btn.dataset.freq;
      onFrequencyChange(parseFloat(btn.dataset.freq), true);
    });
  });

  // Medium selector buttons
  document.querySelectorAll('.sim-medium-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sim-medium-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      simState.speed = parseFloat(btn.dataset.speed);
      simState.mediumName = btn.dataset.medium || 'Air';
      onFrequencyChange(simState.freq, true);
    });
  });

  // Time-base buttons
  document.querySelectorAll('.sim-timebase-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sim-timebase-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      simState.timeDiv = parseFloat(btn.dataset.timediv) || 1.0;
    });
  });

  // Scale buttons
  document.querySelectorAll('.sim-scale-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sim-scale-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      simState.scale = parseFloat(btn.dataset.scale) || 1.0;
    });
  });

  // Tone toggle
  if (btnToggleTone) {
    btnToggleTone.addEventListener('click', () => {
      const ctx = getAudioContext();
      if (!isTonePlaying) {
        toneOscNode = ctx.createOscillator();
        toneGainNode = ctx.createGain();
        
        const isHarmonic = document.getElementById('waveTypeHarmonic') && document.getElementById('waveTypeHarmonic').checked;
        if (isHarmonic) {
          const real = new Float32Array([0, 1.0, 0.6, 0.4, 0.25, 0.15]);
          const imag = new Float32Array(real.length);
          const wave = ctx.createPeriodicWave(real, imag);
          toneOscNode.setPeriodicWave(wave);
        } else {
          toneOscNode.type = 'sine';
        }

        toneOscNode.frequency.setValueAtTime(simState.freq, ctx.currentTime);
        toneGainNode.gain.setValueAtTime((simState.amp / 100) * 0.25, ctx.currentTime);
        toneOscNode.connect(toneGainNode);
        toneGainNode.connect(ctx.destination);
        toneOscNode.start();
        isTonePlaying = true;
        btnToggleTone.textContent = 'Mute Acoustic Tone';
        btnToggleTone.classList.add('btn-clay');
        btnToggleTone.classList.remove('btn-forest');
      } else {
        if (toneOscNode) {
          try {
            toneOscNode.stop();
            toneOscNode.disconnect();
          } catch(e) {}
        }
        isTonePlaying = false;
        btnToggleTone.textContent = 'Play Acoustic Tone';
        btnToggleTone.classList.remove('btn-clay');
        btnToggleTone.classList.add('btn-forest');
      }
    });
  }

  // Mic toggle
  if (btnToggleMic) {
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
          if (statusText) statusText.textContent = 'Microphone: Active (Capturing Audio)';
          if (fallbackMsg) fallbackMsg.style.display = 'none';
        } catch (err) {
          console.warn('Microphone access denied or unavailable', err);
          if (fallbackMsg) fallbackMsg.style.display = 'block';
          if (statusText) statusText.textContent = 'Microphone: Unavailable (Fallback Mode)';
        }
      } else {
        if (micStream) {
          try {
            micStream.getTracks().forEach(t => t.stop());
          } catch(e) {}
        }
        isMicActive = false;
        btnToggleMic.textContent = 'Start Microphone Live FFT';
        btnToggleMic.classList.remove('btn-clay');
        if (statusText) statusText.textContent = 'Microphone: Standby';
      }
    });
  }

  // Canvases
  const pCtx = particleCanvas && particleCanvas.getContext ? particleCanvas.getContext('2d') : null;
  const oscCtx = oscCanvas && oscCanvas.getContext ? oscCanvas.getContext('2d') : null;
  const specCtx = specCanvas && specCanvas.getContext ? specCanvas.getContext('2d') : null;

  function renderSimulationFrame() {
    const phaseInc = (simState.freq / 440) * 0.08;
    simState.phase += phaseInc;

    // 1. Longitudinal Particle Canvas
    if (particleCanvas && pCtx) {
      const w = particleCanvas.width = particleCanvas.parentElement ? particleCanvas.parentElement.clientWidth : 800;
      const h = particleCanvas.height = 120;

      pCtx.fillStyle = '#F8F7F2';
      pCtx.fillRect(0, 0, w, h);

      pCtx.strokeStyle = '#D8D4C9';
      pCtx.lineWidth = 1.5;
      pCtx.beginPath();
      pCtx.moveTo(0, 15); pCtx.lineTo(w, 15);
      pCtx.moveTo(0, h - 15); pCtx.lineTo(w, h - 15);
      pCtx.stroke();

      const spatialCycles = (simState.freq / 400) * (w / 380) * (343 / simState.speed) * simState.timeDiv;
      const kDraw = (spatialCycles * 2 * Math.PI) / w;
      const maxDisp = 18 * (simState.amp / 100) * simState.scale;

      const numCols = 64;
      const numRows = 7;
      const tracerCol = Math.floor(numCols / 2);
      const tracerRow = 3;
      let tracerCurrentX = 0;
      let tracerRestX = 0;

      for (let j = 0; j < numRows; j++) {
        const yRest = 22 + (j / (numRows - 1)) * (h - 44);
        for (let i = 0; i < numCols; i++) {
          const xRest = ((i + 0.5) / numCols) * w;
          const yJitter = Math.sin(i * 12.3 + j * 7.7) * 2.2;
          const y = yRest + yJitter;

          const disp = maxDisp * Math.cos(kDraw * xRest - simState.phase);
          const x = xRest + disp;

          const isTracer = (i === tracerCol && j === tracerRow);
          if (isTracer) {
            tracerRestX = xRest;
            tracerCurrentX = x;
            simState.tracerDisplacement = disp;
          } else {
            pCtx.fillStyle = '#345B50';
            pCtx.beginPath();
            pCtx.arc(x, y, 2.2, 0, 2 * Math.PI);
            pCtx.fill();
          }
        }
      }

      // Tracer Particle
      if (tracerCurrentX > 0) {
        pCtx.strokeStyle = '#C9805F';
        pCtx.lineWidth = 1;
        pCtx.setLineDash([3, 3]);
        pCtx.beginPath();
        pCtx.moveTo(tracerRestX, 16);
        pCtx.lineTo(tracerRestX, h - 16);
        pCtx.stroke();
        pCtx.setLineDash([]);

        pCtx.fillStyle = '#C9805F';
        pCtx.beginPath();
        pCtx.arc(tracerCurrentX, 22 + (tracerRow / (numRows - 1)) * (h - 44), 5.5, 0, 2 * Math.PI);
        pCtx.fill();
        pCtx.fillStyle = '#FFFFFF';
        pCtx.beginPath();
        pCtx.arc(tracerCurrentX, 22 + (tracerRow / (numRows - 1)) * (h - 44), 2.2, 0, 2 * Math.PI);
        pCtx.fill();

        if (tracerDispReadout) {
          const micrDisp = ((simState.tracerDisplacement / (maxDisp || 1)) * 5.0).toFixed(1);
          tracerDispReadout.textContent = (simState.tracerDisplacement >= 0 ? '+' : '') + micrDisp + ' \u03BCm (SHM in place)';
        }
      }

      if (pCtx.fillText) {
        pCtx.font = '600 9px "JetBrains Mono", monospace';
        for (let xCheck = 60; xCheck < w - 60; xCheck += 140) {
          const phaseVal = kDraw * xCheck - simState.phase;
          const normAngle = ((phaseVal % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          if (Math.abs(normAngle - Math.PI / 2) < 0.35) {
            pCtx.fillStyle = '#345B50';
            pCtx.fillText('COMPRESSION (+P)', xCheck - 40, 11);
          } else if (Math.abs(normAngle - 3 * Math.PI / 2) < 0.35) {
            pCtx.fillStyle = '#5A6260';
            pCtx.fillText('RAREFACTION (-P)', xCheck - 40, 11);
          }
        }
      }
    }

    // 2. Transverse Pressure Oscilloscope Canvas
    if (oscCanvas && oscCtx) {
      const w = oscCanvas.width = oscCanvas.parentElement ? oscCanvas.parentElement.clientWidth : 800;
      const h = oscCanvas.height = 110;

      oscCtx.fillStyle = '#F8F7F2';
      oscCtx.fillRect(0, 0, w, h);

      oscCtx.strokeStyle = '#D8D4C9';
      oscCtx.lineWidth = 1;
      oscCtx.setLineDash([2, 2]);
      oscCtx.beginPath();
      oscCtx.moveTo(0, h / 2); oscCtx.lineTo(w, h / 2);
      for (let x = 60; x < w; x += 60) {
        oscCtx.moveTo(x, 0); oscCtx.lineTo(x, h);
      }
      oscCtx.stroke();
      oscCtx.setLineDash([]);

      if (oscCtx.fillText) {
        oscCtx.fillStyle = '#5A6260';
        oscCtx.font = '9px "JetBrains Mono", monospace';
        const divLabel = (simState.timeDiv * 1.0).toFixed(1) + ' ms/div';
        oscCtx.fillText('0.0 ms', 6, h / 2 - 4);
        oscCtx.fillText(divLabel, 66, h / 2 - 4);
      }

      const isHarmonic = document.getElementById('waveTypeHarmonic') && document.getElementById('waveTypeHarmonic').checked;
      const spatialCycles = (simState.freq / 400) * (w / 380) * (343 / simState.speed) * simState.timeDiv;
      const ampMult = (simState.amp / 100) * simState.scale;

      oscCtx.strokeStyle = '#345B50';
      oscCtx.lineWidth = 2.4;
      oscCtx.beginPath();

      for (let x = 0; x < w; x++) {
        const angle = (x / w) * spatialCycles * 2 * Math.PI - simState.phase + (Math.PI / 2);
        let val = Math.sin(angle);
        if (isHarmonic) {
          val = 0.7 * Math.sin(angle) + 0.3 * Math.sin(2 * angle) + 0.15 * Math.sin(3 * angle);
        }
        const y = h / 2 - val * ampMult * (h * 0.38);
        if (x === 0) oscCtx.moveTo(x, y);
        else oscCtx.lineTo(x, y);
      }
      oscCtx.stroke();
    }

    requestAnimationFrame(renderSimulationFrame);
  }

  renderSimulationFrame();

  // 3. Real-Time Spectrogram Waterfall Loop
  const waterfallHistory = [];
  function renderSpectrogramWaterfall() {
    if (specCanvas && specCtx) {
      const w = specCanvas.width = specCanvas.parentElement ? specCanvas.parentElement.clientWidth : 800;
      const h = specCanvas.height = 110;

      let bins = new Uint8Array(128);
      if (isMicActive && micAnalyser) {
        const freqData = new Uint8Array(micAnalyser.frequencyBinCount);
        micAnalyser.getByteFrequencyData(freqData);
        for (let i = 0; i < 128; i++) {
          bins[i] = freqData[i];
        }
      } else {
        const f = simState.freq;
        const amp = simState.amp / 100;
        const isHarmonic = document.getElementById('waveTypeHarmonic') && document.getElementById('waveTypeHarmonic').checked;
        const targetBin = Math.min(127, Math.floor((f / 4000) * 128));

        for (let i = 0; i < 128; i++) {
          let energy = 0;
          if (isTonePlaying) {
            const dist0 = Math.abs(i - targetBin);
            energy += 255 * amp * Math.exp(-dist0 * 0.5);
            if (isHarmonic) {
              const bin2 = Math.min(127, targetBin * 2);
              const bin3 = Math.min(127, targetBin * 3);
              energy += 160 * amp * Math.exp(-Math.abs(i - bin2) * 0.6);
              energy += 90 * amp * Math.exp(-Math.abs(i - bin3) * 0.7);
            }
          }
          bins[i] = Math.min(255, Math.floor(energy + Math.random() * 12));
        }
      }

      waterfallHistory.unshift(bins);
      if (waterfallHistory.length > h) waterfallHistory.pop();

      specCtx.fillStyle = '#F8F7F2';
      specCtx.fillRect(0, 0, w, h);

      const binWidth = w / 128;
      for (let row = 0; row < waterfallHistory.length; row++) {
        const rowBins = waterfallHistory[row];
        for (let col = 0; col < 128; col++) {
          const v = rowBins[col] / 255;
          if (v > 0.05) {
            if (v > 0.65) {
              specCtx.fillStyle = '#C9805F';
            } else if (v > 0.3) {
              specCtx.fillStyle = '#345B50';
            } else {
              specCtx.fillStyle = '#8EAAA5';
            }
            specCtx.fillRect(col * binWidth, row, binWidth + 0.5, 1.2);
          }
        }
      }
    }
    requestAnimationFrame(renderSpectrogramWaterfall);
  }

  renderSpectrogramWaterfall();

  // Initial calculation
  updateTelemetry();
}`;

module.exports = {
  upgradedWaveStudioCode
};
