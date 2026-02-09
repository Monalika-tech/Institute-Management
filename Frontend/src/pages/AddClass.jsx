import { useParams, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import { createClass, getClassById, updateClass } from "../api/ClassAPI";

const AddClass = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const isEdit = Boolean(_id);
  console.log("Mode in AddClass:", isEdit);

  const [formData, setFormData] = useState({ classLevel: "", batchTime: "" });

  // now if isEdit= true then ir=t will set formData otherwise empty
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEdit) {
          const editRes = await getClassById(_id);
          const classData = editRes.class;
          console.log("the form data for class is  ", classData);

          setFormData({
            classLevel: classData.classLevel,
            batchTime: classData.batchTime,
          });
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    fetchData();
  }, [_id]);

  // for both cases either edit or add it will add the changed fields to the form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateClass(_id, formData);
        alert("class Updated!");
      } else {
        await createClass(formData);
        alert("class Added!");
      }

      navigate(-1);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
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
              disabled={key === "classLevel" && isEdit ? true : false}
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base sm:text-sm ${
                key === "classLevel" && isEdit
                  ? "bg-gray-100 cursor-not-allowed"
                  : ""
              }`}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full my-3  bg-green-600 text-white py-2 rounded-md"
        >
          Cancle
        </button>
        <button
          type="submit"
          className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          {isEdit ? "Update Class" : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default AddClass;
