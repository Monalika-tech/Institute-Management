import React from "react";
import Title from "../components/Title";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState({});
  const [isloading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  const { loginTeacher } = React.useContext(AuthContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log(validateForm());
    if (!validateForm()) return;

    setIsLoading(true);

    console.log("Submitting form with:", { email, password });
    const result = await loginTeacher(email, password);

    setIsLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError({ form: result.message });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is Required!!";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a Valid Email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required!";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
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
            disabled={isloading}
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base sm:text-sm"
          />
          {error.email && (
            <div className="text-red-500 text-sm">{error.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            disabled={isloading}
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base sm:text-sm"
          />
          {error.password && (
            <div className="text-red-500 text-sm">{error.password}</div>
          )}
        </div>
        <div className="flex  flex-col items-center justify-center">
          <button
            type="submit"
            disabled={isloading}
            className={`w-1/4  text-white py-2 px-4 rounded-md ${
              isloading
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            }`}
          >
            {isloading ? "Logging in..." : "Login"}
          </button>
          <Link
            to="/register"
            className="ml-4 text-sm text-gray-600 hover:underline"
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
