import { type Event } from "@prisma/client";

type Props = {
  event: Event;
};

export default function ManageOverview(props: Props) {
  return (
    <>
      <div className="mt-4 p-4">
        <div>
          Event
        </div>
      </div>
    </>
  );
}
