import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

function NavBar() {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 ${
      isActive ? "text-green-600" : "text-gray-700"
    }`;

  return (
    <nav className="flex items-center justify-between px-6 py-4 font-medium">
      {/* Logo */}
      {/* <img src={logo} alt="Institute Logo" className="w-36" /> */}

      {/* Links */}
      <ul className="hidden sm:flex gap-6 text-sm ">
        <li>
          <NavLink to="/" className={linkClass}>
            <span>Home</span>
            <span className="w-3/4 h-[2px] bg-green-600" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/classes" className={linkClass}>
            <span>Classes</span>
            <span className="w-3/4 h-[2px] bg-green-600" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/students" className={linkClass}>
            <span>Students</span>
            <span className="w-3/4 h-[2px] bg-green-600" />
          </NavLink>
        </li>
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 transition">
          Login
        </button>
        <button className="rounded-md border border-green-600 px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition">
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
