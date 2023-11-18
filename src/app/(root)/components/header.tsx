'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { UserNav } from '@/components/user-nav';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useBoolean } from 'usehooks-ts';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navigations = [
  { name: 'Activities', href: '/activities', show: true },
  { name: 'Testimonials', href: '/testimonies', show: false },
  { name: 'FAQs', href: '/faq', show: true },
];

export default function HeaderComp({ activitiesJoined }) {
  const pathname = usePathname();
  const { value, toggle } = useBoolean(false);

  const isActivePath = (_path: string) => {
    if (pathname === '/') return false;

    const currentPath = pathname
      .split('/')
      .filter((x) => `${x}` !== '')[0]
      .toLocaleLowerCase();
    const path = (_path ?? '/').replace('/', '').toLocaleLowerCase();
    const boo = currentPath === path;

    return boo;
  };

  return (
    <>
      <Collapsible>
        <>
          <div className="w-screen bg-white relative z-10">
            <div className="max-w-full px-6 sticky top-0 z-50 bg-white">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ml-2">
                  <CollapsibleTrigger
                    onClick={toggle}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {value ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </CollapsibleTrigger>
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start mr-10">
                  <div className="flex flex-shrink-0 items-center md:text-2xl text-xl font-bold">
                    <Link href={'/'}>
                      {/* <img src="https://dam.freshworks.com/m/1d230ee78c07681a/original/headerLogoLight.webp" width={'140px'} /> */}
                      <Image
                        src="/headerLogoLight.webp"
                        alt="freshworks_logo"
                        width={'150'}
                        height={'30'}
                      />
                    </Link>
                  </div>

                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8 md:space-x-0">
                    {navigations
                      .filter((nav) => nav.show)
                      .map((nav) => (
                        <Link
                          key={nav.name}
                          href={nav.href}
                          className={cn(
                            'inline-flex items-center pt-1 text-md font-medium text-gray-900 px-4 mx-2',
                            isActivePath(nav.href)
                              ? 'border-black font-semibold text-black  border-t-4 pt-0'
                              : 'border-transparent text-gray-500 hover:text-gray-700 ',
                          )}
                        >
                          {nav.name}
                        </Link>
                      ))}
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <UserNav activitiesJoined={activitiesJoined} />
                </div>
              </div>
            </div>
          </div>

          <CollapsibleContent className="sm:hidden relative">
            <nav className="absolute right-0 z-10 w-screen origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {navigations
                .filter((nav) => nav.show)
                .map((nav) => (
                  <Link
                    key={nav.name}
                    href={nav.href}
                    className={cn(
                      'block px-4 py-3 text-sm text-gray-700 font-medium',
                      isActivePath(nav.href) ? 'bg-gray-100' : '',
                    )}
                  >
                    {nav.name}
                  </Link>
                ))}
            </nav>
          </CollapsibleContent>
        </>
      </Collapsible>
    </>
  );
}
