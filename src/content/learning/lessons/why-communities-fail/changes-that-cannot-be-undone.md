---
type: lesson
title: Changes that cannot be undone
slug: changes-that-cannot-be-undone
guide: why-communities-fail
order: 6
summary: Five patterns about how rules change — the temporary measure that stayed, the founding principle nobody protected, and the community that can no longer remember why.
targetQuery: changing the rules in an intentional community
status: published
updated: 2026-08-12
terms: [drift, agreements, ratification, cooling-off-period, decision-tiers]
related: [power-nobody-voted-for, the-work-that-breaks-people]
---

<Quick>

A community that cannot change its rules dies of rigidity. One that changes them without noticing dies of drift. Both are failures of the same missing thing: **a stated way for a rule to change, and a record of when it did.**

Five patterns: **the invariant nobody protected**, **the emergency measure that stayed**, **governance with no path to change it**, **experiments with no way back**, and **a community that forgot why**.

The defence is not vigilance. It is bookkeeping — dating the agreements and keeping the old versions — which is unglamorous, cheap, and the only thing that works.

</Quick>

Every rule in a community was written by people responding to a situation. Ten years later some of those situations are gone, some of the rules are load-bearing, and almost nobody can tell which is which.

That is the subject of this lesson: **not what the rules are, but how they move** — and the fact that most communities have no account of their own movement at all.

## The five

- **[The invariant nobody protected](/learn/failures/unprotected-core-invariants)** — the founding principle everybody assumed was permanent, changeable by an ordinary majority on a Tuesday
- **[The emergency measure that stayed](/learn/failures/emergency-rule-bypass-precedent)** — decided fast because it had to be, never reviewed, now precedent
- **[Governance with no path to change it](/learn/failures/ossified-governance-no-path-to-change)** — the opposite failure, and the one that produces departures rather than arguments
- **[Experiments with no way back](/learn/failures/irreversible-experiments)** — a trial that quietly became the arrangement, because nobody set an end date
- **[A community that forgot why](/learn/failures/institutional-amnesia)** — the rule survives, the reason does not, and nobody can evaluate either

And one more that RCOS does not catalogue: **[sub-groups with undefined autonomy](/learn/failures/missing-subsidiarity)**, which is what happens when a community grows into parts without deciding what the parts may decide.

## Why drift is the hardest of them

Four of these announce themselves eventually. Drift does not, and it is the one most communities are actually living in.

Nobody notices a slow forgetting by paying closer attention, because **there is no moment to notice.** The agreements stop being read, then stop being taught, then describe a place that no longer exists — and every step of that is a non-event.

Which is why vigilance is the wrong defence and bookkeeping is the right one. A community that can say **which version is in force, when it last changed, and who decided it** has turned a feeling into a check anybody can run.

The difference that makes is mostly social. Without a current text, raising drift means saying _I think we have lost something_ — a criticism of everyone present, and heard as one. With it, the same observation is that the practice and the document disagree. A discrepancy, pointed at rather than levelled, and the sort of thing a group can look into without anyone having to be at fault.

<Callout type="note" title="From a community we worked with">

A founder produced a new version of a foundational document. Nobody could say whether it had ever passed the community's consensus process — the original was old enough that the memory had gone.

So it sat alongside the previous version, with a new version number, **no record of adoption, and no statement of what had changed between them.**

The community was not in conflict about the content. It could not establish **which of its own documents was in force**, or what the difference was. Everything downstream of that — every rule, every decision citing it — inherited the ambiguity.

</Callout>

Note how little would have prevented it: an adoption record and a summary of changes. Two fields.

<Quiz id="is-there-a-way-back" />

## If it is already happening

**Establish the present before you reconstruct the past.** Which documents are in force, as of today, agreed by whoever is in the room. Not their history — their status. This can be done in one meeting and it stops the bleeding.

**Then date everything from now on.** A change record with four fields: what changed, who decided it, under which rule, and from when. A community with two clean years and a murky past is in a far better position than one that spent six months excavating and gave up.

**Keep the superseded versions.** Deleting the old text destroys the only evidence of what the community used to think, which is what you need when somebody asks why the rule exists.

**And review the emergency measures specifically.** Every community has two or three arrangements adopted quickly during something difficult and never revisited. List them, and give each one a date by which it is either ratified properly or ends.

## What prevents it

A **change protocol** that says how a rule changes and who decides, a **version history** that makes "which version is in force" answerable, and a **learning log** so that what a difficult year taught does not leave with the people who lived it.

All three are boring. That is the point — this is the one failure class where the defence is entirely clerical, and a community that finds that beneath it will forget why it exists.

<Rcos
layer={6}
section="§8.2 Versioning and Authority, §8.7 Layer Invariants"
href="https://rcos.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority">

RCOS's sixth layer treats evolution as a governed process rather than improvisation, and its central clause is a validity rule: **"No informal, undocumented, or 'understood' rule changes MAY be considered valid"** (§8.2.5).

Every adopted change must be versioned and traceable (§8.2.1), and the **Version History** must record the version identifier, adoption and effective dates, the **decision record reference — authority, mechanism, threshold** — a summary of changes, and any migration notes (§8.2.2). At any point the community must be able to determine **which version is currently in force and which artifacts are authoritative** (§8.2.3), and superseded rules must remain accessible **together with the dates during which they were in force** (§8.2.4).

The layer invariants set the two boundaries this lesson runs between: **change must be possible but constrained — no change may be instantaneous, implicit, or unreviewable** (§8.7.1), and **major failures and adaptations must be captured as shared learning, not erased or hidden** (§8.7.4).

Underneath it, from Layer 0: **no decision, role, process, or emergency measure may override an invariant** (§2.3.4), and where an invariant conflicts with any other rule, **the invariant prevails** (§2.3.5).

</Rcos>

<Sources
items={[
{
title: 'RCOS stress tests — Change & Emergencies',
url: 'https://rcos.ecohubs.community/articles/rcos-stress-tests/change-emergencies',
note: 'the five documented patterns this lesson covers, in specification form'
},
{
title: 'RCOS Core — Layer 6: Evolution & Adaptation',
url: 'https://rcos.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation',
note: 'change mechanisms, version history, time-bounded experiments and the learning log'
},
{
title: 'Just For Now: how emergency rules become permanent',
url: '/blog/emergency-rule-bypass-precedent',
note: 'the longer EcoHubs argument about temporary measures that outlive their emergency'
},
{
title: 'Resilience & why communities fail',
url: '/learn/topics/resilience',
note: 'drift as one of the six recurring patterns, and why it is the only one that does not feel like anything'
}
]}
/>
