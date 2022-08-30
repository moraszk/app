export interface ApiResult {
  success: boolean;
  message: string;
  fields?: { [key: string]: { code: string; message: string; params: string }[] };
}

export const REGISTER_URL = 'https://user.mora.u-szeged.hu/user';
// export const REGISTER_URL = 'http://localhost:8080/user';

export const CONFIRM_URL = 'https://user.mora.u-szeged.hu/user/confirm';

export async function register(json: string): Promise<ApiResult> {
  return fetch(REGISTER_URL, {
    method: 'POST',
    body: json,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => parse(res, { successMessage: 'Ellenőrizd az emailedet' }))
    .catch((err) => {
      console.error(err);
      return { success: false, message: 'Nem sikerült csatlakozni a szerverhez' };
    });
}

export async function confirm(json: string): Promise<ApiResult> {
  return fetch(CONFIRM_URL, {
    method: 'POST',
    body: json,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => parse(res, { successMessage: 'Sikeres regisztráció' }))
    .catch((err) => {
      console.error(err);
      return { success: false, message: 'Nem sikerült csatlakozni a szerverhez' };
    });
}

async function parse(res: Response, { successMessage = 'Sikeres művelet' }) {
  if (res.ok) {
    return {
      success: true,
      message:
        (res.headers.get('Content-Type') === 'application/json'
          ? (await res.json()).error
          : await res.text()) || successMessage,
    };
  } else {
    if (res.headers.get('content-type') !== 'application/json') {
      return { success: false, message: await res.text() };
    } else {
      let data = await res.json();
      return res.status !== 400 || data.error
        ? { success: false, message: data.error ?? JSON.stringify(data) }
        : {
            success: false,
            message: 'Hibás adatok',
            fields: data,
          };
    }
  }
}
