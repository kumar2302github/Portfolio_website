import { createContext, useContext, useEffect, useState } from 'react';

interface ReducedMotionContextType {
  reducedMotion: boolean;
}

const ReducedMotionContext = createContext<ReducedMotionContextType>({
  reducedMotion: false,
});

export function useReducedMotion() {
  return useContext(ReducedMotionContext);
}

export default function ReducedMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <ReducedMotionContext.Provider value={{ reducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  );
}
