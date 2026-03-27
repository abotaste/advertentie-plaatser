import { useState, useCallback } from “react”;

const ANTHROPIC_MODEL = “claude-sonnet-4-20250514”;

const platformTemplates = {
marktplaats: (data) => `**${data.title}**

${data.description}

📍 Staat: ${data.condition}
🔧 Kilometerstand: ${data.mileage}
📅 Bouwjaar: ${data.year}
⛽ Brandstof: ${data.fuel}
🎨 Kleur: ${data.color}

💰 Vraagprijs: €${data.price}

Serieuze kopers kunnen contact opnemen. Bezichtiging mogelijk op afspraak.`,

facebook: (data) => `🚗 TE KOOP: ${data.title}

${data.description}

✅ Bouwjaar: ${data.year}
✅ Kilometerstand: ${data.mileage}
✅ Brandstof: ${data.fuel}
✅ Staat: ${data.condition}
✅ Kleur: ${data.color}

💶 Prijs: €${data.price} (${data.priceNote})

DM voor meer info of bezichtiging 👍`,
};

export default function App() {
const [images, setImages] = useState([]);
const [imageBase64s, setImageBase64s] = useState([]);
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);
const [platform, setPlatform] = useState(“marktplaats”);
const [copied, setCopied] = useState(false);
const [dragOver, setDragOver] = useState(false);
const [step, setStep] = useState(1); // 1: upload, 2: result

const readAsBase64 = (file) =>
new Promise((res, rej) => {
const r = new FileReader();
r.onload = () => res(r.result.split(”,”)[1]);
r.onerror = () => rej(new Error(“Leesfout”));
r.readAsDataURL(file);
});

const handleFiles = useCallback(async (files) => {
const valid = Array.from(files).filter((f) => f.type.startsWith(“image/”)).slice(0, 6);
if (!valid.length) return;
setImages(valid.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })));
const b64s = await Promise.all(valid.map(readAsBase64));
setImageBase64s(b64s);
}, []);

const handleDrop = useCallback(
(e) => {
e.preventDefault();
setDragOver(false);
handleFiles(e.dataTransfer.files);
},
[handleFiles]
);

const analyzeVehicle = async () => {
if (!imageBase64s.length) return;
setLoading(true);
setResult(null);

```
try {
  const imageContent = imageBase64s.map((b64) => ({
    type: "image",
    source: { type: "base64", media_type: "image/jpeg", data: b64 },
  }));

  // Step 1: Analyze the vehicle
  const analysisResp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 1000,
      system: `Je bent een expert autohandelaar in Nederland/België. Analyseer voertuigfoto's en geef een JSON-object terug met deze velden:
```

{
“merk”: “string”,
“model”: “string”,
“type”: “auto|motor|scooter|bestelwagen|camper|aanhanger|boot|anders”,
“jaar”: “string (schatting)”,
“kleur”: “string”,
“brandstof”: “string (benzine/diesel/elektrisch/hybride/onbekend)”,
“staat”: “string (uitstekend/goed/redelijk/project)”,
“kilometerstand”: “string (schatting op basis van staat)”,
“bijzonderheden”: [“string array van opvallende kenmerken”],
“schadeObservaties”: “string of null”
}
Geef ALLEEN het JSON-object, geen uitleg.`,
messages: [
{
role: “user”,
content: [
…imageContent,
{ type: “text”, text: “Analyseer dit voertuig en geef het JSON-object.” },
],
},
],
}),
});

```
  const analysisData = await analysisResp.json();
  const analysisText = analysisData.content.map((i) => i.text || "").join("");
  const clean = analysisText.replace(/```json|```/g, "").trim();
  const vehicle = JSON.parse(clean);

  // Step 2: Get price + write ad
  const adResp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 1000,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      system: `Je bent een expert autohandelaar. Zoek marktprijzen op voor het voertuig en schrijf verkoopteksten. Geef een JSON-object terug:
```

{
“title”: “string (pakkende advertentietitel, max 60 tekens)”,
“description”: “string (2-3 alinea’s verkooptekst in het Nederlands, enthousiast maar eerlijk)”,
“price”: number (reëel marktconform vraagprijs in euro’s),
“priceNote”: “string (bijv. ‘scherp geprijsd’ of ‘onderhandelbaar’)”,
“priceRange”: “string (bijv. ‘€8.000 - €12.000 op Marktplaats’)”,
“priceRationale”: “string (korte uitleg waarom deze prijs)”
}
Geef ALLEEN het JSON-object.`, messages: [ { role: "user", content: `Voertuig: ${JSON.stringify(vehicle)}. Zoek huidige prijzen op Marktplaats.nl en stel een advertentie op.`,
},
],
}),
});

```
  const adData = await adResp.json();
  const adText = adData.content.map((i) => i.text || "").join("");
  const adClean = adText.replace(/```json|```/g, "").trim();
  const ad = JSON.parse(adClean);

  setResult({
    vehicle,
    ad: {
      ...ad,
      condition: vehicle.staat,
      mileage: vehicle.kilometerstand,
      year: vehicle.jaar,
      fuel: vehicle.brandstof,
      color: vehicle.kleur,
    },
  });
  setStep(2);
} catch (err) {
  console.error(err);
  setResult({ error: "Er ging iets mis bij de analyse. Probeer het opnieuw." });
} finally {
  setLoading(false);
}
```

};

const getAdText = () => {
if (!result?.ad) return “”;
const tmpl = platformTemplates[platform];
return tmpl(result.ad);
};

const copyToClipboard = async () => {
await navigator.clipboard.writeText(getAdText());
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};

const reset = () => {
setImages([]);
setImageBase64s([]);
setResult(null);
setStep(1);
setCopied(false);
};

return (
<div style={{ fontFamily: “‘Syne’, sans-serif”, minHeight: “100vh”, background: “#0a0a0a”, color: “#f0ede8” }}>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

```
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: #ff4d00; color: #0a0a0a; }
    
    .header { 
      padding: 40px 32px 24px; 
      border-bottom: 1px solid #1e1e1e;
      display: flex; align-items: center; gap: 16px;
    }
    .logo { 
      width: 44px; height: 44px; background: #ff4d00; 
      display: flex; align-items: center; justify-content: center;
      font-size: 22px; font-weight: 800; color: #0a0a0a;
      clip-path: polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%);
    }
    .header-text h1 { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header-text p { font-size: 13px; color: #666; font-family: 'DM Sans', sans-serif; margin-top: 2px; }
    
    .main { max-width: 780px; margin: 0 auto; padding: 40px 24px; }
    
    .upload-zone {
      border: 2px dashed #2a2a2a;
      border-radius: 16px;
      padding: 60px 32px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      background: #111;
      position: relative;
      overflow: hidden;
    }
    .upload-zone::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at 50% 0%, #ff4d0010 0%, transparent 70%);
      pointer-events: none;
    }
    .upload-zone:hover, .upload-zone.drag { border-color: #ff4d00; background: #140d08; }
    .upload-icon { font-size: 48px; margin-bottom: 16px; }
    .upload-title { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
    .upload-sub { font-size: 14px; color: #555; font-family: 'DM Sans'; }
    .upload-input { display: none; }
    
    .preview-grid { 
      display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); 
      gap: 12px; margin-top: 24px; 
    }
    .preview-img { 
      width: 100%; aspect-ratio: 4/3; object-fit: cover; 
      border-radius: 10px; border: 2px solid #1e1e1e;
    }
    
    .btn-primary {
      display: block; width: 100%; margin-top: 28px;
      padding: 18px; background: #ff4d00; color: #0a0a0a;
      border: none; border-radius: 12px; font-size: 17px; 
      font-weight: 800; font-family: 'Syne'; cursor: pointer;
      letter-spacing: -0.3px; transition: all 0.15s;
    }
    .btn-primary:hover:not(:disabled) { background: #ff6a2a; transform: translateY(-1px); }
    .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
    
    .loading-state { text-align: center; padding: 60px 0; }
    .spinner { 
      width: 48px; height: 48px; border: 3px solid #1e1e1e;
      border-top-color: #ff4d00; border-radius: 50%;
      animation: spin 0.8s linear infinite; margin: 0 auto 20px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-steps { font-size: 14px; color: #555; font-family: 'DM Sans'; line-height: 2; }
    
    .result-section { animation: fadeUp 0.4s ease; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
    
    .vehicle-card {
      background: #111; border: 1px solid #1e1e1e; border-radius: 16px;
      padding: 24px; margin-bottom: 24px;
    }
    .vehicle-card h2 { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
    .vehicle-year { font-size: 15px; color: #ff4d00; font-family: 'DM Sans'; margin-bottom: 16px; }
    .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .spec-item { background: #171717; border-radius: 10px; padding: 12px 14px; }
    .spec-label { font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 0.8px; font-family: 'DM Sans'; }
    .spec-value { font-size: 15px; font-weight: 600; margin-top: 2px; }
    
    .price-badge {
      background: linear-gradient(135deg, #ff4d00, #ff8c42);
      border-radius: 14px; padding: 20px 24px; margin-bottom: 24px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .price-main { font-size: 36px; font-weight: 800; color: #0a0a0a; }
    .price-range { font-size: 13px; color: rgba(0,0,0,0.6); font-family: 'DM Sans'; margin-top: 3px; }
    .price-note { font-size: 13px; background: rgba(0,0,0,0.15); color: #0a0a0a; padding: 6px 12px; border-radius: 8px; font-family: 'DM Sans'; }
    
    .platform-tabs { display: flex; gap: 8px; margin-bottom: 16px; }
    .tab {
      flex: 1; padding: 12px; border: 1px solid #2a2a2a; border-radius: 10px;
      background: transparent; color: #666; font-size: 14px; font-weight: 600;
      font-family: 'Syne'; cursor: pointer; transition: all 0.15s;
    }
    .tab.active { border-color: #ff4d00; color: #ff4d00; background: #140d08; }
    
    .ad-output {
      background: #111; border: 1px solid #1e1e1e; border-radius: 14px;
      padding: 20px; font-family: 'DM Sans'; font-size: 14px; line-height: 1.7;
      color: #c8c4be; white-space: pre-wrap; min-height: 200px;
    }
    
    .btn-copy {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      width: 100%; margin-top: 12px; padding: 14px;
      background: #171717; border: 1px solid #2a2a2a; border-radius: 12px;
      color: #f0ede8; font-size: 15px; font-weight: 600; font-family: 'Syne';
      cursor: pointer; transition: all 0.15s;
    }
    .btn-copy:hover { border-color: #ff4d00; color: #ff4d00; }
    .btn-copy.copied { border-color: #22c55e; color: #22c55e; }
    
    .btn-reset {
      display: block; width: 100%; margin-top: 10px; padding: 12px;
      background: transparent; border: none; color: #555; font-size: 14px;
      font-family: 'DM Sans'; cursor: pointer; transition: color 0.15s;
    }
    .btn-reset:hover { color: #f0ede8; }

    .bijzonderheden { margin-top: 12px; }
    .tag { 
      display: inline-block; background: #1a1a1a; border: 1px solid #2a2a2a;
      border-radius: 6px; padding: 4px 10px; font-size: 12px; font-family: 'DM Sans';
      margin: 3px 3px 0 0; color: #999;
    }

    @media (max-width: 520px) {
      .specs-grid { grid-template-columns: 1fr; }
      .price-badge { flex-direction: column; gap: 12px; }
    }
  `}</style>

  <div className="header">
    <div className="logo">V</div>
    <div className="header-text">
      <h1>Voertuig Advertentie AI</h1>
      <p>Upload foto's → AI analyseert → Klaar voor Marktplaats & Facebook</p>
    </div>
  </div>

  <div className="main">
    {step === 1 && (
      <>
        <div
          className={`upload-zone ${dragOver ? "drag" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input").click()}
        >
          <div className="upload-icon">📸</div>
          <div className="upload-title">Sleep foto's hierheen</div>
          <div className="upload-sub">of klik om te uploaden · max 6 foto's · JPG, PNG, WEBP</div>
          <input
            id="file-input"
            className="upload-input"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {images.length > 0 && (
          <>
            <div className="preview-grid">
              {images.map((img, i) => (
                <img key={i} src={img.url} alt={img.name} className="preview-img" />
              ))}
            </div>
            <button className="btn-primary" onClick={analyzeVehicle} disabled={loading}>
              {loading ? "Bezig..." : `🔍 Analyseer ${images.length} foto${images.length > 1 ? "'s" : ""} & Maak Advertentie`}
            </button>
          </>
        )}

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <div className="upload-title" style={{ marginBottom: 12 }}>AI aan het werk...</div>
            <div className="loading-steps">
              🔍 Voertuig herkennen & details extracten<br />
              🌐 Marktprijzen opzoeken<br />
              ✍️ Advertentietekst schrijven
            </div>
          </div>
        )}

        {result?.error && (
          <div style={{ marginTop: 24, padding: 16, background: "#1a0a0a", border: "1px solid #3a1a1a", borderRadius: 12, color: "#ff6b6b", fontFamily: "DM Sans" }}>
            ⚠️ {result.error}
          </div>
        )}
      </>
    )}

    {step === 2 && result?.vehicle && result?.ad && (
      <div className="result-section">
        {/* Vehicle info */}
        <div className="vehicle-card">
          <h2>{result.vehicle.merk} {result.vehicle.model}</h2>
          <div className="vehicle-year">{result.vehicle.type?.toUpperCase()} · {result.vehicle.jaar}</div>

          <div className="specs-grid">
            <div className="spec-item">
              <div className="spec-label">Kleur</div>
              <div className="spec-value">{result.vehicle.kleur}</div>
            </div>
            <div className="spec-item">
              <div className="spec-label">Brandstof</div>
              <div className="spec-value">{result.vehicle.brandstof}</div>
            </div>
            <div className="spec-item">
              <div className="spec-label">Staat</div>
              <div className="spec-value">{result.vehicle.staat}</div>
            </div>
            <div className="spec-item">
              <div className="spec-label">KM-stand (schatting)</div>
              <div className="spec-value">{result.vehicle.kilometerstand}</div>
            </div>
          </div>

          {result.vehicle.bijzonderheden?.length > 0 && (
            <div className="bijzonderheden">
              {result.vehicle.bijzonderheden.map((b, i) => <span key={i} className="tag">{b}</span>)}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="price-badge">
          <div>
            <div className="price-main">€{result.ad.price?.toLocaleString("nl-NL")}</div>
            <div className="price-range">Markt: {result.ad.priceRange}</div>
          </div>
          <div className="price-note">{result.ad.priceNote}</div>
        </div>

        {/* Platform tabs + output */}
        <div className="platform-tabs">
          <button className={`tab ${platform === "marktplaats" ? "active" : ""}`} onClick={() => setPlatform("marktplaats")}>
            🇳🇱 Marktplaats
          </button>
          <button className={`tab ${platform === "facebook" ? "active" : ""}`} onClick={() => setPlatform("facebook")}>
            📘 Facebook
          </button>
        </div>

        <div className="ad-output">{getAdText()}</div>

        <button className={`btn-copy ${copied ? "copied" : ""}`} onClick={copyToClipboard}>
          {copied ? "✅ Gekopieerd!" : "📋 Kopieer advertentietekst"}
        </button>

        <button className="btn-reset" onClick={reset}>
          ↩ Nieuwe advertentie maken
        </button>
      </div>
    )}
  </div>
</div>
```

);
}
