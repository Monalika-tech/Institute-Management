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
      navigate("/");
    } catch (err) {
      alert(err.message || "Update failed");
    }
  };

  if (loading) return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="sm:w-1/2 bg-white/70 mx-auto my-16 p-6 border border-gray-300 rounded-3xl shadow-xl.shadow-black mx-auto my-6 sm:my-20 px-4 hover:border-green-500 mx-auto my-20 px-4">
      <div className="text-center mb-8 py-8 text-3xl">
        <Title text1="Edit" text2="Profile" />
        {/* <p className="text-sm text-gray-600">Need to edit profile..</p> */}
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bo"
        />
        <Input label="Email" name="email" value={formData.email} disabled />
        <Input
          label="Phone No"
          name="phone_no"
          value={formData.phone_no}
          onChange={handleChange}
        />
        <Input
          label="Qualification"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
        />
        <Input
          label="Experience (Years)"
          name="experiencedYears"
          type="number"
          value={formData.experiencedYears}
          onChange={handleChange}
        />

        <div className="flex flex-coll gap-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full my-3  bg-green-600 text-white py-2 rounded-3xl"
          >
            Cancle
          </button>
          <button className="w-full my-3  bg-green-600 text-white py-2 rounded-3xl">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className={`w-full px-4 py-2 border border-green-700 shadow-black-10 rounded-md hover:bg-green-100 ${
        props.disabled ? "bg-green-100  text-gray-700 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

export default EditProfile;
