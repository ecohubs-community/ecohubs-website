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
	it('pulls the definition from the index rather than the prose', () => {
		expect(html()).toContain('chosen to live together');
	});

	it('does not link a term whose page is still a draft', () => {
		expect(html()).not.toContain('href="/learn/glossary/intentional-community"');
	});

	it('renders custom link text when given', () => {
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
