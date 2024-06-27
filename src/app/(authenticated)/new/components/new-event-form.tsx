/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { type NewEventSchema, newEventSchema } from "./new-event-schema";
import React, { type ChangeEvent } from "react";
import NextImage from "next/image";
import { cn, generate30MinuteIntervals, timezones } from "@/lib/utils";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Globe2,
  ImageUp,
  LoaderCircle,
} from "lucide-react";
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
import EventFormLocation from "./event-form-location";
import { useEdgeStore } from "@/components/layout/providers";
import { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import EventFormDescription from "./event-form-description";
import { DevTool } from "@hookform/devtools";
import { type INewEvent } from "@/server/model";
import * as EventService from "@/server/service/event.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { StatusCodes } from "http-status-codes";

function getGMTOffsetWithTimezoneString(timezone: string) {
  const dateTime = DateTime.now().setZone(timezone);
  const offsetInMinutes = dateTime.offset;
  const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
  const offsetMinutes = Math.abs(offsetInMinutes) % 60;
  const sign = offsetInMinutes >= 0 ? "+" : "-";
  const formattedOffset = `GMT${sign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;
  return `${timezone} (${formattedOffset})`;
}

const timezoneList = timezones().map((timezone) => ({
  label: getGMTOffsetWithTimezoneString(timezone),
  value: timezone,
}));

function calculateEndTimeDiff(start: string, end: string) {
  const startTime = DateTime.fromFormat(start, "hh:mm a");
  const endTime = DateTime.fromFormat(end, "hh:mm a");
  const diff = endTime.diff(startTime, ["hours", "minutes"]);
  const formattedDiff = `${Math.floor(diff.hours)}h ${diff.minutes}m`;
  return formattedDiff.replace(" 0m", "").replace(" 0h", "");
}

export default function NewEventForm() {
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const [uploading, setUploading] = useState<boolean>(false);

  const form = useForm<NewEventSchema>({
    mode: "onChange",
    resolver: zodResolver(newEventSchema),
    defaultValues: {
      start: {
        date: new Date(),
        time: "09:00 AM",
      },
      end: {
        date: new Date(),
        time: "09:30 AM",
      },
      timezone: DateTime.local().zoneName,
    },
  });

  const handleSubmit = async (data: NewEventSchema) => {
    try {
      logger.debug(data);
      const startDate = format(data.start.date, "yyyy-MM-dd");
      const endDate = format(data.end.date, "yyyy-MM-dd");

      const startTime = DateTime.fromFormat(
        `${startDate}T${data.start.time}`,
        "yyyy-MM-dd'T'hh:mm a",
      )
        .setZone(data.timezone)
        .toJSDate();
      const endTime = DateTime.fromFormat(
        `${endDate}T${data.end.time}`,
        "yyyy-MM-dd'T'hh:mm a",
      )
        .setZone(data.timezone)
        .toJSDate();

      const formData: INewEvent = {
        ...data,
        startTime: startTime,
        endTime: endTime,
        location: {
          address: data.location.full_address,
          latitude: data.location.lat,
          longitude: data.location.lng,
        },
      };
      logger.debug(formData);

      // const response = await EventService.create(formData);
      // logger.debug(response);

      // if (response.status !== StatusCodes.CREATED) {
      //   toast.success("Event created successfully");
      //   router.push(`/event/${response.data?.slug}`);
      // }

      // toast.error("Error creating event");
    } catch (error) {
      logger.error(error);
      toast.error("Error creating event");
    }
  };

  const uploadFile = async (_file: File | null | undefined) => {
    logger.debug("uploadFile", { _file });
    if (!_file) return;
    // single file upload
    const res = await edgestore.publicFiles.upload({
      file: _file,
      onProgressChange: (progress) => {
        logger.debug("uploadFile", { progress });
        setUploading(true);
        if (progress === 100) {
          setUploading(false);
        }
      },
    });
    form.setValue("image", res.url);
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
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="ga-8 mx-auto grid w-full max-w-6xl lg:grid-cols-8 lg:gap-14">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="col-span-4 mb-6">
                    <div className="aspect-h-1 aspect-w-1 mb-2 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-4 xl:aspect-w-4">
                      <NextImage
                        loading="lazy"
                        src={
                          field.value ??
                          "https://images.unsplash.com/photo-1634055980590-1a44e5a8b3e4?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt={
                          "Tall slender porcelain bottle with natural clay textured body and cork stopper."
                        }
                        width={"3000"}
                        height={"3000"}
                        className="object-cover object-center group-hover:opacity-75"
                      />

                      <FormItem className="group">
                        <Button
                          asChild
                          type="button"
                          variant={"secondary"}
                          className="h-full w-full bg-transparent opacity-20 group-hover:cursor-pointer group-hover:bg-inherit group-hover:opacity-100"
                        >
                          <FormLabel
                            htmlFor="image"
                            className="h-full w-full text-foreground"
                          >
                            {!uploading ? (
                              <Button variant={"secondary"}>
                                <ImageUp className="h-6 w-6" />
                                <span className="ml-2">Upload Image</span>
                              </Button>
                            ) : (
                              <Button variant={"secondary"}>
                                <LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
                                <span>Uploading...</span>
                              </Button>
                            )}
                          </FormLabel>
                        </Button>
                        <FormControl>
                          <Input
                            className="absolute left-0 top-0 z-0 h-full w-full opacity-0 group-hover:cursor-pointer"
                            accept="image/*"
                            type="file"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              const files = e.target.files;
                              void uploadFile(files?.item(0));
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                    <FormMessage />
                  </div>
                )}
              />
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Event Name" {...field} />
                    </FormControl>
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
                          <PopoverContent className="w-auto p-0" align="start">
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
                            {generate30MinuteIntervals().map((_t: any) => (
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
                          <PopoverContent className="w-auto p-0" align="start">
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
                            {generateEndTimeList().map((_t: any) => (
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
                                <CommandEmpty>No timezone found.</CommandEmpty>
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

              <div>
                <FormLabel className="my-3 block">Location</FormLabel>
                <EventFormLocation />

                {form.watch("location.full_address") && (
                  <>
                    <GoogleMap
                      zoom={15}
                      center={{
                        lat: form.watch("location.lat"),
                        lng: form.watch("location.lng"),
                      }}
                      mapContainerClassName="map-container"
                      options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                      }}
                    >
                      <Marker
                        position={{
                          lat: form.watch("location.lat"),
                          lng: form.watch("location.lng"),
                        }}
                      />
                    </GoogleMap>
                  </>
                )}
              </div>

              <div>
                {/* Description */}
                <FormLabel className="my-3 block">Description</FormLabel>
                <EventFormDescription />
                {/* Form Description Error */}
                {form.formState.errors.description && (
                  <FormMessage className="mt-2">
                    {form.formState.errors.description.message}
                  </FormMessage>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button 
                type="submit"
                 className="col-span-1"
                disabled={form.formState.isSubmitting}
                 >
                  Create Event
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>

      <DevTool control={form.control} />
    </>
  );
}
