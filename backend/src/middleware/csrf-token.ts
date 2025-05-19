import { doubleCsrf } from "csrf-csrf";

export const {
  generateCsrfToken, // Use this in your routes to provide a CSRF token.
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret: () => "return some cryptographically pseudorandom secret here",
  getSessionIdentifier: (req) => req.cookies.token, // return the requests unique identifier
  cookieName: "Host-me-x-csrf-token",
});
