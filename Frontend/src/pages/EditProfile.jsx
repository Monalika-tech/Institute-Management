import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ onSuccess }) => {
  const { teacher, updateTeacher } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: teacher?.name || "",
    email: teacher?.email || "",
    phone_no: teacher?.phone_no || "",
    address: teacher?.address || "",
    qualification: teacher?.qualification || "",
    experiencedYears: teacher?.experiencedYears || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    updateTeacher(formData);
    if (onSuccess) return onSuccess();

    alert("Profile updated successfully");
    navigate("/");

    console.log("teacher ", formData);
  };

  return (
    <div className="sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-20 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 hover:border-green-500 mx-auto my-6 sm:my-20 px-4">
      {/* Title */}
      <div className="text-center py-8 px-10 text-3xl">
        <Title text1={"Edit"} text2={"Profile"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
          Need to edit profile!!
        </p>
      </div>
      {/* form */}
      <form onSubmit={onSubmitHandler}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700 py-2"
            >
              {key.replace("_", " ").toUpperCase()}
            </label>
            <input
              id={key}
              name={key}
              type={key === "experiencedYears" ? "number" : "text"}
              value={formData[key]}
              onChange={handleChange}
              disabled={key === "email"}
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base sm:text-sm ${key === "email" ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full  text-white mt-3 py-2 px-4 rounded-md border border-green-500 bg-green-600"
        >
          Update !
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
