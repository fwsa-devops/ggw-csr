import type { Metadata } from 'next';
import HeroSection from './hero-section';
import FeatureSection from './feature-section';
import Footer from './footer';

export const metadata: Metadata = {
  title: 'Freshworks Global Giving - 2023',
  description: 'CSR initiative by Freshworks',
};

export default async function Home() {
  // const response = await getHomepageContent();
  // const { isBrowser } = useSsr();

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          {/* {!isBrowser && <HomepageViewer body={response.data.body} />} */}
          <HeroSection />
          <FeatureSection />
          <Footer />
        </section>
      </main>
    </>
  );
}

export const revalidate = 30;
