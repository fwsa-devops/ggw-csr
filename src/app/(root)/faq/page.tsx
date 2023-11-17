'use client';

import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from 'lucide-react';
// import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

export default function FAQ() {
  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:py-32 lg:px-8 lg:pb-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently Asked Questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            <Disclosure as="div" key={'1'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        What is Global Giving Week (GGW)?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">
                      It is a celebration of the spirit of employee volunteerism
                      by Freshworks offices across the globe. We aim to
                      facilitate avenues for giving towards various social
                      causes under the three themes of:
                      <ol>
                        <li>Environment</li>
                        <li>Education</li>
                        <li>Community</li>
                      </ol>
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'2'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        Why do I only see Chennai and Bangalore office locations
                        in India?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">
                      Owing to logistical constraints and the interests received
                      in the social impact pulse survey, we are only looking to
                      organise it in Chennai and Bangalore this time around
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'3'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        Are employees allowed to propose their own activities?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">
                      As this is our very first edition of GGW, employees DO NOT
                      have the provision to propose their own activities owing
                      to operational difficulities. We will be scoping the
                      possibilities for this in the upcoming years{' '}
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'4'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        How do I register for an event?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">
                      <ol>
                        <li>1. Go to the 'Activities' tab</li>
                        <li>
                          2. Once in, you will find a list of activities that
                          can be filtered by 'Location', 'Theme' and 'Date'.
                          Apply a filter of your choice to go to your preferred
                          activity
                        </li>
                        <li>
                          3. Each activity consists of key information such a
                          duration, location, minimum and maximum number of
                          participants per event
                        </li>
                        <li>
                          4. Simply click on 'Join this event' button against an
                          event to join the event
                        </li>
                        <li>
                          5. Upon joining an event, you will be presented with a
                          message on top right corner of the screen confirming
                          your successful registration with an event
                        </li>
                        <li>
                          6. Information regarding the exact location and
                          logistics will be shared closer to the event date via
                          email
                        </li>
                      </ol>
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'5'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        Why is the 'join this event' button disabled for me?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">
                      As employees can only join 1 event, if you have already
                      joined one, the 'Join this event' button gets
                      automatically disabled for other events. Please unjoin the
                      currently registered activity by following the link
                      displayed to be able to join a new one
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'7'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        Can employees bring families or any external members to
                        participate in GGW activities?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">
                      No, this edition of GGW is exclusive to Freshworks
                      employees only
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'8'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        Can an employee sign up for more than 1 activity?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">
                      In this edition of GGW, employees are allowed to sign up
                      for only 1 activity of their preference from the list
                      provided
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'9'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        What do the minimum and maximum participation counts
                        imply?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600 mb-2">
                      In order for an event to be considered for execution, we
                      will need a minimum strength to feasibily opertionalise
                      it. In case the event you have registered with, does not
                      hit the minimum count, you will be intimated about this 72
                      hours in prior. You may choose an alternate event in which
                      we will try our best to accomodate you.
                    </p>
                    <p className="text-base leading-7 text-gray-600">
                      Similarly, in case an event has reached maximum
                      participant count, we will not be able to make exceptions
                      for participation. You may have to choose your second
                      preference
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'10'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        How do employee volunteers commute to the event
                        location?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600 mb-2">
                      Employees who have registered with us for outdoor
                      activities will be provided with Freshworks transportation
                      which will ply to and from our respective offices at
                      pre-decided times.
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'11'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        Can employee volunteers use their own transport for
                        commute to the event location and get the transport cost
                        reimbursed?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600 mb-2">
                      No, there is no option for transport cost reimbursement
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'12'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        Is there an option to make monetary donations to causes
                        in GGW?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600 mb-2">
                      This option is not available for India employees. For NA,
                      please check with your regional SPOC
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'13'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        Are there any specific activities for members of the
                        night shift?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600 mb-2">
                      Unfortunately no, this is not supported in this edition of
                      GGW
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'14'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        Are there any virtual opportunities available as part of
                        GGW?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600 mb-2">
                      This option is not available for India employees. For NA,
                      please check with your regional SPOC
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'15'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        Are there in-office activities available?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600 mb-2">
                      Yes, options for both in-office and outdoor activities are
                      available
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'16'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        How do apply for a GGW time off with my manager?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600 mb-2">
                      Please write an email to your manager indicating the
                      activity you are going to be participating in. Your
                      manager will be sent a report (if required) on your
                      participation upon activity completion from our end.
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'17'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        I missed the deadline for registration, can I be
                        accomodated on the spot?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600 mb-2">
                      We will not be able accomodate on the spot registrations.
                      This is to ensure we are able to provide the best
                      experience for registered participants
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" key={'18'} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">
                        Will we receive any certificate for volunteering?
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            size={18}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600 mb-2">
                      Yes, participants will receive a digital certificate for
                      volunteering as an appreciation of your time and effort
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </dl>
        </div>
      </div>
    </div>
  );
}
