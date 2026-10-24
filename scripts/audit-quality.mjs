import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve(process.cwd(), 'src');

const BANNED_UNICODE_REGEX = /[\u2713\u2714\u2605\u2606\u25CF\u2192\u26A0\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

const BANNED_TAILWIND_CLASSES = [
  'border-l-4',
  'rounded-full',
  'bg-blue-950',
  'bg-slate-950',
  'bg-slate-900'
];

const BANNED_MDX_PHRASES = [
  'Dans le monde numérique actuel',
  'Il est crucial de',
  'En conclusion',
  'Plongeons dans',
  "À l'ère de"
];

function walkFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = walkFiles(SRC_DIR);
const violations = [];

for (const filePath of files) {
  const relPath = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    const unicodeMatch = line.match(BANNED_UNICODE_REGEX);
    if (unicodeMatch) {
      violations.push(
        `[BANNED_UNICODE] ${relPath}:${lineNum} -> Caractère interdit détecté: "${unicodeMatch[0]}"`
      );
    }

    if (filePath.endsWith('.astro') || filePath.endsWith('.css') || filePath.endsWith('.mdx')) {
      for (const bannedClass of BANNED_TAILWIND_CLASSES) {
        if (line.includes(bannedClass)) {
          violations.push(
            `[BANNED_CLASS] ${relPath}:${lineNum} -> Classe Tailwind IA interdite: "${bannedClass}"`
          );
        }
      }
    }

    if (filePath.endsWith('.mdx')) {
      for (const phrase of BANNED_MDX_PHRASES) {
        if (line.toLowerCase().includes(phrase.toLowerCase())) {
          violations.push(
            `[BANNED_PHRASE] ${relPath}:${lineNum} -> Expression IA interdite: "${phrase}"`
          );
        }
      }
    }
  });
}

if (violations.length > 0) {
  console.error('AUDIT QUALITÉ ANTI-SLOP ÉCHOUÉ :');
  for (const v of violations) {
    console.error(`  - ${v}`);
  }
  process.exit(1);
} else {
  console.log(`[AUDIT-QUALITY] ${files.length} fichiers inspectés dans src/ : 0 violation détectée (Swiss B2B Light Mode conforme).`);
}
