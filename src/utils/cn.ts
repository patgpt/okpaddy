/**
 * Utility for conditionally joining class names with clsx and tailwind-merge.
 *
 * This function combines the power of clsx for conditional class name handling
 * and tailwind-merge for intelligent Tailwind CSS class deduplication.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges class names intelligently.
 *
 * Uses clsx for conditional class name handling and tailwind-merge
 * to resolve Tailwind CSS class conflicts by keeping the last conflicting class.
 *
 * @param inputs - Class names, objects, arrays, or conditional expressions
 * @returns Optimized and merged class string
 *
 * @example
 * ```ts
 * cn('px-2', 'px-4') // 'px-4' (tailwind-merge removes conflicting px-2)
 * cn('text-red-500', { 'text-blue-500': isBlue }) // conditional classes
 * cn(['flex', 'items-center'], null, undefined) // handles falsy values
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
