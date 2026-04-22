import type { AppRole } from "@/types/auth";

export const permissions: Record<AppRole, string[]> = {
  super_admin: ["*"],
  admin: [
    "users:read",
    "users:write",
    "attendance:read",
    "attendance:write",
    "results:read",
    "results:write",
  ],
  teacher: ["attendance:read", "attendance:write", "results:read", "results:write"],
  student: ["attendance:read_self", "results:read_self"],
  parent: ["attendance:read_child", "results:read_child"],
};

export function can(role: AppRole, action: string): boolean {
  const rolePerms = permissions[role];
  return rolePerms.includes("*") || rolePerms.includes(action);
}
