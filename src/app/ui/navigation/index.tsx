"use client";
import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar/index";
import LoginForm from "../login";
import SignupForm from "../signup";
import 'styles/AccessForms.css'

const Navigation = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);

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

  return (
    <>
      <Navbar toggle={toggleSidebar} handleLogin={toggleLogin} handleSignup={toggleSignup} />
      <Sidebar isOpen={isSidebarVisible} toggle={toggleSidebar} handleLogin={toggleLogin} handleSignup={toggleSignup}/>
      { isLoginVisible ? <LoginForm handleLogin={swapForm} hideForm={hideForm} /> : null }
      { isSignupVisible ? <SignupForm handleSignup={swapForm} hideForm={hideForm} /> : null }
      { isLoginVisible || isSignupVisible ? <div className="overlay-background"></div> : null }
    </>
  );
};

export default Navigation;