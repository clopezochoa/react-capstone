import React from "react";
import Logo from "./logo";
import MenuButton from "./MenuButton";
import 'styles/Navbar.css'
import 'styles/buttons.css'

const Navbar = ({
  toggle,
  handleLogin,
  handleSignup
}: {
  toggle: () => void;
  handleLogin: () => void;
  handleSignup: () => void;
}) => {

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
          <a href="reviews">
            Reviews
          </a>
        </div>
        <div className="navbar-end">
          <div className="nav-buttons">
            <button className="nav-button nav-button-text nav-button-main mx-2" type="button" onClick={handleSignup}>Sign Up</button>
            <button className="nav-button nav-button-text nav-button-main mx-2" type="button" onClick={handleLogin}>Login</button>
          </div>
          <button type="button" onClick={toggle}>
            <MenuButton />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;