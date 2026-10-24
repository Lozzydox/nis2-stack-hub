import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const rootDir = process.cwd();
const busPath = path.join(rootDir, 'src/data/swarm-bus.json');
const toolsDir = path.join(rootDir, 'src/content/tools');
const comparisonsDir = path.join(rootDir, 'src/content/comparisons');
const proofsDir = path.join(rootDir, 'public/proofs');

if (!fs.existsSync(busPath)) {
  console.error('Erreur : src/data/swarm-bus.json introuvable.');
  process.exit(1);
}

const bus = JSON.parse(fs.readFileSync(busPath, 'utf8'));

console.log('========================================================================');
console.log('  SWARM SYMPHONY — ORCHESTRATEUR MULTI-AGENTS SYMBIOTIQUE (NIS2-HUB)   ');
console.log('========================================================================\n');

console.log('1. THREADS ACTIFS DANS LE BUS DE MESSAGES :');
for (const thread of bus.activeThreads) {
  console.log(`   [${thread.threadId}] Silo: ${thread.silo} | Statut: ${thread.status}`);
  console.log(`   Cible : ${thread.targetSlug}`);
  console.log(`   Agents: ${thread.participants.join(', ')}`);
  console.log(`   Objet : ${thread.summary}\n`);
}

console.log('2. JOURNAL DES ÉCHANGES INTER-AGENTS (MESSAGE QUEUE) :');
for (const msg of bus.messageQueue) {
  console.log(`   [${msg.messageId}] ${msg.timestamp} | ${msg.fromAgent} -> ${msg.toAgent} [${msg.type}]`);
  if (msg.type === 'REDTEAM_REJECTION' && Array.isArray(msg.payload.reasons)) {
    for (const reason of msg.payload.reasons) {
      console.log(`      Rejet Red-Team : ${reason}`);
    }
  } else if (msg.payload.directive) {
    console.log(`      Directive : ${msg.payload.directive}`);
  } else if (msg.payload.notes) {
    console.log(`      Note : ${msg.payload.notes}`);
  } else if (msg.payload.verdict) {
    console.log(`      Verdict : ${msg.payload.verdict}`);
  } else if (msg.payload.tcoCalculatorStatus) {
    console.log(`      CRO : ${msg.payload.tcoCalculatorStatus}`);
  }
}

console.log('\n3. VÉRIFICATION D INTÉGRITÉ DES SILOS ET PREUVES E-E-A-T :');
const toolFiles = fs.readdirSync(toolsDir).filter((f) => f.endsWith('.json'));
const compFiles = fs.readdirSync(comparisonsDir).filter((f) => f.endsWith('.mdx'));

let missingProofs = 0;
for (const tf of toolFiles) {
  const toolData = JSON.parse(fs.readFileSync(path.join(toolsDir, tf), 'utf8'));
  const expectedProof = path.join(proofsDir, `${toolData.slug}-pricing.webp`);
  if (!fs.existsSync(expectedProof)) {
    console.error(`   [ERREUR] Preuve WebP manquante pour ${toolData.slug}`);
    missingProofs++;
  }
}

console.log(`   - Outils JSON validés      : ${toolFiles.length}`);
console.log(`   - Comparatifs MDX publiés  : ${compFiles.length}`);
console.log(`   - Preuves WebP manquantes  : ${missingProofs}`);
console.log(`   - Taux de rejet Red-Team   : ${bus.swarmMetrics.redTeamRejectionRate} (${bus.swarmMetrics.redTeamRejections} rejet contradictoire résolu)`);

console.log('\n4. COUVERTURE DES 6 SILOS RÉGLEMENTAIRES (ARTICLE 21 NIS2) :');
for (const [siloKey, siloVal] of Object.entries(bus.swarmMetrics.siloCoverage)) {
  console.log(
    `   - ${siloKey.padEnd(14, ' ')} : ${siloVal.toolsCount} outil(s) | ${siloVal.comparisonsCount} comparatif(s) | Statut: ${siloVal.status}`
  );
}

console.log('\n5. EXÉCUTION DU LINTER ANTI-SLOP (scripts/audit-quality.mjs) :');
const auditRes = spawnSync(process.execPath, [path.join(rootDir, 'scripts/audit-quality.mjs')], {
  stdio: 'inherit'
});

if (auditRes.status !== 0 || missingProofs > 0) {
  process.exit(1);
}

console.log('\n[SWARM-SYMPHONY] Synchronisation de l essaim terminée avec succès (Code 0).');
