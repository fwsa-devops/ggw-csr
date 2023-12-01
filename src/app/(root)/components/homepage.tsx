'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import HeroSection from './hero-section';
import FeatureSection from './feature-section';
import PageQuotes from './quotes';
import { useSession } from 'next-auth/react';

const HomePage = () => {
  const [isSticky, setIsSticky] = useState(true);
  const { data } = useSession();

  const handleScroll = () => {
    const parentDiv = document.getElementById('parentDiv') as HTMLElement; // ID of the parent div
    const parentDivBottom = parentDiv.getBoundingClientRect().bottom;

    const scrollPosition = window.scrollY;

    // Check if the bottom of the parent div is above the viewport
    if (scrollPosition >= parentDivBottom) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }
  };

  useEffect(() => {
    // const onWindowLoad = () => {
    window.addEventListener('scroll', handleScroll);
    // };

    // window.onload = onWindowLoad;
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen bg-white">
        <section className="w-full text-gray-600 body-font">
          {/* {!isBrowser && <HomepageViewer body={response.data.body} />} */}
          <HeroSection />
          <FeatureSection />
          <PageQuotes isSticky={isSticky} />
        </section>

        {isSticky && (
          <div className={'m-auto sticky bottom-10 z-50 transition-all'}>
            <Link className="md:hidden" id="absolute-div" href="/activities">
              <Button
                variant={'destructive'}
                className="py-6 px-6 text-base font-semibold rounded-lg shadow-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-primary-dark"
              >
                Sign up for Activities
              </Button>
            </Link>
          </div>
        )}
      </main>
    </>
  );
};

export default HomePage;
