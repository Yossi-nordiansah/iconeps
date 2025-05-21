import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // pastikan ini di-import
import { jwtDecode } from "jwt-decode"; // atau hapus jika tidak digunakan

const refreshTokenSecret = process.env.AUTH_SECRET;

async function refreshAccessToken(token) {
  try {
    const decoded = jwt.verify(token.refreshToken, refreshTokenSecret);
    const newAccessToken = jwt.sign(
      { id: decoded.id, name: decoded.name, role: decoded.role },
      refreshTokenSecret,
      { expiresIn: "15m" }
    );

    return {
      ...token,
      accessToken: newAccessToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}

const authOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const users = await prisma.users.findMany({
            where: { email: credentials.email },
            include: { mahasiswa: true },
          });

          if (!users || users.length === 0) {
            throw new Error("EMAIL_NOT_FOUND");
          }

          for (const user of users) {
            const valid = await bcrypt.compare(credentials.password, user.password);
            if (valid) {
              const nama = user.mahasiswa?.nama || user.nama || "Unknown";
              return {
                id: user.id,
                name: nama,
                role: user.role,
              };
            }
          }

          throw new Error("INVALID_PASSWORD");

        } catch (error) {
          console.error("Authorize error:", error.message);
          throw new Error(error.message); // lempar error dengan kode khusus
        }
      }


    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const accessToken = jwt.sign(user, refreshTokenSecret, { expiresIn: "15m" });
        const refreshToken = jwt.sign(user, refreshTokenSecret, { expiresIn: "1d" });

        return {
          ...token,
          accessToken,
          refreshToken,
          accessTokenExpires: Date.now() + 15 * 60 * 1000,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) return token;

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
