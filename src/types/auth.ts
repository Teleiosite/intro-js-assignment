export type AppRole = "super_admin" | "admin" | "teacher" | "student" | "parent";

export interface SessionUser {
  id: string;
  orgId: string;
  orgSlug: string;
  role: AppRole;
  email?: string | null;
  name?: string | null;
}
