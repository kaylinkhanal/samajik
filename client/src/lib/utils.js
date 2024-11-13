import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function formatDateToMonthYear(createdAt) {
  const date = new Date(createdAt);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
