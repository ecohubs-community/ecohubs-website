import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'ecohubs-theme';

export function getStoredTheme(): Theme | null {
	if (!browser) return null;
	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	if (stored === 'light' || stored === 'dark' || stored === 'system') {
		return stored;
	}
	return null;
}

export function setStoredTheme(theme: Theme): void {
	if (!browser) return;
	localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function getSystemTheme(): 'light' | 'dark' {
	if (!browser) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getEffectiveTheme(theme: Theme): 'light' | 'dark' {
	if (theme === 'system') {
		return getSystemTheme();
	}
	return theme;
}

export function applyTheme(theme: 'light' | 'dark'): void {
	if (!browser) return;
	document.documentElement.classList.remove('light', 'dark');
	document.documentElement.classList.add(theme);
	document.documentElement.style.colorScheme = theme;
}




