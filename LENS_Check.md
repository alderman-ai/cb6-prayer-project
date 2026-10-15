---
type: operator-lens
title: "Operator lens: check.py"
script: C:\Users\alder\Desktop\Alderman OS\tools\check.py
status: active
trigger: run by /harness-check (step 2) in a session in Desktop\Operator Coach, when the operator asks; or by hand. Nothing schedules or announces it since 10-10 22:02.
requires: Python on PATH; git
created: 2026-10-10
updated: 2026-10-10
---

# Operator lens: check.py

The plain-English stand-in for `check.py`. It answers "is the harness being used?" with seven counts taken from files, git and session transcripts, with no opinions. It prints them and saves a copy to `Alderman OS\logs\checks\<today>.md`. `/harness-check` reads the counts against pass lines and writes the one-page check.

## Why it was created

Coach session in Operator Coach (transcript 7f75f5bb), 10-10 16:08, the operator describing the 10-09 work, verbatim: "The output was basically a buildout spec for a harness that would take both of those into consideration, along with a trial period that would have concrete ways of knowing if the way we set it up worked or not."

The repaired plan (`Operator Coach\reads\2026-10-10 Second opinion and repaired plan.md`, section 5) turned that into seven counts "from files and git only".

Question desk, harness build (transcript 0fd4e5ab), 10-10:
- Q7 at 18:33: "let's check every 3-5 days. I don't have 14 days to waste before realizing that the system isn't working"
- 19:09: "wait ... what does a 3-5-day check mean in practice? set it to 3."

Coach session (transcript 8a03b715), 10-10:
- 21:46: "so i put a few hours into the new harness. do you have a methodology to evaluate the behavior/work?"
- 21:51: "why is this being made up on the fly? we spent 10+ hours designing a harness and you checking my usage of it being a core part of that. you have a bunch of scripts written for it. but no plan of what to do with them??"
- 21:52: "build a skill for checking this, and codify how it's done, including the prompts you send to subagent(s)"
- 22:02: "as to your question about scheduling the raw numbers, just scratch that automated check. I'll come here and run harness check directly, probably more frequently than every 3 days anyways"

## What it does

`--since YYYY-MM-DD` sets the window. Without it, the window starts at the install date in `Alderman OS\logs\installed.txt` (2026-10-10).

1. **Sent to a named reader:** lines in `Alderman OS\logs\sends.md` that start with a date on or after `since`.
2. **Claim-check reports:** files ending `.claim-check.md` changed since then. It looks no deeper than four folders below the Desktop.
3. **Handoffs:** `Handoff\handoff-*.md` files changed since then, same depth limit.
4. **`criteria.md` files** changed since then, same depth limit.
5. **New repos:** folders directly on the Desktop whose `.git` folder was created since then. Alderman OS and the "(superseded)" folders don't count.
6. **Behaviour-rule lines:**
   - For each repo directly on the Desktop, it reads git's changes to any `CLAUDE.md` or `.claude\rules\` file since then.
   - It counts lines added minus lines removed that contain always, never, must, "do not" or "don't".
7. **Harness pieces invoked:**
   - It reads every top-level session transcript changed since then and counts:
     - Skill calls naming kickoff or handoff;
     - `/kickoff` and `/handoff` typed as slash commands;
     - Agent calls whose line mentions claim-check.
   - Then it says whether five named files exist in `~/.claude`.

It ends with a caveat: items 1, 3, 4 and 7 count things said, so a low number means unused **or** unsaid. It saves the whole printout to `Alderman OS\logs\checks\<today>.md`, **replacing** any earlier run from the same day.

What it cannot do:
- It counts; it doesn't judge. Pass lines live in the harness-check skill.
- It can't tell who typed a slash command.
- It can't see projects nested deeper than four folders, or repos below the Desktop's top level.

## How to run it

Normally `/harness-check` runs it. By hand:

```powershell
python -I "C:\Users\alder\Desktop\Alderman OS\tools\check.py" --since 2026-10-10
```

This rewrites today's file in `Alderman OS\logs\checks\`. For this lens it was run 10-10 at 22:16 on a copy in a throwaway folder, so the real log wasn't touched:
- 1 claim-check report;
- 4 handoffs;
- 1 criteria file;
- 1 new repo (Strengths analysis);
- rule lines net +0;
- kickoff 1, handoff 3, claim-check 4.

## How to turn it on or off

- It runs only when called. Nothing schedules it: the 3-day reminder in the start-up hook was removed 10-10 at 22:02 at the operator's word.
- To stop using it, stop running `/harness-check`.

## Indications it is working as intended

- The printout ends with "Saved: …\logs\checks\<date>.md", and that file exists.
- The counts agree with what the transcript read in `/harness-check` finds. Step 7 of that skill compares them every run.
- After the 10-10 fix, item 7 shows `kickoff skill: 1` for the outbound `/kickoff`, where it showed 0 before.

## Indications it is not behaving as intended

- **Too strict:** none known.
- **Too loose:**
  - Item 7 counts any Agent call whose line mentions "claim-check", including a general helper whose instructions merely mention it. This may overcount; not checked.
  - "All five files installed" checks the original five. The harness now installs about 18 files, and the other 13 aren't checked.
- **Unreliably triggered:** only when `/harness-check` or a person runs it.
- **Wrong scope:**
  - **Item 2 misses claim-checks of project handoffs.** They sit five folders down (`Alderman OS\projects\outbound\Handoff\claim-checks\…`). On the 10-10 rerun it found 1 report; there are 2.
  - The same depth limit will miss handoffs written in the website folder (`Claude\Visual Design\Claude Code Website\alderman-ai\Handoff\`).
  - Items 5 and 6 look only at repos directly on the Desktop, so `Alderman OS\projects\*` repos are invisible to them.
  - Item 7 counts a typed `/kickoff` whoever typed it. The 10-10 outbound `/kickoff` was typed into that window by the Alderman OS session that launched it, not by you. `sessions.py` marks it so; this script, and the comment in its code ("typed by the operator"), don't.
- **Silent failure — item 6 undercounts:**
  - Until 10-10 22:3x it passed git a bare date (`--since=2026-10-10`), which git reads as that date **at the current clock time**, so commits earlier that day are skipped. Fixed: it now counts from midnight (`--since=<date> 00:00`).
  - On 10-10 it reported net +0. Counted from midnight, Alderman OS alone had 8 added rule lines and none removed. After the fix the same run shows +8.
  - The harness-check skill found and fixed this same trap in its own git step ("Keep the `00:00`"), but not here.
- **Too costly:** it reads every transcript changed in the window, line by line. Seconds today.
- **Drift:**
  - The script's header still says item 2 is `Desktop/**/claim-checks/*.claim-check.md`. The code takes any file with that ending at any folder name, but only four levels deep.
  - The header says item 7 is "Harness files not modified since install". The code changed at 18:57 on 10-10 to count invocations instead.
  - The same-day saved file is overwritten on every run. On 10-10 the 21:57 copy was replaced by a later run (uncommitted at 22:20).

# Time log

| Date | Change | Why |
|---|---|---|
| 2026-10-10 18:41 | created (commit ec5cefb): seven counts; item 7 listed harness files not modified since install | repaired plan section 5, the operator's "concrete ways of knowing if the way we set it up worked" |
| 2026-10-10 18:57 | item 7 counts real invocations of kickoff, handoff and claim-check from transcripts (commit ea06a14) | the Fable review the operator asked for ("If you get a a supportive response, buld it") |
| 2026-10-10 19:10 | saves to `logs\checks\`; 3-day cadence noted (commit 80bcedc) | operator 19:09: "set it to 3" |
| 2026-10-10 21:07 | counts `Handoff\handoff-*.md` as well as root `handoff.md` (commit e090618) | handoffs moved into Handoff\ (operator 21:05) |
| 2026-10-10 21:09 | root `handoff.md` no longer counted (commit 9f5040e) | operator 21:08: "no older repos with handoffs at root" |
| 2026-10-10 21:57 | counts `/kickoff` and `/handoff` typed as slash commands (commit ea31040) | the coach found 0 kickoffs counted when the outbound session had one |
| 2026-10-10 22:02 | header and printout say "on demand, from /harness-check"; cadence text removed (commit b428bfe) | operator 22:02: "just scratch that automated check" |
| 2026-10-10 | lens written | operator, coach session 22:12: "Have a subagent create operator lenses for all of these scripts you've built and which run at all times" |
| 2026-10-10 22:3x | rule-line count (item 6) starts from midnight | found by the lens helper: a bare date skipped the day's earlier commits (+0 shown, +8 real) |
