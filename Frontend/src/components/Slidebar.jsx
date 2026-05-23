import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaUserEdit,
  FaEdit,
  FaPlus,
  FaBars,
  FaUsers,
  FaBell,
  FaCog,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Slidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useAuth();

  // ✅ Close sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // ✅ Prevent background scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "auto";
  }, [isMobileOpen]);

  let menuItems = [];

  if (role === "teacher") {
    menuItems = [
      {
        name: "Attendance",
        path: "/attendance",
        icon: <FaChalkboardTeacher />,
      },
      { name: "Edit Profile", path: "/editProfile", icon: <FaUserEdit /> },
      { name: "Add Student", path: "/addStudent", icon: <FaPlus /> },
      {
        name: "Edit Student",
        path: "/students",
        icon: <FaEdit />,
        special: true,
      },
      { name: "Add Class", path: "/addClass", icon: <FaPlus /> },
      { name: "Schedule Classes", path: "/new", icon: <FaUsers /> },
      { name: "Notifications", path: "/notifications", icon: <FaBell /> },
      { name: "Settings", path: "/settings  ", icon: <FaCog /> },
    ];
  } else {
    menuItems = [
      {
        name: "My Classes",
        path: "/student/classes",
        icon: <FaChalkboardTeacher />,
      },
      {
        name: "Notifications",
        path: "/notifications",
        icon: <FaBell />,
      },
      { name: "Settings", path: "/settings", icon: <FaCog /> },
    ];
  }

  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className="flex">
      {/* Mobile Hamburger */}
      <button
        className="sm:hidden fixed top-4 left-4 z-[120] bg-white shadow-md p-2 rounded-md"
        onClick={toggleMobile}
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur z-[100] sm:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
    fixed top-0 left-0 h-full bg-blue-900/90 border-t border-white  backdrop-blur-xl shadow-lg z-[110]
    transition-all duration-300 ease-in-out

    ${isCollapsed ? "w-20" : "w-64"}
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
    sm:translate-x-0 sm:static
  `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 ">
          {!isCollapsed && (
            <span className="text-2xl font-semibold text-white">
              Dashboard
            </span>
          )}

          <button onClick={toggleCollapse} className="hidden sm:block">
            {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col p-2 gap-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={index}
                to={item.path}
                className={`
            flex items-center gap-4 px-3 py-3 rounded-lg
            transition-all duration-200 relative

            ${
              isActive
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-white hover:bg-gray-200"
            }
          `}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r" />
                )}

                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slidebar;
