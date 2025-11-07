# CCPM Cheat Sheets & Quick Reference

## Command Quick Reference

### Starting a New Feature

```bash
# 1. Create PRD
/pm:prd-new {feature-name}

# 2. Create Epic from PRD
/pm:prd-parse {feature-name}

# 3. Decompose into tasks
/pm:epic-decompose {feature-name}

# 4. Sync to GitHub
/pm:epic-sync {feature-name}

# 5. Start work
cd ../epic-{feature-name}
/pm:issue-start {issue-id}
```

### Checking Status

```bash
# Project overview
/pm:status

# List all PRDs
/pm:prd-list

# List all epics
/pm:epic-list

# Show epic details
/pm:epic-show {feature-name}

# What should I work on next?
/pm:next

# List blocked tasks
/pm:blocked

# List in-progress tasks
/pm:in-progress
```

### Working on Tasks

```bash
# Show task details
/pm:issue-show {issue-id}

# Start working on task
/pm:issue-start {issue-id}

# Sync progress to GitHub
/pm:issue-sync {issue-id}

# Mark task complete
/pm:issue-close {issue-id}

# Reopen task
/pm:issue-reopen {issue-id}
```

### Context Management

```bash
# Create initial context
/context:create

# Update context
/context:update

# Load context into conversation
/context:prime
```

### Git Operations

```bash
# List worktrees
git worktree list

# Switch to worktree
cd ../epic-{feature-name}

# Back to main
cd -

# Remove worktree (when epic done)
git worktree remove ../epic-{feature-name}
```

### GitHub Operations

```bash
# Check authentication
gh auth status

# List issues for epic
gh issue list --label "epic:{name}"

# View epic issue
gh issue view {issue-number}

# Create PR from worktree
gh pr create --title "Epic: {name}" --body "..."
```

---

## Workflow Visual Cheat Sheet

```
┌─────────────────────────────────────────┐
│ 1. PRD (What to build)                  │
│    /pm:prd-new {name}                   │
│    → .claude/prds/{name}.md             │
└──────────────┬──────────────────────────┘
               │ 30-45 min
               ▼
┌─────────────────────────────────────────┐
│ 2. Epic (How to build)                  │
│    /pm:prd-parse {name}                 │
│    → .claude/epics/{name}/epic.md       │
└──────────────┬──────────────────────────┘
               │ 15-30 min
               ▼
┌─────────────────────────────────────────┐
│ 3. Tasks (Concrete work items)          │
│    /pm:epic-decompose {name}            │
│    → .claude/epics/{name}/001.md, ...   │
└──────────────┬──────────────────────────┘
               │ 10-20 min
               ▼
┌─────────────────────────────────────────┐
│ 4. GitHub Sync                          │
│    /pm:epic-sync {name}                 │
│    → Epic + Sub-issues + Worktree       │
└──────────────┬──────────────────────────┘
               │ 2-3 min
               ▼
┌─────────────────────────────────────────┐
│ 5. Execute (Parallel)                   │
│    /pm:issue-start {issue-id}           │
│    → Code gets written!                 │
└─────────────────────────────────────────┘
```

---

## File Structure Cheat Sheet

```
project-root/
├── .claude/
│   ├── prds/                  # Product Requirements
│   │   └── feature-name.md
│   │
│   ├── epics/                 # Implementation Plans
│   │   └── feature-name/
│   │       ├── epic.md        # Technical plan
│   │       ├── 235.md         # Task (renamed from 001.md)
│   │       ├── 236.md         # Task (renamed from 002.md)
│   │       └── updates/       # Progress tracking
│   │           └── 235/
│   │               ├── analysis.md
│   │               └── stream-1.md
│   │
│   ├── context/               # Project Context
│   │   ├── project-overview.md
│   │   ├── architecture.md
│   │   ├── codebase-structure.md
│   │   ├── development-setup.md
│   │   ├── testing-strategy.md
│   │   ├── deployment-process.md
│   │   ├── api-patterns.md
│   │   ├── database-schema.md
│   │   └── tech-stack.md
│   │
│   ├── commands/              # Slash commands
│   │   └── pm/
│   │
│   ├── agents/                # Specialized agents
│   │   ├── parallel-worker.md
│   │   ├── code-analyzer.md
│   │   ├── file-analyzer.md
│   │   └── test-runner.md
│   │
│   └── rules/                 # Operational rules
│       ├── agent-coordination.md
│       ├── github-operations.md
│       └── worktree-operations.md
│
└── ../epic-feature-name/      # Git worktree (outside main)
    ├── src/                   # Isolated development
    ├── .claude/               # Copied context
    └── [same structure as main]
```

---

## PRD Template Cheat Sheet

```markdown
---
name: feature-name
description: One-line summary
status: backlog
created: 2025-01-06T12:00:00Z
priority: high
estimated_effort: M
---

# PRD: Feature Name

## Executive Summary
2-3 paragraphs: What, Why, Who, When, Success

## Problem Statement
- Current state
- Pain points with data
- Opportunity

## User Stories
As a {user type}
I want to {action}
So that {benefit}

**Acceptance Criteria:**
- [ ] Given {context}, when {action}, then {result}

## Requirements

### Functional Requirements
FR-1: {Capability description}
- Priority: Critical/High/Medium/Low
- ...

### Non-Functional Requirements
NFR-P-1: Performance < {metric}
NFR-S-1: Security {requirement}

## Success Criteria
- {Metric}: {Current} → {Target} by {date}

## Out of Scope
- {Feature}: Deferred to v2 because {reason}

## Dependencies
- {System}: Required for {capability}

## Risks
| Risk | Probability | Impact | Mitigation |
```

---

## Task Template Cheat Sheet

```markdown
---
name: Task Title
status: open
created: 2025-01-06T12:00:00Z
updated: 2025-01-06T12:00:00Z
github: https://github.com/user/repo/issues/235
depends_on: [001, 002]
parallel: true
conflicts_with: []
estimated_hours: 4
size: M
layer: api
tags: [feature-name, component]
---

# Task: Task Title

## Description
Clear, specific description

## Acceptance Criteria
- [ ] Specific criterion 1
- [ ] Specific criterion 2
- [ ] Tests passing

## Technical Details
- File: `path/to/file.js` - {changes}
- Pattern: {reference to existing code}

## Dependencies
- Task 001: {why needed}

## Testing
- Test: {scenario}

## Definition of Done
- [ ] Code implemented
- [ ] Tests >80% coverage
- [ ] Code reviewed
```

---

## Git Worktree Cheat Sheet

### Create Worktree (automatic via CCPM)
```bash
/pm:epic-sync {feature-name}
# Creates: ../epic-{feature-name}/ on branch epic-{feature-name}
```

### Manual Worktree Operations
```bash
# Create manually
git worktree add ../epic-{name} -b epic-{name}

# List all worktrees
git worktree list

# Switch to worktree
cd ../epic-{name}

# Back to main
cd -
# Or
cd /path/to/main/project

# Remove worktree (when done)
git worktree remove ../epic-{name}

# Prune stale worktrees
git worktree prune

# Move worktree
git worktree move ../epic-{name} ../new-path
```

### Worktree Workflow
```bash
# 1. Create via sync
/pm:epic-sync feature-x

# 2. Work in worktree
cd ../epic-feature-x
[make changes]
git commit -m "Issue #123: Change X"

# 3. When epic done, merge to main
cd /path/to/main
git merge epic-feature-x

# 4. Cleanup
git worktree remove ../epic-feature-x
git branch -d epic-feature-x
```

---

## GitHub CLI Cheat Sheet

### Authentication
```bash
# Login
gh auth login

# Check status
gh auth status

# Refresh token
gh auth refresh

# Logout
gh auth logout
```

### Issues
```bash
# List issues
gh issue list
gh issue list --label "epic"
gh issue list --label "epic:feature-name"

# View issue
gh issue view 123
gh issue view 123 --json title,body,state

# Create issue
gh issue create --title "Title" --body "Body" --label "epic"

# Close issue
gh issue close 123

# Reopen issue
gh issue reopen 123

# Add comment
gh issue comment 123 --body "Comment text"
```

### Pull Requests
```bash
# Create PR
gh pr create --title "Title" --body "Description"

# List PRs
gh pr list

# View PR
gh pr view 456

# Merge PR
gh pr merge 456

# Close PR
gh pr close 456
```

### Labels
```bash
# List labels
gh label list

# Create label
gh label create "epic" --color "8B5CF6" --description "Epic issue"

# Delete label
gh label delete "old-label"
```

### Repository
```bash
# View repository
gh repo view

# Clone repository
gh repo clone user/repo

# Fork repository
gh repo fork

# Create repository
gh repo create my-repo --public
```

---

## Frontmatter Reference

### PRD Frontmatter
```yaml
---
name: feature-name              # Kebab-case name
description: One-line summary   # Brief description
status: backlog                 # backlog|active|completed
created: 2025-01-06T12:00:00Z  # ISO 8601 datetime
updated: 2025-01-06T12:00:00Z  # ISO 8601 datetime
priority: high                  # critical|high|medium|low
estimated_effort: M             # XS|S|M|L|XL
target_quarter: Q1 2025         # Target delivery
owner: Team Name                # Responsible team/person
stakeholders: [Alice, Bob]      # List of stakeholders
---
```

### Epic Frontmatter
```yaml
---
name: feature-name
description: Technical summary
status: planning                # planning|in-progress|completed
created: 2025-01-06T12:00:00Z
updated: 2025-01-06T12:00:00Z
prd: .claude/prds/feature-name.md
priority: high
estimated_effort_days: 10
target_start: 2025-01-10
target_completion: 2025-01-20
github: https://github.com/user/repo/issues/234
github_issue: 234
progress: 0                     # 0-100
tasks_total: 11
tasks_completed: 0
---
```

### Task Frontmatter
```yaml
---
name: Task title
status: open                    # open|in-progress|completed
created: 2025-01-06T12:00:00Z
updated: 2025-01-06T12:00:00Z
github: https://github.com/user/repo/issues/235
depends_on: [234, 235]          # Task IDs this depends on
parallel: true                  # Can run in parallel?
conflicts_with: [236]           # Tasks modifying same files
estimated_hours: 4              # 1-24 hours
size: M                         # XS|S|M|L|XL
layer: api                      # database|api|frontend|testing|infra
tags: [feature-name, auth]      # Categorization tags
---
```

---

## Keyboard Shortcuts (Terminal)

### Navigation
```bash
Ctrl+A    # Move to beginning of line
Ctrl+E    # Move to end of line
Ctrl+U    # Delete from cursor to beginning
Ctrl+K    # Delete from cursor to end
Ctrl+W    # Delete word before cursor
Ctrl+L    # Clear screen (keep current line)
```

### History
```bash
↑         # Previous command
↓         # Next command
Ctrl+R    # Search command history
!!        # Repeat last command
!$        # Last argument of previous command
```

### Process Control
```bash
Ctrl+C    # Kill current process
Ctrl+Z    # Suspend process (bg to resume)
Ctrl+D    # Exit shell (or EOF)
```

---

## Common Patterns

### Creating a Feature (Full Workflow)
```bash
# 1. PRD
/pm:prd-new user-profile

# 2. Epic
/pm:prd-parse user-profile

# 3. Tasks
/pm:epic-decompose user-profile

# 4. Sync
/pm:epic-sync user-profile

# 5. Work
cd ../epic-user-profile
/pm:issue-start 235

# 6. Progress
git add .
git commit -m "Issue #235: Add user schema"
/pm:issue-sync 235

# 7. Complete
/pm:issue-close 235

# 8. Next task
/pm:next
```

### Quick Feature (Simplified)
```bash
# 1. Quick PRD (pre-written)
cat > .claude/prds/quick-fix.md <<EOF
[Your requirements]
EOF

# 2. Direct to code
# [Implement fix]

# 3. Commit
git commit -m "Fix: {description}"
```

### Reviewing Progress
```bash
# Morning standup
/pm:standup

# Check status
/pm:status

# See what's blocked
/pm:blocked

# Next priority
/pm:next
```

---

## Environment Variables

```bash
# Enable debug mode
export CCPM_DEBUG=1

# Custom .claude directory
export CCPM_DIR=/custom/path/.claude

# GitHub token (if not using gh CLI)
export GITHUB_TOKEN=ghp_xxxxx

# Worktree parent directory
export CCPM_WORKTREE_DIR=/custom/worktrees
```

---

## Useful Aliases

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# CCPM shortcuts
alias prd='f(){ /pm:prd-new "$1"; }; f'
alias epic='f(){ /pm:epic-show "$1"; }; f'
alias task='f(){ /pm:issue-show "$1"; }; f'
alias next='/pm:next'
alias status='/pm:status'
alias standup='/pm:standup'

# Git worktree shortcuts
alias wt='git worktree'
alias wtlist='git worktree list'
alias wtcd='f(){ cd ../epic-"$1"; }; f'

# GitHub CLI shortcuts
alias ghis='gh issue list'
alias ghpr='gh pr list'
alias ghview='f(){ gh issue view "$1"; }; f'
```

---

## Quick Diagnostic Commands

```bash
# Check CCPM setup
ls -la .claude/

# Check git setup
git remote -v
git branch -a
git worktree list

# Check GitHub CLI
gh --version
gh auth status
gh repo view

# Check epic status
find .claude/epics -name "epic.md" -exec grep "^status:" {} \;

# Check task statuses
find .claude/epics -name "[0-9]*.md" -exec grep "^status:" {} \;

# Count tasks by status
grep -r "^status: open" .claude/epics/ | wc -l
grep -r "^status: in-progress" .claude/epics/ | wc -l
grep -r "^status: completed" .claude/epics/ | wc -l
```

---

## Time Estimates

| Activity | Time | Notes |
|----------|------|-------|
| PRD creation | 30-45 min | Thorough brainstorming |
| Epic planning | 15-30 min | Technical approach |
| Task decomposition | 10-20 min | For 5-15 tasks |
| GitHub sync | 2-3 min | Automated |
| Parallel execution | 40-70% faster | vs sequential |
| Code review | 5-10 min/task | With Quality Guardian |
| Context creation | 10-15 min | Initial setup |
| Context update | 2-5 min | Incremental |

---

## Success Metrics

**Good CCPM Usage:**
- ✅ 100% features have PRDs
- ✅ All code traces to requirements
- ✅ 60%+ tasks run in parallel
- ✅ Context updated weekly
- ✅ < 5% scope creep detected

**Metrics to Track:**
- Time saved via parallelization
- Bugs caught in code review
- Requirements coverage %
- Context switching frequency
- Developer onboarding time

---

## Emergency Quick Fixes

### Reset Everything
```bash
# ⚠️ DESTRUCTIVE - backup first!
rm -rf .claude/
/pm:init
```

### Fix Broken Sync
```bash
# Re-authenticate
gh auth login

# Verify
gh auth status

# Retry
/pm:epic-sync {name}
```

### Clean Stale Worktrees
```bash
# List
git worktree list

# Prune
git worktree prune

# Force remove
git worktree remove --force ../epic-{name}
```

### Recover from Bad State
```bash
# 1. Stash changes
git stash

# 2. Clean working directory
git clean -fd

# 3. Reset to known good state
git reset --hard origin/main

# 4. Restore if needed
git stash pop
```

---

## Version Information

```bash
# Check CCPM version
cat .claude/VERSION

# Check dependencies
gh --version
git --version
node --version  # If using Node.js features
python --version  # If using Python scripts
```

---

## Learning Path

**Beginner (Day 1):**
1. `/pm:init` - Setup
2. Create first PRD
3. Create first Epic
4. Understand workflow

**Intermediate (Week 1):**
1. Master task decomposition
2. Use parallel execution
3. Sync with GitHub
4. Review with Quality Guardian

**Advanced (Month 1):**
1. Optimize parallelization
2. Custom context curation
3. Multiple epics simultaneously
4. Team collaboration patterns

---

## Pro Tips

1. **Commit frequently** in worktrees (every 30 min)
2. **Update context** after major changes
3. **Review PRD with team** before coding
4. **Break tasks** into 2-8 hour chunks
5. **Use parallel execution** for 3+ tasks
6. **Validate with Quality Guardian** before merge
7. **Clean worktrees** when epic complete
8. **Document assumptions** with ⚠️ in PRDs
9. **Flag unknowns** with ❓ in context
10. **Measure metrics** to improve process
