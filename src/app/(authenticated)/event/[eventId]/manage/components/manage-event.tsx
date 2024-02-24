import { format } from 'date-fns';
import { ClockIcon, MapPinIcon } from 'lucide-react';

import { findAllRegistrations } from '@/server/service/registration.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function ManageEventDetails({ event }: { event: any }) {
  const registeredUsers = await findAllRegistrations(event.id);

  return (
    <>
      <section>
        <div className="mb-5">
          <h1 className="text-3xl font-bold">{event.name}</h1>
          <p className="text-sm">
            Hosted by
            <strong className="font-medium"> {event.organizer.name}</strong>
          </p>
        </div>

        <div className="mb-5">
          <ul>
            <li className="flex items-center gap-3 mb-3">
              <div className="w-[50px] h-[50px] border rounded-lg overflow-hidden text-center">
                <p className="bg-gray-600 text-white text-sm">
                  {format(event.startDateTime, 'MMM')}
                </p>
                <p className="text-base mt-[2px]">
                  {format(event.startDateTime, 'd')}
                </p>
              </div>
              <div>
                <p className="text-lg font-medium">
                  {format(event.startDateTime, 'EEEE, do MMMM')}
                </p>
                <p className="text-sm">
                  {format(event.startDateTime, 'HH:mm a') +
                    ' - ' +
                    (event.startDateTime.getDate() ===
                    event.endDateTime.getDate()
                      ? format(event.endDateTime, 'HH:mm a')
                      : format(event.endDateTime, 'do MMM, HH:mm a'))}
                </p>
              </div>
            </li>
            <li className="flex items-center gap-3 mb-3">
              <div className="w-[50px] h-[50px] border rounded-lg overflow-hidden text-center flex items-center justify-center ">
                <MapPinIcon size={22} />
              </div>
              <div>
                <p>To be announced</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mb-5">
          <Tabs defaultValue="account">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="account">
                Registrations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="overflow-x-auto">
                {registeredUsers.length > 0 && (
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Email</th>
                        <th className="text-left">On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registeredUsers.map((reg) => (
                        <tr key={reg.user.id}>
                          <td>{reg.user.name}</td>
                          <td>{reg.user.email}</td>
                          <td>{format(reg.createdAt, 'MM/dd/yyyy')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {registeredUsers.length === 0 && <p>No registrations yet</p>}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
