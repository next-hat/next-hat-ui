import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes?: number) {
  if (bytes === undefined || bytes === null) return "-"
  const units = ["B", "KB", "MB", "GB", "TB", "PB"]
  let i = 0
  let value = bytes
  while (value >= 1024 && i < units.length - 1) {
    value = value / 1024
    i++
  }
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${units[i]}`
}
