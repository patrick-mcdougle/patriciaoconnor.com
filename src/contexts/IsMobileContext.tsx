import React, {
  createContext,
  PropsWithChildren,
} from 'react';
import useIsMobile from '../hooks/useIsMobile';

const IsMobileContext = createContext(true);

export function IsMobileContextProvider({ children }: PropsWithChildren<{}>) {
  const isMobile = useIsMobile();
  return (
    <IsMobileContext.Provider
      value={isMobile}
    >
      {children}
    </IsMobileContext.Provider>
  );
}

export default IsMobileContext;
