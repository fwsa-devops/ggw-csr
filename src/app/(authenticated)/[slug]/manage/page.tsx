/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button } from "@/components/ui/button";
import * as EventService from "@/server/service/event.service";
import { StatusCodes } from "http-status-codes";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageOverview from "./components/manage-overview";
import ManageParticipants from "./components/manage-participants";
import { type Event } from "@prisma/client";
import EventNameDialog from "./components/overview/event-name-dialog";
import PageNotFound from "@/components/shared/page/not-found";
import PageNotAuthorized from "@/components/shared/page/not-authorized";
import PageForbidden from "@/components/shared/page/forbidden";
import PageInternalServerError from "@/components/shared/page/internal-server-error";
import ManageRegistration from "./components/manage-registration";

export default async function ManageLayout({
  params,
}: {
  params: { slug: string };
}) {
  const response = await EventService.hasAccess(params.slug);

  console.log(response);

  switch (response.status) {
    case StatusCodes.OK:
      break;
    case StatusCodes.UNAUTHORIZED:
      return <PageNotAuthorized />;
    case StatusCodes.NOT_FOUND:
      return <PageNotFound />;
    case StatusCodes.FORBIDDEN:
      return <PageForbidden />;
    default:
      return <PageInternalServerError />;
  }

  const eventResponse = await EventService.findBySlug(params.slug);

  if (eventResponse.status !== StatusCodes.OK || !eventResponse.data) return <PageNotFound />;

  return (
    <Tabs defaultValue="overview">
      <div className="mx-auto max-w-4xl border-b-[1px]">
        <div className="mb-3 text-muted-foreground">
          Hosted by
          <span className="ml-2 text-black dark:text-white">
            {eventResponse.data?.User.map((user) => user.name).join(", ")}
          </span>
        </div>
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="mb-4 md:mb-0">
            <EventNameDialog event={eventResponse.data as unknown as Event}>
              <h1 className="cursor-pointer rounded-xl bg-zinc-100 px-3 py-2 text-left text-5xl font-bold shadow-sm dark:bg-zinc-950 md:mb-0">
                {eventResponse.data?.title}
              </h1>
            </EventNameDialog>
          </div>

          <Link href={`/${eventResponse.data?.slug}`} className="group">
            <Button variant="secondary" size="sm">
              Event Page
              <ArrowUpRight className="ml-2 h-4 w-5 group-hover:animate-shake" />
            </Button>
          </Link>
        </div>
        <TabsList defaultValue="overview" className="bg-transparent">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="participants"
            className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Registrations
          </TabsTrigger>
          {/* <TabsTrigger
            value="registration"
            className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Registration
          </TabsTrigger> */}
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Settings
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="mx-auto max-w-4xl">
        <TabsContent value="overview">
          <ManageOverview event={eventResponse.data} />
        </TabsContent>
        <TabsContent value="participants">
          <ManageParticipants event={eventResponse.data} />
        </TabsContent>
        <TabsContent value="registration">
          <ManageRegistration event={eventResponse.data} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
