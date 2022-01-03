import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

const GalleryTimerContext = createContext(false);

interface GalleryTimerContextProviderProps {
  interval?: number;
}

export function GalleryTimerContextProvider({
  children,
  interval,
}: PropsWithChildren<GalleryTimerContextProviderProps>) {
  const [ticker, setTicker] = useState(false);

  useEffect(() => {
    let intervalId: number | undefined;
    function setUpInterval() {
      if (!intervalId) {
        intervalId = window.setInterval(() => {
          setTicker((oldTicker) => !oldTicker);
        }, interval);
      }
    }

    function tearDownInterval() {
      window.clearInterval(intervalId);
      intervalId = undefined;
    }

    setUpInterval();
    window.addEventListener('blur', tearDownInterval);
    window.addEventListener('focus', setUpInterval);
    return () => tearDownInterval();
  }, []);

  return (
    <GalleryTimerContext.Provider
      value={ticker}
    >
      {children}
    </GalleryTimerContext.Provider>
  );
}

GalleryTimerContextProvider.defaultProps = {
  interval: 3000,
};

export default GalleryTimerContext;
