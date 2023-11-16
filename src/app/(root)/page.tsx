
import type { Metadata } from 'next';
import HeroSection from './components/hero-section';
import FeatureSection from './components/feature-section';
import PageQuotes from './components/quotes';

export const metadata: Metadata = {
  title: 'GGW India - 2023',
  description: 'Social Impact by Freshworks',
};

export default async function Home() {
  // const response = await getHomepageContent();
  // const { isBrowser } = useSsr();

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen bg-white">
        <section className="w-full text-gray-600 body-font">
          {/* {!isBrowser && <HomepageViewer body={response.data.body} />} */}
          <HeroSection />
          <FeatureSection />
          <PageQuotes />
        </section>
      </main>
    </>
  );
}

// export const revalidate = 30;
