import { browser } from '$app/env';
import { writable } from 'svelte/store';

interface Status {
  ip: string;
  'logged-in': 'yes' | 'no';
  mac: string;
  username: string;
  uptime: string;
  registration: boolean;
}

interface StatusBan {
  'torrent-guys': boolean;
  'many-connections': boolean;
  dns_no_blacklist: boolean;
  ip: string;
}

// update status every x secs
// set to zero to disable
export const numSubscribers = writable<number>(0);

export const status = writable<Partial<Status>>({});
export const statusBan = writable<Partial<StatusBan>>({});

status.subscribe((x) => {
  if (browser && 'localStorage' in window) {
    x.mac && window.localStorage.setItem('mac', x.mac);
    x.ip && window.localStorage.setItem('ip', x.ip);
    x.username && window.localStorage.setItem('username', x.username);
  }
});

let timeout1: NodeJS.Timer;
let timeout2: NodeJS.Timer;

export async function check() {
  clearTimeout(timeout1);
  clearTimeout(timeout2);

  timeout1 = setTimeout(() => status.set({}), 2000);
  timeout2 = setTimeout(() => statusBan.set({}), 2000);

  fetch('https://captiveportal.mora.u-szeged.hu/api/status-next.txt')
    .then((x) => x.json())
    .then((x) => status.set(x))
    .catch((err) => {
      console.error(err);
      status.set({});
    })
    .finally(() => clearTimeout(timeout1));

  fetch('https://status.mora.u-szeged.hu/userban-app')
    .then((x) => x.json())
    .then((x) => statusBan.set(x))
    .catch((err) => {
      console.error(err);
      statusBan.set({});
    })
    .finally(() => clearTimeout(timeout2));
}

let it: NodeJS.Timer | null;

numSubscribers.subscribe((sb) => {
  it && clearInterval(it);
  if (sb > 0) {
    check();
    it = setInterval(check, 15000);
  } else {
    status.set({});
    statusBan.set({});
  }
});
