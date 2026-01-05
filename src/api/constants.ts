const BASE_URL = "http://localhost:8080/api/v1/";

console.log(`API URL: ${BASE_URL}`);

const REGISTER = "users/register";
const LOGIN = "users/login";

const ASSETS = "assets";
const SHARE = "/share";

export const REGISTER_URL = BASE_URL + REGISTER;
export const LOGIN_URL = BASE_URL + LOGIN;

export const ASSETS_URL = BASE_URL + ASSETS;
export const SHARE_URL = BASE_URL + ASSETS + SHARE;
