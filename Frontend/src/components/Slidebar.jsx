import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Slidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userId, role } = useAuth();
  const location = useLocation();

  console.log("Current location:", location.pathname);

  // Prevent background scroll on mobile when open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sm:hidden m-3 px-4 py-2 bg-green-700 text-white rounded-md shadow-md"
        onClick={() => setMenuOpen(true)}
      >
        Menu
      </button>

      {/* Overlay (Mobile Only) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-30 sm:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 h-full
        sm:w-56
        bg-white/80 backdrop-blur-lg border-r border-white/20
        shadow-xl 
        transform transition-transform duration-300 ease-in-out
        z-40
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0`}
      >
        <div className="p-3 w-full sm:w-32 flex sm:flex-col gap-2 sm:gap-4 ">
          {role === "teacher" && (
            <div>
              {location.pathname.startsWith("/Teacher/") && (
                <div className="p-3 w-full sm:w-32 flex sm:flex-col gap-2 sm:gap-4 ">
                  <Link
                    to="/editProfile"
                    className="rounded-md border border-green-600 px-4 py-2 text-sm text-green-800 hover:bg-green-200 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Edit Profile
                  </Link>

                  <Link
                    to="/addClass"
                    className="rounded-md border border-green-600 px-4 py-2 text-sm text-green-800 hover:bg-green-200 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Add Class
                  </Link>
                </div>
              )}
              {location.pathname.startsWith("/student/") && (
                <div className="p-3 w-full sm:w-32 flex sm:flex-col gap-2 sm:gap-4 ">
                  <Link
                    to={`/editStudent/${userId}`}
                    className="rounded-md border border-green-600 px-4 py-2 text-sm text-green-800 hover:bg-green-200 transition"
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={() =>
                      deleteandnavigate(userId, student.classLevel)
                    }
                    className="rounded-md border border-green-600 px-4 py-2 text-sm text-green-800 hover:bg-green-200 transition"
                  >
                    Delete student
                  </button>
                </div>
              )}
            </div>
          )}

          {role === "student" && (
            <div className="p-3 w-full sm:w-32 flex sm:flex-col gap-2 sm:gap-4 ">
              <Link
                to={`/editStudent/${userId}`}
                className="rounded-md border border-green-600 px-4 py-2 text-sm text-green-800 hover:bg-green-200 transition"
              >
                Edit Profile
              </Link>
            </div>
          )}

          {/* Close Button (Mobile Only) */}
          <button
            onClick={() => setMenuOpen(false)}
            className="sm:hidden text-xl m-2"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
};

export default Slidebar;
