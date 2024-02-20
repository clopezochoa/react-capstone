'use client'

import React, { createContext, useState } from 'react'
import LoginAlert from './loginAlert';
import { AlertContextModel } from 'app/lib/types';

export const AlertContext = createContext<AlertContextModel | null>(null);

export function FullScreenAlert({
    children
  }: {
    children: React.ReactNode,
  }) {
  const [currentAlertContext, setCurrentAlertContext] = useState(false);
  const dismissAlert = () => {
    setCurrentAlertContext(false);
  }
  const updateAlert = (isActive: boolean) => {
    setCurrentAlertContext(isActive);
  }

  return (<>
  <div>
    {currentAlertContext ? <LoginAlert dismiss={dismissAlert} /> : null}  
  </div>
    <AlertContext.Provider value={{isActive: currentAlertContext, updateAlert}}>
      {children}
    </AlertContext.Provider>
  </>)
}

export default FullScreenAlert