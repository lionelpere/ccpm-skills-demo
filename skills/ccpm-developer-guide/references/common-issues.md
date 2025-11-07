# CCPM Troubleshooting - Common Issues & Solutions

## Index par Symptôme

- [Can't find .claude directory](#issue-cant-find-claude-directory)
- [gh CLI not found](#issue-gh-cli-not-found)
- [Not authenticated with GitHub](#issue-not-authenticated-with-github)
- [GitHub sync failing](#issue-github-sync-failing)
- [Task files not renamed after sync](#issue-task-files-not-renamed)
- [Worktree has uncommitted changes](#issue-worktree-uncommitted-changes)
- [Worktree creation failed](#issue-worktree-creation-failed)
- [Circular dependency detected](#issue-circular-dependency)
- [Epic decompose asks too many questions](#issue-prd-too-many-questions)
- [Parallel execution is slow](#issue-parallel-execution-slow)
- [Context becomes stale](#issue-context-stale)
- [Labels missing on GitHub](#issue-labels-missing)
- [Sub-issues not created](#issue-sub-issues-not-created)

---

## Issue: Can't find .claude directory

### Symptômes
```
Error: .claude/prds/ directory not found
Error: Cannot find epic file
```

### Diagnostic
CCPM n'est pas initialisé dans ce repository.

### Solution

**Étape 1: Initialiser CCPM**
```bash
/pm:init
```

Ce command:
- Crée structure `.claude/`
- Installe gh CLI (si nécessaire)
- Configure GitHub labels
- Crée contexte initial

**Étape 2: Vérifier la structure**
```bash
ls -la .claude/
```

Devrait montrer:
```
.claude/
├── prds/
├── epics/
├── context/
├── commands/
├── agents/
└── rules/
```

### Prévention
Toujours run `/pm:init` dans un nouveau repository avant de commencer.

---

## Issue: gh CLI not found

### Symptômes
```
Error: gh: command not found
```

### Diagnostic
GitHub CLI n'est pas installé sur le système.

### Solution par Platform

**macOS:**
```bash
brew install gh
```

**Linux (Debian/Ubuntu):**
```bash
sudo apt update
sudo apt install gh
```

**Linux (Fedora/RHEL):**
```bash
sudo dnf install gh
```

**Windows:**
```bash
winget install GitHub.cli
```

**Vérifier l'installation:**
```bash
gh --version
# Devrait afficher: gh version 2.x.x
```

### After Installation
```bash
# Authenticate
gh auth login

# Verify
gh auth status
```

---

## Issue: Not authenticated with GitHub

### Symptômes
```
Error: not authenticated with GitHub
Error: HTTP 401: Unauthorized
```

### Diagnostic
```bash
gh auth status
```

Output si pas authentifié:
```
You are not logged into any GitHub hosts
```

### Solution

**Étape 1: Authentification**
```bash
gh auth login
```

**Étape 2: Suivre les prompts**
```
? What account do you want to log into?
  > GitHub.com

? What is your preferred protocol for Git operations?
  > HTTPS

? Authenticate Git with your GitHub credentials?
  > Yes

? How would you like to authenticate GitHub CLI?
  > Login with a web browser
```

**Étape 3: Browser s'ouvre**
- Code affiché dans terminal (ex: ABC1-2DEF)
- Copier le code
- Coller dans browser
- Authorize GitHub CLI

**Étape 4: Vérifier**
```bash
gh auth status
```

Output si authentifié:
```
✓ Logged in to github.com as username
✓ Git operations for github.com configured to use https protocol.
✓ Token: *******************
```

### Cas Spéciaux

**Token expiré:**
```bash
gh auth refresh
```

**Permissions insuffisantes:**
```bash
gh auth refresh -s repo,write:org
```

**Multiple accounts:**
```bash
gh auth login --hostname github.com --web
```

---

## Issue: GitHub sync failing

### Symptômes
```
Error: Failed to create epic issue
Error: Failed to create sub-issue
Error: Rate limit exceeded
```

### Diagnostic Steps

**Test 1: Authentication**
```bash
gh auth status
```

**Test 2: Repository access**
```bash
gh repo view
```

**Test 3: Network**
```bash
ping github.com
```

**Test 4: Rate limit**
```bash
gh api rate_limit
```

### Solutions par Cause

**Cause 1: Authentication Failed**
```bash
gh auth login
```

**Cause 2: No repository access**
```bash
# Check if in git repository
git remote -v

# If not:
git init
git remote add origin https://github.com/user/repo.git
```

**Cause 3: Rate limit exceeded**
```
Wait until rate limit resets (shown in gh api rate_limit)
Or use authenticated requests (gh auth login)
```

**Cause 4: Permissions insuffisantes**
```bash
gh auth refresh -s repo,write:org
```

**Cause 5: Network issues**
```bash
# Test connectivity
curl -I https://api.github.com

# If behind proxy, configure:
gh config set http_proxy http://proxy.example.com:8080
```

---

## Issue: Task files not renamed

### Symptômes
After `/pm:epic-sync`, files still named `001.md`, `002.md` instead of `{issue-id}.md`.

### Diagnostic
```bash
# Check epic frontmatter
grep "^github:" .claude/epics/{epic-name}/epic.md

# Check if GitHub issues were created
gh issue list --label "epic:{epic-name}"
```

### Possible Causes & Solutions

**Cause 1: Sync failed mid-process**
```bash
# Re-run sync
/pm:epic-sync {epic-name}
```

**Cause 2: File permissions**
```bash
# Check permissions
ls -la .claude/epics/{epic-name}/

# Fix if needed
chmod u+w .claude/epics/{epic-name}/*.md
```

**Cause 3: Git worktree issues**
```bash
# Check worktree status
git worktree list

# Prune if stale
git worktree prune

# Re-run sync
/pm:epic-sync {epic-name}
```

### Manual Fix
```bash
# Get issue mapping
gh issue list --label "epic:{epic-name}" --json number,title

# Rename manually (example)
mv .claude/epics/{epic}/001.md .claude/epics/{epic}/235.md

# Update references in files
# sed -i 's/001/235/g' .claude/epics/{epic}/*.md
```

---

## Issue: Worktree uncommitted changes

### Symptômes
```
Error: cannot sync - worktree has uncommitted changes
Error: working tree is not clean
```

### Diagnostic
```bash
cd ../epic-{name}
git status
```

### Solutions

**Option 1: Commit changes**
```bash
git add .
git commit -m "WIP: {description}"
```

**Option 2: Stash changes**
```bash
git stash save "WIP before sync"

# Later, restore:
git stash pop
```

**Option 3: Create temp branch**
```bash
git checkout -b temp-wip
git add .
git commit -m "Temporary save"
git checkout epic-{name}

# Later, merge back:
git merge temp-wip
git branch -d temp-wip
```

**Option 4: Discard changes (⚠️ DESTRUCTIVE)**
```bash
git reset --hard
git clean -fd
```

### Prévention
Commit fréquemment pendant le développement:
```bash
git commit -m "Issue #{id}: {specific change}"
```

---

## Issue: Worktree creation failed

### Symptômes
```
Error: fatal: '<path>' already exists
Error: '<path>' is not a valid path
Error: insufficient permissions
```

### Solutions par Erreur

**Error: Path already exists**
```bash
# Check if it's a worktree
git worktree list

# If yes, use it:
cd ../epic-{name}

# If no, it's a regular directory:
rm -rf ../epic-{name}  # ⚠️ Backup first!
/pm:epic-sync {name}   # Retry
```

**Error: Invalid path**
```bash
# Check parent directory exists
ls ..

# If not, create:
mkdir -p ../
/pm:epic-sync {name}
```

**Error: Insufficient permissions**
```bash
# Check permissions
ls -la ..

# Fix if needed
chmod u+w ..
```

### Manual Worktree Creation
```bash
# If /pm:epic-sync fails, create manually:
git worktree add ../epic-{name} -b epic-{name}

# Copy .claude for context
cp -r .claude ../epic-{name}/

# Verify
git worktree list
```

---

## Issue: Circular dependency

### Symptômes
```
Warning: Circular dependency detected
Task 003 depends on 005
Task 005 depends on 003
```

### Diagnostic
```bash
# Check dependencies
grep "depends_on:" .claude/epics/{epic}/*.md
```

### Solution
One task doesn't actually depend on the other. Fix frontmatter:

**Example:**
```yaml
# Task 003.md
---
depends_on: [005]  # ❌ Wrong - causes circular
---
```

**Fix:**
```yaml
# Task 003.md
---
depends_on: []  # ✅ Correct - no dependency
---

# OR
depends_on: [001, 002]  # ✅ Correct - different tasks
```

### Prevention
During decomposition, think through dependency order:
1. Database schema (no dependencies)
2. API layer (depends on DB)
3. Frontend (depends on API)
4. Tests (depends on all)

---

## Issue: PRD asks too many questions

### Symptômes
PRD brainstorming takes 1-2 hours, too long.

### When This is OK
For major features, thorough brainstorming (30-60 min) prevents expensive rework later.

### Shortcuts for Simple Features

**Option 1: Pre-filled PRD**
```bash
# Create PRD manually with your requirements
cat > .claude/prds/{name}.md <<EOF
---
name: {name}
description: {description}
status: backlog
created: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
---

# PRD: {name}

[Your existing requirements here]
EOF

# Skip brainstorming, go to epic
/pm:prd-parse {name}
```

**Option 2: Quick PRD mode** (if available)
```
Tell brainstorming: "I have tight timeline, focus on essentials only"
```

### Trade-off
Less brainstorming = higher risk of:
- Missed edge cases
- Unclear requirements
- Scope creep later

**Recommendation:** Invest 30 min in brainstorming for features > 1 day of work.

---

## Issue: Parallel execution slow

### Symptômes
Parallel execution taking almost as long as sequential.

### Diagnostic

**Check 1: Task sizes**
```bash
# Review task estimates
grep "estimated_hours:" .claude/epics/{epic}/*.md
```

**Check 2: Parallelization**
```bash
# Check parallel flags
grep "parallel:" .claude/epics/{epic}/*.md
```

**Check 3: Dependencies**
```bash
# Check dependency graph
grep "depends_on:" .claude/epics/{epic}/*.md
```

### Common Causes & Fixes

**Cause 1: Tasks too large**
```
❌ Task: "Build entire authentication" (24h)
✅ Fix: Break into smaller tasks (2-8h each)
```

**Cause 2: Too many dependencies**
```
❌ Every task depends on previous one (serial)
✅ Fix: Identify truly independent tasks
```

**Cause 3: File conflicts**
```
❌ Multiple tasks modify same files
✅ Fix: Reorganize to separate files
```

**Cause 4: Too many agents**
```
❌ Spawning 10 agents (overhead)
✅ Fix: Limit to 3-5 agents
```

### Optimal Parallelization

**Sweet spot:**
- Tasks: 2-8 hours each
- Agents: 3-5 simultaneous
- Independence: < 30% shared files
- Result: 40-70% time savings

---

## Issue: Context stale

### Symptômes
Context Curator returns outdated information.

### When Context Becomes Stale
- After adding dependencies
- After restructuring code
- After 2+ weeks without update
- After major architectural changes

### Solution
```
"Update project context"

# Or explicit command:
/context:update
```

### What Gets Updated
- Architecture changes
- New dependencies
- Directory structure
- API patterns
- Database schema
- Tech stack versions

### Verification
```bash
# Check last update
grep "last_verified:" .claude/context/*.md

# If > 14 days old, update recommended
```

### Prevention
Update context after:
- Adding new npm package
- Creating new service/module
- Changing database schema
- Restructuring directories

---

## Issue: Labels missing

### Symptômes
```
Error: Label 'epic' not found
Error: Label 'task' not found
```

### Diagnostic
```bash
gh label list
```

### Solution

**Option 1: Run init (creates all labels)**
```bash
/pm:init
```

**Option 2: Create manually**
```bash
gh label create "epic" --color "8B5CF6" --description "Epic issue"
gh label create "task" --color "3B82F6" --description "Task issue"
```

**Required labels:**
- `epic` - For epic issues
- `task` - For task/sub-issues
- `epic:{name}` - Created automatically per epic

### Verification
```bash
gh label list | grep -E "epic|task"
```

---

## Issue: Sub-issues not created

### Symptômes
Epic issue created but no sub-issues.

### Diagnostic
```bash
# Check if gh-sub-issue extension installed
gh extension list | grep sub-issue

# Check for errors
gh issue list --label "epic:{name}"
```

### Cause & Solutions

**Cause 1: gh-sub-issue not installed**
```bash
# Install extension
gh extension install arosset/gh-sub-issue

# Retry sync
/pm:epic-sync {name}
```

**Cause 2: Extension failed**
```bash
# Check logs
gh sub-issue --help

# Upgrade extension
gh extension upgrade arosset/gh-sub-issue
```

**Cause 3: API rate limit**
```bash
# Check rate limit
gh api rate_limit

# Wait or authenticate
gh auth refresh
```

### Fallback: Standard Issues

If gh-sub-issue not available, CCPM creates standard issues and links via epic body:

```markdown
## Tasks
- [ ] #235 - Database schema
- [ ] #236 - API endpoints
- [ ] #237 - Frontend components
```

---

## Getting More Help

### Built-in Help
```bash
/pm:help              # General help
/pm:command-help      # Command reference
```

### Documentation
- CCPM README: `README.md`
- Commands: `COMMANDS.md`
- Agents: `AGENTS.md`

### Community
- GitHub Issues: Report bugs
- GitHub Discussions: Ask questions
- Twitter: @aroussi

### Debugging Mode
```bash
# Enable verbose output
export CCPM_DEBUG=1

# Run command
/pm:epic-sync {name}

# Check logs
cat .claude/logs/ccpm.log
```

---

## Quick Diagnostic Checklist

When something goes wrong:

```
□ CCPM initialized? (/pm:init)
□ gh CLI installed? (gh --version)
□ Authenticated? (gh auth status)
□ In git repository? (git remote -v)
□ Internet connection? (ping github.com)
□ Working directory clean? (git status)
□ Required labels exist? (gh label list)
□ Permissions OK? (ls -la .claude/)
```

If all ✅ but still issues → Check GitHub Issues for known problems.
