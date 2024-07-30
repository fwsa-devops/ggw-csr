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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> Volunteering Leader Board </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            {/* <TableCaption>Employee volunteering hours leader board</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Event</TableHead>
                <TableHead className="text-right">Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.map((invoice, _idx) => (
                <TableRow key={_idx}>
                  <TableCell className="font-medium">{invoice.name}</TableCell>
                  <TableCell>{invoice.email}</TableCell>
                  <TableCell>{invoice.events}</TableCell>
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
