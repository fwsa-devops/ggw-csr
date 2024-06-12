"use client";

import {
  Form,
  FormControl,
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

type ExploreHeaderProps = {
  cityList: string[];
  searchParams: {
    search: string;
    city: string;
  };
};

export default function ExploreHeader(props: ExploreHeaderProps) {
  const router = useRouter();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      search: props.searchParams.search ?? "",
      city: props.searchParams.city ?? "",
    },
  });

  const handleSubmit = () => {
    const { search, city } = form.getValues();
    router.push(`?search=${search}&city=${city}`, { scroll: false });
  };

  const handleReset = () => {
    router.push("/", { scroll: false });
  };

  return (
    <div className="mx-auto mb-10 grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold">Explore</h1>
      <p className="text-lg text-muted-foreground">
        Discover new events and activities from our community
      </p>

      <Form {...form}>
        <form onChange={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col items-center gap-y-1 lg:flex-row lg:gap-x-4">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full lg:w-7/12">
                  <FormLabel />
                  <FormControl>
                    <Input
                      className=""
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
                        <SelectTrigger className="text-muted-foreground">
                          <SelectValue placeholder="Select City" />
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

            <div className="mt-2 w-full lg:w-1/12">
              <Button
                type="reset"
                variant={"default"}
                className="w-full"
                size={"sm"}
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
