/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { DateTime } from "luxon";
import {
  Compass,
  LogOut,
  Menu,
  Moon,
  Sun,
  User2,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { signIn, signOut, useSession } from "next-auth/react";
import LocalDateTime from "./datetime";
import UserAvatar from "../ui/user-avatar";
import FwIcon from "../shared/fw-icon";
import FwIconFull from "../shared/fw-full";

export default function Header() {
  const { status, data } = useSession();
  const { setTheme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <FwIcon className="max-h-10 max-w-10" />
            {/* <FwIconFull className="w-fit max-h-14" /> */}
            <span className="sr-only">Freshworks Global Giving</span>
          </Link>
          <Link
            href="/explore"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Explore
          </Link>
          {/* {status === "authenticated" && (
            <Link
              href="/profile"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Profile
            </Link>
          )} */}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/explore"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <FwIconFull className="w-fit" />
                <span className="sr-only">Freshworks Global Giving</span>
              </Link>
              <Link
                href="/explore"
                className="text-muted-foreground hover:text-foreground"
              >
                <Compass className="mr-4 inline h-5 w-5" />
                Explore
              </Link>
              {status === "authenticated" && (
                <>
                  <Link
                    href="/profile"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <User2 className="mr-4 inline h-5 w-5" />
                    Profile
                  </Link>

                  <Link
                    href="#"
                    onClick={() => signOut()}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="mr-4 inline h-5 w-5" />
                    Logout
                  </Link>
                </>
              )}
              {status === "unauthenticated" && (
                <Link
                  href="/#"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => signIn("google")}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto"></div>
          <p className="hidden items-center gap-1 text-sm lg:flex">
            <LocalDateTime value={DateTime.now().toISO()} format="hh:mm a" />
            GMT
            <LocalDateTime value={DateTime.now().toISO()} format="ZZ" />
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <UserAvatar user={data.user as any} className="h-8 w-8" />
                  {/* <CircleUser className="h-5 w-5" /> */}
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => signIn("google")}
            >
              Sign In
            </Button>
          )}
        </div>
      </header>
    </>
  );
}
