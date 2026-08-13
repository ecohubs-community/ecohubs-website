---
type: failure
title: Governance with no path to change it
slug: ossified-governance-no-path-to-change
lesson: changes-that-cannot-be-undone
layer: 6
rcos: change-emergencies/ossified-governance-no-path-to-change
summary: The rules can no longer be changed, so people stop trying — and the community loses its members quietly instead of loudly.
targetQuery: community rules that cannot be changed
status: published
updated: 2026-08-12
signs:
  - Nothing significant has been amended in years, and nobody experiences this as stability.
  - Attempts to change something die in procedure rather than on the merits.
  - Members describe proposals as not worth the effort, and are right.
  - The amendment rule requires a level of agreement the community can no longer reach.
terms: [agreements, decision-tiers, drift, motion]
related: [unprotected-core-invariants, institutional-amnesia]
---

## Why it is hard to see

Because **it presents as stability, which is a thing communities are proud of.**

A group whose rules have not changed in eight years can tell a flattering story about that: we got it right, we are settled, we are not one of those places that rewrites its constitution every year. And some of that may be true. The question is whether the rules are unchanged because nobody wants them changed, or because **nobody can.**

Those look identical from the outside and are opposite conditions. The tell is not the absence of change. It is the absence of _attempts_ — and attempts leave no record when they die early, because a proposal that never got written is not in the minutes.

The mechanism is usually one of three, and all of them were installed as safeguards:

**A threshold that no longer clears.** Unanimity or a high supermajority works in a founding group of nine who chose each other. At forty, with turnover and a couple of people who have quietly disengaged, the same threshold means anything contested fails — including things a clear majority want.

**A process with no owner.** Changing a rule requires drafting, circulating, a deliberation window, a meeting. Someone has to run that, unpaid, on top of everything else, knowing it may fail. So the proposal that everybody agrees would be an improvement never gets made.

**And the effect that closes the loop: people stop asking.** Once a group has watched two or three sensible proposals die in procedure, it learns. Nobody decides to stop trying — they just have less energy this year, and next year, and by then the community's rules are effectively fixed by a rule nobody would have chosen.

**The cost is paid in departures rather than arguments**, which is why it is missed. A member who cannot change something that matters to them does not usually fight. They adjust, then narrow, then leave — and give a vague reason on the way out.

## What to check

**When was something significant last amended?** Not a new policy — an existing rule, changed. If the answer is over three years and the community has grown or turned over since, ask why.

**Ask what died before it was proposed.** This is where the evidence is. Members can usually name a change they thought about suggesting and did not, and the reasons will be procedural rather than substantive.

**Do the arithmetic on the threshold.** How many members would need to agree, out of how many, and how many typically attend? Communities are frequently startled to find their amendment rule now requires near-unanimity of everyone who exists, including people who have not attended in two years.

## If it is already happening

**Fix the amendment rule first, and expect that to be hard**, because you have to use the broken process to fix itself. This is genuinely the hardest move in this guide. It usually needs a single, narrow, well-explained proposal that changes only the amendment rule, framed explicitly as _we are not deciding any of the contested things today._

**Separate the tiers while you are there.** Much ossification comes from one high bar applied to everything. Constitutional matters deserve it; the guest policy does not, and treating them alike is what exhausts the process.

**Give proposals an owner and a route.** A named person whose role is to help a member turn a frustration into a written proposal removes the single biggest barrier, which is not opposition but drafting.

**And count quorum against attenders, not members.** A threshold measured against people who have effectively left hands a veto to absence.

## What prevents it

An amendment rule the community can actually clear, **tiered by what is being amended**, plus a stated route for a member to get something onto the agenda. Change has to be possible, or the agreements stop describing the community and the members leave one at a time.

<Rcos
layer={6}
section="§8.1 Change Mechanisms, §8.7 Layer Invariants"
href="https://rcos.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms">

The layer invariant states both failures in one line: **"Change MUST be possible but constrained; no change MAY be instantaneous, implicit, or unreviewable"** (§8.7.1). _Possible_ is doing as much work there as _constrained_ — RCOS treats an unchangeable community as non-conforming, not as unusually stable.

A community must define **explicit change mechanisms for modifying, adding, suspending or removing rules, roles, artifacts or decision structures** (§8.1.1), and the Change Protocol must define **how changes are proposed, reviewed, adopted, published and rejected** (§8.6.3) — proposed being the step that has no owner in most communities.

It must also define **review mechanisms for adopted changes, including how changes are evaluated, revised or reverted when they produce harm, instability, or unintended concentration of power** (§8.1.5). A community with no way to reverse a change has a one-way ratchet, which is this pattern's other face.

Layer 2 supplies the tiering that stops one bar exhausting everything: each decision type must have its **own** explicitly defined mechanism (§4.2.1), specifying thresholds and time constraints (§4.2.3) — so constitutional ceremony applies where it belongs and not to the guest policy.

</Rcos>

<Sources
items={[
{
title: 'RCOS stress test — Ossified Governance Without a Path to Change',
url: 'https://rcos.ecohubs.community/articles/rcos-stress-tests/change-emergencies/ossified-governance-no-path-to-change',
note: 'the specification this page puts into plain language'
},
{
title: 'Ostrom, E. — Governing the Commons (1990)',
url: 'https://doi.org/10.1017/CBO9780511807763',
note: 'collective-choice arrangements — the people affected by the rules can change the rules'
},
{
title: 'Decision methods',
url: '/learn/topics/decision-methods',
note: 'quorum, thresholds, and the settings that quietly decide fairness'
}
]}
/>
