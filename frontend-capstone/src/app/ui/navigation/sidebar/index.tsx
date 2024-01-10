'use client'

import CloseButton from "./closeButton";

const Sidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}): JSX.Element => {
  return (
    <>
      <div
        className="sidebar-container fixed w-full h-full overflow-hidden bg-white grid pt-[80px] "
        style={{
          top: "0",
          opacity: `${isOpen ? "1" : "0"}`,
          right: ` ${isOpen ? "0" : "-100%"}`,
          transition: 'opacity 0.4s ease-in-out, right 0.4s ease-in-out',
        }}
      >
        <button className="absolute right-0 p-5" onClick={toggle}>
          <CloseButton />
        </button>

        <div className="offcanvas text-black">
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
              <a href="reviews">Reviews</a>
            </li>
            <li className="nav-item">
              <button className="main-button" type="button" onClick={() => {alert("Sign UP!")}}>Sign Up</button>
            </li>
            <li className="nav-item">
              <button className="main-button" type="button" onClick={() => {alert("Log IN!")}}>Login</button>
            </li>            
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;