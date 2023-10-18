'use client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import * as HoverCard from '@radix-ui/react-hover-card';

const UserAvatar = ({ user }) => {
  const u = user?.user || user;

  return (
    <div className="cursor-pointer">
      <HoverCard.Root>
        <HoverCard.Trigger asChild>
          <Avatar key={u.id}>
            <AvatarImage src={u?.image} />
            <AvatarFallback>
              {(u?.name || u?.email || u?.userId).toUpperCase().substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content
            className="HoverCardContent"
            sideOffset={5}
            style={{ width: 'auto' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <Avatar style={{ width: '70px', height: '70px' }} key={u.id}>
                  <AvatarImage src={u?.image} />
                  <AvatarFallback>
                    {(u?.name || u?.email || u?.userId)
                      .toUpperCase()
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-medium">{u?.name}</div>
                  <div className="text-gray-500">{u?.email}</div>
                </div>
              </div>
            </div>

            <HoverCard.Arrow className="HoverCardArrow" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </div>
  );
};

export default UserAvatar;
