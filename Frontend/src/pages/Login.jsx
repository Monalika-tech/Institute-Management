import React from "react";
import Title from "../components/Title";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { loginTeacher, loginStudent, loading, userId } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("teacher");
  const [error, setError] = React.useState({});

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError({});

    let result;

    if (role === "teacher") {
      console.log(" Login - Submitting form with:", { email, password });
      result = await loginTeacher(email, password);
    } else {
      result = await loginStudent(email, password);
    }

    if (result.success) {
      // Role based redirect
      if (role === "teacher") navigate(`/Teacher/${userId}`);
      if (role === "student") navigate(`/Student/${userId}`);
    } else {
      setError({ form: result.message });
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
          {/* email */}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            disabled={loading}
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md bg-white/10 "
          />
          {error.email && (
            <div className="text-red-500 text-sm">{error.email}</div>
          )}
        </div>

        <div className="mb-4">
          {/* password */}
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            disabled={loading}
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className=" w-full block  mt-1 px-4 py-2 border border-gray-300 rounded-md bg-white/10 "
          />
          {error.password && (
            <div className="text-red-500 text-sm">{error.password}</div>
          )}
        </div>

        {/*roles  */}
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 "
        >
          Role
        </label>
        <select
          className="text-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>

        <div className="flex  flex-col items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className={` text-white py-2 px-4 rounded-md ${
              loading
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link
            to="/register"
            className="ml-4 text-sm text-white hover:underline"
          >
            Don't have an account? Register!
          </Link>
        </div>
      </form>
      {error.form && (
        <p className="text-red-600 text-center mb-3">{error.form}</p>
      )}
    </div>
  );
}

export default Login;
