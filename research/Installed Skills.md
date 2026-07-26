# Installed Skills — CB Dejvice Fundraising

Search, vetting, and install record for third-party Claude Code skills brought in to support the fundraising copy chain (email → 1-page brochure → landing page → donation CTA).

Date: 2026-07-26
Source repo pinned at commit `c21a984a56da10fb6085e6334f6f60929220a4da` (cloned `--depth 1` from `main`).

---

## Installed (3)

### 1. copywriting

- **Source URL:** https://github.com/coreyhaines31/marketingskills/tree/main/skills/copywriting
- **Author:** Corey Haines (repo `coreyhaines31/marketingskills`, MIT licence, ~41,800 stars, last push 2026-07-23)
- **Why chosen:** The landing page and the one-page brochure are the two highest-leverage assets in the chain. This skill is a structured conversion-copywriting brief: page-structure frameworks, headline formulas, CTA formulas, and an output format that forces 2–3 annotated alternatives for headlines and CTAs — useful input for the downstream A/B eval.
- **What it does:** Gathers page purpose / audience / offer / traffic context, then writes sectioned page copy against clarity-over-cleverness, benefits-over-features, and specificity-over-vagueness principles. Explicitly bans fabricated statistics and testimonials, which matters for a church asking for money. References: `copy-frameworks.md` (headline formulas, section types, page templates), `natural-transitions.md` (transition phrases plus a list of AI-tell phrases to avoid).
- **Install path:** `C:/Users/alder/Desktop/Atlas OS/.claude/skills/copywriting/`
- **Security-reviewed:** Yes — `SKILL.md` and both reference files read in full. No network calls, no shell commands, no scripts, no external URLs, no data-handling instructions. Pure prose craft guidance.

### 2. copy-editing

- **Source URL:** https://github.com/coreyhaines31/marketingskills/tree/main/skills/copy-editing
- **Author:** Corey Haines (same repo as above)
- **Why chosen:** The one-pager text already exists and is authoritative; the job is mostly enhancement, not invention. This skill's explicit instruction is "don't change the core message, enhance it," which fits a client-supplied, doctrinally sensitive source text. Its "Prove It" sweep is a good guard against inflating claims, and the Expert Panel scoring gives a repeatable quality gate for the A/B eval.
- **What it does:** Seven sequential editing sweeps (Clarity, Voice and Tone, So What, Prove It, Specificity, Heightened Emotion, Zero Risk), each looping back over prior sweeps; plus a multi-persona scoring rubric, word/sentence/paragraph-level checks, and a plain-English substitution table. References: `checklist.md`, `content-refresh.md`, `plain-english-alternatives.md`.
- **Install path:** `C:/Users/alder/Desktop/Atlas OS/.claude/skills/copy-editing/`
- **Security-reviewed:** Yes — `SKILL.md` and all three reference files read in full. No network calls, no commands, no external URLs.

### 3. emails

- **Source URL:** https://github.com/coreyhaines31/marketingskills/tree/main/skills/emails
- **Author:** Corey Haines (same repo as above)
- **Why chosen:** The chain starts with an email to warm, in-network contacts. This skill carries the email-specific craft the copywriting skill does not: subject-line and preview-text patterns, length bands, one-email-one-job discipline, and button-vs-link CTA guidance. It also supports a follow-up sequence if the sprint extends past the single send.
- **What it does:** Designs single emails and multi-email sequences — trigger, goal, cadence, per-email subject/preview/body/CTA output format. References: `copy-guidelines.md`, `email-types.md`, `sequence-templates.md`.
- **Install path:** `C:/Users/alder/Desktop/Atlas OS/.claude/skills/emails/`
- **Security-reviewed:** Yes — `SKILL.md` and all three reference files read in full. No network calls or commands.
- **Caveats to expect at drafting time:** (a) the SKILL.md content is SaaS-lifecycle-shaped (trials, upgrades, churn) — the sequence templates are largely inapplicable to a church appeal and should be ignored; the copy guidelines and subject-line section are the usable parts. (b) It links to a `tools/REGISTRY.md` tool-integration table that was not copied over, so that one link is dangling by design.

### Notes on what was and wasn't copied

- Only `SKILL.md` and `references/` were installed for each skill. The upstream `evals/evals.json` files were deliberately **not** copied — they are the repo's own CI test fixtures, add context weight, and serve no runtime purpose. They were still read/scanned during vetting and were clean.
- All three SKILL.md files open by looking for a `.agents/product-marketing.md` or `.claude/product-marketing.md` context file. That file does not exist in Atlas OS. This is a benign local-file read, but it means the skill will otherwise ask context questions — brief it with the sprint's one-pager instead.
- No folder-name collisions with existing Atlas OS skills. Note the adjacent existing skill `email-sequence` (Atlas-authored) covers overlapping ground; the new `emails` skill is a third-party alternative, not a replacement, and the operator should decide which one leads.

### Vetting method

For each installed skill: full read of `SKILL.md` and every referenced file; plus a mechanical scan of all three folders for `http(s)://`, `curl`, `wget`, `base64`, `eval(`, `exec`, `fetch(`, `<script`, `webhook`, and credential/token/`.env` keywords. Result: zero external URLs and zero executable or network instructions anywhere in the installed content. Repo licence is MIT.

---

## Notable candidates rejected

| Candidate | Source | Why rejected |
|---|---|---|
| `anthropics/skills` (official, ~164k stars) | https://github.com/anthropics/skills | Reputable but not relevant. Its catalogue is document/format and engineering oriented (pdf, docx, pptx, xlsx, frontend-design, mcp-builder, skill-creator, brand-guidelines). Nothing there teaches marketing or conversion copywriting. `brand-guidelines` is a Claude-brand-specific asset skill, not a generic voice tool. |
| `cro` | https://github.com/coreyhaines31/marketingskills/tree/main/skills/cro | Read in full and clean, but redundant here: it diagnoses *existing* pages against analytics you don't have (current conversion rate, heatmaps, traffic source). Its page-level guidance is largely duplicated inside `copywriting`. Cut to stay within the 3-skill cap. |
| `marketing-psychology` | https://github.com/coreyhaines31/marketingskills/tree/main/skills/marketing-psychology | Not installed. 22KB of persuasion-principle material — the largest single skill in the repo, and the highest risk of pushing scarcity/urgency/FOMO tactics into a church appeal, which would violate the humble tone requirement. Deliberately excluded on tone grounds, not security grounds (not read in full, since it was not a candidate for install). |
| `cold-email` | https://github.com/coreyhaines31/marketingskills/tree/main/skills/cold-email | Audience is explicitly warm, in-network contacts of missionaries and institutions. Cold-outreach mechanics are the wrong register. |
| `boraoztunc/skills` (~208 stars) | https://github.com/boraoztunc/skills | Small, single-author, low-signal collection covering the same ground as the Haines repo with far less adoption. No reason to prefer it. |
| `OpenClaudia/openclaudia-skills` (~592 stars) | https://github.com/OpenClaudia/openclaudia-skills | Same reasoning — overlapping marketing scope, materially less established than the 41.8k-star alternative. |
| Aggregator repos (`alirezarezvani/claude-skills`, `obviousworks/...`, `abubakarsiddik31/...`, mirrors of `marketingskills` under `ayrshare/`, `syntax-syndicate/`, `borghei/`) | various | Re-hosted or bulk-scraped copies of other people's skills. Installing from a mirror means trusting an extra party for no benefit — went to the original upstream instead. |
