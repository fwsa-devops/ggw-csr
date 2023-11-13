'use client';

import ReactPlayer from 'react-player';

export default function HeroSection() {
  return (
    <div className="fw-bg-gradient">
      <div className="relative isolate pt-0">
        <div className="py-16 sm:py-32 lg:pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl pb-2 fw-gradient">
                Global Giving Week
              </h1>
              <p className="mt-3 text-3xl leading-8 text-white font-semibold">
                Uniting for a Better World
              </p>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div
                  style={{
                    position: 'relative',
                    paddingTop: '56.25%' /* 16:9 Aspect Ratio */,
                  }}
                >
                  <ReactPlayer
                    url="https://youtu.be/91sBp44_hzg"
                    controls={false}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    width="100%"
                    height="100%"
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
