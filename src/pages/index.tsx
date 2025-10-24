import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Lead By Example - Making a Difference</title>
        <meta name="description" content="Lead By Example - A premium call to action website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Welcome to Lead By Example
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              TRAE Solo Mode - Phase 1 Complete
            </p>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Project Initialization Successful
              </h2>
              <p className="text-slate-600">
                The development environment is now ready for Phase 2: Design System Implementation
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}