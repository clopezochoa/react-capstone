import { capitalizeFirstLetter, getFirstWord } from "app/lib/helper";
import { Cookies, createSession } from "app/lib/types";
import { SessionContext } from "app/provider";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";

export function useUpdateSessionAtCookies (userName?: string) {
  const sessionContext = useContext(SessionContext)
  useEffect(() => {
    sessionContext?.updateSession(createSession(true, userName ?? "user"));
  }, [])
}

export function useCookieCheck () {
  const [cookie, setCookie] = useCookies([Cookies.userSession]);
  const updateSession = useUpdateSessionAtCookies;
  useEffect(() => {
    console.dir(cookie[Cookies.userSession])
    if(cookie[Cookies.userSession]) {
      const userName = capitalizeFirstLetter(getFirstWord(cookie[Cookies.userSession].user.name));
      updateSession(userName);
    }
  }, [])
}



