import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Bejelentkezés",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "" },
        password: { label: "Jelszó", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) throw new Error("Hibás e-mail cím vagy jelszó");
        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) throw new Error("Hibás e-mail cím vagy jelszó");
        return { id: user.id, email: user.email, name: user.name, hasOnboarded: user.hasOnboarded };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.hasOnboarded = user.hasOnboarded;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.userId = token.userId;
        session.hasOnboarded = token.hasOnboarded;
      }
      return session;
    },
  },
  pages: {
    signIn: "/bejelentkezes"
  },
  debug: false,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
