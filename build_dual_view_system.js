// build_dual_view_system.js
// Generates both Animated Views and Scientific Illustrations for all 5 major scientific diagrams
const fs = require('fs');

console.log('Preparing Dual-View Scientific Diagram System...');

// ----------------------------------------------------------------------------
// 1. DUAL-VIEW CSS EXTENSION
// ----------------------------------------------------------------------------
const dualViewCss = `
/* ==========================================================================
   DUAL-VIEW SCIENTIFIC DIAGRAM SYSTEM (Animated View vs Scientific Illustration)
   ========================================================================== */
.diagram-dual-wrapper {
  margin: 2.25rem 0;
  width: 100%;
}

.diagram-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding: 0.95rem 1.4rem;
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 4px rgba(0,0,0,0.02);
}

.diagram-header-meta {
  display: flex;
  flex-direction: column;
}

.diagram-header-kicker {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--forest);
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.diagram-header-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--charcoal);
  margin: 0;
}

.view-toggle-group {
  display: inline-flex;
  align-items: center;
  background-color: var(--ivory);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  padding: 3px;
  gap: 4px;
}

.view-toggle-btn {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.45rem 1.15rem;
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  background: transparent;
  color: var(--charcoal-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  line-height: 1.2;
  text-decoration: none;
}

.view-toggle-btn:hover {
  color: var(--charcoal);
  background-color: var(--stone);
}

.view-toggle-btn.active {
  background-color: var(--forest);
  color: var(--white);
  border-color: var(--forest);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.view-toggle-icon {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: var(--radius-full);
  background-color: currentColor;
}

.diagram-view-container {
  position: relative;
  width: 100%;
}

.diagram-view {
  width: 100%;
  animation: fadeInView 0.25s ease forwards;
}

.diagram-view.hidden {
  display: none !important;
}

@keyframes fadeInView {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Keyframe Animations for Animated Views (Zero Gradients, 100% Solid Colors) */
@keyframes acousticWavePulse {
  0% { transform: translateX(0); opacity: 0; }
  30% { opacity: 0.9; }
  100% { transform: translateX(110px); opacity: 0; }
}

@keyframes eardrumVibe {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(1.18) translateX(2px); }
}

@keyframes ossicleLeverRock {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(2.4deg); }
}

@keyframes stapesPistonStroke {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(3px); }
}

@keyframes cochleaFluidRipple {
  0% { stroke-dashoffset: 40; }
  100% { stroke-dashoffset: 0; }
}

@keyframes nerveActionPotential {
  0% { stroke-dashoffset: 30; opacity: 0.3; }
  50% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0.3; }
}

@keyframes liveOscilloscopeSine {
  0% { stroke-dashoffset: 160; }
  100% { stroke-dashoffset: 0; }
}

@keyframes ionStreamFlow {
  0% { stroke-dashoffset: 24; opacity: 0.2; }
  50% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0.2; }
}

@keyframes rfInductionPulse {
  0% { r: 8; opacity: 0.9; }
  100% { r: 38; opacity: 0; }
}

@keyframes electrodeFlashSequence {
  0%, 100% { fill: var(--white); stroke: var(--forest); }
  50% { fill: var(--clay); stroke: var(--clay); }
}

@media (max-width: 768px) {
  .diagram-header-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .view-toggle-group {
    width: 100%;
    display: flex;
  }
  .view-toggle-btn {
    flex: 1;
    justify-content: center;
    text-align: center;
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
}
`;

console.log('CSS rules prepared.');
module.exports = {
  dualViewCss
};
