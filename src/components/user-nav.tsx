'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown/dropdown-menu';
import NotificationsDrawer from './notifications-drawer';

export function UserNav({ activitiesJoined }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user && (
          <>
            <span className="p-2">
              <NotificationsDrawer activitiesJoined={activitiesJoined} />
            </span>
            {/* <span className="absolute -inset-1.5" /> */}

            <AuthButton user={session.user} />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <a onClick={() => signIn('google')} className="cursor-pointer button">
        <span>Sign in</span>
      </a>
    </>
  );
}

function AuthButton({ user }: { user: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback delayMs={500}>
              {(user?.name || user?.email || '').toUpperCase().substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
