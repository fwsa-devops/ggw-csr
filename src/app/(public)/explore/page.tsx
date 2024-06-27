import Image from "next/image";
import logger from "@/lib/logger";
import { Calendar, MapPin, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusCodes } from "http-status-codes";
import ExploreHeader from "./components/explore-header";
import { cityList, eventFilter } from "@/server/service/explore.service";
import { DateTime } from "luxon";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | undefined>;
}) {
  const valueParams = {
    search: searchParams?.search ?? "",
    city: searchParams?.city ?? "",
  };

  const response = await eventFilter({
    search: valueParams.search ?? "",
    city: valueParams.city ?? "",
  });
  const { status, data } = response;
  let products = data;

  if (status !== StatusCodes.OK) {
    logger.error("Failed to fetch events");
    return null;
  }

  if (!data) {
    logger.error("No events found");
    products = [];
  }

  const _cityList = await cityList();

  return (
    <>
      <div>
        <ExploreHeader
          searchParams={valueParams}
          cityList={_cityList.data ?? []}
        />

        <div>
          <div className="mx-auto max-w-6xl lg:max-w-6xl">
            <h2 className="mb-10 text-xl font-semibold">Upcoming Events</h2>
            <div className="grid grid-cols-1 gap-x-10 gap-y-20 p-4 sm:grid-cols-2 md:p-0 lg:grid-cols-3">
              {products?.map((product) => (
                <Link
                  key={product.id}
                  href={`/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-transparent xl:aspect-h-4 xl:aspect-w-4">
                    <Image
                      width={"500"}
                      height={"500"}
                      src={product.image}
                      alt={`Image of ` + product.title}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="text-md mb-3 mt-4 font-medium text-gray-700 dark:text-gray-100">
                    {product.title}
                  </h3>

                  <p className="mb-2 flex text-sm text-gray-900 dark:text-gray-300">
                    <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                    {DateTime.fromJSDate(product.startTime)
                      .setZone(product.timezone)
                      .toFormat("EEEE, LLLL d")}
                  </p>

                  <p className="flex text-sm text-gray-900 dark:text-gray-300 ">
                    <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                    {product.Address.city}, {product.Address.state}
                  </p>

                  <div className="mt-3">
                    <Button
                      size={"sm"}
                      variant={"secondary"}
                      className="w-full"
                    >
                      know more
                      <MoveRight className="ml-2 h-5 w-5 text-gray-400" />
                    </Button>
                  </div>
                </Link>
              ))}

              {products?.length === 0 && (
                <div className="col-span-3 flex items-center justify-center">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    No events found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
