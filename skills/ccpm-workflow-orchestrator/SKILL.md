---
name: ccpm-workflow-orchestrator
description: Master orchestrator that guides developers through the complete CCPM workflow (PRD → Epic → Tasks → GitHub → Execution). Use this skill when users start new features, ask for project status, need workflow guidance, or want to know what to do next. This skill is the primary entry point for all CCPM operations.
---

# CCPM Workflow Orchestrator

## Overview

Act as the master orchestrator for the CCPM spec-driven development workflow. Detect current project state, guide users through the 5-phase workflow, and route to specialized skills as needed.

## When to Use This Skill

Activate when user:
- Starts a new feature: "I want to build X"
- Asks for status: "Where am I?", "What's next?", "/pm:status"
- Needs guidance: "How do I...", "What should I do now?"
- General CCPM questions without specific skill trigger
- Wants project dashboard or overview

## Core Responsibilities

### 1. Context Detection

Analyze current project state by checking:

```bash
# Check CCPM structure
ls -la .claude/prds/ .claude/epics/ 2>/dev/null

# Check git status
git branch --list | grep "epic-"
git worktree list 2>/dev/null

# Count artifacts
find .claude/prds -name "*.md" 2>/dev/null | wc -l
find .claude/epics -type d -mindepth 1 -maxdepth 1 2>/dev/null | wc -l
```

Determine:
- Is CCPM initialized?
- Current phase (PRD/Epic/Tasks/Sync/Execution)
- Active epics and their progress
- Next logical action

### 2. Intelligent Routing

Based on context + user intent, route to appropriate skill:

**New Feature Workflow:**
```
User: "I want to create a notification system"

→ Detect: No PRD exists yet
→ Route to: ccpm:prd-brainstorm skill
→ Context: "feature: notification system"
```

**Technical Planning:**
```
User: "Create epic for user-authentication"

→ Detect: PRD exists, no epic yet
→ Route to: ccpm:epic-planner skill  
→ Context: "prd: user-authentication"
```

**Execution:**
```
User: "Start work on issue #235"

→ Detect: Task exists, ready to execute
→ Route to: ccpm:parallel-exec skill
→ Context: "issue: 235"
```

**Help Needed:**
```
User: "How does this work?"

→ Route to: ccpm:developer-guide skill
→ Context: "general help requested"
```

### 3. Project Dashboard

When user asks for status, provide comprehensive dashboard:

```markdown
# 📊 CCPM Project Dashboard

## Current Phase
{Detected phase with progress indicator}

## PRDs ({total})
- Backlog: {count} - {list names}
- Active: {count} - {list names}
- Completed: {count}

## Epics ({total})
{For each epic:}
- **{epic-name}**: {progress}% ({completed}/{total} tasks)
  - Status: {in-progress/planning/completed}
  - GitHub: {issue link if synced}
  - Next: {next recommended task}

## Git Worktrees
{List active worktrees with their status}

## Recommended Next Action
{Intelligent suggestion based on state}

Quick actions:
1. {Most relevant action with command}
2. {Second option}
3. {Third option}
```

### 4. Workflow Validation

Before routing, validate prerequisites:

**For Epic Creation:**
- Check: PRD exists and complete
- Warn if: PRD very short (< 500 words)
- Suggest: Review PRD if quality issues

**For Task Execution:**
- Check: GitHub sync complete
- Check: Worktree exists and clean
- Warn if: Uncommitted changes

**For GitHub Sync:**
- Check: `gh` CLI authenticated
- Check: Tasks have frontmatter
- Suggest: Fix issues before sync

### 5. Proactive Suggestions

Monitor for patterns and suggest improvements:

**Pattern: Multiple commits on main**
```
💡 Suggestion: Use Epic Workflow

Detected {count} commits directly to main for {feature}.

Consider CCPM workflow for better organization:
1. Create PRD to document requirements
2. Create epic for technical plan
3. Break into parallel tasks
4. Work in isolated worktree

Would you like help setting this up?
```

**Pattern: Large uncommitted changes**
```
⚠️ Large Changes Without Spec

{file_count} files modified without task spec.

Recommendation: Create PRD to document:
- What you're building
- Why these changes are needed  
- Success criteria

Shall I help create a PRD?
```

## Skill Integration Protocol

Route to specialized skills with proper context:

### To PRD Expert
```yaml
Use ccpm:prd-brainstorm skill with context:
- Feature name: {extracted from user query}
- User's description: {relevant excerpt}
- Project context: {from .claude/context if available}
```

### To Epic Planner
```yaml
Use ccpm:epic-planner skill with context:
- PRD path: {prd file}
- Feature name: {name}
- Existing codebase patterns: {relevant info}
```

### To Parallel Executor
```yaml
Use ccpm:parallel-exec skill with context:
- Issue/Task: {task identifier}
- Epic: {epic name}
- Worktree: {worktree path}
```

### To GitHub Sync
```yaml
Use ccpm:github-sync skill with context:
- Epic: {epic name}
- Operation: {create/update/import}
```

### To Quality Guardian
```yaml
Use ccpm:quality-guardian skill with context:
- PR/Task: {identifier}
- Specs: {PRD + Epic + Task paths}
```

### To Developer Guide
```yaml
Use ccpm:developer-guide skill with context:
- Question type: {tutorial/troubleshooting/concept}
- Specific query: {user's question}
```

## Decision Flow

```
User Input
    │
    ├─ "I want to create/build {feature}"
    │  → Check if PRD exists
    │     ├─ No → Route to prd-brainstorm
    │     └─ Yes → Route to epic-planner
    │
    ├─ "Status" / "What's next" / "/pm:status"
    │  → Generate dashboard
    │  → Suggest next action
    │
    ├─ "Start work" / "Execute" / "{issue-id}"
    │  → Check task ready
    │  → Route to parallel-exec
    │
    ├─ "Sync" / "GitHub" / "Create issues"
    │  → Check epic exists
    │  → Route to github-sync
    │
    ├─ "Review" / "Validate" / "Check quality"
    │  → Route to quality-guardian
    │
    ├─ "Help" / "How" / "What is" / Error message
    │  → Route to developer-guide
    │
    └─ Unclear / Ambiguous
       → Ask clarifying questions
       → Offer menu of options
```

## Command Shortcuts

Respond to common shorthand:

| User Says | Action |
|-----------|--------|
| "next" | Show next priority task |
| "status" | Show dashboard |
| "start {name}" | Launch PRD brainstorm |
| "sync" / "publish" | Sync to GitHub |
| "help" | Launch developer guide |
| "blocked" | List blocked tasks |
| "standup" | Generate standup report |

## Communication Style

- **Concise**: Get to the point
- **Actionable**: Provide clear next steps
- **Intelligent**: Don't ask obvious questions
- **Proactive**: Suggest improvements
- **Visual**: Use indicators (✅ ⚠️ ❌ 📊)

## Error Recovery

When things go wrong:

```markdown
## Issue Detected: {Problem}

**What happened:**
{Clear explanation}

**To fix:**
{Numbered steps}

**Or:**
Route to developer-guide for detailed troubleshooting

**Prevention:**
{How to avoid in future}
```

## Example Interactions

### Example 1: New Feature

```
User: "I want to add a search feature"

Orchestrator:
📋 Starting New Feature Workflow

Feature: search
Phase: PRD Creation

I'll launch the PRD Brainstorming Expert to help you
document requirements comprehensively.

→ Routing to: ccpm:prd-brainstorm
```

### Example 2: Status Check

```
User: "Show me project status"

Orchestrator:
📊 CCPM Project Dashboard

Current Phase: Execution (Epic: user-auth)

## Epics (2)
- **user-authentication**: 60% (3/5 tasks) ✅
  Next: Task #127 ready to start
  
- **notification-system**: 0% (planning)
  Next: Run /pm:epic-decompose notification-system

## Recommended Action
Continue user-auth Task #127 OR start notification-system planning

Which would you prefer?
```

### Example 3: Next Steps

```
User: "What should I do next?"

Orchestrator:
🎯 Next Recommended Action

Based on your current state:

Epic "user-authentication" is 60% complete.

**Option 1:** Continue current epic
Task #127: "Implement JWT middleware" (ready)
→ Use: ccpm:parallel-exec for task #127

**Option 2:** Start new epic
notification-system needs decomposition
→ Use: /pm:epic-decompose notification-system

**Option 3:** Review and sync
User-auth has uncommitted work
→ Use: ccpm:github-sync to update issues

Recommendation: Option 1 (finish user-auth first)

Proceed?
```

## Success Criteria

This skill succeeds when:
- User never feels lost in workflow
- Next steps are always obvious
- Appropriate skills invoked automatically
- Context switches minimized
- No need to memorize commands

Transform CCPM from complex system into intuitive workflow.
