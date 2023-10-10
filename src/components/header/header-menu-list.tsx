import Link from 'next/link';

import { cn } from '@/lib/utils';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/news"
        className="text-md font-medium transition-colors hover:text-primary"
      >
        News
      </Link>
      <Link
        href="/leaderboard"
        className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Leaderboard
      </Link>
      <Link
        href="/teams"
        className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Teams
      </Link>
    </nav>
  );
}
