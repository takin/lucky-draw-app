import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function formatTime(date: Date) {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
