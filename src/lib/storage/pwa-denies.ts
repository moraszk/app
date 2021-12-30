/* eslint-disable @typescript-eslint/no-explicit-any */
import { browser } from '$app/env';
import { writable } from 'svelte/store';

const hasLocalStorage = browser && 'localStorage' in window;

let DEFAULT_AMOUNT = 0;
if (hasLocalStorage && window.localStorage.getItem('pwa-denies')) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  DEFAULT_AMOUNT = Number.parseInt(window.localStorage.getItem('pwa-denies')!, 10);
}

export const amount = writable<number>(DEFAULT_AMOUNT);

if (hasLocalStorage) {
  // keep localStorage up-to-date
  amount.subscribe((x) => window.localStorage.setItem('pwa-denies', `${x}`));
}
export function getPWADisplayMode() {
  try {
    const isStandalone =
      'matchMedia' in window && window.matchMedia('(display-mode: standalone)').matches;
    if (document.referrer.startsWith('android-app://')) {
      amount.set(100);
      return 'twa';
    } else if ((navigator as any).standalone || isStandalone) {
      amount.set(100);
      return 'standalone';
    }
    return 'browser';
  } catch (err) {
    console.error(err);
    return 'browser';
  }
}

export default amount;
