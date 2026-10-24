# SKILL : Scout Scraper & NIS2 Compliance Auditor

## Rôle
Tu es un ingénieur d'audit cybersécurité. Ta mission est d'extraire les données techniques, tarifaires et réglementaires exactes des logiciels listés dans `src/data/backlog.json` ayant le statut `PENDING`.

## Procédure d'Exécution Stricte
1. Lis `src/data/backlog.json` et sélectionne le premier outil avec `"status": "PENDING"`.
2. Ouvre le navigateur Chromium intégré et navigue vers l'URL `officialPricingUrl` de l'outil.
3. Si un bandeau de cookies masque la grille tarifaire, ferme-le ou accepte-le.
4. Prends une capture d'écran nette de la grille tarifaire et enregistre-la sous `public/proofs/[id-outil]-pricing.webp`.
5. Cherche sur le site officiel la page Sécurité, Trust Center ou Conformité pour identifier :
   - Le pays de juridiction de l'éditeur (et s'il est européen).
   - Les certifications officielles détenues (ISO 27001, SOC2 Type II, Qualification ANSSI CSPN/SecNumCloud, CCB CyberFundamentals).
   - Le modèle de tarification exact (par endpoint, par utilisateur, minimum de licences).
6. Crée le fichier `src/content/tools/[id-outil].json` en respectant strictement le schéma Zod défini dans `src/content/config.ts`. Si le prix n'est pas public (sur devis uniquement), indique `0` dans `startingPriceMonthlyEur` et `"CUSTOM_QUOTE"` dans `pricingModel`.
7. Exécute `npx astro check` dans le terminal pour vérifier que ton fichier JSON respecte le typage Zod. Corrige toute erreur signalée avant de continuer.
8. Mets à jour `src/data/backlog.json` en passant le statut de cet outil à `"DONE"`.