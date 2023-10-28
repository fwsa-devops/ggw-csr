import { Listbox, Transition } from '@headlessui/react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import React, { Fragment, forwardRef } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

const MultiSelect = forwardRef((props: any, ref) => {
  const selected = () => {
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
      <Listbox
        value={props.value}
        onChange={props.onChange}
        multiple={props.multiple}
      >
        <div className="relative">
          <Listbox.Button className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
            <span className="block truncate">{selected()}</span>
            <CaretSortIcon className="h-4 w-4 opacity-50" />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.items.map((item) => (
                <Listbox.Option
                  key={item.name ?? item}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item.id ?? item}
                >
                  {({ selected }) => (
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
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
});
export default MultiSelect;
