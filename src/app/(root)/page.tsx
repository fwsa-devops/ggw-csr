
import type { Metadata } from 'next';
import HomePage from './components/homepage';


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

export default function Home() {


  return (
    <>
      <HomePage />
    </>
  );
}
