import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 06's check.
 *
 * Reversibility is the one property in this guide that is cheap to preserve
 * and impossible to retrofit, so the quiz asks about it directly rather than
 * about drift — which, being a non-event, cannot be put in a scenario at all.
 *
 * The third option is the one that does the teaching. Communities assume the
 * choice is between keeping a change and undoing it, and a surprising number
 * of their arrangements are in neither state: nothing was recorded, so there
 * is no decision to revisit and no version to return to.
 */
export const isThereAWayBack: QuizDefinition = {
	id: 'is-there-a-way-back',
	mode: 'check',
	title: 'Is there a way back?',
	intro:
		'Five changes a community has made. Some were called temporary, some were called experiments, and one was not called anything. For each, decide whether the community could actually return to how things were — not whether it should.',
	questions: [
		{
			id: 'guests',
			prompt:
				'Three years ago the group suspended the two-week notice rule for guests, "while the building work is on". The building work finished last spring.',
			options: [
				{
					id: 'paper',
					label: 'On paper only — the decision could be reversed, the situation cannot',
					correct: true,
					explanation:
						'Right, and the trap is that reversing it looks trivial: one vote, and the old rule is back. But three years of practice is now the normal way of doing things, so reinstating the rule would not be experienced as returning to the agreement — it would be experienced as a new restriction, proposed by somebody, on everybody. That is how an emergency measure becomes the constitution without ever being adopted.'
				},
				{
					id: 'yes',
					label: 'Yes — there is a date and the old arrangement still exists',
					explanation:
						'There is no date. "While the building work is on" sounded like one at the time, which is precisely why nobody set a real one, and the condition it was tied to passed a year ago without anything happening.'
				},
				{
					id: 'nothing',
					label: 'There is nothing to reverse — no change was ever recorded',
					explanation:
						'A suspension was decided, so there is a decision on the record to point at. That makes this recoverable in a way the genuinely unrecorded cases are not.'
				}
			],
			href: '/learn/failures/emergency-rule-bypass-precedent'
		},
		{
			id: 'childcare',
			prompt:
				'The community agreed to try shared childcare for one term. There is a review date in the diary, and the previous arrangement is still running alongside it.',
			options: [
				{
					id: 'yes',
					label: 'Yes — there is a date and the old arrangement still exists',
					correct: true,
					explanation:
						'Right, and both halves are load-bearing. The date means somebody has to actively decide to continue rather than merely fail to stop. Keeping the old arrangement running is the expensive half and the one usually skipped — a way back that has been dismantled is not a way back, however clearly the minutes say the trial may end.'
				},
				{
					id: 'paper',
					label: 'On paper only — the decision could be reversed, the situation cannot',
					explanation:
						'Nothing has been dismantled and no facts have been created that would outlast the term. This is what a time-bounded experiment is supposed to look like.'
				},
				{
					id: 'nothing',
					label: 'There is nothing to reverse — no change was ever recorded',
					explanation:
						'It was recorded, with an end date, which is more than most arrangements described as trials ever get.'
				}
			]
		},
		{
			id: 'meals',
			prompt:
				'Six households were allowed to opt out of common meals "as an experiment". Four have since converted their dining rooms into other things.',
			options: [
				{
					id: 'paper',
					label: 'On paper only — the decision could be reversed, the situation cannot',
					correct: true,
					explanation:
						'Right. The vote is still there to be retaken and the rooms are gone. An experiment that lets people build on its outcome has stopped being an experiment, whatever the minutes call it — and the households would be right to feel that ending it now is a change being made to them rather than a trial concluding.'
				},
				{
					id: 'yes',
					label: 'Yes — there is a date and the old arrangement still exists',
					explanation:
						'There is no date in the scenario, and for four households the old arrangement no longer physically exists. Both of the things that make a trial reversible are missing.'
				},
				{
					id: 'nothing',
					label: 'There is nothing to reverse — no change was ever recorded',
					explanation:
						'A permission was granted and can be found. The problem is not the record — it is that the situation moved further than the decision did.'
				}
			],
			href: '/learn/failures/irreversible-experiments'
		},
		{
			id: 'charter',
			prompt:
				'The membership fee is named in the founding charter. Last month the group changed it by ordinary majority at a Tuesday meeting, and nobody present raised the charter.',
			options: [
				{
					id: 'paper',
					label: 'On paper only — the decision could be reversed, the situation cannot',
					correct: true,
					explanation:
						'Right, though the reason is unlike the others: the fee could be put back tomorrow, and what cannot be put back is the discovery that a founding document can be amended by an ordinary majority on a Tuesday. Everyone now knows it, and the next thing in the charter is protected only by nobody happening to want it changed. An invariant is a rule about which rules a Tuesday meeting may reach.'
				},
				{
					id: 'nothing',
					label: 'There is nothing to reverse — no change was ever recorded',
					explanation:
						'The change was made and minuted. What was not recorded is the collision with the charter, because nobody in the room noticed there was one.'
				},
				{
					id: 'yes',
					label: 'Yes — there is a date and the old arrangement still exists',
					explanation:
						'The old figure is recoverable from the charter, so the fee itself is easy. The precedent is the part with no way back, and it is now available to anybody who wants it.'
				}
			],
			href: '/learn/failures/unprotected-core-invariants'
		},
		{
			id: 'superseded',
			prompt:
				'A revised version of the work agreement appeared in the shared folder with a new number. There is no adoption record, no summary of what changed, and the previous version was deleted to avoid confusion.',
			options: [
				{
					id: 'nothing',
					label: 'There is nothing to reverse — no change was ever recorded',
					correct: true,
					explanation:
						'Right, and this is worse than an unpopular change, because the community cannot establish what it used to require or whether the new text was ever agreed. Everything downstream — every rule and decision citing the agreement — inherits the ambiguity. Deleting the old version to avoid confusion destroyed the only evidence of what the community previously thought, which is exactly what you need when somebody asks why a rule exists.'
				},
				{
					id: 'paper',
					label: 'On paper only — the decision could be reversed, the situation cannot',
					explanation:
						'There is no decision to reverse. That is the distinction worth holding: a bad change can be revisited, and an unrecorded one leaves nothing to revisit.'
				},
				{
					id: 'yes',
					label: 'Yes — there is a date and the old arrangement still exists',
					explanation:
						'Neither is true — the old text was deleted and no adoption date exists. Two fields, an adoption record and a summary of changes, would have prevented the whole situation.'
				}
			],
			href: '/learn/failures/institutional-amnesia'
		}
	]
};
