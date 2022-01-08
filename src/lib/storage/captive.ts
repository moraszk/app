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
  }
});

let timeout: NodeJS.Timer;

export async function check() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    status.set({});
    statusBan.set({});
  }, 2000);
  Promise.all(
    [
      { url: 'https://captiveportal.mora.u-szeged.hu/debuginfo.txt', storage: status },
      { url: 'https://status.mora.u-szeged.hu/userban-app', storage: statusBan },
    ].map(({ url, storage }) =>
      fetch(url)
        .then((x) => x.json())
        .then((x) => storage.set(x))
        .catch((err) => {
          console.error(err);
          storage.set({});
        })
    )
  ).finally(() => clearTimeout(timeout));
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
