const http = require(‘http’);
const fs = require(‘fs’);
const path = require(‘path’);

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY || ‘’;

const HTML = `<!DOCTYPE html>

<html lang="nl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Voertuig Advertentie AI</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Syne', sans-serif; min-height: 100vh; background: #0a0a0a; color: #f0ede8; }
  ::selection { background: #ff4d00; color: #0a0a0a; }
  .header { padding: 32px 24px 20px; border-bottom: 1px solid #1e1e1e; display: flex; align-items: center; gap: 14px; }
  .logo { width: 42px; height: 42px; background: #ff4d00; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: #0a0a0a; clip-path: polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%); flex-shrink: 0; }
  .header h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
  .header p { font-size: 12px; color: #555; font-family: 'DM Sans'; margin-top: 2px; }
  .main { max-width: 720px; margin: 0 auto; padding: 32px 20px; }
  .upload-zone { border: 2px dashed #2a2a2a; border-radius: 16px; padding: 50px 24px; text-align: center; cursor: pointer; transition: all 0.2s; background: #111; position: relative; overflow: hidden; }
  .upload-zone::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, #ff4d0010 0%, transparent 70%); pointer-events: none; }
  .upload-zone:hover, .upload-zone.drag { border-color: #ff4d00; background: #140d08; }
  .upload-icon { font-size: 44px; margin-bottom: 14px; }
  .upload-title { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
  .upload-sub { font-size: 13px; color: #555; font-family: 'DM Sans'; }
  .preview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; margin-top: 20px; }
  .preview-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 10px; border: 2px solid #1e1e1e; }
  .btn-primary { display: block; width: 100%; margin-top: 24px; padding: 17px; background: #ff4d00; color: #0a0a0a; border: none; border-radius: 12px; font-size: 16px; font-weight: 800; font-family: 'Syne'; cursor: pointer; letter-spacing: -0.3px; transition: all 0.15s; }
  .btn-primary:hover:not(:disabled) { background: #ff6a2a; transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .loading-state { text-align: center; padding: 50px 0; }
  .spinner { width: 44px; height: 44px; border: 3px solid #1e1e1e; border-top-color: #ff4d00; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 18px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-steps { font-size: 14px; color: #555; font-family: 'DM Sans'; line-height: 2.2; }
  .result-section { animation: fadeUp 0.4s ease; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
  .vehicle-card { background: #111; border: 1px solid #1e1e1e; border-radius: 16px; padding: 22px; margin-bottom: 20px; }
  .vehicle-card h2 { font-size: 22px; font-weight: 800; margin-bottom: 3px; }
  .vehicle-year { font-size: 14px; color: #ff4d00; font-family: 'DM Sans'; margin-bottom: 14px; }
  .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .spec-item { background: #171717; border-radius: 10px; padding: 11px 13px; }
  .spec-label { font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 0.8px; font-family: 'DM Sans'; }
  .spec-value { font-size: 14px; font-weight: 600; margin-top: 2px; }
  .price-badge { background: linear-gradient(135deg, #ff4d00, #ff8c42); border-radius: 14px; padding: 18px 22px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
  .price-main { font-size: 34px; font-weight: 800; color: #0a0a0a; }
  .price-range { font-size: 12px; color: rgba(0,0,0,0.6); font-family: 'DM Sans'; margin-top: 2px; }
  .price-note { font-size: 13px; background: rgba(0,0,0,0.15); color: #0a0a0a; padding: 6px 12px; border-radius: 8px; font-family: 'DM Sans'; }
  .platform-tabs { display: flex; gap: 8px; margin-bottom: 14px; }
  .tab { flex: 1; padding: 11px; border: 1px solid #2a2a2a; border-radius: 10px; background: transparent; color: #666; font-size: 14px; font-weight: 600; font-family: 'Syne'; cursor: pointer; transition: all 0.15s; }
  .tab.active { border-color: #ff4d00; color: #ff4d00; background: #140d08; }
  .ad-output { background: #111; border: 1px solid #1e1e1e; border-radius: 14px; padding: 18px; font-family: 'DM Sans'; font-size: 14px; line-height: 1.8; color: #c8c4be; white-space: pre-wrap; min-height: 180px; }
  .btn-copy { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin-top: 10px; padding: 14px; background: #171717; border: 1px solid #2a2a2a; border-radius: 12px; color: #f0ede8; font-size: 15px; font-weight: 600; font-family: 'Syne'; cursor: pointer; transition: all 0.15s; }
  .btn-copy:hover { border-color: #ff4d00; color: #ff4d00; }
  .btn-copy.copied { border-color: #22c55e; color: #22c55e; }
  .btn-reset { display: block; width: 100%; margin-top: 8px; padding: 12px; background: transparent; border: none; color: #555; font-size: 14px; font-family: 'DM Sans'; cursor: pointer; }
  .btn-reset:hover { color: #f0ede8; }
  .tag { display: inline-block; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 6px; padding: 4px 10px; font-size: 12px; font-family: 'DM Sans'; margin: 3px 3px 0 0; color: #999; }
  .error-box { margin-top: 20px; padding: 16px; background: #1a0a0a; border: 1px solid #3a1a1a; border-radius: 12px; color: #ff6b6b; font-family: 'DM Sans'; font-size: 14px; }
  @media (max-width: 480px) { .specs-grid { grid-template-columns: 1fr; } .price-badge { flex-direction: column; } }
</style>
</head>
<body>
<div class="header">
  <div class="logo">V</div>
  <div>
    <h1>Voertuig Advertentie AI</h1>
    <p>Upload foto's → AI analyseert → Klaar voor Marktplaats & Facebook</p>
  </div>
</div>
<div class="main">
  <div id="uploadSection">
    <div class="upload-zone" id="dropZone">
      <div class="upload-icon">📸</div>
      <div class="upload-title">Sleep foto's hierheen</div>
      <div class="upload-sub">of klik om te uploaden · max 6 foto's · JPG, PNG, WEBP</div>
      <input type="file" id="fileInput" accept="image/*" multiple style="display:none" />
    </div>
    <div class="preview-grid" id="previewGrid"></div>
    <button class="btn-primary" id="analyzeBtn" disabled onclick="analyzeVehicle()">🔍 Analyseer & Maak Advertentie</button>
  </div>
  <div class="loading-state" id="loadingState" style="display:none">
    <div class="spinner"></div>
    <div class="upload-title" style="margin-bottom:12px">AI aan het werk...</div>
    <div class="loading-steps">🔍 Voertuig herkennen & details extracten<br>🌐 Marktprijzen opzoeken<br>✍️ Advertentietekst schrijven</div>
  </div>
  <div class="error-box" id="errorBox" style="display:none"></div>
  <div class="result-section" id="resultSection" style="display:none">
    <div class="vehicle-card">
      <h2 id="rMerkModel"></h2>
      <div class="vehicle-year" id="rTypeJaar"></div>
      <div class="specs-grid">
        <div class="spec-item"><div class="spec-label">Kleur</div><div class="spec-value" id="rKleur"></div></div>
        <div class="spec-item"><div class="spec-label">Brandstof</div><div class="spec-value" id="rBrandstof"></div></div>
        <div class="spec-item"><div class="spec-label">Staat</div><div class="spec-value" id="rStaat"></div></div>
        <div class="spec-item"><div class="spec-label">KM-stand</div><div class="spec-value" id="rKm"></div></div>
      </div>
      <div id="rTags" style="margin-top:12px"></div>
    </div>
    <div class="price-badge">
      <div>
        <div class="price-main" id="rPrice"></div>
        <div class="price-range" id="rRange"></div>
      </div>
      <div class="price-note" id="rNote"></div>
    </div>
    <div class="platform-tabs">
      <button class="tab active" id="tabMp" onclick="switchPlatform('marktplaats')">🇳🇱 Marktplaats</button>
      <button class="tab" id="tabFb" onclick="switchPlatform('facebook')">📘 Facebook</button>
    </div>
    <div class="ad-output" id="adOutput"></div>
    <button class="btn-copy" id="copyBtn" onclick="copyText()">📋 Kopieer advertentietekst</button>
    <button class="btn-reset" onclick="reset()">↩ Nieuwe advertentie maken</button>
  </div>
</div>
<script>
  let imageBase64s = [], currentPlatform = 'marktplaats', adData = null;
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag'));
  dropZone.addEventListener('drop', e => { e.preventDefault(); dropZone.classList.remove('drag'); handleFiles(e.dataTransfer.files); });
  fileInput.addEventListener('change', e => handleFiles(e.target.files));

async function handleFiles(files) {
const valid = Array.from(files).filter(f => f.type.startsWith(‘image/’)).slice(0, 6);
if (!valid.length) return;
imageBase64s = [];
document.getElementById(‘previewGrid’).innerHTML = ‘’;
for (const file of valid) {
const b64 = await toBase64(file);
imageBase64s.push(b64);
const img = document.createElement(‘img’);
img.src = URL.createObjectURL(file);
img.className = ‘preview-img’;
document.getElementById(‘previewGrid’).appendChild(img);
}
const btn = document.getElementById(‘analyzeBtn’);
btn.disabled = false;
btn.textContent = “🔍 Analyseer “ + valid.length + “ foto” + (valid.length > 1 ? “’s” : ‘’) + “ & Maak Advertentie”;
}

function toBase64(file) {
return new Promise((res, rej) => {
const r = new FileReader();
r.onload = () => res(r.result.split(’,’)[1]);
r.onerror = () => rej(new Error(‘Leesfout’));
r.readAsDataURL(file);
});
}

async function callAPI(body) {
const resp = await fetch(’/api/analyze’, { method: ‘POST’, headers: { ‘Content-Type’: ‘application/json’ }, body: JSON.stringify(body) });
if (!resp.ok) { const e = await resp.json(); throw new Error(e.error || ‘API fout’); }
return resp.json();
}

async function analyzeVehicle() {
if (!imageBase64s.length) return;
document.getElementById(‘uploadSection’).style.display = ‘none’;
document.getElementById(‘loadingState’).style.display = ‘block’;
document.getElementById(‘errorBox’).style.display = ‘none’;
document.getElementById(‘resultSection’).style.display = ‘none’;
try {
const analysisData = await callAPI({
model: ‘claude-sonnet-4-20250514’, max_tokens: 1000,
messages: [{ role: ‘user’, content: [
…imageBase64s.map(b64 => ({ type: ‘image’, source: { type: ‘base64’, media_type: ‘image/jpeg’, data: b64 } })),
{ type: ‘text’, text: ‘Je bent een expert autohandelaar in Nederland. Analyseer dit voertuig en geef ALLEEN een JSON-object terug, geen uitleg:\n{\n  “merk”: “string”,\n  “model”: “string”,\n  “type”: “auto|motor|scooter|bestelwagen|camper|aanhanger|boot|anders”,\n  “jaar”: “string”,\n  “kleur”: “string”,\n  “brandstof”: “benzine|diesel|elektrisch|hybride|onbekend”,\n  “staat”: “uitstekend|goed|redelijk|project”,\n  “kilometerstand”: “string (schatting)”,\n  “bijzonderheden”: [“array van opvallende features”]\n}’ }
]}]
});
const vehicle = JSON.parse(analysisData.content.map(i => i.text || ‘’).join(’’).replace(/`json|`/g, ‘’).trim());

```
  const adRawData = await callAPI({
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
    tools: [{ type: 'web_search_20250305', name: 'web_search' }],
    messages: [{ role: 'user', content: 'Je bent een expert autohandelaar in Nederland/België. Voertuig: ' + JSON.stringify(vehicle) + '. Zoek huidige Marktplaats-prijzen op en schrijf een advertentie. Geef ALLEEN een JSON-object terug:\\n{\\n  "title": "string (pakkende titel max 60 tekens)",\\n  "description": "string (2-3 alinea\\'s verkooptekst)",\\n  "price": number,\\n  "priceNote": "string",\\n  "priceRange": "string (bijv. €8.000 - €12.000 op Marktplaats)"\\n}' }]
  });
  const ad = JSON.parse(adRawData.content.map(i => i.text || '').join('').replace(/```json|```/g, '').trim());
  adData = { vehicle, ad };
  showResult(vehicle, ad);
} catch (err) {
  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('uploadSection').style.display = 'block';
  document.getElementById('errorBox').style.display = 'block';
  document.getElementById('errorBox').textContent = '⚠️ ' + err.message;
}
```

}

function showResult(vehicle, ad) {
document.getElementById(‘loadingState’).style.display = ‘none’;
document.getElementById(‘rMerkModel’).textContent = vehicle.merk + ’ ’ + vehicle.model;
document.getElementById(‘rTypeJaar’).textContent = (vehicle.type || ‘’).toUpperCase() + ’ · ’ + vehicle.jaar;
document.getElementById(‘rKleur’).textContent = vehicle.kleur;
document.getElementById(‘rBrandstof’).textContent = vehicle.brandstof;
document.getElementById(‘rStaat’).textContent = vehicle.staat;
document.getElementById(‘rKm’).textContent = vehicle.kilometerstand;
document.getElementById(‘rTags’).innerHTML = (vehicle.bijzonderheden || []).map(b => ‘<span class="tag">’ + b + ‘</span>’).join(’’);
document.getElementById(‘rPrice’).textContent = ‘€’ + (ad.price || 0).toLocaleString(‘nl-NL’);
document.getElementById(‘rRange’).textContent = ’Markt: ’ + ad.priceRange;
document.getElementById(‘rNote’).textContent = ad.priceNote;
updateAdText();
document.getElementById(‘resultSection’).style.display = ‘block’;
}

function updateAdText() {
if (!adData) return;
const { vehicle, ad } = adData;
const price = ‘€’ + (ad.price || 0).toLocaleString(‘nl-NL’);
document.getElementById(‘adOutput’).textContent = currentPlatform === ‘marktplaats’
? ad.title + ‘\n\n’ + ad.description + ’\n\n📍 Staat: ’ + vehicle.staat + ’\n🔧 Kilometerstand: ’ + vehicle.kilometerstand + ’\n📅 Bouwjaar: ’ + vehicle.jaar + ’\n⛽ Brandstof: ’ + vehicle.brandstof + ’\n🎨 Kleur: ’ + vehicle.kleur + ’\n\n💰 Vraagprijs: ’ + price + ‘\n\nSerieuze kopers kunnen contact opnemen. Bezichtiging mogelijk op afspraak.’
: ’🚗 TE KOOP: ’ + ad.title + ‘\n\n’ + ad.description + ’\n\n✅ Bouwjaar: ’ + vehicle.jaar + ’\n✅ Kilometerstand: ’ + vehicle.kilometerstand + ’\n✅ Brandstof: ’ + vehicle.brandstof + ’\n✅ Staat: ’ + vehicle.staat + ’\n✅ Kleur: ’ + vehicle.kleur + ‘\n\n💶 Prijs: ’ + price + ’ (’ + ad.priceNote + ‘)\n\nDM voor meer info of bezichtiging 👍’;
}

function switchPlatform(p) {
currentPlatform = p;
document.getElementById(‘tabMp’).className = ‘tab’ + (p === ‘marktplaats’ ? ’ active’ : ‘’);
document.getElementById(‘tabFb’).className = ‘tab’ + (p === ‘facebook’ ? ’ active’ : ‘’);
updateAdText();
}

async function copyText() {
await navigator.clipboard.writeText(document.getElementById(‘adOutput’).textContent);
const btn = document.getElementById(‘copyBtn’);
btn.textContent = ‘✅ Gekopieerd!’;
btn.classList.add(‘copied’);
setTimeout(() => { btn.textContent = ‘📋 Kopieer advertentietekst’; btn.classList.remove(‘copied’); }, 2000);
}

function reset() {
imageBase64s = []; adData = null;
document.getElementById(‘previewGrid’).innerHTML = ‘’;
document.getElementById(‘analyzeBtn’).disabled = true;
document.getElementById(‘analyzeBtn’).textContent = ‘🔍 Analyseer & Maak Advertentie’;
document.getElementById(‘resultSection’).style.display = ‘none’;
document.getElementById(‘uploadSection’).style.display = ‘block’;
document.getElementById(‘errorBox’).style.display = ‘none’;
fileInput.value = ‘’;
}
</script>

</body>
</html>`;

async function fetchWithTimeout(url, options, timeout = 60000) {
const controller = new AbortController();
const id = setTimeout(() => controller.abort(), timeout);
try {
const response = await fetch(url, { …options, signal: controller.signal });
clearTimeout(id);
return response;
} catch (err) {
clearTimeout(id);
throw err;
}
}

const server = http.createServer(async (req, res) => {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘GET, POST, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);

if (req.method === ‘OPTIONS’) { res.writeHead(204); res.end(); return; }

if (req.method === ‘GET’ && (req.url === ‘/’ || req.url === ‘/index.html’)) {
res.writeHead(200, { ‘Content-Type’: ‘text/html; charset=utf-8’ });
res.end(HTML);
return;
}

if (req.method === ‘POST’ && req.url === ‘/api/analyze’) {
let body = ‘’;
req.on(‘data’, chunk => body += chunk.toString());
req.on(‘end’, async () => {
try {
const payload = JSON.parse(body);
const response = await fetchWithTimeout(‘https://api.anthropic.com/v1/messages’, {
method: ‘POST’,
headers: {
‘Content-Type’: ‘application/json’,
‘x-api-key’: API_KEY,
‘anthropic-version’: ‘2023-06-01’
},
body: JSON.stringify(payload)
});
const data = await response.json();
res.writeHead(response.status, { ‘Content-Type’: ‘application/json’ });
res.end(JSON.stringify(data));
} catch (err) {
res.writeHead(500, { ‘Content-Type’: ‘application/json’ });
res.end(JSON.stringify({ error: err.message }));
}
});
return;
}

res.writeHead(404, { ‘Content-Type’: ‘text/plain’ });
res.end(‘Not found’);
});

server.listen(PORT, () => console.log(’Server draait op port ’ + PORT));
