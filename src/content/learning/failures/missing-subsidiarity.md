---
type: failure
title: Sub-groups with undefined autonomy
slug: missing-subsidiarity
lesson: changes-that-cannot-be-undone
layer: 0
rcos: none
summary: A community grows into parts, and nobody says what the parts may decide — so each one improvises a constitution and discovers later they do not match.
targetQuery: sub-groups in a large community rules
status: published
updated: 2026-08-12
signs:
  - Sub-groups have formed and no document says what they may decide alone.
  - Two parts of the community have different rules on the same question, discovered by accident.
  - Nobody can say whether the main agreements bind a sub-group, or how one could differ.
  - A decision made in one part turns out to commit the whole community.
terms: [domain, circle, agreements, decision-matrix]
related: [ossified-governance-no-path-to-change, unprotected-core-invariants]
---

## Why it is hard to see

Because **the sub-groups form for good reasons and work well.**

A community reaches a size or a spread where doing everything together stops being sensible. Distance, or numbers, or simply that the people at one end share a set of daily concerns the people at the other end do not. So clusters form, meet on their own, and handle their own business — and this is exactly what a growing community should do. Meeting as forty about something that concerns eight is the failure they are correctly avoiding.

What nobody writes down is **the boundary**: what a sub-group may decide alone, whether the main agreements bind it, and how it could lawfully differ from them if it wanted to.

For a while the absence costs nothing, because the sub-groups make small decisions and everyone assumes the general rules still apply. Then three things happen, usually in this order.

**Divergence by improvisation.** Each part answers a question the main agreements never covered, sensibly and differently. Nobody has broken anything; the community simply now has two answers, and finds out when somebody moves between them.

**A decision that escapes its container.** A sub-group agrees something that turns out to commit the whole community — a shared cost, a precedent, an obligation. It had no way of knowing, because nothing said where its authority stopped.

**And the constitutional question, arriving too late.** Somebody eventually asks whether a sub-group _may_ have its own rule on something. The honest answer is that nobody knows, and by then the sub-group has been running one for three years, so the question is no longer abstract — it is about whether to overturn something people have built their lives around.

## What to check

**Ask what a sub-group may decide without asking anybody.** If the answer is a judgement rather than a document, this is running.

**Take one rule from the main agreements and ask whether it binds every part.** Then ask two people from different parts. Divergence shows up fast under that question and almost never under a general one.

**Ask how a sub-group could get its own rule legitimately.** Not whether it may — how. A community that has no answer has not forbidden it. It has left it to whoever acts.

## If it is already happening

**Map before you legislate.** What has each part actually been deciding? The list is the useful artefact, and it is usually revealing: some of it is plainly local, some of it plainly is not, and the argument is about a much smaller set than anyone feared.

**Write the three-way split.** What the whole community decides, what a sub-group decides alone, and **what a sub-group may vary if it chooses** — the third being the one that gets forgotten and the one that prevents the next round of this.

**Ratify what has already diverged, or end it, deliberately.** Existing local rules should be looked at once and either adopted as legitimate variation or brought back into line. Leaving them in an undefined state is what produced the problem.

**And name the floor.** Whatever else varies, some things should not: the invariants, the exit rights, the conflict process. A sub-group that can vary the exit terms is a separate community sharing a driveway.

<Callout type="caveat" title="RCOS has no stress test for this one">

The other twenty-four patterns in this guide paraphrase a documented RCOS stress test. This one does not — **the standard has no test for it**, and we have flagged it as a candidate for a future version.

The raw material is all there: Layer 0's scope declaration, Layer 6's change mechanisms, the group-size thresholds around 120–150 above which sub-structures become mandatory, and Ostrom's nested units. What is missing is a test that names the failure, which is why a community can be reading RCOS attentively and still walk into this.

We would rather say that than quietly leave the pattern out because it has no citation.

</Callout>

## What prevents it

A **stated subsidiarity rule**: for each domain, whether it is decided centrally, locally, or locally within a stated range — plus a floor of things that may not vary. The same clarity a <Gloss term="domain">domain</Gloss> gives a circle, applied to a place rather than a function.

<Rcos
layer={0}
section="§2.2 Scope Declaration, §8.1 Change Mechanisms"
href="https://rcos.ecohubs.community/articles/rcos-core/v0-1/layer-0-identity-scope#22-scope-declaration">

There is no stress test for this pattern, but the Core specification does constrain it in three places worth knowing.

**Scope.** A community declares the domains it holds decision authority over, and anything not declared in scope is out of scope (§2.2.1–4). Applied to sub-groups this cuts both ways and neither is stated: a sub-group's authority is not declared, so on a strict reading it has none — which is not how any real community behaves.

**Change.** Every proposed change must specify the artifacts, layers and sections affected and its authorised decision path (§8.1.3). A local rule that varies a general one is a change to a general artifact, and would have to be adopted as one — which is the answer to _how could a sub-group differ legitimately_, arrived at indirectly.

**Invariants.** Whatever varies locally, **no decision, role, process or emergency measure may override an invariant** (§2.3.4). That is the floor, and it holds without a subsidiarity rule existing.

RCOS also notes that above roughly 120–150 members **sub-structures become mandatory** — so the standard anticipates the structure arising while not yet specifying how its authority is bounded.

</Rcos>

<Sources
items={[
{
title: 'RCOS Core — Layer 0: Identity & Scope',
url: 'https://rcos.ecohubs.community/articles/rcos-core/v0-1/layer-0-identity-scope',
note: 'scope declaration and invariants — the constraints that apply in the absence of a subsidiarity rule'
},
{
title: 'Ostrom, E. — Governing the Commons (1990)',
url: 'https://doi.org/10.1017/CBO9780511807763',
note: 'nested units for larger systems, the eighth design principle'
},
{
title: 'Community governance',
url: '/learn/topics/community-governance',
note: 'domains, and why one is only real when it carries a concrete limit'
}
]}
/>
