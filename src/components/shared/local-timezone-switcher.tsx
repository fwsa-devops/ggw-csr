"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import useDateTimeStore from "../hooks/use-date-time-store";
import { getGMTOffsetWithTimezoneString, timezones } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

export function TimeZoneSwitcher(props: Props) {
  const [open, setOpen] = React.useState(false);

  const { timezone, setTimeZone } = useDateTimeStore();
  const timezoneList = timezones().map((timezone) => ({
    label: getGMTOffsetWithTimezoneString(timezone),
    value: timezone,
  }));

  const handleSelect = (_value: string) => {
    setTimeZone(_value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger onClick={() => setOpen(true)} className="cursor-pointer" asChild>
        {props.children}
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command className="w-full">
          <CommandInput placeholder={"Currently: " + timezone} />
          <CommandEmpty>No timezone found.</CommandEmpty>
          <CommandList>
            {timezoneList?.map((_timezone) => (
              <CommandItem
                value={_timezone.value}
                key={_timezone.value}
                onSelect={handleSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    _timezone.value === timezone ? "opacity-100" : "opacity-0",
                  )}
                />
                {_timezone.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
