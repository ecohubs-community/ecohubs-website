---
type: failure
title: Experiments with no way back
slug: irreversible-experiments
lesson: changes-that-cannot-be-undone
layer: 6
rcos: change-emergencies/irreversible-experiments
summary: A trial that quietly became the arrangement — because nobody wrote down when it ended or what would count as it failing.
targetQuery: trying something new in a community
status: published
updated: 2026-08-12
signs:
  - Something introduced as a trial is still running, and nobody set a review date.
  - Nobody can say what would have counted as the experiment failing.
  - Reverting would now cost more than the change did, and that argument is winning.
  - Members disagree about whether it was ever agreed permanently.
terms: [agreements, ratification, cooling-off-period, decision-tiers]
related: [emergency-rule-bypass-precedent, ossified-governance-no-path-to-change]
---

## Why it is hard to see

Because **calling it a trial is what got it adopted**, and everybody meant it at the time.

"Let's try it for six months" is the single most useful sentence in community governance. It lowers the stakes, it converts an argument about principle into a question of evidence, and it lets a group act while it is still uncertain. Communities that cannot say it get stuck; communities that can, move.

The failure is not in the trial. It is that **the sentence contains a promise nobody wrote down** — six months, and then what? Reviewed by whom, against what, and reverting to what if it has not worked?

Without those, the experiment does not end. It **accretes into the arrangement**, and by the time anybody raises it the situation has changed underneath: people have rearranged their lives around it, a rota has been rebuilt, somebody has bought equipment. Reverting is now a real cost, and _reverting is expensive_ becomes the argument that keeps it — an argument that would have carried no weight in month one and is decisive in month twenty.

The second problem is subtler and worse. **An experiment with no failure criteria cannot fail.** Whatever happens, somebody can read the outcome as success, because there was never a stated definition to check it against. So the community has run the trial, learned nothing testable from it, and kept the change anyway.

## What to check

**List what is currently "being tried".** Then, for each: what date was set, what would count as it working, and who is reviewing it. Communities usually find several items on the list and almost no answers to the three questions.

**Ask what reverting would cost now versus at the start.** If the gap is large, the trial has already become permanent regardless of what anyone intends.

**Ask what was learned.** A trial that produced no answer to the question it was meant to settle was not an experiment. It was a change with softer framing.

## If it is already happening

**Do not extend by default — decide.** For each live trial: adopt it properly, end it, or set a real review with a date and criteria. Any of the three is fine. Continuing without choosing is the only bad option, and it is the one that happens automatically.

**Write the review before you write the trial**, from now on. Four fields, and they take five minutes: what is changing, until when, what would count as it working, and what we return to if it does not. A community that cannot answer the third has not designed an experiment.

**Prefer the reversible version.** Where there is a choice between a trial that can be undone and one that cannot, the reversible one is worth real cost — because the value of a trial is the option to stop, and an irreversible trial has spent that option before it starts.

**And be honest about which changes cannot be trialled at all.** Selling an asset, changing a legal structure, admitting a member: these are not experiments regardless of how they are framed, and framing them as trials to lower the bar is the version of this pattern that does lasting damage.

## What prevents it

Experiments with a **stated duration, stated success and failure criteria, and a rollback plan** — plus an expiry that is automatic rather than requiring somebody to argue for ending it. The asymmetry matters: continuing should require a decision, not silence.

<Rcos
layer={6}
section="§8.3 Experiments, §8.5 Change Safety and Reversibility"
href="https://rcos.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments">

RCOS permits experiments and specifies what one has to contain. Every experiment must define, at minimum: **scope — what is changed and what is explicitly not — duration and review checkpoints, success and failure criteria, rollback conditions and the rollback process, and the authorised decision path for starting, extending, modifying or terminating it** (§8.3.2).

Failure criteria as a required field is the clause most communities are missing, and it is what separates an experiment from a change.

Then the expiry rule, which fixes the default: experiments must be **explicitly labelled as experimental in all affected artifacts and must include a non-extendable expiration date unless renewed through an authorised decision** (§8.3.4). Non-extendable, and renewal is a decision — so silence ends the experiment rather than continuing it.

Two boundaries around them. Experiments **must not override Layer 0 invariants and must not bypass the governance constraints of Layer 2** (§8.3.3) — no trialling your way past the constitution. And if an experiment introduces safety risk, coercion or sustained harm, it must be **suspended or terminated immediately**, with review afterwards (§8.3.5).

The safety clauses generalise it: the system **must prefer reversible changes over irreversible ones where possible** (§8.5.1), and irreversible or high-impact changes must carry **extended deliberation, higher thresholds where appropriate, and explicit risk acknowledgment** (§8.5.2).

</Rcos>

<Sources
items={[
{
title: 'RCOS stress test — Irreversible Experiments',
url: 'https://rcos.ecohubs.community/articles/rcos-stress-tests/change-emergencies/irreversible-experiments',
note: 'the specification this page puts into plain language'
},
{
title: 'RCOS Core — Layer 6: Evolution & Adaptation',
url: 'https://rcos.ecohubs.community/articles/rcos-core/v0-1/layer-6-evolution-adaptation',
note: 'what an experiment must define, and why its expiry is non-extendable'
},
{
title: 'Proposals & ratification',
url: '/learn/topics/proposals-and-ratification',
note: 'the phases a decision travels through, and the two most often skipped'
}
]}
/>
