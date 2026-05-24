import { useEffect, useState } from "react";
import Title from "@/shared/components/Title";
import { useNavigate } from "react-router-dom";
import { getTeacherById, updateTeacher } from "@/lib/api/teachers";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ROUTES } from "@/shared/constants/routes";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [teacher, setTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    qualification: "",
    experiencedYears: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeacher = async () => {
      try {
        if (!userId) throw new Error("User not logged in");
        const res = await getTeacherById(userId);
        setTeacher(res.teacher);
        setFormData({
          name: res.teacher.name || "",
          email: res.teacher.email || "",
          phone_no: res.teacher.phone_no || "",
          address: res.teacher.address || "",
          qualification: res.teacher.qualification || "",
          experiencedYears: res.teacher.experiencedYears || "",
        });
        localStorage.setItem("teacher", JSON.stringify(res.teacher));
      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
        navigate(ROUTES.HOME);
      } finally {
        setLoading(false);
      }
    };
    loadTeacher();
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateTeacher(teacher._id, formData);
      localStorage.setItem("teacher", JSON.stringify(res.teacher));
      alert("Profile updated successfully");
      navigate(ROUTES.teacherProfile(teacher._id));
    } catch (err) {
      alert(err.message || "Update failed");
    }
  };

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email", disabled: true },
    { label: "Phone No", name: "phone_no", type: "text" },
    { label: "Qualification", name: "qualification", type: "text" },
    { label: "Experience (Years)", name: "experiencedYears", type: "number" },
    { label: "Address", name: "address", type: "text" },
  ];

  if (loading) return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl mx-auto my-8 sm:my-16 px-4 sm:px-8 py-8 sm:py-12 bg-white/90 rounded-2xl shadow-md border border-gray-200">
        <div className="text-center mb-6 text-3xl">
          <Title text1="Edit" text2="Profile" />
          <p className="text-sm text-gray-500 mt-1">Update your personal information</p>
        </div>
        <form onSubmit={onSubmitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((field) => (
            <ProfileInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              disabled={field.disabled}
            />
          ))}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 md:col-span-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-1/2 bg-gray-200 text-gray-700 py-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${
        props.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

export default EditProfilePage;
