'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FeatureSection() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8  pt-24">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
          This year, we're highlighting
          <br />
        </h2>
        <h2 className="mt-4 pb-2 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900">
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
                height={400}
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
                  related activities, Register here.
                </p>
                <div className="mt-4">
                  <Link
                    href="/activities"
                    className="inline-flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </Link>
                </div>
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
                  {/* Promoting Gender Quality, Empowering Women, Setting up Homes and Hostels for Women and Orphans; Setting up Old Age Homes, Day Care Centres and such other facilities for Senior Citizens and Measures for reducing Inequalities faced by Socially and Economically Backward Groups. Eradicating Hunger, Poverty and Malnutrition, Promoting Health Care including Preventive Health Care and Sanitation. */}
                  We promote gender equality, provide homes for women and
                  orphans, and support the elderly. Our mission includes
                  reducing social and economic inequalities.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  For
                  <span className="mx-1.5 font-bold">Environment</span>
                  related activities, Register here.
                </p>
                <div className="mt-4">
                  <Link
                    href="/activities"
                    className="inline-flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </Link>
                </div>
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
                  Ensuring Environmental Sustainability, Ecological Balance,
                  Protection of flora and fauna, Animal Welfare, Agroforestry,
                  Conservation of Natural Resources and Maintaining quality of
                  soil, air and water.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  For
                  <span className="mx-1.5 font-bold">Environment</span>
                  related activities, Register here.
                </p>
                <div className="mt-4">
                  <Link
                    href="/activities"
                    className="inline-flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
