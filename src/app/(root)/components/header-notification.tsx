'use client';

import { XMarkIcon } from '@heroicons/react/20/solid'
import { set } from 'date-fns';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react';

export default function HeaderNotification() {

  const pathname = usePathname()
  console.log(pathname);

  if (pathname !== '/')
    return (<></>)

  const [show, setShow] = useState(true);

  return (
    <>
      {show && (<div className="flex items-center gap-x-6 px-6 py-4 sm:px-3.5 sm:before:flex-1 text-base"
        style={{ backgroundColor: 'darkblue' }}>
        <p className="text-sm leading-6 text-white">
          <Link href="/activities">
            <strong className="font-semibold mr-2">Hurry Up!</strong>
            Sign up for your favorite causes before seats get filled. Last date to register: 30 November, 2023 &nbsp;<span aria-hidden="true">&rarr;</span>
          </Link>
        </p>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            onClick={() => setShow(false)}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>)}
    </>
  )
}
