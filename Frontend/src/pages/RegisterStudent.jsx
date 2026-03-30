import React, { useEffect, useState } from "react";
import { getAllClasses } from "../api/ClassAPI";
import Title from "../components/Title";
import { createStudent } from "../api/StudentAPI";

function RegisterStudent() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await getAllClasses();
        setClasses(res.classes);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };
    fetchClasses();
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    classID: "",
    parentName: "",
    phone_no: "",
    address: "",
    school: "",
    monthlyFee: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ FIXED (async + better UX)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await createStudent(form);
      setSuccess("Student registered successfully!");

      // Optional reset form
      setForm({
        name: "",
        email: "",
        password: "",
        classID: "",
        parentName: "",
        phone_no: "",
        address: "",
        school: "",
        monthlyFee: "",
      });

    } catch (error) {
      console.error("Failed to submit student registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-6">
          <Title text1={"Register"} text2={"Student"} />
          <p className="text-gray-500 text-sm mt-2">
            Fill in the details to create a new student
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-sm text-gray-600">Student Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Class</label>
            <select
              name="classID"
              value={form.classID}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.classLevel || cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Parent Name</label>
            <input
              name="parentName"
              value={form.parentName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              name="phone_no"
              type="number"
              value={form.phone_no}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">School</label>
            <input
              name="school"
              value={form.school}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Monthly Fee</label>
            <input
              name="monthlyFee"
              type="number"
              value={form.monthlyFee}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* ✅ Success Message */}
          {success && (
            <p className="sm:col-span-2 text-green-600 text-center">
              {success}
            </p>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-semibold transition ${
                loading
                  ? "bg-gray-400"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Registering..." : "Register Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterStudent;