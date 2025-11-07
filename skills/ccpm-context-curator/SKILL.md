---
name: ccpm-context-curator
description: Evidence-based project context manager that maintains accurate, verified documentation of codebase architecture, patterns, and conventions. Use when setting up new project, onboarding developers, updating documentation, or auditing architecture.
---

# Context Curator

## Overview

Create and maintain evidence-based project context. Every claim must be verifiable through code inspection. Flag assumptions, mark unknowns.

## Core Principle

**"Show me the code"** - No speculation, only verified facts.

## Operations

### 1. Create Context (`/context:create`)

Generate 9 standard files:

```bash
mkdir -p .claude/context

# Create files:
# 1. project-overview.md
# 2. architecture.md
# 3. codebase-structure.md
# 4. development-setup.md
# 5. testing-strategy.md
# 6. deployment-process.md
# 7. api-patterns.md
# 8. database-schema.md
# 9. tech-stack.md
```

**File Structure:**

```yaml
---
file: {name}.md
created: {date}
last_verified: {date}
confidence: high|medium|low
---

# {Topic}

## {Section}

{Content with evidence}

**Evidence:** `{file}:{line}` or `{command output}`

⚠️ **Assumption:** {what's assumed}
- Verification needed: {how to verify}

❓ **Unknown:** {what's unclear}
- Impact: {what's affected}

## Verification Checklist
- [✅] {What was verified}
- [⚠️] {What needs review}
- [❌] {What's unknown}
```

### 2. Evidence-Based Documentation

**Good (verified):**
```markdown
Authentication uses JWT.

**Evidence:**
- Package: `jsonwebtoken` in `package.json:42`
- Usage: `src/middleware/auth.js:15`
- Config: `JWT_SECRET` in `.env.example:8`
```

**Bad (speculation):**
```markdown
The system uses JWT authentication.
```

### 3. Update Context (`/context:update`)

**Check what changed:**
```bash
git diff {last_verified}..HEAD --name-status
```

**Identify affected context:**
- New files → codebase-structure.md
- New dependencies → tech-stack.md
- Deleted features → architecture.md

**Conservative updates:**
- ✅ Add new verified info
- ⚠️ Update only with clear evidence
- ❌ Don't remove unless definitively gone
- Flag outdated: ⚠️ **Deprecated:** {reason}

### 4. Validation

**Check referenced files exist:**
```bash
grep -oE '`[^`]+\.[a-z]+:[0-9]+`' {context_file} | while read ref; do
  file=$(echo "$ref" | sed 's/`//g' | cut -d: -f1)
  [ -f "$file" ] || echo "❌ Missing: $file"
done
```

**Flag stale context:**
```bash
last_verified=$(grep "^last_verified:" {file} | cut -d' ' -f2)
days_old=$(( ($(date +%s) - $(date -d "$last_verified" +%s)) / 86400 ))
[ $days_old -gt 30 ] && echo "⚠️ Stale (${days_old} days old)"
```

### 5. Context Types

**project-overview.md:**
- What the project is
- Tech stack (verified from files)
- Key features (verified from code)

**architecture.md:**
- High-level design
- Component interactions
- External dependencies

**codebase-structure.md:**
- Directory tree with purpose
- File naming conventions
- Module organization

**development-setup.md:**
- Prerequisites (versions from configs)
- Setup steps (from README or inferred)
- Environment variables (from .env.example)

**api-patterns.md:**
- Endpoint conventions
- Request/response formats
- Error handling patterns

**database-schema.md:**
- Table definitions
- Relationships
- Migration strategy

## Flags

Use consistently:

- ⚠️ **Assumption** - Not verified, hypothesis
- ❓ **Unknown** - Information missing
- ✅ **Verified** - Confirmed through code
- 🔍 **Needs Investigation** - Requires deeper analysis

## Output

```markdown
✅ Context Created/Updated

## Files
- {count} context files
- Confidence: {high/medium/low}
- Assumptions: {count}
- Unknowns: {count}

## Coverage
- Architecture: Documented
- Setup: Verified
- Tech Stack: Complete

## Next
- Review `.claude/context/`
- Verify assumptions
- Investigate unknowns
```

Maintain accuracy over completeness. Better to say "unknown" than to guess.
