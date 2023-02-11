const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
import nookies from "nookies";

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  save(acessToken, ctx = null) {
    nookies.set(ctx, ACCESS_TOKEN_KEY, acessToken, {
      maxAge: ONE_YEAR,
      path: "/",
      sameSite: "strict",
    });
  },
  get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY] || "";
  },
  delete(ctx = null) {
    return nookies.destroy(ctx, ACCESS_TOKEN_KEY);
  },
};
