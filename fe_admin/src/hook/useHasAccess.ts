// utils/useHasAccess.ts
import { useAppSelector } from "@/store/hooks";

interface Access {
  roles?: string[];
  permissions?: string[];
}

export const useHasAccess = () => {
  const { roles, permissions } = useAppSelector((state) => state.auth);

  // if (!access) return true;

  // const roleOk =
  //   !access.roles?.length || access.roles.some((r) => roles.includes(r));
  // const permOk =
  //   !access.permissions?.length ||
  //   access.permissions.some((p) => permissions.includes(p));
  // return roleOk && permOk;

  const hasAccess = (access?: Access): boolean => {
    if (!access) return true;

    const roleOk =
      !access.roles?.length || access.roles.some((r) => roles.includes(r));
    const permOk =
      !access.permissions?.length ||
      access.permissions.some((p) => permissions.includes(p));
    return roleOk && permOk;
  };
  return hasAccess;
};
