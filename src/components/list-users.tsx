import { EventLeader, User, Volunteers } from '@prisma/client';
import UserAvatar from './user-avatar';

interface IVolunteer extends Volunteers {
  user?: User;
}

interface IEventLeaders extends EventLeader {
  user?: User;
}

const ListUsers = ({
  users,
  title,
  stacked = false,
  // used to display the users list in new line
  separateUsers = false,
}: {
  users: IVolunteer[] | IEventLeaders[];
  title: string;
  stacked?: boolean;
  separateUsers?: boolean;
}) => {
  return (
    <div
      className={`${stacked ? '' : 'flex mt-4 items-center'} ${
        separateUsers ? 'flex-wrap gap-4 md:justify-center justify-start' : ''
      }`}
    >
      <div
        className={`text-base font-medium tracking-tight text-gray-600 leading-2 flex ${
          stacked ? 'mb-2' : ''
        }
        ${
          separateUsers
            ? 'w-full md:justify-center justify-start'
            : 'md:w-[15%] w-[30%]'
        } `}
      >
        {title}
      </div>
      <div
        className={`flex flex-nowrap ms-3 ${stacked ? 'gap-3' : 'gap-1'} 
        ${separateUsers ? ' md:justify-center justify-start' : ''}
        `}
      >
        {users.map((user: IVolunteer | IEventLeaders) => {
          return (
            <UserAvatar key={user?.user?.id || user?.user_id} user={user} />
          );
        })}
      </div>
    </div>
  );
};

export default ListUsers;
