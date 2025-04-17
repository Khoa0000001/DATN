import { SidebarItem } from "../components/constants/sidebarItems";

export const findBreadcrumb = (
  items: SidebarItem[],
  path: string
): { title: string }[] => {
  for (const item of items) {
    if (item.path === path) {
      return [{ title: item.label }];
    }
    if (item.children) {
      const childMatch = findBreadcrumb(item.children, path);
      if (childMatch.length > 0) {
        return [{ title: item.label }, ...childMatch];
      }
    }
  }
  return [];
};
