import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

const Slidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // for active link highlight
  const menuTitles = [
    { name: "Profile", path: "/Teacher/:_id", icon: <FaUser /> },
    { name: "Students", path: "/student", icon: <FaEye /> },
    { name: "Classes", path: "/classes", icon: <FaChalkboardTeacher /> },
  ];
  const menuItems = [
    { name: "Edit Profile", path: "/editProfile", icon: <FaUserEdit /> },
    { name: "ADD Student", path: "/addStudent", icon: <FaPlus /> },
    { name: "Edit Student", path: "/students", icon: <FaEdit /> },
    { name: "Add Class", path: "/addClass", icon: <FaPlus /> },
    { name: "Edit Class", path: "/editClass/:_id", icon: <FaEdit /> },
    { name: "Schedule classes", path: "/new", icon: <FaUsers /> },
    { name: "Notifications", path: "/users", icon: <FaBell /> },
    { name: "Settings", path: "/users", icon: <FaCog /> },

  ];
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
        {menuItems.map((Items, index) => {
          const isActive = location.pathname.startsWith(Items.path);
          return (
            <Link
              key={index}
              to={Items.path}
              className={`flex items-center gap-3 p-2 rounded transition-all
  ${isActive ? "bg-white/40 text-black" : "hover:bg-gray-100"}
`}
              onClick={() => setIsOpen(false)}
            >
              {Items.icon}
              <span className="hidden sm:inline">{Items.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Slidebar;
