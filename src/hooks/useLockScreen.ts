import { useEffect } from 'react';

export default function useLockScreen(isLocked: boolean) {
  useEffect(() => {
    const bodyEl = document.body;
    const currentBodyOverflow = bodyEl.style.overflow;

    if (isLocked) {
      bodyEl.style.overflow = 'hidden';
    } else {
      bodyEl.style.overflow = currentBodyOverflow;
    }

    return () => {
      bodyEl.style.overflow = currentBodyOverflow;
    };
  }, [isLocked]);
}
