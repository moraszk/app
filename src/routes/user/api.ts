export interface ApiResult {
  success: boolean;
  message: string;
  fields?: { [key: string]: { code: string; message: string; params: string }[] };
}

export const REGISTER_URL = 'https://app.mora.u-szeged.hu/api/user';
export async function register(json: string): Promise<ApiResult> {
  return fetch(REGISTER_URL, {
    method: 'PUT',
    body: json,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) =>
      parse(res, {
        successMessage: 'Sikeresen regisztráltál a félévre!',
      })
    )
    .catch(
      (err) => (
        console.error(err),
        {
          success: false,
          message: 'Nem sikerült csatlakozni a szerverhez',
        }
      )
    );
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
