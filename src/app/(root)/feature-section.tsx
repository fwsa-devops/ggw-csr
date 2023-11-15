'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FeatureSection() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8  pt-24">
        <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold tracking-tight mt-3">
          This year, we're highlighting
          <br />
        </h2>
        <h2 className="mt-1 md:mt-3  pb-2 text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900">
          Three Major Themes
        </h2>
      </div>

      <div className="overflow-hidden bg-white pt-10 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start">
            <div className="order-2 lg:order-1">
              <Image
                src="https://iili.io/JBEIbqB.jpg"
                alt="Picture of a group of student looking into a laptop"
                className="rounded-xl shadow-xl ring-1 ring-gray-400/10 object-fill"
                width={600}
                height={360}
                quality={100}
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2 lg:pr-4 lg:pt-4">
              <div className="lg:max-w-lg">
                {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Education
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Unblock the boundless potential of young minds! Make school
                  spaces vibrant for students. Create learning aids for children
                  with special needs. Help young minds become computer literate.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  For
                  <span className="mx-1.5 font-bold">Education</span>
                  related activities, Register{' '}
                  <Link
                    className="underline text-blue-700 font-semibold"
                    href="/activities"
                  >
                    here
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start">
            <div className="lg:pr-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Community
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Every action we take either contributes to the harmony or the
                  degradation of our environment; let's choose wisely for a
                  sustainable and thriving future. Let's clean up our beaches
                  and lakes. Be a ally to our paw friends. Or plant trees.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  For
                  <span className="mx-1.5 font-bold">Environment</span>
                  related activities, Register{' '}
                  <Link
                    className="underline text-blue-700 font-semibold"
                    href="/activities"
                  >
                    here
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="">
              <Image
                src="https://iili.io/JBEll24.jpg"
                alt="Picture of a group of student looking into a laptop"
                className="rounded-xl shadow-xl ring-1 ring-gray-400/10 object-fill"
                width={600}
                height={400}
                quality={100}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start">
            <div className="order-2 lg:order-1">
              <Image
                src="https://iili.io/JBEYWQa.jpg"
                alt="Picture of a group of student looking into a laptop"
                className="rounded-xl shadow-xl ring-1 ring-gray-400/10 object-fill"
                width={600}
                height={400}
                quality={100}
                loading="lazy"
              />
            </div>

            <div className="order-1 lg:order-2 lg:pr-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Environment
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Each act of kindness, every moment of empathy, and the
                  collective pursuit of health weaves a fabric of resilience,
                  strength, and harmony that enriches the entire community. Help
                  build hygiene and basic groceries kits. Interact with the
                  elderly. Do your bit.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  For
                  <span className="mx-1.5 font-bold">Environment</span>
                  related activities, Register{' '}
                  <Link
                    className="underline text-blue-700 font-semibold"
                    href="/activities"
                  >
                    here
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
