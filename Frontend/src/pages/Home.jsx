import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 "
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/thumb_back/fh260/background/20250427/pngtree-back-to-school-background-with-a-white-line-drawing-of-educational-image_17234810.jpg",
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.25)",
        }}
      />

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" /> */}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-3xl text-center text-white ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-elegantSerif font-extrabold tracking-tight mb-6">
            Institute Management System
          </h1>

          <p className="font-classySans text-lg md:text-xl text-gray-200 mb-10">
            A smart platform to manage classes, students, teachers, and academic
            operations — all in one place.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
            >
              Get Started
            </Link>

            <Link
              to="/about"
              className="border border-white/70 hover:bg-white hover:text-green-700 text-white font-semibold px-8 py-3 rounded-full transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
