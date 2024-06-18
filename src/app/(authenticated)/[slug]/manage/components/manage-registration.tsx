import { type IEvent } from "@/server/model";
import RegistrationStatus from "./registration/registration-status";

type Props = {
  event: IEvent;
};

export default async function ManageRegistration(props: Props) {
  return (
    <>
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <RegistrationStatus />
        </div>
      </div>
    </>
  );
}
