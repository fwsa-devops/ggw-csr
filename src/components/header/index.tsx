import { MainNav } from './header-menu-list';
import { UserNav } from './user-nav';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content responsive-wrapper">
        <div className="header-logo">
          <a href="#">
            <code className="text-2xl font-bold">VOLUNTEER</code>
          </a>
        </div>
        <div className="header-navigation">
          <MainNav />
          <div className="header-navigation-actions gap-4">
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
