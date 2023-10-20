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

type Checked = DropdownMenuCheckboxItemProps['checked'];

export function DropdownMenuCheckboxes(props) {
  const { onChange, items, label, title, disabled } = props;

  const checkedItems = items.filter((item) => item.checked);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          {checkedItems.length > 0
            ? checkedItems.map((checked) => checked.name).join(', ')
            : title}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(items || []).map((item, idx) => (
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
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
