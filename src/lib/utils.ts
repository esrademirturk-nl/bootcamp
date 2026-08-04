import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tailwind class'larını birleştirirken çakışanları (örn. iki farklı bg-*)
// otomatik çözer — sonraki class öncekini ezer, tekrar eden class kalmaz.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
