import { NavigationItem, Route } from './types';

const processNavigationLevel = async (
  items: (Route | NavigationItem)[],
  checkPermission: (routeName: string) => Promise<boolean>
): Promise<(Route | NavigationItem)[]> => {
  const results = await Promise.all(
    items.map(async (item) => {
      if ('children' in item) {
        const children = await processNavigationLevel(
          item.children,
          checkPermission
        );
        return children.length > 0 ? { ...item, children } : null;
      }
      if ('getLink' in item) {
        const hasPermission = await checkPermission(item.name);
        return hasPermission ? item : null;
      }
    })
  );

  return results.filter(
    (item): item is Route | NavigationItem => item !== null
  );
};

export const generateNavigationListWithPermissions = async (
  navigationList: NavigationItem[],
  checkPermission: (routeName: string) => Promise<boolean>
): Promise<NavigationItem[]> => {
  const result = await processNavigationLevel(navigationList, checkPermission);

  return result.filter((item): item is NavigationItem => 'children' in item);
};
