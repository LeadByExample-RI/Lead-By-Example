import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DonationSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Thank You — Lead By Example</title>
        <meta name="description" content="Thank you for your donation to Lead By Example." />
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#4B306A] to-[#421B5A] px-4 text-center">
        <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-xl">
          {/* Checkmark */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 ring-4 ring-green-400/40">
            <svg
              className="h-10 w-10 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="mb-3 text-3xl font-bold text-white">Thank You!</h1>
          <p className="mb-2 text-lg text-white/80">Your donation was received.</p>
          <p className="mb-8 text-sm text-white/60">
            A receipt has been sent to your email address. Your generosity helps us provide
            mentorship, education, and support to at-risk youth in our community.
          </p>

          <div className="mb-8 rounded-xl border border-[#FFD700]/30 bg-[#FFD700]/10 px-6 py-4">
            <p className="text-sm font-medium text-[#FFD700]">
              Lead By Example is a registered 501(c)(3) nonprofit.
              <br />
              Your donation is tax-deductible to the extent allowed by law.
            </p>
          </div>

          <Link
            href="/"
            className="inline-block rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5C100] px-8 py-3 font-bold text-[#4B306A] shadow-lg transition-transform hover:scale-105"
          >
            Return Home
          </Link>

          <p className="mt-6 text-xs text-white/40">
            Redirecting to home in {countdown} second{countdown !== 1 ? 's' : ''}…
          </p>
        </div>
      </div>
    </>
  );
}
