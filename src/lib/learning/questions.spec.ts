import { describe, expect, it } from 'vitest';
import { countQuestions, plainText, questionGroups, questionsIn } from './questions';
import { lessonsOfGuide } from './index';

const CALLOUT = (body: string) =>
	`<Callout type="note" title="Take these with you">\n\n${body}\n\n</Callout>`;

describe('questionsIn', () => {
	it('pulls the numbered items out of the callout', () => {
		const source = `Some prose.\n\n${CALLOUT('1. **First?** Because.\n2. **Second?** Also.')}\n\nMore prose.`;
		expect(questionsIn(source)).toEqual(['First? Because.', 'Second? Also.']);
	});

	it('keeps an item that runs over several lines as one question', () => {
		const source = CALLOUT('1. **A long one?**\n   Continued on the next line.\n2. Short.');
		const [first] = questionsIn(source);
		expect(first).toBe('A long one? Continued on the next line.');
	});

	/** The rule that stops lesson 11's own grouped summary being counted twice. */
	it('ignores note callouts with any other title', () => {
		const source = '<Callout type="note" title="Daily life">\n\n1. Not this one.\n\n</Callout>';
		expect(questionsIn(source)).toEqual([]);
	});

	it('ignores caveats and other callout kinds', () => {
		const source = '<Callout type="caveat">\n\n1. Nor this.\n\n</Callout>';
		expect(questionsIn(source)).toEqual([]);
	});

	it('returns nothing for a lesson that has no such callout', () => {
		expect(questionsIn('Just prose, with a 1. that is not a list.')).toEqual([]);
	});
});

describe('plainText', () => {
	it('strips the markup a printed page cannot use', () => {
		expect(plainText('**Who** may *block*, and on `what` grounds?')).toBe(
			'Who may block, and on what grounds?'
		);
	});

	it('keeps a link’s words and drops its target', () => {
		expect(plainText('See [the exit number](/learn/x) first.')).toBe('See the exit number first.');
	});

	it('renders a glossary reference as words, both spellings', () => {
		expect(plainText('A <Gloss term="blocking-concern">blocking concern</Gloss> is.')).toBe(
			'A blocking concern is.'
		);
		expect(plainText('A <Gloss term="common-house" /> exists.')).toBe('A common house exists.');
	});
});

describe('questionGroups', () => {
	const lessons = [
		{ title: 'Second', order: 2, source: CALLOUT('1. B?') },
		{ title: 'First', order: 1, source: CALLOUT('1. A?') },
		{ title: 'No questions', order: 3, source: 'Prose only.' }
	];

	it('orders by the lesson order, not the order given', () => {
		expect(questionGroups(lessons).map((g) => g.lesson)).toEqual(['First', 'Second']);
	});

	it('drops a lesson with no questions rather than printing an empty heading', () => {
		expect(questionGroups(lessons).map((g) => g.lesson)).not.toContain('No questions');
	});
});

/**
 * The download is only worth shipping if it tracks the real lessons, so this
 * asserts against the actual guide rather than a fixture.
 */
describe('against the intentional-communities guide', () => {
	const groups = questionGroups(
		lessonsOfGuide('intentional-communities').map((lesson) => ({
			title: lesson.frontmatter.title,
			order: lesson.frontmatter.order,
			source: lesson.source
		}))
	);

	it('finds questions in most of the guide', () => {
		expect(groups.length).toBeGreaterThanOrEqual(8);
		expect(countQuestions(groups)).toBeGreaterThanOrEqual(30);
	});

	it('produces questions, not fragments of markup', () => {
		for (const group of groups) {
			for (const question of group.questions) {
				expect(question, `in ${group.lesson}`).not.toMatch(/[*`]|<Gloss|\]\(/);
				expect(question.length, `in ${group.lesson}`).toBeGreaterThan(15);
			}
		}
	});

	it('follows the guide’s lesson order', () => {
		const orders = groups.map((g) => g.order);
		expect(orders).toEqual([...orders].sort((a, b) => a - b));
	});
});
