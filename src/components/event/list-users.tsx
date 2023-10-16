import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import UserAvatar from './user-avatar';

const ListUsers = ({ users, title, stacked }) => {
  return (
    <div className={`${stacked ? '' : 'flex mt-4 items-center'}  gap-4`}>
      <div
        className={`text-base font-medium tracking-tight text-gray-600 leading-2 ${
          stacked ? 'mb-2' : ''
        }`}
      >
        {title}
      </div>
      <div className={`flex flex-wrap ${stacked ? 'gap-3' : 'gap-1'}`}>
        {users.map((user) => {
          return <UserAvatar key={user?.user?.id || user?.id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default ListUsers;
