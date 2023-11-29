'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PageQuotes = ({ isSticky }: { isSticky: boolean }) => {

  return (
    <>
      <div className="bg-white mx-auto overflow-hidden px-6 pt-10 lg:pb-16 sm:pb-10 lg:px-8" id='parentDiv'>
        <div className="flex flex-col items-center justify-center">
          {' '}
          {/* Add flexbox utilities here */}
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-5">
            Together, we can create a better world for all
          </h1>
          {!isSticky && <div className={'relative transition-all'} >
            <Link id='absolute-div' href="/activities" >
              <Button
                variant={'default'}
                className="py-6 px-6 text-base font-semibold rounded-lg shadow-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-primary-dark"
              >
                Go to Activities
              </Button>
            </Link>
          </div>}
        </div>
      </div>


    </>

  );
};

export default PageQuotes;
