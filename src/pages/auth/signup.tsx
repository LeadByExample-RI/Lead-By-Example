'use client';

/**
 * Sign-Up Page
 *
 * User registration page with email/password sign-up.
 */

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const signUpSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Call sign-up API or use NextAuth
      const result = await signIn('credentials', {
        name: data.name,
        email: data.email,
        password: data.password,
        isSignUp: 'true',
        redirect: false,
      });

      if (result?.error) {
        setServerError(result.error);
      } else if (result?.ok) {
        // Redirect to dashboard or onboarding
        router.push('/');
      }
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Join Us
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Create your Lead By Example account to make an impact
          </p>
        </div>

        {/* Error Message */}
        {serverError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">{serverError}</p>
          </div>
        )}

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register('name')}
              aria-invalid={!!errors.name}
              className="mt-1"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              aria-invalid={!!errors.email}
              className="mt-1"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              aria-invalid={!!errors.password}
              className="mt-1"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
            )}
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              At least 8 characters recommended
            </p>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              aria-invalid={!!errors.confirmPassword}
              className="mt-1"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-slate-900 transition-colors hover:text-slate-700 dark:text-slate-200 dark:hover:text-slate-100"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Privacy & Terms */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          By signing up, you agree to our{' '}
          <Link href="/privacy" className="underline hover:no-underline">
            Privacy Policy
          </Link>
          {' '}and{' '}
          <Link href="/terms" className="underline hover:no-underline">
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
}
