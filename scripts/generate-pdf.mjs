import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const rootDir = process.cwd();
const toolsDir = path.join(rootDir, 'src/content/tools');
const outPdf = path.join(rootDir, 'public/matrice-homologation-nis2.pdf');
const tempHtml = path.join(rootDir, 'public/_temp-matrice.html');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const toolFiles = fs.readdirSync(toolsDir).filter((f) => f.endsWith('.json'));
const tools = toolFiles.map((f) => JSON.parse(fs.readFileSync(path.join(toolsDir, f), 'utf8')));

const brandEmblemSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2.5L20.5 7.25V16.75L12 21.5L3.5 16.75V7.25L12 2.5Z" stroke="#09090B" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M12 2.5V12M12 12L20.5 7.25M12 12L3.5 7.25M12 12V21.5" stroke="#09090B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.75 9.625L12 12L16.25 9.625V14.375L12 16.75L7.75 14.375V9.625Z" fill="#FAFAFA" stroke="#09090B" stroke-width="1.5" stroke-linejoin="round"/>
  <rect x="10.25" y="10.25" width="3.5" height="3.5" rx="0.75" fill="#059669" />
</svg>`;

const htmlContent = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>Matrice d'Homologation Technique et Financière NIS2 (Article 21)</title>
  <style>
    @page {
      size: A4;
      margin: 14mm;
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #09090b;
      background: #ffffff;
      margin: 0;
      font-size: 10pt;
      line-height: 1.45;
    }
    .header {
      border-bottom: 2px solid #09090b;
      padding-bottom: 10px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .brand-lockup {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .brand-icon {
      width: 30px;
      height: 30px;
      border: 1px solid #d4d4d8;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #fafafa;
    }
    .brand-wordmark {
      font-weight: 800;
      font-size: 10.5pt;
      letter-spacing: -0.02em;
      color: #09090b;
    }
    .brand-slash {
      font-family: ui-monospace, monospace;
      color: #059669;
      margin: 0 3px;
    }
    .badge {
      display: inline-block;
      font-family: ui-monospace, monospace;
      font-size: 8pt;
      padding: 2px 6px;
      border: 1px solid #d4d4d8;
      background: #f4f4f5;
      border-radius: 3px;
      font-weight: 600;
    }
    h1 {
      font-size: 15.5pt;
      margin: 6px 0 2px 0;
      letter-spacing: -0.02em;
    }
    h2 {
      font-size: 11.5pt;
      margin: 14px 0 8px 0;
      padding-bottom: 4px;
      border-bottom: 1px solid #e4e4e7;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    p.sub {
      font-size: 9pt;
      color: #52525b;
      margin: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      font-size: 8.5pt;
    }
    th {
      background: #f4f4f5;
      color: #18181b;
      text-align: left;
      padding: 6px 8px;
      border: 1px solid #d4d4d8;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 7.5pt;
    }
    td {
      padding: 6px 8px;
      border: 1px solid #e4e4e7;
      vertical-align: top;
    }
    tr:nth-child(even) td {
      background: #fafafa;
    }
    .mono {
      font-family: ui-monospace, monospace;
      font-weight: 600;
    }
    .page-break {
      page-break-before: always;
    }
    .footer-note {
      margin-top: 16px;
      padding: 10px;
      border: 1px solid #e4e4e7;
      background: #fafafa;
      font-size: 8.5pt;
      color: #3f3f46;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand-lockup">
        <span class="brand-icon">${brandEmblemSvg}</span>
        <span class="brand-wordmark">NIS2<span class="brand-slash">//</span>STACK HUB</span>
        <span class="badge">DIRECTIVE (UE) 2022/2555 · ANSSI · CCB · DORA</span>
      </div>
      <h1>Matrice d'Homologation Technique & Financière NIS2 (Article 21)</h1>
      <p class="sub">Dossier d'arbitrage budgétaire et de conformité juridictionnelle pour DSI, RSSI et Comités de Direction (Parcs de 20 à 500 postes)</p>
    </div>
    <div style="text-align:right;font-size:8pt;color:#52525b;">
      <strong>NIS2 // STACK HUB</strong><br/>
      Référentiel B2B Vérifié<br/>
      Page 1 / 2
    </div>
  </div>

  <h2>1. Checklist d'Homologation Réglementaire — Article 21.2 Directive NIS2</h2>
  <table>
    <thead>
      <tr>
        <th style="width:14%;">Alinéa NIS2</th>
        <th style="width:28%;">Exigence Réglementaire</th>
        <th style="width:20%;">Silo Technologique</th>
        <th style="width:38%;">Preuve Attendue en Audit (ANSSI / CCB / NCSC)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="mono">Art. 21.2.a</td>
        <td>Politiques d'analyse des risques et de sécurité des SI</td>
        <td class="mono">GRC_NIS2</td>
        <td>Registre des risques à jour (EBIOS RM / ISO 27001), PSSI validée par la direction et suivi des plans d'action.</td>
      </tr>
      <tr>
        <td class="mono">Art. 21.2.b</td>
        <td>Gestion et traitement des incidents de sécurité</td>
        <td class="mono">EDR_XDR</td>
        <td>Télémétrie EDR active sur 100 % des postes et serveurs, procédure de notification 24h/72h et isolation réseau.</td>
      </tr>
      <tr>
        <td class="mono">Art. 21.2.c</td>
        <td>Continuité d'activité, sauvegardes et PRA/PCA</td>
        <td class="mono">BACKUP_DR</td>
        <td>Sauvegardes immuables WORM / Object Lock (règle 3-2-1-1-0) et rapports de tests de restauration trimestriels.</td>
      </tr>
      <tr>
        <td class="mono">Art. 21.2.d</td>
        <td>Sécurité de la chaîne d'approvisionnement (Supply Chain)</td>
        <td class="mono">IAM_PAM / GRC</td>
        <td>Évaluation cyber des sous-traitants, immunité extraterritoriale (Cloud Act) et bastion PAM avec audit vidéo des tiers.</td>
      </tr>
      <tr>
        <td class="mono">Art. 21.2.e</td>
        <td>Gestion et divulgation des vulnérabilités</td>
        <td class="mono">VULN_PENTEST</td>
        <td>Scan continu de la surface d'attaque externe (EASM) et des VLANs internes, SLA de correction des CVE critiques.</td>
      </tr>
      <tr>
        <td class="mono">Art. 21.2.f</td>
        <td>Évaluation de l'efficacité des mesures de gestion des risques</td>
        <td class="mono">GRC_NIS2 / VULN</td>
        <td>Indicateurs de contrôle continu, tests d'intrusion périodiques et tableaux de bord de maturité COMEX.</td>
      </tr>
      <tr>
        <td class="mono">Art. 21.2.g</td>
        <td>Pratiques de base en cyber-hygiène et formation</td>
        <td class="mono">IAM_PAM / EDR</td>
        <td>Éradication des mots de passe réutilisés via coffre-fort d'entreprise (EPM) et durcissement des postes.</td>
      </tr>
      <tr>
        <td class="mono">Art. 21.2.h</td>
        <td>Procédures relatives à la cryptographie et au chiffrement</td>
        <td class="mono">SASE_VPN / IAM</td>
        <td>Tunnels réseau chiffrés de bout en bout (WireGuard / IPsec) et chiffrement Zero-Knowledge des secrets.</td>
      </tr>
      <tr>
        <td class="mono">Art. 21.2.i</td>
        <td>Sécurité des RH, contrôle d'accès et gestion des actifs</td>
        <td class="mono">IAM_PAM / SASE</td>
        <td>Moindre privilège réseau (ZTNA), révocation automatisée (SCIM) et rotation des comptes administrateurs AD.</td>
      </tr>
      <tr>
        <td class="mono">Art. 21.2.j</td>
        <td>Authentification multifacteur (MFA) et flux sécurisés</td>
        <td class="mono">IAM_PAM / SASE</td>
        <td>MFA systématique (TOTP / FIDO2 Passkeys) sur l'ensemble des accès distants, messageries et consoles critiques.</td>
      </tr>
    </tbody>
  </table>

  <div class="footer-note">
    <strong>Note de responsabilité des dirigeants (Article 20 & 32 NIS2) :</strong> Les organes de direction des Entités Essentielles (EE) et Importantes (EI) sont tenus d'approuver les mesures de gestion des risques de cybersécurité et peuvent être tenus personnellement responsables en cas de négligence caractérisée. Plafond des sanctions administratives : jusqu'à 10 000 000 EUR ou 2 % du chiffre d'affaires mondial (EE) et 7 000 000 EUR ou 1,4 % du CA mondial (EI).
  </div>

  <div class="page-break"></div>

  <div class="header">
    <div>
      <div class="brand-lockup">
        <span class="brand-icon">${brandEmblemSvg}</span>
        <span class="brand-wordmark">NIS2<span class="brand-slash">//</span>STACK HUB</span>
        <span class="badge">MATRICE COMPARATIVE DES 13 SOLUTIONS AUDITÉES (6/6 SILOS)</span>
      </div>
      <h1>Référentiel Tarifaire (TCO) & Souveraineté Juridictionnelle</h1>
      <p class="sub">Simulation budgétaire comparative pour parcs de 50 postes et 200 postes (Montants HT vérifiés sous preuve officielle)</p>
    </div>
    <div style="text-align:right;font-size:8pt;color:#52525b;">
      <strong>NIS2 // STACK HUB</strong><br/>
      Page 2 / 2
    </div>
  </div>

  <h2>2. Tableau Récapitulatif des Solutions Technologiques Auditées</h2>
  <table>
    <thead>
      <tr>
        <th>Logiciel</th>
        <th>Silo</th>
        <th>Juridiction</th>
        <th>Statut Cloud Act</th>
        <th>Tarif Unitaire HT</th>
        <th>Min.</th>
        <th>TCO Annuel 50p</th>
        <th>TCO Annuel 200p</th>
      </tr>
    </thead>
    <tbody>
      ${tools
        .map((t) => {
          const isCustom = t.pricingModel === 'CUSTOM_QUOTE' || t.startingPriceMonthlyEur === 0;
          const unitStr = isCustom
            ? 'Sur devis'
            : `${t.startingPriceMonthlyEur.toFixed(2).replace('.', ',')} EUR / m`;
          const eff50 = Math.max(50, t.minimumSeats);
          const eff200 = Math.max(200, t.minimumSeats);
          const tco50 = isCustom
            ? 'Sur devis'
            : `${Math.round(eff50 * t.startingPriceMonthlyEur * 12).toLocaleString('fr-FR')} EUR / an`;
          const tco200 = isCustom
            ? 'Sur devis'
            : `${Math.round(eff200 * t.startingPriceMonthlyEur * 12).toLocaleString('fr-FR')} EUR / an`;
          return `<tr>
            <td><strong>${t.name}</strong></td>
            <td class="mono">${t.category}</td>
            <td>${t.vendorCountry}</td>
            <td>${t.isEuropeanSovereign ? 'Exempt Cloud Act (UE/CH)' : 'Soumis Cloud Act US'}</td>
            <td class="mono">${unitStr}</td>
            <td class="mono">${t.minimumSeats}p</td>
            <td class="mono">${tco50}</td>
            <td class="mono">${tco200}</td>
          </tr>`;
        })
        .join('\n')}
    </tbody>
  </table>

  <h2>3. Architecture Cible Recommandée par Profil d'Entité</h2>
  <table>
    <thead>
      <tr>
        <th style="width:25%;">Profil d'Organisation</th>
        <th style="width:45%;">Pile Technologique Souveraine Recommandée</th>
        <th style="width:30%;">Budget Annuel Global Estimé (Hors GRC)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>PME / Entité Importante (50 postes)</strong><br/>Sans équipe SOC dédiée</td>
        <td>Bitdefender GravityZone (EDR) + NordLayer (ZTNA) + Proton Pass Business (EPM) + Acronis Cyber Protect (Backup) + Intruder (Scan)</td>
        <td class="mono">~16 500 EUR à 22 000 EUR HT / an</td>
      </tr>
      <tr>
        <td><strong>ETI / Entité Essentielle (200 postes)</strong><br/>Exigence ANSSI / Souveraineté stricte</td>
        <td>HarfangLab EDR (Qualifié ANSSI) + Wallix PAM4ALL (Bastion CSPN) + Tenacy (GRC SecNumCloud) + Greenbone Enterprise + Veeam / Acronis</td>
        <td class="mono">Sur devis intégrateur / MSSP (35 000 EUR+ / an)</td>
      </tr>
    </tbody>
  </table>

  <div class="footer-note">
    <strong>Méthodologie d'Audit NIS2 // STACK HUB :</strong> Les prix indiqués correspondent aux tarifs publics d'entrée constatés hors taxes et hors options de stockage volumétrique ou prestations d'intégration sur site. Pour actualiser vos simulations de 10 à 500 postes en temps réel, rendez-vous sur le simulateur interactif en ligne.
  </div>
</body>
</html>`;

fs.writeFileSync(tempHtml, htmlContent, 'utf8');

const res = spawnSync(chromePath, [
  '--headless=new',
  `--print-to-pdf=${outPdf}`,
  '--no-pdf-header-footer',
  '--disable-gpu',
  tempHtml
]);

if (fs.existsSync(tempHtml)) {
  fs.unlinkSync(tempHtml);
}

if (res.status !== 0 || !fs.existsSync(outPdf)) {
  console.error('Erreur lors de la génération du PDF.');
  process.exit(1);
}

console.log(`[PDF-GENERATOR] Matrice PDF générée avec succès : ${outPdf} (${fs.statSync(outPdf).size} octets)`);
