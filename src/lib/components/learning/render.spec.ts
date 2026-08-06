/**
 * Renders real content through mdsvex and asserts what ends up in the HTML.
 *
 * This is the indexability guarantee in test form: every depth layer must be
 * present in the server response, because a crawler gets exactly this markup
 * and never runs the depth switch.
 */
import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import type { Component } from 'svelte';
import { lessonBySlug, topicBySlug } from '$lib/learning';

const lesson = lessonBySlug.get('what-is-an-intentional-community');

function html(): string {
	expect(lesson, 'fixture lesson is missing').toBeDefined();
	return render(lesson!.component as Component).body;
}

describe('mdsvex pipeline', () => {
	it('compiles a content file into a renderable component', () => {
		expect(lesson!.component).toBeTruthy();
		expect(html()).toContain('<h2');
	});

	it('auto-imports components used in markdown, with no script block in the file', () => {
		// <Quick>, <Deep>, <Gloss>, <Callout> and <Sources> are used in the
		// fixture without any import — the remark plugin supplies them.
		const body = html();
		expect(body).toContain('The short version');
		expect(body).toContain('Sources &amp; further reading');
	});
});

describe('indexability — every depth layer is in the server HTML', () => {
	it('includes the quick layer', () => {
		expect(html()).toContain('data-depth-layer="quick"');
	});

	/**
	 * Asserts the property rather than a phrase. These two used to check for
	 * specific sentences from the fixture, and rewriting the lesson broke them
	 * — which taught nothing, since the guarantee is about markup, not wording.
	 */
	it('includes the deep layer, which is the most quotable content', () => {
		const body = html();
		expect(body).toContain('data-depth-layer="deep"');

		const deep = body.match(/data-depth-layer="deep"[\s\S]*?<\/aside>/)?.[0] ?? '';
		const text = deep.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ');
		// Substantial prose, not an empty shell or a "read more" affordance.
		expect(text.trim().split(/\s+/).length).toBeGreaterThan(50);
	});

	it('renders deep prose as visible text, not behind an interaction', () => {
		// If this ever needed a click to appear, a crawler would not see it.
		const deep = html().match(/data-depth-layer="deep"[\s\S]*?<\/aside>/)?.[0] ?? '';
		expect(deep, 'no deep layer rendered').toBeTruthy();
		expect(deep).not.toContain('<details');
		expect(deep).not.toMatch(/\shidden(\s|=|>)/);
		expect(deep).not.toContain('<button');
	});

	it('keeps the quick summary visible at every depth, because depth only adds', () => {
		// The golden rule: quick → standard → deep never removes anything. A
		// reader who found the summary useful must not lose it by asking for
		// more detail, so <Quick> carries no hiding utility at all.
		const body = html();
		const quick = body.match(/data-depth-layer="quick" class="([^"]*)"/);
		expect(quick, 'no quick layer rendered').toBeTruthy();

		const hides = quick![1].split(/\s+/).filter((c) => c === 'hidden' || c.endsWith(':hidden'));
		expect(hides, 'quick layer hides at some depth').toEqual([]);
	});

	it('never lets a depth layer hide an ancestor of another layer', () => {
		// This shipped broken: <Prose layer="standard"> hid *itself* in quick
		// mode, and because <Quick> is authored inside the markdown it renders
		// as a child of that container — so choosing "quick" produced an empty
		// page. A container may hide its children selectively; it may not hide
		// itself while containing another layer.
		const body = html();

		const containers = [
			...body.matchAll(/data-depth-layer="(\w+)" class="([^"]*)"([\s\S]*?)(?=data-depth-layer=|$)/g)
		];

		for (const [, name, classes, rest] of containers) {
			const containsAnotherLayer = /data-depth-layer=/.test(rest);
			if (!containsAnotherLayer) continue;
			const hidesItself = classes
				.split(/\s+/)
				.some((c) => /^\[html\[data-depth=\w+\]_&\]:hidden$/.test(c));
			expect(hidesItself, `${name} layer hides itself while wrapping another layer`).toBe(false);
		}
	});

	it('hides depth layers only via an html[data-depth] ancestor, never by default', () => {
		const body = html();

		// Every hiding utility on a depth layer must be scoped to an ancestor
		// attribute. An unconditional `hidden` would mean content invisible to a
		// crawler and to anyone who has never touched the switch.
		const layers = [...body.matchAll(/data-depth-layer="(\w+)" class="([^"]*)"/g)];
		expect(layers.length).toBeGreaterThan(0);

		for (const [, name, classes] of layers) {
			const unscoped = classes
				.split(/\s+/)
				.filter((c) => c === 'hidden' || c.endsWith(':hidden'))
				.filter((c) => !c.startsWith('[html[data-depth='));
			expect(unscoped, `${name} layer hides itself unconditionally`).toEqual([]);
		}
	});
});

describe('Gloss', () => {
	// Definitions arrive through context from `/learn/+layout.server.ts`, so
	// that the content index never reaches the client bundle. Rendered here in
	// isolation there is no context, which exercises the fallback path.
	it('degrades to readable prose outside the /learn layout instead of throwing', () => {
		const body = html();
		// Read as text: Svelte interleaves hydration markers, so the rendered
		// sentence is not one contiguous string in the markup.
		const text = body.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '');

		// De-hyphenated, so a term still reads properly rather than exposing the
		// raw slug. Asserted over every slug the lesson references rather than
		// one sentence, so rewording the prose cannot break it.
		const slugs = (lesson!.frontmatter as { terms?: string[] }).terms ?? [];
		expect(slugs.length).toBeGreaterThan(0);
		for (const slug of slugs.filter((t) => t.includes('-'))) {
			expect(text, `raw slug "${slug}" leaked into visible prose`).not.toContain(slug);
		}
		expect(body).not.toContain('role="tooltip"');
	});

	it('never links a term while rendering without definitions', () => {
		expect(html()).not.toContain('href="/learn/glossary/intentional-community"');
	});

	it("keeps the author's own link text", () => {
		expect(html()).toContain('cohousing');
	});
});

describe('Sources', () => {
	it('renders citations as a real ordered list so they stay extractable', () => {
		const body = html();
		expect(body).toContain('<ol');
		expect(body).toContain('https://www.ic.org/');
	});
});

describe('Quiz — indexability survives one-question-at-a-time', () => {
	const topic = topicBySlug.get('intentional-communities');

	function quizHtml(): string {
		expect(topic, 'fixture topic is missing').toBeDefined();
		return render(topic!.component as Component).body;
	}

	it('renders every question in the server HTML, none hidden', () => {
		// Stepping is applied only after hydration. If a question were hidden
		// server-side, a crawler would see one question out of five.
		const body = quizHtml();
		const fieldsets = [...body.matchAll(/<fieldset([^>]*)>/g)].map((m) => m[1]);

		expect(fieldsets.length).toBeGreaterThan(1);
		for (const attrs of fieldsets) {
			expect(attrs, 'a question is hidden in the server HTML').not.toMatch(/\bhidden\b/);
		}
	});

	it('renders every option as a real input with visible text', () => {
		const body = quizHtml();
		expect((body.match(/type="radio"/g) ?? []).length).toBeGreaterThan(4);
		expect(body).toContain('<legend');
	});

	it('renders every outcome description, so the quiz is worth indexing alone', () => {
		const body = quizHtml();
		expect(body).toContain('What each result means');
		expect(body).toContain('lowest-risk form here');
	});

	it('omits the interactive controls server-side rather than shipping dead buttons', () => {
		const body = quizHtml();
		expect(body).not.toContain('See the result');
		expect(body).not.toContain('>Next<');
	});
});
