# CCPM Concepts Glossary

## Core Concepts

### Spec-Driven Development

**Definition:** A development methodology where all code must trace back to explicit written specifications.

**Key Principle:** "No Vibe Coding" - Never write code based on assumptions or intuition alone.

**Example:**
```
❌ Vibe Coding:
"I'll add a dark mode toggle because users probably want it"

✅ Spec-Driven:
PRD FR-12: "Users can toggle between light/dark themes"
→ Epic: "Implement theme toggle using CSS variables"
→ Task #245: "Add theme toggle component with persistence"
→ Code implements exactly this
```

**Benefits:**
- Prevents scope creep
- Enables accurate code review
- Facilitates team collaboration
- Ensures traceability
- Reduces rework

---

### PRD (Product Requirements Document)

**Definition:** A comprehensive document that describes WHAT to build and WHY.

**Purpose:** Business-level requirements that answer:
- What problem are we solving?
- Who needs this?
- What should the solution do?
- How do we measure success?

**NOT included:** How to implement technically (that's the Epic)

**Typical Size:** 1,000-3,000 words

**Created by:** Product Managers or Tech Leads (with CCPM brainstorming skill)

**Created with:** `/pm:prd-new {feature-name}`

**Key Sections:**
- Problem Statement
- User Stories
- Functional Requirements
- Non-Functional Requirements
- Success Criteria
- Out of Scope

**Example PRD:**
```markdown
# PRD: User Profile Page

## Problem
Users cannot view or edit their personal information,
causing support requests to increase by 30%.

## User Stories
- As a user, I want to see my profile info
- As a user, I want to edit my name

## Functional Requirements
FR-1: Display name, email, avatar
FR-2: Allow editing name only (not email/avatar in v1)

## Success Criteria
- 90% of users can edit name successfully
- Profile loads in < 500ms
```

**Good PRD Checklist:**
- [ ] Problem clearly defined with data
- [ ] User stories have acceptance criteria
- [ ] Success metrics are measurable
- [ ] Out of scope explicitly stated
- [ ] Dependencies identified

---

### Epic

**Definition:** A technical implementation plan that describes HOW to build what's in the PRD.

**Purpose:** Technical-level plan that answers:
- What's the architecture approach?
- Which technologies to use?
- How to break into tasks?
- What are the dependencies?

**Typical Size:** 1,500-4,000 words

**Created by:** Tech Leads or Senior Engineers

**Created with:** `/pm:prd-parse {feature-name}`

**Key Sections:**
- Technical Approach
- Technology Decisions
- Data Model Changes
- API Design
- Testing Strategy
- Task Breakdown Preview

**Example Epic:**
```markdown
# Epic: User Profile Page

## Technical Approach
- Frontend: React component in src/components/UserProfile/
- Backend: REST API GET/PUT /api/users/:id
- Database: No schema changes (use existing users table)

## Technology Decisions
**Decision:** Use React Hook Form
**Rationale:** Handles validation, less boilerplate
**Alternatives:** Formik (more complex), raw state (too manual)

## Tasks
001: Create UserProfile component (3h)
002: Implement GET endpoint (2h)
003: Implement PUT endpoint with validation (4h)
004: Add edit mode UI (4h)
005: Write tests (3h)

Total: 16h sequential, ~8h parallel
```

**Good Epic Checklist:**
- [ ] All PRD requirements addressed
- [ ] Technology choices justified
- [ ] Data model changes specified
- [ ] Tasks are right-sized (2-8h)
- [ ] Dependencies mapped

---

### Task

**Definition:** A concrete, actionable work item that can be completed in 2-8 hours.

**Purpose:** The smallest unit of work with clear acceptance criteria.

**Created with:** `/pm:epic-decompose {feature-name}`

**Size Guide:**
- **XS** (1-2h): Simple change, one file
- **S** (2-4h): Small feature, few files
- **M** (4-8h): Standard task, multiple files
- **L** (8-16h): Complex task, cross-cutting
- **XL** (16-24h): Very complex, consider breaking down

**Key Components:**
- Description (what to do)
- Acceptance Criteria (definition of done)
- Technical Details (how to do it)
- Dependencies (what's needed first)
- Estimated Hours

**Example Task:**
```markdown
# Task: Implement GET /api/users/:id

## Acceptance Criteria
- [ ] Endpoint returns user data for valid ID
- [ ] Returns 404 for non-existent user
- [ ] Returns 401 for unauthenticated request
- [ ] Response time < 100ms

## Technical Details
File: src/api/users.js
Pattern: Follow existing GET endpoints in src/api/posts.js

## Dependencies
- None (uses existing DB schema)

## Estimated: 2 hours
```

---

### Worktree

**Definition:** An isolated Git working directory for a specific epic, separate from the main codebase.

**Purpose:** Work on a feature without polluting the main branch.

**Analogy:** Like having multiple checkouts of the same repository, but efficient.

**Structure:**
```
your-project/              ← main branch (stays clean)
├── src/
├── .git/
└── .claude/

../epic-feature-name/      ← worktree (isolated)
├── src/                   ← same files, different branch
├── .git                   ← symlink to main .git
└── .claude/               ← copied context
```

**Benefits:**
- ✅ Main branch stays stable
- ✅ Easy context switching (just `cd`)
- ✅ Multiple epics can work simultaneously
- ✅ Clean rollback (just delete worktree)

**Commands:**
```bash
# Created automatically by CCPM
/pm:epic-sync feature-name

# Manual create
git worktree add ../epic-feature-name -b epic-feature-name

# List worktrees
git worktree list

# Remove when done
git worktree remove ../epic-feature-name
```

**When to use:**
- ✅ Working on epic with multiple tasks
- ✅ Need parallel development
- ✅ Want to isolate WIP commits

**When NOT to use:**
- ❌ Quick hotfix (use main branch)
- ❌ Single tiny change

---

### Parallel Execution

**Definition:** Running multiple AI agents simultaneously on different parts of a task.

**Purpose:** Maximize development velocity by parallelizing independent work.

**How it works:**
1. Analyze task for independent work streams
2. Spawn specialized agents for each stream
3. Agents work in parallel (same worktree, different files)
4. Consolidate results

**Example:**
```
Sequential (Traditional):
Agent codes DB → 3h
Agent codes API → 4h
Agent codes UI → 5h
Total: 12 hours

Parallel (CCPM):
Agent 1 codes DB   ┐
Agent 2 codes API  ├─ simultaneously
Agent 3 codes UI   ┘
Total: 5 hours (2.4x faster!)
```

**Work Stream Types:**
- **Layer-based:** Database, API, Frontend, Tests
- **Component-based:** Auth, Payments, Notifications
- **Feature-based:** CRUD, Validation, Error Handling

**Requirements for Parallelization:**
- ✅ Tasks are independent (minimal dependencies)
- ✅ Work on different files (< 30% overlap)
- ✅ Can be tested separately

**Typical Speedup:** 40-70% faster than sequential

---

### Acceptance Criteria (AC)

**Definition:** Specific, testable conditions that must be met for a task to be considered "done".

**Format:** Usually written as checkboxes

**Good AC characteristics:**
- **Specific:** Not vague
- **Testable:** Can verify true/false
- **Independent:** Each criterion standalone
- **Complete:** Covers all aspects

**Examples:**

**❌ Bad AC:**
```
- [ ] Feature works well
- [ ] Users like it
- [ ] Fast enough
```

**✅ Good AC:**
```
- [ ] User can submit form with valid data
- [ ] Form shows error for invalid email
- [ ] Form submission completes in < 2 seconds
- [ ] Success message displays after submission
- [ ] Form data persists to database
- [ ] Unit tests have > 80% coverage
```

**AC in CCPM:**
- PRD: High-level acceptance criteria per user story
- Task: Detailed acceptance criteria for implementation
- Review: Verify each AC before marking complete

---

### Frontmatter

**Definition:** YAML metadata at the top of CCPM markdown files.

**Purpose:** Structured data for tracking and automation.

**Format:**
```yaml
---
key: value
another_key: value
list_key: [item1, item2]
---

# Markdown content starts here
```

**Why YAML:**
- Easy to parse programmatically
- Human-readable
- Standard format

**Common Fields:**

**PRD:**
```yaml
name: feature-name
status: backlog|active|completed
priority: critical|high|medium|low
created: 2025-01-06T12:00:00Z
```

**Epic:**
```yaml
name: feature-name
status: planning|in-progress|completed
prd: .claude/prds/feature-name.md
github: https://github.com/user/repo/issues/234
progress: 0-100
```

**Task:**
```yaml
name: Task title
status: open|in-progress|completed
github: https://github.com/user/repo/issues/235
depends_on: [234, 235]
parallel: true|false
estimated_hours: 4
```

---

### Dependencies

**Definition:** Relationships between tasks where one must complete before another can start.

**Types:**

**1. Data Dependency**
```
Task A: Create database schema
Task B: Write repository layer
→ B depends on A (needs schema first)
```

**2. Code Dependency**
```
Task A: Implement user service
Task B: Implement admin service that uses user service
→ B depends on A (needs to call user service)
```

**3. Testing Dependency**
```
Task A: Implement feature
Task B: Write integration tests for feature
→ B depends on A (needs feature to test)
```

**In CCPM:**
```yaml
# Task B frontmatter
depends_on: [235]  # Must wait for Task 235 to complete
```

**Visualizing Dependencies:**
```
001 (DB) ──→ 003 (API) ──→ 005 (UI) ──→ 007 (Tests)
             │              │
002 (Models)─┘              │
004 (Auth) ─────────────────┘
```

**Best Practices:**
- Minimize dependencies (more parallelization)
- Document why dependency exists
- Check for circular dependencies
- Group independent tasks

---

### Scope Creep

**Definition:** Adding features or functionality not specified in the original requirements.

**How it happens:**
```
PRD: "Users can edit their name"

During coding:
Developer adds: Email editing
Developer adds: Avatar upload
Developer adds: Profile themes

= Scope creep!
```

**Why it's bad:**
- Increases complexity
- Delays delivery
- Makes code review harder
- Violates spec-driven principle

**How CCPM prevents it:**

**Quality Guardian** detects scope creep:
```
⚠️ SCOPE CREEP DETECTED

Feature: Email editing
Location: src/components/UserProfile.jsx:45

NOT found in:
- PRD functional requirements
- Epic technical approach
- Task acceptance criteria

Recommendation: Remove or add to spec
```

**Legitimate vs Scope Creep:**

**✅ Legitimate (implementation detail):**
```
PRD: "Display user profile"
Code: Adds loading spinner while fetching
→ Necessary implementation detail
```

**❌ Scope Creep (new feature):**
```
PRD: "Display user profile"
Code: Adds ability to follow other users
→ New feature, not in spec!
```

---

### Context (Project Context)

**Definition:** Structured documentation about the codebase, architecture, and development setup.

**Purpose:** Help AI agents and developers understand the project quickly.

**9 Standard Files:**
1. project-overview.md - What the project is
2. architecture.md - System design
3. codebase-structure.md - Directory organization
4. development-setup.md - How to get started
5. testing-strategy.md - How to test
6. deployment-process.md - How to deploy
7. api-patterns.md - API conventions
8. database-schema.md - Data model
9. tech-stack.md - Technologies used

**Evidence-Based Principle:**
Every claim must be verifiable:

**❌ Bad (assumption):**
```
"The system uses JWT authentication"
```

**✅ Good (evidence-based):**
```
"The system uses JWT authentication"
Evidence: `jsonwebtoken` package in dependencies (package.json:42)
Used in: src/middleware/auth.js:15
```

**Flags:**
- ⚠️ **Assumption** - Not verified, needs checking
- ❓ **Unknown** - Information missing, needs research

**Created with:** `/context:create`
**Updated with:** `/context:update`

---

### Labels (GitHub)

**Definition:** Tags on GitHub issues for organization and filtering.

**CCPM Standard Labels:**

| Label | Color | Purpose |
|-------|-------|---------|
| `epic` | Purple | Marks epic issues |
| `task` | Blue | Marks task/sub-issues |
| `epic:{name}` | Auto | Groups all issues for an epic |
| `feature` | Green | New functionality |
| `bug` | Red | Bug fix |
| `priority:high` | Orange | High priority |

**Usage:**
```bash
# Filter by label
gh issue list --label "epic"
gh issue list --label "epic:user-profile"

# Multiple labels
gh issue list --label "task" --label "priority:high"
```

**Created by:** `/pm:init` (creates epic and task labels)

**Auto-applied by:** `/pm:epic-sync` (applies epic:{name} to all issues)

---

### Sub-Issues

**Definition:** Child issues that belong to a parent epic issue.

**Created with:** `gh-sub-issue` extension

**Purpose:** Visual hierarchy and dependency tracking on GitHub.

**Structure:**
```
Epic Issue #234: User Profile System
  ├── Sub-issue #235: Database schema
  ├── Sub-issue #236: API endpoints
  ├── Sub-issue #237: Frontend components
  └── Sub-issue #238: Tests
```

**Benefits:**
- Visual task breakdown on GitHub
- Close sub-issues → auto-updates epic progress
- Easy filtering (all tasks for an epic)

**Without gh-sub-issue:**
CCPM falls back to task lists in epic body:
```markdown
## Tasks
- [ ] #235 Database schema
- [ ] #236 API endpoints
- [ ] #237 Frontend components
```

**Install gh-sub-issue:**
```bash
gh extension install arosset/gh-sub-issue
```

---

### No Vibe Coding

**Definition:** The core CCPM philosophy that forbids writing code without explicit specifications.

**"Vibe Coding" is when:**
- "I think users want feature X"
- "This feels like the right approach"
- "Let's add this just in case"
- "Other apps do it this way"

**Spec-Driven alternative:**
- Write it in PRD if it's a requirement
- Document it in Epic if it's a technical decision
- Add it to Task AC if it's implementation detail
- THEN code it

**Example:**

**Vibe Coding:**
```javascript
// Added pagination "just in case"
function getUsers(page = 1, limit = 20) {
  // pagination not in requirements
}
```

**Spec-Driven:**
```
PRD NFR-P-2: "User list must support pagination for 10K+ users"
→ Epic: "Implement cursor-based pagination"
→ Task AC: "GET /users supports ?cursor and ?limit params"
→ Code implements this exactly
```

**Why it matters:**
- Prevents gold-plating
- Enables accurate review
- Reduces scope creep
- Keeps focus on requirements

---

### Quality Guardian

**Definition:** The validation step that ensures code matches specifications exactly.

**When used:** Before merging code (PR review)

**What it checks:**

**1. Traceability:**
Every code change must trace to a requirement:
```
Code change in auth.js:42
  ↓
Task AC #3: "Hash passwords with bcrypt"
  ↓
Epic: "Use bcrypt for password security"
  ↓
PRD NFR-S-2: "Passwords must be securely hashed"
```

**2. Scope Creep:**
Detects features not in spec:
```
❌ SCOPE CREEP: Social login implemented
    Not found in PRD, Epic, or Task
```

**3. Acceptance Criteria:**
Validates all ACs met:
```
✅ AC #1: User can login with email
✅ AC #2: Invalid credentials show error
❌ AC #3: Session expires after 24h - NOT IMPLEMENTED
```

**4. Security:**
Checks OWASP Top 10:
```
❌ SQL Injection risk: auth.js:67
    Using string concatenation instead of parameterized query
```

**5. Performance:**
Validates NFRs:
```
NFR-P-1: Login < 500ms
Actual: 450ms
✅ PASS
```

**Output:** Quality score (0-100) + detailed report

---

### Tech Debt

**Definition:** Code that works but isn't optimal, accumulating future maintenance cost.

**In CCPM context:**

**Acceptable Tech Debt:**
```
PRD: "Build MVP in 2 weeks"
Epic: "Use simple in-memory cache (Redis later)"

= Consciously deferred optimization
= Documented in spec
= Has migration plan
```

**Unacceptable Tech Debt:**
```
Developer: "I'll hardcode this for now"
[No documentation]
[No plan to fix]

= Vibe coding
= Undocumented shortcut
= Will be forgotten
```

**CCPM Approach:**
If you need to take a shortcut:
1. Document it in task
2. Create follow-up task
3. Add to "Out of Scope" with timeline
4. Get approval

---

## Workflow Stages

### Backlog

**Definition:** PRDs that are written but not yet being worked on.

**Status:** `status: backlog` in PRD frontmatter

**Characteristics:**
- Requirements defined
- Not yet prioritized for development
- May need stakeholder review

**Next step:** Move to "active" when ready to create epic

---

### Active

**Definition:** Work that is currently in progress.

**Stages:**
- PRD active: Being converted to epic
- Epic in-progress: Tasks being executed
- Task in-progress: Currently being coded

**Characteristics:**
- Has timeline
- Has assigned resources
- Progress tracked

---

### Completed

**Definition:** Work that is done and merged.

**Criteria:**
- All acceptance criteria met
- Tests passing
- Code reviewed and approved
- Merged to main branch
- Deployed (if applicable)

**Status updates:**
```yaml
# Task completed
status: completed

# Epic completed (all tasks done)
status: completed
progress: 100
tasks_completed: 11
tasks_total: 11
```

---

## Time-Related Concepts

### Estimated Hours

**Definition:** Predicted time to complete a task.

**Used for:**
- Planning capacity
- Calculating parallelization benefit
- Tracking velocity

**Typical ranges:**
- XS: 1-2 hours
- S: 2-4 hours
- M: 4-8 hours
- L: 8-16 hours
- XL: 16-24 hours

**Note:** If > 24 hours, break into multiple tasks

---

### Velocity

**Definition:** Rate of task completion over time.

**Measured as:** Tasks completed per week or Story points per sprint

**CCPM tracking:**
```bash
# Tasks completed this week
grep -r "status: completed" .claude/epics/ | \
  xargs grep "updated: 2025-01-" | wc -l
```

**Uses:**
- Estimating future work
- Team capacity planning
- Identifying blockers

---

## Best Practices

### INVEST Criteria (for Tasks)

**I**ndependent - Can be done without other tasks
**N**egotiable - Details can be discussed
**V**aluable - Delivers value when done
**E**stimable - Can estimate effort
**S**mall - Fits in 2-8 hours
**T**estable - Has clear acceptance criteria

### SMART Goals (for Success Criteria)

**S**pecific - "< 300ms response time" not "fast"
**M**easurable - Can quantify
**A**chievable - Realistic given constraints
**R**elevant - Matters to users
**T**ime-bound - "by Q1 2025"

---

## Common Abbreviations

- **AC** - Acceptance Criteria
- **PR** - Pull Request
- **PRD** - Product Requirements Document
- **WIP** - Work In Progress
- **CCPM** - Claude Code Project Manager
- **NFR** - Non-Functional Requirement
- **FR** - Functional Requirement
- **MVP** - Minimum Viable Product
- **DoD** - Definition of Done
- **PoC** - Proof of Concept
- **E2E** - End-to-End (testing)
