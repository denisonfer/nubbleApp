import { useEffect, useState } from 'react';

/**
 * A hook that debounces the provided value. It will return the debounced value,
 * which is the value that the hook received, but delayed by the specified time.
 *
 * The hook will clear the timeout and create a new one every time the value
 * changes.
 *
 * @param {TData} value The value to debounce.
 * @param {number} delay The amount of time in ms to debounce the value `default: 500`.
 * @returns {TData} The debounced value.
 */
export function useAppDebounce<TData>(value: TData, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<TData>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
