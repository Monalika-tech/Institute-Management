import React from "react";

const About = () => {
  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 "
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/thumb_back/fh260/background/20250427/pngtree-back-to-school-background-with-a-white-line-drawing-of-educational-image_17234810.jpg",
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.25)",
        }}
      />
      <div className="relative z-10 flex  flex-col items-center justify-center min-h-screen px-6">
        <h1 className="text-4xl font-bold text-center text-white/80 ">About Us</h1>
        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-800 text-center">
          Welcome to our Institute Management System! We are dedicated to
          providing a comprehensive platform that streamlines the administrative
          tasks of educational institutions. Our system is designed to help
          schools, colleges, and universities manage their classes, students,
          teachers, and academic operations efficiently. With features like
          class scheduling, student registration, teacher management, and
          performance tracking, we aim to enhance the overall educational
          experience for both educators and learners. Our mission is to empower
          educational institutions with the tools they need to succeed in
          today's digital age.
        </p>
      </div>
    </div>
  );
};

export default About;
