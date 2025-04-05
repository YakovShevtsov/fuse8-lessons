export type Route = {
  name: string;
  pathname: string;
  getLink: () => string;
  text: string;
};

export type NavigationItem = {
  name: string;
  text: string;
  children: (Route | NavigationItem)[];
};
