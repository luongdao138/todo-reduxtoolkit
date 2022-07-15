import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay?: number) {
   const [debouncedValue, setDebouncedValue] = useState<T>(value);
   
   useEffect(() => {
     const timeoutId = setTimeout(() => {
        setDebouncedValue(value)
     }, delay ?? 500);

     return () => clearTimeout(timeoutId)
   }, [value, delay]);

   return debouncedValue
}