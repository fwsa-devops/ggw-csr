import ExploreHeader from "./components/explore-header";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading({
  searchParams,
}: {
  searchParams?: Record<string, string | undefined>;
}) {
  const valueParams = {
    search: searchParams?.search ?? "",
    city: searchParams?.city ?? "",
  };

  return (
    <>
      <div>
        <ExploreHeader searchParams={valueParams} cityList={[]} />

        <div>
          <div className="mx-auto max-w-6xl lg:max-w-6xl">
            <h2 className="mb-10 text-xl font-semibold">Upcoming Events</h2>
            <div className="grid grid-cols-1 gap-x-10 gap-y-20 p-4 sm:grid-cols-2 md:p-0 lg:grid-cols-3">
              {[1, 2, 3, 4, 5].map(() => (
                <>
                  <div>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-4 xl:aspect-w-4">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <h3 className="text-md mb-3 mt-4 font-medium text-gray-700 dark:text-gray-100">
                      <Skeleton className="h-4 w-[250px]" />
                    </h3>

                    <p className="mb-2 flex text-sm text-gray-900 dark:text-gray-300">
                      <Skeleton className="h-4 w-[250px]" />
                    </p>

                    <p className="text-sm text-gray-900 dark:text-gray-300 ">
                      <Skeleton className="h-4 w-[250px]" />
                    </p>

                    <div className="mt-3">
                      {/* <Button size={"sm"} variant={"secondary"} className="w-full">
                  know more
                  <MoveRight className="ml-2 h-5 w-5 text-gray-400" />
                </Button> */}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
