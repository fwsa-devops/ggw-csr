import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import Link from "next/link";

const DashboardPage = async () => {

  const activities = await prisma.activity.findMany();

  return (
    <>
      <div>
        Dashboard
      </div>

      <div>

        <Table>
          <TableCaption>list of All Activities.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead >ID</TableHead>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead >Description</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              activities.map(activity => (
                <TableRow>
                  <TableCell className="font-medium">{activity.id}</TableCell>
                  <TableCell>  {activity.name} </TableCell>
                  <TableCell>  {activity.summary} </TableCell>
                  <TableCell className="text-right">
                    <Link href={`admin/activites/${activity.id}`}>
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            }

          </TableBody>
        </Table>


      </div >

    </>
  )

}

export default DashboardPage;