import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function NavBar() {
  const { logout } = useAuth();
  const [open, setopen] = useState(false);

  const teacher = localStorage.getItem("teacher");

  console.log("teacher :", teacher);

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 ${
      isActive ? "text-green-600" : "text-gray-700"
    }`;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
      <div className="flex  flex-row justify-center gap-10 items-center gap-4">

        {teacher ? (
          <>
            <button
              onClick={handleLogout}
              className="rounded-md bg-green-700 px-4 py-2 text-sm text-white hover:bg-red-700 transition"
            >
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="rounded-md  border border-green-700 px-4 py-2 text-sm text-green-700 hover:bg-green-50 transition"
            >
              Sign Up
            </Link>
          </>
        )}
        <button
        type="button"
          onClick={() => navigate(-1)}
          className="hover:bg-gray-100 hover-shadow-md px-1 py-1 rounded"
        >
          Back
        </button>
      </div>
    </nav>
  );
  // return (
  //   <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 shadow-sm">
  //     <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
  //       {/* Logo */}
  //       <h1 className="text-xl font-bold text-green-600 cursor-pointer">
  //         EduPanel
  //       </h1>

  //       {/* Desktop Links */}
  //       <ul className="hidden md:flex gap-8">
  //         {["/", "/classes", "/students"].map((path, i) => (
  //           <li key={i}>
  //             <NavLink to={path} className={linkClass}>
  //               {path === "/" ? "Home" : path.replace("/", "")}
  //               <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-green-600 transition-transform origin-left group-hover:scale-x-100" />
  //             </NavLink>
  //           </li>
  //         ))}
  //       </ul>

  //       {/* Actions */}
  //       <div className="hidden md:flex gap-4">
  //         {teacher ? (
  //           <button
  //             onClick={handleLogout}
  //             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
  //           >
  //             Logout
  //           </button>
  //         ) : (
  //           <Link
  //             to="/register"
  //             className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition"
  //           >
  //             Sign Up
  //           </Link>
  //         )}
  //       </div>

  //       {/* Mobile Button */}
  //       <button
  //         onClick={() => setOpen(!open)}
  //         className="md:hidden text-2xl"
  //         aria-label="Menu"
  //       >
  //         ☰
  //       </button>
  //     </div>

  //     {/* Mobile Menu */}
  //     {open && (
  //       <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-3">
  //         <NavLink to="/" onClick={() => setOpen(false)}>
  //           Home
  //         </NavLink>
  //         <NavLink to="/classes" onClick={() => setOpen(false)}>
  //           Classes
  //         </NavLink>
  //         <NavLink to="/students" onClick={() => setOpen(false)}>
  //           Students
  //         </NavLink>

  //         {teacher && (
  //           <button
  //             onClick={handleLogout}
  //             className="block w-full bg-green-600 text-white py-2 rounded-md"
  //           >
  //             Logout
  //           </button>
  //         )}
  //       </div>
  //     )}
  //   </nav>
  // );
}

export default NavBar;
