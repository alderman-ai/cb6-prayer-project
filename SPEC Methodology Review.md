# SPEC Methodology Review — CB Dejvice Fundraising

**Purpose:** adversarial pass on the operator-written dynamic-workflow spec (`_SPEC_CB Dejvice
Fundraising.md`) as a *methodology*, toward a corpus of 5–10 similar one-shot specs and, eventually,
templating/automating spec authorship itself.
**Author:** the orchestrator model that executed the run (Fable 5), writing post-completion with the
full run telemetry in hand. The final section is an independent meta-critique — see its own header
for attribution.
**Evidence base:** the spec's revision history, the eight pre-flight/mid-run clarifying questions,
~30 subagent briefs across 5 workflows, the QA/fix round findings, and two genuine mid-run external
shocks (the client's Drive-folder image drop; `modlitebna.cb6.cz` launching with the church's own
site mid-run).

---

## 1. What the spec got right — keep these in the template

1. **The pre-flight gate instruction** (">scan through the spec and point out any process that may
   be broken so that the operator can fix them before leaving") is the single highest-value sentence
   in the document. It caught a dead Vercel CLI token, an unconnected Canva MCP, and seven material
   ambiguities *while the operator could still answer*. Formalize it; never make it a blockquote
   aside again (see §3).
2. **Operator-answered clarifying questions as a first-class spec section.** Q1–Q8 became the most
   cited artifact of the run — quoted verbatim into subagent briefs as binding authority. This
   section *emerged* mid-run (operator asked for it); the template should be born with it.
3. **The `(???)` honesty marker** on output 4. Explicitly marking an unknown beat silently guessing.
   Make "unknowns are marked, never papered over" a template convention.
4. **FUTURE HITL / revision-interface requirements** (DOCX→web `sync-copy`, "Canva version must stay
   human editable"). Designing outputs *for the revision phase* is a spec-level insight most specs
   miss; it shaped the architecture (content-JSON pipeline) more than any other single line.
5. **Tone guardrails inside research items** ("DO NOT pattern-patch the tone… when it would be
   inappropriate"). This propagated all the way into the copy judge's disqualification of the
   vanilla chain. Constraint-in-the-research-brief is cheap and compounds.
6. **Per-output subagent assignment and the research-before-outputs barrier.** Both held up exactly
   as written.
7. **DOD as a two-party checkbox** with (mid-run amendment) the assistant box as loop-kill criteria.
   The loop-kill linkage should be in the template from day one, not an amendment.

## 2. Section-by-section critique

**Problem Description.** Strong on outcome and tone; silent on the two things that nearly sank the
chain: *where the money goes* (no donation mechanism existed — surfaced only by pre-flight Q1) and
*who sends the email, to how many people, by when*. A fundraising chain without a money path is a
funnel to nowhere. Template fix: a mandatory **MONEY PATH / CONVERSION MECHANISM** section for any
spec whose chain ends in a transaction, and an explicit "definition of shipped" (sent? printed?
merely staged?).

**LOOP LOGIC.** Worked, but underspecified: no definition of "stalled," no retry ceiling, no abort
criteria, no notification policy on repeated failure. A run that loops hourly into the same crash
burns quota silently. Template fix: loop interval + kill criteria + max consecutive failures +
"what to do if a phase cannot complete" (default: skip, log, continue — matching how the run
actually behaved).

**INITIAL RESOURCES.** "Treat information as accurate" was load-bearing and correct. But the .eml
resource *contained* the campaign's biggest open questions (missing US/UK giving mechanism, a Google
Doc link, a second client contact) and the spec never instructed anyone to *mine* the resources for
facts, gaps, and contacts. The pre-flight caught it by initiative, not by instruction. Template fix:
a **RESOURCE AUDIT** step — enumerate facts / gaps / people / links found in initial resources
before research fan-out.

**MODELS.** Clear, but two lessons: (a) the orchestrator cannot switch its own model — "Orchestrator
will be Fable 5" is an operator-side action, and the template should say so; (b) the cost-tiering
policy (Sonnet for browser work) arrived as a mid-run amendment. Tiering by *task type* (reasoning /
mechanical / browser) belongs in the template, with the note that per-agent models are fixed at
spawn, so tier boundaries must fall on agent boundaries.

**LANGUAGES.** Clean and sufficient. One gap: locale *typography and register* standards (Czech
non-breaking spaces, „uvozovky", tykání/vykání mechanics, vocative merge fields) all surfaced in QA
rather than up front. Template fix: a one-line pointer per locale to a standards note, or an
instruction that the translation agent must produce one before outputs build.

**BRANDING AND MEDIA.** Mostly fine. Two critiques: the font clause ("download their font if not
standardly available in all parts of the TECH STACK section") is grammatically tangled — requirements
that read oddly get re-interpreted by every agent that touches them. And the dual design-system
mandate (Claude Design *and* Canva) doubled cost for unclear benefit; in practice the Claude Design
system drove every HTML/PDF deliverable while the Canva kit served only the Canva brochures. The
template should ask: *which single deliverable consumes each design artifact?* If the answer is
"none," cut it.

**INITIAL RESEARCH.** See §4.

**TECH STACK.** Listing accounts/tools was valuable, but the list mixed *access modes* (Connector +
Chrome + CLI) without saying which mode each task should use; the run settled that empirically
(gh CLI, Vercel CLI, Canva MCP, Chrome only for UI-gated features). Template fix: per-stack-item —
mode, verification command, and fallback. The pre-flight gate then becomes mechanical.

**OUTPUTS.** The strongest and weakest section at once. Strong: per-output tool tags, own-subagent
rule, `(???)` marker. Weak: acceptance criteria lived elsewhere or nowhere (the 2 cm QR mandate was
in a copy doc, not the spec — QA nearly missed it; page-size expectations were implicit; the "add QR
to the placeholder" dependency forced the orchestrator to re-derive sequencing). One output named a
tool that didn't exist in the session (Google Docs — retired by Q7). Template fix: each output gets
*format · dimensions/limits · acceptance checks · dependencies* on one line. A truncated sentence
("Leave a place") also survived into execution — see §3 formatting.

**QA.** Per-output QA + dedicated CZ translation pass was excellent and should be a template
default for any localized work. Gaps: no fix-round semantics (who may edit what — the run improvised
a file-ownership rule after two agents collided editing the same file), and no visual QA until the
operator added it via Q5. Template fix: QA section names three passes (drift, language, visual) and
declares **FILE OWNERSHIP** rules for concurrent agents.

**ASSISTANT DECISIONS / DOD.** Both earned their place. Improvements: the decisions section should
mandate a ⚑ convention separating "FYI judgment calls" from "decisions awaiting the operator" (the
run invented this); DOD should carry the links-block requirement natively (added by operator at the
end) and define "done" per output, not just globally.

## 3. Formatting and per-section-instruction critique

- **Requirements are buried in prose.** Nearly every defect QA caught traces to a requirement
  embedded mid-paragraph. Numbered, ID'd requirements (`OUT-3.2: CZ brochure A4 portrait, both QRs
  ≥2cm`) would let every QA agent cite what it checked and make coverage measurable. The corpus
  goal makes this near-mandatory: templates need stable anchors.
- **Authority levels are implicit.** Operator-authored, operator-answered, and assistant-written
  sections coexist with only header hints. The template should label each section's authority
  (`[OPERATOR]`, `[OPERATOR-ANSWERED]`, `[ASSISTANT]`) — Atlas OS's authorship rules want this
  anyway.
- **Mid-run edits raced against readers.** The operator edited the spec while the orchestrator held
  a stale copy (one edit failed against moved text; one truncated sentence shipped into Q3). A
  template **CHANGELOG** stanza (date · section · change) plus a "re-read before every phase
  boundary" rule fixes both directions of the race.
- **The pre-flight instruction lives in a blockquote aside.** The most important instruction in the
  document is typographically the easiest to skip. Give it a numbered section: PRE-FLIGHT GATE.
- **Instruction voice drifts** between imperative-to-assistant, note-to-self, and note-to-future-
  operator. Harmless to a strong model, but a template invites weaker executors; one voice
  (imperative to the executing agent) is safer.

## 4. Research: instruction critique and missing context-gathering

**What the research instructions did well:** per-item output formats; source-count floors;
domain-weighting ("religious examples weighted more strongly — especially in tone"); recency and
supersession requirements on the tax item; the exemplary-example minimums; the explicit
tone-quarantine clause.

**Instruction-level critiques:**
1. "2–3 reputable sources" is an input quota, not an output standard. The agents happily exceeded it
   where it mattered; a weaker executor would stop at 2. Prefer outcome criteria: "enough that the
   three biggest claims each have a primary source."
2. The SKILL.md item fused three different jobs (find/install skills; design an eval; judge it) into
   one bullet. It worked, but the eval design questions it raised (double-build cost) had to go back
   to the operator as Q5. Evals deserve their own section with scope stated.
3. No instruction to mine INITIAL RESOURCES before searching the web (see §2).
4. No guidance for *unretrievable* evidence — fundraising email creative is simply not public, and
   the agent correctly flagged reconstruction-by-inference, but that behavior was luck, not spec.
   Template: "when evidence can't be retrieved, say so and label inference."

**Research that was missing and would have paid for itself:**
- **Donation rails / payment-mechanism research** (what US donors of Czech causes actually use:
  intermediary funds, wires, DAFs) — the Q1 hole was researchable, not just decidable.
- **The church's full existing web presence** — a deeper sweep than the homepage/一 modlitebna page
  might have surfaced the in-progress Astro site (its launch mid-run invalidated the URL scheme; we
  absorbed it in QA rather than anticipating it). "Enumerate the client's existing and *in-flight*
  digital properties" is a cheap standing item.
- **Czech-side giving/tax research** (potvrzení o daru, §15/20 deductions) — CZ copy needed it and
  got it from the translator's knowledge rather than a sourced document. Symmetry: the spec
  researched only the *primary* audience's tax reality.
- **Czech-language church fundraising exemplars** — CZ tone was derived by adaptation from EN
  research; native CZ campaign examples would have de-risked register choices QA later fixed.
- **Image licensing/rights practice** — every downstream agent independently flagged undocumented
  render permissions; one research note would have settled the policy once.

## 5. Spec document vs. native CLI dynamic workflow

The honest comparison, having run this one from a spec:

**What the written spec bought (and prompting could not have):**
1. **The unattended Q&A front-load.** Eight questions answered *before* the operator left; every
   answer quotable verbatim as binding authority in ~30 agent briefs. In a live CLI session these
   answers arrive just-in-time — which is fine *only if the operator stays*.
2. **A recovery surface.** Spec + run-state survived across wake-ups and would have survived a
   usage-limit stall mid-phase. A chat scroll does not resume; a document does.
3. **An audit artifact.** The spec ships in the client repo with a plain-language explainer — the
   deliverable's provenance is inspectable by non-AI-literate stakeholders. No CLI transcript does
   that.
4. **A stable target for operator redlining.** The operator amended the spec five times mid-run
   (models, brochure outputs, DOD semantics, links, this review) by editing a document, not by
   scrolling chat history. Amendments landed in one canonical place all agents re-read.

**What it cost:**
1. Operator authoring time, including sentences that shipped broken (Q3's truncation).
2. Duplication: spec ↔ run-state ledger ↔ workflow scripts each restate phase logic; drift between
   them had to be actively managed.
3. The document is *not executable* — every section still had to be compiled by the orchestrator
   into prompts, sequencing, and file-ownership rules. The spec reduced ambiguity, not
   orchestration work.
4. Mid-run edit races (two stale-read incidents).

**When native CLI prompting wins:** attended, single-sitting work; exploratory scope; anything where
the operator can answer questions live; low-stakes/reversible outputs. The native flow *was* used
inside this run — the workflow scripts, fix rounds, and browser recoveries were all improvised
orchestration the spec never specified, and specifying them in advance would have been waste.

**Verdict:** the spec earns its overhead precisely when: the operator leaves the loop; the run may
span sessions or usage stalls; outputs are client-facing; and many agents need one authority. The
efficient shape for the corpus is a **hybrid**: the spec owns *intent, constraints, answers, and
acceptance* (the things only the operator knows); the orchestrator owns *phases, agent topology, and
recovery* (the things that change mid-run anyway). Specs in this corpus should therefore get
*smaller and more declarative*, not longer and more procedural.

## 6. Template recommendations (condensed)

Proposed section skeleton for the corpus, in order:

1. `PROBLEM` [OPERATOR] — outcome, audience, tone, definition-of-shipped
2. `MONEY PATH / CONVERSION` [OPERATOR] — where every CTA terminates (mandatory when a transaction ends the chain)
3. `INITIAL RESOURCES` [OPERATOR] + mandated `RESOURCE AUDIT` [ASSISTANT]
4. `PRE-FLIGHT GATE` — per-stack-item: access mode · verification command · fallback; blockers listed before the operator leaves
5. `MODELS & BUDGET` — tiering by task type; note model switching is operator-side; optional token/time ceilings
6. `LANGUAGES & LOCALE STANDARDS`
7. `RESEARCH` — outcome-based sufficiency criteria; mine-resources-first; unretrievable-evidence rule
8. `OUTPUTS` — one line each: format · dimensions/limits · acceptance checks · dependencies; `(???)` convention
9. `REVISION INTERFACES` (generalized FUTURE HITL)
10. `QA` — drift + language + visual passes; fix-round semantics; FILE OWNERSHIP rules
11. `EXTERNAL CHANGE POLICY` — what to do when the world shifts mid-run (default: absorb, log, never contact third parties without instruction)
12. `COMMUNICATION POLICY` — outbound contact is opt-in only (this run correctly never emailed the client, but by norm, not rule)
13. `LOOP LOGIC` — interval · kill criteria · failure ceilings
14. `ASSISTANT CLARIFYING QUESTIONS` [OPERATOR-ANSWERED] — born-empty, filled at pre-flight
15. `ASSISTANT DECISIONS` [ASSISTANT] — with the ⚑ open-decision convention
16. `CHANGELOG`
17. `DOD` — per-output done-ness, two-party checkboxes, assistant box = loop-kill, links block

For future automation of spec authorship: the pre-flight interview is the generator. A `/spec-interview`
skill walking the operator through sections 1–13 — with this corpus as few-shot exemplars — would
produce drafts; the operator's editing pass then becomes the authorship, which keeps Atlas OS's
operator-authorship rules intact.

---

## 7. META-CRITIQUE

> **Attribution:** written by an independent reviewing agent (Opus 5) that did **not** author the
> report above and did **not** orchestrate the run; it was given the report, the spec, and the run
> ledger, and instructed to attack the report itself.
> **Purpose of this section:** a critique produced by the same mind that executed the run inherits
> that mind's blind spots — it will grade its own improvisations kindly and locate every failure in
> the document rather than the executor. This section exists to expose those distortions so the
> template corpus is built on the review's defensible claims, not its self-serving ones.

### The report locates in the document what belonged to the executor

§5's cost list closes with "Mid-run edit races (two stale-read incidents)" — filed as a cost of the spec approach. But the fix the report itself proposes in §3 is a "re-read before every phase boundary" rule, which is orchestrator behaviour, not a document section. A reader who edits a live file and then acts on a cached copy has a discipline problem; the CHANGELOG stanza is a workaround for it. Same move in §2 QA: "the run improvised a file-ownership rule after two agents collided editing the same file." The orchestrator chose the topology, spawned the agents, and pointed two of them at one file. Concurrency control over agents the spec never enumerated cannot be the spec's omission. Both incidents are converted into new template sections — the document is made to absorb blame and then made to grow to carry it.

### The cost column is missing its largest entries

§5 "What it cost" runs four items: authoring time, duplication across ledger/scripts, non-executability, edit races. Not one is compute. The spec explicitly mandated: "Create a design system in both Claude Design and in Canva"; "(PDF) Also do a one-shot of the brochure using just Claude Design"; and a skill A/B eval that built every English copy chain twice, one of which was disqualified and discarded. That is two design systems, four brochure PDFs plus HTML sources, two landing-page implementations (Next.js *and* self-contained HTML), all carried through per-output QA and a fix round, across ~30 subagents in 5 workflows. The report notices the design-system duplication in §2 BRANDING ("doubled cost for unclear benefit") but leaves it there as a template question rather than moving it into the ledger where the verdict is computed. It counts the eval as a §1 win (item 5) without noting it doubled the copy phase to produce one binary fact. "The spec earns its overhead" is a conclusion drawn against a cost column that tallies operator minutes and omits the run's actual expenditure.

### Survivorship bias, stated outright

§5: "the workflow scripts, fix rounds, and browser recoveries were all improvised orchestration the spec never specified, and specifying them in advance would have been waste." Asserted, unevidenced, and contradicted by the ledger the report cites as its evidence base: Phase 2 brand-template publish failed on a permission gate; Phase 8 returned Canva "ISSUES (QRs undersized vs 2cm mandate...)", PDFs "stale→refix", "18 CZ fixes undeployed". Those are improvisation defects. The run finished, so every improvisation is retroactively priced at zero.

### The front-loaded answers decayed, and the report doesn't count it

§1.2 and §5.1 make Q1–Q8 the run's most valuable artifact — "quotable verbatim as binding authority in ~30 agent briefs." But ASSISTANT DECISIONS item 2 records that Q1's answer was overturned within the same run: "Real CZ donation details replaced the 'placeholder only' answer (Q1 premise changed)." The single highest-stakes answer was worse than what research found hours later, and was propagated as authority in the interim. That is the structural risk of front-loading — answers given cold, before evidence, then quoted as binding — and the report never books it. It also never asks the deflationary question: would a competent orchestrator reading *any* fundraising spec have asked where the money goes, without the blockquote? Attributing all eight questions to one sentence inflates the section that flattered the run.

### §6 contradicts §5

§5 ends: specs "should therefore get *smaller and more declarative*." §6 then proposes seventeen sections, each generated by a single incident in a single run. The tell is item 12, COMMUNICATION POLICY, justified by a *non*-event: "this run correctly never emailed the client, but by norm, not rule." A new mandatory section proposed because nothing went wrong. §4 compounds it, adding five research items ("would have paid for itself") without naming anything to cut — one of which, the "in-flight digital properties" sweep, is hindsight: `modlitebna.cb6.cz` launched mid-run, so an earlier sweep would have found nothing.

### What neither document asks

Proportionality. Nowhere in spec or review does anyone ask whether an email, a one-pager and a landing page for warm in-network contacts warranted this architecture. §2 OUTPUTS critiques how output 4's line was *worded*; it never asks whether a hand-written HTML page plus developer README was needed for a client whose own site is React (decision 7). No section asks what a 5x smaller run would have failed to deliver.

And the report never scores the campaign. §2 rightly demands a "definition of shipped" — then doesn't apply it. Nothing was sent; the primary (US) audience still has no giving mechanism; the CZ QR is "dead until modlitebna.cb6.cz DNS points at cb6-cz"; the EN chain's destination is an open ⚑ decision between two live sites. A methodology review that cannot state whether the chain functions cannot claim the method worked.

### The corpus goal is left without a measuring instrument

The stated purpose is 5–10 specs and eventual automation, yet no criterion is offered for judging spec #7 against spec #1. The telemetry to build one is sitting in the ledger and unused: blockers caught at pre-flight vs. discovered mid-run; improvisations per run; QA fix counts; tokens per shipped deliverable; operator answers later overturned (1 of 8 here). Without that, the corpus is anecdotes and the template is whatever the last run's incidents happened to be — which is exactly what §6 is.

### One structural conflict

§3 proposes authority labels (`[OPERATOR]`, `[ASSISTANT]`). Applied honestly to §1, several "what the spec got right" items are assistant-shaped: §1.2 concedes the Q&A section "*emerged* mid-run"; §1.7's loop-kill linkage was a mid-run amendment; the ⚑ convention was, per §2, "invented" by the run. Some of §1 is the orchestrator praising its own contributions to the document it is grading.
