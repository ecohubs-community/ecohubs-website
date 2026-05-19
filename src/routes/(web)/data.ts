// Static content for the v2 homepage.
// Lifted out of `+page.svelte` so the page's <script> stays focused on
// state and reactive logic instead of long literal arrays.

import StefanImage from '$lib/assets/stefan.webp';
import stefanFree from '$lib/assets/stefan-free.webp';
import LuisaImage from '$lib/assets/luisa.webp';
import luisaGarden from '$lib/assets/luisa-garden.webp';

// ─── STORIES ──────────────────────────────────────────────────────────────────

export interface Beat {
	number: string;
	title: string;
	content?: string[];
	pullQuote?: string;
	image?: string;
	color?: 'amber';
}

export interface Story {
	id: string;
	name: string;
	keyword: string;
	location: string;
	img?: string;
	placeholder?: boolean;
	cta?: boolean;
	beats?: Beat[];
	testimonial?: string;
}

export const stories: Story[] = [
	{
		id: 'stefan',
		name: 'Stefan',
		keyword: 'Loneliness',
		location: 'Founder · Ecuador',
		img: StefanImage,
		beats: [
			{
				number: '01',
				title: 'Feeling alien',
				content: [
					"Growing up in Germany, I felt alien. Lonely. I didn't understand why then—but the feeling was strong, and I listened to it instead of suppressing it.",
					`For a long time I thought something was wrong with me. Eventually another thought arrived: <em class="font-story italic">maybe it isn't me. Maybe it's the way we live.</em>`
				]
			},
			{
				number: '02',
				title: 'Leaving, and listening',
				image: stefanFree,
				content: [
					'So I left. I traveled for many years, and for the first time I had space to actually hear myself. I connected to nature. I connected to other people who also felt alien in their previous lives.',
					`And for the first time — <em class="font-story italic text-ecohubs-deep">I didn't feel lonely.</em> I felt connected to myself. I felt alive.`
				]
			},
			{
				number: '03',
				title: 'Finding others who felt it too',
				pullQuote: `I learned so much about different ways of living — permaculture, alternative education, meaningful work, new ways of making decisions. Alternatives that <span class="underline decoration-ecohubs-primary/40 decoration-2 underline-offset-4">actually work</span>, that are a lot better. And I kept asking: <em class="italic">why don't we use them?</em>`
			},
			{
				number: '04',
				title: 'Why I stopped trying to change the system',
				color: 'amber',
				content: [
					"I had endless ideas for applying these alternatives inside the big system we live in. Over time I learned it's almost impossible. The system is too rigid. Too big to bend.",
					"This is where I think <b>most institutions</b> fail when they try to make an impact. They put band-aids on wounds. They don't heal the wound — because the system doesn't allow the wound to be healed.",
					`So I changed my question. Not <em class="font-story italic">how do I fix this system?</em>, but <em class="font-story italic text-ecohubs-deep">how do I build a new way of life inside it?</em> That's when I found my answer in intentional communities — small, place-based groups already living many of the alternatives I'd spent years studying.`
				]
			},
			{
				number: '05',
				title: 'The guidebook I wished had existed',
				content: [
					"That's how EcoHubs began. Not as a product. As a direction.",
					`Intentional communities held <em class="font-story italic">everything</em> I was looking for — and yet some sources claim that <strong class="text-ecohubs-deep">80–90% of them fail.</strong> Not because the vision is wrong. Because we were never taught how to live this close together — how to make decisions, resolve conflict, make the invisible things explicit.`,
					`So I wrote the guidebook I wished someone had handed me. It is not an ideology. It is a handful of patterns that say: <em class="font-story italic">make this explicit. Talk about this before it breaks. This is what's usually left unsaid.</em> We call it the RCOS Blueprint.`
				]
			}
		]
	},
	{
		id: 'luisa',
		name: 'Luisa',
		keyword: 'Economy',
		location: 'EcoHubs Member · Italy',
		img: LuisaImage,
		beats: [
			{
				number: '01',
				title: 'Born inside a circular life',
				content: [
					`For the first eighteen years of my life, I lived inside what people now call a <em class="font-story italic">regenerative community.</em> We didn't have the word. We just had the way.`,
					`My grandfather's hens. My grandmother's canned vegetables. A drawer of saved string and paper bags. A &ldquo;library of tools&rdquo; passed between neighbors before that was a thing anyone named.`
				]
			},
			{
				number: '02',
				title: "The day the seeds wouldn't grow",
				pullQuote: `My grandfather had tears in his eyes and an open paper bag of peas in his hand. They couldn't grow. The store owner — a farmer himself — had been scammed too: the seeds were <span class="underline decoration-ecohubs-primary/40 decoration-2 underline-offset-4">engineered to be infertile.</span>`,
				content: [
					`More than the lost harvest, what I saw breaking that day was something else — <em class="font-story italic">the trust between the people who grow food and the people who sell it.</em>`
				]
			},
			{
				number: '03',
				title: 'The food on the shelves was fake',
				content: [
					`My first supermarket run, in another city for university. Fruit too shiny. Eggs date-stamped like factory parts. Plastic on everything. Almost nothing with a smell.`,
					`I walked out with an empty bag and a cold thought: <em class="font-story italic text-ecohubs-deep">if the food here is fake, how am I supposed to feed myself?</em>`
				]
			},
			{
				number: '04',
				title: 'We already have what we need',
				image: luisaGarden,
				content: [
					`We've drifted from nature far enough that we now believe we're separate from it. That belief is the thing hurting us.`,
					`What I grew up inside wasn't backwards, and it isn't a return to the past. It's a way of living that quietly worked — for the people <em class="font-story italic">and</em> for the land. We don't need to invent it. We just need to choose it.`
				]
			},
			{
				number: '05',
				title: "Why I'm helping grow this",
				content: [
					`What I want is an economy at a human size.`,
					`One where every person can contribute something the group actually feels. Where difference is treated as richness, not friction. Where nature isn't a backdrop to our work — it's both the source of it and the thing that benefits from it.`,
					`We keep pretending human life is separate from the living world. That's the biggest delusion of the world I grew into. <em class="font-story italic text-ecohubs-deep">It's the one I'm here to help unmake.</em>`
				]
			}
		]
	},

	{
		id: 'boris',
		name: 'Boris',
		keyword: 'We are Nature',
		location: 'EcoHubs Member ·  Ecuador',
		placeholder: true
	},
	{
		id: 'share',
		name: 'You',
		keyword: 'Your story',
		location: 'Wherever you are',
		cta: true
	}
];

// ─── WOUNDS ───────────────────────────────────────────────────────────────────

export const wounds = [
	{
		cat: 'Belonging',
		title: 'The loneliness no one names',
		body: "We've never been so connected and so alone. Neighbors we never meet. Hours of scrolling instead of one shared meal."
	},
	{
		cat: 'Earth',
		title: 'We are taking more than the land can give',
		body: 'Extractive agriculture strips the soil. Short-term profit costs the biosphere its long-term life. The math stopped working a while ago.'
	},
	{
		cat: 'Economy',
		title: 'Globalization hollowed out the local',
		body: 'Power concentrates at the top. Towns lose their shops, their culture, their self-sufficiency. Energy is burned just to ship our food around the world.'
	},
	{
		cat: 'Work',
		title: 'Eight hours a day to survive',
		body: 'Most work is abstract and far from home. You never see who it served. A lifetime of effort and still the question: what was all that for?'
	},
	{
		cat: 'Power',
		title: "Decisions made by people you'll never meet",
		body: 'A huge party, a distant capital, a shareholder meeting. None of it reaches your street. None of it knows your name.'
	},
	{
		cat: 'Education',
		title: 'School prepares us for the economy, not for life',
		body: "Our children learn to be productive. They don't learn how to be neighbors, how to grow food, how to repair conflict, how to listen to themselves."
	},
	{
		cat: 'Nature',
		title: 'We forgot we are nature',
		body: 'We built walls between us and the living world, then wondered why we felt empty. We are not visitors to the ecosystem. We are part of it.'
	},
	{
		cat: 'Change',
		title: 'The system is too rigid to heal itself',
		body: "Better ways exist for every one of these problems. They just can't be installed into a structure this rigid. Band-aids, not healing."
	}
];

// ─── COMMUNITY ANSWERS ────────────────────────────────────────────────────────

export const answers = [
	{
		cat: 'Belonging',
		title: 'Neighbors who know your name',
		body: "In a small place, you are seen. You are missed when you are gone. Belonging isn't an achievement — it's the air you breathe."
	},
	{
		cat: 'Work',
		title: "Work that lands in someone's hands",
		body: 'When the person you serve is across the table, not across the planet, work stops being a shift you survive and starts being something that means something.'
	},
	{
		cat: 'Earth',
		title: 'Land cared for by the people who live on it',
		body: "Permaculture, regenerative agriculture, local food. Soil is built, not mined. Water is read, not piped. Nature isn't a backdrop — it's the other half of the community."
	},
	{
		cat: 'Economy',
		title: 'Local first, resilient by design',
		body: "Small businesses serving the people around them. Less dependency on fragile global chains. Less waste shipped. More value staying where it's made."
	},
	{
		cat: 'Power',
		title: 'Decisions made by the people they touch',
		body: 'Local governance gives power back to you — where it can actually change your street, your water, your school. Not a party. Not a capital. You.'
	},
	{
		cat: 'Education',
		title: 'Children who learn life, not just labor',
		body: "Mixed-age, curiosity-led, rooted in the real world. From books, from AI, from the adults around them, from nature itself. School is no longer a building — it's the community."
	},
	{
		cat: 'Nature',
		title: 'Surrounded by the living world, again',
		body: 'Small villages sit inside ecosystems, not on top of them. You see, feel, and respond to the seasons. Remembering we are nature stops being a slogan and becomes a daily fact.'
	},
	{
		cat: 'Change',
		title: 'Small enough to actually change',
		body: "The big system can't adopt permaculture, alternative education, or new decision-making — it's too rigid. A community of a hundred people can try all three this year."
	},
	{
		cat: 'Waste',
		title: 'Closed loops, not long lines',
		body: 'When nothing is shipped across the world, there is less to throw away. Wastewater is treated on the land, by the land. Leftovers feed the soil that feeds you.'
	},
	{
		cat: 'Culture',
		title: 'Plural, not monoculture',
		body: "Each hub can hold its own values, rituals, and beliefs. The network doesn't demand sameness — it shares what works and lets each place stay itself."
	}
];

// ─── COMPARISONS ──────────────────────────────────────────────────────────────

export const comparisons = [
	{
		most: "Built around one founder's vision and aesthetic.",
		eco: 'Built around a pattern language the community itself shapes and forks.'
	},
	{
		most: 'Avoid talking about money, power, or conflict until they explode.',
		eco: 'Makes the invisible explicit — before it breaks. Conflict patterns are written down on day one.'
	},
	{
		most: 'Either fully off-grid retreat, or fully digital with no roots.',
		eco: 'Local hubs, woven into a global network. Roots and reach, not one or the other.'
	},
	{
		most: 'Sell a fixed model. Take it or leave it.',
		eco: "Open-source. Every pattern is reviewable, replaceable, forkable by the people who'll live it."
	},
	{
		most: 'Charisma-based authority. The founder is the rulebook.',
		eco: 'No gurus. Authority is structural, distributed, and written down — so anyone can hold it.'
	},
	{
		most: 'Idealistic about labor. Pretend everyone contributes equally.',
		eco: "Honest accounting. XP and ECO make contribution visible — so care and craft don't go unseen."
	}
];

// ─── TECH CARDS ───────────────────────────────────────────────────────────────

export const techCards = [
	{
		title: "Don't cede the tools",
		body: 'AI is being shaped, right now, by people who use it to extract — to concentrate attention, capital, and decisions in fewer and fewer hands. If those of us building something different sit this out, the future gets written without us. We pick up the same tools, deliberately, while there is still time to point them somewhere else.',
		accent: 'emerald'
	},
	{
		title: 'Spend now, save more later',
		body: "Yes, AI costs energy and water — we don't pretend otherwise. We treat it as an upfront investment, the way you build soil. Compute spent now to design regenerative systems returns many times over: in trips not taken, in food grown closer to home, in mistakes a hundred communities don't have to make twice.",
		accent: 'amber'
	},
	{
		title: 'Change what the tools optimise for',
		body: "A tool isn't good or bad — its metric is. Extractive AI is tuned for profit per resource: more clicks, more attention, more dollars wrung from the same earth. We use the same engines, pointed at a different target — life per resource. Same code, opposite direction.",
		accent: 'emerald'
	},
	{
		title: 'Move at the speed of the crisis',
		body: 'Extraction is digital, fast, and well-funded. Regeneration is too often analog and slow — and it has been losing ground for decades. To rebuild on the same scale we have been losing on, we have to work at that pace. Patience in the soil, yes. Patience in the response, no.',
		accent: 'amber'
	}
];

// ─── PERSONAS ─────────────────────────────────────────────────────────────────

export const personas = [
	{
		quote: '"I felt alien too."',
		body: "People who knew early that the default life wasn't the only life — and who have been searching since."
	},
	{
		quote: '"I\'ve tried to build a community and it broke."',
		body: "Organizers and founders who've seen well-meaning projects collapse, and want to understand why."
	},
	{
		quote: '"I work with land."',
		body: 'Permaculturists, farmers, stewards — who know the soil is ready, and the humans are the harder part.'
	},
	{
		quote: '"I build tools for people."',
		body: 'Designers, developers, facilitators who want their craft to land somewhere that actually matters.'
	},
	{
		quote: '"I want meaningful work."',
		body: 'People whose work feels abstract, far from home, and who want it to feed the people they live near.'
	},
	{
		quote: '"I\'m just tired of doing this alone."',
		body: "Which is, honestly, a lot of us. That's enough of a reason to show up."
	}
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const faqItems = [
	// Foundational / factual (migrated from the previous homepage)
	{
		q: 'What is EcoHubs?',
		a: 'EcoHubs is a growing network of people building an open-source blueprint for regenerative communities — a way of life that puts belonging, ecology, and shared decision-making back at the centre. It is online today and place-based tomorrow, with the first physical pilot already running in Ecuador.'
	},
	{
		q: 'What is the Blueprint (RCOS)?',
		a: 'RCOS — Regenerative Community Operating System — is the open standard at the heart of EcoHubs. It writes down the things communities usually leave unsaid: how decisions get made, how people join and leave, how resources are managed, how conflict is repaired. Not an ideology. A shared language.'
	},
	{
		q: 'Is EcoHubs a real project, or just a vision?',
		a: "Real. The blueprint is being written, the community is active, and the first blueprint pilot is running in Ecuador. The project is structured in phases — community formation → blueprint development → pilot hubs — and we're in all three at once."
	},
	{
		q: 'How is this different from existing ecovillages or intentional communities?',
		a: 'Three things. First, the blueprint is open-source — most communities run on undocumented systems; we write ours down so it can be replicated and improved. Second, it integrates ecology, governance, economy and culture as one design, not separate departments. Third, there is a digital coordination layer so dozens of communities can learn from each other instead of each starting from zero.'
	},
	{
		q: 'Is the goal to replace existing society, or to build an alternative within it?',
		a: "An alternative within it. We're not building a wall against the world. We're building small, working examples of a different way to live — and connecting them, so anyone who wants in has a real path."
	},
	{
		q: 'How do people earn a living in an EcoHubs community?',
		a: "Most members keep their existing income — remote work, services, freelance — and gradually shift toward local production and contribution-based work as the community matures. There's no purity test. The model is hybrid by design: external income today, more circular and local over time."
	},
	{
		q: 'Is this only for idealistic people, or is it practical and grounded?',
		a: 'Both, in that order. The vision is ambitious, but the methods are tested: permaculture, water and energy systems, structured governance, conflict-repair patterns. Most past communities failed for lack of structure, not lack of vision. The blueprint is here to fix that.'
	},
	{
		q: 'How is EcoHubs funded?',
		a: 'Through a hybrid model: grants from foundations and impact ecosystems, private funding (currently covering hosting and core costs), member contributions of time and skill, partnerships, and — over time — small revenue streams from onboarding support, tools, and education. No extractive investors. No tokens for sale.'
	},
	{
		q: 'Can I donate to EcoHubs?',
		a: "Yes. Donations help fund the open-source platform, blueprint development, pilot hubs, and day-to-day operations. As the project grows we're setting up clearer donation channels and public tracking. If money isn't an option, time and skills are equally welcome — the community runs on both."
	},

	// Voice / posture
	{
		q: 'Do I have to move somewhere to join?',
		a: 'No. Most members are online, in their current home base. The community meets, contributes, and co-creates the Blueprint together — from anywhere. Physical hubs like the Ecuador pilot come next, when communities are ready.'
	},
	{
		q: 'What does "regenerative" mean here?',
		a: 'That a community gives back more than it takes — to the land, to its people, and to the wider world. Regeneration is about building soil, trust, skill, and resilience over time. Not sustainability in the sense of "do less damage," but a way of life that actively leaves things healthier than it found them.'
	},
	{
		q: 'Is this a crypto project? Why ECO tokens?',
		a: "EcoHubs is not a speculative crypto project. ECO is an internal value unit used inside the community to recognize contributions — like a transparent ledger for labor and care. It's not traded, not promoted as an investment, and never the reason to join. The reason to join is the people and the work."
	},
	{
		q: "I don't have skills in permaculture or governance. Am I still welcome?",
		a: "Very. Every community needs cooks, listeners, writers, organizers, carers, translators, builders, teachers. The question isn't what you already know — it's what you want to show up for."
	},
	{
		q: 'What does joining cost, and what do I get?',
		a: "Application is free and based on alignment, not payment. Members get access to the community platform, the full Blueprint, the voice to shape it, and — when you're ready — a path into the physical pilot hubs."
	}
];
