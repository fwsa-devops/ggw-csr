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
        href="/"
        className="font-medium transition-colors text-md text-muted-foreground hover:text-primary"
      >
        News
      </Link>
      <Link
        href="/"
        className="font-medium transition-colors text-md text-muted-foreground hover:text-primary"
      >
        Leaderboard
      </Link>
      <Link
        href="/"
        className="font-medium transition-colors text-md text-muted-foreground hover:text-primary"
      >
        Teams
      </Link>
    </nav>
  );
}
