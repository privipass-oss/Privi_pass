import { useState, useEffect, useCallback, useRef } from 'react';

const DEBOUNCE_MS = 300;

export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading "${key}":`, error);
      return initialValue;
    }
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      
      // Debounce localStorage writes
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        try {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
          console.warn(`[useLocalStorage] Error writing "${key}":`, error);
        }
      }, DEBOUNCE_MS);
      
      return valueToStore;
    });
  }, [key]);

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`[useLocalStorage] Error removing "${key}":`, error);
    }
  }, [key, initialValue]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return [storedValue, setValue, removeValue];
}
