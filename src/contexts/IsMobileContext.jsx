import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const IsMobileContext = createContext(true);

export function IsMobileContextProvider({ children }) {
  const isMobile = useIsMobile();
  return (
    <IsMobileContext.Provider
      value={isMobile}
    >
      {children}
    </IsMobileContext.Provider>
  );
}

IsMobileContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default IsMobileContext;
