import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 06's check.
 *
 * Four arrangements, the same four answers each time. The point of repeating
 * the options is that the reader has to read the *arrangement* rather than
 * pattern-match a keyword — "shared", "community" and "charity" appear in
 * several of them and settle nothing.
 *
 * Every explanation says the two things a reader actually needs: what you
 * could sell, and whether an ordinary lender would touch it.
 */
export const whatWouldYouOwn: QuizDefinition = {
	id: 'what-would-you-own',
	mode: 'check',
	title: 'What would you actually own?',
	intro:
		'Four arrangements, described the way a community would describe them on a first visit. In each case, what have you actually bought — and could you get a mortgage on it?',
	questions: [
		{
			id: 'freehold',
			prompt:
				'"You buy the house itself, in your own name. The common house and the grounds belong to an association that every household is a member of, and you pay it a monthly charge."',
			options: [
				{
					id: 'freehold',
					label: 'The house, outright',
					correct: true,
					explanation:
						'Right. This is ordinary freehold with common parts held in common — the shape most cohousing takes. You can sell on the open market, and an ordinary lender will treat it like any other house, though it may ask about the association’s finances.'
				},
				{
					id: 'share',
					label: 'A share in an organisation',
					explanation:
						'The association owns the common parts, not your home. Your name is on the deed of the house, which is what makes this financeable in the ordinary way.'
				},
				{
					id: 'lease',
					label: 'A lease on land somebody else owns',
					explanation:
						'Nothing here separates the land from the building. Where a trust holds the ground, the community will say so early and in writing — it is the whole point of the arrangement.'
				},
				{
					id: 'tenancy',
					label: 'A right to live there, and nothing more',
					explanation:
						'A monthly charge is not rent. Service charges exist in ordinary owner-occupied housing too, and paying one says nothing about whether you own the home.'
				}
			]
		},
		{
			id: 'coop-share',
			prompt:
				'"You pay for a share in the co-operative. The co-operative owns the whole building. Your share comes with a written right to occupy flat 3. When you leave, you get back what you paid for the share."',
			options: [
				{
					id: 'share',
					label: 'A share in an organisation',
					correct: true,
					explanation:
						'Right, and the financing consequence is the one to remember: a share is not real property, so an ordinary mortgage does not apply. You need a share loan, secured on the share and on your occupancy rights, and far fewer lenders offer them.'
				},
				{
					id: 'freehold',
					label: 'The flat, outright',
					explanation:
						'The co-operative owns the building. You own a share of the organisation that owns it — which is a genuine asset, but a different one, and it is sold in a different way.'
				},
				{
					id: 'lease',
					label: 'A lease on land somebody else owns',
					explanation:
						'A right to occupy is not a ground lease. Under a land trust you own the building and lease the ground; here you own neither, and hold a share instead.'
				},
				{
					id: 'tenancy',
					label: 'A right to live there, and nothing more',
					explanation:
						'Closer than it looks, but the money makes the difference: you get your share back when you go. A tenant gets a deposit back, not a stake.'
				}
			]
		},
		{
			id: 'ground-lease',
			prompt:
				'"The house costs noticeably less than the comparable one down the road. A charity owns the ground and leases it to you on a long lease. When you sell, a formula sets the price and the buyer has to qualify."',
			options: [
				{
					id: 'lease',
					label: 'The building, on land somebody else owns',
					correct: true,
					explanation:
						'Right. This is a community land trust. The discount and the resale formula are the same mechanism seen from two ends — the reason the house is cheaper now is the reason you keep only part of the gain later.'
				},
				{
					id: 'freehold',
					label: 'The house, outright',
					explanation:
						'You own the building, which is real property and is mortgageable — but not the ground under it. A price below the comparable house next door is almost always land being held out of the sale.'
				},
				{
					id: 'share',
					label: 'A share in an organisation',
					explanation:
						'No share changes hands. The trust owns the land permanently and you hold a lease on it, which is why the arrangement can survive many owners.'
				},
				{
					id: 'tenancy',
					label: 'A right to live there, and nothing more',
					explanation:
						'You can sell, and you keep a share of the appreciation. A capped return is still a return, and it is a very different position from renting.'
				}
			]
		},
		{
			id: 'tenancy',
			prompt:
				'"You pay monthly. You have a written agreement, you sit in every meeting, you have a full vote on everything including the budget, and you have lived here twelve years."',
			options: [
				{
					id: 'tenancy',
					label: 'A right to live there, and nothing more',
					correct: true,
					explanation:
						'Right, and this is the one people get wrong. Governance and ownership are separate questions. Twelve years of full participation builds no equity, and nothing here is yours to sell — which may be a perfectly good arrangement, so long as you know it is the one you are in.'
				},
				{
					id: 'share',
					label: 'A share in an organisation',
					explanation:
						'A vote is not a share. Many communities give residents full governance rights without any financial stake, deliberately — it is how a group includes people who cannot buy in.'
				},
				{
					id: 'freehold',
					label: 'The home, outright',
					explanation:
						'Nothing was bought. Length of residence creates no ownership on its own, however settled it feels by year twelve.'
				},
				{
					id: 'lease',
					label: 'The building, on land somebody else owns',
					explanation:
						'A tenancy is a lease of a kind, but it is a lease of the home rather than of the ground, and it ends rather than being sold. The test is whether you have anything to pass on.'
				}
			]
		}
	]
};
