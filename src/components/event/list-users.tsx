import { EventLeader, User, Volunteers } from '@prisma/client';
import UserAvatar from './user-avatar';

interface IVolunteer extends Volunteers {
  user?: User
}

interface IEventLeaders extends EventLeader {
  user?: User
}


const ListUsers = ({ users, title, stacked }: {
  users: IVolunteer[] | IEventLeaders[],
  title: string,
  stacked: boolean
}) => {

  return (
    <div className={`${stacked ? '' : 'flex mt-4 items-center'}  gap-4`}>
      <div
        className={`text-base font-medium tracking-tight text-gray-600 leading-2 ${stacked ? 'mb-2' : ''
          }`}
      >
        {title}
      </div>
      <div className={`flex flex-wrap ${stacked ? 'gap-3' : 'gap-1'}`}>
        {
          users.map((user: IVolunteer | IEventLeaders) => {
            return <UserAvatar key={user?.user?.id || user?.user_id} user={user} />;
          })}
      </div>
    </div>
  );
};

export default ListUsers;
