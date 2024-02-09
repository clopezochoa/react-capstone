"use client";

import { createContext, useState } from "react";
import { Cookies, Session, SessionContextModel } from "./lib/types";
import { CookiesProvider, useCookies } from "react-cookie"
import { capitalizeFirstLetter, getFirstWord } from "./lib/helper";

export const SessionContext = createContext<SessionContextModel | null>(null);

export function Providers({
  children,
}: {
  children: React.ReactNode,
}) {
  const [cookie, setCookie] = useCookies([Cookies.userSession]);

  let isSessionInitial = { isSession: false, userName: "" } as Session;
  const userSessionCookie = cookie[Cookies.userSession];
  if (userSessionCookie) {
    if(userSessionCookie.message !== "Error") {
      isSessionInitial.isSession = true;
      if(userSessionCookie.user.name) {
        isSessionInitial.userName = capitalizeFirstLetter(getFirstWord(userSessionCookie.user.name));
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
          {children}
        </SessionContext.Provider>
      </CookiesProvider>
    </>
  );
}