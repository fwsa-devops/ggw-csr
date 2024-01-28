import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getServerSession } from "next-auth";
import { signIn } from 'next-auth/react'
import { Button } from "../ui/button";


export default async function NavUser() {

  const session = await getServerSession();

  if (!session || !session?.user) {
    return (
      <Button
        size={'sm'}
        variant={'link'}
        onClick={() => signIn()}
      >
        Sign In
      </Button>
    );
  }

  const name = session?.user?.name
  const nameFallBack = name?.split(' ').map(_n => _n[0]).join('')

  return (
    <Avatar>
      <AvatarImage src={session.user.image as string} />
      <AvatarFallback>{nameFallBack}</AvatarFallback>
    </Avatar>
  )
}