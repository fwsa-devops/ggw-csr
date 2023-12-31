'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useBoolean } from 'usehooks-ts';
import { usePathname } from 'next/navigation';
import { UserNav } from '@/components/user-nav';

const navigations = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Homepage', href: '/admin/homepage' },
  { name: 'Activities', href: '/admin/activities' },
  { name: 'Testimonials', href: '/admin/testimonies' },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const { value, toggle } = useBoolean(false);

  const isActivePath = (path: string) => {
    return (
      pathname?.split('/')[0].toLocaleLowerCase() === path.toLocaleLowerCase()
    );
  };

  return (
    <>
      <Collapsible>
        <>
          <div className="mx-auto max-w-7xl px-2 relative">
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
                <div className="flex flex-shrink-0 items-center text-2xl font-bold">
                  <Link href={'/'}>Global Giving Week</Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigations.map((nav) => (
                    <Link
                      key={nav.name}
                      href={nav.href}
                      className={cn(
                        'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900',
                        isActivePath(nav.href)
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500  hover:text-gray-700',
                      )}
                    >
                      {nav.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <UserNav activitiesJoined={[]} />
              </div>
            </div>
          </div>

          <CollapsibleContent className="sm:hidden relative">
            <nav className="absolute right-0 z-10 w-screen origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {navigations.map((nav) => (
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
