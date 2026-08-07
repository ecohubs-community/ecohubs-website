/**
 * The Learning Hub page shell.
 *
 * Sixteen routes were repeating the same container class, which is how the hub
 * drifted 80px wider than the site header. It now matches the navbar exactly —
 * `max-w-7xl` with the same responsive padding — so the rail's left edge lines
 * up with the logo and the content's right edge with the "Become a Member"
 * button.
 */
export const LEARN_SHELL =
	'mx-auto grid max-w-7xl gap-14 px-4 pt-8 pb-20 sm:px-6 md:pb-28 ' +
	'lg:grid-cols-[248px_minmax(0,1fr)] lg:px-8';
