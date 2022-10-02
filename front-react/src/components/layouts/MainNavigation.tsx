import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Pull-Requests Managing</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/prs' className={({ isActive }) => isActive ? classes.active : ''}>
              All PRs
            </NavLink>
          </li>
          <li>
            <NavLink to='/new-pr' className={({ isActive }) => isActive ? classes.active : ''}>
              Add a PR
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;