import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const { userId, role, loading } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loading) {
  //     if (userId && role) {
  //       if (role === "teacher") navigate(`/Teacher/${userId}`);
  //       else navigate(`/Student/${userId}`);
  //     } else {
  //       navigate("/login");
  //     }
  //   }
  // }, [userId, role, loading]);


  console.log("the user id and role we get from auth context is : ", userId, role);
  return (
    <div className="relative min-h-screen overflow-hidden">
      Background Layer
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm scale-110 "
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-photo/book-with-green-board-background_1150-3837.jpg?semt=ais_hybrid&w=740&q=80')",
            }}
          />

            {/* Overlay */}
          <div className="absolute inset-0 bg-gray-800/20" />
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

          <div className="flex justify-center gap-4 sm:flex-row flex-col">
            <Link
              to={userId ? role==='teacher'? `/Teacher/${userId}` : `/Student/${userId}` : "/login"}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
            >
              Get Started
            </Link>

            <Link
              to="/about"
              className="border border-green-800/70 hover:bg-green-700/70 hover:text-white text-white font-semibold px-8 py-3 rounded-full transition duration-300"
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
