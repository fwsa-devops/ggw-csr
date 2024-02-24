import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getServerSession } from "next-auth";
import { signIn } from 'next-auth/react'
import { Button } from "../ui/button";
import Link from "next/link";


export default async function NavUser() {

  const session = await getServerSession();

  if (!session || !session?.user) {
    return (
      <Button
        size={'sm'}
        variant={'link'}
      // onClick={() => signIn()}
      >
        <Link
          href="/api/auth/signin"
          className="font-light text-white flex items-center gap-2">
          Sign In
        </Link>
      </Button>
    );
  }

  const name = session?.user?.name
  const nameFallBack = name?.split(' ').map(_n => _n[0]).join('')

  return (
    <>
    <div className="flex items-center gap-3">
    <Button size={"sm"} variant={'secondary'}>
      <Link href="/new" className="">
        Create Event
      </Link>
    </Button>
    <Avatar>
      <AvatarImage src={session.user.image as string} />
      <AvatarFallback>{nameFallBack}</AvatarFallback>
    </Avatar>
    </div>
    </>
  )
}