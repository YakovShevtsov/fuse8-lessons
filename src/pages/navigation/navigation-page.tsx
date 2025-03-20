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
    text: 'Клиенты',
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

// Нужно написать функцию
const generateNavigationListWithPermissions = (
  navigationList,
  checkPermission
) => {
  return [];
};

export const NavigationPage = () => {
  const navigationListWithPermission = generateNavigationListWithPermissions(
    navigationList,
    checkHasUserPermission
  );

  return (
    <div className="container">
      {/* {navigationListWithPermission.map((item) => item)} */}

      <div className="navigation">
        <div className="navigation-level-1">
          Контент
          <div className="navigation-level-2">
            Работа
            <div className="navigation-level-3">
              {checkHasUserPermission('vacancies') && <div>Вакансии</div>}
              {checkHasUserPermission('candidates') && <div>Кандидаты</div>}
            </div>
          </div>
          <div className="navigation-level-2">
            Новости
            <div className="navigation-level-3">
              {checkHasUserPermission('events') && <div>События</div>}
            </div>
          </div>
        </div>
        <div className="navigation-level-1">
          Пользователи
          <div className="navigation-level-2">
            Клиенты
            <div className="navigation-level-3">
              {checkHasUserPermission('clients') && <div>Клиенты</div>}
              {checkHasUserPermission('partners') && <div>Партнеры</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
