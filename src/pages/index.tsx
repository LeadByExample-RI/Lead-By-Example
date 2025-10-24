import Head from 'next/head';
import { Hero } from '@/components/sections/Hero';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function Home() {
  return (
    <>
      <Head>
        <title>Lead By Example - Inspiring Change Through Action</title>
        <meta name="description" content="A modern, performant web platform designed to amplify the reach and impact of the Lead By Example initiative" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <Hero
          variant="centered"
          subtitle="Inspiring Change Through Action"
          title="Lead By Example"
          description="A modern, performant web platform designed to amplify the reach and impact of positive change in our communities."
          primaryAction={{
            label: "Get Started",
            href: "#features"
          }}
          secondaryAction={{
            label: "Learn More",
            href: "#about"
          }}
        />

        {/* Features Section */}
        <section id="features" className="py-24 bg-white dark:bg-neutral-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Windsurf + Cascade Mode Implementation
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Level 4 Core Implementation showcasing our component library and design system
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

        {/* Status Section */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">🌊 Cascade Implementation Status</CardTitle>
                <CardDescription className="text-center">
                  Windsurf + Cascade Mode - Level 4 Core Implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-success-600 mb-3">✅ Completed Levels</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Level 1: Strategic Planning & Architecture</li>
                      <li>• Level 2: Detailed Design & Specifications</li>
                      <li>• Level 3: Foundation & Infrastructure Setup</li>
                      <li>• Level 4: Core Implementation (In Progress)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-600 mb-3">🔄 Current Implementation</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• UI Component Library (Button, Input, Card)</li>
                      <li>• Hero Section Component</li>
                      <li>• State Management (Zustand stores)</li>
                      <li>• Animation System (Framer Motion)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}