const CAPTIVEPORTAL = 'https://captiveportal.mora.u-szeged.hu';

export const CAPTIVEPORTAL_LOGIN_FORM_URL = `${CAPTIVEPORTAL}/login`;
export const CAPTIVEPORTAL_LOGIN_FALLBACK_URL = `${CAPTIVEPORTAL}/login?redirect=no`;
export const CAPTIVEPORTAL_LOGIN_API_URL = `${CAPTIVEPORTAL}/api/login`;
export const CAPTIVEPORTAL_LOGOUT_URL = `${CAPTIVEPORTAL}/logout?redirect=app`;
export const CAPTIVEPORTAL_EREASE_URL = `${CAPTIVEPORTAL_LOGOUT_URL}&erase-cookie=on`;
export const CAPTIVEPORTAL_STATUS_PAGE_URL = `${CAPTIVEPORTAL}/status`;
export const USER_API_URL = `${CAPTIVEPORTAL}/api/status-next.txt`;
export const BAN_API_URL = 'https://status.mora.u-szeged.hu/userban-app';
