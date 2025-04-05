import { Link } from 'react-router';
import styles from './navigation-page.module.scss';
import { useEffect, useState } from 'react';
import { NavigationItem } from '../model/types';
import { generateNavigationListWithPermissions } from '../model/generate-permitted-navigation';
import { routes } from '../model/routes';

const USER_READ_PERMISSIONS = [
  'vacancies',
  'users',
  'candidates',
  'clients',
  'partners',
];

const checkHasUserPermission = async (routeName: string): Promise<boolean> => {
  return USER_READ_PERMISSIONS.includes(routeName);
};

const navigationList: NavigationItem[] = [
  {
    name: 'content',
    text: 'Контент',
    children: [
      {
        name: 'job',
        text: 'Работа',
        children: [routes.vacancies, routes.candidates],
      },
      {
        name: 'news',
        text: 'Новости',
        children: [routes.events],
      },
    ],
  },
  {
    name: 'users',
    text: 'Пользователи',
    children: [
      {
        name: 'inner-users',
        text: 'Внутренние пользователи',
        children: [routes.clients, routes.partners],
      },
    ],
  },
];

export const NavigationPage = () => {
  const [navigationListWithPermissions, setNavigationListWithPermissions] =
    useState<NavigationItem[]>([]);

  useEffect(() => {
    const run = async () => {
      const navigationListWithPermissions =
        await generateNavigationListWithPermissions(
          navigationList,
          checkHasUserPermission
        );

      setNavigationListWithPermissions(navigationListWithPermissions);
    };

    run();
  }, []);

  return (
    <div className="container">
      <nav>
        <ul className={styles.navigation}>
          {navigationListWithPermissions.map((level1) => (
            <li className={styles['navigation-level-1']} key={level1.text}>
              {level1.text}
              <ul className={styles['navigation-submenu']}>
                {level1.children.map((level2) => (
                  <li
                    className={styles['navigation-level-2']}
                    key={level2.text}
                  >
                    {level2.text}
                    <ul className={styles['navigation-level-3']}>
                      {'children' in level2 &&
                        level2.children.map((route) => {
                          if ('getLink' in route) {
                            return (
                              <li key={route.name}>
                                <Link to={route.getLink()}>{route.text}</Link>
                              </li>
                            );
                          }
                          return null;
                        })}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
