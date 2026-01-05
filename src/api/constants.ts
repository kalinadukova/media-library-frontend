const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log(`API URL: ${BASE_URL}`);

const REGISTER = "users/register";
const LOGIN = "users/login";

const ASSETS = "assets";
const SHARE = "/share";

export const REGISTER_URL = BASE_URL + REGISTER;
export const LOGIN_URL = BASE_URL + LOGIN;

export const ASSETS_URL = BASE_URL + ASSETS;
export const SHARE_URL = BASE_URL + ASSETS + SHARE;
