import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { useAuth } from "@/features/auth/context/AuthContext";
import { ROUTES } from "@/shared/constants/routes";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { role } = useAuth();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "auto";
  }, [isMobileOpen]);

  const menuItems =
    role === "teacher"
      ? [
          { name: "Attendance", path: ROUTES.ATTENDANCE, icon: <FaChalkboardTeacher /> },
          { name: "Edit Profile", path: ROUTES.EDIT_PROFILE, icon: <FaUserEdit /> },
          { name: "Add Student", path: ROUTES.ADD_STUDENT, icon: <FaPlus /> },
          { name: "Edit Student", path: ROUTES.STUDENTS, icon: <FaEdit />, special: true },
          { name: "Add Class", path: ROUTES.ADD_CLASS, icon: <FaPlus /> },
          { name: "Schedule Classes", path: "/new", icon: <FaUsers /> },
          { name: "Notifications", path: ROUTES.NOTIFICATIONS, icon: <FaBell /> },
          { name: "Settings", path: ROUTES.SETTINGS, icon: <FaCog /> },
        ]
      : [
          { name: "My Classes", path: "/student/classes", icon: <FaChalkboardTeacher /> },
          { name: "Notifications", path: ROUTES.NOTIFICATIONS, icon: <FaBell /> },
          { name: "Settings", path: ROUTES.SETTINGS, icon: <FaCog /> },
        ];

  return (
    <div className="flex">
      <button
        className="sm:hidden fixed top-4 left-4 z-[120] bg-white shadow-md p-2 rounded-md"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        type="button"
      >
        <FaBars />
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur z-[100] sm:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={`
    fixed top-0 left-0 h-full bg-blue-900/90 border-t border-white backdrop-blur-xl shadow-lg z-[110]
    transition-all duration-300 ease-in-out
    ${isCollapsed ? "w-20" : "w-64"}
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
    sm:translate-x-0 sm:static
  `}
      >
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <span className="text-2xl font-semibold text-white">Dashboard</span>
          )}
          <button onClick={() => setIsCollapsed((prev) => !prev)} className="hidden sm:block" type="button">
            {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </button>
        </div>

        <div className="flex flex-col p-2 gap-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path.trim());
            return (
              <Link
                key={index}
                to={item.path}
                className={`
            flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 relative
            ${isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-white hover:bg-gray-200"}
          `}
              >
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

export default Sidebar;
