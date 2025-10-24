import Head from 'next/head';
import { Hero } from '@/components/sections/Hero';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function Home() {
  return (
    <>
      <Head>
        <title>Lead By Example | Breaking the School-to-Prison Pipeline</title>
        <meta
          name="description"
          content="Lead By Example provides mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration. Together, we're building stronger communities through opportunity and empowerment."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://leadbyexample.org/" />
        <meta property="og:title" content="Lead By Example | Breaking the School-to-Prison Pipeline" />
        <meta
          property="og:description"
          content="Lead By Example provides mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration."
        />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://leadbyexample.org/" />
        <meta property="twitter:title" content="Lead By Example | Breaking the School-to-Prison Pipeline" />
        <meta
          property="twitter:description"
          content="Lead By Example provides mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration."
        />
        <meta property="twitter:image" content="/twitter-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <main>
        <Hero title="Lead By Example" />

        {/* Features Section */}
        <section id="features" className="py-24 bg-white dark:bg-neutral-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Windsurf + Cascade Mode Implementation
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Demonstrating our complete component library and design system
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card interactive className="h-full">
                <CardHeader>
                  <CardTitle>🎨 Design System</CardTitle>
                  <CardDescription>
                    Comprehensive design tokens with Tailwind CSS integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• Color scales for all semantic colors</li>
                    <li>• Typography system with proper hierarchy</li>
                    <li>• Spacing and layout utilities</li>
                    <li>• Custom animations and micro-interactions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card interactive className="h-full">
                <CardHeader>
                  <CardTitle>⚡ Performance</CardTitle>
                  <CardDescription>
                    Optimized for speed and accessibility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• Next.js 14 with App Router</li>
                    <li>• TypeScript for type safety</li>
                    <li>• Framer Motion animations</li>
                    <li>• WCAG 2.1 AA compliance ready</li>
                  </ul>
                </CardContent>
              </Card>

              <Card interactive className="h-full">
                <CardHeader>
                  <CardTitle>🔧 Developer Experience</CardTitle>
                  <CardDescription>
                    Modern tooling and best practices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• Zustand state management</li>
                    <li>• Component-driven development</li>
                    <li>• Hot module replacement</li>
                    <li>• Automated code quality</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button variant="primary" size="lg">
                Explore Components
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
