export const routes = {
  main: {
    getLink: () => '/',
    pathname: '/',
  },
  post: {
    getLink: () => '/random-post',
    pathname: '/random-post',
  },
  landing: {
    getLink: () => '/landing',
    pathname: '/landing',
  },
  navigation: {
    getLink: () => '/navigation',
    pathname: '/navigation',
  },
  articles: {
    getLink: () => '/articles',
    pathname: '/articles',
  },
  createArticle: {
    getLink: () => '/create-article',
    pathname: '/create-article',
  },
};
