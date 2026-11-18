---
name: content-change
description: Change Learning Hub content the standard way — issue on Project #1, branch, edit lessons/exercises/quizzes per the content spec, run the commands and the validator, commit, PR with Closes, review, squash merge. Use for any fix or addition in a track repo learning-hub-track-<slug> (typo, wrong answer, new lesson, new exercise, review of a track).
---

# Change content

Since ADR-10 each track has its own repo, `hcmute-dsc/learning-hub-track-<slug>`; this repo is only the registry. Do the work below **in the track repo** (clone it next to `../learning-hub`). Rules: `AGENTS.md` and `CONTRIBUTING.md` of the track repo. Format: learning-hub-docs `docs/product/CONTENT-SPECIFICATION.md`.

## 1. Issue and branch

```bash
gh issue list --repo hcmute-dsc/learning-hub-track-<slug> --state all --search "<keywords>"
```

If no issue fits, open one:
- **Errors**: template "Lỗi nội dung", label `bug`. Say which lesson, what is wrong, and what it should be.
- **New material**: "Đề xuất", label `enhancement`.

Then fill in **every** sidebar field: type, label, assignee, milestone, the board fields, the sprint, and the org Priority/Effort/dates. The list and how to choose values: learning-hub-docs `docs/ops/WORKFLOW.md` §1.1. The helper lives in the code repo, which CONTRIBUTING already asks you to clone next to this one; it fills everything in one call:

```bash
bash ../learning-hub/.claude/skills/start-task/project-item.sh <issue-url> \
  Type=Bug Label=bug "Status=In progress" "Priority=P2 - Bình thường" Area=Content Size=S \
  "Epic=Phase 0" Sprint=@current "Milestone=Phase 0 — Dùng thử" Assignee=@me
git switch main && git pull --ff-only && git switch -c fix/<issue>-<slug>
```

- Wrong content is `Type=Bug Label=bug`.
- New lessons or tracks are `Type=Feature Label=enhancement`.
- A track review is `Type=Task Label=content`.

The PR gets the same assignee, label, milestone and board fields, with `Status=In review`.

A review of a whole track produces many findings. Log them in one issue with a checklist grouped by severity (Cao, Trung bình, Thấp), then ship one PR per severity group. See issue #1 and PRs #2, #3.

## 2. Edit

- Layout: `tracks/<track>/track.yaml` → `modules/<nn-slug>/module.yaml` → lesson `.md` and exercise files. Every file must be listed in its `module.yaml`, or the validator reports an "orphan".
- Never change an existing `uid`. Renames, new slugs and moves are fine.
- A new item needs a new `uid`: `node -e "console.log(crypto.randomUUID())"`.
- No executable HTML (`<script>`, `<iframe>`, `on…=`) outside code blocks.

## 3. Verify

- **Run every SQL or command you touched** on the track's own setup, not from memory:

  ```bash
  cd tracks/sql-30-days && docker compose up -d
  ```

  Then run the statements with `psql`. Compare the output with what the lesson says.
- Quiz and exercise answers must match the questions. Re-read each changed question next to its answer.
- Validator:

  ```bash
  node ../learning-hub/packages/content/dist/cli.js .
  ```

  Build it first if `dist/` is missing: see CONTRIBUTING step 3.

## 4. Commit and PR

```
sql-30-days: sửa đáp án bài 3 Ngày 10

Vì sao sai / vì sao thêm.

Refs #<issue>
```

```bash
git push -u origin HEAD
gh pr create --repo hcmute-dsc/learning-hub-track-<slug> --base main --title "<commit title>" --body-file pr.md
```

Fill the body from `.github/pull_request_template.md`:
- `Closes #<n>` as the first line;
- what changed, and the reason for each knowledge or answer fix;
- the change type;
- the self-check boxes.

Wait for `validate` to go green:

```bash
gh pr checks <n> --repo hcmute-dsc/learning-hub-track-<slug> --watch
```

Self-review with `../learning-hub/.claude/skills/review-pr/SKILL.md` (content section). Then hand the PR to the maintainer listed in `CODEOWNERS` to review and squash merge. Don't merge without their yes in chat.

## 5. After merge

Ask whether to publish now, then use `publish-content`. The issue is Done only once the change is live on the site.
