'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { create } from "@/server/service/event.service";
import { createEventFormSchema } from "@/lib/schema/event.schema";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DateTimePicker } from "@/components/ui/date-time-picker";
import Link from "next/link";


const EventForm = () => {

  const route = useRouter();

  const form = useForm({
    resolver: zodResolver(createEventFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      start_date_time: new Date(),
      end_date_time: new Date(),
      timezone: '',
      capacity: 0,
      visibility: 'PUBLIC',
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (values) => {
    try {
      console.log(values);
      await create(values);
      route.push('/home');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} >

          <div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Name</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start_date_time"
              render={({ field }) => (
                <FormItem suppressHydrationWarning>
                  <Label>Start Date</Label>
                  <DateTimePicker date={(field.value ?? new Date())} setDate={field.onChange} />
                  <FormMessage />
                </FormItem>

              )}
            />

            <FormField
              control={form.control}
              name="end_date_time"
              render={({ field }) => (
                <FormItem>
                  <Label>End Date</Label>
                  <DateTimePicker date={(field.value ?? new Date())} setDate={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <Label> Timezone</Label>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                      <SelectContent className="h-[300px] overflow-auto">
                        <SelectGroup>
                          <SelectLabel>North America</SelectLabel>
                          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                          <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                          <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Europe & Africa</SelectLabel>
                          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="cet">Central European Time (CET)</SelectItem>
                          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                          <SelectItem value="west">
                            Western European Summer Time (WEST)
                          </SelectItem>
                          <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                          <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Asia</SelectLabel>
                          <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                          <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                          <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                          <SelectItem value="ist_indonesia">
                            Indonesia Central Standard Time (WITA)
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Australia & Pacific</SelectLabel>
                          <SelectItem value="awst">
                            Australian Western Standard Time (AWST)
                          </SelectItem>
                          <SelectItem value="acst">
                            Australian Central Standard Time (ACST)
                          </SelectItem>
                          <SelectItem value="aest">
                            Australian Eastern Standard Time (AEST)
                          </SelectItem>
                          <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                          <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>South America</SelectLabel>
                          <SelectItem value="art">Argentina Time (ART)</SelectItem>
                          <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                          <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                          <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <Label>Capacity</Label>
                  <FormControl>
                    <Input
                      type="number" {...field}
                      onChange={event => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <Label>Visibility</Label>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="PUBLIC">Public</SelectItem>
                          <SelectItem value="PRIVATE">Private</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <Button type="submit">Submit</Button>
          <Button type="button" variant={'outline'}>
            <Link href="/home">
              Cancel
            </Link>
          </Button>
        </form>

      </Form>
    </>
  )

}

export default EventForm; 