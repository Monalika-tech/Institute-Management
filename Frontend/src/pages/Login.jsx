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
      result = await loginTeacher(email, password);
    } else {
      result = await loginStudent(email, password);
    }

    if (result.success) {
      if (role === "teacher") navigate(`/Teacher/${userId}`);
      if (role === "student") navigate(`/Student/${userId}`);
    } else {
      setError({ form: result.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <Title text1={"Sign"} text2={"In"} />
          <p className="text-sm text-gray-500 mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              disabled={loading}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              placeholder="Enter your email"
            />
            {error.email && (
              <p className="text-red-500 text-xs mt-1">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              disabled={loading}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              placeholder="Enter your password"
            />
            {error.password && (
              <p className="text-red-500 text-xs mt-1">{error.password}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>

          {/* Form Error */}
          {error.form && (
            <p className="text-red-600 text-center text-sm">{error.form}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
