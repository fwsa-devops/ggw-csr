import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const userList = [
  {
    name: "John",
    email: "john@freshworks.com",
    events: 3,
    hours: "8",
  },
  {
    name: "Alice",
    email: "alice@freshworks.com",
    events: 5,
    hours: "12",
  },
  {
    name: "Bob",
    email: "bob@freshworks.com",
    events: 2,
    hours: "6",
  },
  {
    name: "Carol",
    email: "carol@freshworks.com",
    events: 4,
    hours: "10",
  },
  {
    name: "Dave",
    email: "dave@freshworks.com",
    events: 1,
    hours: "3",
  },
  {
    name: "Eve",
    email: "eve@freshworks.com",
    events: 3,
    hours: "7",
  },
  {
    name: "Frank",
    email: "frank@freshworks.com",
    events: 5,
    hours: "14",
  },
  {
    name: "Grace",
    email: "grace@freshworks.com",
    events: 4,
    hours: "11",
  },
  {
    name: "Hank",
    email: "hank@freshworks.com",
    events: 2,
    hours: "5",
  },
  {
    name: "Ivy",
    email: "ivy@freshworks.com",
    events: 6,
    hours: "13",
  },
  {
    name: "Jack",
    email: "jack@freshworks.com",
    events: 1,
    hours: "4",
  },
];

export default function LeaderBoard() {
  const sortedUserList = userList.sort(
    (a, b) => Number(b.hours) - Number(a.hours),
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> Leader Board </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <LeaderBoardTop3 />
          </div>

          <Table className="mt-4">
            {/* <TableCaption>Employee volunteering hours leader board</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                {/* <TableHead>Event</TableHead> */}
                <TableHead className="text-right">Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUserList.slice(3, -1).map((invoice, _idx) => (
                <TableRow key={_idx}>
                  <TableCell>#{_idx + 4}</TableCell>
                  <TableCell className="font-medium">{invoice.name}</TableCell>
                  <TableCell>{invoice.email}</TableCell>
                  {/* <TableCell>{invoice.events}</TableCell> */}
                  <TableCell className="text-right">
                    {invoice.hours} hours
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export function LeaderBoardTop3() {
  return (
    <>
      <div className="grid grid-cols-3 items-end gap-2">
        <div className="col-span-1">
          <div className="mb-4">
            <Image
              className="mx-auto h-16 max-h-40 w-16 max-w-40 rounded-full object-cover object-center md:h-32 md:w-32"
              src={
                "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt={"face of a random women"}
              width={200}
              height={200}
            />
            <div className="mt-2 text-center">
              <h3 className="">Erik Lucatero</h3>
              <p className="text-sm text-muted-foreground">12 Hours</p>
            </div>
          </div>
          <div>
            <div className="rounded bg-yellow-500 py-5 md:py-14">
              <p className="text-center text-lg">#3</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="mb-4">
            <Image
              className="mx-auto h-16 max-h-40 w-16 max-w-40 rounded-full object-cover object-center md:h-32 md:w-32"
              src={
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt={"face of a random women"}
              width={200}
              height={200}
            />
            <div className="mt-2 text-center">
              <h3 className="">Zulmaury Saavedra</h3>
              <p className="text-sm text-muted-foreground">17 Hours</p>
            </div>
          </div>
          <div>
            <div className="bg-op rounded bg-green-600 py-12 md:py-28">
              <p className="text-center text-lg">#1</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="mb-4">
            <Image
              className="mx-auto h-16 max-h-40 w-16 max-w-40 rounded-full object-cover object-center md:h-32 md:w-32"
              src={
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt={"face of a random women"}
              width={200}
              height={200}
            />
            <div className="mt-2 text-center">
              <h3 className="">Jurica Koletic</h3>
              <p className="text-sm text-muted-foreground">14 Hours</p>
            </div>
          </div>
          <div>
            <div className="rounded bg-blue-600 py-8 md:py-20">
              <p className="text-center text-lg">#2</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
