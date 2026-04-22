import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        orgSlug: { label: "Organization", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.orgSlug) return null;

        // Placeholder authorize flow for scaffold; connect to db query in full implementation.
        return {
          id: "demo-user-id",
          email: String(credentials.email),
          name: "Demo User",
          role: "admin",
          orgId: "demo-org-id",
          orgSlug: String(credentials.orgSlug),
        };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
});
