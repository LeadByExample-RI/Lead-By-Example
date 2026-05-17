/**
 * NextAuth Configuration and Initialization
 *
 * Configures authentication for the application using NextAuth.js v5
 * with Prisma adapter for database session management.
 *
 * Exports:
 *   authConfig  — raw config object (for reference)
 *   handlers    — GET/POST handlers wired into /api/auth/[...nextauth]
 *   auth        — session accessor for use in any API route or server component
 *   signIn      — programmatic sign-in helper
 *   signOut     — programmatic sign-out helper
 */

import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';

// Validation schemas
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

/**
 * Hash password using bcryptjs
 */
async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 12);
}

/**
 * Verify password
 */
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword);
}

export const authConfig: NextAuthConfig = {
  // Configure authentication providers
  providers: [
    // Email & Password provider
    Credentials({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        isSignUp: { label: 'Sign Up', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        try {
          if (credentials.isSignUp === 'true') {
            const result = signUpSchema.safeParse({
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
            });

            if (!result.success) {
              throw new Error(result.error.errors[0].message);
            }

            const existingUser = await db.user.findUnique({
              where: { email: result.data.email },
            });

            if (existingUser) {
              throw new Error('Email already registered');
            }

            const hashedPassword = await hashPassword(result.data.password);

            const user = await db.user.create({
              data: {
                name: result.data.name,
                email: result.data.email,
                password: hashedPassword,
              },
            });

            return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role };
          } else {
            const result = signInSchema.safeParse({
              email: credentials.email,
              password: credentials.password,
            });

            if (!result.success) {
              throw new Error(result.error.errors[0].message);
            }

            const user = await db.user.findUnique({
              where: { email: result.data.email },
            });

            if (!user || !user.password) {
              throw new Error('Invalid email or password');
            }

            const passwordMatches = await verifyPassword(result.data.password, user.password);

            if (!passwordMatches) {
              throw new Error('Invalid email or password');
            }

            return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role };
          }
        } catch (error: any) {
          throw new Error(error.message || 'Authentication failed');
        }
      },
    }),
  ],

  // Use Prisma adapter for session management
  adapter: PrismaAdapter(db),

  // Configure session
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 1 day
  },

  // Configure JWT
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Configure pages
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup',
    error: '/auth/error',
  },

  // Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role ?? 'donor';
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  // Events
  events: {
    async signIn() {
      // intentionally silent — avoid writing PII to stdout/server logs
    },
    async signOut() {},
  },

  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',
};

// Initialize NextAuth and export helpers.
// Import { auth } from '@/lib/auth' in any API route to check the session.
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
