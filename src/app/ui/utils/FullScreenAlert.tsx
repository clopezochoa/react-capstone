'use client'

import React, { createContext, useEffect, useState } from 'react'
import LoginAlert from './alert';
import { AlertContextModel } from 'app/lib/types';
import { useWindowHeight } from 'app/hooks/useWindow';

export const AlertContext = createContext<AlertContextModel | null>(null);

export function FullScreenAlert({
    children
  }: {
    children: React.ReactNode,
  }) {
  const window_height = useWindowHeight(1080);
  
  const [alertHeight, setAlertHeight] = useState(window_height/2 - 80);
  
  useEffect(() => {
    setAlertHeight(window_height/2 - 80);
  }, [window_height]);
  
  const [currentAlertContext, setCurrentAlertContext] = useState(false);
  const dismissAlert = () => {
    setCurrentAlertContext(false);
  }
  const updateAlert = (isActive: boolean) => {
    setCurrentAlertContext(isActive);
    if(isActive) {
      const targetElement = document.getElementById('alert');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (<>
  <div id='alert' style={{height:"0"}}>
    {currentAlertContext ? <LoginAlert height={alertHeight} dismiss={dismissAlert} /> : null}  
  </div>
    <AlertContext.Provider value={{isActive: currentAlertContext, updateAlert}}>
      {children}
    </AlertContext.Provider>
  </>)
}

export default FullScreenAlert