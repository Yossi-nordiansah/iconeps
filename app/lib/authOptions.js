import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const authOptions = {
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
        const user = await prisma.users.findFirst({
          where: { email: credentials.email },
          include: {
            mahasiswa: {
              include: {
                peserta: true,
              },
            },
            admin: true,
          },
        });

        if (!user) throw new Error("EMAIL_NOT_FOUND");

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) throw new Error("INVALID_PASSWORD");

        let nama = "Unknown";
        let statusPeserta = null;

        if (
          user.role === "super_admin" ||
          user.role === "admin_puskom" ||
          user.role === "admin_pusbas"
        ) {
          nama = user.admin?.[0]?.nama || user.nama || "Unknown";
        } else {
          nama = user.mahasiswa?.nama || user.nama || "Unknown";
          statusPeserta = user.mahasiswa?.peserta?.[0]?.status || null;
        }

        return {
          id: user.id,
          name: nama,
          role: user.role,
          statusPeserta,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const accessToken = jwt.sign(user, refreshTokenSecret, { expiresIn: "15m" });
        const refreshToken = jwt.sign(user, refreshTokenSecret, { expiresIn: "1d" });

        return {
          ...token,
          id: user.id,
          name: user.name,
          role: user.role,
          accessToken,
          refreshToken,
          statusPeserta: user.statusPeserta,
          accessTokenExpires: Date.now() + 15 * 60 * 1000,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) return token;

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        role: token.role,
        statusPeserta: token.statusPeserta,
      };
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};
