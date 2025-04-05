import { NavLink } from 'react-router';
import classes from './main-navigation.module.scss';
import { routes } from '@shared/services/routes';

const MAIN_NAVIGATION_LIST = [
  { text: 'Home', name: 'home', route: routes.main },
  { text: 'Random post', name: 'random-post', route: routes.post },
  { text: 'Landing page', name: 'landing-page', route: routes.landing },
  { text: 'Navigation', name: 'navigation', route: routes.navigation },
  {
    text: 'Create article',
    name: 'create-article',
    route: routes.createArticle,
  },
  { text: 'Articles', name: 'articles', route: routes.articles },
];

export const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {MAIN_NAVIGATION_LIST.map((link, i) => (
            <li key={link.name}>
              <NavLink
                to={link.route.getLink()}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end={i === 0}
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
