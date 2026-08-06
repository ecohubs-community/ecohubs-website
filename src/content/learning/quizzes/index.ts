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
import { howMuchSharedLife } from './how-much-shared-life';
import { isThisABlockingConcern } from './is-this-a-blocking-concern';
import { isThisAnIntentionalCommunity } from './is-this-an-intentional-community';
import { spotTheEarlyWarning } from './spot-the-early-warning';
import { whatWouldYouOwn } from './what-would-you-own';
import { whatWouldYourHouseholdNeed } from './what-would-your-household-need';
import { whichCommunityFits } from './which-community-fits';

export const QUIZZES: Record<string, QuizDefinition> = {
	[howMuchSharedLife.id]: howMuchSharedLife,
	[isThisABlockingConcern.id]: isThisABlockingConcern,
	[isThisAnIntentionalCommunity.id]: isThisAnIntentionalCommunity,
	[spotTheEarlyWarning.id]: spotTheEarlyWarning,
	[whatWouldYouOwn.id]: whatWouldYouOwn,
	[whatWouldYourHouseholdNeed.id]: whatWouldYourHouseholdNeed,
	[whichCommunityFits.id]: whichCommunityFits
};

export function getQuiz(id: string): QuizDefinition | undefined {
	return QUIZZES[id];
}
