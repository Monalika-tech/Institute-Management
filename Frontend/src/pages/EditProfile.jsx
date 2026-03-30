import { useEffect, useState } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { getTeacherById, updateTeacher } from "../api/TeacherAPI";
import { useAuth } from "../context/AuthContext";

const EditProfile = () => {
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
        console.log("the user id is", userId);

        const res = await getTeacherById(userId);

        setTeacher(res.teacher);
        console.log(teacher);

        setFormData({
          name: res.teacher.name || "",
          email: res.teacher.email || "",
          phone_no: res.teacher.phone_no || "",
          address: res.teacher.address || "",
          qualification: res.teacher.qualification || "",
          experiencedYears: res.teacher.experiencedYears || "",
        });

        // optional cache
        localStorage.setItem("teacher", JSON.stringify(res.teacher));
      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadTeacher();
  }, [userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("dat we get for update ", formData);
      const res = await updateTeacher(teacher._id, formData);

      localStorage.setItem("teacher", JSON.stringify(res.teacher));

      alert("Profile updated successfully");
      navigate("/teacher/" + teacher._id);
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
      <div
        className="  w-full  max-w-3xl w-full  mx-auto   my-8 sm:my-16 
  px-4 sm:px-8 
  py-8 sm:py-12 
  bg-white/90 
  rounded-2xl 
  shadow-md 
  border border-gray-200
"
      >
        <div className="text-center mb-6 text-3xl">
          <Title text1="Edit" text2="Profile" />
          <p className="text-sm text-gray-500 mt-1">
            Update your personal information
          </p>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {fields.map((field, index) => (
            <Input
              key={index}
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

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
focus:border-green-500 transition ${props.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
`}
    />
  </div>
);

export default EditProfile;
