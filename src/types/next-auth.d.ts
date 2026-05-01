/**
 * NextAuth Type Augmentation
 *
 * Extends NextAuth default types to include custom user properties.
 */

import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    id?: string;
  }
}
