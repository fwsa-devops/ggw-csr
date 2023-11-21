import prisma from '@/lib/prisma';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Overview } from './components/overview';
import { RecentVolunteers } from './components/recent-volunteers';
import { cn } from '@/lib/utils';

const DashboardPage = async () => {
  const events = await prisma.event.findMany({
    select: {
      city: true,
      id: true,
      published: true,
      activity: true,
      _count: {
        select: { volunteers: true },
      },
    },
  });

  const totalActivities = await prisma.activity.count();
  const activeActivities = await prisma.activity.count({
    where: {
      status: 'OPEN',
    },
  });
  const activities = await prisma.activity.findMany({
    include: {
      events: {
        include: {
          _count: {
            select: {
              volunteers: true,
            },
          },
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  const themeBasedVolunteersCount = {};

  activities.forEach((activity) => {
    // console.log('activity.events', JSON.stringify(activity.events));
    const volunteersCount = activity.events.reduce((val, event) => {
      return val + event['_count'].volunteers;
    }, 0);
    // console.log('volunteersCount', volunteersCount);
    activity.tags.forEach((tag) => {
      themeBasedVolunteersCount[tag.tag.name] =
        (themeBasedVolunteersCount[tag.tag.name] || 0) + volunteersCount;
    });
  });

  const locationBasedVolunteers = {};

  events.forEach((event) => {
    const volunteersCount = event._count.volunteers;
    locationBasedVolunteers[event.city] =
      (locationBasedVolunteers[event.city] || 0) + volunteersCount;
  });

  // For each activity, get the total number of volunteers
  const activityVolunteerCounts = await Promise.all(
    activities.map(async (activity) => {
      const volunteerCount = await prisma.volunteers.count({
        where: {
          event: {
            activityId: activity.id,
          },
        },
      });

      return {
        id: activity.id,
        name: activity.name,
        count: volunteerCount,
      };
    }),
  );

  const users = await prisma.user.findMany({
    select: {
      email: true,
    },
  });

  const volunteers = await prisma.volunteers.findMany({
    orderBy: {
      assigned_at: 'desc',
    },
    select: {
      user_id: true,
      event_id: true,
      assigned_at: true,
      user: {
        select: {
          id: true,
          created_at: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  // console.log('themeBasedVolunteersCount',themeBasedVolunteersCount, Object.keys(themeBasedVolunteersCount), Object.keys(themeBasedVolunteersCount).map(val => ({name:  val, count: themeBasedVolunteersCount[val]})));

  return (
    <>
      <main className="flex flex-col items-center justify-between">
        <section className="w-full text-gray-600 body-font">
          <div className="flex-1 space-y-4 py-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
          </div>

          <div className="mb-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Activities
                  </CardTitle>
                  <CalendarIcon className="opacity-70 h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold"> {activeActivities} </div>
                  <p className="text-xs text-muted-foreground">
                    active of {totalActivities} Total Activities
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Events
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{events.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {' '}
                    Total Users{' '}
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold"> {users.length} </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Volunteers
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {' '}
                    {volunteers.length}{' '}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 lg:max-h-[450px] md:h-auto ">
              <CardHeader>
                <CardTitle>Overview - Activity wise</CardTitle>
              </CardHeader>
              <CardContent className="pl-2 sm:pr-2 sm:w-full">
                <Overview data={activityVolunteerCounts} />
              </CardContent>
            </Card>
            <Card className=" col-span-4 lg:col-span-3 max-h-[450px] overflow-y-hidden">
              <CardHeader>
                <CardTitle>Recent Volunteers</CardTitle>
                <CardDescription>
                  You have got{' '}
                  {
                    volunteers.filter(
                      ({ assigned_at }) =>
                        assigned_at.getDate() === new Date().getDate(),
                    ).length
                  }{' '}
                  new volunteers today.
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <div
                  className={cn('space-y-8 h-[360px] overflow-y-scroll pb-10')}
                >
                  <RecentVolunteers className="" volunteers={volunteers} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid mt-4 md:grid-cols-2 lg:grid-cols-8">
            <Card className="col-span-4 mr-3">
              <CardHeader>
                <CardTitle>Overview - Theme wise</CardTitle>
              </CardHeader>
              <CardContent className="pl-2 sm:pr-2 sm:w-full">
                <Overview
                  data={Object.keys(themeBasedVolunteersCount).map((val) => ({
                    name: val,
                    count: themeBasedVolunteersCount[val],
                  }))}
                />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview - Location wise</CardTitle>
              </CardHeader>
              <CardContent className="pl-2 sm:pr-2 sm:w-full">
                <Overview
                  data={Object.keys(locationBasedVolunteers).map((val) => ({
                    name: val,
                    count: locationBasedVolunteers[val],
                  }))}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"></div>
        </section>
      </main>

      <div>
        {/* <Table>
          <TableCaption>list of All Activities.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.id}</TableCell>
                <TableCell> {activity.name} </TableCell>
                <TableCell> {activity.summary} </TableCell>
                <TableCell className="text-right">
                  <Link href={`admin/activites/${activity.id}`}>View</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </div>
    </>
  );
};

export default DashboardPage;

export const revalidate = 10;
