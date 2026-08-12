import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 02's check.
 *
 * Built around the lesson's own test — what changed afterwards — because that
 * is the question a community can actually answer about its own history, and
 * "did we handle that well?" is not. Every scenario is an ending somebody
 * described at the time as a resolution.
 *
 * Two of the five resolve. That ratio is the argument: a reader who works
 * through this and finds most of their own history in the other two columns
 * has learned more than the paragraph above it could tell them.
 */
export const didItResolve: QuizDefinition = {
	id: 'did-it-resolve',
	mode: 'check',
	title: 'Did it resolve, or did it just stop?',
	intro:
		'Five conflicts that ended. Everybody involved described each one, at the time, as dealt with. The test is not whether it felt better afterwards — it is whether you could point at something a year later and say that is what changed.',
	questions: [
		{
			id: 'departure',
			prompt:
				'A long dispute about how the workshop was run ended when one of the two people involved left the community.',
			options: [
				{
					id: 'stopped',
					label: 'It stopped — the conflict ended and nothing about the community is different',
					correct: true,
					explanation:
						'Right. Departure is the default conflict process of any community that has not chosen one, and it works in the narrow sense that the argument is over. It costs a member every time, and it teaches everyone still there what happens to people who keep raising something. The workshop is still run the way it was run.'
				},
				{
					id: 'resolved',
					label: 'Resolved — something changed, and you could point at it a year later',
					explanation:
						'Something changed: there is one fewer person. Nothing about how the workshop is run, who decides that, or how the next disagreement about it would go is any different from the week before.'
				},
				{
					id: 'live',
					label: 'Neither — it is still running, just off the agenda',
					explanation:
						'Fair, and often true in practice — the people who took the leaver’s side rarely stop holding it. But the sharper thing to notice is that the community has just used its actual conflict process, and that process is losing people.'
				}
			],
			href: '/learn/failures/conflict-avoidance-normalization'
		},
		{
			id: 'booking',
			prompt:
				'After four months of argument, the group wrote down who may book the common room and how far ahead. The two people at the centre of it still do not much like each other.',
			options: [
				{
					id: 'resolved',
					label: 'Resolved — something changed, and you could point at it a year later',
					correct: true,
					explanation:
						'Right, and the dislike is not evidence against it. Resolution is structural, not affectionate: the question that produced the argument now has an answer that does not depend on either of them being generous. A new member arriving next year inherits the answer without inheriting the history.'
				},
				{
					id: 'stopped',
					label: 'It stopped — the conflict ended and nothing about the community is different',
					explanation:
						'Something is different, and it is the thing that was actually broken. Communities routinely undervalue this outcome because the relationship did not warm up, and then go looking for a process that produces friendship.'
				},
				{
					id: 'live',
					label: 'Neither — it is still running, just off the agenda',
					explanation:
						'Two people not liking each other is not a live conflict; it is a fact about a community of adults. What would make it live is if the booking rule were routinely ignored, and nothing here says it is.'
				}
			],
			href: '/learn/topics/conflict-resolution'
		},
		{
			id: 'parking',
			prompt:
				'Somebody kept parking in the loading bay. A neighbour mentioned it, they talked for ten minutes, it stopped — and the group added a line about it to the parking agreement.',
			options: [
				{
					id: 'resolved',
					label: 'Resolved — something changed, and you could point at it a year later',
					correct: true,
					explanation:
						'Right, and this is what a working ladder looks like from inside: so cheap that nobody would call it a conflict process. The line in the agreement is the part that matters — without it this resolves once, with the next person, and the one after that, each time relying on somebody being willing to have the conversation.'
				},
				{
					id: 'stopped',
					label: 'It stopped — the conflict ended and nothing about the community is different',
					explanation:
						'The agreement changed, which means the next person to do it will be told by a document rather than by a neighbour who had to work up to it. That is a small structural gain and it is exactly the kind communities forget to count.'
				},
				{
					id: 'live',
					label: 'Neither — it is still running, just off the agenda',
					explanation:
						'Nothing suggests it is. The useful thing here is how unremarkable it was: a community where a ten-minute conversation is available for something this small is a community where bigger things get raised earlier.'
				}
			],
			href: '/learn/glossary/graduated-sanctions'
		},
		{
			id: 'mediation',
			prompt:
				'A new member and a founder were mediated. The new member agreed to the founder’s proposal, both shook hands, and everyone present described it as a good outcome.',
			options: [
				{
					id: 'live',
					label: 'Neither — it is still running, just off the agenda',
					correct: true,
					explanation:
						'Right, and this is the most misdiagnosed ending in the guide. Mediation between people with substantially different standing produces agreement rather than resolution: the newer person read the room correctly and settled. It resurfaces in about eighteen months attached to something else, at which point the group concludes its process does not work and goes looking for a better method. The method was never the problem.'
				},
				{
					id: 'resolved',
					label: 'Resolved — something changed, and you could point at it a year later',
					explanation:
						'Someone changed their position, which is not the same as something changing. The question worth asking is whether this agreement would have gone the other way had the standing been reversed — and everybody in the room usually knows the answer.'
				},
				{
					id: 'stopped',
					label: 'It stopped — the conflict ended and nothing about the community is different',
					explanation:
						'Closer than "resolved", but it understates what happened. This did not merely fail to change anything; it taught a new member what raising something with a founder costs, which is a change, in the wrong direction.'
				}
			],
			href: '/learn/guides/why-communities-fail/power-nobody-voted-for'
		},
		{
			id: 'warning',
			prompt:
				'Somebody breached a stated boundary. The group moved straight to a formal warning on the record. It has not recurred — and in the eighteen months since, nobody has raised anything small.',
			options: [
				{
					id: 'stopped',
					label: 'It stopped — the conflict ended and nothing about the community is different',
					correct: true,
					explanation:
						'Right, and the second sentence is the expensive part. The breach ended and the group acquired a new rule nobody wrote down: that raising something starts a process with a verdict at the end of it. Communities arrive here fleeing the opposite failure — exhausted by never confronting anything, they get serious about accountability, and eighteen months later nothing small is ever raised.'
				},
				{
					id: 'resolved',
					label: 'Resolved — something changed, and you could point at it a year later',
					explanation:
						'You can point at something a year later, and it is the silence. A single available outcome is not a ladder; repair needs early steps that are cheap and reversible, with escalation available and rarely needed.'
				},
				{
					id: 'live',
					label: 'Neither — it is still running, just off the agenda',
					explanation:
						'The original breach does look settled. What is running is everything that has not been raised since, which the community will not discover until several of those arrive at once.'
				}
			],
			href: '/learn/failures/punishment-before-repair'
		}
	]
};
