import { Link } from 'react-router';
import './navigation-page.scss';

const USER_READ_PERMISSIONS = [
  'vacancies',
  'users',
  'candidates',
  'clients',
  'partners',
];

const checkHasUserPermission = (routeName) => {
  return USER_READ_PERMISSIONS.includes(routeName);
};

// Со звездочкой проверка прав асинхронная
// const checkHasUserPermission = async (routeName) => {
// 	return USER_READ_PERMISSIONS.includes(routeName)
// }

const routes = {
  vacancies: {
    name: 'vacancies',
    pathname: 'vacancies',
    getLink: () => '/vacancies',
    text: 'Вакансии',
  },
  candidates: {
    name: 'candidates',
    pathname: 'candidates',
    getLink: () => '/candidates',
    text: 'Кандидаты',
  },
  events: {
    name: 'events',
    pathname: 'events',
    getLink: () => '/events',
    text: 'События',
  },
  clients: {
    name: 'clients',
    pathname: 'clients',
    getLink: () => '/clients',
    text: 'Клиенты',
  },
  partners: {
    name: 'partners',
    pathname: 'partners',
    getLink: () => '/partners',
    text: 'Партнеры',
  },
};

const navigationList = [
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

const generateNavigationListWithPermissions = (
  navigationList,
  checkPermission
) => {
  return navigationList
    .map((level1) => {
      const firstLevelChilds = level1.children
        .map((level2) => {
          const secondLevelChilds = level2.children.filter((route) =>
            checkPermission(route.name)
          );

          return secondLevelChilds.length > 0
            ? { ...level2, children: secondLevelChilds }
            : null;
        })
        .filter((item) => item !== null);

      return firstLevelChilds.length > 0
        ? { ...level1, children: firstLevelChilds }
        : null;
    })
    .filter((item) => item !== null);
};

export const NavigationPage = () => {
  const navigationListWithPermission = generateNavigationListWithPermissions(
    navigationList,
    checkHasUserPermission
  );

  return (
    <div className="container">
      <nav>
        <ul className="navigation">
          {navigationListWithPermission.map((level1) => (
            <li className="navigation-level-1" key={level1.text}>
              {level1.text}
              <ul className="navigation-submenu">
                {level1.children.map((level2) => (
                  <li className="navigation-level-2" key={level2.text}>
                    {level2.text}
                    <ul className="navigation-level-3">
                      {level2.children.map((route) => (
                        <li>
                          <Link to={route.getLink()} key={route.text}>
                            {route.text}
                          </Link>
                        </li>
                      ))}
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
