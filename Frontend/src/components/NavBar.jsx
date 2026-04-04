import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaUserGraduate } from "react-icons/fa";

function NavBar() {
  const { logout, isAuthenticated, role, userId } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent background scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Classes", path: "/classes" },
    { name: "Students ", icon: <FaUserGraduate />, path: "/students" },
    { name: "About", path: "/about" },
  ];

  const linkClass = ({ isActive }) =>
    `block px-2 py-2 rounded-md transition-colors duration-200 ${
      isActive
        ? "text-green-600 bg-green-50"
        : "text-gray-700 hover:bg-green-100"
    }`;

  const navigateTO = () => {
    if (role === "teacher") navigate(`/Teacher/${userId}`);
    if (role === "student") navigate(`/Student/${userId}`);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-blue-900/90 border-b border-blue-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="text-xl ml-10 font-bold text-white cursor-pointer"
          >
            InstituteHub
          </h1>

          {/* Desktop Links */}
          {isAuthenticated && (
            <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
              {links.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md transition ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-900 hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

              <button
                onClick={navigateTO}
                className="text-gray-900 hover:scale-120 transition-transform"
              >
                <FaUser />
              </button>
            </ul>
          )}

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          {isAuthenticated && (
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-2xl text-white"
            >
              ☰
            </button>
          )}
        </div>
      </nav>

      {/* ================= OVERLAY ================= */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-64 sm:w-72
        bg-white/80 backdrop-blur-xl border-r border-white/20
        shadow-2xl transform transition-transform duration-300 ease-in-out
        z-[125] ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div className="space-y-4">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="text-2xl font-light mb-6"
            >
              ✕
            </button>

            {links.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {item.name}
              </NavLink>
            ))}

            <button
              onClick={() => {
                navigateTO();
                setOpen(false);
              }}
              className="block text-gray-700 hover:text-green-600 transition"
            >
              Profile
            </button>
          </div>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
