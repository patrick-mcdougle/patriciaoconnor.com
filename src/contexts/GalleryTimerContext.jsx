import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const GalleryTimerContext = createContext(0);

export function GalleryTimerContextProvider({ children, interval }) {
  const [ticker, setTicker] = useState(false);

  useEffect(() => {
    let intervalId;
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

GalleryTimerContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  interval: PropTypes.number,
};

GalleryTimerContextProvider.defaultProps = {
  interval: 3000,
};

export default GalleryTimerContext;
