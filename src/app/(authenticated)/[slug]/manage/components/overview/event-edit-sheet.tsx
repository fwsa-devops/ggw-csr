"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type IEvent } from "@/server/model";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateTime } from "luxon";
import logger from "@/lib/logger";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  calculateEndTimeDiff,
  cn,
  generate30MinuteIntervals,
  getGMTOffsetWithTimezoneString,
  timezones,
} from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown, Globe2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tiptap from "@/components/shared/tip-tap";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useState } from "react";
import { updateBasic } from "@/server/service/event.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

type Props = {
  children: React.ReactNode;
  event: IEvent;
};

const timezoneList = timezones().map((timezone) => ({
  label: getGMTOffsetWithTimezoneString(timezone),
  value: timezone,
}));

export function EventEditSheet(props: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: props.event.title,
      start: {
        date: props.event.startTime,
        time: DateTime.fromJSDate(props.event.startTime).toFormat("hh:mm a"),
      },
      end: {
        date: props.event.endTime,
        time: DateTime.fromJSDate(props.event.endTime).toFormat("hh:mm a"),
      },
      timezone: props.event.timezone,
      description: props.event.description,
    },
    resolver: zodResolver(
      z.object({
        title: z.string({
          required_error: "Event name is required",
        }),
        start: z.object({
          date: z.date(),
          time: z.string(),
        }),
        end: z.object({
          date: z.date(),
          time: z.string(),
        }),
        timezone: z.string({
          required_error: "Timezone is required",
        }),
        description: z.string({
          required_error: "Event description is required",
        }),
      }),
    ),
  });

  const onSubmit = async () => {
    logger.info("Event Name Dialog submitted");
    logger.debug(form.getValues());
    try {
      logger.info("Event name updated successfully");

      const data = form.getValues();
      const startDate = format(data.start.date, "yyyy-MM-dd");
      const endDate = format(data.end.date, "yyyy-MM-dd");

      const startTime = DateTime.fromFormat(
        `${startDate}T${data.start.time}`,
        "yyyy-MM-dd'T'hh:mm a",
        { zone: data.timezone },
      ).toJSDate();

      const endTime = DateTime.fromFormat(
        `${endDate}T${data.end.time}`,
        "yyyy-MM-dd'T'hh:mm a",
        { zone: data.timezone },
      ).toJSDate();

      const formData = {
        title: data.title,
        description: data.description,
        startTime: startTime,
        endTime: endTime,
        timezone: data.timezone,
      };

      logger.debug(formData);

      const response = await updateBasic(props.event.id, formData);
      logger.debug(response);

      if (response.status !== StatusCodes.OK) throw new Error(response.message);

      if (response.status === StatusCodes.OK) {
        toast.success("Event updated successfully");
        setOpen(false);
        router.refresh();
        return;
      }
    } catch (error) {
      logger.error("Event Name Dialog error", error);
      toast.error("Failed to update event name");
    }
  };

  function generateEndTimeList() {
    const startTime = form.watch("start.time");
    const endTimes = generate30MinuteIntervals(startTime);
    const intervalsWithDiff = endTimes.slice(0, -1).map((endTime) => {
      const diff = calculateEndTimeDiff(startTime, endTime);
      return { label: endTime, value: endTime, disabled: false, diff: diff };
    });
    return intervalsWithDiff;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={true}>
      <SheetTrigger onClick={() => setOpen(true)} asChild>
        {props.children}
      </SheetTrigger>
      <SheetContent className="w-full p-0 sm:max-w-full md:max-w-2xl">
        <ScrollArea className="max-h-screen w-full overflow-auto p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <SheetHeader>
                <SheetTitle>Edit Event</SheetTitle>
                <SheetDescription>
                  Make changes to your event. This will be visible to all
                  attendees.
                </SheetDescription>
              </SheetHeader>

              <section className="my-6 grid gap-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} autoFocus />
                      </FormControl>
                      {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Date & Time</FormLabel>
                  <div className="grid grid-cols-5 gap-2">
                    <FormField
                      control={form.control}
                      name="start.date"
                      render={({ field }) => (
                        <FormItem className="col-span-3 flex flex-col">
                          <FormLabel className="hidden">Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={new Date(field.value)} // Change the type of the selected prop to accept a Date object
                                onSelect={field.onChange}
                                // disabled={(date) =>
                                //   date <= new Date() ||
                                //   date > new Date("2024-12-30")
                                // }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="start.time"
                      render={({ field }) => (
                        <FormItem className="col-span-2 flex flex-col">
                          <FormLabel className="hidden">Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pick a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {generate30MinuteIntervals().map((_t) => (
                                <SelectItem value={_t} key={_t}>
                                  {_t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <FormField
                      control={form.control}
                      name="end.date"
                      render={({ field }) => (
                        <FormItem className="col-span-3 flex flex-col">
                          <FormLabel className="hidden">Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={new Date(field.value)} // Change the type of the selected prop to accept a Date object
                                onSelect={field.onChange}
                                // disabled={(date) =>
                                //   date <= new Date() ||
                                //   date > new Date("2024-12-30")
                                // }
                              />
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="end.time"
                      render={({ field }) => (
                        <FormItem className="col-span-2 flex flex-col">
                          <FormLabel className="hidden">Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pick a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="w-100">
                              {generateEndTimeList().map((_t) => (
                                <SelectItem
                                  disabled={_t.disabled}
                                  value={_t.value}
                                  key={_t.value}
                                >
                                  {_t.label}
                                  <span className="ml-2 text-muted-foreground">
                                    {_t.diff}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="hidden">timezone</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    <Globe2 className="mr-2 h-4 w-4" />
                                    {field.value
                                      ? timezoneList.find(
                                          (timezone) =>
                                            timezone.value === field.value,
                                        )?.label
                                      : "Select Timezone"}
                                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command className="popover-content-width-full">
                                  <CommandInput placeholder="Search timezone..." />
                                  <CommandEmpty>
                                    No timezone found.
                                  </CommandEmpty>
                                  <CommandList>
                                    {timezoneList?.map((timezone) => (
                                      <CommandItem
                                        value={timezone.value}
                                        key={timezone.value}
                                        onSelect={() => {
                                          form.setValue(
                                            "timezone",
                                            timezone.value,
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            timezone.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                        {timezone.label}
                                      </CommandItem>
                                    ))}
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Tiptap
                          value={field.value}
                          onChange={(e) => field.onChange(e.html)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <SheetFooter className="gap-4 md:gap-2">
                <SheetClose asChild>
                  <Button type="reset" variant={"secondary"}>
                    Close
                  </Button>
                </SheetClose>
                <Button type="submit">Save changes</Button>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
