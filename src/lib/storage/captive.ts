import { browser } from '$app/environment';
import { USER_API_URL, BAN_API_URL } from '$lib/config';
import { writable } from 'svelte/store';

const TIMEOUT_IN_MS = 1000;

interface User {
  ip: string;
  'logged-in': 'yes' | 'no';
  mac: string;
  username: string;
  uptime: string;
  registration: boolean;
}

interface Ban {
  'torrent-guys': boolean;
  'many-connections': boolean;
  dns_no_blacklist: boolean;
  ip: string;
}

// update status every x secs, except when not used
// set to zero to disable
export const numSubscribers = writable<number>(0);

export const user = writable<Partial<User>>({});
export const ban = writable<Partial<Ban>>({});

export const loaded = writable<boolean>(false);

/**
 * Save the current status to the store
 */
user.subscribe((x: any = {}) => {
  if (browser && 'localStorage' in window) {
    ['mac', 'ip', 'username'].forEach((key) => x[key] && window.localStorage.setItem(key, x[key]));
  }
});

let userFetchId = 0;
let banFetchId = 0;

function update() {
  let fetch1 = ++userFetchId;
  let fetch2 = ++banFetchId;

  async function fetchApi(url: string) {
    const request = fetch(url);
    const timeout = new Promise((cb) => setTimeout(cb, TIMEOUT_IN_MS));
    try {
      return Promise.race([
        request.then((r) => r.json()),
        timeout.then(() => Promise.reject(new Error('Reached timeout while fetching ' + url))),
      ]);
    } catch (err) {
      console.error(err);
      return {};
    }
  }

  return Promise.all([
    fetchApi(USER_API_URL).then((value) => {
      loaded.set(true);
      if (fetch1 === userFetchId) user.set(value);
    }),
    fetchApi(BAN_API_URL).then((value) => {
      if (fetch2 === banFetchId) ban.set(value);
    }),
  ]);
}

let it: NodeJS.Timer | undefined;
let to: NodeJS.Timeout;

numSubscribers.subscribe((numSubs) => {
  clearInterval(it);
  if (numSubs > 0) {
    update();
    to = setTimeout(() => loaded.set(true), 5000);
    it = setInterval(update, 15000);
  } else {
    user.set({});
    ban.set({});
    loaded.set(false);
    clearTimeout(to);
  }
});
