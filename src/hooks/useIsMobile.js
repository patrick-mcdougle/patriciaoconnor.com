import { useEffect, useState } from 'react';

const mobileBreakpoint = 768;

export function useWindowDims() {
  const [dims, setDims] = useState({ width: undefined, height: undefined });

  useEffect(() => {
    let rafId;
    function handleResize() {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      rafId = window.requestAnimationFrame(() => {
        setDims({ width: window.innerWidth, height: window.innerHeight });
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dims;
}

function useIsMobile() {
  const { width } = useWindowDims();
  return width && width <= mobileBreakpoint;
}

export default useIsMobile;
