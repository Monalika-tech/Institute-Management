import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaUser,
  FaUserEdit,
  FaEdit,
  FaPlus,
  FaBars,
  FaUserGraduate,
  FaUsers,
  FaEye,
  FaBell,
  FaCog,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Slidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useAuth();

  let menuItems = []; // ✅ declare once

  if (role === "teacher") {
    menuItems = [
      {name : "Attendance", path : "/attendance", icon : <FaChalkboardTeacher />},
      { name: "Edit Profile", path: "/editProfile", icon: <FaUserEdit /> },
      { name: "ADD Student", path: "/addStudent", icon: <FaPlus /> },
      { name: "Edit Student", path: "/students", icon: <FaEdit /> },
      { name: "Add Class", path: "/addClass", icon: <FaPlus /> },
      { name: "Edit Class", path: "/editClass/:_id", icon: <FaEdit /> },
      { name: "Schedule classes", path: "/new", icon: <FaUsers /> },
      { name: "Notifications", path: "/users", icon: <FaBell /> },
      { name: "Settings", path: "/users", icon: <FaCog /> },
    ];
  } else if (role === "student") {
    menuItems = [
      {
        name: "My Classes",
        path: "/student/classes",
        icon: <FaChalkboardTeacher />,
      },
      {
        name: "Notifications",
        path: "/student/notifications",
        icon: <FaBell />,
      },
      {
        name: "Settings",
        path: "/student/settings",
        icon: <FaCog />,
      },
    ];
  }

  // const menuItems = [
  //   { name: "Edit Profile", path: "/editProfile", icon: <FaUserEdit /> },
  //   { name: "ADD Student", path: "/addStudent", icon: <FaPlus /> },
  //   { name: "Edit Student", path: "/students", icon: <FaEdit /> },
  //   { name: "Add Class", path: "/addClass", icon: <FaPlus /> },
  //   { name: "Edit Class", path: "/editClass/:_id", icon: <FaEdit /> },
  //   { name: "Schedule classes", path: "/new", icon: <FaUsers /> },
  //   { name: "Notifications", path: "/users", icon: <FaBell /> },
  //   { name: "Settings", path: "/users", icon: <FaCog /> },
  // ];
  const toggleSlidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="p-4 sm:p-2 flex flex-row m-2 sm:m-0">
      {/* button to open-close the slide bar on small screens */}
      <div className="sm:hidden absolute top-2 left-4 z-10">
        <button onClick={toggleSlidebar}>
          <FaBars />
        </button>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-20 sm:hidden"
          onClick={toggleSlidebar}
        />
      )}
      {/* button to perform action  */}

      <div
        className={`
  fixed z-30 top-0 left-0 h-full w-64 flex flex-row sm:flex-col bg-white sm:bg-white/30 rounded-sm sm:rounded-l-xl shadow-xl transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  sm:translate-x-0 sm:static sm:block
`}
      >
        {menuItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);

          const handleClick = (e) => {
            if (item.name === "Edit Student") {
              e.preventDefault();

              navigate("/students", {
                state: { message: "Select a student to edit" },
              });
            } else {
              setIsOpen(false);
            }
          };

          return (
            <Link
              key={index}
              to={item.path}
              onClick={handleClick}
              className={`flex items-center gap-3 p-2 rounded transition-all
        ${isActive ? "bg-blue-800/50 text-black" : "hover:bg-gray-100"}
      `}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Slidebar;
