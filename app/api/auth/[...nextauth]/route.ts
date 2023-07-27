/**
 * Next.js Authentication options and handlers.
 *
 * This module configures the authentication options for a Next.js application using
 * NextAuth. It sets up multiple OAuth providers (GitHub and Google) as well as a
 * credentials-based provider.
 *
 * For the credentials provider, it expects an email and a password, then uses bcrypt
 * to compare the submitted password with the hashed password stored in the database.
 *
 * The `PrismaAdapter` is used for handling the storage of user accounts, sessions,
 * verification requests, etc., in your Prisma-managed database.
 *
 * The `authOptions` are exported for use with the NextAuth API route handlers.
 * Two identical handlers are exported, one for GET requests and one for POST requests.
 *
 * @module next-auth
 */
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // check if credentials is not undefined
        if (!credentials) throw new Error("No credentials");

        if (!credentials.email || !credentials.password)
          throw new Error("Invalid credentials");
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
