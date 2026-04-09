import NextAuth from "next-auth";

// Define the Quran Foundation OAuth provider
const QuranFoundationProvider = {
  id: "quran-foundation",
  name: "Quran Foundation",
  type: "oauth",
  version: "2.0",
  // The issuer URL allows NextAuth to auto-discover the endpoints from .well-known/openid-configuration
  issuer: "https://prelive-oauth2.quran.foundation",
  authorization: {
    params: {
      scope: "openid profile email",
    },
  },
  clientId: process.env.QURAN_CLIENT_ID,
  clientSecret: process.env.QURAN_CLIENT_SECRET,
  checks: ["pkce", "state"],
  profile(profile: any) {
    return {
      id: profile.sub,
      name: profile.name || profile.preferred_username || "User",
      email: profile.email,
    };
  },
} as any;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [QuranFoundationProvider],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth }) {
      // Require the user to be logged in for all matched routes
      return !!auth;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
