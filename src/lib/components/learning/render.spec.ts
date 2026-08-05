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
import { lessonBySlug } from '$lib/learning';

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

	it('includes the deep layer, which is the most quotable content', () => {
		const body = html();
		expect(body).toContain('data-depth-layer="deep"');
		expect(body).toContain('Global Ecovillage Network');
	});

	it('renders deep prose as visible text, not behind an interaction', () => {
		// If this ever needed a click to appear, a crawler would not see it.
		expect(html()).toContain('vary by an order of magnitude');
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

		// De-hyphenated, so the sentence still reads properly rather than
		// exposing the raw slug.
		expect(text).toContain('An intentional community is not defined by');
		expect(text).not.toContain('intentional-community');
		expect(body).not.toContain('role="tooltip"');
	});

	it('never links a term while rendering without definitions', () => {
		expect(html()).not.toContain('href="/learn/glossary/intentional-community"');
	});

	it('keeps the author\'s own link text', () => {
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
