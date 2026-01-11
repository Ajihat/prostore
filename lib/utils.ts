import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

export function objectToFormData<T extends Record<string, string>>(
  obj: T
): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    formData.append(key, value); // każda wartość musi być string
  }
  return formData;
}
