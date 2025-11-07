# Guide Utilisateur des Skills CCPM

> Transformez votre workflow de développement avec 8 skills spécialisés qui automatisent et optimisent le cycle complet de création de fonctionnalités.

---

## 📚 Table des Matières

1. [Introduction](#introduction)
2. [Vue d'Ensemble des Skills](#vue-densemble-des-skills)
3. [Guide de Démarrage Rapide](#guide-de-démarrage-rapide)
4. [Référence des Skills](#référence-des-skills)
5. [Workflows Recommandés](#workflows-recommandés)
6. [FAQ](#faq)
7. [Dépannage](#dépannage)

---

## Introduction

### Qu'est-ce que les Skills CCPM?

Les **Skills CCPM** sont 8 assistants AI spécialisés qui transforment les 38 commandes slash CCPM en une expérience fluide et intelligente. Chaque skill est un expert dans son domaine et travaille avec vous pour maximiser votre productivité.

### Pourquoi utiliser les Skills?

**Avant les Skills:**
```
Vous: Je dois mémoriser 38 commandes différentes
     Je dois comprendre l'ordre exact des opérations
     Je dois gérer manuellement les dépendances
     J'exécute les tâches une par une (lent)
```

**Avec les Skills:**
```
Vous: "Je veux créer une fonctionnalité de profil utilisateur"
Skill: Guide automatique à travers tout le processus
       Suggestions proactives à chaque étape
       Exécution parallèle automatique (3x plus rapide)
       Validation qualité intégrée
```

### Bénéfices Clés

- ✅ **Moins de charge cognitive**: 8 skills vs 38 commandes
- ✅ **Guidance intelligente**: Le skill sait ce dont vous avez besoin
- ✅ **Vitesse maximale**: Exécution parallèle automatique
- ✅ **Qualité garantie**: Validation à chaque étape
- ✅ **Onboarding rapide**: Tutoriels interactifs intégrés

---

## Vue d'Ensemble des Skills

### Les 8 Skills CCPM

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│              🎭 CCPM Workflow Orchestrator                │
│                   (Chef d'orchestre)                       │
│                                                            │
└──────────────────────┬─────────────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ 💡 PRD   │ │ 🏗️ Epic  │ │ 💼 Guide │
    │ Expert   │ │ Planner  │ │ Helper   │
    └──────────┘ └──────────┘ └──────────┘
          │            │            │
          ▼            ▼            ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ 🔄 GitHub│ │ ⚡ Parallel│ │ 🛡️ Quality│
    │ Sync     │ │ Executor │ │ Guardian │
    └──────────┘ └──────────┘ └──────────┘
                       │
                       ▼
                 ┌──────────┐
                 │ 📚 Context│
                 │ Curator  │
                 └──────────┘
```

### Matrice des Skills

| Skill | Quand l'utiliser | Temps gagné | Difficulté |
|-------|------------------|-------------|------------|
| 🎭 **Workflow Orchestrator** | À tout moment, point d'entrée principal | 30% | Facile |
| 💡 **PRD Expert** | Création de nouvelles fonctionnalités | 60% | Facile |
| 🏗️ **Epic Planner** | Planification technique | 50% | Moyen |
| ⚡ **Parallel Executor** | Exécution de tâches complexes | 200%+ | Auto |
| 🔄 **GitHub Sync** | Synchronisation avec GitHub | 40% | Facile |
| 🛡️ **Quality Guardian** | Avant de merger du code | 80% | Auto |
| 📚 **Context Curator** | Setup projet ou mise à jour doc | 70% | Facile |
| 💼 **Developer Guide** | Apprentissage ou dépannage | N/A | Facile |

---

## Guide de Démarrage Rapide

### Installation

Les skills sont disponibles après l'installation de CCPM:

```bash
# Installer CCPM (si pas déjà fait)
curl -sSL https://automaze.io/ccpm/install | bash

# Les skills sont automatiquement disponibles
# Pas d'installation supplémentaire nécessaire!
```

### Votre Première Fonctionnalité avec les Skills

**Temps estimé: 15 minutes**

#### 1. Démarrer avec le Workflow Orchestrator

```
Vous: "Je veux créer une fonctionnalité de recherche de produits"

🎭 Workflow Orchestrator:
"Je vais vous guider! Commençons par un PRD complet.
Je lance le skill PRD Expert pour vous..."
```

#### 2. Le PRD Expert prend le relais

```
💡 PRD Expert:
"Explorons cette fonctionnalité ensemble.

Question 1: Quel problème la recherche résout-elle?
Question 2: Qui sont les utilisateurs cibles?
Question 3: Quelles sont les fonctionnalités essentielles vs nice-to-have?
..."

[Après le brainstorming]
"✅ PRD créé: .claude/prds/product-search.md

Highlights:
- 3 user stories
- 8 functional requirements
- Success metrics: Search < 300ms, 70% success rate

Prêt pour la planification technique?"
```

#### 3. L'Epic Planner structure l'implémentation

```
🏗️ Epic Planner:
"Analysant votre PRD...

Approche technique recommandée:
- Backend: Elasticsearch pour la recherche
- Frontend: React avec debouncing
- 8 tâches identifiées (12h total, 5h avec parallélisation)

Tâches parallélisables:
- Stream 1: API (4h)
- Stream 2: UI (3h)
- Stream 3: Tests (2h)

✅ Epic créé avec 8 tâches optimisées pour parallélisation"
```

#### 4. GitHub Sync gère l'intégration

```
🔄 GitHub Sync:
"Synchronisation vers GitHub...

✅ Epic créé: Issue #234
✅ 8 sub-issues créées: #235-#242
✅ Worktree créé: ../epic-product-search/
✅ Fichiers renommés: 001.md → 235.md

Prêt à exécuter!"
```

#### 5. Parallel Executor fait le travail

```
⚡ Parallel Executor:
"Lancement de 3 agents parallèles...

Stream 1 (API): Démarré
Stream 2 (UI): Démarré
Stream 3 (Tests): Démarré

[5 heures plus tard]

✅ Exécution parallèle terminée!

3/3 streams complétés avec succès
Temps économisé: 7h (58% plus rapide)

15 fichiers modifiés
32 tests passés
Prêt pour review!"
```

#### 6. Quality Guardian valide

```
🛡️ Quality Guardian:
"Analyse du code contre les spécifications...

✅ Toutes les acceptance criteria validées
✅ Aucun scope creep détecté
✅ Patterns du projet respectés
✅ Sécurité: Aucune vulnérabilité
✅ Performance: Recherche en 180ms (target: 300ms)
✅ Tests: 94% coverage

Code Quality Score: 96/100

Recommandation: APPROUVÉ pour merge"
```

### Résultat

**Sans Skills:**
- 38 commandes à mémoriser
- 12 heures de développement
- Risque d'oublier des requirements
- Revue manuelle laborieuse

**Avec Skills:**
- Guidage automatique
- 5 heures de développement (58% plus rapide)
- 100% des requirements couverts
- Validation qualité automatique

---

## Référence des Skills

### 🎭 CCPM Workflow Orchestrator

**Nom du skill:** `ccpm:workflow`

**Rôle:** Chef d'orchestre qui guide à travers tout le workflow CCPM.

**Quand l'utiliser:**
- ✅ Démarrage d'un nouveau projet
- ✅ "Où en suis-je?" / "Que faire ensuite?"
- ✅ Navigation dans le workflow sans connaître les commandes
- ✅ Point d'entrée principal pour toute tâche

**Comment l'utiliser:**

```
# Demande générale - le skill détecte le contexte
"Je veux commencer une nouvelle fonctionnalité"
"Qu'est-ce que je dois faire ensuite?"
"Montre-moi le statut du projet"

# Le skill analyse automatiquement:
# - État actuel (PRDs, Epics, Tasks)
# - Dernières actions
# - Prochaines étapes recommandées
```

**Exemples concrets:**

**Exemple 1: Nouveau projet**
```
Vous: "Je commence un nouveau projet"

🎭 Orchestrator:
"🚀 Nouveau Projet Détecté

Aucune structure CCPM trouvée. Je vais initialiser:

Étapes:
1. Créer structure .claude/
2. Initialiser contexte projet
3. Configurer GitHub (optionnel)

Démarrons? [Oui/Non]"
```

**Exemple 2: En cours de développement**
```
Vous: "Statut du projet"

🎭 Orchestrator:
"📊 Dashboard CCPM

Epics Actifs: 2
- user-authentication (60% - 3/5 tâches)
- product-search (0% - prêt à démarrer)

Prochaine Action Recommandée:
→ Continuer user-authentication, tâche #127 prête
→ Ou démarrer product-search en parallèle

Que préférez-vous?"
```

**Ce que le skill fait pour vous:**
- ✅ Détecte automatiquement votre phase actuelle
- ✅ Suggère la prochaine action optimale
- ✅ Route vers le skill approprié
- ✅ Fournit un dashboard en temps réel

---

### 💡 PRD Brainstorming Expert

**Nom du skill:** `ccpm:prd-brainstorm`

**Rôle:** Expert produit qui crée des PRDs complets via brainstorming structuré.

**Quand l'utiliser:**
- ✅ Nouvelle fonctionnalité à spécifier
- ✅ Idée floue à clarifier
- ✅ Besoin de capturer des requirements complets
- ✅ Validation d'une idée produit

**Comment l'utiliser:**

```
# Invocation simple
"Je veux créer un PRD pour [fonctionnalité]"
"Aide-moi à brainstormer [idée]"

# Le skill guide avec des questions ciblées
```

**Exemples concrets:**

**Exemple: Création d'un PRD**
```
Vous: "Je veux ajouter un système de notifications"

💡 PRD Expert:
"Parfait! Explorons cette fonctionnalité ensemble.

🎯 Le Problème
Q1: Quel problème les notifications résolvent-elles?
Vous: Les utilisateurs ne savent pas quand il y a une activité

Q2: Comment gèrent-ils ça aujourd'hui?
Vous: Ils doivent rafraîchir manuellement

Q3: Combien de fois par jour en moyenne?
Vous: Probablement 20-30 fois pour les users actifs

💡 Insight: C'est frustrant et inefficace!

👥 Les Utilisateurs
Q4: Qui bénéficie le plus des notifications?
Vous: Les vendeurs et les acheteurs

Q5: Quels types de notifications sont critiques vs nice-to-have?
..."

[30 questions plus tard]

"✅ PRD Créé: .claude/prds/notification-system.md

Résumé:
- 5 user stories détaillées
- 12 functional requirements
- 6 non-functional requirements (temps réel < 2s)
- Success metrics: 80% d'engagement, 90% delivery rate
- Out of scope: Email notifications (v2), SMS (v3)

Points forts:
🎯 Problème clairement défini avec données
👤 3 personas avec scénarios spécifiques
📊 Metrics mesurables et ambitieux

Prêt pour la planification technique?"
```

**Ce que le skill fait pour vous:**
- ✅ Pose les bonnes questions (que vous n'auriez pas pensé poser)
- ✅ Explore les edge cases et scénarios
- ✅ Identifie les contraintes et dépendances
- ✅ Génère un PRD structuré et complet
- ✅ Valide que les success criteria sont mesurables

**Temps typique:** 30-45 minutes (vs 2-3 heures manuellement)

---

### 🏗️ Technical Epic Planner

**Nom du skill:** `ccpm:epic-planner`

**Rôle:** Architecte technique qui transforme PRDs en plans d'implémentation.

**Quand l'utiliser:**
- ✅ Transformer un PRD en epic technique
- ✅ Besoin de décomposer en tâches
- ✅ Planifier l'architecture d'une fonctionnalité
- ✅ Optimiser la parallélisation

**Comment l'utiliser:**

```
"Crée un epic pour [prd-name]"
"Planifie l'implémentation de [feature]"
```

**Exemples concrets:**

**Exemple: Planification d'un Epic**
```
Vous: "Crée un epic pour le système de notifications"

🏗️ Epic Planner:
"Analysant le PRD...

📋 PRD: notification-system.md
   - 5 user stories
   - 12 functional requirements
   - Temps réel requis (< 2s)

🔍 Analysant le codebase...
   - Architecture existante: React + Node.js + PostgreSQL
   - Pattern détecté: Event-driven
   - Websockets déjà utilisés: Non

💡 Approche Technique Recommandée:

Architecture:
┌─────────────┐
│   Frontend  │ ← WebSocket ─┐
│   (React)   │              │
└─────────────┘              │
                             │
┌─────────────┐         ┌────▼────┐
│   Backend   │ ←────── │ Socket  │
│  (Node.js)  │         │ Server  │
└──────┬──────┘         └─────────┘
       │
┌──────▼──────┐
│  PostgreSQL │
│ + Redis     │
└─────────────┘

Décisions Techniques:
1. Socket.io pour WebSockets
   Pourquoi: Mature, fallback automatique
   Alternative considérée: ws (trop bas niveau)

2. Redis pour pub/sub
   Pourquoi: Scaling multi-instances
   Alternative: PostgreSQL LISTEN/NOTIFY (ne scale pas)

3. Notification table + événements
   Schema: id, user_id, type, data, read, created_at

📦 Décomposition en Tâches:

8 tâches identifiées:

Database Layer (3h):
001: Schema notification table + migrations
002: Repository pattern pour notifications

Backend API (5h):
003: Socket.io server setup
004: Notification service + pub/sub
005: REST API endpoints (mark read, delete)

Frontend (6h):
006: NotificationBell component
007: WebSocket client integration
008: Toast notification display

Testing (4h):
009: Unit tests backend
010: Integration tests WebSocket
011: E2E notification flow

⚡ Optimisation Parallélisation:

Streams Parallèles:
- Stream 1: Tasks 001-002 (Database) → 3h
- Stream 2: Tasks 003-005 (Backend) → 5h (après 001)
- Stream 3: Tasks 006-008 (Frontend) → 6h (après 003)
- Stream 4: Tasks 009-011 (Tests) → 4h (après all)

Temps Sequential: 18h
Temps Parallel: 8h (56% plus rapide)

✅ Epic créé: .claude/epics/notification-system/epic.md
✅ 11 tâches créées avec dépendances optimales

Voulez-vous que je synchronise vers GitHub?"
```

**Ce que le skill fait pour vous:**
- ✅ Analyse le PRD et extrait requirements techniques
- ✅ Propose une architecture adaptée au codebase existant
- ✅ Décompose en tâches optimales (2-8h chacune)
- ✅ Identifie dépendances et opportunités de parallélisation
- ✅ Estime l'effort et le temps avec/sans parallélisation

**Temps typique:** 15-20 minutes (vs 2-4 heures manuellement)

---

### ⚡ Parallel Execution Coordinator

**Nom du skill:** `ccpm:parallel-exec`

**Rôle:** Orchestrateur qui exécute plusieurs agents AI simultanément.

**Quand l'utiliser:**
- ✅ Tâche avec multiples composants (DB + API + UI)
- ✅ Besoin de vitesse maximale
- ✅ Travail parallélisable identifié
- ✅ Epic avec plusieurs streams indépendants

**Comment l'utiliser:**

```
"Exécute la tâche #123 en parallèle"
"Démarre le travail sur [epic-name]"
```

**Exemples concrets:**

**Exemple: Exécution parallèle**
```
Vous: "Démarre le travail sur notification-system"

⚡ Parallel Executor:
"Analysant l'epic notification-system...

📋 Tâches disponibles:
   - #235: Database schema (prêt)
   - #236: Repository layer (dépend #235)
   - #237: Socket.io setup (prêt)
   - #238-242: Autres tâches

🔍 Analyse des Work Streams:

Stream 1: Database Layer
  - Tâche: #235
  - Fichiers: migrations/, models/notification.js
  - Durée estimée: 3h
  - Dépendances: Aucune ✓

Stream 2: Backend Setup
  - Tâche: #237
  - Fichiers: server.js, socket/index.js
  - Durée estimée: 2h
  - Dépendances: Aucune ✓

🎯 Stratégie:
Lancer Streams 1 et 2 en parallèle

🚀 Lancement des agents...

┌─────────────────────────────┐
│ Agent 1: Database Layer     │
│ Tâche: #235                 │
│ Statut: Démarré             │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Agent 2: Backend Setup      │
│ Tâche: #237                 │
│ Statut: Démarré             │
└─────────────────────────────┘

Monitoring... (cela peut prendre quelques minutes)

[3 heures plus tard]

✅ Exécution Parallèle Terminée!

═══════════════════════════════
Stream 1: Database Layer ✅
═══════════════════════════════

Complété:
- ✅ Created migration: 20250106_create_notifications.sql
- ✅ Implemented Notification model
- ✅ Added indexes for user_id and created_at

Fichiers modifiés:
- migrations/20250106_create_notifications.sql
- models/notification.js
- models/index.js

Tests:
- ✅ 8/8 tests passing
- Coverage: 92%

Commits:
- abc123: Issue #235: Add notifications table migration
- def456: Issue #235: Implement Notification model

═══════════════════════════════
Stream 2: Backend Setup ✅
═══════════════════════════════

Complété:
- ✅ Installed socket.io dependency
- ✅ Created WebSocket server
- ✅ Integrated with Express app

Fichiers modifiés:
- package.json
- server.js
- socket/index.js
- socket/handlers/notification.js

Tests:
- ✅ 6/6 tests passing
- Coverage: 88%

Commits:
- ghi789: Issue #237: Add socket.io server setup
- jkl012: Issue #237: Create notification socket handlers

═══════════════════════════════
📊 Résumé Global
═══════════════════════════════

Statut: ✅ Complet
Streams: 2/2 complétés avec succès
Temps: 3h (vs 5h séquentiel)
Gain: 40% plus rapide

Fichiers modifiés: 8
Commits totaux: 4
Tests: 14/14 passing
Coverage globale: 90%

Git Status:
- Branch: epic-notification-system
- Ahead of main: 4 commits
- Working tree: Clean ✓

═══════════════════════════════
🎯 Prochaines Actions
═══════════════════════════════

Tâches maintenant disponibles:
- #236: Repository layer (déblocée)
- #238: Notification service (déblocée)

Options:
1. Continuer avec Stream 3 (Backend API)
2. Faire une review intermédiaire
3. Créer un PR pour ce qui est fait

Que préférez-vous?"
```

**Ce que le skill fait pour vous:**
- ✅ Identifie automatiquement les work streams parallélisables
- ✅ Spawne et coordonne plusieurs agents AI
- ✅ Gère les conflits de fichiers
- ✅ Consolide les résultats
- ✅ Protège la conversation principale du bruit

**Gain de temps:** 40-70% plus rapide que l'exécution séquentielle

---

### 🔄 GitHub Sync Manager

**Nom du skill:** `ccpm:github-sync`

**Rôle:** Gestionnaire bidirectionnel local ↔ GitHub.

**Quand l'utiliser:**
- ✅ Publier un epic vers GitHub
- ✅ Importer des issues GitHub vers local
- ✅ Synchroniser les updates
- ✅ Gérer les worktrees

**Comment l'utiliser:**

```
"Sync [epic-name] to GitHub"
"Import issue #123 from GitHub"
"Sync updates for task #456"
```

**Exemples concrets:**

**Exemple: Sync vers GitHub**
```
Vous: "Sync notification-system to GitHub"

🔄 GitHub Sync:
"🔍 Préparation du sync...

Validation:
✅ gh CLI installé et authentifié
✅ Repository: yourusername/yourproject
✅ Labels requis présents (epic, task)
✅ Epic a 11 tâches prêtes

📤 Création de l'Epic GitHub...

✅ Epic créé: Issue #234
   URL: https://github.com/you/project/issues/234
   Labels: epic, epic:notification-system, feature

📤 Création des Sub-Issues...

Progress: [████████████████████] 11/11

✅ Sub-issues créées:
   #235: Database schema
   #236: Repository layer
   #237: Socket.io setup
   #238: Notification service
   #239: REST API endpoints
   #240: NotificationBell component
   #241: WebSocket client
   #242: Toast display
   #243: Unit tests backend
   #244: Integration tests
   #245: E2E tests

🔄 Renommage des fichiers locaux...

Mapping:
   001.md → 235.md ✓
   002.md → 236.md ✓
   003.md → 237.md ✓
   004.md → 238.md ✓
   005.md → 239.md ✓
   006.md → 240.md ✓
   007.md → 241.md ✓
   008.md → 242.md ✓
   009.md → 243.md ✓
   010.md → 244.md ✓
   011.md → 245.md ✓

✅ Références croisées mises à jour
✅ Frontmatter updated avec GitHub URLs

🌳 Création du Worktree...

✅ Worktree créé: ../epic-notification-system/
   Branch: epic-notification-system
   Status: Clean, prêt pour le développement

═══════════════════════════════
✅ Sync Terminé
═══════════════════════════════

Epic: #234
Sub-issues: #235-#245 (11 tâches)
Worktree: ../epic-notification-system/

Voir sur GitHub:
https://github.com/you/project/issues/234

Démarrer le travail:
cd ../epic-notification-system/

Prêt à exécuter avec ccpm:parallel-exec!"
```

**Ce que le skill fait pour vous:**
- ✅ Crée automatiquement epic + sub-issues GitHub
- ✅ Renomme intelligemment les fichiers locaux
- ✅ Met à jour toutes les références croisées
- ✅ Crée un worktree Git isolé
- ✅ Gère les labels et metadata

**Temps typique:** 2-3 minutes (vs 30-45 minutes manuellement)

---

### 🛡️ Code Quality Guardian

**Nom du skill:** `ccpm:quality-guardian`

**Rôle:** Validateur qui vérifie que code = spec.

**Quand l'utiliser:**
- ✅ Avant de merger un PR
- ✅ Validation qu'une tâche est terminée
- ✅ Review de code proactive
- ✅ Détection de scope creep

**Comment l'utiliser:**

```
"Review PR #123"
"Valide le code pour task #456"
"Check si issue #789 est terminé"
```

**Exemples concrets:**

**Exemple: Review de code**
```
Vous: "Review PR #123 pour la notification"

🛡️ Quality Guardian:
"🔍 Chargement des spécifications...

✅ PRD: notification-system.md
✅ Epic: notification-system/epic.md
✅ Task: #235 - Database schema

📋 Extraction des requirements:
   - FR-1: Table notifications avec user_id, type, data
   - FR-2: Index sur user_id pour performance
   - NFR-P-1: Query < 100ms pour fetch
   - AC-1: Migration réversible
   - AC-2: Tests de validation

🔍 Analyse du code...

Files changed: 3
   - migrations/20250106_create_notifications.sql
   - models/notification.js
   - models/notification.test.js

═══════════════════════════════
✅ Traçabilité Requirements
═══════════════════════════════

Change: CREATE TABLE notifications
Location: migrations/20250106_create_notifications.sql:5
Traces to:
   ✅ PRD FR-1: "Store notifications with user, type, data"
   ✅ Epic: "PostgreSQL table with JSONB for data"
   ✅ Task AC-1: "Create table with required fields"

Change: INDEX idx_notifications_user_id
Location: migrations/20250106_create_notifications.sql:15
Traces to:
   ✅ PRD NFR-P-1: "Fast lookup by user"
   ✅ Epic: "Index on user_id for query performance"

Change: Notification.findByUser() method
Location: models/notification.js:42
Traces to:
   ✅ Task AC-2: "Query method for user notifications"

⚠️ SCOPE CREEP DETECTED:

Change: Notification.markAllRead() method
Location: models/notification.js:67
Traces to:
   ❌ NOT found in PRD, Epic, or Task

Analysis:
   This feature was not specified in requirements.
   While potentially useful, it's scope creep.

Recommendation:
   1. Remove and create separate task
   2. Or add to PRD retroactively (if approved)

═══════════════════════════════
✅ Acceptance Criteria
═══════════════════════════════

AC-1: Migration is reversible
   ✅ DOWN migration present
   Verified: migrations/20250106_create_notifications.sql:25

AC-2: Tests for validation
   ✅ 8 tests written
   Coverage: 92%
   All passing ✅

AC-3: Performance requirement
   ✅ Index on user_id created
   Estimated query time: ~15ms (target: <100ms)

═══════════════════════════════
🔒 Security Review
═══════════════════════════════

✅ No SQL injection (using parameterized queries)
✅ No sensitive data exposure
⚠️ JSONB 'data' field unconstrained
   Recommendation: Add JSON schema validation

═══════════════════════════════
⚡ Performance Review
═══════════════════════════════

✅ Index on user_id (good)
✅ Index on created_at for sorting
⚠️ No pagination implemented
   Risk: Large result sets could slow down
   Recommendation: Add LIMIT/OFFSET support

═══════════════════════════════
📊 Code Quality Score: 88/100
═══════════════════════════════

Breakdown:
   ✅ Requirements Coverage: 95% (1 scope creep)
   ✅ Acceptance Criteria: 100%
   ✅ Code Patterns: 90% (minor deviations)
   ⚠️ Security: 85% (JSON validation missing)
   ⚠️ Performance: 80% (pagination missing)
   ✅ Testing: 95%

═══════════════════════════════
🎯 Recommandations
═══════════════════════════════

AVANT MERGE (Bloquant):
1. ❌ Retirer markAllRead() ou l'ajouter au spec
2. ⚠️ Ajouter JSON schema validation pour 'data'

APRÈS MERGE (Suivi):
1. Créer task pour pagination
2. Considérer bulk operations (performance)

═══════════════════════════════
Statut Final
═══════════════════════════════

⚠️ APPROUVÉ AVEC RÉSERVES

Action requise:
   Adresser les 2 points bloquants ci-dessus

Une fois fait, re-review ou merge!"
```

**Ce que le skill fait pour vous:**
- ✅ Trace chaque changement au requirement source
- ✅ Détecte le scope creep (features non spécifiées)
- ✅ Valide les acceptance criteria
- ✅ Review sécurité et performance
- ✅ Fournit un score qualité objectif

**Temps typique:** 5-10 minutes (vs 30-60 minutes de review manuelle)

---

### 📚 Context Curator

**Nom du skill:** `ccpm:context-curator`

**Rôle:** Gestionnaire de contexte projet evidence-based.

**Quand l'utiliser:**
- ✅ Setup d'un nouveau projet
- ✅ Onboarding nouveau développeur
- ✅ Mise à jour de la documentation
- ✅ Audit de l'architecture

**Comment l'utiliser:**

```
"Crée le contexte projet"
"Update la documentation"
"Analyse l'architecture actuelle"
```

**Exemples concrets:**

**Exemple: Création de contexte**
```
Vous: "Crée le contexte pour ce projet"

📚 Context Curator:
"🔍 Exploration du projet...

Détection:
✅ Type: Node.js web application
   Evidence: package.json présent
✅ Framework: Express + React
   Evidence: dependencies in package.json
✅ Database: PostgreSQL
   Evidence: pg package, migrations/ directory
✅ Tests: Jest
   Evidence: jest.config.js, test files

📂 Analysant la structure...

Source: src/ (1,247 files)
   - api/ (23 files) - REST endpoints
   - components/ (45 files) - React components
   - services/ (12 files) - Business logic
   - models/ (8 files) - Data models

Tests: tests/ (156 files, 87% coverage)

📝 Création des fichiers de contexte...

Generating:
[████████████████████] 9/9 files

✅ .claude/context/project-overview.md
   - Type, purpose, features (verified)
   - Tech stack with evidence

✅ .claude/context/architecture.md
   - 3-tier architecture detected
   - Data flow documented
   - External dependencies mapped

✅ .claude/context/codebase-structure.md
   - Directory tree with purpose
   - File naming conventions
   - Module dependencies

✅ .claude/context/development-setup.md
   - Prerequisites (Node 18.x)
   - Setup steps (verified)
   - Environment variables

✅ .claude/context/testing-strategy.md
   - Jest configuration
   - Test patterns
   - Coverage targets

✅ .claude/context/deployment-process.md
   ⚠️ No CI/CD config found
   Documented: Manual deployment process

✅ .claude/context/api-patterns.md
   - 18 REST endpoints documented
   - Request/response patterns
   - Error handling conventions

✅ .claude/context/database-schema.md
   - 8 tables mapped
   - Relationships documented
   - Migration strategy

✅ .claude/context/tech-stack.md
   - Runtime: Node.js 18.17.0
   - Dependencies: 47 production, 23 dev
   - Framework versions

═══════════════════════════════
✅ Contexte Créé
═══════════════════════════════

9 fichiers de contexte
Confidence: High (87% verified with code)
Assumptions flagged: 12
Unknowns identified: 5

Evidence-Based:
   ✅ Chaque claim a une référence code
   ✅ Assumptions marquées avec ⚠️
   ✅ Unknowns marqués avec ❓

Exemples d'assumptions:
   ⚠️ Deployment target assumed to be AWS
      Verification needed: Check deployment docs
   ⚠️ Test coverage target assumed 80%
      Not found in config, inferred from practice

Prochaines étapes:
1. Review: Vérifier .claude/context/
2. Clarifier: Résoudre les unknowns
3. Utiliser: /context:prime pour charger

Context prêt pour onboarding et développement!"
```

**Ce que le skill fait pour vous:**
- ✅ Explore automatiquement le codebase
- ✅ Crée 9 fichiers de contexte structurés
- ✅ Vérifie chaque affirmation avec du code
- ✅ Flagge les assumptions et unknowns
- ✅ Maintient la fraîcheur du contexte

**Temps typique:** 10-15 minutes (vs 4-8 heures manuellement)

---

### 💼 CCPM Developer Guide Helper

**Nom du skill:** `ccpm:developer-guide`

**Rôle:** Guide interactif pour apprendre et maîtriser CCPM.

**Quand l'utiliser:**
- ✅ Apprentissage du workflow CCPM
- ✅ Besoin d'aide ou troubleshooting
- ✅ Comprendre un concept spécifique
- ✅ Découvrir les best practices

**Comment l'utiliser:**

```
"Comment fonctionne CCPM?"
"Help: je suis bloqué sur [problème]"
"Explique-moi [concept]"
"Montre-moi un exemple de [tâche]"
```

**Exemples concrets:**

**Exemple 1: Tutorial**
```
Vous: "Comment démarrer avec CCPM?"

💼 Developer Guide:
"🎓 Tutorial CCPM - Démarrage Rapide

Durée: 15 minutes
Niveau: Débutant

Vous allez apprendre:
✅ Les 5 phases du workflow CCPM
✅ Créer votre première fonctionnalité
✅ Utiliser les skills pour aller plus vite

Prêt? Commençons!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Étape 1/5: Le PRD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

En CCPM, tout commence par un PRD (Product Requirements Document).

Pourquoi?
   Parce que CHAQUE ligne de code doit tracer
   à un requirement. Pas de 'vibe coding'!

Essayons avec une fonctionnalité simple:
   'Bouton J'aime sur les posts'

Utilisez le skill PRD Expert:
   Vous: 'Je veux créer un PRD pour like-button'

Le skill vous posera ~15 questions pour
explorer la fonctionnalité en profondeur.

Répondez honnêtement, il n'y a pas de
mauvaise réponse!

[Attendez que l'utilisateur essaie]

Fait? Parfait! Passons à l'étape 2..."
```

**Exemple 2: Troubleshooting**
```
Vous: "Help: gh CLI not authenticated"

💼 Developer Guide:
"🔧 Diagnostic: GitHub Authentication

Symptômes:
   ❌ Error: gh: not authenticated

Cause:
   GitHub CLI n'est pas authentifié avec votre compte

Solution:
   Étape 1: Vérifier le statut
   ```bash
   gh auth status
   ```

   Étape 2: S'authentifier
   ```bash
   gh auth login
   ```

   Étape 3: Suivre les prompts
   - Choisir: GitHub.com
   - Méthode: Browser (plus facile)
   - Permissions: Toutes (pour CCPM)

   Étape 4: Vérifier
   ```bash
   gh auth status
   # Devrait afficher: Logged in to github.com as yourname
   ```

Commun aussi:
   - Token expiré → Re-run gh auth login
   - Permissions insuffisantes → Regenerate token

Essayez et dites-moi si ça marche!"
```

**Exemple 3: Concept**
```
Vous: "Explique-moi les worktrees"

💼 Developer Guide:
"📚 Concept: Git Worktrees

Imagine que vous travaillez sur 2 fonctionnalités:
   - Fonctionnalité A: Presque finie
   - Fonctionnalité B: Juste commencée

Problème Sans Worktree:
   ```
   main branch/
   ├── feature-a (WIP commits)
   └── feature-b (conflicts with A)

   Aïe! Tout est mélangé 😱
   ```

Solution Avec Worktree:
   ```
   your-project/           ← main (propre)
   ../epic-feature-a/      ← worktree A
   ../epic-feature-b/      ← worktree B

   Chaque feature isolée! 🎉
   ```

Comment CCPM l'utilise:
   1. /pm:epic-sync crée automatiquement:
      ../epic-{nom}/ sur branch epic-{nom}

   2. Vous travaillez dedans:
      cd ../epic-feature-a
      [faites vos commits]

   3. Main reste propre

   4. Quand fini, merge:
      git checkout main
      git merge epic-feature-a

   5. Cleanup:
      git worktree remove ../epic-feature-a

Bénéfices:
   ✅ Isolation complète
   ✅ Switching rapide (cd ../)
   ✅ Main toujours stable
   ✅ Parallélisation naturelle

Essayez:
   Créez un epic et voyez le worktree créé!
   /pm:epic-sync {votre-epic}
   ls ../epic-*

Questions?"
```

**Ce que le skill fait pour vous:**
- ✅ Tutoriels interactifs pas-à-pas
- ✅ Troubleshooting guidé avec solutions
- ✅ Explications claires avec exemples
- ✅ Best practices contextuelles
- ✅ Cheat sheets et références rapides

---

## Workflows Recommandés

### Workflow 1: Nouvelle Fonctionnalité (Complet)

**Durée totale: 30 min setup + développement**

```
1. 🎭 Workflow Orchestrator
   "Je veux créer [feature]"
   ↓

2. 💡 PRD Expert (30 min)
   Brainstorming + PRD complet
   ↓

3. 🏗️ Epic Planner (15 min)
   Plan technique + décomposition
   ↓

4. 🔄 GitHub Sync (2 min)
   Création issues + worktree
   ↓

5. ⚡ Parallel Executor (dev time)
   Exécution avec agents parallèles
   ↓

6. 🛡️ Quality Guardian (5 min)
   Validation avant merge
   ↓

7. Merge & Deploy! 🚀
```

### Workflow 2: Quick Feature (Simplifié)

**Pour features simples < 4h**

```
1. 🎭 "Quick feature: [description]"
   Orchestrator détecte → mode simplifié
   ↓

2. 💡 PRD léger (10 min)
   Questions essentielles seulement
   ↓

3. ⚡ Exécution directe
   Pas de décomposition, direct coding
   ↓

4. 🛡️ Quick review
   Validation rapide
```

### Workflow 3: Onboarding Nouveau Projet

```
1. 📚 Context Curator (10 min)
   "Crée le contexte projet"
   ↓

2. 💼 Developer Guide (15 min)
   "Donne-moi un tour du projet"
   ↓

3. 🎭 Workflow Orchestrator
   "Montre-moi les epics actifs"
   ↓

4. Prêt à contribuer!
```

### Workflow 4: Code Review

```
1. 🛡️ Quality Guardian
   "Review PR #123"
   ↓

2. Si issues détectées:
   💼 Developer Guide
   "Comment fix [issue]?"
   ↓

3. Fix + re-review
   ↓

4. Approval ✅
```

---

## FAQ

### Questions Générales

**Q: Dois-je utiliser tous les skills?**

R: Non! Le **Workflow Orchestrator** route automatiquement vers les skills nécessaires. Vous pouvez aussi invoquer directement un skill spécifique.

**Q: Les skills remplacent-ils les commandes slash?**

R: Les skills sont complémentaires. Ils utilisent les commandes slash en arrière-plan mais ajoutent intelligence et guidance.

**Q: Puis-je utiliser CCPM sans GitHub?**

R: Oui! Le **GitHub Sync** skill est optionnel. Vous pouvez travailler en mode local pur.

**Q: Les skills fonctionnent-ils offline?**

R: Le **Workflow Orchestrator**, **PRD Expert**, et **Epic Planner** fonctionnent offline. **GitHub Sync** requiert connexion internet.

### Questions Techniques

**Q: Comment les skills accèdent au code?**

R: Ils utilisent les tools Claude Code standard (Read, Glob, Grep, Bash) avec permissions appropriées.

**Q: Les skills modifient-ils mon code?**

R: Seulement le **Parallel Executor**. Les autres skills sont en lecture seule ou créent/modifient uniquement les fichiers `.claude/`.

**Q: Puis-je personnaliser un skill?**

R: Oui! Les skills sont définis dans `.claude/skills/`. Vous pouvez les modifier ou en créer de nouveaux.

**Q: Les skills gardent-ils mon contexte?**

R: Le **Context Curator** maintient un contexte persistent. Les autres skills sont stateless mais peuvent charger le contexte saved.

### Performance

**Q: Combien de temps prend l'exécution parallèle?**

R: Typiquement 40-70% plus rapide que séquentiel. Par exemple, 12h de travail → 5h avec 3 agents parallèles.

**Q: Combien d'agents peuvent s'exécuter en parallèle?**

R: Le **Parallel Executor** lance jusqu'à 5 agents simultanés (optimal pour performance vs coût).

**Q: Les skills coûtent-ils plus cher en tokens?**

R: Légèrement plus (10-15%) mais le gain de productivité compense largement.

---

## Dépannage

### Problème: Skill ne répond pas

**Symptômes:**
```
Vous: "Use ccpm:workflow"
[Pas de réponse]
```

**Solutions:**
1. Vérifier que le skill existe:
   ```bash
   ls .claude/skills/ccpm-*.md
   ```

2. Vérifier la syntaxe:
   ```
   ✅ "Use ccpm:workflow skill"
   ❌ "Use workflow skill"
   ```

3. Vérifier les tools requis:
   Certains skills nécessitent tools spécifiques

### Problème: "Permission denied"

**Cause:** Skill essaie d'accéder à un fichier sans permission

**Solution:**
```bash
# Vérifier permissions
ls -la .claude/

# Fixer si nécessaire
chmod -R u+rw .claude/
```

### Problème: Parallel execution lente

**Cause:** Trop d'agents ou tâches trop grandes

**Solutions:**
1. Vérifier la taille des tâches (devraient être 2-8h)
2. Limiter à 3-4 agents max
3. S'assurer que tâches sont vraiment indépendantes

### Problème: GitHub sync échoue

**Causes communes:**
- gh CLI not authenticated
- Repository permissions
- Network issues

**Diagnostic:**
```bash
# Test 1: Authentication
gh auth status

# Test 2: Repository access
gh repo view

# Test 3: Network
ping github.com
```

**Fixes:**
```bash
# Re-authenticate
gh auth login

# Check permissions
gh auth refresh -s repo,write:org
```

### Problème: Context devient stale

**Symptômes:** Context Curator retourne info obsolète

**Solution:**
```
"Update project context"

📚 Context Curator refresh le contexte
avec l'état actuel du code
```

**Prévention:**
Update context après changements majeurs (nouvelles dépendances, restructuration)

---

## Ressources Supplémentaires

### Documentation

- **CCPM Core**: [README.md](../README.md)
- **Commandes**: [COMMANDS.md](../COMMANDS.md)
- **Agents**: [AGENTS.md](../AGENTS.md)
- **This guide**: [SKILLS-USER-GUIDE.md](./SKILLS-USER-GUIDE.md)

### Exemples

- **Example PRDs**: `.claude/prds/examples/`
- **Example Epics**: `.claude/epics/examples/`
- **Sample workflows**: `docs/examples/`

### Support

- **Issues**: [GitHub Issues](https://github.com/automazeio/ccpm/issues)
- **Discussions**: [GitHub Discussions](https://github.com/automazeio/ccpm/discussions)
- **Twitter**: [@aroussi](https://x.com/aroussi)

---

## Changelog

### Version 1.0.0 (2025-01-06)
- Initial release des 8 skills CCPM
- Documentation utilisateur complète
- Exemples et tutoriels

---

**Fabriqué avec ❤️ par [Automaze.io](https://automaze.io)**

**License**: MIT
