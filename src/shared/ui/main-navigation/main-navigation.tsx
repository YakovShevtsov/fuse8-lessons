import { NavLink } from 'react-router';
import classes from './main-navigation.module.scss';
import { routes } from '@shared/services/routes';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to={routes.main.getLink()}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.post.getLink()}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Random post
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.landing.getLink()}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Landing page
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.navigation.getLink()}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Navigation
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
