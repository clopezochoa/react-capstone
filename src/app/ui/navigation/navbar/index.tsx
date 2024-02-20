import React, { useContext, useEffect, useState } from "react";
import Logo from "./logo";
import MenuButton from "./MenuButton";
import 'styles/Navbar.css'
import 'styles/buttons.css'
import { SessionContext } from "app/provider";
import { getFirstNameFromUserData } from "app/lib/helper";

const Navbar = ({
  toggle,
  handleLogin,
  handleSignup,
  handleLogout,
  handleProfile
}: {
  toggle: () => void;
  handleLogin: () => void;
  handleSignup: () => void;
  handleLogout: () => void;
  handleProfile: () => void;

}) => {

  const sessionContext = useContext(SessionContext);

  const defaultEndButtons =
    <div className="nav-buttons">
      <button className="nav-button normal-size nav-button-text nav-button-main mx-2" type="button" onClick={handleSignup}>Sign Up</button>
      <button className="nav-button normal-size nav-button-text nav-button-main mx-2" type="button" onClick={handleLogin}>Login</button>
    </div>;

  const [endButtons, setEndButtons] = useState(defaultEndButtons);

  useEffect(() => {
    if(sessionContext?.session.isSession) {
      setEndButtons(
        <div className="nav-buttons">
          <button className="nav-button adaptative-width nav-button-text nav-button-main mx-2 px-4" type="button" onClick={handleProfile}>{getFirstNameFromUserData(sessionContext?.session?.user)}</button>
          <button className="nav-button normal-size nav-button-text nav-button-main mx-2" type="button" onClick={handleLogout}>Logout</button>
        </div>
      )
    } else {
      setEndButtons(defaultEndButtons);
    }
  }, [sessionContext])

  return (
    <>
      <nav className="navbar text-dark bg-white" id="navbar">
        <div className="navbar-start" id="navbar-start">
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex item-group">        
          <a href="\">
            Home
          </a>
          <a href="appointments">
            Appointments
          </a>
          <a href="health-blog">
            Health Blog
          </a>
          <a href="review">
            Review
          </a>
        </div>
        <div className="navbar-end">
          {endButtons}
          <button type="button" onClick={toggle}>
            <MenuButton />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;