"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function ExploreHeader(props: { cityList: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      search: searchParams.get("search") ?? "",
      city: searchParams.get("city") ?? "",
    },
  });

  const handleSubmit = () => {
    const { search, city } = form.getValues();

    router.push(`?search=${search}&city=${city}`, { scroll: false });
  };

  return (
    <div className="mx-auto mb-20 grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold">Explore</h1>
      <p className="text-lg text-muted-foreground">
        Discover new products and services from our community
      </p>

      <Form {...form}>
        <form onChange={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col lg:flex-row gap-y-1 lg:gap-x-4 items-center">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full lg:w-7/12">
                  <FormLabel />
                  <FormControl>
                    <Input
                      className="text-md p-6 lg:text-lg"
                      placeholder="Search events"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full lg:w-3/12">
                  <FormLabel />
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-md text-muted-foreground p-6 lg:text-lg">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {props.cityList.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full lg:w-1/12 mt-4">
              <Button type="reset" variant={'default'} className="text-md w-full lg:p-6 lg:text-lg" onClick={()=>form.reset()}>
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
