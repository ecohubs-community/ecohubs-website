/**
 * No hydration, and no prerendering.
 *
 * `csr = false` is what makes the print pages work at all. Every hub component
 * renders everything on the server and only hides parts of itself after
 * hydration — so with hydration off, a quiz prints as a full question set with
 * its answers, the depth switch prints every layer, and the cost estimator
 * prints its reference table rather than a calculator nobody can use on paper.
 *
 * `prerender = false` keeps these out of the built site. They are inputs to
 * `scripts/build-downloads.mjs`, not pages anyone should land on, and the
 * generated PDFs are what ship.
 */
export const csr = false;
export const prerender = false;
