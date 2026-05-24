import { useParams, useNavigate } from "react-router-dom";
import Title from "@/shared/components/Title";
import { useState, useEffect } from "react";
import { createClass, getClassById, updateClass } from "@/lib/api/classes";

const AddEditClassPage = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const isEdit = Boolean(_id);
  const [formData, setFormData] = useState({ classLevel: "", batchTime: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEdit) {
          const editRes = await getClassById(_id);
          const classData = editRes.class;
          setFormData({
            classLevel: classData.classLevel,
            batchTime: classData.batchTime,
          });
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [_id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    } catch {
      alert("something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <div className="text-center py-8 px-10 text-3xl">
          <Title text1="Class" text2="Data" />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
            Need to edit profile!!
          </p>
        </div>
        <form onSubmit={onSubmitHandler}>
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 py-2">
                {key.toUpperCase()}
              </label>
              <input
                id={key}
                name={key}
                type={key === "batchTime" ? "text" : "number"}
                value={formData[key]}
                onChange={handleChange}
                disabled={key === "classLevel" && isEdit}
                className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base sm:text-sm ${
                  key === "classLevel" && isEdit ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>
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
              {isEdit ? "Update Class" : "Add Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditClassPage;
