import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { timingSafeEqual } from "crypto";

import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

type AdminRole = "admin" | "editor";

function safeEqual(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  if (valueBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(valueBuffer, expectedBuffer);
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Admin password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminPassword = process.env.ADMIN_PASSWORD ?? "";
        const provided = credentials?.password ?? "";
        if (!adminPassword) return null;
        if (!safeEqual(provided, adminPassword)) return null;

        return {
          id: "admin",
          name: "Admin",
          email: "admin@local",
          role: "admin" satisfies AdminRole,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      return isAdminEmail(user.email);
    },
    async jwt({ token, user, account }) {
      if (user) {
        const email = user.email ?? null;
        const role: AdminRole =
          (user as { role?: AdminRole }).role ??
          (account?.provider === "credentials"
            ? "admin"
            : isAdminEmail(email)
              ? "admin"
              : "editor");
        token.role = role;
      }
      return token;
    },
    async session({ session, token }) {
      const role = token.role as AdminRole | undefined;
      return {
        ...session,
        user: {
          ...session.user,
          role,
          isAdmin: role === "admin",
        },
      };
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};
