import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const hasLocalStorage = browser && 'localStorage' in window;

export type Theme = 'light' | 'dark';
let DEFAULT_THEME: Theme = 'light';
let DEFAULT_AMOLED = false;
if (browser) {
  if (hasLocalStorage && window.localStorage.getItem('theme')) {
    DEFAULT_THEME = window.localStorage.getItem('theme') as Theme;
  } else if ('matchMedia' in window) {
    if (window.matchMedia('(prefers-color-scheme: dark').matches) DEFAULT_THEME = 'dark';
  }

  if (hasLocalStorage && window.localStorage.getItem('amoled')) {
    DEFAULT_AMOLED = window.localStorage.getItem('amoled') == '1';
  }
}

export const theme = writable<Theme>(DEFAULT_THEME);
export const amoled = writable<boolean>(DEFAULT_AMOLED);

if (browser) {
  if (hasLocalStorage) {
    // keep localStorage up-to-date
    theme.subscribe((x) => window.localStorage.setItem('theme', x));
    amoled.subscribe((x) => window.localStorage.setItem('amoled', x ? '1' : '0'));
  }

  // sync theme between open windows
  window.addEventListener('storage', (e) => e.key === 'theme' && theme.set(e.newValue as Theme));
  window.addEventListener('storage', (e) => e.key === 'amoled' && amoled.set(e.newValue == '1'));

  // watch for preference change
  // to make the app more native
  ['dark', 'light'].forEach((mode) => {
    'matchMedia' in window &&
      window.matchMedia(`(prefers-color-scheme: ${mode})`).addEventListener(
        'change',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ target }) => target && (target as any).matches && theme.set(mode as Theme)
      );
  });
}

export default theme;
