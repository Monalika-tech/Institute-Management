import React from "react";
import Title from "../components/Title";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { loginTeacher } = React.useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const loginSuccess = loginTeacher(email, password);

    if (loginSuccess.success) {
      console.log("Login successful");
      navigate("/");
    } else {
      alert(loginSuccess.message);
    }
  };
  return (
    <div className="sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-20 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 hover:border-green-500 mx-auto my-20 px-4">
      {/* Title */}
      <div className="text-center py-8 px-10 text-3xl">
        <Title text1={"Sign"} text2={"in"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
          Login here to access your account!
        </p>
      </div>
      {/* Login Form */}
      <form onSubmit={onSubmitHandler} className="w-full px-8">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex  flex-col items-center justify-center">
          <button
            type="submit"
            className="w-1/4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Login
          </button>
          <Link
            to="/register"
            className="ml-4 text-sm text-gray-600 hover:underline"
          >
            Don't have an account? Register!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
