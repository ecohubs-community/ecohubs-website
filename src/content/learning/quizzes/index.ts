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
import { didItResolve } from './did-it-resolve';
import { howMuchSharedLife } from './how-much-shared-life';
import { isThatInScope } from './is-that-in-scope';
import { isThereAWayBack } from './is-there-a-way-back';
import { isThisABlockingConcern } from './is-this-a-blocking-concern';
import { isThisAnIntentionalCommunity } from './is-this-an-intentional-community';
import { spotTheEarlyWarning } from './spot-the-early-warning';
import { structureOrPerson } from './structure-or-person';
import { whatWouldYouOwn } from './what-would-you-own';
import { whatWouldYourHouseholdNeed } from './what-would-your-household-need';
import { whichCommunityFits } from './which-community-fits';
import { whichTierIsThisDecision } from './which-tier-is-this-decision';
import { willItBeThereNextYear } from './will-it-be-there-next-year';
import { wouldThatActuallyHelp } from './would-that-actually-help';

export const QUIZZES: Record<string, QuizDefinition> = {
	[didItResolve.id]: didItResolve,
	[howMuchSharedLife.id]: howMuchSharedLife,
	[isThatInScope.id]: isThatInScope,
	[isThereAWayBack.id]: isThereAWayBack,
	[isThisABlockingConcern.id]: isThisABlockingConcern,
	[isThisAnIntentionalCommunity.id]: isThisAnIntentionalCommunity,
	[spotTheEarlyWarning.id]: spotTheEarlyWarning,
	[structureOrPerson.id]: structureOrPerson,
	[whatWouldYouOwn.id]: whatWouldYouOwn,
	[whatWouldYourHouseholdNeed.id]: whatWouldYourHouseholdNeed,
	[whichCommunityFits.id]: whichCommunityFits,
	[whichTierIsThisDecision.id]: whichTierIsThisDecision,
	[willItBeThereNextYear.id]: willItBeThereNextYear,
	[wouldThatActuallyHelp.id]: wouldThatActuallyHelp
};

export function getQuiz(id: string): QuizDefinition | undefined {
	return QUIZZES[id];
}
