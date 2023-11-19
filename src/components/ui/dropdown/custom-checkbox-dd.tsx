'use client';

import * as React from 'react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown/dropdown-menu';
import { groupBy } from '@/lib/utils';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export function DropdownMenuCheckboxesWListGroup(props) {
  const {
    onChange,
    items,
    label,
    title,
    disabled,
    className,
    groupItems = false,
  } = props;

  const checkedItems = items.filter((item) => item.checked);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`text-left ${className}`}
          disabled={disabled}
        >
          {checkedItems.length > 0
            ? checkedItems.map((checked) => checked.name).join(', ')
            : title}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        {groupItems === true &&
          Object.entries(groupBy(items, 'group')).map(
            ([group, _items], idx) => (
              <>
                {idx !== 0 && <DropdownMenuSeparator className="mt-0" />}
                <DropdownMenuLabel>{group}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(_items as any[]).map((item, idx) => (
                  <>
                    <DropdownMenuCheckboxItem
                      key={idx}
                      checked={item.checked}
                      onCheckedChange={(value) => {
                        onChange(item, value);
                      }}
                      className="cursor-pointer"
                    >
                      {item.name}
                    </DropdownMenuCheckboxItem>
                  </>
                ))}
              </>
            ),
          )}

        {groupItems === false &&
          (items || []).map((item, idx) => (
            <>
              <DropdownMenuCheckboxItem
                key={idx}
                checked={item.checked}
                onCheckedChange={(value) => {
                  onChange(item, value);
                }}
                className="cursor-pointer"
              >
                {item.name}
              </DropdownMenuCheckboxItem>
            </>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
