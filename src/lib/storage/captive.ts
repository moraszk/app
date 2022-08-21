import { browser } from '$app/env';
import { writable } from 'svelte/store';

const TIMEOUT_IN_MS = 1000;

const API_USER_URL = 'https://captiveportal.mora.u-szeged.hu/api/status-next.txt';
const API_BAN_URL = 'https://status.mora.u-szeged.hu/userban-app';

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
    fetchApi(API_USER_URL).then((value) => fetch1 == userFetchId && user.set(value)),
    fetchApi(API_BAN_URL).then((value) => fetch2 == banFetchId && user.set(value)),
  ]);
}

let it: NodeJS.Timer | undefined;

numSubscribers.subscribe((numSubs) => {
  clearInterval(it);
  if (numSubs > 0) {
    update();
    it = setInterval(update, 15000);
  } else {
    user.set({});
    ban.set({});
  }
});
