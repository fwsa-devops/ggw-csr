import logger from "@/lib/logger";
import { StatusCodes } from "http-status-codes";
import ExploreHeader from "./components/explore-header";
import { cityList, eventFilter } from "@/server/service/explore.service";
import { DateTime } from "luxon";
// import Link from "next/link";
import EventCard from "./components/event-card";
import { type IEvent } from "@/server/model";
import { Link } from 'next-view-transitions'

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
    date: DateTime.local().toJSDate(),
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
          <div className="mx-auto max-w-5xl lg:max-w-5xl">
            <h2 className="mb-10 text-xl font-semibold">Upcoming Events</h2>
            <div className="grid grid-cols-1 gap-x-12 gap-y-20 p-4 sm:grid-cols-2 md:p-0 lg:grid-cols-3">
              {products?.map((product) => (
                <Link
                  key={product.id}
                  href={`/${product.slug}`}
                  className="group"
                >
                  <EventCard event={product as unknown as IEvent} />
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
