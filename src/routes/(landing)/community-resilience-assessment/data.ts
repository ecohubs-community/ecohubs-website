/**
 * Community Resilience Assessment — quiz content.
 *
 * Ten questions about whether the community's most consequential agreements
 * are written down. Four answer options, same set for every question.
 */

export type AnswerKey = 'yes' | 'partial' | 'no' | 'unsure';

export interface Question {
	/** Stable key used in the serialised summary sent to Mautic. */
	key: string;
	/** Short label shown as the eyebrow above the question. */
	label: string;
	/** The full question prompt. */
	prompt: string;
}

export interface Option {
	key: AnswerKey;
	glyph: string;
	glyphBg: string;
	/** Full label shown in the quiz UI. */
	label: string;
	/** Compact label used in the Mautic summary line. */
	short: string;
	/** Weight in the directional tier calculation. */
	value: number;
}

export const QUESTIONS: Question[] = [
	{
		key: 'decisions',
		label: 'Decision-making',
		prompt: 'How does your community make important decisions — and is that process written down?'
	},
	{
		key: 'conflict',
		label: 'Conflict resolution',
		prompt:
			'If two members have a serious conflict, is there a clear, agreed process for resolving it?'
	},
	{
		key: 'joining',
		label: 'Joining the community',
		prompt:
			'Are the requirements and steps for someone to become a full member of your community clearly defined?'
	},
	{
		key: 'leaving',
		label: 'Leaving the community',
		prompt:
			'If a member wants to leave — or needs to be asked to leave — is the process (including what happens to their contributions, belongings, or share) clearly defined?'
	},
	{
		key: 'money',
		label: 'Money and shared finances',
		prompt:
			'Is it clearly defined how shared money is collected, spent, and accounted for — and who has authority over it?'
	},
	{
		key: 'land',
		label: 'Land and shared resources',
		prompt:
			'Is it clearly defined who can use which spaces, tools, and resources — and under what conditions?'
	},
	{
		key: 'roles',
		label: 'Roles and responsibilities',
		prompt:
			'Are the roles people hold in the community — and the authority each role carries — written down and agreed?'
	},
	{
		key: 'accountability',
		label: 'Accountability',
		prompt:
			"If someone doesn't fulfill their responsibilities or breaks an agreement, is there a clear, agreed process for addressing it?"
	},
	{
		key: 'change',
		label: 'Changing the rules',
		prompt:
			'Is there a clear, agreed process for how community agreements themselves can be changed over time?'
	},
	{
		key: 'power',
		label: 'Power limits',
		prompt:
			'Are there clear limits on how much influence any single person — including founders or long-time members — can hold over community decisions?'
	}
];

export const OPTIONS: Option[] = [
	{
		key: 'yes',
		glyph: '✅',
		glyphBg: '#d1fae5',
		label: "Yes — it's written down and agreed by the community",
		short: 'Yes — written down',
		value: 1
	},
	{
		key: 'partial',
		glyph: '🟡',
		glyphBg: '#fef3c7',
		label: "Partially — some of it is written, some isn't",
		short: 'Partially',
		value: 0.5
	},
	{
		key: 'no',
		glyph: '⚪',
		glyphBg: '#f5f5f4',
		label: "No — we understand it informally, but it isn't written",
		short: 'No — informal only',
		value: 0
	},
	{
		key: 'unsure',
		glyph: '❓',
		glyphBg: '#e7e5e4',
		label: 'Not sure',
		short: 'Not sure',
		value: 0
	}
];

export interface TierInfo {
	name: string;
	body: string;
}

/**
 * Directional tier — not a grade, just a way to colour the result page so
 * the visitor recognises where they roughly land before requesting the full
 * (human-written) report.
 */
export function tierFor(score: number): TierInfo {
	if (score <= 3) {
		return {
			name: 'Significant undefined areas',
			body: "Your community has significant undefined areas. This is more common than people realize — and it's exactly where the manual report will be most useful."
		};
	}
	if (score <= 6.5) {
		return {
			name: 'Partially defined, with gaps',
			body: 'Your community sits in the range most communities sit in — partially defined, with meaningful gaps. The full report will show you which gaps matter most.'
		};
	}
	return {
		name: 'More explicit than most',
		body: 'Your community is more explicit than most. The full report will show you the few remaining gaps that tend to matter most under stress.'
	};
}
