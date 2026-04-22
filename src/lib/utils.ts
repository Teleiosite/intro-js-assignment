import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, formatStr = "PPP") {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, formatStr);
}

export function formatRelativeTime(date: Date | string) {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}
