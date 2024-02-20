'use client'

import CloseButton from "./closeButton";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "app/provider";
import { getFirstNameFromUserData } from "app/lib/helper";

const Sidebar = ({
  isOpen,
  toggle,
  handleLogin,
  handleSignup,
  handleLogout,
  handleProfile

}: {
  isOpen: boolean;
  toggle: () => void;
  handleLogin: () => void;
  handleSignup: () => void;
  handleLogout: () => void;
  handleProfile: () => void;

}): JSX.Element => {
  const sessionContext = useContext(SessionContext);

  const defaultButtonLogin =
    <li className="nav-item">
      <button className="main-button" type="button" onClick={handleLogin}>Login</button>
    </li>;

  const defaultButtonSignup =
    <li className="nav-item">
      <button className="main-button" type="button" onClick={handleSignup}>Sign Up</button>
    </li>;

  const [endButtonLogin, setEndButtonLogin] = useState(defaultButtonLogin);
  const [endButtonSignup, setEndButtonSignup] = useState(defaultButtonSignup);

  useEffect(() => {
    if(sessionContext?.session.isSession) {
      setEndButtonLogin(
        <li className="nav-item">
          <button className="main-button" type="button" onClick={handleLogout}>Logout</button>
        </li>
      );
      setEndButtonSignup(
        <li className="nav-item">
          <button className="main-button" type="button" onClick={handleProfile}>{getFirstNameFromUserData(sessionContext?.session?.user)}</button>
        </li>
      );
    } else {
      setEndButtonLogin(defaultButtonLogin);
      setEndButtonSignup(defaultButtonSignup);
    }
  }, [sessionContext])

  return (
    <>
      <div
        className="sidebar-container fixed w-full h-full overflow-hidden text-dark bg-white grid pt-[80px] "
        style={{
          zIndex:'3',
          top: "0",
          opacity: `${isOpen ? "1" : "0"}`,
          right: ` ${isOpen ? "0" : "-100%"}`,
          transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out',
        }}
      >
        <button className="absolute right-0 p-5" onClick={toggle}>
          <CloseButton />
        </button>

        <div className="offcanvas">
          <ul className="offcanvas-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item nav-link">
              <a href="/">Home</a>
            </li>
            <li className="nav-item nav-link">
              <a href="appointments">Appointments</a>
            </li>
            <li className="nav-item nav-link">
              <a href="health-blog">Health Blog</a>
            </li>
            <li className="nav-item nav-link">
              <a href="review">Review</a>
            </li>
            { endButtonSignup }
            { endButtonLogin }
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;