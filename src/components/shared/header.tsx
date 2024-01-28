import Link from "next/link";
import { Button } from "../ui/button";
import { CalendarIcon, CompassIcon, TicketIcon } from "lucide-react";
import NavUser from "./nav-user";

export default function Header() {

  return (
    <>
      <header className="flex items-center justify-between bg-gray-800 px-6 py-2">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Event Manager</span>
        </div>
        <div className="w-full flex items-center lg:w-auto gap-2">
          <div>
            <Button size={'sm'} variant={'link'}>
              <Link href="/home" className="font-light text-white flex items-center gap-2">
                <TicketIcon size={16} className="hidden md:block"/>  Events
              </Link>
            </Button>
          </div>
          <div>
            <Button size={'sm'} variant={'link'}>
              <Link href="/explore" className="font-light text-white flex items-center gap-2">
                <CompassIcon size={16} className="hidden md:block" /> Explore
              </Link>
            </Button>
          </div>
          <div >
            <Button size={'sm'} variant={'link'}>
              <Link href="/calendar" className="font-light text-white flex items-center gap-2">
                <CalendarIcon size={16} className="hidden md:block"/> Calendar
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <NavUser />
        </div>
      </header>
    </>
  )

}