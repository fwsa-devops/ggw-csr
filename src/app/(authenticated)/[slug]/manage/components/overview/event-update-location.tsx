/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import logger from "@/lib/logger";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { type IEvent } from "@/server/model";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateLocation } from "@/server/service/event.service";
import { StatusCodes } from "http-status-codes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

function extractAddress(
  addressComponents: google.maps.GeocoderAddressComponent[],
) {
  const address = {
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  };

  addressComponents.forEach((component) => {
    if (component.types.includes("premise")) {
      address.name += ` ${component.long_name}`;
    }

    if (component.types.includes("street_number")) {
      address.street += ` ${component.long_name}`;
    }

    if (component.types.includes("sublocality")) {
      address.street += `, ${component.long_name}`;
    }

    if (component.types.includes("route")) {
      address.street += ` ${component.long_name}`;
    }

    if (component.types.includes("locality")) {
      address.city = component.long_name;
    }

    if (component.types.includes("administrative_area_level_1")) {
      address.state = component.long_name;
    }

    if (component.types.includes("country")) {
      address.country = component.long_name;
    }

    if (component.types.includes("postal_code")) {
      address.zip = component.long_name;
    }
  });

  console.log("extractAddress", { address });

  return address;
}

type Props = {
  children: React.ReactNode;
  event: IEvent;
};

export default function EventUpdateLocation(props: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      location: {
        id: props.event.Location.id,
        address: props.event.Location.address ?? "",
        latitude: props.event.Location.latitude,
        longitude: props.event.Location.longitude,
      },
      address: {
        id: props.event.Address.id,
        name: props.event.Address.name ?? "",
        street: props.event.Address.street,
        city: props.event.Address.city,
        state: props.event.Address.state,
        country: props.event.Address.country,
        zipcode: props.event.Address.zipcode,
      },
    },
    resolver: zodResolver(
      z.object({
        location: z.object({
          id: z.string(),
          address: z.string({ required_error: "Location is required" }),
          latitude: z.number(),
          longitude: z.number(),
        }),
        address: z.object({
          id: z.string(),
          name: z.string({ required_error: "Name is required" }),
          street: z.string({ required_error: "Street is required" }),
          city: z.string({ required_error: "City is required" }),
          state: z.string({ required_error: "State is required" }),
          country: z.string({ required_error: "Country is required" }),
          zipcode: z.string({ required_error: "Zipcode is required" }),
        }),
      }),
    ),
  });

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleSelect = async (_address: string) => {
    setValue(_address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: _address });
      logger.debug("getGeocode", { results });

      if (!results?.[0]) throw new Error("No results found");

      const { lat, lng } = getLatLng(results[0]);
      logger.debug("getLatLng", { lat, lng });
      setCoordinates({ lat, lng });

      const extractedAddress = extractAddress(results[0].address_components);
      logger.debug("extractedAddress", { extractedAddress });

      form.setValue("location.address", results[0].formatted_address);
      form.setValue("location.latitude", lat);
      form.setValue("location.longitude", lng);
      // form.setValue("address.street", results[0].formatted_address);
      form.setValue("address.name", extractedAddress.name);
      form.setValue("address.street", extractedAddress.street);
      form.setValue("address.city", extractedAddress.city);
      form.setValue("address.state", extractedAddress.state);
      form.setValue("address.country", extractedAddress.country);
      form.setValue("address.zipcode", extractedAddress.zip);
    } catch (error) {
      logger.error(error);
      toast.error("Failed to update location");
    }
  };

  const onSubmit = async () => {
    try {
      const formData = form.getValues();
      logger.debug("formData", { formData });
      const response = await updateLocation(props.event.id, formData);
      if (response.status !== StatusCodes.OK) {
        throw new Error(response.message);
      }

      logger.debug("updateLocation", { response });
      toast.success("Location updated successfully");
      revalidatePath(`/${props.event.slug}`, 'page');
      setOpen(false);
      router.refresh();
    } catch (error) {
      logger.error(error);
      toast.error("Failed to update location");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger onClick={() => setOpen(true)} asChild>
          {props.children}
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] md:max-w-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle className="flex flex-row">Location</DialogTitle>
              </DialogHeader>

              <div>
                <div className="my-4">
                  <FormField
                    control={form.control}
                    name="location.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  autoFocus
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "h-fit w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  <Search className="mr-4 h-5 w-5" />
                                  <span className="w-full overflow-auto truncate text-wrap py-2">
                                    {field.value ?? "Search location"}
                                  </span>
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              {ready && (
                                <Command className="popover-content-width-full">
                                  <CommandInput
                                    value={value}
                                    onValueChange={(e: any) => {
                                      setValue(e);
                                    }}
                                    disabled={!ready}
                                    placeholder="Search location..."
                                  />
                                  {status !== "OK" && (
                                    <CommandEmpty>
                                      Location not found.
                                    </CommandEmpty>
                                  )}
                                  <CommandList>
                                    {status === "OK" &&
                                      data?.map((_location, _i) => (
                                        <CommandItem
                                          value={_location.description}
                                          key={_i}
                                          onSelect={handleSelect}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              _location.description ===
                                                field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {_location.description}
                                        </CommandItem>
                                      ))}
                                  </CommandList>
                                </Command>
                              )}
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch("location.address") && (
                  <>
                    <FormLabel>Map</FormLabel>
                    <GoogleMap
                      zoom={15}
                      center={{
                        lat: form.watch("location.latitude"),
                        lng: form.watch("location.longitude"),
                      }}
                      mapContainerClassName="map-container"
                      options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                      }}
                    >
                      <Marker
                        position={{
                          lat: form.watch("location.latitude"),
                          lng: form.watch("location.longitude"),
                        }}
                      />
                    </GoogleMap>
                  </>
                )}

                {form.watch("location.address") && (
                  <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="address.name"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Door number, Floor, building name, etc."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          {/* <FormLabel>Street</FormLabel> */}
                          <FormControl>
                            <Input {...field} placeholder="Street" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="City" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="State" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Country" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.zipcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Zip Code" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              <DialogFooter className="mt-5">
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" variant="default">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
