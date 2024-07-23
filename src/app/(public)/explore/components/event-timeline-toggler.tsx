"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
// import { appendParams } from "@/lib/utils";

type Props = {
  searchParams: {
    search: string;
    city: string;
    past: string;
  };
};

export default function EventTimelineToggler(props: Props) {
  const router = useRouter();

  const onChangeHandler = (e: string) => {
    console.log(e);
    console.log(props.searchParams);
    let URI = "/explore?";
    if (props.searchParams.search)
      URI += `search=${props.searchParams.search}&`;
    if (props.searchParams.city) URI += `city=${props.searchParams.city}&`;
    if (props.searchParams.past) URI += `past=${e === "past" ? true : false}`;
    router.push(URI);
  };

  return (
    <Tabs
      defaultValue={props.searchParams.past === 'true' ? "past" : "upcoming"}
      className="w-fit"
      onValueChange={onChangeHandler}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
