import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const rootDir = process.cwd();
const logosDir = path.join(rootDir, 'public/logos');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

const logos = {
  'bitdefender-gravityzone': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 5H18.5C22.09 5 25 7.91 25 11.5C25 13.85 23.75 15.9 21.88 17.03C24.28 18.06 26 20.44 26 23.25C26 27 22.95 28 19 28H7V5Z" stroke="#09090B" stroke-width="2" stroke-linejoin="round"/>
  <path d="M12 10H17.5C19.15 10 20.5 11.35 20.5 13C20.5 14.65 19.15 16 17.5 16H12V10Z" fill="#E11D48"/>
  <path d="M12 16H18.5C20.43 16 22 17.57 22 19.5C22 21.43 20.43 23 18.5 23H12V16Z" fill="#09090B"/>
</svg>`,

  'sentinelone-singularity': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 3L27 9.5V22.5L16 29L5 22.5V9.5L16 3Z" stroke="#6D28D9" stroke-width="2" stroke-linejoin="round"/>
  <path d="M16 7V25M11 10L16 14L21 10M11 22L16 18L21 22" stroke="#09090B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="14" y="14" width="4" height="4" rx="1" fill="#6D28D9"/>
</svg>`,

  'harfanglab-edr': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 7L12 11L16 8L20 11L27 7V18L16 27L5 18V7Z" stroke="#09090B" stroke-width="2" stroke-linejoin="round"/>
  <path d="M10 14L14 17L10 19V14Z" fill="#059669"/>
  <path d="M22 14L18 17L22 19V14Z" fill="#059669"/>
  <path d="M16 16V23" stroke="#09090B" stroke-width="2" stroke-linecap="round"/>
</svg>`,

  'nordlayer': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 24L13.5 11L18 18.5L21 13.5L26 24H6Z" stroke="#09090B" stroke-width="2" stroke-linejoin="round"/>
  <path d="M13.5 11L18 18.5L11 24H6L13.5 11Z" fill="#2563EB" fill-opacity="0.2"/>
  <path d="M4 16C4 9.37 9.37 4 16 4C22.63 4 28 9.37 28 16" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/>
</svg>`,

  'tailscale': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="5" width="5" height="5" rx="1.5" fill="#A1A1AA"/>
  <rect x="13.5" y="5" width="5" height="5" rx="1.5" fill="#09090B"/>
  <rect x="22" y="5" width="5" height="5" rx="1.5" fill="#A1A1AA"/>
  <rect x="5" y="13.5" width="5" height="5" rx="1.5" fill="#09090B"/>
  <rect x="13.5" y="13.5" width="5" height="5" rx="1.5" fill="#09090B"/>
  <rect x="22" y="13.5" width="5" height="5" rx="1.5" fill="#09090B"/>
  <rect x="5" y="22" width="5" height="5" rx="1.5" fill="#A1A1AA"/>
  <rect x="13.5" y="22" width="5" height="5" rx="1.5" fill="#09090B"/>
  <rect x="22" y="22" width="5" height="5" rx="1.5" fill="#059669"/>
</svg>`,

  'tenacy': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="4" width="24" height="24" rx="4" stroke="#09090B" stroke-width="2"/>
  <path d="M9 10H23M16 10V23" stroke="#09090B" stroke-width="2.5" stroke-linecap="round"/>
  <rect x="19" y="18" width="4" height="4" rx="1" fill="#059669"/>
</svg>`,

  'vanta': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 8L16 26L27 8H21L16 17L11 8H5Z" fill="#09090B"/>
  <path d="M11 8L16 17L21 8H16L13.5 12.5L11 8Z" fill="#4F46E5"/>
</svg>`,

  'wallix-pam4all': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 9L10 23L16 12L22 23L28 9" stroke="#09090B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="14" y="5" width="4" height="4" rx="1" fill="#EA580C"/>
</svg>`,

  'proton-pass-business': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 4L27 16L16 28L5 16L16 4Z" stroke="#6D28D9" stroke-width="2" stroke-linejoin="round"/>
  <path d="M16 9L22 16L16 23L10 16L16 9Z" fill="#6D28D9" fill-opacity="0.18" stroke="#09090B" stroke-width="1.75" stroke-linejoin="round"/>
  <rect x="14.25" y="14.25" width="3.5" height="3.5" rx="0.75" fill="#059669"/>
</svg>`,

  'veeam-data-platform': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 8L16 25L26 8" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11 8L16 17L21 8" stroke="#09090B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  'acronis-cyber-protect': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 5L26 25H20.5L16 15.5L11.5 25H6L16 5Z" fill="#09090B"/>
  <path d="M11 20H21" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,

  'intruder-scanner': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="10" stroke="#09090B" stroke-width="2"/>
  <circle cx="16" cy="16" r="5" stroke="#E11D48" stroke-width="1.75"/>
  <path d="M16 3V8M16 24V29M3 16H8M24 16H29" stroke="#09090B" stroke-width="2" stroke-linecap="round"/>
  <rect x="14.5" y="14.5" width="3" height="3" rx="0.75" fill="#E11D48"/>
</svg>`,

  'greenbone-enterprise': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 4L26 9.5V22.5L16 28L6 22.5V9.5L16 4Z" stroke="#16A34A" stroke-width="2" stroke-linejoin="round"/>
  <path d="M16 8V24M10 12L16 15L22 12M10 19L16 22L22 19" stroke="#09090B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
};

for (const [slug, svg] of Object.entries(logos)) {
  fs.writeFileSync(path.join(logosDir, `${slug}.svg`), svg.trim() + '\n', 'utf8');
}

console.log(`[BRAND-ASSETS] ${Object.keys(logos).length} logos vectoriels créés dans public/logos/`);

const ogTempHtml = path.join(rootDir, 'public/_temp-og.html');
const ogTempPng = path.join(rootDir, 'public/_temp-og.png');
const ogOutWebp = path.join(rootDir, 'public/og-cover.webp');

const ogHtml = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background-color: #FAFAFA;
      background-image:
        linear-gradient(to right, #E4E4E7 1px, transparent 1px),
        linear-gradient(to bottom, #E4E4E7 1px, transparent 1px);
      background-size: 32px 32px;
      font-family: 'Inter', sans-serif;
      color: #09090B;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px;
    }
    .card {
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border: 1.5px solid #E4E4E7;
      border-radius: 8px;
      padding: 52px 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 12px 32px -8px rgba(9, 9, 11, 0.06);
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #E4E4E7;
      padding-bottom: 28px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .logo-box {
      width: 52px;
      height: 52px;
      border: 1.5px solid #E4E4E7;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FAFAFA;
    }
    .wordmark {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      font-size: 24px;
      letter-spacing: -0.03em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .slash {
      font-family: 'JetBrains Mono', monospace;
      color: #059669;
    }
    .badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 14px;
      background: #F4F4F5;
      border: 1px solid #E4E4E7;
      border-radius: 4px;
      color: #18181B;
    }
    .middle h1 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 46px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      color: #09090B;
      max-width: 920px;
      margin-bottom: 18px;
    }
    .middle p {
      font-size: 20px;
      color: #52525B;
      max-width: 860px;
      line-height: 1.5;
    }
    .bottom {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      padding-top: 28px;
      border-top: 1px solid #E4E4E7;
    }
    .kpi {
      background: #FAFAFA;
      border: 1px solid #E4E4E7;
      border-radius: 6px;
      padding: 14px 18px;
    }
    .kpi .val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 22px;
      font-weight: 700;
      color: #09090B;
    }
    .kpi .val.emerald {
      color: #059669;
    }
    .kpi .lbl {
      font-size: 12px;
      color: #52525B;
      margin-top: 4px;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="top">
      <div class="brand">
        <div class="logo-box">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.5L20.5 7.25V16.75L12 21.5L3.5 16.75V7.25L12 2.5Z" stroke="#09090B" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M12 2.5V12M12 12L20.5 7.25M12 12L3.5 7.25M12 12V21.5" stroke="#09090B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.75 9.625L12 12L16.25 9.625V14.375L12 16.75L7.75 14.375V9.625Z" fill="#FAFAFA" stroke="#09090B" stroke-width="1.5" stroke-linejoin="round"/>
            <rect x="10.25" y="10.25" width="3.5" height="3.5" rx="0.75" fill="#059669" />
          </svg>
        </div>
        <div>
          <div class="wordmark">
            <span>NIS2</span>
            <span class="slash">//</span>
            <span>STACK HUB</span>
          </div>
          <div style="font-size:13px;color:#71717A;margin-top:2px;">Observatoire Cyber B2B · France (ANSSI) · Belgique (CCB) · Suisse</div>
        </div>
      </div>
      <div class="badge">DIRECTIVE (UE) 2022/2555 · ART. 21</div>
    </div>

    <div class="middle">
      <h1>Arbitrage Technologique, Souveraineté UE & Calculateur de TCO sous Directive NIS2</h1>
      <p>Comparatifs indépendants des solutions EDR, SASE, IAM/PAM, Sauvegarde Immuable, Scan CVE et GRC pour PME et ETI de 10 à 500 postes.</p>
    </div>

    <div class="bottom">
      <div class="kpi">
        <div class="val">6 / 6 Silos</div>
        <div class="lbl">Architecture Article 21 Complète</div>
      </div>
      <div class="kpi">
        <div class="val emerald">Souveraineté UE</div>
        <div class="lbl">Qualification Cloud Act / FISA 702</div>
      </div>
      <div class="kpi">
        <div class="val">13 Logiciels</div>
        <div class="lbl">Grilles Tarifaires Sous Preuve WebP</div>
      </div>
      <div class="kpi">
        <div class="val">10 - 500 Postes</div>
        <div class="lbl">Simulation TCO Temps Réel</div>
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(ogTempHtml, ogHtml, 'utf8');

spawnSync(chromePath, [
  '--headless=new',
  `--screenshot=${ogTempPng}`,
  '--window-size=1200,630',
  '--hide-scrollbars',
  '--disable-gpu',
  ogTempHtml
]);

if (fs.existsSync(ogTempHtml)) {
  fs.unlinkSync(ogTempHtml);
}

if (fs.existsSync(ogTempPng)) {
  await sharp(ogTempPng).webp({ quality: 92 }).toFile(ogOutWebp);
  fs.unlinkSync(ogTempPng);
  console.log(`[BRAND-ASSETS] Image OpenGraph générée : ${ogOutWebp} (${fs.statSync(ogOutWebp).size} octets)`);
} else {
  console.error('Erreur lors de la génération de og-cover.webp');
  process.exit(1);
}
