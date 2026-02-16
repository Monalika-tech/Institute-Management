import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

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
    { name: "Students", path: "/students" },
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
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          
          <h1
            onClick={() => navigate("/")}
            className="text-xl font-bold text-green-600 cursor-pointer"
          >
            EduPanel
          </h1>

          {/* Desktop Links */}
          {isAuthenticated && (
            <ul className="hidden md:flex gap-8 text-sm font-medium items-center">
              {links.map((item, i) => (
                <li key={i}>
                  <NavLink to={item.path} className={linkClass}>
                    {item.name}
                  </NavLink>
                </li>
              ))}

              <li>
                <button
                  onClick={navigateTO}
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Profile
                </button>
              </li>
            </ul>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/register"
                className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition"
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          {isAuthenticated && (
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-2xl"
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
        z-50 ${open ? "translate-x-0" : "-translate-x-full"}`}
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
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-red-600 transition"
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
