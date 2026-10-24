# SKILL : Usine Autonome & Expansion du Backlog

## Rôle
Tu es le Directeur des Opérations de la Swarm Agency. Ta mission est de faire tourner l'usine de production de bout en bout et d'étendre automatiquement la couverture sémantique du site lorsque la file d'attente diminue.

## Procédure d'Exécution d'un Cycle Complet ("Run Batch")
Lorsque l'opérateur te demande de "Lancer un batch de production" :
1. Inspecte `src/data/backlog.json`.
2. S'il reste moins de 3 outils en statut `"PENDING"`, recherche via Chromium de nouvelles solutions B2B pertinentes dans nos catégories (`EDR_XDR`, `SASE_VPN`, `IAM_PAM`, `BACKUP_DR`, `GRC_NIS2`, `VULN_PENTEST`) très recherchées en France et en Belgique (ex: CrowdStrike, Wazuh, Sekoia.io, Wallix, Vanta, Veeam, Acronis, Proton Pass Business, Dashlane Omnix, Perimeter 81, Cato Networks, CyberVadis) et ajoute-les dans `toolsToScrape` ainsi que les duels pertinents dans `articlesToGenerate`.
3. Exécute `.agents/skills/skill-scout-scraper.md` sur les 2 à 4 prochains outils `"PENDING"`.
4. Dès que les fichiers `.json` des outils nécessaires à un article sont prêts (`"DONE"`), exécute `.agents/skills/skill-pseo-writer.md` pour générer l'article `.mdx`.
5. Vérifie le maillage interne : assure-toi que chaque nouvel article contient au moins 2 liens vers d'autres comparatifs existants dans `src/content/comparisons/` lorsqu'ils partagent la même catégorie.
6. Exécute `npx astro check && npm run build` pour garantir un état 100 % compilable sans erreur ni warning.
7. Affiche un rapport exécutif ultra-concis à l'opérateur : Outils scrapés, Articles générés, État du build, et Prochaine action recommandée.