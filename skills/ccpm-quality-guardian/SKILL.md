---
name: ccpm-quality-guardian
description: Code quality validator that ensures implementations match specifications exactly, detecting scope creep and verifying all acceptance criteria. Use before merging PRs, validating task completion, or reviewing code against specs.
---

# Code Quality Guardian

## Overview

Validate that code implements exactly what was specified. Enforce "no vibe coding" by tracing every line to requirements.

## Review Process

### 1. Load Specifications

```bash
# Task spec
cat .claude/epics/{epic}/{issue}.md

# Epic technical plan
cat .claude/epics/{epic}/epic.md

# PRD requirements
PRDPATH=$(grep "^prd:" epic.md | cut -d' ' -f2)
cat $PRDPATH
```

**Extract:**
- Functional requirements (FR-X)
- Non-functional requirements (NFR-X)
- Acceptance criteria
- Out of scope items

### 2. Analyze Code Changes

```bash
# Get changed files
gh pr view {pr} --json files --jq '.files[].path'
# Or: git diff main --name-only

# Review each file
git diff main {file}
```

### 3. Traceability Check

For each significant change:

```markdown
### Change: {Description}

**Location:** {file}:{line}

**Code:**
```{lang}
{snippet}
```

**Traces to:**
✅ Task AC #2: "{criterion}"
✅ Epic: "{decision}"
✅ PRD FR-3: "{requirement}"

**Justification:** {Why necessary}
```

### 4. Scope Creep Detection

```markdown
⚠️ SCOPE CREEP DETECTED

**Feature:** {description}
**Location:** {file}:{line}

**NOT found in:**
- PRD functional requirements
- Epic technical approach
- Task acceptance criteria

**Analysis:**
{Is this legitimate implementation detail or new feature?}

**Recommendation:**
{Remove / Document retroactively / Create new task}
```

### 5. Acceptance Criteria Validation

```markdown
## AC Validation

### AC #1: {criterion}
**Status:** ✅ Met / ⚠️ Partial / ❌ Not Met

**Evidence:**
- File: {where implemented}
- Test: {test file}:{test name}

**Verification:**
```bash
{how to verify}
```

Result: {what happened}
```

### 6. Security Review (OWASP Top 10)

Check:
- A01: Broken Access Control
- A02: Cryptographic Failures
- A03: Injection (SQL, XSS, etc.)
- A07: Authentication/Authorization
- Others as relevant

```markdown
❌ Security Issue: SQL Injection

**Location:** {file}:{line}
**Risk:** High
**Issue:** String concatenation in query
**Fix:** Use parameterized queries
```

### 7. Performance Validation

```markdown
**NFR-P-1:** Response < 500ms

**Measured:** 450ms ✅
**Method:** {how measured}
**Passes:** Yes
```

### 8. Final Report

```markdown
# Quality Review: #{issue}

## Score: {X}/100

## Summary
{1-2 paragraph overview}

## Traceability
- Requirements covered: {X}/{Y} ({percent}%)
- ACs met: {X}/{Y}
- Scope creep: {count} instances

## Critical Issues
{Must fix before merge}

## Warnings
{Should fix}

## Approval
✅ Approved / ⚠️ Approved with concerns / ❌ Changes required

**Next:** {what to do}
```

## Success Criteria

- Every line traces to spec
- No scope creep undetected
- All ACs verified
- Security validated
- Performance meets NFRs

Enforce spec-driven rigorously while being practical about implementation details.
