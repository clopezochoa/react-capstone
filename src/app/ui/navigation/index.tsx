'use client'

import { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar/index";
import LoginForm from "../login";
import SignupForm from "../signup";
import 'styles/AccessForms.css'
import { useCookies } from "react-cookie";
import { Cookies, createSession } from "app/lib/types";
import { SessionContext } from "app/provider";
import Profile from "../profile";

const Navigation = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const sessionContext = useContext(SessionContext);
  const [cookie, setCookie, removeCookie] = useCookies([Cookies.userSession]);

  useEffect(() => {
    if(sessionContext?.session) hideForm();
  }, [sessionContext]);

  const toggleLogin = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const toggleSignup = () => {
    setIsSignupVisible(!isSignupVisible);
  };

  const swapForm = () => {
    setIsLoginVisible(!isLoginVisible);
    setIsSignupVisible(!isSignupVisible);
  }
  
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const hideForm = () => {
    setIsLoginVisible(false);
    setIsSignupVisible(false);
  }

  const handleLogout = () => {
    sessionContext?.updateSession(createSession(false));
    removeCookie(Cookies.userSession);
    window.location.reload();
  }

  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  }

  return (
    <>
      <Navbar toggle={toggleSidebar} handleLogin={toggleLogin} handleSignup={toggleSignup} handleLogout={handleLogout} handleProfile={toggleProfile} />
      <Sidebar isOpen={isSidebarVisible} toggle={toggleSidebar} handleLogin={toggleLogin} handleSignup={toggleSignup} handleLogout={handleLogout} handleProfile={toggleProfile}/>
      { isProfileVisible ? <Profile toggle={toggleProfile} /> : null }
      { isLoginVisible ? <LoginForm handleLogin={swapForm} hideForm={hideForm} /> : null }
      { isSignupVisible ? <SignupForm handleSignup={swapForm} hideForm={hideForm} /> : null }
    </>
  );
};

export default Navigation;