import React from "react";
import Logo from "./logo";
import MenuButton from "./Button";
import 'styles/Navbar.css'

const Navbar = ({
  toggle,
}: {
  toggle: () => void;
}) => {

  return (
    <>
      <nav className="navbar navbar-custom text-dark bg-clear" id="navbar">
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
            <button className="main-button mx-2" type="button" >Sign Up</button>
            <button className="main-button mx-2" type="button" >Login</button>
          </div>
          <MenuButton />
        </div>
      </nav>
    </>
  );
};

export default Navbar;