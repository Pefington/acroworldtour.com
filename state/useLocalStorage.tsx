import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue: unknown) => {
  const [value, setValue] = useState(() => getStoredValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

function getStoredValue(key: string, initialValue: unknown) {
  const initialValueReturn =
    initialValue instanceof Function ? initialValue() : initialValue;
  if (typeof window === "undefined") return initialValueReturn;

  const storedValue = localStorage.getItem(key);

  return storedValue ? JSON.parse(storedValue) : initialValueReturn;
}

export default useLocalStorage;
