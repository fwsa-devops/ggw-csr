import type { Metadata } from 'next';
import HeroSection from './components/hero-section';
import FeatureSection from './components/feature-section';
import PageQuotes from './components/quotes';

export const metadata: Metadata = {
  title: 'Global Giving Week - 2023',
  description: 'Social Impact by Freshworks',
  openGraph: {
    type: 'website',
    url: 'https://globalgivingweek.com/',
    title: 'Global Giving Week - 2023',
    description: 'Social Impact by Freshworks',
    siteName: 'Global Giving Week - 2023',
    images: [
      {
        url: 'https://iili.io/JxVmRiN.png',
      },
    ],
  },
};

export default async function Home() {
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
