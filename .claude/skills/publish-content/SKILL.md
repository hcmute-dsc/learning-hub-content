---
name: publish-content
description: Publish merged track changes (pinned in learning-hub-content tracks.yaml) to https://learn.hcmute-dsc.io.vn — sync the latest main commit into a draft, check the draft's change counts against the merged PRs, publish, verify the track page and the Discord announcement, and close the issues. Use when the user asks to publish content or after a content PR is merged and the user agrees to put it live.
---

# Publish content

Publishing changes what every member sees, and posts to the club's Discord. **Only do it when the user asked for it in chat.**

## 0. Pin the track commit first

Every track lives in its own repo `learning-hub-track-<slug>` (ADR-10) and is read at the commit written there, not at its `main`. Before syncing:

1. `git ls-remote https://github.com/hcmute-dsc/learning-hub-track-<slug> main` gives the commit to publish.
2. Open a PR here that changes that track's `commit` in `tracks.yaml`. Title `<slug>: publish <short sha>`; the body lists the track repo PRs since the last publish.
3. Wait for `validate` (it checks every track together), get the user's review, squash merge.

Then continue below with this repo's new `main` commit.

## 1. Know what you are publishing

```bash
git fetch origin && git log --oneline -10 origin/main
```

Compare this with the commit shown as **Đang dùng** (in use) on the admin page. Everything between the two will go live, so list the PRs involved:

```bash
git diff --stat <in-use-sha> origin/main | tail -1
```

## 2. Sync to a draft

Open https://learn.hcmute-dsc.io.vn/admin/content in the user's browser. It needs their admin session, so never type credentials.

1. Click **Đồng bộ từ GitHub**. This creates a draft and changes nothing for members yet.
2. Open the draft (**Xem chi tiết**). Check:
   - the commit is the expected `origin/main` sha;
   - the counts look right: Thêm (added), Sửa (changed), Xóa (removed).
3. Expect **Xóa = 0** unless a PR removed lessons on purpose. Removed items are archived, but members lose access to them. If the counts don't match the PRs, stop and tell the user. Use **Từ chối** (reject) on a bad draft.

## 3. Publish

Click **Publish**, then confirm in the dialog. The version becomes **Đang dùng**.

## 4. Verify

- Open `/tracks/<slug>`. Check:
  - the lesson and exercise counts;
  - new items appear in the right chapter;
  - the footer `Nguồn: … @ <sha>` shows the new commit.
- Open one or two changed lessons and check the fix is there.
- Ask the user to check the Discord club channel, which agents can't read. They should see a "📚 Nội dung mới đã được publish" message with the track, the lesson titles and, under each track, a link to **that track's repo** ("Xem thay đổi" compare, or "Xem nội dung" for a new track). A publish that adds, changes and removes nothing posts **no** message (learning-hub#25).

## 5. Close the loop

The merged PRs' issues are Done only now. Confirm each one is closed and on Done:

```bash
bash ../learning-hub/.claude/skills/start-task/project-item.sh <issue-url> Status=Done
```

If a step failed (sync error, validator issue, wrong counts), log it with the `fix-bug` skill in `learning-hub`.
