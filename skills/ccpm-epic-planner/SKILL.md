---
name: ccpm-epic-planner
description: Technical architect that transforms PRDs into detailed implementation plans with optimal task decomposition, dependency analysis, and parallelization strategy. Use when converting PRD to epic, planning technical approach, or decomposing work into executable tasks.
---

# Technical Epic Planner

## Overview

Transform business requirements (PRD) into technical execution plans (Epic + Tasks). Analyze codebase, propose architecture, and decompose into parallelizable work items.

## Workflow

### Phase 1: PRD to Epic (`/pm:prd-parse {feature-name}`)

**1. Load PRD**
```bash
cat .claude/prds/{feature-name}.md
```

**2. Analyze Codebase**
```bash
# Understand current architecture
rg "import|require" --type {language} | head -20
find . -type f -name "*.{ext}" | head -20

# Check patterns
cat .claude/context/architecture.md 2>/dev/null
cat .claude/context/api-patterns.md 2>/dev/null
```

**3. Create Epic**

File: `.claude/epics/{feature-name}/epic.md`

```yaml
---
name: {feature-name}
description: {Technical summary}
status: planning
created: {date -u +"%Y-%m-%dT%H:%M:%SZ"}
prd: .claude/prds/{feature-name}.md
estimated_effort_days: {estimate}
---

# Epic: {Feature Name}

## Technical Approach

Architecture:
```
{ASCII diagram of components}
```

## Technology Decisions

**Decision: {Technology}**
- Rationale: {Why}
- Alternatives: {What else considered}
- Risks: {Potential issues}

## Data Model

**New/Modified Tables:**
```sql
{Schema changes}
```

**Migration Strategy:** {How to handle existing data}

## API Design

```
POST   /api/{resource}
GET    /api/{resource}/:id
```

## Implementation Breakdown

Database (3 tasks, 3h):
- Schema + migrations
- Repository layer

API (5 tasks, 6h):
- Endpoints
- Validation
- Error handling

Frontend (4 tasks, 5h):
- Components
- State management
- Integration

Tests (3 tasks, 4h):
- Unit tests
- Integration tests
- E2E scenarios

**Total: 15 tasks, 18h sequential / ~8h parallel**
```

### Phase 2: Epic to Tasks (`/pm:epic-decompose {feature-name}`)

For each task, create `.claude/epics/{feature-name}/{NNN}.md`:

```yaml
---
name: {Task title}
status: open
created: {datetime}
depends_on: [{task numbers}]
parallel: {true/false}
conflicts_with: [{tasks touching same files}]
estimated_hours: {1-24}
size: {XS/S/M/L/XL}
layer: {database/api/frontend/testing}
---

# Task: {Title}

## Description
{Clear, specific what to do}

## Acceptance Criteria
- [ ] {Testable criterion 1}
- [ ] {Testable criterion 2}
- [ ] Tests >80% coverage

## Technical Details
**Files:**
- `{path}`: {what changes}

**Approach:**
{Step-by-step implementation}

**Pattern Reference:**
```{language}
// From {existing_file}
{example showing pattern}
```

## Dependencies
- Task {N}: {why needed first}

## Testing
- Test {scenario 1}
- Test {edge case}

## Definition of Done
- [ ] Code implemented
- [ ] Tests passing
- [ ] Reviewed
```

## Task Sizing Guidelines

- **XS** (1-2h): Simple, one file
- **S** (2-4h): Small feature, few files
- **M** (4-8h): Standard, multiple files
- **L** (8-16h): Complex, cross-cutting
- **XL** (16-24h): Very complex → decompose further

## Dependency Management

**Mark dependencies:**
```yaml
depends_on: [001, 002]  # Must complete first
parallel: false          # Can't run with others
conflicts_with: [003]    # Modifies same files
```

**Parallelization Strategy:**

Identify streams:
```
Stream 1 (DB):    001, 002 → 3h
Stream 2 (API):   003, 004, 005 → 5h (after 001)
Stream 3 (UI):    006, 007, 008 → 6h (after 003)
Stream 4 (Tests): 009, 010 → 4h (after all)

Critical Path: 001 → 003 → 006 → 009 = 8h
Parallel Gain: 18h → 8h (56% faster)
```

## Quality Checks

Before finalizing:
- [ ] All PRD requirements covered
- [ ] No task > 24h (decompose if needed)
- [ ] Dependencies logical (no circular)
- [ ] Parallel tasks don't conflict
- [ ] Each task maps to PRD requirement

## Output

```markdown
✅ Epic Created: {feature-name}

## Summary
- Tasks: {count} ({total_hours}h est.)
- Parallelizable: {count} tasks
- Sequential: {count} tasks
- Speedup: {percent}% with parallelization

## Next Steps
1. Review technical approach
2. Sync to GitHub: Use ccpm:github-sync
3. Start execution: Use ccpm:parallel-executor

Ready to proceed?
```

Optimize for: Clear boundaries, minimal dependencies, maximum parallelization.
