# Rules for coding agents (Claude Code, Codex, Cursor…)

This repo is the **registry** of the HCMUTE DSC Learning Hub (DECISIONS ADR-10): `tracks.yaml` says which repo holds each track and which commit of it is published. Lessons and exercises live in the track repos, `hcmute-dsc/learning-hub-track-<slug>`, each with its own AGENTS.md. Agents follow the same process as people: [CONTRIBUTING.md](CONTRIBUTING.md), and the project-wide [WORKFLOW.md](https://github.com/hcmute-dsc/learning-hub-docs/blob/main/docs/ops/WORKFLOW.md) (§2 and §7). The format is defined in [CONTENT-SPECIFICATION.md](https://github.com/hcmute-dsc/learning-hub-docs/blob/main/docs/product/CONTENT-SPECIFICATION.md).

## Non-negotiable

1. **No issue, no work.**
   - Every change maps to an issue in this repo on org Project #1.
   - Content errors go to the track repo's issues ("Lỗi nội dung" template, label `bug`).
   - Find an existing issue before opening one.
2. **Never push to `main`.**
   - Branch `<type>/<issue>-<slug>`.
   - Commits `<track>: <tóm tắt>` (a publish is `<slug>: publish <short sha>`) + `Refs #n`.
   - PR from the template with `Closes #n`, validator CI green, maintainer review, squash merge.
3. **`uid` never changes.** It keys members' progress. New lessons and exercises get a new UUID.
4. **Content edits happen in the track repo**, never under `tracks/` here. Every SQL or shell command in a lesson must run on the track's setup (`tracks/<track>/setup`, `docker-compose.yml`). Check answers against the questions. `tracks.yaml` pins full 40-character commits on the track repo's `main`.
5. **Credit sources.** Content from elsewhere names its source and author, in the PR and in `track.yaml` `source`.
6. **Merged is not live.** Tracks in their own repo (`learning-hub-track-<slug>`, ADR-10) go live through a PR here that changes their `commit` in `tracks.yaml`; then an admin syncs and publishes it on the site. Publishing is an outward action, so ask the user first. Skill: `publish-content`.
7. **Public repo.** No secrets, member emails or private links. Hidden tests and solutions for `code` exercises never go here.
8. Write in clear, simple Vietnamese. Technical terms stay in English.

## Skills in this repo (`.claude/skills/`)

| Skill | Use when |
| --- | --- |
| `content-change` | fixing or adding lessons, exercises or quizzes in a track repo, from issue to PR |
| `publish-content` | a merged change must go live on learn.hcmute-dsc.io.vn |

For bugs in the web app itself, and for the generic `start-task`, `fix-bug`, `ship-pr` and `review-pr` skills, see `../learning-hub/.claude/skills/`.
