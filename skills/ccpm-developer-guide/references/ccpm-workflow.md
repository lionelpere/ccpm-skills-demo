# CCPM Workflow - Les 5 Phases

## Vue d'Ensemble

Le workflow CCPM suit une méthodologie stricte "spec-driven" en 5 phases qui garantit que chaque ligne de code trace à un requirement spécifique.

```
Phase 1: PRD (Product Requirements Document)
   ↓
Phase 2: Epic (Technical Implementation Plan)
   ↓
Phase 3: Tasks (Decomposition)
   ↓
Phase 4: GitHub Sync
   ↓
Phase 5: Execution (Parallel)
```

---

## Phase 1: PRD Creation

**Objectif:** Documenter CE QUI doit être construit et POURQUOI

**Commande:** `/pm:prd-new {feature-name}`

**Durée typique:** 30-45 minutes

**Output:** `.claude/prds/{feature-name}.md`

### Contenu du PRD

Un PRD complet contient:

1. **Executive Summary** - Vue d'ensemble en 2-3 paragraphes
2. **Problem Statement** - Quel problème résoudre et pourquoi maintenant
3. **User Stories** - Personas et scénarios détaillés
4. **Functional Requirements** - Ce que le système doit faire
5. **Non-Functional Requirements** - Performance, sécurité, scalabilité
6. **Success Criteria** - Métriques mesurables
7. **Out of Scope** - Ce qu'on ne construit PAS
8. **Dependencies** - Dépendances externes et internes
9. **Risks & Mitigations** - Risques identifiés avec plans

### Qualité d'un bon PRD

✅ **Bon PRD:**
- Chaque user story a des acceptance criteria testables
- Success metrics sont quantifiables (ex: "< 300ms p95")
- Out of scope explicite
- Assumptions flaggées avec ⚠️

❌ **Mauvais PRD:**
- Vague: "Users want it fast"
- Pas de metrics: "Should be intuitive"
- Pas de scope: "Build everything users want"

### Brainstorming Questions Types

Le processus de brainstorming explore:

**Le Problème:**
- Quel problème spécifique résoudre?
- Qui l'expérimente?
- Comment gèrent-ils aujourd'hui?
- Coût de ne PAS résoudre?

**Les Utilisateurs:**
- Qui bénéficie le plus?
- Quels sont leurs scénarios d'usage?
- Quels sont les edge cases?

**Le Scope:**
- MVP vs nice-to-have?
- Timeline et ressources?
- Dépendances externes?

**Le Succès:**
- Comment mesurer le succès?
- Quels KPIs tracker?
- Qu'est-ce qui indique un échec?

---

## Phase 2: Epic Planning

**Objectif:** Transformer le PRD en plan technique d'implémentation

**Commande:** `/pm:prd-parse {feature-name}`

**Durée typique:** 15-30 minutes

**Output:** `.claude/epics/{feature-name}/epic.md`

### Contenu de l'Epic

Un epic complet contient:

1. **Technical Approach** - Architecture haut-niveau
2. **Technology Decisions** - Choix technologiques avec rationale
3. **Data Model Changes** - Schémas, migrations
4. **API Design** - Endpoints, request/response formats
5. **Security Considerations** - Auth, validation, rate limiting
6. **Performance Strategy** - Caching, optimization
7. **Testing Strategy** - Unit, integration, E2E
8. **Dependency Mapping** - Dépendances techniques
9. **Task Breakdown Preview** - Estimation nombre de tâches

### Architecture Decisions

Pour chaque décision technique importante:

**Format:**
```markdown
**Decision:** Use {Technology X}
**Rationale:** {Why this choice}
**Alternatives Considered:** {What else we looked at}
**Risks:** {What could go wrong}
```

**Exemple:**
```markdown
**Decision:** Use Redis for pub/sub
**Rationale:** Enables horizontal scaling across instances
**Alternatives Considered:** PostgreSQL LISTEN/NOTIFY (doesn't scale)
**Risks:** Additional infrastructure dependency
```

---

## Phase 3: Task Decomposition

**Objectif:** Décomposer l'epic en tâches concrètes et exécutables

**Commande:** `/pm:epic-decompose {feature-name}`

**Durée typique:** 10-20 minutes

**Output:** `.claude/epics/{feature-name}/001.md, 002.md, ...`

### Anatomie d'une Task

Chaque task contient:

```yaml
---
name: Task title
status: open
created: 2025-01-06T12:00:00Z
updated: 2025-01-06T12:00:00Z
depends_on: [001, 002]  # Tasks qui doivent compléter avant
parallel: true          # Peut run en parallèle?
conflicts_with: [003]   # Tasks qui modifient mêmes fichiers
estimated_hours: 4
size: M                 # XS/S/M/L/XL
---
```

**Body:**
- Description claire
- Acceptance Criteria (testables)
- Technical Details (fichiers à modifier, approche)
- Dependencies
- Testing Requirements
- Definition of Done

### Task Sizing

- **XS** (1-2h): Changement simple, isolé
- **S** (2-4h): Single file/component
- **M** (4-8h): Multiple fichiers liés
- **L** (8-16h): Cross-cutting change
- **XL** (16-24h): Feature complexe

**Règle:** Si > XL, décomposer davantage

### Dependency Management

**Types de dépendances:**

1. **Data Dependencies** - Task B besoin data model de Task A
2. **Code Dependencies** - Task B appelle code de Task A
3. **Testing Dependencies** - Task B teste feature de Task A
4. **Infrastructure Dependencies** - Task B besoin deployment de Task A

**Marquer parallel:**

Tasks peuvent run en parallèle si:
- ✅ Pas de code dependencies
- ✅ Travaillent sur fichiers différents
- ✅ Testables indépendamment

Tasks conflictent si:
- ❌ Modifient mêmes fichiers
- ❌ Changent mêmes tables DB
- ❌ Requièrent ressource exclusive

### Stratégie de Décomposition

**Par Layer:**
```
Database Layer (3 tasks)
→ API Layer (5 tasks)
→ Frontend Layer (6 tasks)
→ Testing Layer (4 tasks)
```

**Par Feature:**
```
CRUD Operations (4 tasks)
→ Validation (2 tasks)
→ Error Handling (2 tasks)
```

---

## Phase 4: GitHub Synchronization

**Objectif:** Publier epic et tasks sur GitHub, créer worktree

**Commande:** `/pm:epic-sync {feature-name}`

**Durée typique:** 2-3 minutes

**Outputs:**
- Epic issue sur GitHub
- Sub-issues pour chaque task
- Git worktree créé
- Fichiers renommés: `001.md` → `{issue-id}.md`

### Ce qui se passe

1. **Création Epic Issue**
   - Titre: "Epic: {feature-name}"
   - Labels: `epic`, `epic:{feature-name}`, `{priority}`
   - Body: Epic description + technical approach

2. **Création Sub-Issues**
   - Une issue par task
   - Parent-child relationship (si gh-sub-issue installé)
   - Labels: `task`, `epic:{feature-name}`

3. **Renommage Fichiers**
   ```
   001.md → 235.md (issue #235)
   002.md → 236.md (issue #236)
   ```
   - Toutes les références mises à jour
   - Frontmatter updated avec GitHub URLs

4. **Création Worktree**
   ```
   your-project/              ← main branch
   ../epic-{feature-name}/    ← worktree isolé
   ```
   - Branch: `epic-{feature-name}`
   - Clean working tree

### Worktree Benefits

- ✅ Isolation: Main reste propre
- ✅ Parallélisation: Multiple epics simultanés
- ✅ Context switching rapide
- ✅ Rollback facile si nécessaire

---

## Phase 5: Parallel Execution

**Objectif:** Exécuter tasks avec multiple AI agents simultanément

**Commande:** `/pm:issue-start {issue-id}`

**Durée:** Variable (40-70% plus rapide que séquentiel)

### How Parallel Execution Works

1. **Analyse des Work Streams**
   - Identifie tâches indépendantes
   - Groupe par layer ou component
   - Détecte conflits potentiels

2. **Spawning Agents**
   ```
   Agent 1: Database Layer (Tasks 235, 236)
   Agent 2: API Layer (Tasks 237, 238, 239)
   Agent 3: Frontend (Tasks 240, 241, 242)
   Agent 4: Tests (Tasks 243, 244)
   ```

3. **Coordination**
   - Agents travaillent indépendamment
   - File-level isolation
   - Commits fréquents
   - Progress tracking

4. **Consolidation**
   - Résultats agrégés
   - Status consolidé
   - Blockers identifiés
   - Next steps suggérés

### Work Stream Patterns

**Pattern 1: Layer-Based**
```
Stream 1 (DB):    migrations/, models/
Stream 2 (API):   api/, services/
Stream 3 (UI):    components/, pages/
Stream 4 (Tests): tests/
```

**Pattern 2: Component-Based**
```
Stream 1 (Auth):    auth/, middleware/auth
Stream 2 (Notif):   notifications/, socket/
Stream 3 (Profile): profile/, api/profile
```

**Pattern 3: Feature-Based**
```
Stream 1 (CRUD):   create/read/update/delete
Stream 2 (Valid):  validation/, schemas/
Stream 3 (Errors): error-handling/
```

### Coordination Strategies

**File Conflicts:**
- Serialize access si même fichier
- Un stream compléte, puis l'autre
- Note conflicts pour resolution

**Blockers:**
- Check si autre stream peut débloquer
- Continue avec autres streams
- Escalade à humain si nécessaire

---

## Flux Complet - Exemple End-to-End

**Feature:** Système de notifications en temps réel

### Phase 1: PRD (30 min)
```
/pm:prd-new notification-system

Brainstorming:
- Problème: Users don't know about activity
- Users: Sellers and buyers
- Requirements: Real-time, < 2s delivery, 90% delivery rate
- Out of scope: Email notif (v2), SMS (v3)

Output: .claude/prds/notification-system.md
```

### Phase 2: Epic (20 min)
```
/pm:prd-parse notification-system

Technical decisions:
- Socket.io for WebSockets
- Redis for pub/sub
- PostgreSQL table for persistence

Output: .claude/epics/notification-system/epic.md
```

### Phase 3: Tasks (15 min)
```
/pm:epic-decompose notification-system

11 tasks créées:
- DB: 001, 002 (3h)
- Backend: 003, 004, 005 (5h)
- Frontend: 006, 007, 008 (6h)
- Tests: 009, 010, 011 (4h)

Total: 18h séquentiel, 8h parallel

Output: .claude/epics/notification-system/001.md - 011.md
```

### Phase 4: GitHub Sync (3 min)
```
/pm:epic-sync notification-system

Created:
- Epic #234
- Sub-issues #235-#245
- Worktree: ../epic-notification-system/

Files renamed: 001.md → 235.md, etc.
```

### Phase 5: Execution (8h vs 18h)
```
cd ../epic-notification-system/
/pm:issue-start 235

Launched 3 parallel agents:
- Agent 1: DB (Tasks 235-236) - 3h
- Agent 2: Backend (Tasks 237-239) - 5h
- Agent 3: Frontend (Tasks 240-242) - 6h

After completion:
- Agent 4: Tests (Tasks 243-245) - 4h

Result: 8h total (56% faster)
```

---

## Principes Clés

### 1. No Vibe Coding

**❌ Vibe Coding:**
```
Developer: "I'll add notifications"
[Starts coding]
[Makes assumptions]
[Adds extra features]
[Forgets edge cases]
```

**✅ Spec-Driven:**
```
1. PRD: Exactly what notifications, why, success metrics
2. Epic: How technically (WebSockets, Redis, etc.)
3. Task: Specific acceptance criteria
4. Code: Implements exactly the spec
5. Review: Validates against spec
```

### 2. Traceability

Chaque ligne de code doit pouvoir tracer:
```
Code line 42
  ↓
Task AC #3: "Display toast on notification"
  ↓
Epic: "Frontend uses WebSocket client"
  ↓
PRD FR-5: "Real-time notification display"
  ↓
User Story: "As a seller, I want instant notifications"
```

### 3. Explicit Over Implicit

- ✅ Explicit dans PRD: "Out of scope: Email notifications"
- ❌ Implicit assumption: "We'll probably add email later"

- ✅ Explicit dependency: `depends_on: [001]`
- ❌ Implicit: "This task needs the DB schema first"

- ✅ Explicit success metric: "< 300ms p95 latency"
- ❌ Implicit: "Should be fast"

### 4. Iterate on Spec, Not Code

**Better workflow:**
```
1. Write PRD
2. Review PRD with team
3. Iterate PRD (cheap to change)
4. Write code once spec is solid
```

**Avoid:**
```
1. Write code
2. Discover missing requirements
3. Rewrite code
4. Discover more edge cases
5. Rewrite again (expensive!)
```

---

## Transition Points

### Quand passer à la phase suivante?

**PRD → Epic:**
- ✅ Problem statement clear
- ✅ All user stories have acceptance criteria
- ✅ Success metrics sont measurables
- ✅ Out of scope défini
- ✅ Stakeholders ont validé

**Epic → Tasks:**
- ✅ Technical approach défini
- ✅ Architecture decisions documentées
- ✅ Data model changements connus
- ✅ Technology stack choisi

**Tasks → GitHub Sync:**
- ✅ Toutes tâches ont acceptance criteria
- ✅ Dependencies mappées correctement
- ✅ Parallelization identifiée
- ✅ Estimations raisonnables

**GitHub Sync → Execution:**
- ✅ Epic et sub-issues créés
- ✅ Worktree créé et clean
- ✅ Fichiers renommés correctement
- ✅ Prêt à coder

**Execution → Completion:**
- ✅ Tous acceptance criteria validés
- ✅ Tests passent
- ✅ Code reviewed
- ✅ No scope creep détecté
