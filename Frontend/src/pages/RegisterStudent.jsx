import React, { useEffect, useState, useContext } from "react";
import { studentContext } from "../context/studentContext.jsx";
import Title from "../components/Title.jsx";
import { useNavigate, useParams } from "react-router-dom";

const RegisterStudent = ({ mode }) => {
  const { addStudent, updateStudDetail, getStudById, loading } =
    useContext(studentContext);
  const navigate = useNavigate();
  const { _id } = useParams();
  // const [dataEdited, setDataEdited] = useState(null);

  console.log("data to be upadte with id :", _id);

  const isEdit = mode === "edit";
  console.log("Mode in RegisterStudent:", isEdit, "the mode is :", mode);

  useEffect(() => {
    if (isEdit && _id) {
      (async () => {
        const studentData = await getStudById(_id);
        console.log("Student data for editing:", studentData);

        // setDataEdited(studentData);
        setFormData({
          name: studentData.name || "",
          email: studentData.email || "",
          password: "",
          classLevel: studentData.classLevel || "",
          parentName: studentData.parentName || "",
          phone_no: studentData.phone_no || "",
          address: studentData.address || "",
          school: studentData.school || "",
          monthlyFee: studentData.monthlyFee || "",
        });
      })();
    }
  }, [_id, isEdit]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    classLevel: "",
    parentName: "",
    phone_no: "",
    address: "",
    school: "",
    monthlyFee: "",
  });

  // useEffect(() => {
  //   if (dataEdited) {
  //     setFormData({
  //       name: dataEdited.name,
  //       email: dataEdited.email,
  //       password: dataEdited.password,
  //       classLevel: dataEdited.classLevel,
  //       parentName: dataEdited.parentName,
  //       phone_no: dataEdited.phone_no,
  //       address: dataEdited.address,
  //       school: dataEdited.school,
  //       monthlyFee: dataEdited.monthlyFee,
  //     });
  //   }
  // }, [dataEdited]);

  console.log("Form Data:", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        classLevel: Number(formData.classLevel),
        phone_no: Number(formData.phone_no),
        monthlyFee: Number(formData.monthlyFee),
      };

      console.log("Submitting payload:", payload);
      console.log("isEdit flag:", isEdit);

      if (isEdit) {
        await updateStudDetail(_id, payload);
        console.log("Student updated, navigating...");
        navigate(`/students/${_id}`);
      } else {
        const result = await addStudent(payload);
        console.log("Add student result:", result);
        console.log("Student added, navigating...");
        if (result.success) {
          setTimeout(() => {
            navigate(`/class/${payload.classLevel}`);
          }, 0);
        } else {
          console.error("Failed to add student:", result.message);
          <p>{result.message}</p>;
        }
      }
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <div className="sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-20 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 hover:border-green-500 mx-auto my-6 sm:my-20 px-4">
      {/* Title */}
      <div className="text-center py-8 px-10 text-3xl">
        <Title text1={"Student"} text2={"Details"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
          Need to edit profile!!
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              type={
                ["classLevel", "phone_no", "monthlyFee"].includes(key)
                  ? "number"
                  : "text"
              }
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {isEdit ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default RegisterStudent;
