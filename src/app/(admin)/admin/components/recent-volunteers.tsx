import UserAvatar from '@/components/user-avatar';
import moment from 'moment';

export function RecentVolunteers({ volunteers, className = '' }) {
  return (
    <>
      {volunteers.map(({ user, assigned_at }) => (
        <div key={user.email} className="flex items-center">
          <UserAvatar user={user} />
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none"> {user.name} </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">
            {moment(assigned_at, 'YYYYMMDD').fromNow()}
          </div>
        </div>
      ))}
    </>
  );
}
