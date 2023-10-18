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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"
        disabled={disabled}>
          {title}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item, idx) => (
          <DropdownMenuCheckboxItem
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
