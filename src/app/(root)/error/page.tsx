// create 404 error page using tailwind with error message on the URL

import { Button } from '@/components/ui/button';

export default function ErrorPage() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Access Denied
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            If you are a Freshworks employee, please use your Freshworks email
            to access this page.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="/">
              <Button>Go back home</Button>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
