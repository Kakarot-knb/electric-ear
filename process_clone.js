const fs = require('fs');
const path = require('path');

const imgMap = [
  {
    original: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_organ_of_Corti_of_the_mouse.png/1280px-The_organ_of_Corti_of_the_mouse.png',
    local: './assets/images/organ_of_corti.png'
  },
  {
    original: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Digital_Behind-the-ear_Hearing_Aids.jpg/1280px-Digital_Behind-the-ear_Hearing_Aids.jpg',
    local: './assets/images/digital_bte.jpg'
  },
  {
    original: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Oticon_hearing_aid_top_view.jpg/1280px-Oticon_hearing_aid_top_view.jpg',
    local: './assets/images/oticon_ric.jpg'
  },
  {
    original: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Vintage_Beltone_Vivo_In-The-Ear_Transistor_Hearing_Aid_%28ITE%29%2C_Circa_1970_%2816500898849%29.jpg/1280px-Vintage_Beltone_Vivo_In-The-Ear_Transistor_Hearing_Aid_%28ITE%29%2C_Circa_1970_%2816500898849%29.jpg',
    local: './assets/images/vintage_beltone.jpg'
  },
  {
    original: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Cochlear_implant_2.jpg',
    local: './assets/images/cochlear_implant_2.jpg'
  },
  {
    original: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Cochlear_implant_user_%28cropped%29.jpg',
    local: './assets/images/cochlear_implant_user.jpg'
  },
  {
    original: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Four_generations_of_Advanced_Bionics_cochlear_implant_processors.jpg',
    local: './assets/images/four_generations.jpg'
  },
  {
    original: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Audiologist%2C_2015.jpg/1280px-Audiologist%2C_2015.jpg',
    local: './assets/images/audiologist.jpg'
  },
  {
    original: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Oticon_hearing_aids_and_recharger.jpg/1280px-Oticon_hearing_aids_and_recharger.jpg',
    local: './assets/images/oticon_recharger.jpg'
  },
  {
    original: 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/lovp_33xmfp9kx88438fmxz5d05j5kp/9efd73777e755bb7e77b759396d72440_1793987706000.png',
    local: './assets/images/og_image.png'
  }
];

// 1. Process HTML
let html = fs.readFileSync('index.html', 'utf8');

// Replace external image URLs with local relative URLs
for (const { original, local } of imgMap) {
  html = html.split(original).join(local);
}
// Also replace any absolute /assets/ with ./assets/
html = html.replace(/src="\/assets\//g, 'src="./assets/');
html = html.replace(/href="\/assets\//g, 'href="./assets/');

// Update favicon tags with cache-busting and multiple formats
const faviconTags = `<link rel="icon" type="image/png" href="./favicon.png?v=3"/>\n<link rel="icon" type="image/x-icon" href="./favicon.ico?v=3"/>\n<link rel="shortcut icon" href="./favicon.ico?v=3"/>\n<link rel="apple-touch-icon" href="./favicon.png?v=3"/>`;

if (html.includes('rel="icon"')) {
  html = html.replace(/<link[^>]*rel="(?:shortcut |apple-touch-)?icon"[^>]*\/?>\s*/gi, '');
  html = html.replace('</head>', `${faviconTags}\n</head>`);
}

// Remove third-party tracker scripts
html = html.replace(/<script defer src="\/~flock\.js"[^>]*><\/script>/g, '');
html = html.replace(/<script defer src="\/__l5e\/events\.[^>]*><\/script>/g, '');

// Strip promotional badge styles, elements, and script
html = html.replace(/<style>\s*#lovable-badge[\s\S]*?<\/style>/g, '');
html = html.replace(/<aside\s+id="lovable-badge"[\s\S]*?<\/aside>/g, '');
html = html.replace(/<script>\s*\(\(\)\s*=>\s*\{[\s\S]*?#lovable-badge[\s\S]*?<\/script>/g, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Written clean index.html (' + html.length + ' bytes)');

// 2. Process routes JS
let routes = fs.readFileSync('assets/routes-DHy1J_uN.js', 'utf8');
for (const { original, local } of imgMap) {
  routes = routes.split(original).join(local);
}
fs.writeFileSync('assets/routes-DHy1J_uN.js', routes, 'utf8');
console.log('Updated assets/routes-DHy1J_uN.js');

// 3. Process index JS to remove external platform hooks
let indexJs = fs.readFileSync('assets/index-Bc0M62SV.js', 'utf8');
indexJs = indexJs.replace(/window\.__lovableEvents\?\.captureException\?\.([^;]+);/g, '/* removed */');
indexJs = indexJs.replace(/window\.__lovableReportRuntimeError\?\.([^;]+);/g, '/* removed */');
fs.writeFileSync('assets/index-Bc0M62SV.js', indexJs, 'utf8');
console.log('Updated assets/index-Bc0M62SV.js');

// 4. Sync to public/ directory for Vercel
function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDirSync('assets', 'public/assets');
fs.copyFileSync('index.html', 'public/index.html');
if (fs.existsSync('favicon.ico')) {
  fs.copyFileSync('favicon.ico', 'public/favicon.ico');
}
if (fs.existsSync('favicon.png')) {
  fs.copyFileSync('favicon.png', 'public/favicon.png');
}
console.log('Successfully synced to public/ directory.');
