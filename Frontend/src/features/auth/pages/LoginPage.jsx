import { useState } from "react";
import Title from "@/shared/components/Title";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";

function LoginPage() {
  const { loginTeacher, loginStudent, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError({});

    const result =
      role === "teacher"
        ? await loginTeacher(email, password)
        : await loginStudent(email, password);

    if (result.success) {
      if (result.role === "teacher") navigate(ROUTES.teacherProfile(result.userId));
      if (result.role === "student") navigate(ROUTES.studentProfile(result.userId));
    } else {
      setError({ form: result.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <Title text1="Sign" text2="In" />
          <p className="text-sm text-gray-500 mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600">Email Address</label>
            <input
              disabled={loading}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              placeholder="Enter your email"
            />
            {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              disabled={loading}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              placeholder="Enter your password"
            />
            {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-green-600 font-medium hover:underline">
              Register
            </Link>
          </p>

          {error.form && <p className="text-red-600 text-center text-sm">{error.form}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
