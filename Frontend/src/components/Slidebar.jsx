import React, { useState } from "react";
import { Link } from "react-router-dom";

const Slidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className=" w-full sm:w-48  bg-gradient-to-r from-green-100 to-white text-green-800 p-4 flex flex-row sm:flex-col gap-4 shadow-lg rounded-lg py-4 py-6">
      {/* menu button */}
      <button
        className=" m-4 flex items-center justify-center py-2 bg-green-800 text-white rounded-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Menu
      </button>

      {/* other buttons */}
      <div className="flex flex-row sm:flex-col ">
        <Link
          to="/editProfile"
          className="rounded-md border border-green-600 px-4 py-2 text-sm text- hover:bg-white/10 transition"
          onClick={() => setMenuOpen(false)}
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Slidebar;
