import React, { useState } from "react";
import { Link } from "react-router-dom";

function TeacherCredentials({ teacher }) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!teacher) {
    return <h1 className="text-gray-500">Loading teachers Profile!</h1>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center  text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full  backdrop-blur-md rounded-xl shadow-xl flex flex-col sm:flex-row overflow-hidden m-4">

        {/* Sidebar / Actions */}
        <div className="w-full sm:w-1/4 md:w-1/5 border-b sm:border-b-0 sm:border-r border-white-500 p-4">

          {/* Hamburger (Mobile only) */}
          <button
            className="sm:hidden mb-4 flex items-center gap-2 border border-white-600 px-3 py-2 rounded-md text-white-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕ Close" : "☰ Menu"}
          </button>

          {/* Menu */}
          <div
            className={`flex flex-col gap-4 ${
              menuOpen ? "block" : "hidden"
            } sm:flex`}
          >
            <Link
              to="/editProfile"
              className="rounded-md border border-white-600 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
              onClick={() => setMenuOpen(false)}
            >
              Edit Profile
            </Link>

            <Link
              to="/addClass"
              className="rounded-md border border-white-600 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
              onClick={() => setMenuOpen(false)}
            >
              Add Class
            </Link>
          </div>
        </div>

        {/* Profile Details */}
        <div className="w-full sm:w-2/5 flex flex-col justify-center px-6 py-8 gap-6">
          <div className="flex items-center gap-2">
            <span className="w-10 h-[2px] bg-gray-500"></span>
            <p className="text-sm font-medium tracking-wide text-gray-700">
              Teacher Profile
            </p>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">
            Institute Name
          </h1>

          <div className="space-y-3 text-gray-800">
            <p><strong>Name:</strong> {teacher.name}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Phone:</strong> {teacher.phone_no}</p>
            <p><strong>Address:</strong> {teacher.address}</p>
            <p><strong>Experience:</strong> {teacher.experiencedYears} years</p>
            <p><strong>Qualification:</strong> {teacher.qualification}</p>
          </div>
        </div>

        {/* Logo / Illustration */}
        <div className="w-full sm:w-2/5 flex items-center justify-center p-6">
          <img
            src="https://media.istockphoto.com/id/1793392179/vector/open-book-with-planet-flat-icon-vector-sign-for-logo-concept-and-illustration-planet-earth.jpg?s=612x612&w=0&k=20&c=4AfeQi0WbobUhoyBgIyGKBYt_-1GudONWjSIflo1HP0="
            alt="Institute Logo"
            className="max-w-xs w-full object-contain"
          />
        </div>

      </div>
    </div>
  );
}

export default TeacherCredentials;
