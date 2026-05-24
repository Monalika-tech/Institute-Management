import { useEffect, useState } from "react";
import { getAllClasses } from "@/lib/api/classes";
import Title from "@/shared/components/Title";
import { createStudent } from "@/lib/api/students";

function AddEditStudentPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {
      await createStudent(form);
      setSuccess("Student registered successfully!");
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
      setSuccess(error.message || "Failed to register student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <Title text1="Register" text2="Student" />
          <p className="text-gray-500 text-sm mt-2">Fill in the details to create a new student</p>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: "Student Name", name: "name", type: "text", required: true },
            { label: "Email", name: "email", type: "email", required: true },
            { label: "Password", name: "password", type: "password", required: true },
            { label: "Parent Name", name: "parentName", type: "text" },
            { label: "Phone Number", name: "phone_no", type: "number" },
            { label: "School", name: "school", type: "text" },
            { label: "Monthly Fee", name: "monthlyFee", type: "number" },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm text-gray-600">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                required={field.required}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}
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
          {success && <p className="sm:col-span-2 text-green-600 text-center">{success}</p>}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-semibold transition ${
                loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
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

export default AddEditStudentPage;
