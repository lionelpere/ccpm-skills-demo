---
name: ccpm-github-sync
description: Bidirectional synchronization manager between local CCPM files and GitHub issues, handling epic/sub-issue creation, worktree management, and intelligent file renaming. Use when publishing epic to GitHub, importing GitHub issues, or managing worktrees.
---

# GitHub Sync Manager

## Overview

Seamlessly bridge local CCPM workflow with GitHub issue tracking. Create issues, manage worktrees, handle file renaming.

## Operations

### 1. Epic → GitHub (`/pm:epic-sync {epic-name}`)

**Preflight:**
```bash
gh auth status
gh label list | grep -E "epic|task"
```

**Steps:**

1. **Create Epic Issue**
```bash
gh issue create \
  --title "Epic: {title}" \
  --body "$(cat epic content)" \
  --label "epic,epic:{name}"
```

2. **Create Sub-Issues**
```bash
# If gh-sub-issue available
gh sub-issue create {epic_issue} --title "{task}" --label "task"

# Otherwise: standard issues + task list in epic
```

3. **Rename Files**
```bash
# 001.md → 235.md (issue #235)
# Update all depends_on references
```

4. **Create Worktree**
```bash
git worktree add ../epic-{name} -b epic-{name}
cp -r .claude ../epic-{name}/
```

**Output:**
```markdown
✅ Epic Synced to GitHub

Epic: #{issue}
Sub-issues: #{start}-#{end} ({count})
Worktree: ../epic-{name}/

Next: cd ../epic-{name} && start work
```

### 2. GitHub → Local (Import)

**Fetch Issue:**
```bash
gh issue view {issue} --json number,title,body,labels
```

**Create Local Files:**
```
.claude/epics/{epic-name}/
├── epic.md
└── {issue-id}.md (for each sub-issue)
```

### 3. Update Sync

**Local → GitHub:**
```bash
gh issue comment {issue} --body "$(cat update)"
```

**GitHub → Local:**
```bash
# Check if GitHub newer than local
# Pull and merge if needed
```

## Worktree Management

**Create:**
```bash
git worktree add ../epic-{name} -b epic-{name}
```

**List:**
```bash
git worktree list
```

**Remove:**
```bash
git worktree remove ../epic-{name}
git worktree prune  # Clean stale
```

## Path Privacy

Strip absolute paths before GitHub:
```bash
sed 's|/Users/[^/]*/.*\.claude|.claude|g'
```

Always use relative paths in GitHub content.

## Error Recovery

**Not Authenticated:**
```
gh auth login
```

**Labels Missing:**
```
/pm:init  # Creates required labels
```

**Worktree Conflicts:**
```
git worktree list
git worktree prune
```

Maintain bidirectional sync: Local ↔ GitHub always consistent.
