/**
 * The "ask on a visit" questions, lifted out of the lessons that carry them.
 *
 * Every lesson in a guide ends with a callout of concrete questions a reader
 * can put to a real community. That set is the guide's signature and its most
 * quotable asset, so it also ships as a one-page download — and the only way a
 * download stays true is if it is derived from the lessons rather than
 * maintained beside them.
 *
 * The convention is the callout's title: exactly `Take these with you`. That
 * is what makes this work across guides without a per-guide list, and it is
 * why lesson 11's own grouped summary — whose callouts are titled by theme —
 * is not double-counted here.
 */

/** `<Callout type="note" title="Take these with you">` and its body. */
const CALLOUT =
	/<Callout\s+type="note"\s+title="Take these with you"\s*>\s*([\s\S]*?)\s*<\/Callout>/g;

/** The line that starts a numbered item. */
const ITEM_START = /^\d+\.\s+/;

export interface QuestionGroup {
	/** The lesson the questions came from. */
	lesson: string;
	/** Its position in the guide, for ordering and for labelling. */
	order: number;
	questions: string[];
}

/**
 * Markdown emphasis and our own components, reduced to the words.
 *
 * The questions are printed, so `**bold**` and `<Gloss term="x" />` have to
 * become plain text rather than travel as markup.
 */
export function plainText(markdown: string): string {
	return markdown
		.replace(/<Gloss\s+term="[^"]*"\s*>([^<]*)<\/Gloss>/g, '$1')
		.replace(/<Gloss\s+term="([^"]*)"\s*\/>/g, (_, slug) => slug.replace(/-/g, ' '))
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '$1')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * The questions in one lesson's source, in the order they are written.
 *
 * Walks the lines rather than matching each item with one regex: a question
 * that wraps onto a second line is common, and a lookahead anchored with the
 * multiline flag stops at the first line break instead of the next number.
 */
export function questionsIn(source: string): string[] {
	const found: string[] = [];

	for (const callout of source.matchAll(CALLOUT)) {
		let current: string[] = [];
		const flush = () => {
			const text = plainText(current.join(' '));
			if (text) found.push(text);
			current = [];
		};

		for (const line of callout[1].split('\n')) {
			if (ITEM_START.test(line)) {
				flush();
				current.push(line.replace(ITEM_START, ''));
			} else if (line.trim() === '') {
				flush();
			} else if (current.length > 0) {
				current.push(line.trim());
			}
		}
		flush();
	}

	return found;
}

/**
 * Every group in a guide, ordered as the lessons are.
 *
 * Lessons with no such callout are dropped rather than appearing as an empty
 * heading — a guide part-way through being written should still produce a
 * usable download.
 */
export function questionGroups(
	lessons: { title: string; order: number; source: string }[]
): QuestionGroup[] {
	return lessons
		.slice()
		.sort((a, b) => a.order - b.order)
		.map(({ title, order, source }) => ({ lesson: title, order, questions: questionsIn(source) }))
		.filter((group) => group.questions.length > 0);
}

export function countQuestions(groups: QuestionGroup[]): number {
	return groups.reduce((sum, group) => sum + group.questions.length, 0);
}
