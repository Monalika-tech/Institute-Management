import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { ClassContext } from "../context/classContext.jsx";

const AddClass = ({ mode }) => {
  const [isLaoding, setIsLoading] = useState(false);
  const naviagte = useNavigate();

  const isEdit = mode === "edit";

  console.log("Mode in AddClass:", isEdit);
  const { createClass, classes, updateClass, getClassByLevel } =
    useContext(ClassContext);

  const { classLevel } = useParams();
  const classLevelNumber = Number(classLevel);

  const vb = isEdit ? getClassByLevel(classLevelNumber) : null;

  if (isEdit && !vb) {
    return <p className="text-red-500">Class not found</p>;
  }

  const [formData, setFormData] = useState({
    classLevel: "",
    totalStudent: "",
    batchTime: "",
  });

  useEffect(() => {
    if (vb) {
      setFormData({
        classLevel: vb.classLevel,
        totalStudent: vb.totalStudent,
        batchTime: vb.batchTime,
      });
    }
  }, [vb]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (vb) {
      await updateClass(vb.classLevel, formData);
    } else {
      await createClass(formData);
    
    }

    naviagte("/");
  };
  return (
    <div className="sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-20 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 hover:border-green-500 mx-auto my-6 sm:my-20 px-4">
      {/* Title */}
      <div className="text-center py-8 px-10 text-3xl">
        <Title text1={"Class"} text2={"Data"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
          Need to edit profile!!
        </p>
      </div>

      <form onSubmit={onSubmitHandler}>
        {/* form fields will go here */}

        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700 py-2"
            >
              {key.toUpperCase()}
            </label>
            <input
              id={key}
              name={key}
              type={
                key === "batchTime"
                  ? "text"
                  : key === "classLevel"
                  ? "number"
                  : "number"
              }
              value={formData[key]}
              onChange={handleChange}
              disabled={key === "classLevel" && vb ? true : false}
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base sm:text-sm ${
                key === "classLevel" && vb
                  ? "bg-gray-100 cursor-not-allowed"
                  : ""
              }`}
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          {isEdit ? "Update Class" : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default AddClass;
