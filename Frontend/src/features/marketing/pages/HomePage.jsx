import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ROUTES } from "@/shared/constants/routes";

const HomePage = () => {
  const { userId, role } = useAuth();

  const getStartedPath = userId
    ? role === "teacher"
      ? ROUTES.teacherProfile(userId)
      : ROUTES.studentProfile(userId)
    : ROUTES.LOGIN;

  return (
    <div className="relative min-h-screen overflow-hidden">
      Background Layer
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/book-with-green-board-background_1150-3837.jpg?semt=ais_hybrid&w=740&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gray-800/20" />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-4xl text-pink-800 md:text-5xl lg:text-6xl font-playwrite mb-6">
            Institute Management System
          </h1>
          <p className="font-playwrite text-lg text-terracota-500 md:text-xl mb-10">
            A smart platform to manage classes, students, teachers, and academic operations — all
            in one place.
          </p>
          <div className="flex justify-center gap-4 sm:flex-row flex-col">
            <Link
              to={getStartedPath}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
            >
              Get Started
            </Link>
            <Link
              to={ROUTES.ABOUT}
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

export default HomePage;
