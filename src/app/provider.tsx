"use client";

import { createContext, useState } from "react";
import { Cookies, Session, SessionContextModel } from "./lib/types";
import { CookiesProvider, useCookies } from "react-cookie"
import FullScreenAlert from "./ui/utils/FullScreenAlert";

export const SessionContext = createContext<SessionContextModel | null>(null);

export function Providers({
  children,
}: {
  children: React.ReactNode,
}) {
  const [cookie, setCookie] = useCookies([Cookies.userSession]);

  let isSessionInitial = { isSession: false, user: null } as Session;
  const userSessionCookie = cookie[Cookies.userSession];
  if (userSessionCookie) {
    if(userSessionCookie.message !== "Error") {
      isSessionInitial.isSession = true;
      if(userSessionCookie.user.name) {
        isSessionInitial.user = userSessionCookie.user;
      }
    }
  }
  
  const [currentSessionContext, setCurrentSessionContext] = useState(isSessionInitial);

  const updateSession = (session: Session) => {
    setCurrentSessionContext(session);
  }

  return (
    <>
      <CookiesProvider>
        <SessionContext.Provider value={{session: currentSessionContext, updateSession}}>
          <FullScreenAlert>
            {children}
          </FullScreenAlert>
        </SessionContext.Provider>
      </CookiesProvider>
    </>
  );
}