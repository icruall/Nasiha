export { auth as middleware } from "@/auth";

export const config = {
  // Matches all routes except api, _next/static, _next/image, favicon.ico, and the auth pages (login/signup)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)"],
};
