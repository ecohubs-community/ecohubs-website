/**
 * The quiz registry.
 *
 * Definitions are TypeScript rather than markdown: they are structured data
 * with scoring logic, and type-checking catches a weight pointing at an
 * outcome that does not exist — which markdown frontmatter never would.
 *
 * Markdown refers to a quiz by id (`<Quiz id="which-community-fits" />`), so
 * a new quiz means adding it here and nowhere else.
 */
import type { QuizDefinition } from '$lib/learning/quiz';
import { isThisAnIntentionalCommunity } from './is-this-an-intentional-community';
import { whichCommunityFits } from './which-community-fits';

export const QUIZZES: Record<string, QuizDefinition> = {
	[isThisAnIntentionalCommunity.id]: isThisAnIntentionalCommunity,
	[whichCommunityFits.id]: whichCommunityFits
};

export function getQuiz(id: string): QuizDefinition | undefined {
	return QUIZZES[id];
}
