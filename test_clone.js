const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function runTests() {
  console.log('--- RUNNING RESONANCE CLONE TESTS ---');

  // 1. Check index.html
  if (!fs.existsSync('index.html')) {
    throw new Error('index.html missing!');
  }
  const html = fs.readFileSync('index.html', 'utf8');
  const sections = ['top', 'sound', 'simulator', 'hearing', 'loss', 'aids', 'implants', 'physics', 'compare', 'future', 'sources'];
  for (const s of sections) {
    if (!html.includes(`id="${s}"`)) {
      throw new Error(`Section id="${s}" missing from index.html!`);
    }
  }
  console.log('✓ All 11 main sections present in index.html');

  // 2. Check assets
  const requiredAssets = [
    'assets/styles-DeJe8TIu.css',
    'assets/index-Bc0M62SV.js',
    'assets/routes-DHy1J_uN.js',
    'assets/images/organ_of_corti.png',
    'assets/images/digital_bte.jpg',
    'assets/images/oticon_ric.jpg',
    'assets/images/vintage_beltone.jpg',
    'assets/images/cochlear_implant_user1.jpg',
    'assets/images/cochlear_implant_user.jpg',
    'assets/images/four_generations.jpg',
    'assets/images/audiologist.jpg',
    'assets/images/oticon_recharger.jpg'
  ];
  for (const a of requiredAssets) {
    if (!fs.existsSync(a) || fs.statSync(a).size === 0) {
      throw new Error(`Required asset ${a} is missing or empty!`);
    }
  }
  console.log('✓ All core CSS, JS bundles and local images present');

  // 3. Test HTTP Server
  const server = spawn('node', ['server.js'], { env: { ...process.env, PORT: '8089' } });
  await new Promise(r => setTimeout(r, 1000));

  try {
    const resHtml = await fetch('http://localhost:8089/');
    if (resHtml.status !== 200) throw new Error(`Server returned ${resHtml.status} for /`);
    console.log('✓ HTTP GET / returned status 200');

    const resJs = await fetch('http://localhost:8089/assets/index-Bc0M62SV.js');
    if (resJs.status !== 200) throw new Error(`Server returned ${resJs.status} for index JS`);
    console.log('✓ HTTP GET /assets/index-Bc0M62SV.js returned status 200');

    const resImg = await fetch('http://localhost:8089/assets/images/organ_of_corti.png');
    if (resImg.status !== 200) throw new Error(`Server returned ${resImg.status} for image`);
    console.log('✓ HTTP GET /assets/images/organ_of_corti.png returned status 200');

    console.log('\nALL TESTS PASSED! RESONANCE clone is 100% verified and operational.');
  } finally {
    server.kill();
  }
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
