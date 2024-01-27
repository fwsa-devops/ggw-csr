import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EventList from "./components/event-list";

export default async function Home() {

  const session = await getServerSession();
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div>
      <h1>Home</h1>

      <div>
      <EventList />
      </div>
    </div>
  );
}