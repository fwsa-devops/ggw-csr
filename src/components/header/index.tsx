import Link from 'next/link';
import { MainNav } from './header-menu-list';
import { UserNav } from './user-nav';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content responsive-wrapper">
        <div className="header-logo">
          <Link href="/">
            <code className="text-2xl font-bold">Global Giving Week</code>
          </Link>
        </div>
        <div className="header-navigation">
          <MainNav />
          <div className="gap-4 header-navigation-actions">
            <UserNav />
          </div>
        </div>
        <a href="#" className="button">
          <i className="ph-list-bold"></i>
          <span>Menu</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
