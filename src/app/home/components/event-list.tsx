import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { findAll } from "@/server/service/event.service";
import { format } from "date-fns";


const EventList = async () => {
    const events = await findAll();

    return (
        <div>
            <Table>
                <TableCaption>A list of your events.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>StartsAt</TableHead>
                        <TableHead>EndsAt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events.map(_e => <TableRow key={_e.id}>
                        <TableCell className="font-medium">{_e.name}</TableCell>
                        <TableCell> {format(_e.startDateTime, 'Pp')} </TableCell>
                        <TableCell> {format(_e.endDateTime, 'Pp')} </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>

        </div>
    )
}

export default EventList;