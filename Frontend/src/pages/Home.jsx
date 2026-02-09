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
            "url('https://img.freepik.com/free-photo/book-with-green-board-background_1150-3837.jpg?semt=ais_hybrid&w=740&q=80')",
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.25)",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-3xl text-center text-white ">
          <h1 className="text-4xl text-pink-800 md:text-5xl lg:text-6xl font-playwrite mb-6">
            Institute Management System
          </h1>

          <p className="font-playwrite text-lg text-terracota-500 md:text-xl mb-10">
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
