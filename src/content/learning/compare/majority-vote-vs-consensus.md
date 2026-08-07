---
type: compare
title: Majority vote vs consensus
slug: majority-vote-vs-consensus
topic: decision-methods
summary: One counts, the other converges. The choice is not about how democratic you are — it is about what the decision costs to get wrong, and who is still in the room in year five.
targetQuery: majority vote vs consensus
status: published
updated: 2026-08-07
terms: [consensus, stand-aside, supermajority, quorum, decision-tiers]
---

<Quick>

A **majority vote** counts. A proposal passes when approvals clear an agreed share — more than half, or two-thirds for the weightier things — and it produces a decision and a losing minority every single time. **<Gloss term="consensus">Consensus</Gloss>** converges. The proposal is amended until nobody sustains a reasoned objection, which produces buy-in nothing else matches and takes as long as it takes.

Neither is more democratic. Majority rule protects the group from one person; consensus protects one person from the group. Which risk matters more depends entirely on what is being decided — which is why most communities that last use both, sorted by stakes.

</Quick>

This is the argument that founding groups have in year one and communities have again in year six, usually with the sides reversed.

In year one, consensus is chosen because voting feels adversarial and the group is small enough that agreement is genuinely reachable. In year six, someone proposes voting on things because the meetings have become unbearable. Both instincts are correct, and both are answers to a question nobody has stated: which decisions is this for?

<Compare
columns={['Majority vote', 'Consensus']}
rows={[
{ label: 'How it closes', values: ['Counting — approvals against a threshold', 'Convergence — amend until nobody objects'] },
{ label: 'Time cost', values: ['Fixed and short', 'Unbounded, and unpredictable'] },
{ label: 'Protects', values: ['The group from a single obstructive member', 'A single member from the group'] },
{ label: 'Produces', values: ['A decision, and a losing minority', 'Buy-in, and shared ownership of the result'] },
{ label: 'Real bar', values: ['More than half, or a supermajority', 'Nobody sustains a reasoned objection'] },
{ label: 'Scales to', values: ['Any size', 'Roughly 8–15 before strain'] },
{ label: 'Fails by', values: ['Repeated minorities disengaging, then leaving', 'Fatigue; whoever stays latest wins'] },
{ label: 'Must be written', values: ['Threshold, quorum, what an absence means', 'What counts as a block, and stand-aside'] },
{ label: 'Suits', values: ['Reversible operational business', 'Purpose, membership, the agreements themselves'] }
]}
caption="Both are families of practice rather than fixed rules; individual groups vary a great deal."
/>

## What majority vote is actually for

It is dismissed too quickly in community circles, usually on the grounds that it is adversarial. It is fast, it is legible to a newcomer on their first day, and it cannot be captured by whoever is most persistent — which is a real property that consensus does not have.

Its cost is structural rather than moral. Every vote manufactures a minority, and while losing once is nothing, losing repeatedly on the same axis is corrosive. The three households who wanted the money spent differently, three years running, do not usually stage a rebellion. They stop coming to meetings, then stop volunteering, then leave. This is the failure mode, and it is quiet enough that groups often attribute it to something else.

Two things make it survivable. A **<Gloss term="supermajority">supermajority</Gloss>** on anything that touches the community's identity, so a bare fifty-one per cent cannot rewrite what the place is for. And a habit of noticing _who_ keeps losing — a minority that is a different set of people each time is healthy, and a minority that is the same four names every time is a warning.

## What consensus is actually for

Consensus produces something a vote cannot: people carry out the decision because they own it, not because it passed. In small groups doing emotionally loaded work — who joins, what this place is for, how we handle someone who is struggling — that difference is worth the extra hours.

It is also a better teacher. The amendment loop — raise a concern, change the proposal, test again — forces a group to hear each other in a way a clean vote skips entirely. Groups that start with consensus and add other methods later usually keep the listening habits, and those habits are why the later methods work at all.

Its failure is equally structural. Past roughly a dozen people, consensus starts handing an effective veto to whoever is most tired, most stubborn, or most articulate at eleven at night. Nobody intends this and it does not feel like power to the person holding it.

<Callout type="warning" title="The two fixes consensus cannot survive without">

**Define what counts as a block.** If any member may block anything for any reason, the group has not adopted consensus — it has issued everyone a veto. An objection has to name a harm to the group or its aim, not a preference.

**Have a <Gloss term="stand-aside">stand-aside</Gloss>.** Somewhere to record "I disagree and I am not stopping you." Without it, anyone with a reservation has only two options: swallow it, or escalate to a block they do not really believe in. Both are corrosive, and the second is how one person ends up holding a community hostage without ever intending to.

</Callout>

## The question underneath

Both methods are answers to the same trade, and the trade has been formalised: as the share required to pass rises, the cost of being overruled falls and the cost of reaching agreement at all rises. Unanimity drives the first to zero and the second toward infinity.

That is why there is no single right answer — and why the useful question is not _which method_, but _which method for which decision_. A community that consenses on the compost rota is spending its most expensive resource on its cheapest decision. A community that carries a change to its founding purpose by twenty-one votes to twenty has produced a technically valid decision that a third of its members will never accept.

Sorted by what a decision costs to get wrong, this stops being a debate:

- **Operational** — the rota, the repair, the order. Majority, fast, reversible, ideally delegated to a circle so it never reaches a general meeting at all.
- **Strategic** — money, buildings, direction. Supermajority, with a real deliberation window and a delay before it takes effect.
- **Constitutional** — purpose, agreements, membership, and how the group decides. Consensus, slowly, with room for a late objection.

That is the substance of [decision tiers](/learn/glossary/decision-tiers), and it is the answer most long-lived communities reach eventually. Reaching it in year one instead of year six is most of what this page is for.

## Where consent fits

There is a third option that gets confused with both, and it is closer to consensus than to voting: **consent** asks not _do you agree?_ but _do you have a reasoned objection serious enough to stop this?_ It keeps most of consensus's protection while moving the burden onto the objector, and it scales considerably further.

If this page's trade-off is the one you are stuck on, that comparison is worth reading next: [consensus vs consent](/learn/compare/consensus-vs-consent).

<Sources
items={[
{
title: 'RCOS Core — Layer 2: Governance & Decision Logic',
url: 'https://rcos.ecohubs.community/articles/rcos-core/v0-1/layer-2-governance-decision-logic',
note: 'names majority, supermajority and consent as mechanisms, sorted by decision type'
},
{
title: 'Buchanan, J. & Tullock, G. — The Calculus of Consent (1962)',
url: 'https://oll.libertyfund.org/titles/buchanan-the-calculus-of-consent',
note: 'the formal version of the trade this page describes'
},
{
title: 'Seeds for Change',
url: 'https://www.seedsforchange.org.uk/',
note: 'free, practical consensus guides — including what a block should mean'
}
]}
/>
