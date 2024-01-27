import { findAllPublicEvents } from "@/server/service/event.service";
import Link from "next/link";

export default async function Page() {

  const events = await findAllPublicEvents();

  return (
    <>
      <div className="flex-1 space-y-8 pt-6 md:p-8">
        <h1>Explore</h1>
        <p>
          <Link href="/home">
            Go back
          </Link>
        </p>
        <p>
          This is the explore page.
        </p>

        <div>
          <h2>Events</h2>
          <ul>
            {
              events.map((event) => (
                <li key={event.id}>
                  <Link href={`/e/${event.id}`}>
                    {event.name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

    </>
  )

}