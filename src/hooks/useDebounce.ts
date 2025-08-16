import { useCallback, useRef } from 'react';

/**
 * Custom hook for debouncing function calls
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
};

/**
 * Custom hook for throttling function calls using requestAnimationFrame
 * @param callback - Function to throttle
 * @returns Throttled function that runs at most once per animation frame
 */
export const useRAFThrottle = <T extends (...args: any[]) => any>(
  callback: T
): T => {
  const rafRef = useRef<number | null>(null);
  const argsRef = useRef<Parameters<T> | null>(null);

  return useCallback(
    ((...args: Parameters<T>) => {
      argsRef.current = args;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          if (argsRef.current) {
            callback(...argsRef.current);
          }
          rafRef.current = null;
        });
      }
    }) as T,
    [callback]
  );
};