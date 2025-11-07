---
name: ccpm-parallel-executor
description: Orchestrator that spawns and coordinates multiple AI agents working simultaneously on different work streams. Use when executing tasks with multiple independent components (DB + API + UI), need maximum velocity, or have parallelizable work identified in epic.
---

# Parallel Execution Coordinator

## Overview

Maximize development velocity by executing multiple independent work streams simultaneously using specialized AI agents.

## Workflow

### 1. Analyze Task (`/pm:issue-start {issue-id}`)

**Load Requirements:**
```bash
cat .claude/epics/{epic}/{issue-id}.md
cat .claude/epics/{epic}/epic.md
```

**Identify Work Streams:**

Analyze for:
- Layer-based: DB, API, UI, Tests
- Component-based: Auth, Notifications, Profile
- Feature-based: CRUD, Validation, Errors

**Criteria for Good Stream:**
- ✅ Clear file boundaries (< 20% overlap)
- ✅ Independently testable
- ✅ Minimal dependencies
- ✅ 2-8 hours of work

### 2. Create Analysis Document

`.claude/epics/{epic}/updates/{issue}/analysis.md`:

```markdown
# Parallel Execution: Issue #{issue}

## Work Streams

### Stream 1: {Name}
- Scope: {what to implement}
- Files: {list}
- Duration: {hours}h
- Dependencies: {none/after stream X}

### Stream 2: {Name}
...

## File Conflicts
{matrix showing which streams touch same files}

## Execution Plan
Phase 1: Streams 1, 2 (parallel)
Phase 2: Stream 3 (after 1)
```

### 3. Spawn Agents

For each stream:

```yaml
Use Task tool with:
  description: "Stream {N}: {brief}"
  subagent_type: "general-purpose"
  prompt: |
    Implement work stream in worktree: {worktree_path}
    
    Stream: {stream_name}
    Files: {your_files_only}
    
    Requirements:
    {detailed from task}
    
    CRITICAL:
    - Work ONLY on your files
    - Commit format: "Issue #{id}: {change}"
    - Return ONLY summary (not code)
    
    Return:
    - What completed
    - Files modified
    - Commits made
    - Test results
    - Blockers (if any)
```

### 4. Coordinate Execution

- Monitor agent responses
- Track completions
- Handle blockers
- Launch dependent streams when ready

### 5. Consolidate Results

```markdown
# Parallel Execution Summary: #{issue}

## Status
✅ Complete / ⚠️ Partial / ❌ Blocked

## Completed Streams
- Stream 1: {summary} ✅
- Stream 2: {summary} ✅

## Files Modified
{unique list from all streams}

## Commits
- {count} commits
- Range: {first}..{last}

## Tests
- Passed: {count}
- Failed: {count} (details below)
- Coverage: {percent}%

## Git Status
- Branch: {branch}
- Working tree: {Clean/Has changes}

## Metrics
- Sequential estimate: {X}h
- Parallel actual: {Y}h
- Speedup: {X/Y}x

## Next Steps
{Recommended action}
```

## Coordination Strategies

**File Conflicts:** Serialize access (one stream finishes, then next)
**Blockers:** Check if other stream provides; escalate if not
**Dependencies:** Wait for prerequisite stream completion

## Success Patterns

- ✅ 40-70% time savings vs sequential
- ✅ 3-5 agents optimal (avoid oversubscription)
- ✅ Clear file ownership prevents conflicts
- ✅ Main thread stays clean (no code dumps)

Shield main conversation from implementation noise. Return only essential summaries.
