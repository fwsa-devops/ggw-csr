'use client';

import { Combobox, Transition } from '@headlessui/react';
import React, { Fragment, forwardRef, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

const ComboBox = forwardRef((props: any, ref) => {
  const [query, setQuery] = useState('');

  const filteredItems =
    query === ''
      ? props.items
      : props.items.filter((item) => {
          if (typeof item === 'string')
            return item.toLowerCase().includes(query.toLowerCase());
          else return item.name.toLowerCase().includes(query.toLowerCase());
        });

  const selected = () => {
    if (!props.value) return;

    if (typeof props.value === 'string') return props.value;
    else
      return props.value
        .map(
          (option) =>
            props.items.find((_item) => {
              if (typeof _item === 'string') return _item === option;
              else return _item?.id === option || _item?.id === option?.tag_id;
            }).name,
        )
        .join(', ');
  };

  return (
    <>
      <Combobox
        value={props.value}
        onChange={props.onChange}
        multiple={props.multiple}
      >
        <div className="relative">
          <Combobox.Input
            className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={selected}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItems.map((item) => (
                <Combobox.Option
                  key={item.id ?? item.name ?? item}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item.id ?? item.name ?? item}
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.name ?? item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  );
});
export default ComboBox;
